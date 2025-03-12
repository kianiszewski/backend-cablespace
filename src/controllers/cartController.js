const { pool } = require("../utils/db.js");

// Obtener carrito del usuario autenticado
const getCartByUser = async (req, res) => {
    const id_usuario = req.user.id;
    try {
        const result = await pool.query(
            `SELECT c.id_carrito, c.id_usuario, c.id_producto, p.nombre, p.precio, c.cantidad 
            FROM carrito c 
            JOIN productos p ON c.id_producto = p.id_producto 
            WHERE c.id_usuario = $1`,
            [id_usuario]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo el carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Agregar un producto al carrito o actualizar la cantidad si ya existe
const addToCart = async (req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO carrito (id_usuario, id_producto, cantidad) 
            VALUES ($1, $2, $3) 
            ON CONFLICT (id_usuario, id_producto) 
            DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad 
            RETURNING *`,
            [id_usuario, id_producto, cantidad]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error agregando al carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Eliminar un producto del carrito por id_usuario y id_producto
const removeFromCartByUser = async (req, res) => {
    const { id_usuario, id_producto } = req.body;

    try {
        const result = await pool.query(
            "DELETE FROM carrito WHERE id_usuario = $1 AND id_producto = $2 RETURNING *",
            [id_usuario, id_producto]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        res.json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error eliminando producto del carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

// Vaciar el carrito del usuario autenticado
const clearCart = async (req, res) => {
    const id_usuario = req.user.id;

    try {
        const result = await pool.query("DELETE FROM carrito WHERE id_usuario = $1 RETURNING *", [id_usuario]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "El carrito ya está vacío" });
        }

        res.json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        console.error("Error vaciando el carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = { getCartByUser, addToCart, removeFromCartByUser, clearCart };
