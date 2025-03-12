const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController.js');

// Agregar un producto a favoritos
router.post('/', favoritesController.addToFavorites);

// Obtener todos los favoritos de un usuario
router.get('/:id_usuario', favoritesController.getFavoritesByUser);

// Eliminar un producto de favoritos
router.delete('/:id_usuario/:id_producto', favoritesController.removeFromFavorites);

module.exports = router;
