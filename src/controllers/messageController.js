const { pool } = require('../utils/db.js');

// Enviar un mensaje
const sendMessage = async (req, res) => {
    const { id_remitente, id_destinatario, mensaje } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO mensaje (id_remitente, id_destinatario, mensaje) VALUES ($1, $2, $3) RETURNING *',
            [id_remitente, id_destinatario, mensaje]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener mensajes entre dos usuarios
const getMessagesBetweenUsers = async (req, res) => {
    const { id_remitente, id_destinatario } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM mensaje WHERE (id_remitente = $1 AND id_destinatario = $2) OR (id_remitente = $2 AND id_destinatario = $1) ORDER BY fecha_envio ASC',
            [id_remitente, id_destinatario]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo mensajes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { sendMessage, getMessagesBetweenUsers };
