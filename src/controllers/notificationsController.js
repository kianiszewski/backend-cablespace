const { pool } = require('../utils/db.js');

// Obtener todas las notificaciones
const getAllNotifications = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notificaciones ORDER BY fecha_notificacion DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo notificaciones:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Obtener las notificaciones de un usuario
const getUserNotifications = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM notificaciones WHERE id_usuario = $1 ORDER BY fecha_notificacion DESC',
            [id_usuario]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo notificaciones del usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Crear una nueva notificación
const createNotification = async (req, res) => {
    const { id_usuario, mensaje, tipo, leido } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO notificaciones (id_usuario, mensaje, tipo, fecha_notificacion, leido) 
             VALUES ($1, $2, $3, NOW(), $4) RETURNING *`,
            [id_usuario, mensaje, tipo, leido || false] // Si no se envía "leido", se establece como false por defecto
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creando notificación:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Marcar una notificación como leída
const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE notificaciones SET leido = true WHERE id_notificacion = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error actualizando notificación:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Eliminar una notificación
const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM notificaciones WHERE id_notificacion = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }

        res.json({ message: 'Notificación eliminada correctamente' });
    } catch (error) {
        console.error('Error eliminando notificación:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = {
    getAllNotifications,
    getUserNotifications,
    createNotification,
    markNotificationAsRead,
    deleteNotification
};
