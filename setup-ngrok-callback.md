# 🚀 Setup ngrok for Yoti Callback URL

## Why ngrok?
Yoti requires HTTPS callback URLs, but your local development server runs on HTTP. ngrok creates a secure HTTPS tunnel to your local application.

## 📋 Setup Steps

### 1. Install ngrok
```bash
# Download from https://ngrok.com/download
# Or install via npm
npm install -g ngrok
```

### 2. Start your React app
```bash
cd Frontend/gaming-yoti-frontend
npm start
# Your app will run on http://localhost:3000
```

### 3. Start ngrok tunnel
```bash
# In a new terminal
ngrok http 3000
```

### 4. Copy the HTTPS URL
ngrok will show something like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

### 5. Update the callback URL
Replace `https://your-ngrok-url.ngrok.io/result` in `YotiService.java` with your actual ngrok URL:
```java
callback.put("url", "https://abc123.ngrok.io/result");
```

### 6. Restart your backend
```bash
cd gamingapiyoti/gamingapiyoti
./gradlew bootRun
```

## 🎯 Complete Flow
1. User fills form → Creates session with ngrok callback URL
2. User goes to Yoti → Completes verification
3. Yoti redirects to `https://your-ngrok-url.ngrok.io/result?sessionId=xxx`
4. Your result page shows verification results

## 🔧 Alternative: Use a temporary HTTPS service
If you don't want to use ngrok, you can use a service like:
- https://webhook.site (for testing)
- https://httpbin.org/get (for testing)

But ngrok is the proper solution for development.
