const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/orderDetailsController.js');

// ✅ Agregar un producto a un pedido
router.post('/', orderDetailsController.createOrderDetail);

// ✅ Obtener detalles de un pedido específico
router.get('/:id', orderDetailsController.getOrderDetailById);

// ✅ Obtener un detalle específico de un producto dentro de un pedido
router.get('/:id_pedido/:id_producto', orderDetailsController.getOrderDetailByProduct);

// ✅ Actualizar la cantidad de un producto en un pedido
router.put('/:id_pedido/:id_producto', orderDetailsController.updateOrderDetail);

// ✅ Eliminar un detalle de pedido
router.delete('/:id_pedido/:id_producto', orderDetailsController.deleteOrderDetail);

module.exports = router;
