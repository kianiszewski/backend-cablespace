const { pool } = require('../utils/db.js');

// Registrar un cambio de precio
const createPriceHistory = async (req, res) => {
    const { id_producto, precio } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO historial (id_producto, precio) VALUES ($1, $2) RETURNING *',
            [id_producto, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registrando historial de precios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener el historial de precios de un producto
const getPriceHistoryByProduct = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const result = await pool.query('SELECT * FROM historial WHERE id_producto = $1', [id_producto]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo historial de precios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { createPriceHistory, getPriceHistoryByProduct };
