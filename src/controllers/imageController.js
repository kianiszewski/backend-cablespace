const { pool } = require('../utils/db.js');

// Subir una imagen vinculada a un producto
const uploadImage = async (req, res) => {
    const { id_producto, url_imagen } = req.body;

    try {
        // Verificar que el producto existe
        const productCheck = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id_producto]);
        if (productCheck.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Insertar imagen
        const result = await pool.query(
            'INSERT INTO imagenes (id_producto, url_imagen) VALUES ($1, $2) RETURNING *',
            [id_producto, url_imagen]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error subiendo imagen:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener imágenes por producto
const getImagesByProduct = async (req, res) => {
    const { id_producto } = req.params;

    try {
        const result = await pool.query(
            'SELECT url_imagen FROM imagenes WHERE id_producto = $1',
            [id_producto]
        );
        res.json(result.rows.map(row => row.url_imagen)); // Devuelve solo las URLs
    } catch (error) {
        console.error('Error obteniendo imágenes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar una imagen específica
const deleteImage = async (req, res) => {
    const { id_imagen } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM imagenes WHERE id_imagen = $1 RETURNING *',
            [id_imagen]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        res.json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
        console.error('Error eliminando imagen:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { uploadImage, getImagesByProduct, deleteImage };
