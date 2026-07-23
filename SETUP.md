# Initial Setup Guide

Follow these steps to get the project up and running locally.

## Quick Start (5 minutes)

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/chanduvillain302-ship-it/chanduvillain-ai-studio.git
git push -u origin main
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```
   GEMINI_API_KEY=your_actual_key_here
   YOUTUBE_CLIENT_ID=your_client_id_here
   YOUTUBE_CLIENT_SECRET=your_client_secret_here
   YOUTUBE_REDIRECT_URI=https://your-app.onrender.com/oauth2callback
   ```

### Step 4: Start the Application

```bash
npm start
```

Your app should be running at `http://localhost:3000`

## Detailed Setup

### Getting Your API Keys

#### Google Gemini API Key

1. Visit https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Enable the **Generative Language API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Generative Language API"
   - Click "Enable"
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the key to your `.env` file

#### YouTube OAuth Credentials

1. Visit https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (for local development)
     - `https://chanduvillain-ai-studio.onrender.com` (for production)
   - Add authorized redirect URIs:
     - `http://localhost:3000/oauth2callback` (for local development)
     - `https://chanduvillain-ai-studio.onrender.com/oauth2callback` (for production)
   - Copy Client ID and Client Secret to your `.env` file

### Project Structure

```
chanduvillain-ai-studio/
├── public/                 # Static files (HTML, CSS, images)
├── src/
│   ├── routes/            # API endpoints
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication, logging, etc.
│   └── services/           # External API calls (Gemini, YouTube)
├── .env.example           # Environment variables template
├── .gitignore             # Files to ignore in Git
├── package.json           # Project metadata and dependencies
├── server.js              # Main application file
├── README.md              # Project documentation
└── SETUP.md              # This file
```

### Useful npm Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

## Common Issues & Solutions

### Issue: "GEMINI_API_KEY is not defined"

**Solution:**
- Ensure `.env` file exists in the root directory
- Make sure you've added `GEMINI_API_KEY=...` to it
- Restart the development server after changing `.env`

### Issue: "OAuth redirect URI mismatch"

**Solution:**
- Check that `YOUTUBE_REDIRECT_URI` in `.env` matches exactly what you configured in Google Cloud Console
- Ensure you're using `https://` for production URLs
- No trailing slashes

### Issue: "Cannot find module 'express'" or similar

**Solution:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
PORT=3001 npm start

# Or kill process using port 3000 (macOS/Linux):
lsof -ti:3000 | xargs kill -9
```

## Deployment to Render

### Step 1: Push to GitHub

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Step 2: Create Render Account

Visit https://render.com and sign up (use GitHub for easier authentication)

### Step 3: Deploy

1. Go to https://dashboard.render.com
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select `chanduvillain-ai-studio`
5. Configure:
   - **Name:** chanduvillain-ai-studio
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click "Advanced" and add environment variables:
   - `GEMINI_API_KEY`
   - `YOUTUBE_CLIENT_ID`
   - `YOUTUBE_CLIENT_SECRET`
   - `YOUTUBE_REDIRECT_URI=https://chanduvillain-ai-studio.onrender.com/oauth2callback`
7. Click "Create Web Service"

### Step 4: Monitor Deployment

Render will show you the build logs. Once complete, your app will be live at the provided URL.

## Next Steps

1. ✅ Complete the Quick Start above
2. 📝 Customize the project structure for your needs
3. 🔐 Add authentication middleware
4. 🚀 Deploy to Render
5. 📊 Add logging and monitoring

## Getting Help

- Check the [README.md](./README.md) for detailed documentation
- Review [GitHub Issues](https://github.com/chanduvillain302-ship-it/chanduvillain-ai-studio/issues)
- Contact: [@chanduvillain302-ship-it](https://github.com/chanduvillain302-ship-it)

---

**Happy coding! 🚀**
