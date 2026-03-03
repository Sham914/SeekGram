# Google OAuth Troubleshooting & Verification Guide

## Step 1: Verify Supabase Configuration ✅

### Check if Google provider is enabled:

1. Go to **Supabase Dashboard** → **Authentication** → **Providers**
2. Look for **Google** in the list
3. Verify that:
   - ✅ Provider is **Enabled** (toggle is ON)
   - ✅ **Client ID** is populated
   - ✅ **Client Secret** is populated
   - ✅ Generated credentials match what you copied from Google Cloud Console

### Check URL Configuration:

1. Go to **Authentication** → **URL Configuration**
2. Verify **Site URL** is set correctly:
   - Local development: `http://localhost:5173`
   - Production: `https://yourdomain.com`
3. Check **Redirect URLs** includes:
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5174/auth/callback` (if using port 5174)
   - For production: `https://yourdomain.com/auth/callback`

## Step 2: Verify Google Cloud Console ✅

### Check OAuth Consent Screen:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **OAuth consent screen**
4. Verify:
   - ✅ **App name** is set to "SeekGram"
   - ✅ **User support email** is filled
   - ✅ **Scopes** include `email` and `profile`
   - ✅ Status shows "In production" (or "Testing" for development)

### Check OAuth 2.0 Credentials:

1. Go to **APIs & Services** → **Credentials**
2. Find your "SeekGram OAuth" credentials
3. Click on it to view details
4. Verify:
   - ✅ **Authorized JavaScript origins** include:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - Your production domain (if deployed)
   - ✅ **Authorized redirect URIs** include:
     - `https://[your-supabase-url].supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth/callback`
     - `http://localhost:5174/auth/callback`
     - Your production domain's callback URL (if deployed)

## Step 3: Test the Setup 🧪

### Test Locally:

```bash
# 1. Make sure your dev server is running
pnpm run dev

# 2. Open browser and go to
http://localhost:5173/login

# 3. Click "Continue with Google"
# 4. You should see the Google login page
# 5. After login, you should be redirected back to the app
```

### Check Browser Console for Errors:

1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Look for any red error messages
4. Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid Redirect URI` | Redirect URL doesn't match | Check Supabase URL Configuration |
| `client_id mismatch` | Wrong Client ID in Supabase | Re-copy from Google Cloud Console |
| `OAuth client not found` | Google provider not enabled | Enable Google provider in Supabase |
| `CORS error` | Origin not in Google Cloud Console | Add origin to "Authorized JavaScript origins" |

## Step 4: Common Issues & Solutions 🔧

### Issue: "OAuth client not found" Error

**What it means:** Supabase doesn't have the Google provider configured.

**Solutions:**
```
1. Go to Supabase Dashboard → Authentication → Providers
2. Click on "Google"
3. Toggle to enable it
4. Enter Client ID and Client Secret
5. Click "Save"
6. Wait 1-2 minutes for changes to propagate
7. Refresh browser and try again
```

### Issue: "Invalid Redirect URI" Error

**What it means:** The callback URL doesn't match across Supabase and Google Cloud.

**Solutions:**

#### In Supabase:
1. Go to **Authentication** → **URL Configuration**
2. Note your **Site URL**
3. Go to **Authentication** → **Providers** → **Google**
4. Make sure you're using the same domain

#### In Google Cloud Console:
1. Go to **APIs & Services** → **Credentials**
2. Click on your OAuth client
3. Update **Authorized redirect URIs** to match exactly:
   ```
   https://[your-site-url]/auth/v1/callback
   ```

**Example redirect URIs:**
```
Local: http://localhost:5173/auth/callback
Supabase: https://arohtjrknwlqsbddvuii.supabase.co/auth/v1/callback
Production: https://yourdomain.com/auth/callback
```

### Issue: Stuck on Login Page After Google OAuth

**What it means:** Auth succeeded but redirect didn't work.

**Solutions:**
1. Check that `/auth/callback` route exists in the app ✅ (Already configured)
2. Check browser console for errors
3. Verify that the AuthCallback page is loading
4. Clear browser cache and cookies
5. Try in incognito mode

### Issue: "Google OAuth Failed" Error Message

**What it means:** The OAuth request itself failed.

**Solutions:**
1. Check **Client ID** and **Client Secret** are correct
2. Make sure your Google OAuth consent screen is configured
3. Verify the provider is enabled in Supabase
4. Check that your JavaScript origin is whitelisted in Google Cloud Console
5. If in production, make sure your domain is added to Google Cloud Console

### Issue: Getting 401/403 Errors

**What it means:** Authentication failed or credentials are invalid.

**Solutions:**
1. Re-copy credentials from Google Cloud Console
2. Delete the old credentials and create new ones
3. Wait for Supabase to sync (1-2 minutes)
4. Clear all browser caches

## Step 5: Advanced Debugging 🐛

### Enable Detailed Logging:

Open browser Developer Tools and check Console during OAuth flow.

You should see logs like:
```
Starting Google OAuth flow
Using callback URL: http://localhost:5173/auth/callback
Google OAuth initiated successfully
```

### Check Network Tab:

1. Open Developer Tools → **Network** tab
2. Click "Continue with Google"
3. You should see requests to:
   - `accounts.google.com` (Google login page)
   - `[your-supabase-url].supabase.co/auth/v1/` (OAuth callback)
4. Check the response status:
   - ✅ 200-399 = Success
   - ❌ 400-499 = Client error (wrong URL, missing config)
   - ❌ 500+ = Server error (contact Supabase support)

### Test OAuth Flow Manually:

1. Open browser console
2. Run this command:
```javascript
// Check if Supabase is loaded
console.log(window.supabase);

// Try to get current session
window.supabase.auth.getSession().then(r => console.log(r));
```

## Step 6: Environment Variables Verification ✅

Make sure your `.env` file has:
```
VITE_PUBLIC_SUPABASE_URL=https://arohtjrknwlqsbddvuii.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note:** The `ANON_KEY` is public and safe to expose. It has limited permissions.

## Step 7: Quick Checklist ✅

Before you test, make sure:

- [ ] Google OAuth consent screen is configured
- [ ] OAuth 2.0 credentials created in Google Cloud
- [ ] Client ID copied to Supabase
- [ ] Client Secret copied to Supabase
- [ ] Google provider is **enabled** in Supabase
- [ ] Redirect URIs added to Google Cloud Console
- [ ] JavaScript origins added to Google Cloud Console
- [ ] Site URL configured in Supabase
- [ ] Dev server running on `http://localhost:5173`
- [ ] `.env` file has correct Supabase credentials
- [ ] `/auth/callback` route exists in app (✅ it does)
- [ ] Waited 1-2 minutes after saving Supabase config

## Need More Help?

### Official Documentation:
- [Supabase Google Auth Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

### Debug Tips:
1. **Check timestamps** - Sometimes auth takes 1-2 minutes to sync
2. **Clear everything** - Clear browser cache, cookies, local storage
3. **Incognito mode** - Test in private browsing to rule out caching
4. **Different email** - Try with a different Google account
5. **Fresh credentials** - Delete old OAuth credentials and create new ones

### If All Else Fails:
1. Open browser console
2. Copy the error message
3. Check Supabase logs (Dashboard → Logs)
4. Contact Supabase support with the error details
