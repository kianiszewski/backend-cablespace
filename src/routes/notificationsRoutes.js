const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController.js');

// Obtener todas las notificaciones
router.get('/', notificationsController.getAllNotifications);

// Obtener las notificaciones de un usuario específico
router.get('/:id_usuario', notificationsController.getUserNotifications);

// Crear una nueva notificación
router.post('/', notificationsController.createNotification);

// Marcar una notificación como leída
router.put('/:id', notificationsController.markNotificationAsRead);

// Eliminar una notificación
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;
