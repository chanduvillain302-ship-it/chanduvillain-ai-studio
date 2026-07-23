require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Joke Generator Routes
app.get('/api/jokes/random', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    res.json({
      success: true,
      joke: response.data,
      source: 'Official Joke API'
    });
  } catch (error) {
    console.error('Error fetching joke:', error.message);
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
    const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${category}/random`);
    res.json({
      success: true,
      joke: response.data,
      category: category,
      source: 'Official Joke API'
    });
  } catch (error) {
    console.error('Error fetching joke:', error.message);
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
    const count = Math.min(parseInt(req.params.count) || 1, 10); // Max 10
    const response = await axios.get(`https://official-joke-api.appspot.com/jokes/random?count=${count}`);
    res.json({
      success: true,
      jokes: response.data,
      count: count,
      source: 'Official Joke API'
    });
  } catch (error) {
    console.error('Error fetching jokes:', error.message);
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

    // Placeholder - add actual Gemini implementation
    res.json({
      success: true,
      message: 'Gemini integration coming soon',
      prompt: prompt
    });
  } catch (error) {
    console.error('Error:', error.message);
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   - Health Check: GET /api/health`);
  console.log(`   - Random Joke: GET /api/jokes/random`);
  console.log(`   - Joke by Category: GET /api/jokes/category/:category`);
  console.log(`   - Multiple Jokes: GET /api/jokes/multiple/:count`);
  console.log(`   - Categories: GET /api/jokes/categories`);
});

module.exports = app;
