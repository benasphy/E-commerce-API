const express = require('express');
const router = express.Router();
const User = require('../models/user');

const auth = require('../middlewares/auth'); // Import the Basic Auth middleware

// Get all users (secured with Basic Authentication)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send the users as a JSON response
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server Error'); // Handle server errors
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

// Authenticate a user
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Login successful');
});

module.exports = router;
