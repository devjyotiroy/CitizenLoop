Write-Host "Replacing 'HelpForYou' with 'Citizen Loop' in all files..." -ForegroundColor Green

$files = Get-ChildItem -Path "." -Recurse -Include *.jsx,*.js,*.html,*.css,*.md,*.env -Exclude node_modules,dist,.dist,package-lock.json

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -match "HelpForYou") {
        $newContent = $content -replace "HelpForYou", "Citizen Loop"
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $count++
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nTotal files updated: $count" -ForegroundColor Green
Write-Host "Replacement complete!" -ForegroundColor Cyan
