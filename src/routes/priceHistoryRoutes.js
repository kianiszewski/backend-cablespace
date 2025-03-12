const express = require('express');
const router = express.Router();
const priceHistoryController = require('../controllers/priceHistoryController.js');

// Registrar un cambio de precio
router.post('/', priceHistoryController.createPriceHistory);

// Obtener el historial de precios de un producto
router.get('/:id_producto', priceHistoryController.getPriceHistoryByProduct);

module.exports = router;
