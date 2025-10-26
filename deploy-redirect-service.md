# 🚀 Deploy Redirect Service for Yoti Callback

## Quick Solution: Use a Public Redirect Service

### Option 1: Use GitHub Pages (Free & Easy)

1. **Create a new GitHub repository** called `yoti-redirect-service`
2. **Upload the `redirect-service.html` file** to the repository
3. **Enable GitHub Pages** in repository settings
4. **Your redirect URL will be**: `https://yourusername.github.io/yoti-redirect-service/redirect-service.html`

### Option 2: Use Netlify (Free & Easy)

1. **Go to https://netlify.com**
2. **Drag and drop** the `redirect-service.html` file
3. **Get your URL**: `https://random-name.netlify.app/redirect-service.html`

### Option 3: Use Vercel (Free & Easy)

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: `vercel --prod`
3. **Get your URL**: `https://your-project.vercel.app/redirect-service.html`

## Update Your Backend

Once you have your redirect URL, update `YotiService.java`:

```java
callback.put("url", "https://your-redirect-url.com/redirect-service.html");
```

## How It Works

1. **User completes verification** on Yoti
2. **Yoti redirects to** your redirect service with `?sessionId=xxx`
3. **Redirect service shows** a loading page for 2 seconds
4. **Automatically redirects** to `http://localhost:3000/result?sessionId=xxx`
5. **Your React app** shows the verification results

## Test the Flow

1. **Deploy the redirect service** using one of the options above
2. **Update the callback URL** in your backend
3. **Restart your backend**
4. **Test the complete flow**:
   - Fill form → Go to Yoti → Complete verification
   - You'll be redirected to your redirect service
   - Then automatically to your React app with results
