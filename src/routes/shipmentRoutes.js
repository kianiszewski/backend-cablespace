const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController.js');

// Registrar un envío
router.post('/', shipmentController.createShipment);

// Obtener todos los envíos
router.get('/', shipmentController.getAllShipments);

// Obtener detalles de un envío
router.get('/:id', shipmentController.getShipmentById);

module.exports = router;
