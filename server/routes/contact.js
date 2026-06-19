const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendContactMessage } = require('../controllers/contactController');

const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 messages per window
  message: {
    success: false,
    message: 'Too many messages sent, please try again later'
  }
});

const contactValidation = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 1 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

router.post('/', contactValidation, sendContactMessage);

module.exports = router;