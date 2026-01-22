# Configuration
$projectName = "Dimanches-Mulhousiens"
$backupRoot = "P:\Backups\$projectName"
$date = Get-Date -Format "yyyy-MM-dd_HH-mm"
$zipName = "$projectName`_$date.zip"
$backupPath = Join-Path $backupRoot $zipName

Write-Host "Démarrage de la sauvegarde pour $projectName..." -ForegroundColor Cyan

# Création du dossier de backup s'il n'existe pas
if (!(Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null
}

# On utilise une commande temporaire pour copier les fichiers propres avant de zipper
$tempDir = Join-Path $env:TEMP "backup_$projectName"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item $tempDir -ItemType Directory | Out-Null

Write-Host "Préparation des fichiers (exclusion des dossiers lourds)..." -ForegroundColor Gray

# Copie des fichiers en excluant node_modules, .next, etc.
robocopy . $tempDir /MIR /XD node_modules .next .vercel .git public\node_modules /R:0 /W:0 /NFL /NDL /NJH /NJS /nc /ns /np

# Compression
Write-Host "Compression en cours vers $backupPath..." -ForegroundColor Yellow
Compress-Archive -Path "$tempDir\*" -DestinationPath $backupPath -Force

# Nettoyage
Remove-Item $tempDir -Recurse -Force

Write-Host "`nSauvegarde terminée avec succès !" -ForegroundColor Green
Write-Host "Fichier : $backupPath" -ForegroundColor White