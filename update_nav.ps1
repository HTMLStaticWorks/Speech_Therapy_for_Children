$dir = "c:\Users\sabarinath\Desktop\developer\therapy"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$regex = '(?i)(<li class="nav-item"><a class="nav-link[^>]*href="index\.html">Home</a></li>)'
$insertion = "`$1`r`n                    <li class=`"nav-item`"><a class=`"nav-link`" href=`"home-2.html`">Home 2</a></li>"

$offcanvasRegex = '(?i)(<li class="nav-item"><a class="nav-link[^>]*href="index\.html">Home</a></li>)'

foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    
    # We want to replace it globally in the file (there are two navbars usually: main and mobile offcanvas)
    # The -replace operator replaces all occurrences by default.
    if ($content -notmatch 'href="home-2\.html">Home 2') {
        $newContent = [regex]::Replace($content, $regex, $insertion)
        if ($newContent -ne $content) {
            Set-Content -Path $f.FullName -Value $newContent -Encoding UTF8
            Write-Host "Updated navbar in $($f.Name)"
        }
    }
}
