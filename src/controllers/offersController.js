const { pool } = require('../utils/db.js');

// Crear una oferta y actualizar el precio del producto
const createOffer = async (req, res) => {
    const { id_producto, descuento, fecha_inicio, fecha_fin } = req.body;

    try {
        await pool.query('BEGIN'); // Iniciar transacción

        // Obtener el precio actual del producto
        const productoResult = await pool.query('SELECT precio FROM productos WHERE id_producto = $1', [id_producto]);
        if (productoResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const precioActual = productoResult.rows[0].precio;
        const nuevoPrecio = precioActual - descuento;

        // Insertar oferta
        const ofertaResult = await pool.query(
            'INSERT INTO ofertas (id_producto, descuento, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_producto, descuento, fecha_inicio, fecha_fin]
        );

        // Actualizar precio del producto
        await pool.query('UPDATE productos SET precio = $1 WHERE id_producto = $2', [nuevoPrecio, id_producto]);

        await pool.query('COMMIT'); // Confirmar transacción

        res.status(201).json(ofertaResult.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK'); // Revertir cambios en caso de error
        console.error('Error creando oferta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar una oferta y restaurar el precio original
const deleteOffer = async (req, res) => {
    const { id_oferta } = req.params;

    try {
        await pool.query('BEGIN'); // Iniciar transacción

        // Obtener la oferta y su descuento
        const ofertaResult = await pool.query('SELECT * FROM ofertas WHERE id_oferta = $1', [id_oferta]);
        if (ofertaResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }

        const { id_producto, descuento } = ofertaResult.rows[0];

        // Obtener el último precio en historial
        const historialResult = await pool.query(
            'SELECT precio FROM historial WHERE id_producto = $1 ORDER BY fecha_cambio DESC LIMIT 1',
            [id_producto]
        );

        let precioOriginal = historialResult.rows.length > 0 ? historialResult.rows[0].precio : null;

        if (!precioOriginal) {
            await pool.query('ROLLBACK');
            return res.status(500).json({ message: 'No se encontró un precio anterior en historial' });
        }

        // Eliminar la oferta
        await pool.query('DELETE FROM ofertas WHERE id_oferta = $1', [id_oferta]);

        // Restaurar precio original
        await pool.query('UPDATE productos SET precio = $1 WHERE id_producto = $2', [precioOriginal, id_producto]);

        await pool.query('COMMIT'); // Confirmar transacción

        res.json({ message: 'Oferta eliminada correctamente' });
    } catch (error) {
        await pool.query('ROLLBACK'); // Revertir cambios en caso de error
        console.error('Error eliminando oferta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todas las ofertas
const getAllOffers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ofertas');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo ofertas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener ofertas de un producto específico
const getOffersByProduct = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const result = await pool.query('SELECT * FROM ofertas WHERE id_producto = $1', [id_producto]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo ofertas del producto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { createOffer, getAllOffers, getOffersByProduct, deleteOffer };
