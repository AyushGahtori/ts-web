$ErrorActionPreference = "Stop"

$taskName = "Shutdown PC at 3AM IST"
$scriptPath = Join-Path $PSScriptRoot "shutdown-at-3am-ist.ps1"

if (-not (Test-Path -LiteralPath $scriptPath)) {
    throw "Shutdown script not found: $scriptPath"
}

$currentTimeZone = (Get-TimeZone).Id
if ($currentTimeZone -ne "India Standard Time") {
    Write-Warning "Current Windows time zone is '$currentTimeZone'. This task runs at 3:00 AM in the PC's local time zone. Set Windows to 'India Standard Time' if you want exactly 3:00 AM IST."
}

$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""

$trigger = New-ScheduledTaskTrigger -Daily -At 3:00AM

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable

Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Description "Shuts down this PC every day at 3:00 AM India Standard Time." `
    -Force | Out-Null

Enable-ScheduledTask -TaskName $taskName | Out-Null

Write-Host "Activated scheduled shutdown task: $taskName"
Write-Host "Runs daily at 03:00 on this PC's current time zone: $currentTimeZone"
