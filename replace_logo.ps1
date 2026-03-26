$dir = "c:\Users\sabarinath\Desktop\developer\therapy"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$regex = '(?i)<i class="bi bi-chat-heart-fill"></i>\s*<span>SpeechCare</span>'
$replacement = '<img src="assets/images/logo.svg" alt="Kinderly Logo" height="40">'

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -match $regex) {
        $content = $content -replace $regex, $replacement
        Set-Content -Path $f.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($f.Name)"
    }
}
