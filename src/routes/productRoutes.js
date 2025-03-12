const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware.js');

// 📌 Rutas accesibles por todos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// 🔒 Solo usuarios autenticados pueden publicar, editar y eliminar productos
router.post('/', authenticateToken, authorizeRole(['admin', 'usuario']), productController.createProduct);
router.put('/:id', authenticateToken, authorizeRole(['admin', 'usuario']), productController.updateProduct);

module.exports = router;
