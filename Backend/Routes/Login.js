// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const secretKey = process.env.SECRET; // Replace with a strong secret key

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Include the "isAdmin" status in the JWT payload if the user is an admin
    const payload = {
      userId: user._id,
      isAdmin: user.isAdmin, // Include the "isAdmin" status
    };

    // Create and send a JSON Web Token (JWT) for authentication
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
