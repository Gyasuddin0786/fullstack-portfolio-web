const express = require('express');
const { body } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

const profileValidation = [
  body('name').optional().trim().isLength({ min: 1 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('bio').optional().trim(),
  body('avatarUrl').optional().isURL(),
  body('resumeUrl').optional().isURL(),
  body('socials.github').optional().isURL(),
  body('socials.linkedin').optional().isURL(),
  body('socials.twitter').optional().isURL(),
  body('socials.website').optional().isURL()
];

router.route('/')
  .get(getProfile)
  .put(auth, profileValidation, updateProfile);

module.exports = router;