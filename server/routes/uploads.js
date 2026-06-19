const express = require('express');
const { generatePresignedUrl } = require('../controllers/uploadController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/presign', auth, generatePresignedUrl);

module.exports = router;