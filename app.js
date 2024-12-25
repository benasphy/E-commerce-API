const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

// Initialize app
const app = express();
app.use(cors());

// Add custom headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); // Allow specific headers
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
  next();
});

// Other middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'));

// API base path
const api = process.env.API_URL;

// Routes
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);

// MongoDB connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce',
  })
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
