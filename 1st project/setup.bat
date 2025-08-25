@echo off
echo ============================================
echo    Zidio Data Analytics Platform Setup
echo ============================================
echo.

echo [1/4] Checking MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MongoDB is running
) else (
    echo ✗ MongoDB is not running
    echo.
    echo Please start MongoDB first:
    echo - If MongoDB is installed as a service: net start MongoDB
    echo - If MongoDB is installed manually: mongod
    echo - Or install MongoDB from: https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)

echo.
echo [2/4] Installing backend dependencies...
cd /d "%~dp0"
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo.
echo [3/4] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

echo.
echo [4/4] Setup complete!
echo.
echo ============================================
echo    Ready to start the application!
echo ============================================
echo.
echo To start the servers:
echo 1. Backend: npm run dev (in root directory)
echo 2. Frontend: npm start (in frontend directory)
echo.
echo Access the application at: http://localhost:3000
echo API will be available at: http://localhost:5000
echo.
pause
