const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController.js');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware.js');

// Subir una imagen (solo usuarios autenticados)
router.post('/', authenticateToken, authorizeRole(['admin', 'usuario']), imageController.uploadImage);

// Obtener imágenes de un producto (público)
router.get('/:id_producto', imageController.getImagesByProduct);

// Eliminar una imagen (solo admin o usuario dueño del producto)
router.delete('/:id_imagen', authenticateToken, authorizeRole(['admin', 'usuario']), imageController.deleteImage);

module.exports = router;
