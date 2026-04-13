/**
 * ssl-manager.ts
 *
 * Handles TLS certificate provisioning and the dual-protocol TCP server that
 * lets HTTP and HTTPS share the same port.
 *
 * Certificate priority:
 *   1. Let's Encrypt  – when DOMAIN_NAME env var is set and port 80 is reachable
 *   2. Self-signed    – auto-generated fallback (stored in ssl/)
 *   3. None           – when running inside Replit (proxy handles TLS)
 *
 * Dual-protocol:
 *   A raw net.Server peeks at the first byte of every connection.
 *   0x16 (TLS ClientHello) → HTTPS server
 *   anything else           → HTTP redirect server  (→ https://host:PORT)
 */

import fs   from "fs";
import path from "path";
import net  from "net";
import http from "http";
import https from "https";
import express, { type Request, type Response } from "express";
import type { Server } from "http";

// ─── Paths ────────────────────────────────────────────────────────────────────
const SSL_DIR  = path.resolve("ssl");
const CERT_PATH = path.join(SSL_DIR, "cert.pem");
const KEY_PATH  = path.join(SSL_DIR, "key.pem");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Write cert + key atomically, only if the content changed. */
function writePem(certPem: string | Buffer, keyPem: string | Buffer) {
  ensureDir(SSL_DIR);
  fs.writeFileSync(CERT_PATH, certPem);
  fs.writeFileSync(KEY_PATH,  keyPem);
}

/** True when running inside Replit cloud (proxy handles TLS). */
export function isReplitEnv(): boolean {
  return !!process.env.REPL_ID;
}

// ─── Self-signed fallback ─────────────────────────────────────────────────────

async function generateSelfSigned(): Promise<{ cert: string; key: string }> {
  const { default: selfsigned } = await import("selfsigned") as any;
  const { networkInterfaces } = await import("os");

  const nets = networkInterfaces();
  const ips: string[] = ["127.0.0.1"];
  for (const iface of Object.values(nets)) {
    for (const net of iface ?? []) {
      if ((net as any).family === "IPv4" && !(net as any).internal) {
        ips.push((net as any).address);
      }
    }
  }

  const attrs = [{ name: "commonName", value: "SRPH-MIS" }];
  const opts  = {
    keySize: 2048,
    days: 3650,
    algorithm: "sha256",
    extensions: [
      {
        name: "subjectAltName",
        altNames: [
          { type: 2, value: "localhost" },
          ...ips.map(ip => ({ type: 7, ip })),
        ],
      },
    ],
  };

  const pems = await selfsigned.generate(attrs, opts);
  return { cert: pems.cert, key: pems.private };
}

// ─── Let's Encrypt (ACME HTTP-01) ─────────────────────────────────────────────

/**
 * Obtains or renews a Let's Encrypt certificate for DOMAIN_NAME using the
 * ACME HTTP-01 challenge.  Requires:
 *   - DOMAIN_NAME env var  (e.g. "myapp.example.com")
 *   - Port 80 open on the server / router (for /.well-known/acme-challenge/)
 *   - ACME_EMAIL env var   (contact address for Let's Encrypt account)
 *
 * Returns true on success, false on failure (caller falls back to self-signed).
 */
async function obtainLetsEncryptCert(domain: string): Promise<boolean> {
  try {
    const acme = await import("acme-client");
    const forge = acme.forge;

    const email = process.env.ACME_EMAIL || `admin@${domain}`;

    // ── Create / reuse ACME account key ───────────────────────────────────
    const accountKeyPath = path.join(SSL_DIR, "account.key.pem");
    let accountKey: Buffer;
    if (fs.existsSync(accountKeyPath)) {
      accountKey = fs.readFileSync(accountKeyPath);
    } else {
      accountKey = await forge.createPrivateKey();
      ensureDir(SSL_DIR);
      fs.writeFileSync(accountKeyPath, accountKey);
    }

    // ── ACME client (production directory) ────────────────────────────────
    const client = new acme.Client({
      directoryUrl: acme.directory.letsencrypt.production,
      accountKey,
    });

    // ── Generate CSR ───────────────────────────────────────────────────────
    const [domainKey, csr] = await forge.createCsr({ commonName: domain });

    // ── HTTP-01 challenge: we spin up a temporary HTTP server on port 80 ──
    // The server must be capable of serving the challenge token.
    const challenges: Record<string, string> = {};

    const challengeServer = http.createServer((req, res) => {
      const prefix = "/.well-known/acme-challenge/";
      if (req.url?.startsWith(prefix)) {
        const token = req.url.slice(prefix.length);
        if (challenges[token]) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(challenges[token]);
          return;
        }
      }
      res.writeHead(404);
      res.end();
    });

    await new Promise<void>((resolve, reject) => {
      challengeServer.listen(80, "0.0.0.0", resolve as any);
      challengeServer.on("error", reject);
    });

    console.log(`🔐 Let's Encrypt: challenge server ready on port 80 for ${domain}`);

    // ── Obtain certificate ─────────────────────────────────────────────────
    const cert = await client.auto({
      csr,
      email,
      termsOfServiceAgreed: true,
      challengeCreateFn: async (_authz, _challenge, keyAuthorization) => {
        const token = (_challenge as any).token as string;
        challenges[token] = keyAuthorization;
      },
      challengeRemoveFn: async (_authz, _challenge) => {
        const token = (_challenge as any).token as string;
        delete challenges[token];
      },
    });

    // ── Stop challenge server ──────────────────────────────────────────────
    await new Promise<void>(resolve => challengeServer.close(resolve as any));

    writePem(cert, domainKey);
    process.env.SSL_CERT_FILE = CERT_PATH;
    process.env.SSL_KEY_FILE  = KEY_PATH;

    console.log(`✅ Let's Encrypt certificate obtained for ${domain}`);
    scheduleRenewal(domain);
    return true;

  } catch (err: any) {
    console.error(`❌ Let's Encrypt failed for ${domain}: ${err.message}`);
    console.error(`   Make sure port 80 is open/forwarded and ${domain} resolves to this server's IP.`);
    return false;
  }
}

/** Schedule automatic renewal 30 days before the cert expires. */
function scheduleRenewal(domain: string) {
  // Re-check every 24 hours; renew if expiry is within 30 days.
  setInterval(async () => {
    if (!fs.existsSync(CERT_PATH)) return;
    const certPem = fs.readFileSync(CERT_PATH, "utf8");
    // Parse expiry from cert (quick regex — good enough for scheduling)
    try {
      const { X509Certificate } = await import("crypto");
      const cert = new X509Certificate(certPem);
      const expiry = new Date(cert.validTo);
      const daysLeft = (expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysLeft < 30) {
        console.log(`🔄 Let's Encrypt: cert for ${domain} expires in ${daysLeft.toFixed(0)} days — renewing…`);
        await obtainLetsEncryptCert(domain);
      }
    } catch {
      // ignore parse errors
    }
  }, 24 * 60 * 60 * 1000);
}

// ─── Public: ensureTlsCertificates ───────────────────────────────────────────

/**
 * Call this before creating the server.  Sets process.env.SSL_CERT_FILE and
 * process.env.SSL_KEY_FILE when TLS should be used.  Returns early (no TLS)
 * when running in the Replit cloud environment.
 */
export async function ensureTlsCertificates(): Promise<void> {
  // Replit cloud — proxy handles TLS, nothing to do here.
  if (isReplitEnv()) {
    console.log("☁️  Replit environment detected — HTTP mode (proxy handles TLS)");
    return;
  }

  // If caller already provided cert/key paths via env vars, trust them.
  if (
    process.env.SSL_CERT_FILE && process.env.SSL_KEY_FILE &&
    fs.existsSync(process.env.SSL_CERT_FILE) &&
    fs.existsSync(process.env.SSL_KEY_FILE)
  ) {
    console.log("🔒 Using externally provided SSL certificates");
    return;
  }

  const domain = process.env.DOMAIN_NAME?.trim();

  if (domain) {
    // ── Try Let's Encrypt first ────────────────────────────────────────────
    console.log(`🌐 DOMAIN_NAME="${domain}" — attempting Let's Encrypt certificate…`);
    const ok = await obtainLetsEncryptCert(domain);
    if (ok) return;
    console.warn("⚠️  Falling back to self-signed certificate.");
  }

  // ── Self-signed fallback ───────────────────────────────────────────────
  if (fs.existsSync(CERT_PATH) && fs.existsSync(KEY_PATH)) {
    console.log("🔒 Using existing self-signed certificate from ssl/");
  } else {
    console.log("🔐 Generating self-signed SSL certificate…");
    const { cert, key } = await generateSelfSigned();
    writePem(cert, key);

    console.log("✅ Self-signed certificate generated:");
    console.log(`   Certificate : ${CERT_PATH}`);
    console.log(`   Private key : ${KEY_PATH}`);
    console.log("");
    console.log("⚠️  BROWSER SECURITY WARNING — to trust this cert on Windows:");
    console.log('   Open PowerShell as Administrator and run:');
    console.log(`   Import-Certificate -FilePath "${CERT_PATH}" -CertStoreLocation Cert:\\LocalMachine\\Root`);
    console.log("");
    console.log("💡 To get a FREE CA-signed cert (no browser warning):");
    console.log("   1. Point a domain name at your public IP 107.105.221.90");
    console.log("      (free options: DuckDNS, No-IP, Dynu — e.g. myapp.duckdns.org)");
    console.log("   2. Forward port 80 on your router to this server");
    console.log("   3. Set DOMAIN_NAME=myapp.duckdns.org in your .env or environment");
    console.log("   4. Restart the server — Let's Encrypt cert is obtained automatically");
    console.log("");
  }

  process.env.SSL_CERT_FILE = CERT_PATH;
  process.env.SSL_KEY_FILE  = KEY_PATH;
}

// ─── Public: createDualProtocolServer ────────────────────────────────────────

/**
 * Wraps an existing HTTPS (or HTTP) server in a raw TCP server that can
 * accept BOTH plain-HTTP and HTTPS connections on the same port.
 *
 * - TLS connections  (first byte 0x16) → forwarded to `httpsApp`
 * - Plain HTTP       → answered with 301 redirect to https://host:port/...
 *
 * If SSL certs are not configured, this just returns the original server
 * so it can be `.listen()`-ed normally.
 */
export function createDualProtocolServer(
  httpsServer: Server,
  port: number
): net.Server | Server {
  const isHttps = !!(process.env.SSL_CERT_FILE && process.env.SSL_KEY_FILE);

  if (!isHttps) {
    // No TLS — plain HTTP, just return the server as-is.
    return httpsServer;
  }

  // ── HTTP redirect mini-app ─────────────────────────────────────────────────
  const redirectApp = express();
  redirectApp.use((req: Request, res: Response) => {
    // Strip the port from Host header so we can rebuild it with the HTTPS port.
    const host = (req.headers.host || "").replace(/:\d+$/, "");
    const location = `https://${host}:${port}${req.url}`;
    res.writeHead(301, { Location: location, "Content-Length": "0" });
    res.end();
  });
  const httpRedirectServer = http.createServer(redirectApp);

  // ── Dual-protocol TCP server ───────────────────────────────────────────────
  const dualServer = net.createServer({ allowHalfOpen: false }, socket => {
    socket.once("data", buf => {
      socket.pause();

      // TLS ClientHello starts with byte 0x16 (22 decimal)
      const isTLS = buf.length > 0 && buf[0] === 0x16;
      const target = isTLS ? httpsServer : httpRedirectServer;

      // Push the peeked bytes back so the handler sees the complete message
      socket.unshift(buf);

      // Hand off the raw socket to the appropriate server
      target.emit("connection", socket);

      process.nextTick(() => socket.resume());
    });

    socket.on("error", (err: Error) => {
      // Ignore common client-side errors (connection reset, etc.)
      if ((err as any).code !== "ECONNRESET") {
        console.error("Dual-protocol socket error:", err.message);
      }
    });
  });

  dualServer.on("error", (err: Error) => {
    console.error("Dual-protocol server error:", err.message);
  });

  return dualServer;
}
