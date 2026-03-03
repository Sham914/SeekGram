# Google OAuth Setup - Quick Reference Card

## 📋 What You Need

1. **Google Cloud Project** with OAuth credentials
2. **Supabase Project** with Google provider enabled
3. **Matching URLs** between Google Cloud and Supabase

## 🚀 Quick Setup (5 minutes)

### 1️⃣ Get Google Credentials (Google Cloud Console)

```
1. Go to: console.cloud.google.com
2. Create/Select Project
3. Search: "OAuth 2.0 consent screen"
4. Fill in app name & email
5. Go to: Credentials
6. Create OAuth 2.0 Client ID (Web application)
7. Add JavaScript origins:
   - http://localhost:5173
   - http://localhost:5174
8. Add Authorized redirect URLs:
   - https://your-supabase-url.supabase.co/auth/v1/callback
   - http://localhost:5173/auth/callback
9. Copy Client ID and Client Secret
```

### 2️⃣ Configure Supabase (Supabase Dashboard)

```
1. Go to: Authentication → Providers
2. Enable Google
3. Paste Client ID
4. Paste Client Secret
5. Save
```

### 3️⃣ Set Site URL (Supabase Dashboard)

```
1. Go to: Authentication → URL Configuration
2. Set Site URL:
   - Local: http://localhost:5173
   - Production: https://yourdomain.com
3. Verify Redirect URLs include your callback URL
```

### 4️⃣ Start Dev Server

```bash
pnpm run dev
```

### 5️⃣ Test

```
1. Go to: http://localhost:5173/login
2. Click: "Continue with Google"
3. Should redirect to Google login
4. After login, should redirect back to app
```

## 🔑 Key URLs to Remember

| Component | URL |
|-----------|-----|
| **Local Dev** | `http://localhost:5173` |
| **Google OAuth Callback** | `http://localhost:5173/auth/callback` |
| **Supabase Callback** | `https://[project].supabase.co/auth/v1/callback` |

## ⚡ Most Common Mistakes

❌ **Mistake:** Forgot to enable Google provider in Supabase
✅ **Fix:** Go to Authentication → Providers → enable Google

❌ **Mistake:** Redirect URL doesn't match exactly
✅ **Fix:** Make sure URLs match in:
   - Google Cloud Console (authorized redirect URIs)
   - Supabase Dashboard (URL Configuration)

❌ **Mistake:** Wrong Client ID/Secret
✅ **Fix:** Re-copy from Google Cloud Console and save to Supabase

❌ **Mistake:** JavaScript origin not added to Google Cloud
✅ **Fix:** Add `http://localhost:5173` to "Authorized JavaScript origins"

❌ **Mistake:** Cached browser data causing issues
✅ **Fix:** Clear cache, cookies, and try incognito mode

## 🧪 How to Verify It Works

### In Browser Console:

```javascript
// Check if Google provider is enabled
await window.supabase.auth.getSession().then(r => console.log(r))
```

### Expected Flow:

1. Click "Continue with Google"
2. Redirected to accounts.google.com
3. Sign in with your Google account
4. Redirected back to app
5. If profile complete → home page
6. If profile incomplete → complete-profile page

## 📱 For Production Deployment

```
1. Add your domain to Google Cloud Console
   - Authorized JavaScript origins: https://yourdomain.com
   - Authorized redirect URLs: https://yourdomain.com/auth/v1/callback

2. Update Supabase Site URL
   - Authentication → URL Configuration
   - Set to: https://yourdomain.com

3. Test with production domain
```

## 🆘 Still Not Working?

1. **Check Console Errors** → Press F12 → Console tab
2. **Verify Credentials** → Are they correct in Supabase?
3. **Check URLs** → Do they match exactly (no typos)?
4. **Clear Cache** → Ctrl+Shift+Del → Clear everything
5. **Wait 2 minutes** → Settings can take time to sync
6. **Try Incognito** → Rules out cache issues
7. **Check Network Tab** → See what requests are being made

## 📚 Related Files in Project

- `src/lib/auth.ts` - OAuth logic
- `src/pages/Login.tsx` - Login page with Google button
- `src/pages/SignUp.tsx` - Signup page with Google button
- `src/pages/AuthCallback.tsx` - Handles OAuth callback
- `.env` - Supabase credentials
- `GOOGLE_AUTH_SETUP.md` - Detailed setup guide
- `GOOGLE_AUTH_TROUBLESHOOTING.md` - Troubleshooting guide

## ✅ Success Indicators

- ✅ Google login button visible on login page
- ✅ Clicking it redirects to Google
- ✅ After Google login, redirected back to app
- ✅ Username appears in top-right corner
- ✅ Can navigate to other pages
- ✅ Profile completion page works

## 🎯 Next Steps After Setup

1. Test login/signup flow
2. Test profile completion
3. Test logout
4. Test with different Google accounts
5. If deploying to production, add your domain to Google Cloud Console
