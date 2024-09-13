const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
require('dotenv').config();
// Define routes
const rootRouter = require('./routes/index');
app.use(cors()); 
// Define your port
const PORT = process.env.PORT || 3000;

// CORS Configuration


// Handle OPTIONS requests for CORS preflight
// This ensures preflight requests are handled


app.use('/api/v1', rootRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
