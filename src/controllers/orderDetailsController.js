const { pool } = require('../utils/db.js');

// ✅ Crear un detalle de pedido
const createOrderDetail = async (req, res) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_pedido, id_producto, cantidad, precio_unitario]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('❌ Error agregando detalle de pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Obtener todos los detalles de un pedido específico
const getOrderDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM detalle_pedido WHERE id_pedido = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Detalles de pedido no encontrados' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('❌ Error obteniendo detalle de pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Obtener un detalle específico de un producto dentro de un pedido
const getOrderDetailByProduct = async (req, res) => {
    const { id_pedido, id_producto } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM detalle_pedido WHERE id_pedido = $1 AND id_producto = $2',
            [id_pedido, id_producto]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('❌ Error obteniendo detalle de producto en pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Actualizar la cantidad de un producto en un pedido
const updateOrderDetail = async (req, res) => {
    const { id_pedido, id_producto } = req.params;
    const { cantidad } = req.body;

    try {
        // Verificar si el detalle de pedido existe
        const checkExist = await pool.query(
            'SELECT * FROM detalle_pedido WHERE id_pedido = $1 AND id_producto = $2',
            [id_pedido, id_producto]
        );
        if (checkExist.rows.length === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }

        // Actualizar cantidad
        const result = await pool.query(
            'UPDATE detalle_pedido SET cantidad = $1 WHERE id_pedido = $2 AND id_producto = $3 RETURNING *',
            [cantidad, id_pedido, id_producto]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('❌ Error actualizando detalle de pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Eliminar un detalle de pedido
const deleteOrderDetail = async (req, res) => {
    const { id_pedido, id_producto } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM detalle_pedido WHERE id_pedido = $1 AND id_producto = $2 RETURNING *',
            [id_pedido, id_producto]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
        res.json({ message: 'Detalle de pedido eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error eliminando detalle de pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Exportar funciones
module.exports = { 
    createOrderDetail, 
    getOrderDetailById, 
    getOrderDetailByProduct, 
    updateOrderDetail, 
    deleteOrderDetail 
};
