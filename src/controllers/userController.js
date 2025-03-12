const { pool } = require('../utils/db.js');

// Obtener todos los usuarios (Solo Admin)
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id_usuario, nombre, email, rol, fecha_registro FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id_usuario, nombre, email, rol, fecha_registro 
             FROM usuarios 
             WHERE id_usuario = $1`, 
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getAllUsers, getUserProfile };
