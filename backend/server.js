import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import storyRoutes from './routes/storyRoutes.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.GOOGLE_API_KEY) {
  console.error('❌ GOOGLE_API_KEY is not set in .env file');
  console.error('Please add your Google AI Studio API key to the .env file');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', limiter);

// Routes
app.use('/api', storyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Marathi Story Generator API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📖 Marathi Story Generator API ready!`);
  
  // Debug API key
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY is not set in environment variables');
  } else if (apiKey === 'your_actual_google_ai_studio_api_key_here') {
    console.error('❌ Please replace the placeholder API key with your actual Google AI Studio API key');
  } else {
    console.log('✅ Google AI Studio API key is configured');
  }
});