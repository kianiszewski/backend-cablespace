const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

// Obtener todas las categorías
router.get('/', categoryController.getAllCategories);

module.exports = router;
