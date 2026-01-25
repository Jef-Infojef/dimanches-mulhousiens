@echo off
powershell -Command "Get-Content nextjs-logs.txt -Wait -Tail 100"
