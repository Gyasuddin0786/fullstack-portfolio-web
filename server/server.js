require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Route imports
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const profileRoutes = require('./routes/profile');
const uploadRoutes = require('./routes/uploads');
const contactRoutes = require('./routes/contact');
const messageRoutes = require('./routes/messages');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/messages', messageRoutes);

// Health check (public endpoint for monitoring)
app.get('/api/v1/health', (_, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message || 'Unknown error');
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (_, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});