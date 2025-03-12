const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offersController.js');

// Agregar una oferta
router.post('/', offersController.createOffer);

// Obtener todas las ofertas
router.get('/', offersController.getAllOffers);

// Obtener ofertas por producto
router.get('/:id_producto', offersController.getOffersByProduct);

// Eliminar una oferta
router.delete('/:id_oferta', offersController.deleteOffer);

module.exports = router;
