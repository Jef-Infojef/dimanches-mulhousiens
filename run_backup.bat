@echo off
echo Lancement du backup...
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\backup.ps1"
pause
