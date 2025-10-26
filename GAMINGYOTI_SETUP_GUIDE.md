# 🎮 GamingYoti Application - Complete Setup & Run Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
4. [Frontend Setup (React)](#frontend-setup-react)
5. [ngrok Setup for HTTPS Callbacks](#ngrok-setup-for-https-callbacks)
6. [Complete Application Flow](#complete-application-flow)
7. [Troubleshooting](#troubleshooting)
8. [Production Deployment](#production-deployment)

---

##  Prerequisites

### Required Software:
- **Java 17+** (for Spring Boot backend)
- **Node.js 16+** (for React frontend)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Required Accounts:
- **Yoti Developer Account** (for API credentials)
- **ngrok Account** (free tier available)

---

## 📁 Project Structure

```
Modified FLP/
├── gamingapiyoti/
│   └── gamingapiyoti/          # Spring Boot Backend
│       ├── src/main/java/
│       ├── build.gradle
│       └── gradlew
├── Frontend/
│   └── gaming-yoti-frontend/   # React Frontend
│       ├── src/
│       ├── package.json
│       └── public/
└── README.md
```

---

## 🚀 Backend Setup (Spring Boot)

### Step 1: Navigate to Backend Directory
```bash
cd "....\Modified FLP\gamingapiyoti\gamingapiyoti"
```

### Step 2: Verify Java Installation
java -version
# Should show Java 17 or higher


### Step 3: Set Up Yoti API Credentials
   - Get your **API Key** and **SDK ID**

2. **Add Credentials to Project:**
   - Create file: `src/main/resources/secrets/avs-api-key.txt`
   - Add your Yoti API Key to this file
   - Create file: `src/main/resources/secrets/avs-sdk-id.txt`
   - Add your Yoti SDK ID to this file

### Step 4: Build and Run Backend
```bash
# Build the project
.\gradlew build

# Run the backend
.\gradlew bootRun
```

### Step 5: Verify Backend is Running
- Open browser: `http://localhost:8080/api/yoti/`
- Should see: `{"status": "GamingYoti Backend is running"}`

---

## ⚛️ Frontend Setup (React)

### Step 1: Navigate to Frontend Directory
```bash
cd "...\Modified FLP\Frontend\gaming-yoti-frontend"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start React Development Server
```bash
npm start
```

### Step 4: Verify Frontend is Running
- Open browser: `http://localhost:3000`
- Should see the GamingYoti landing page

## 🎯 Complete Application Flow

### Step 1: Start All Services
1. **Start Backend:** `.\gradlew bootRun` (in backend directory)
2. **Start Frontend:** `npm start` (in frontend directory)

### Step 2: Access Application
- **Use ngrok React URL:** `http://localhost:3000` (NOT localhost:3000)

### Step 3: Test Complete Flow
1. **Fill the form** with test data:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `testpass`

2. **Click "Verify & Sign Up"**
   - You'll be redirected to Yoti's age verification
   - Complete the verification process

3. **After verification:**
   - You'll should manually go to `http://localhost:3000/result`
   - Result page will show verification status



---

## 🐛 Troubleshooting

### Common Issues:

#### 1. **"Callback URL is invalid" Error**
- **Cause:** Using localhost URLs

#### 2. **Backend Won't Start**
- **Check:** Java version (needs 17+)
- **Check:** Port 8080 is free
- **Solution:** `taskkill /F /IM java.exe`

#### 3. **Frontend Won't Start**
- **Check:** Node.js version (needs 16+)
- **Check:** Port 3000 is free
- **Solution:** `npm install` then `npm start`


#### 5. **CORS Errors**
- **Cause:** Frontend calling wrong backend URL
- **Solution:** Update API URLs in React code

### Debug Commands:
```bash
# Check if backend is running
curl http://localhost:8080/api/yoti/

# Check if frontend is running
curl http://localhost:3000

```
---

## 🚀 Production Deployment

### Option 1: Netlify + Heroku
1. **Deploy React to Netlify:**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

2. **Deploy Spring Boot to Heroku:**
   - Create `Procfile`: `web: java -jar build/libs/gamingapiyoti-0.0.1-SNAPSHOT.jar`
   - Deploy with Heroku CLI

3. **Update callback URL:**
   ```java
   callback.put("url", "https://your-app.netlify.app/result");
   ```

### Option 2: Vercel + Railway
1. **Deploy React to Vercel:**
   - Import GitHub repository
   - Auto-deploy on push

2. **Deploy Spring Boot to Railway:**
   - Connect GitHub repository
   - Auto-deploy on push

3. **Update callback URL:**
   ```java
   callback.put("url", "https://your-app.vercel.app/result");
   ```

---

## 📝 Environment Variables

### Backend (.env):
```
YOTI_API_KEY=your_api_key_here
YOTI_SDK_ID=your_sdk_id_here
```

### Frontend (.env):
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

---

## 🎯 Quick Start Commands

### Development (with ngrok):
```bash
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

### Production:
```bash
# Build and run
.\gradlew build
java -jar build/libs/gamingapiyoti-0.0.1-SNAPSHOT.jar
```

---

## 📞 Support

### Yoti Documentation:
- [Yoti Developer Hub](https://hub.yoti.com/)
- [Age Verification API Docs](https://developers.yoti.com/age-verification/)


### React Documentation:
- [React Documentation](https://reactjs.org/docs/)
- [Create React App](https://create-react-app.dev/)

### Spring Boot Documentation:
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Boot Guides](https://spring.io/guides)

---

## 🎉 Success Checklist

- ✅ Backend running on port 8080
- ✅ Frontend running on port 3000
- ✅ Yoti API credentials configured
- ✅ Callback URLs updated
- ✅ Complete verification flow working
- ✅ Direct redirect to result page

**Your GamingYoti application is now ready! 🎮✨**
