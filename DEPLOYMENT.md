# Deployment Guide - Ayodhya Estate

Complete guide for deploying your Ayodhya Estate application to production.

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended
### Option 2: Heroku (Full-stack)
### Option 3: DigitalOcean / AWS / Google Cloud
### Option 4: Shared Hosting with Node.js support

---

## 📦 Pre-Deployment Checklist

- [ ] MongoDB Atlas account created and configured
- [ ] Cloudinary account setup
- [ ] Email service configured
- [ ] All environment variables documented
- [ ] Test locally: `npm run dev`
- [ ] Build successful: `cd client && npm run build`
- [ ] Admin password changed to strong password
- [ ] Local images added to assets folder

---

## 🚀 Option 1: Vercel + Render (Recommended)

### Frontend Deployment (Vercel)

**Step 1: Prepare Frontend**

1. Update `client/package.json` to add homepage:
```json
{
  "homepage": ".",
  "proxy": "https://your-backend-url.onrender.com"
}
```

2. Build the app:
```bash
cd client
npm run build
```

**Step 2: Deploy to Vercel**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login and deploy:
```bash
cd client
vercel
```

3. Follow prompts:
   - Project name: `ayodhya-estate`
   - Framework: `Create React App`
   - Build command: `npm run build` (default)
   - Output directory: `build` (default)

4. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_URL` = Your backend URL

---

### Backend Deployment (Render)

**Step 1: Push to GitHub**

1. Create a GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ayodhya-estate.git
git push -u origin main
```

**Step 2: Deploy on Render**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `ayodhya-estate-backend`
   - **Environment:** `Node`
   - **Region:** Choose nearest
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free (or paid for better performance)

**Step 3: Set Environment Variables**

In Render dashboard, add these environment variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_PASSWORD=...
EMAIL_SERVICE=gmail
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_TO=...
```

**Step 4: Update Frontend API URL**

Update `client/package.json` proxy to your Render URL:
```json
"proxy": "https://ayodhya-estate-backend.onrender.com"
```

Rebuild and redeploy frontend to Vercel.

---

## 🔧 Option 2: Heroku Deployment

### Prepare for Heroku

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login:**
```bash
heroku login
```

### Deploy Backend

```bash
# Create Heroku app
heroku create ayodhya-estate-backend

# Set buildpack
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud_name"
heroku config:set CLOUDINARY_API_KEY="your_api_key"
heroku config:set CLOUDINARY_API_SECRET="your_api_secret"
heroku config:set ADMIN_PASSWORD="your_password"
heroku config:set EMAIL_SERVICE="gmail"
heroku config:set EMAIL_USER="your_email"
heroku config:set EMAIL_PASS="your_app_password"
heroku config:set EMAIL_TO="receiving_email"

# Deploy
git subtree push --prefix server heroku main
```

### Deploy Frontend

Update `client/package.json` proxy to Heroku backend URL, then deploy to Vercel or:

```bash
# Create separate Heroku app for frontend
heroku create ayodhya-estate-frontend

# Deploy
git subtree push --prefix client heroku main
```

---

## 📊 Database Setup (MongoDB Atlas)

### Production Database Configuration

1. **Create Production Cluster:**
   - Go to MongoDB Atlas
   - Create new cluster
   - Choose your region

2. **Configure Security:**
   - Network Access: Add `0.0.0.0/0` (or specific IPs)
   - Database Access: Create user with strong password

3. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` and `<dbname>`

4. **Collections Auto-Created:**
   - `galleries` - Gallery images
   - `inquiries` - Contact form submissions

---

## 🖼️ Cloudinary Production Setup

### Optimize for Production

1. **Enable Auto-optimization:**
   - Settings → Upload → Enable auto-optimization
   - Set quality to 'auto'
   - Enable auto-format

2. **Create Upload Preset:**
   - Settings → Upload → Add upload preset
   - Name: `ayodhya-estate-production`
   - Folder: `ayodhya-estate`
   - Transformations: Width 1200, Quality Auto

3. **Backup Strategy:**
   - Enable auto-backup in Cloudinary
   - Or manually export images periodically

---

## 📧 Email Service Production

### Gmail in Production

⚠️ **Important:** Gmail has sending limits (500/day for free accounts)

For production, consider:

### Option A: SendGrid (Recommended)
```bash
npm install @sendgrid/mail
```

Update `server/routes/inquiry.js` to use SendGrid.

### Option B: AWS SES
- Lower cost, higher limits
- Requires AWS account

### Option C: Mailgun
- Easy setup, good free tier

---

## 🔒 Security Checklist

Before going live:

- [ ] Change admin password to strong, unique password
- [ ] Use HTTPS (Vercel/Render provide this automatically)
- [ ] Enable CORS only for your domain
- [ ] Set `NODE_ENV=production` in environment variables
- [ ] Don't expose API keys in frontend code
- [ ] Enable rate limiting on inquiry form
- [ ] Set up MongoDB IP whitelist (if not using 0.0.0.0/0)
- [ ] Regular backup strategy for MongoDB
- [ ] Monitor Cloudinary usage/quota

---

## 🔍 Post-Deployment Testing

### Test Checklist

1. **Homepage:**
   - [ ] Hero section loads with image
   - [ ] Connectivity times display correctly
   - [ ] Gallery loads (empty initially is OK)

2. **Admin Panel:**
   - [ ] Login works with password
   - [ ] Image upload to Cloudinary works
   - [ ] Uploaded images appear in gallery
   - [ ] Delete function works

3. **Inquiry Form:**
   - [ ] Form submission works
   - [ ] Email received (if configured)
   - [ ] Inquiry saved in MongoDB

4. **Performance:**
   - [ ] Page load time < 3 seconds
   - [ ] Images optimized
   - [ ] Mobile responsive

---

## 📈 Monitoring & Maintenance

### What to Monitor

1. **Cloudinary Usage:**
   - Monthly transformation quota
   - Storage usage
   - Bandwidth

2. **MongoDB Atlas:**
   - Connection count
   - Storage usage
   - Slow queries

3. **Server Performance:**
   - Response times
   - Error rates
   - Uptime

### Recommended Tools

- **Uptime Monitoring:** UptimeRobot (free)
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics
- **Logs:** Logtail or Papertrail

---

## 🆘 Common Deployment Issues

### Issue: CORS Error
```javascript
// In server/server.js, update CORS config:
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

### Issue: Images Not Loading
- Check Cloudinary credentials
- Verify folder permissions
- Check browser console for errors

### Issue: MongoDB Connection Timeout
- Verify IP whitelist includes deployment server IP
- Check connection string format
- Ensure database user has correct permissions

### Issue: Build Failed
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Performance Optimization

### Frontend

1. **Image Optimization:**
   - Use WebP format
   - Lazy loading enabled (already in code)
   - Compress images before upload

2. **Code Splitting:**
   - React lazy loading for routes
   - Bundle size optimization

3. **Caching:**
   - Set cache headers
   - Use CDN for static assets

### Backend

1. **Database Indexing:**
```javascript
// In Gallery model
gallerySchema.index({ createdAt: -1 });
```

2. **Response Compression:**
```bash
npm install compression
```

```javascript
// In server.js
const compression = require('compression');
app.use(compression());
```

---

## 📱 Custom Domain Setup

### For Vercel (Frontend)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard:
   - Settings → Domains
   - Add your domain
   - Follow DNS configuration steps

### For Render (Backend)

1. In Render dashboard:
   - Settings → Custom Domain
   - Add `api.yourdomain.com`
   - Update DNS records as instructed

---

## 🎉 Launch Checklist

Final steps before announcing:

- [ ] All features tested in production
- [ ] Admin can upload images successfully
- [ ] Inquiry form emails received
- [ ] Custom domain configured (if applicable)
- [ ] Google Analytics added
- [ ] SEO meta tags optimized
- [ ] Social media preview images set
- [ ] Error pages customized
- [ ] Contact information updated
- [ ] Privacy policy added (if collecting emails)

---

**You're ready to launch! Jai Shri Ram! 🕉️**

For support, refer to:
- SETUP.md - Development setup
- README.md - Project overview
- This guide - Deployment
