const { pool } = require('../utils/db.js');

// Crear un envío
const createShipment = async (req, res) => {
    const { id_pedido, direccion_envio, fecha_envio, fecha_entrega, estado } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO envios (id_pedido, direccion_envio, fecha_envio, fecha_entrega, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id_pedido, direccion_envio, fecha_envio || null, fecha_entrega || null, estado || 'pendiente']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error registrando envío:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todos los envíos
const getAllShipments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM envios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo todos los envíos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener detalles de un envío por ID
const getShipmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM envios WHERE id_envio = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo envío:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { createShipment, getAllShipments, getShipmentById };
