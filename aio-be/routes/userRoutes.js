const express = require('express');
const router = express.Router();
const { getUsers, createUser, registerUser, loginUser } = require('../controllers/userController');
const { check } = require('express-validator');

// Get and create users (optional)
router.get('/', getUsers);
router.post('/', createUser);

// Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  registerUser
);

// Login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

module.exports = router;
