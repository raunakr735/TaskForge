const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Connect to database then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 TaskForge server running on http://localhost:${PORT}`);
  });
});
