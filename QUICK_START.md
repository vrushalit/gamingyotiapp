# 🚀 GamingYoti - Quick Start Guide

## 📋 Prerequisites Checklist
- [ ] Java 17+ installed
- [ ] Node.js 16+ installed
- [ ] Yoti API credentials
- [ ] ngrok installed and authenticated

## 🎯 Quick Start Commands

### Option 1: Local Development (No HTTPS callbacks)
```bash
# Double-click: start-app.bat
# OR manually:
cd gamingapiyoti\gamingapiyoti
.\gradlew bootRun

# In another terminal:
cd Frontend\gaming-yoti-frontend
npm start
```

### Option 2: Full Development (With ngrok HTTPS)
```bash
# Double-click: start-with-ngrok.bat
# OR manually:
# Terminal 1: Backend
cd gamingapiyoti\gamingapiyoti
.\gradlew bootRun

# Terminal 2: Frontend
cd Frontend\gaming-yoti-frontend
npm start

# Terminal 3: ngrok React
ngrok http 3000

# Terminal 4: ngrok Backend
ngrok http 8080
```

## 🔧 Update URLs After ngrok

### 1. Copy ngrok URLs:
- React: `https://abc123.ngrok.io`
- Backend: `https://def456.ngrok.io`

### 2. Update YotiService.java:
```java
callback.put("url", "https://abc123.ngrok.io/result");
```

### 3. Update LandingPage.js:
```javascript
const response = await axios.post('https://def456.ngrok.io/api/yoti/create-session', formData);
```

## 🎮 Test Flow
1. Go to `https://abc123.ngrok.io` (NOT localhost)
2. Fill form and click "Verify & Sign Up"
3. Complete Yoti verification
4. Get redirected to result page automatically

## 🐛 Common Issues
- **"Callback URL invalid"** → Use ngrok URLs
- **Backend won't start** → Check Java version, kill existing processes
- **Frontend won't start** → Run `npm install`
- **ngrok not working** → Check authentication

## 📞 Quick Help
- Backend: `http://localhost:8080/api/yoti/`
- Frontend: `http://localhost:3000`
- ngrok dashboard: `http://localhost:4040`
