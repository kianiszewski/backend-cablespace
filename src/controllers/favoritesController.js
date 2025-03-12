const { pool } = require('../utils/db.js');

// Agregar un producto a favoritos
const addToFavorites = async (req, res) => {
    const { id_usuario, id_producto } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO favoritos (id_usuario, id_producto) VALUES ($1, $2) RETURNING *',
            [id_usuario, id_producto]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error agregando a favoritos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener los favoritos de un usuario
const getFavoritesByUser = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const result = await pool.query(
            'SELECT f.id_favorito, p.* FROM favoritos f INNER JOIN productos p ON f.id_producto = p.id_producto WHERE f.id_usuario = $1',
            [id_usuario]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo favoritos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un producto de favoritos
const removeFromFavorites = async (req, res) => {
    const { id_usuario, id_producto } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM favoritos WHERE id_usuario = $1 AND id_producto = $2 RETURNING *',
            [id_usuario, id_producto]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado en favoritos' });
        }

        res.json({ message: 'Producto eliminado de favoritos' });
    } catch (error) {
        console.error('Error eliminando de favoritos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { addToFavorites, getFavoritesByUser, removeFromFavorites };
