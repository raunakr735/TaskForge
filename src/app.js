const express = require('express');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tasks', taskRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'TaskForge API is running 🚀' });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
