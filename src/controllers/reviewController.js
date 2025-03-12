const { pool } = require('../utils/db.js');

// Crear una reseña
const createReview = async (req, res) => {
    const { id_producto, id_usuario, calificacion, comentario } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO reseña (id_producto, id_usuario, calificacion, comentario) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_producto, id_usuario, calificacion, comentario]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registrando reseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todas las reseñas de un producto
const getReviewsByProduct = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const result = await pool.query('SELECT * FROM reseña WHERE id_producto = $1', [id_producto]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo reseñas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { createReview, getReviewsByProduct };
