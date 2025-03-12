const { pool } = require('../utils/db.js');

// ✅ Obtener todos los productos con filtro opcional por estado, usuario y categoría
const getAllProducts = async (req, res) => {
    try {
        const { usuarioId, estado, categoria } = req.query;
        let query = `
            SELECT p.*, 
                   COALESCE(json_agg(i.url_imagen) FILTER (WHERE i.url_imagen IS NOT NULL), '[]') AS imagenes,
                   (
                       SELECT precio FROM historial 
                       WHERE id_producto = p.id_producto 
                       ORDER BY fecha_cambio DESC 
                       OFFSET 1 LIMIT 1
                   ) AS precio_anterior
            FROM productos p
            LEFT JOIN imagenes i ON p.id_producto = i.id_producto
        `;

        const params = [];
        const conditions = [];

        if (usuarioId) {
            conditions.push(`p.id_vendedor = $${params.length + 1}`);
            params.push(usuarioId);
        }

        if (estado) {
            conditions.push(`p.estado = $${params.length + 1}`);
            params.push(estado.toUpperCase()); // Convertimos a mayúsculas para asegurar coincidencia con la BD
        }

        if (categoria) {
            conditions.push(`p.id_categoria = (SELECT id_categoria FROM categorias WHERE LOWER(nombre) = LOWER($${params.length + 1}))`);
            params.push(categoria);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(" AND ");
        }

        query += ` GROUP BY p.id_producto`;

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Obtener un solo producto con estado, imágenes y precio anterior correcto
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT p.*, 
                   COALESCE(json_agg(i.url_imagen) FILTER (WHERE i.url_imagen IS NOT NULL), '[]') AS imagenes,
                   (
                       SELECT precio FROM historial 
                       WHERE id_producto = p.id_producto 
                       ORDER BY fecha_cambio DESC 
                       OFFSET 1 LIMIT 1
                   ) AS precio_anterior
            FROM productos p
            LEFT JOIN imagenes i ON p.id_producto = i.id_producto
            WHERE p.id_producto = $1
            GROUP BY p.id_producto
        `, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Crear un nuevo producto con estado, imágenes y guardar historial de precio
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, stock, id_categoria, id_vendedor, imagenes, estado } = req.body;

    try {
        const result = await pool.query(`
            INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, id_vendedor, fecha_publicacion, estado)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7) RETURNING id_producto
        `, [nombre, descripcion, precio, stock, id_categoria, id_vendedor, estado]);

        const id_producto = result.rows[0].id_producto;

        // Guardar historial de precio
        await pool.query(
            'INSERT INTO historial (id_producto, precio, fecha_cambio) VALUES ($1, $2, NOW())',
            [id_producto, precio]
        );

        // Insertar imágenes si existen
        if (imagenes && imagenes.length > 0) {
            const imageQueries = imagenes.map(url => pool.query(
                'INSERT INTO imagenes (id_producto, url_imagen) VALUES ($1, $2)',
                [id_producto, url]
            ));
            await Promise.all(imageQueries);
        }

        res.status(201).json({ message: 'Producto creado con éxito', id_producto });
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// ✅ Actualizar un producto, incluyendo su estado, y guardar historial si el precio cambia
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, id_categoria, imagenes, estado } = req.body;

    try {
        const { rows } = await pool.query('SELECT precio FROM productos WHERE id_producto = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const precioActual = rows[0].precio;

        await pool.query(`
            UPDATE productos 
            SET nombre = $1, descripcion = $2, precio = $3, stock = $4, id_categoria = $5, estado = $6
            WHERE id_producto = $7
        `, [nombre, descripcion, precio, stock, id_categoria, estado, id]);

        // Si el precio cambió, registrar en el historial
        if (precio !== precioActual) {
            await pool.query(
                'INSERT INTO historial (id_producto, precio, fecha_cambio) VALUES ($1, $2, NOW())',
                [id, precio]
            );
        }

        res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error actualizando producto:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct };
