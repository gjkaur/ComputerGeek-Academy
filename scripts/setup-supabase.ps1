# ComputerGeek Academy — Supabase setup helper (Windows PowerShell)
# Run from project root:  .\scripts\setup-supabase.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

Write-Host ""
Write-Host "=== ComputerGeek Academy — Supabase Setup ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: .env file
$envPath = Join-Path $root ".env"
if (-not (Test-Path $envPath)) {
  Write-Host "Step 1: Create .env file" -ForegroundColor Yellow
  Write-Host "Get these from Supabase Dashboard -> Project Settings -> API"
  Write-Host ""

  $url = Read-Host "VITE_SUPABASE_URL (e.g. https://xxxxx.supabase.co)"
  $key = Read-Host "VITE_SUPABASE_ANON_KEY (anon public key)"

  @"
# Supabase
VITE_SUPABASE_URL=$url
VITE_SUPABASE_ANON_KEY=$key
"@ | Set-Content -Path $envPath -Encoding UTF8

  Write-Host "Created .env" -ForegroundColor Green
} else {
  Write-Host "Step 1: .env already exists — skipping" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Run database SQL" -ForegroundColor Yellow
Write-Host "  1. Open Supabase Dashboard -> SQL Editor"
Write-Host "  2. Paste and run: supabase/full-setup.sql"
Write-Host ""

Write-Host "Step 3: Auth settings (Supabase Dashboard)" -ForegroundColor Yellow
Write-Host "  - Authentication -> Providers -> Email: ON"
Write-Host "  - Authentication -> Multi-Factor Authentication -> TOTP: ON"
Write-Host "  - (Dev) Authentication -> Email -> Confirm email: OFF"
Write-Host ""

Write-Host "Step 4: Create admin account" -ForegroundColor Yellow
Write-Host "  1. npm run dev  ->  register at http://localhost:5173/login"
Write-Host "  2. SQL Editor:"
Write-Host "     update public.profiles set role='admin', approval_status='approved'"
Write-Host "     where email='YOUR_EMAIL';"
Write-Host "  3. Admin login: http://localhost:5173/admin/login (set up MFA)"
Write-Host ""

$deployEmail = Read-Host "Deploy email Edge Functions now? (y/n)"
if ($deployEmail -eq "y") {
  & (Join-Path $root "scripts\deploy-email-functions.ps1")
} else {
  Write-Host ""
  Write-Host "Email deploy skipped. See supabase/EMAIL_SETUP.md when ready." -ForegroundColor Gray
}

Write-Host ""
Write-Host "Step 5: Update payment details in src/data/siteContent.js" -ForegroundColor Yellow
Write-Host ""
Write-Host "Done! Start dev server: npm run dev" -ForegroundColor Green
Write-Host ""
