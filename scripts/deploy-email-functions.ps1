# Deploy email Edge Functions to Supabase
# Prerequisites: npx supabase login && npx supabase link --project-ref YOUR_REF

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

Write-Host ""
Write-Host "=== Deploy Email Functions ===" -ForegroundColor Cyan
Write-Host ""

$loggedIn = $false
try {
  npx supabase projects list 2>$null | Out-Null
  $loggedIn = $LASTEXITCODE -eq 0
} catch {}

if (-not $loggedIn) {
  Write-Host "Logging in to Supabase CLI..." -ForegroundColor Yellow
  npx supabase login
}

Write-Host ""
Write-Host "If not linked yet, run:" -ForegroundColor Gray
Write-Host "  npx supabase link --project-ref YOUR_PROJECT_REF"
Write-Host ""

$adminEmail = Read-Host "ADMIN_EMAIL (where you receive notifications)"
$resendKey = Read-Host "RESEND_API_KEY (from resend.com, or press Enter to skip)"
$fromEmail = Read-Host "FROM_EMAIL (e.g. ComputerGeek Academy <noreply@yourdomain.com>)"

if ($adminEmail) {
  npx supabase secrets set "ADMIN_EMAIL=$adminEmail"
}

if ($resendKey) {
  npx supabase secrets set "RESEND_API_KEY=$resendKey"
}

if ($fromEmail) {
  npx supabase secrets set "FROM_EMAIL=$fromEmail"
}

Write-Host ""
Write-Host "Deploying functions..." -ForegroundColor Yellow
npx supabase functions deploy notify-admin
npx supabase functions deploy send-student-email

Write-Host ""
Write-Host "Email functions deployed!" -ForegroundColor Green
Write-Host "Test: register a student at /login — you should receive an email." -ForegroundColor Gray
Write-Host ""
