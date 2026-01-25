$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [System.IO.Path]::Combine([Environment]::GetFolderPath("Desktop"), "SERVEUR - Dimanches Mulhousiens.lnk")
$Shortcut = $WshShell.CreateShortcut($DesktopPath)
$Shortcut.TargetPath = "C:\dev\Dimanches Mulhousiens\run_app.bat"
$Shortcut.WorkingDirectory = "C:\dev\Dimanches Mulhousiens"
$Shortcut.Description = "Lancer le serveur Dimanches Mulhousiens (Port 3002)"
$Shortcut.IconLocation = "shell32.dll,14" 
$Shortcut.Save()

# Supprimer l'ancien raccourci s'il existe
$OldShortcut = [System.IO.Path]::Combine([Environment]::GetFolderPath("Desktop"), "Dimanches Mulhousiens.lnk")
if (Test-Path $OldShortcut) { Remove-Item $OldShortcut }

Write-Host "Le raccourci SERVEUR a ete mis a jour sur le bureau."