# Chanduvillain AI Studio

An AI-powered application integrating Google's Gemini API and YouTube OAuth authentication for creating and managing AI-generated content.

**Live Demo:** https://chanduvillain-ai-studio.onrender.com

## Features

- 🤖 Google Gemini AI integration
- 🎥 YouTube OAuth2 authentication
- 💾 Content management and storage
- 🚀 Deployed on Render

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- API Keys:
  - Google Gemini API Key
  - YouTube OAuth Client ID & Secret

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/chanduvillain302-ship-it/chanduvillain-ai-studio.git
cd chanduvillain-ai-studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key

# YouTube OAuth Configuration
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REDIRECT_URI=https://your-app.onrender.com/oauth2callback

# Application Settings
NODE_ENV=development
PORT=3000
```

For reference, see `.env.example` for all required variables.

### 4. Start the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Getting API Keys

### Google Gemini API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Gemini API
4. Create an API key in Credentials
5. Copy your API key to `.env` as `GEMINI_API_KEY`

### YouTube OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized redirect URI: `https://your-app.onrender.com/oauth2callback`
4. Copy Client ID and Secret to `.env`

## Project Structure

```
chanduvillain-ai-studio/
├── public/              # Static files
├── src/                 # Source code
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   └── middleware/     # Express middleware
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
└── server.js           # Main application file
```

## Available Scripts

### Development

```bash
npm start
```

Runs the application in development mode.

### Build

```bash
npm run build
```

Builds the application for production.

### Testing

```bash
npm test
```

Runs the test suite.

## Deployment on Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository

### Steps

1. **Connect GitHub Repository**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `chanduvillain-ai-studio` repository

2. **Configure Build Settings**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

3. **Set Environment Variables**
   - Go to Environment tab
   - Add all variables from `.env.example`:
     - `GEMINI_API_KEY`
     - `YOUTUBE_CLIENT_ID`
     - `YOUTUBE_CLIENT_SECRET`
     - `YOUTUBE_REDIRECT_URI` (set to your Render URL)

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API Key | Yes |
| `YOUTUBE_CLIENT_ID` | YouTube OAuth Client ID | Yes |
| `YOUTUBE_CLIENT_SECRET` | YouTube OAuth Client Secret | Yes |
| `YOUTUBE_REDIRECT_URI` | OAuth callback URL | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port (default: 3000) | No |

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not loading
- Ensure `.env` file exists in project root
- Restart the application after changing `.env`
- On Render, restart the service after updating environment variables

### OAuth redirect URI mismatch
- Ensure `YOUTUBE_REDIRECT_URI` matches exactly in both `.env` and Google Cloud Console
- Include protocol (https) and no trailing slash

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on [GitHub Issues](https://github.com/chanduvillain302-ship-it/chanduvillain-ai-studio/issues).

## Author

**Chanduvillain302-ship-it**
- GitHub: [@chanduvillain302-ship-it](https://github.com/chanduvillain302-ship-it)
- Deployed at: https://chanduvillain-ai-studio.onrender.com
