import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";

// ── Constants ──────────────────────────────────────────────────────────────
const CANVAS_W = 800;
const CANVAS_H = 450;
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const SPEED = 4;
const TILE = 32;

// Sprite colours (pixel-art palette)
const COL = {
  sky: "#5c94fc",
  ground: "#c84c0c",
  groundTop: "#00a800",
  brick: "#d07030",
  brickDark: "#a04000",
  questionMark: "#f8b800",
  questionDark: "#c88000",
  mario: "#d82800",
  marioSkin: "#fca044",
  marioPants: "#0820d0",
  marioShoes: "#6a3000",
  goomba: "#a05000",
  goombaFace: "#c87800",
  coin: "#f8d800",
  cloud: "#ffffff",
  pipe: "#00a800",
  pipeDark: "#006800",
};

interface Platform { x: number; y: number; w: number; type: "ground" | "brick" | "qblock" | "pipe" }
interface Enemy { x: number; y: number; alive: boolean; dir: number; vy: number; dying: boolean; dyingTimer: number }
interface Coin { x: number; y: number; collected: boolean; anim: number }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string }

function buildLevel(camX: number) {
  const platforms: Platform[] = [];
  const enemies: Enemy[] = [];
  const coins: Coin[] = [];

  // Ground segments
  const groundTiles = 120;
  for (let i = 0; i < groundTiles; i++) {
    platforms.push({ x: i * TILE, y: CANVAS_H - TILE, w: TILE, type: "ground" });
  }
  // Gap at tile 14-15
  platforms.splice(14, 2);

  // Brick rows
  [[5, 6, CANVAS_H - TILE * 4], [8, 5, CANVAS_H - TILE * 4], [16, 4, CANVAS_H - TILE * 5]].forEach(
    ([tx, len, ty]) => {
      for (let i = 0; i < (len as number); i++) {
        platforms.push({ x: ((tx as number) + i) * TILE, y: ty as number, w: TILE, type: "brick" });
        if (i === 0 || i === (len as number) - 1) {
          coins.push({ x: ((tx as number) + i) * TILE + TILE / 2, y: (ty as number) - TILE, collected: false, anim: 0 });
        }
      }
    }
  );

  // Question blocks
  [[6, CANVAS_H - TILE * 4], [12, CANVAS_H - TILE * 5], [20, CANVAS_H - TILE * 5]].forEach(([tx, ty]) => {
    platforms.push({ x: (tx as number) * TILE, y: ty as number, w: TILE, type: "qblock" });
    coins.push({ x: (tx as number) * TILE + TILE / 2, y: (ty as number) - TILE, collected: false, anim: 0 });
  });

  // Pipes
  [[22, 2], [30, 3], [38, 2], [50, 3], [60, 2], [75, 3], [90, 2]].forEach(([tx, h]) => {
    for (let i = 0; i < (h as number); i++) {
      platforms.push({ x: (tx as number) * TILE, y: CANVAS_H - TILE - (i + 1) * TILE, w: TILE * 2, type: "pipe" });
    }
  });

  // Enemies
  [[10, 3], [18, 3], [25, 3], [35, 3], [45, 3], [55, 3], [65, 3], [80, 3], [95, 3]].forEach(([tx, _]) => {
    enemies.push({ x: (tx as number) * TILE, y: CANVAS_H - TILE * 2, alive: true, dir: -1, vy: 0, dying: false, dyingTimer: 0 });
  });

  // Floating coins
  [[9, 7], [10, 7], [11, 7], [28, 6], [29, 6], [48, 7], [49, 7], [70, 6], [71, 6]].forEach(([tx, ty]) => {
    coins.push({ x: (tx as number) * TILE + TILE / 2, y: (ty as number) * TILE, collected: false, anim: 0 });
  });

  return { platforms, enemies, coins };
}

export default function SecretGarden() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<any>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const animRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gamePhase, setGamePhase] = useState<"playing" | "dead" | "gameover" | "win">("playing");
  const [displayScore, setDisplayScore] = useState(0);

  function initState() {
    const { platforms, enemies, coins } = buildLevel(0);
    return {
      mario: { x: 80, y: CANVAS_H - TILE * 2, vx: 0, vy: 0, onGround: false, facing: 1, walking: 0, dead: false, deadTimer: 0 },
      cam: { x: 0 },
      platforms,
      enemies,
      coins,
      particles: [] as Particle[],
      score: 0,
      lives: 3,
      phase: "playing" as string,
      timer: 0,
    };
  }

  useEffect(() => {
    stateRef.current = initState();

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowLeft","ArrowRight","ArrowUp","Space"," ","a","d","w"].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current.add(e.key);
    };
    const offKey = (e: KeyboardEvent) => { keysRef.current.delete(e.key); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", offKey);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function rectOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
      return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) {
      ctx.fillStyle = COL.cloud;
      ctx.beginPath();
      ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
      ctx.arc(x + 22 * scale, y - 8 * scale, 25 * scale, 0, Math.PI * 2);
      ctx.arc(x + 50 * scale, y, 20 * scale, 0, Math.PI * 2);
      ctx.arc(x + 25 * scale, y + 15 * scale, 20 * scale, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawMario(ctx: CanvasRenderingContext2D, mario: any, camX: number) {
      const mx = mario.x - camX;
      const my = mario.y;
      const f = mario.facing;
      ctx.save();
      ctx.translate(mx + 12, my + 16);
      if (f < 0) ctx.scale(-1, 1);

      // Hat
      ctx.fillStyle = COL.mario;
      ctx.fillRect(-10, -28, 20, 6);
      ctx.fillRect(-7, -34, 16, 6);
      // Face
      ctx.fillStyle = COL.marioSkin;
      ctx.fillRect(-8, -22, 16, 10);
      // Eyes + mustache
      ctx.fillStyle = "#000";
      ctx.fillRect(2, -20, 3, 3);
      ctx.fillStyle = COL.mario;
      ctx.fillRect(-6, -14, 14, 4);
      // Body
      ctx.fillStyle = COL.marioPants;
      ctx.fillRect(-9, -12, 18, 12);
      // Shoes
      ctx.fillStyle = COL.marioShoes;
      ctx.fillRect(-10, 0, 10, 5);
      ctx.fillRect(2, 0, 10, 5);
      ctx.restore();
    }

    function drawGoomba(ctx: CanvasRenderingContext2D, e: Enemy, camX: number) {
      const ex = e.x - camX;
      const ey = e.y;
      if (e.dying) {
        ctx.fillStyle = COL.goomba;
        ctx.fillRect(ex, ey + 20, TILE, 12);
        return;
      }
      // Body
      ctx.fillStyle = COL.goomba;
      ctx.beginPath();
      ctx.ellipse(ex + TILE / 2, ey + TILE / 2, TILE / 2, TILE / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      // Face
      ctx.fillStyle = COL.goombaFace;
      ctx.fillRect(ex + 4, ey + 8, 24, 14);
      // Eyes
      ctx.fillStyle = "#fff";
      ctx.fillRect(ex + 6, ey + 10, 7, 6);
      ctx.fillRect(ex + 19, ey + 10, 7, 6);
      ctx.fillStyle = "#000";
      ctx.fillRect(ex + 9, ey + 11, 3, 4);
      ctx.fillRect(ex + 22, ey + 11, 3, 4);
      // Feet
      ctx.fillStyle = "#000";
      const walkOff = Math.sin(stateRef.current.timer * 0.2) * 3;
      ctx.fillRect(ex + 2, ey + 22 + walkOff, 10, 8);
      ctx.fillRect(ex + 20, ey + 22 - walkOff, 10, 8);
    }

    function drawPlatform(ctx: CanvasRenderingContext2D, p: Platform, camX: number, timer: number) {
      const px = p.x - camX;
      const py = p.y;
      const pw = p.w;
      if (px + pw < -TILE || px > CANVAS_W + TILE) return;

      if (p.type === "ground") {
        ctx.fillStyle = COL.groundTop;
        ctx.fillRect(px, py, pw, 8);
        ctx.fillStyle = COL.ground;
        ctx.fillRect(px, py + 8, pw, TILE - 8);
        ctx.fillStyle = "#a03000";
        ctx.fillRect(px, py + 8, pw, 2);
      } else if (p.type === "brick") {
        ctx.fillStyle = COL.brick;
        ctx.fillRect(px, py, pw, TILE);
        ctx.fillStyle = COL.brickDark;
        ctx.fillRect(px, py + TILE / 2 - 1, pw, 2);
        ctx.fillRect(px + pw / 2 - 1, py, 2, TILE);
      } else if (p.type === "qblock") {
        const pulse = Math.sin(timer * 0.1) * 0.15 + 0.85;
        ctx.fillStyle = COL.questionMark;
        ctx.fillRect(px, py, pw, TILE);
        ctx.fillStyle = COL.questionDark;
        ctx.fillRect(px, py + TILE - 4, pw, 4);
        ctx.fillRect(px, py, pw, 4);
        ctx.fillRect(px, py, 4, TILE);
        ctx.fillRect(px + pw - 4, py, 4, TILE);
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${Math.round(18 * pulse)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText("?", px + pw / 2, py + 23);
      } else if (p.type === "pipe") {
        const isTop = !stateRef.current.platforms.some((o: Platform) => o.type === "pipe" && o.x === p.x && o.y === p.y + TILE);
        ctx.fillStyle = COL.pipe;
        ctx.fillRect(px, py, pw, TILE);
        ctx.fillStyle = COL.pipeDark;
        ctx.fillRect(px + pw - 8, py, 8, TILE);
        if (isTop) {
          ctx.fillStyle = COL.pipe;
          ctx.fillRect(px - 4, py, pw + 8, TILE / 2);
          ctx.fillStyle = COL.pipeDark;
          ctx.fillRect(px + pw + 4 - 8, py, 8, TILE / 2);
        }
      }
    }

    function drawCoin(ctx: CanvasRenderingContext2D, c: Coin, camX: number) {
      if (c.collected) return;
      const cx = c.x - camX;
      const scale = Math.abs(Math.cos(c.anim * 0.1)) * 0.5 + 0.5;
      ctx.fillStyle = COL.coin;
      ctx.beginPath();
      ctx.ellipse(cx, c.y, 8 * scale, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(cx - 2 * scale, c.y - 2, 3 * scale, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop() {
      const s = stateRef.current;
      if (!s) return;
      s.timer++;
      const keys = keysRef.current;

      if (s.phase === "playing") {
        const { mario, platforms, enemies, coins, particles } = s;

        // Input
        if (!mario.dead) {
          if (keys.has("ArrowLeft") || keys.has("a")) { mario.vx = -SPEED; mario.facing = -1; mario.walking++; }
          else if (keys.has("ArrowRight") || keys.has("d")) { mario.vx = SPEED; mario.facing = 1; mario.walking++; }
          else { mario.vx = 0; mario.walking = 0; }

          if ((keys.has("ArrowUp") || keys.has("w") || keys.has(" ")) && mario.onGround) {
            mario.vy = JUMP_FORCE;
            mario.onGround = false;
          }
        }

        // Physics
        mario.vy += GRAVITY;
        mario.x += mario.vx;
        mario.y += mario.vy;
        mario.onGround = false;

        // Platform collisions
        const mw = 24, mh = 32;
        for (const p of platforms) {
          if (!rectOverlap(mario.x, mario.y, mw, mh, p.x, p.y, p.w, TILE)) continue;
          const overlapX = Math.min(mario.x + mw, p.x + p.w) - Math.max(mario.x, p.x);
          const overlapY = Math.min(mario.y + mh, p.y + TILE) - Math.max(mario.y, p.y);
          if (overlapX < overlapY) {
            if (mario.x + mw / 2 < p.x + p.w / 2) mario.x = p.x - mw; else mario.x = p.x + p.w;
            mario.vx = 0;
          } else {
            if (mario.y + mh / 2 < p.y + TILE / 2) {
              mario.y = p.y - mh;
              mario.vy = 0;
              mario.onGround = true;
            } else {
              mario.y = p.y + TILE;
              mario.vy = Math.abs(mario.vy) * 0.3;
              // Hit question block from below
              if (p.type === "qblock") {
                const ci = coins.findIndex((c: Coin) => Math.abs(c.x - (p.x + TILE / 2)) < 4 && c.y === p.y - TILE);
                if (ci >= 0 && !coins[ci].collected) {
                  coins[ci].collected = true;
                  s.score += 100;
                  setDisplayScore(s.score);
                  for (let i = 0; i < 8; i++) {
                    particles.push({ x: p.x + TILE / 2, y: p.y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 6 - 2, life: 30, color: COL.coin });
                  }
                }
              }
            }
          }
        }

        // Death by falling
        if (mario.y > CANVAS_H + 100 && !mario.dead) {
          mario.dead = true;
          mario.deadTimer = 90;
        }

        // Enemy movement
        for (const e of enemies) {
          if (!e.alive) continue;
          if (e.dying) {
            e.dyingTimer--;
            if (e.dyingTimer <= 0) e.alive = false;
            continue;
          }
          e.x += e.dir * 1.5;
          e.vy += GRAVITY;
          e.y += e.vy;
          e.onGround = false;
          for (const p of platforms) {
            if (!rectOverlap(e.x, e.y, TILE, TILE, p.x, p.y, p.w, TILE)) continue;
            if (e.y + TILE / 2 < p.y + TILE / 2) {
              e.y = p.y - TILE;
              e.vy = 0;
              (e as any).onGround = true;
            } else {
              e.dir *= -1;
            }
          }
          if (!(e as any).onGround) { /* stay */ }
          // Reverse at edges
          const nearEdge = !platforms.some(p => p.type === "ground" && p.x <= e.x + e.dir * 4 && p.x + p.w >= e.x + e.dir * 4 + TILE / 2);
          if (nearEdge) e.dir *= -1;

          // Mario vs enemy
          if (mario.dead) continue;
          if (rectOverlap(mario.x, mario.y, mw, mh, e.x + 2, e.y + 2, TILE - 4, TILE - 4)) {
            if (mario.vy > 0 && mario.y + mh < e.y + TILE * 0.6) {
              // Stomp
              e.dying = true;
              e.dyingTimer = 30;
              mario.vy = JUMP_FORCE * 0.6;
              s.score += 200;
              setDisplayScore(s.score);
              for (let i = 0; i < 6; i++) {
                particles.push({ x: e.x + TILE / 2, y: e.y, vx: (Math.random() - 0.5) * 5, vy: -Math.random() * 4, life: 25, color: COL.goomba });
              }
            } else {
              if (!mario.dead) { mario.dead = true; mario.deadTimer = 90; }
            }
          }
        }

        // Coin collection
        for (const c of coins) {
          if (c.collected) continue;
          c.anim++;
          if (rectOverlap(mario.x, mario.y, mw, mh, c.x - 10, c.y - 10, 20, 20)) {
            c.collected = true;
            s.score += 100;
            setDisplayScore(s.score);
            for (let i = 0; i < 5; i++) {
              particles.push({ x: c.x, y: c.y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 5 - 2, life: 20, color: COL.coin });
            }
          }
        }

        // Win condition (reach end of level ~90 tiles)
        if (!mario.dead && mario.x > 90 * TILE) {
          s.phase = "win";
          setGamePhase("win");
          setScore(s.score);
        }

        // Dead timer
        if (mario.dead) {
          mario.deadTimer--;
          if (!mario.launched) {
            mario.vy = -15;
            mario.vx = 0;
            mario.launched = true;
          }
          mario.y += mario.vy;
          mario.vy += GRAVITY;
          if (mario.deadTimer <= 0) {
            s.lives--;
            setLives(s.lives);
            if (s.lives <= 0) {
              s.phase = "gameover";
              setGamePhase("gameover");
              setScore(s.score);
            } else {
              s.phase = "dead";
              setGamePhase("dead");
              setScore(s.score);
            }
          }
        }

        // Particles
        for (const p of particles) { p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life--; }
        s.particles = particles.filter((p: Particle) => p.life > 0);

        // Camera
        const targetCam = mario.x - CANVAS_W * 0.4;
        s.cam.x += (targetCam - s.cam.x) * 0.1;
        if (s.cam.x < 0) s.cam.x = 0;
      }

      // ── Draw ──────────────────────────────────────────────────────────────
      const camX = s.cam.x;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      skyGrad.addColorStop(0, "#1a78c2");
      skyGrad.addColorStop(1, COL.sky);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Clouds
      [[80, 60], [220, 40], [400, 70], [600, 45], [750, 60], [950, 50], [1100, 70], [1300, 45]].forEach(([cx, cy]) => {
        drawCloud(ctx, (cx as number) - (camX * 0.3) % CANVAS_W, cy as number, 0.8);
      });

      // Platforms
      ctx.textAlign = "center";
      for (const p of s.platforms) drawPlatform(ctx, p, camX, s.timer);

      // Coins
      for (const c of s.coins) drawCoin(ctx, c, camX);

      // Enemies
      for (const e of s.enemies) {
        if (!e.alive) continue;
        drawGoomba(ctx, e, camX);
      }

      // Mario
      if (!s.mario.dead || s.mario.deadTimer > 0) {
        drawMario(ctx, s.mario, camX);
      }

      // Particles
      for (const p of s.particles) {
        ctx.globalAlpha = p.life / 30;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - camX - 4, p.y - 4, 8, 8);
        ctx.globalAlpha = 1;
      }

      // HUD
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE: ${s.score}`, 12, 28);
      ctx.textAlign = "right";
      ctx.fillText(`♥ ${s.lives}`, CANVAS_W - 12, 28);
      ctx.textAlign = "center";
      ctx.fillText("SUPER MARIO - Secret Garden", CANVAS_W / 2, 28);

      // Overlay screens
      if (s.phase === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px monospace";
        ctx.textAlign = "center";
        ctx.fillText("YOU DIED!", CANVAS_W / 2, CANVAS_H / 2 - 20);
        ctx.font = "20px monospace";
        ctx.fillText("Press R to try again", CANVAS_W / 2, CANVAS_H / 2 + 20);
      }
      if (s.phase === "gameover") {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#f44";
        ctx.font = "bold 50px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 30);
        ctx.fillStyle = "#fff";
        ctx.font = "20px monospace";
        ctx.fillText(`Final Score: ${s.score}`, CANVAS_W / 2, CANVAS_H / 2 + 10);
        ctx.fillText("Press R to restart", CANVAS_W / 2, CANVAS_H / 2 + 45);
      }
      if (s.phase === "win") {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#fd0";
        ctx.font = "bold 48px monospace";
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN! 🎉", CANVAS_W / 2, CANVAS_H / 2 - 30);
        ctx.fillStyle = "#fff";
        ctx.font = "20px monospace";
        ctx.fillText(`Score: ${s.score}`, CANVAS_W / 2, CANVAS_H / 2 + 10);
        ctx.fillText("Press R to play again", CANVAS_W / 2, CANVAS_H / 2 + 45);
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);

    // Restart handler
    const onRestart = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        stateRef.current = initState();
        setGamePhase("playing");
        setDisplayScore(0);
        setLives(3);
      }
    };
    window.addEventListener("keydown", onRestart);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", offKey);
      window.removeEventListener("keydown", onRestart);
    };
  }, []);

  return (
    <div className="space-y-4">
      <PageHeader
        title="🍄 Secret Garden — Super Mario"
        description="Arrow keys or WASD to move & jump • Stomp Goombas • Collect coins • Press R to restart"
      />
      <div className="flex justify-center">
        <div style={{ position: "relative", display: "inline-block" }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            style={{
              border: "4px solid #c84c0c",
              borderRadius: 8,
              display: "block",
              maxWidth: "100%",
              imageRendering: "pixelated",
              background: COL.sky,
            }}
            tabIndex={0}
          />
          {/* Mobile controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              gap: 8,
            }}
          >
            {[["←","ArrowLeft"],["↑ Jump","ArrowUp"],["→","ArrowRight"]].map(([label, key]) => (
              <button
                key={key}
                style={{
                  flex: 1, padding: "10px 0", fontSize: 18, fontWeight: "bold",
                  background: "#c84c0c", color: "#fff", border: "none",
                  borderRadius: 6, cursor: "pointer", userSelect: "none",
                }}
                onPointerDown={() => keysRef.current.add(key)}
                onPointerUp={() => keysRef.current.delete(key)}
                onPointerLeave={() => keysRef.current.delete(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 4 }}>
            <button
              style={{
                padding: "6px 24px", fontSize: 14, fontWeight: "bold",
                background: "#1a78c2", color: "#fff", border: "none",
                borderRadius: 6, cursor: "pointer",
              }}
              onClick={() => {
                stateRef.current = initState();
                setGamePhase("playing");
                setDisplayScore(0);
                setLives(3);
              }}
            >
              Restart (R)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
