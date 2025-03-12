const { pool } = require('../utils/db.js');

// Obtener todos los pedidos (solo admin)
const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos ORDER BY fecha_pedido DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo pedidos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener los pedidos de un usuario autenticado
const getUserOrders = async (req, res) => {
    const userId = req.user.id; // El ID del usuario autenticado

    try {
        const result = await pool.query(
            'SELECT * FROM pedidos WHERE id_usuario = $1 ORDER BY fecha_pedido DESC',
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo pedidos del usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener un pedido por ID (solo si pertenece al usuario o si es admin)
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE id_pedido = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        const pedido = result.rows[0];

        // Si el usuario no es admin y no es el dueño del pedido, denegar acceso
        if (req.user.rol !== 'admin' && pedido.id_usuario !== req.user.id) {
            return res.status(403).json({ message: 'Acceso denegado. No puedes ver este pedido.' });
        }

        res.json(pedido);
    } catch (error) {
        console.error('Error obteniendo pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Crear un nuevo pedido
const createOrder = async (req, res) => {
    const { id_usuario, estado } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO pedidos (id_usuario, estado) VALUES ($1, $2) RETURNING *',
            [id_usuario, estado || 'pendiente']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creando pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Agregar un detalle de pedido y descontar stock en una transacción
const addOrderDetail = async (req, res) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Iniciar transacción

        // Verificar stock disponible
        const stockCheck = await client.query('SELECT stock FROM productos WHERE id_producto = $1 FOR UPDATE', [id_producto]);

        if (stockCheck.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const stockDisponible = stockCheck.rows[0].stock;

        if (stockDisponible < cantidad) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Stock insuficiente para este pedido' });
        }

        // Insertar el detalle del pedido
        const result = await client.query(
            `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [id_pedido, id_producto, cantidad, precio_unitario]
        );

        // Descontar el stock del producto
        await client.query(
            'UPDATE productos SET stock = stock - $1 WHERE id_producto = $2',
            [cantidad, id_producto]
        );

        await client.query('COMMIT'); // Confirmar transacción
        res.status(201).json(result.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error agregando detalle al pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    } finally {
        client.release(); // Liberar conexión
    }
};

// Actualizar el estado de un pedido (solo admin)
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const result = await pool.query(
            'UPDATE pedidos SET estado = $1 WHERE id_pedido = $2 RETURNING *',
            [estado, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error actualizando pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar un pedido y restaurar stock (solo admin)
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Iniciar transacción

        // Verificar si el pedido existe
        const orderCheck = await client.query('SELECT id_pedido FROM pedidos WHERE id_pedido = $1', [id]);
        if (orderCheck.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        // Restaurar stock de productos en el pedido
        const detalles = await client.query('SELECT id_producto, cantidad FROM detalle_pedido WHERE id_pedido = $1', [id]);

        for (const detalle of detalles.rows) {
            await client.query(
                'UPDATE productos SET stock = stock + $1 WHERE id_producto = $2',
                [detalle.cantidad, detalle.id_producto]
            );
        }

        // Eliminar detalles del pedido
        await client.query('DELETE FROM detalle_pedido WHERE id_pedido = $1', [id]);

        // Eliminar el pedido
        const result = await client.query('DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *', [id]);

        await client.query('COMMIT'); // Confirmar transacción

        res.json({ message: 'Pedido eliminado correctamente', deletedOrder: result.rows[0] });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error eliminando pedido:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    } finally {
        client.release();
    }
};

module.exports = { getAllOrders, getUserOrders, getOrderById, createOrder, addOrderDetail, updateOrderStatus, deleteOrder };
