const express = require('express');
const router = express.Router();
const User_Details = require('../models/userModel');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { user_name, user_address } = req.body;
    const newUser = await User_Details.create({ user_name, user_address });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User_Details.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get a single user by ID
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User_Details.findByPk(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

module.exports = router;
