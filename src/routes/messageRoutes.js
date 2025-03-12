const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');

// Enviar un mensaje
router.post('/', messageController.sendMessage);

// Obtener mensajes entre dos usuarios
router.get('/:id_remitente/:id_destinatario', messageController.getMessagesBetweenUsers);

module.exports = router;
