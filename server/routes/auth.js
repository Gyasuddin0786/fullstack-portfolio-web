const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { login, logout, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many login attempts, please try again later'
  }
});

router.post('/login', 
  loginLimiter,
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
  ],
  login
);

router.post('/logout', logout);
router.get('/me', auth, getMe);

module.exports = router;