# 🚀 GamingYoti Startup Guide

## Quick Start (Windows)

### Option 1: Use the Batch File
```bash
# Double-click or run:
start-app.bat
```

### Option 2: Manual Startup

#### 1. Start Backend (Spring Boot)
```bash
# Open Command Prompt or PowerShell
cd gamingapiyoti\gamingapiyoti
gradlew bootRun
```

#### 2. Start Frontend (React)
```bash
# Open another Command Prompt or PowerShell
cd Frontend\gaming-yoti-frontend
npm start
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

## 🧪 Testing the Application

### 1. Test Backend API
```bash
# Install axios if not already installed
npm install axios

# Run the test script
node test-api.js
```

### 2. Test Frontend Flow
1. Open http://localhost:3000
2. Fill in the sign-up form
3. Click "Verify & Sign Up"
4. You'll be redirected to the verification page
5. The verification page will show mock Yoti iframe
6. Navigate to the result page to see the verification status

## 🔧 Configuration

### Mock Data Mode (Default)
The application is configured to use mock data for testing:
- No real Yoti API calls
- Simulated verification results
- Perfect for development and testing

### Real Yoti Integration
To use real Yoti API:

1. **Get Yoti Credentials**:
   - Sign up at https://hub.yoti.com/
   - Get your API Key and SDK ID

2. **Update Configuration**:
   ```java
   // In YotiService.java, change:
   private static final boolean USE_MOCK_DATA = false;
   ```

3. **Add Credentials**:
   - `gamingapiyoti/gamingapiyoti/src/main/resources/secrets/avs-api-key.txt`
   - `gamingapiyoti/gamingapiyoti/src/main/resources/secrets/avs-sdk-id.txt`

## 🎮 Application Flow

### 1. Landing Page (`/`)
- Gaming-themed sign-up form
- Collects: Username, Email, Password
- Creates Yoti session and redirects to verification

### 2. Verification Page (`/verify`)
- Shows Yoti verification iframe
- Three verification methods available:
  - Age Estimation (preferred)
  - ID Verification (fallback)
  - Digital ID (fallback)
- Method selection buttons

### 3. Result Page (`/result`)
- Displays verification results
- Shows method used, age detected, status
- Success/failure handling with retry options

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 in use**: Change port in `application.properties`
- **Gradle issues**: Try `./gradlew clean build`
- **Java version**: Ensure Java 11+ is installed

### Frontend Issues
- **Port 3000 in use**: React will suggest another port
- **Node modules**: Run `npm install` in frontend directory
- **CORS errors**: Ensure backend is running on port 8080

### Common Errors
1. **"Method Not Allowed"**: Check if backend is running
2. **"Connection Refused"**: Verify both services are running
3. **"Session Not Found"**: Clear browser localStorage

## 📱 Browser Testing

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Mobile Testing
- Responsive design works on mobile
- Touch-friendly interface
- Gaming UI adapts to smaller screens

## 🔒 Security Notes

- Mock data mode is for development only
- Real Yoti integration requires proper credentials
- Session data is stored in browser localStorage
- CORS is configured for localhost development

## 📊 Monitoring

### Backend Logs
- Session creation logs
- API call logs
- Error handling logs

### Frontend Console
- Network requests
- State changes
- Error messages

## 🎯 Next Steps

1. **Test the complete flow**
2. **Customize the gaming UI** (colors, animations)
3. **Add real Yoti credentials** for production
4. **Deploy to production** environment

---

**Note**: This application is configured for development and testing. For production use, ensure proper Yoti credentials and security measures are in place.
