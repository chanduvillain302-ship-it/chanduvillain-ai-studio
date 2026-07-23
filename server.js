require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting Chanduvillain AI Studio...');
console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${PORT}`);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Joke Generator Routes
app.get('/api/jokes/random', async (req, res) => {
  try {
    console.log('📡 Fetching random joke...');
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    res.json({
      success: true,
      joke: response.data,
      source: 'Official Joke API'
    });
  } catch (error) {
    console.error('❌ Error fetching joke:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message
    });
  }
});

// Get jokes by category
app.get('/api/jokes/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`📡 Fetching ${category} joke...`);
    const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${category}/random`);
    res.json({
      success: true,
      joke: response.data,
      category: category,
      source: 'Official Joke API'
    });
  } catch (error) {
    console.error(`❌ Error fetching ${req.params.category} joke:`, error.message);
    res.status(500).json({
      success: false,
      message: `Failed to fetch ${req.params.category} joke`,
      error: error.message
    });
  }
});

// Get multiple jokes
app.get('/api/jokes/multiple/:count', async (req, res) => {
  try {
    const count = Math.min(parseInt(req.params.count) || 1, 10);
    console.log(`📡 Fetching ${count} jokes...`);
    const response = await axios.get(`https://official-joke-api.appspot.com/jokes/random?count=${count}`);
    res.json({
      success: true,
      jokes: response.data,
      count: count,
      source: 'Official Joke API'
    });
  } catch (error) {
    console.error('❌ Error fetching jokes:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jokes',
      error: error.message
    });
  }
});

// Available categories
app.get('/api/jokes/categories', (req, res) => {
  const categories = ['general', 'programming', 'knock-knock'];
  res.json({
    success: true,
    categories: categories,
    description: 'Available joke categories'
  });
});

// Gemini AI Integration (placeholder)
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API key not configured'
      });
    }

    res.json({
      success: true,
      message: 'Gemini integration coming soon',
      prompt: prompt
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to process request',
      error: error.message
    });
  }
});

// YouTube OAuth callback (placeholder)
app.get('/oauth2callback', (req, res) => {
  const { code } = req.query;
  res.json({
    success: true,
    message: 'OAuth callback received',
    code: code ? 'Code received' : 'No code provided'
  });
});

// API Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    name: 'Chanduvillain AI Studio - Joke Generator',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      randomJoke: '/api/jokes/random',
      jokeByCategory: '/api/jokes/category/:category',
      multipleJokes: '/api/jokes/multiple/:count',
      categories: '/api/jokes/categories'
    }
  });
});

// 404 handler
app.use((req, res) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/info',
      'GET /api/jokes/random',
      'GET /api/jokes/category/:category',
      'GET /api/jokes/multiple/:count',
      'GET /api/jokes/categories'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('\n✅ Server started successfully!');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('\n📝 API Endpoints:');
  console.log(`   GET  /api/health              - Health check`);
  console.log(`   GET  /api/info                - API information`);
  console.log(`   GET  /api/jokes/random        - Random joke`);
  console.log(`   GET  /api/jokes/category/:cat - Joke by category`);
  console.log(`   GET  /api/jokes/multiple/:n   - Multiple jokes`);
  console.log(`   GET  /api/jokes/categories    - Available categories`);
  console.log('\n🎉 Ready to serve jokes!\n');
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
