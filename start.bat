@echo off
title Aethera AI Marketing SaaS Starter
echo ===================================================
echo   Starting AI Marketing SaaS (Backend + Frontend)  
echo ===================================================
echo.
echo [1/2] Launching FastAPI Backend on http://localhost:8000 ...
start "Aethera Backend API" cmd /k "cd backend && python -m uvicorn app.main:app --reload --port 8000"

echo [2/2] Launching Vite Frontend on http://localhost:5173 ...
start "Aethera Frontend UI" cmd /k "cd frontend && npm run dev"

echo.
echo Both services are running in separate windows!
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
pause
