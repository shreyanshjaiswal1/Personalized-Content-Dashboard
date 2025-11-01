# 🚀 Deployment Guide - Personalized Content Dashboard

## ✅ Quick Deployment with Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps (made by the creators of Next.js).

---

## 📋 Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Sign Up for Vercel
1. Go to: https://vercel.com/signup
2. Sign up with your GitHub account
3. Authorize Vercel to access your GitHub repositories

### Step 2: Import Your Project
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Find and select: `shreyanshjaiswal1/Personalized-Content-Dashboard`
4. Click **"Import"**

### Step 3: Configure Build Settings
Vercel will auto-detect Next.js. Verify these settings:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Step 4: Add Environment Variables (IMPORTANT!)
Click **"Environment Variables"** and add:

```
NEXT_PUBLIC_NEWS_API_KEY=1f992ce606594d889a41bd61de59a011
NEXT_PUBLIC_TMDB_API_KEY=7ab43cc46bf29ccfa4d794423be1165a
```

⚠️ **Important:** Currently, API keys are in `/config/apiKeys.ts`. For production, you should:
1. Add them as environment variables in Vercel
2. Update code to use `process.env.NEXT_PUBLIC_NEWS_API_KEY`
3. Remove hardcoded keys from `/config/apiKeys.ts`

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

---

## 📋 Method 2: Deploy via Vercel CLI

### Step 1: Login to Vercel
```bash
cd /Users/shreyanshjaiswal/Desktop/assignment
vercel login
```

### Step 2: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** Select your account
- **Link to existing project?** N
- **Project name?** Press Enter (use default)
- **Directory?** Press Enter (use current)
- **Override settings?** N

### Step 3: Add Environment Variables
```bash
vercel env add NEXT_PUBLIC_NEWS_API_KEY
# Enter: 1f992ce606594d889a41bd61de59a011

vercel env add NEXT_PUBLIC_TMDB_API_KEY
# Enter: 7ab43cc46bf29ccfa4d794423be1165a
```

### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## 🌐 Alternative: Deploy to Netlify

### Step 1: Sign Up
Go to: https://www.netlify.com/

### Step 2: New Site from Git
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect to GitHub
3. Select: `Personalized-Content-Dashboard`

### Step 3: Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### Step 4: Environment Variables
Add in **Site settings → Environment variables:**
```
NEXT_PUBLIC_NEWS_API_KEY=1f992ce606594d889a41bd61de59a011
NEXT_PUBLIC_TMDB_API_KEY=7ab43cc46bf29ccfa4d794423be1165a
```

### Step 5: Deploy
Click **"Deploy site"**

---

## 🔧 Pre-Deployment Checklist

### ✅ Code Fixes Needed for Production

Currently, your app has hardcoded API keys in `/config/apiKeys.ts`. You should:

1. **Update API service files to use environment variables:**

In `services/newsApi.ts` and `services/tmdbApi.ts`, change:
```typescript
// From:
import { API_KEYS } from '@/config/apiKeys';
apiKey: API_KEYS.NEWS_API

// To:
apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY
```

2. **Delete or gitignore `/config/apiKeys.ts`**

3. **Commit and push changes:**
```bash
git add .
git commit -m "Use environment variables for API keys"
git push
```

---

## 🔒 Security Best Practices

### 1. Never Commit API Keys
- Add `.env.local` to `.gitignore` ✅ (already done)
- Remove hardcoded keys from source code
- Use environment variables

### 2. Rotate API Keys
If keys are exposed:
- Get new NewsAPI key: https://newsapi.org/account
- Get new TMDB key: https://www.themoviedb.org/settings/api

### 3. Set up Rate Limiting
- Monitor API usage in Vercel dashboard
- Consider caching API responses

---

## 📊 After Deployment

### Your app will be live at:
- **Vercel:** `https://personalized-content-dashboard.vercel.app`
- **Custom Domain:** Can add in Vercel dashboard → Settings → Domains

### Monitor Your App:
1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **View logs:** Click on deployment → "Function Logs"
3. **Analytics:** Enable in project settings

### Update Your GitHub README:
Add deployment badge and live link:
```markdown
# Personalized Content Dashboard

🔗 **Live Demo:** https://your-app.vercel.app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shreyanshjaiswal1/Personalized-Content-Dashboard)
```

---

## 🐛 Troubleshooting

### Build Fails
**Error:** "Module not found"
- **Fix:** Check all imports use correct paths
- Run `npm run build` locally first

### API Keys Not Working
**Error:** "Invalid API key"
- **Fix:** Verify environment variables in Vercel dashboard
- Ensure variables start with `NEXT_PUBLIC_`

### 404 Errors
**Error:** Routes not found
- **Fix:** Ensure `next.config.js` is configured correctly
- Check Vercel build logs

### Slow Loading
- Enable Vercel Edge Network
- Add caching headers to API routes
- Consider using ISR (Incremental Static Regeneration)

---

## 🚀 Quick Start (One Command)

If you want to deploy right now with Vercel CLI:

```bash
cd /Users/shreyanshjaiswal/Desktop/assignment
vercel --prod
```

Then go to the provided URL! 🎉

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Issues?** Open an issue on GitHub

---

**Ready to deploy? Let's go! 🚀**
