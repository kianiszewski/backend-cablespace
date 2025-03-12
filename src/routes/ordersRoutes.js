const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController.js');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware.js');

// 🔒 Solo admin puede obtener todos los pedidos
router.get('/', authenticateToken, authorizeRole(['admin']), ordersController.getAllOrders);

// 🔒 Los usuarios solo pueden obtener sus propios pedidos
router.get('/user', authenticateToken, authorizeRole(['usuario']), ordersController.getUserOrders);

// 🔒 Ambos pueden ver detalles de un pedido específico si tienen permiso
router.get('/:id', authenticateToken, authorizeRole(['admin', 'usuario']), ordersController.getOrderById);

// 🔒 Ambos pueden crear pedidos
router.post('/', authenticateToken, authorizeRole(['admin', 'usuario']), ordersController.createOrder);
router.post('/order-details', authenticateToken, authorizeRole(['admin', 'usuario']), ordersController.addOrderDetail);

// 🔒 Solo admin puede modificar o eliminar pedidos
router.put('/:id', authenticateToken, authorizeRole(['admin']), ordersController.updateOrderStatus);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), ordersController.deleteOrder);

module.exports = router;
