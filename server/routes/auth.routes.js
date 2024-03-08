const express = require('express');
const authController = require('../controllers/auth.controllers'); // Replace with your controller path

const router = express.Router();

// Login route (assuming POST /api/auth/login)
router.post('/login', authController.login);

// Refresh token route (optional)
router.post('/refresh', authController.refreshToken); // Add if needed

module.exports = router;
