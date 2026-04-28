import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

import userRoutes from './routes/userRoutes.js';

// Middleware

app.use(express.json());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);

// Basic route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Travel Adventure API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
