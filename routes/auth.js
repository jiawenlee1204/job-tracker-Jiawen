const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const existingUser = db.users.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = db.users.create({ username, password: hashedPassword });
    
    const token = generateToken(newUser.id, newUser.username);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username: newUser.username }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db.users.findByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  bcrypt.compare(password, user.password, (err, isValidPassword) => {
    if (err) {
      console.error('Compare error:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = generateToken(user.id, user.username);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  });
});

module.exports = router;
