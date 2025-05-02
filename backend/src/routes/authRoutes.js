const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
// Commented out for development - will be used later for email verification
// router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router; 