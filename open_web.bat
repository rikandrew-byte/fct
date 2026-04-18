@echo off
echo Starting Next.js Dev Server...
start cmd /k "npm run dev"
echo Waiting for server to start (5 seconds)...
timeout /t 5 /nobreak >nul
start http://localhost:3000
exit
