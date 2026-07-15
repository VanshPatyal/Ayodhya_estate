# Setup Instructions - Ayodhya Estate

Follow these steps to get your Ayodhya Estate React application running.

---

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Local Install](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign up free](https://cloudinary.com/users/register/free)
- **Gmail Account** (for email notifications)
   
--- 

## 🚀 Step-by-Step Setup

### 1️⃣ Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Client (React app)
- Server (Express backend)

---

### 2️⃣ Configure MongoDB

**Option A: Local MongoDB**
- Install MongoDB locally
- MongoDB will run on: `mongodb://localhost:27017/ayodhya-estate`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get your connection string
4. Whitelist your IP address
5. Create a database user

---

### 3️⃣ Configure Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/users/register/free)
2. Go to Dashboard
3. Copy these credentials:
   - Cloud Name
   - API Key
   - API Secret

---

### 4️⃣ Configure Email (Optional but Recommended)

For receiving inquiry form submissions via email:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate password for "Mail"
3. Use this app password in `.env`

---

### 5️⃣ Create Environment File

Create `server/.env` file (copy from `server/.env.example`):

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your actual credentials:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ayodhya-estate

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret

# Admin Password (CHANGE THIS!)
ADMIN_PASSWORD=your_secure_password_here

# Email (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_TO=where_to_receive_inquiries@gmail.com
```

---

### 6️⃣ Add Your Local Images

Replace placeholder URLs with your actual images:

1. **Hero Image**: Place in `client/public/assets/hero/`
   - Example: `lord-rama-sita.jpg`
   
2. **Update Hero.css**: Edit `client/src/components/Hero.css`
   ```css
   background: url('/assets/hero/lord-rama-sita.jpg') center/cover no-repeat;
   ```

3. **Site Photos**: Place in `client/public/assets/site/` (for static elements)

---

### 7️⃣ Run the Application

From the **root directory**:

```bash
npm run dev
```

This will start both:
- ✅ Frontend: http://localhost:3000
- ✅ Backend: http://localhost:5000

---

## 🎉 First-Time Usage

### Access the Site
1. Open http://localhost:3000
2. You'll see the homepage (gallery will be empty initially)

### Access Admin Panel
1. Navigate to http://localhost:3000/admin
2. Enter your admin password (from `.env`)
3. Upload your first gallery image!

### Test Inquiry Form
1. Fill out the form on the homepage
2. Check your email (if configured)
3. Check MongoDB to see saved inquiry

---

## 📁 Project Structure Overview

```
Ayodhya Estate/
├── client/                 # React Frontend
│   ├── public/
│   │   └── assets/        # Your local images go here
│   │       ├── hero/      # Hero backgrounds
│   │       └── site/      # Site photos
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # HomePage & AdminPanel
│       └── App.js
│
├── server/                # Express Backend
│   ├── config/           # Database & Cloudinary config
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   └── server.js
│
└── package.json
```

---

## 🔧 Common Issues & Solutions

### ❌ "MongoDB connection failed"
- Check if MongoDB is running locally
- Verify `MONGODB_URI` in `.env`
- For Atlas: Check IP whitelist and database user

### ❌ "Cloudinary upload failed"
- Verify Cloudinary credentials in `.env`
- Check cloud name spelling (case-sensitive)
- Ensure file size < 10MB

### ❌ "Email not sending"
- Verify Gmail credentials
- Use App Password, not regular password
- Check if 2FA is enabled

### ❌ Port 3000 or 5000 already in use
```bash
# Windows - Kill process on port
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

## 🎨 Customization

### Change Colors
Edit CSS variables in `client/src/index.css`:
```css
:root {
  --saffron: #FF9933;
  --gold: #FFD700;
  --royal-white: #fffefc;
}
```

### Change Connectivity Times
Edit `client/src/components/Highlights.jsx`:
```javascript
const connectivityData = [
  { icon: 'fa-plane', name: 'Ayodhya Airport', time: '15 Mins' },
  // ... modify times here
];
```

### Change Contact Details
Edit `client/src/components/Footer.jsx`

---

## 📦 Building for Production

```bash
# Build React app
cd client
npm run build

# Serve static files from Express
# (Add static middleware in server.js)
```

---

## 🆘 Need Help?

- Check the `README.md` in each folder for specific details
- Review the `.env.example` for configuration examples
- Ensure all dependencies are installed correctly

---

## 🙏 Ready to Go!

Your Ayodhya Estate application is now set up. Visit http://localhost:3000 to see your divine real estate platform in action!

**Jai Shri Ram! 🕉️**
