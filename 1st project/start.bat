@echo off
echo ============================================
echo    Starting Zidio Data Analytics Platform
echo ============================================
echo.

echo Checking MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ MongoDB is not running. Please start MongoDB first.
    echo Run: net start MongoDB
    echo Or: mongod
    pause
    exit /b 1
)
echo ✓ MongoDB is running

echo.
echo Starting servers...
echo.

cd /d "%~dp0"

start "Zidio Backend" cmd /c "echo Starting Backend Server... && npm run dev && pause"

timeout /t 3 /nobreak >nul

cd frontend
start "Zidio Frontend" cmd /c "echo Starting Frontend Server... && npm start && pause"

echo.
echo ============================================
echo    Servers are starting...
echo ============================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
