// routes.js
const express = require('express');
const userController = require('./controllers/user.controller');
const authMiddleware = require('./middlewares/auth.middleware');

const router = express.Router();

// Protected route example
router.get('/protected/data', authMiddleware, userController.getProtectedData);

module.exports = router;
