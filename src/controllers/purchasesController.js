const { pool } = require('../utils/db.js');

// Obtener todas las compras
const getAllPurchases = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT DISTINCT c.id_compra, c.id_usuario, c.id_producto, p.nombre AS producto, 
                    c.cantidad, c.fecha_compra, COALESCE(m.nombre, 'No especificado') AS metodo_pago
             FROM compras c
             JOIN productos p ON c.id_producto = p.id_producto
             LEFT JOIN metodos_pago m ON c.id_metodo = m.id_metodo
             ORDER BY c.id_compra DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo compras:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Registrar múltiples compras y generar pedido
const createPurchase = async (req, res) => {
    console.log("Datos recibidos en la compra:", req.body); // ✅ Depuración

    const { id_usuario, productos, id_metodo } = req.body;

    if (!id_usuario) {
        return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "No hay productos en la compra", productos });
    }

    if (!id_metodo) {
        return res.status(400).json({ message: "Método de pago no seleccionado", id_metodo });
    }

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Iniciamos transacción

            // Crear pedido
            const pedidoResult = await client.query(
                `INSERT INTO pedidos (id_usuario, fecha_pedido, estado) 
                 VALUES ($1, NOW(), 'pendiente') RETURNING id_pedido`,
                [id_usuario]
            );
            const id_pedido = pedidoResult.rows[0].id_pedido;

            const comprasPromises = productos.map(async (item) => {
                if (!item.id_producto || !item.cantidad) {
                    throw new Error(`Producto inválido en la compra: ${JSON.stringify(item)}`);
                }

                // Obtener precio del producto
                const precioResult = await client.query(
                    "SELECT precio FROM productos WHERE id_producto = $1",
                    [item.id_producto]
                );

                if (precioResult.rowCount === 0) {
                    throw new Error(`Producto ID ${item.id_producto} no encontrado`);
                }

                const precio_unitario = precioResult.rows[0].precio;

                // Insertar en detalle_pedido
                await client.query(
                    `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) 
                     VALUES ($1, $2, $3, $4)`,
                    [id_pedido, item.id_producto, item.cantidad, precio_unitario]
                );

                // Registrar la compra
                return client.query(
                    `INSERT INTO compras (id_usuario, id_producto, cantidad, id_metodo, fecha_compra)
                     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
                    [id_usuario, item.id_producto, item.cantidad, id_metodo]
                );
            });

            const results = await Promise.all(comprasPromises);

            // Descontar stock de cada producto comprado
            for (const item of productos) {
                await client.query(
                    "UPDATE productos SET stock = stock - $1 WHERE id_producto = $2",
                    [item.cantidad, item.id_producto]
                );
            }

            await client.query('COMMIT'); // Confirmamos la transacción

            res.status(201).json({ message: "Compra realizada con éxito", compras: results.map(r => r.rows[0]) });
        } catch (error) {
            await client.query('ROLLBACK'); // Revertimos si hay error
            console.error("Error interno en la compra:", error);
            res.status(500).json({ message: "Error interno en la compra", error: error.message });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error registrando compra:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Obtener compras de un usuario
const getUserPurchases = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const result = await pool.query(
            `SELECT DISTINCT c.id_compra, c.id_usuario, c.id_producto, p.nombre AS producto, 
                    c.cantidad, c.fecha_compra, COALESCE(m.nombre, 'No especificado') AS metodo_pago
             FROM compras c
             JOIN productos p ON c.id_producto = p.id_producto
             LEFT JOIN metodos_pago m ON c.id_metodo = m.id_metodo
             WHERE c.id_usuario = $1
             ORDER BY c.fecha_compra DESC`,
            [id_usuario]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo compras del usuario:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Obtener detalles de una compra
const getPurchaseById = async (req, res) => {
    const { id_compra } = req.params;
    try {
        const result = await pool.query(
            `SELECT c.id_compra, c.id_usuario, c.id_producto, p.nombre AS producto, c.cantidad, 
                    c.fecha_compra, COALESCE(m.nombre, 'No especificado') AS metodo_pago
             FROM compras c
             JOIN productos p ON c.id_producto = p.id_producto
             LEFT JOIN metodos_pago m ON c.id_metodo = m.id_metodo
             WHERE c.id_compra = $1`,
            [id_compra]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Compra no encontrada" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error obteniendo compra:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Eliminar una compra
const deletePurchase = async (req, res) => {
    const { id_compra } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM compras WHERE id_compra = $1 RETURNING *",
            [id_compra]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Compra no encontrada" });
        }

        res.json({ message: "Compra eliminada correctamente" });
    } catch (error) {
        console.error("Error eliminando compra:", error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

module.exports = {
    getAllPurchases,
    createPurchase,
    getUserPurchases,
    getPurchaseById,
    deletePurchase
};
