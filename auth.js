// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../db');

// POST /signup - User Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user data into the database
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error during signup:', err);
      return res.status(500).json({ error: 'Error during signup' });
    }
    res.status(201).json({ message: 'Signup successful' });
  });
});

// POST /login - User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve user from the database by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Error during login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token for successful login
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

module.exports = router;
