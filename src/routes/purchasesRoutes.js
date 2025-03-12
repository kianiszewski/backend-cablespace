const express = require('express');
const router = express.Router();
const purchasesController = require('../controllers/purchasesController.js');

// Obtener todas las compras
router.get('/', purchasesController.getAllPurchases);

// Obtener todas las compras de un usuario
router.get('/user/:id_usuario', purchasesController.getUserPurchases);

// Obtener detalles de una compra por ID
router.get('/detail/:id_compra', purchasesController.getPurchaseById);

// Registrar una nueva compra
router.post('/', purchasesController.createPurchase);

// Eliminar una compra por ID
router.delete('/:id_compra', purchasesController.deletePurchase);

module.exports = router;
