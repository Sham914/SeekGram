# Google Authentication Setup Guide for SeekGram

## Prerequisites
- ✅ Supabase project created
- ✅ App deployed (local or production)

## Step 1: Get Google OAuth Credentials

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Search for "OAuth 2.0 consent screen" in the search bar
4. Click on "OAuth consent screen"

### 1.2 Configure OAuth Consent Screen
1. Choose **External** for User Type
2. Click **Create**
3. Fill in the following:
   - **App name**: SeekGram
   - **User support email**: your-email@gmail.com
   - **Developer contact**: your-email@gmail.com (same or different)
4. Click **Save and Continue**
5. **Add Scopes**: Add these scopes:
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
6. Click **Save and Continue** → **Save and Continue** again

### 1.3 Create OAuth 2.0 Credentials
1. Go to **Credentials** in the left sidebar
2. Click **+ Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Fill in the name: "SeekGram OAuth"
5. Add these **Authorized JavaScript origins**:

```
http://localhost:5173
http://localhost:5174
http://localhost:3000
```

6. Add these **Authorized redirect URIs**:

Replace `your-supabase-url` with your actual Supabase URL (e.g., `https://arohtjrknwlqsbddvuii.supabase.co`)

```
https://[your-supabase-url].supabase.co/auth/v1/callback
http://localhost:5173/auth/callback
http://localhost:5174/auth/callback
```

**If you deploy to production**, add:
```
https://yourdomain.com/auth/callback
```

7. Click **Create**
8. Copy the **Client ID** and **Client Secret** (you'll need these)

## Step 2: Configure Supabase

### 2.1 In Supabase Dashboard
1. Go to **Authentication** → **Providers**
2. Click on **Google**
3. Enable the provider
4. Paste your **Client ID** from Google Cloud Console
5. Paste your **Client Secret** from Google Cloud Console
6. Save

### 2.2 Verify Redirect URL
1. Go to **Authentication** → **URL Configuration**
2. Make sure your app's redirect URL is listed:
   - For local: `http://localhost:5173/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`

## Step 3: Verify Environment Variables

Make sure your `.env` file has:
```
VITE_PUBLIC_SUPABASE_URL=https://arohtjrknwlqsbddvuii.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Test the Setup

1. Start your dev server: `pnpm run dev`
2. Go to `http://localhost:5173/login`
3. Click "Continue with Google"
4. You should be redirected to Google login
5. After login, you should be redirected back to the app

## Troubleshooting

### Issue: "Invalid Redirect URI"
- **Solution**: Make sure the redirect URI in Google Cloud Console matches exactly with the one in your Supabase URL Configuration
- Check for trailing slashes and exact URL format

### Issue: "OAuth client not found"
- **Solution**: Make sure you've enabled the Google provider in Supabase and saved the credentials

### Issue: Stuck on login page
- **Solution**: Check browser console for errors. Make sure the auth/callback route exists in your app

### Issue: CORS errors
- **Solution**: Make sure your JavaScript origin is added to Google Cloud Console

### Issue: "Redirect URI mismatch"
- **Solution**: 
  - Clear browser cache and cookies
  - Verify in Supabase that the redirect URL is correct
  - Verify in Google Cloud Console that the redirect URI is correct
  - Make sure there are no extra spaces or characters

## Common Redirect URLs

### Local Development
```
http://localhost:5173/auth/callback
http://localhost:5174/auth/callback
http://localhost:3000/auth/callback
```

### Production (Supabase)
Replace `your-supabase-url` with your Supabase project URL
```
https://your-supabase-url.supabase.co/auth/v1/callback
```

### Custom Domain
Replace `yourdomain.com` with your actual domain
```
https://yourdomain.com/auth/callback
```

## Advanced: Using Environment Variables for OAuth

If you want to use environment variables for Google OAuth credentials:

1. Add to `.env`:
```
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_GOOGLE_CLIENT_SECRET=your_client_secret
```

2. But keep in mind: **Client Secret should NEVER be exposed on the frontend**
   - Instead, Supabase handles the OAuth flow server-side
   - Only the Client ID needs to be on the frontend if using specific integrations
   - For Supabase, the provider handles everything, so you don't need these in the frontend

## Next Steps

After setting up Google OAuth:
1. Test login flow
2. Test signup flow
3. Verify profile completion works
4. Test redirects to home/complete-profile

## Need Help?

- [Supabase Google Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console Docs](https://cloud.google.com/docs/authentication/oauth-2)
