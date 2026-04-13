# PowerShell script to generate a self-signed SSL certificate for HTTPS
# Run this script on your Windows Server to enable HTTPS access

param(
    [string]$OutputDir = "ssl",
    [string]$ServerIP = "103.35.203.22",
    [int]$ValidDays = 3650
)

Write-Host "=== SSL Certificate Generator for SRPH-MIS ===" -ForegroundColor Cyan
Write-Host ""

# Create output directory
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
    Write-Host "Created directory: $OutputDir" -ForegroundColor Green
}

$certPath = Join-Path $OutputDir "cert.pem"
$keyPath  = Join-Path $OutputDir "key.pem"

# Check if OpenSSL is available
$openssl = Get-Command openssl -ErrorAction SilentlyContinue

if ($openssl) {
    Write-Host "Using OpenSSL to generate certificate..." -ForegroundColor Yellow
    Write-Host ""

    # Create OpenSSL config with the server IP
    $confContent = @"
[req]
default_bits       = 2048
prompt             = no
default_md         = sha256
distinguished_name = dn
x509_extensions    = v3_req

[dn]
C  = PH
ST = Philippines
L  = Manila
O  = SRPH-MIS
CN = SRPH-MIS Server

[v3_req]
subjectAltName = @alt_names
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment

[alt_names]
IP.1 = $ServerIP
IP.2 = 127.0.0.1
DNS.1 = localhost
"@
    $confPath = Join-Path $OutputDir "openssl.cnf"
    $confContent | Out-File -FilePath $confPath -Encoding UTF8

    # Generate certificate and key
    & openssl req -x509 -newkey rsa:2048 -keyout $keyPath -out $certPath `
        -days $ValidDays -nodes -config $confPath 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Certificate generated successfully!" -ForegroundColor Green
        Write-Host "  Certificate: $certPath" -ForegroundColor Cyan
        Write-Host "  Private Key: $keyPath" -ForegroundColor Cyan
    } else {
        Write-Host "OpenSSL failed. Trying PowerShell method..." -ForegroundColor Yellow
        $openssl = $null
    }
}

if (-not $openssl) {
    Write-Host "Using PowerShell to generate self-signed certificate..." -ForegroundColor Yellow

    # Generate using PowerShell (Windows only)
    $cert = New-SelfSignedCertificate `
        -Subject "CN=SRPH-MIS Server, O=SRPH-MIS, C=PH" `
        -DnsName "localhost", "SRPH-MIS" `
        -IPAddress $ServerIP, "127.0.0.1" `
        -KeyAlgorithm RSA `
        -KeyLength 2048 `
        -HashAlgorithm SHA256 `
        -NotAfter (Get-Date).AddDays($ValidDays) `
        -CertStoreLocation "Cert:\LocalMachine\My"

    if ($cert) {
        # Export certificate (public)
        $certBytes = $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
        $certB64 = [System.Convert]::ToBase64String($certBytes, [System.Base64FormattingOptions]::InsertLineBreaks)
        "-----BEGIN CERTIFICATE-----`n$certB64`n-----END CERTIFICATE-----" | Out-File -FilePath $certPath -Encoding ASCII

        # Export private key (requires extra work on Windows)
        Write-Host ""
        Write-Host "Certificate exported to: $certPath" -ForegroundColor Green
        Write-Host ""
        Write-Host "NOTE: To export the private key, you need to use the Certificate Manager:" -ForegroundColor Yellow
        Write-Host "  1. Open certlm.msc (Certificate Manager - Local Machine)" -ForegroundColor White
        Write-Host "  2. Go to Personal > Certificates" -ForegroundColor White
        Write-Host "  3. Find 'SRPH-MIS Server', right-click > All Tasks > Export" -ForegroundColor White
        Write-Host "  4. Export with private key as PFX, then convert using:" -ForegroundColor White
        Write-Host "     openssl pkcs12 -in cert.pfx -nocerts -nodes -out ssl\key.pem" -ForegroundColor Cyan
        Write-Host "     openssl pkcs12 -in cert.pfx -clcerts -nokeys -out ssl\cert.pem" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "OR install OpenSSL for Windows and re-run this script:" -ForegroundColor Yellow
        Write-Host "  https://slproweb.com/products/Win32OpenSSL.html" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a .env file in the project root with:" -ForegroundColor White
Write-Host "   SSL_CERT_FILE=ssl/cert.pem" -ForegroundColor Green
Write-Host "   SSL_KEY_FILE=ssl/key.pem" -ForegroundColor Green
Write-Host "   DATABASE_URL=postgresql://user:password@localhost:5432/srph_mis" -ForegroundColor Green
Write-Host ""
Write-Host "2. Start the application:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Green
Write-Host ""
Write-Host "3. Access from other devices:" -ForegroundColor White
Write-Host "   https://$ServerIP`:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Since this is a self-signed certificate, browsers will show a security" -ForegroundColor Yellow
Write-Host "warning. Click 'Advanced' and 'Proceed' to continue." -ForegroundColor Yellow
