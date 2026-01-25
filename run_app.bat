@echo off
title SERVEUR - Dimanches Mulhousiens (Port 3002)
echo ======================================================
echo   LANCEMENT DU SERVEUR : DIMANCHES MULHOUSIENS
echo ======================================================
echo.
echo [INFO] Le serveur demarre sur http://localhost:3002
echo [INFO] Les logs sont sauvegardes dans nextjs-logs.txt
echo [INFO] Fermez cette fenetre pour arreter de voir les logs.
echo.

set PORT=3002
:: Lance le serveur en arriere-plan sur le port 3002
start /B npm run dev -- -p 3002 > nextjs-logs.txt 2>&1

:: Attend 2 secondes que le fichier de log s'initialise
timeout /t 2 > nul

:: Affiche les logs en temps reel (tail -f)
powershell -Command "Get-Content nextjs-logs.txt -Wait -Tail 100"