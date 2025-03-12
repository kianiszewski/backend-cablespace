const { pool } = require('../utils/db.js');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const result = await pool.query("SELECT id_categoria, nombre FROM categorias");
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = { getAllCategories };
