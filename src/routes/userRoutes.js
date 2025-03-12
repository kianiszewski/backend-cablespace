const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

// 🔒 Un usuario autenticado puede ver su propio perfil
router.get('/profile', authenticateToken, userController.getUserProfile);

// 🔒 Solo el admin puede ver todos los usuarios
router.get('/', authenticateToken, userController.getAllUsers);

module.exports = router;
