const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');

// Registrar una reseña
router.post('/', reviewController.createReview);

// Obtener todas las reseñas de un producto
router.get('/:id_producto', reviewController.getReviewsByProduct);

module.exports = router;
