const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

console.log('Starting Dark Story Backend...');
console.log('Port:', PORT);
console.log('Node version:', process.version);

// Middleware
app.use(cors({
  origin: [
    'https://main.d1zg38s9plz0es.amplifyapp.com',
    'http://localhost:3000' // Para desarrollo local
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dark Story API is running' });
});

// Import routes
const generateRoute = require('./routes/generate');
const ttsRoute = require('./routes/tts');

// Use routes
app.use('/api/generate', generateRoute);
app.use('/api/tts', ttsRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});
