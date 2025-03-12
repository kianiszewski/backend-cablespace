const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;
