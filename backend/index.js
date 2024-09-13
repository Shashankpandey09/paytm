const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Define your port
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: 'https://paytm-6iqj.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle OPTIONS requests for CORS preflight
app.options('*', cors()); // This ensures preflight requests are handled

// Define routes
const rootRouter = require('./routes/index');
app.use('/api/v1', rootRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
