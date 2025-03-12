const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController.js');

// Obtener todos los pagos
router.get('/', paymentController.getAllPayments);

// Obtener un pago por ID
router.get('/:id_pago', paymentController.getPaymentById);

// Obtener métodos de pago de un usuario específico
router.get('/user/:id_usuario', paymentController.getUserPaymentMethods);

// Crear un nuevo pago
router.post('/', paymentController.createPayment);

// Actualizar estado de un pago
router.put('/:id_pago', paymentController.updatePaymentStatus);

// Eliminar un pago
router.delete('/:id_pago', paymentController.deletePayment);

module.exports = router;
