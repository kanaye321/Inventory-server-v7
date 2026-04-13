# Run this script ONCE as Administrator to make browsers trust the SRPH-MIS certificate.
# Right-click this file → "Run with PowerShell" (as Administrator)
#
# What this does:
#   Installs the self-signed certificate into Windows' Trusted Root store so that
#   Chrome, Edge, and other browsers show the green lock instead of "Not Secure".

param(
    [string]$CertFile = "ssl\cert.pem"
)

# Check Administrator privileges
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
if (-not $isAdmin) {
    Write-Host ""
    Write-Host "ERROR: This script must be run as Administrator." -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click PowerShell and choose 'Run as Administrator', then run:" -ForegroundColor Yellow
    Write-Host "  .\trust-ssl-cert.ps1" -ForegroundColor Cyan
    Write-Host ""
    pause
    exit 1
}

# Resolve full path
$certPath = Resolve-Path $CertFile -ErrorAction SilentlyContinue
if (-not $certPath) {
    Write-Host ""
    Write-Host "ERROR: Certificate file not found: $CertFile" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure you have started the app at least once with:" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor Cyan
    Write-Host "This auto-generates the certificate in the ssl\ folder." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
Write-Host "=== SRPH-MIS SSL Certificate Trust Setup ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Installing certificate from: $certPath" -ForegroundColor White

try {
    $result = Import-Certificate -FilePath $certPath -CertStoreLocation Cert:\LocalMachine\Root
    Write-Host ""
    Write-Host "SUCCESS! Certificate installed." -ForegroundColor Green
    Write-Host "  Thumbprint: $($result.Thumbprint)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Close and reopen your browser completely (or restart it)" -ForegroundColor White
    Write-Host "  2. Navigate to https://localhost:5000 or https://YOUR-SERVER-IP:5000" -ForegroundColor White
    Write-Host "  3. The browser should now show a secure lock icon" -ForegroundColor White
    Write-Host ""
    Write-Host "Note: On other devices on the network, you will still see the warning" -ForegroundColor Yellow
    Write-Host "unless you run this script on each device (or install the cert via Group Policy)." -ForegroundColor Yellow
} catch {
    Write-Host ""
    Write-Host "ERROR: Failed to install certificate: $_" -ForegroundColor Red
}

Write-Host ""
pause
