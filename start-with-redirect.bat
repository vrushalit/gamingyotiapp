@echo off
echo 🚀 Starting GamingYoti with Direct Redirect...

echo.
echo 📡 Starting Redirect Server...
start "Redirect Server" cmd /k "node redirect-server.js"

echo.
echo ⏳ Waiting for redirect server to start...
timeout /t 3 /nobreak > nul

echo.
echo 🔧 Starting Backend...
start "Backend" cmd /k "cd gamingapiyoti\gamingapiyoti && .\gradlew bootRun"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo.
echo 🎯 Starting Frontend...
start "Frontend" cmd /k "cd Frontend\gaming-yoti-frontend && npm start"

echo.
echo ✅ All services starting!
echo.
echo 📋 Services:
echo   - Redirect Server: http://localhost:3002
echo   - Backend: http://localhost:8080
echo   - Frontend: http://localhost:3000
echo.
echo 🔄 Flow: User → Yoti → Redirect Server → Your Result Page
echo.
pause
