require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'https://fintract-3.netlify.app',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const transactionRoutes = require('./routes/transaction.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check (optional)
app.get('/api/health', (req, res) => {
  res.json({ message: 'FinTrack API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: err.message 
  });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
