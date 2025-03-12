const { pool } = require('../utils/db.js');

// Obtener todos los pagos
const getAllPayments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pagos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo pagos:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Obtener un pago por ID
const getPaymentById = async (req, res) => {
    const { id_pago } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pagos WHERE id_pago = $1', [id_pago]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo pago:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Obtener métodos de pago de un usuario
const getUserPaymentMethods = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const result = await pool.query(
            `SELECT mp.id_metodo, mp.nombre, up.numero_tarjeta, up.fecha_vencimiento, up.cvv
             FROM metodos_pago mp
             JOIN usuarios_metodos_pago up ON mp.id_metodo = up.id_metodo
             WHERE up.id_usuario = $1`, 
             [id_usuario]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay métodos de pago registrados para este usuario' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Error obteniendo métodos de pago:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Crear un nuevo pago
const createPayment = async (req, res) => {
    const { id_pedido, id_metodo, monto, estado } = req.body;

    if (!id_pedido || !id_metodo || monto === undefined || !estado) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO pagos (id_pedido, id_metodo, monto, estado) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_pedido, id_metodo, monto, estado]  // 🔹 Ahora toma el estado del request correctamente
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creando pago:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Actualizar el estado de un pago
const updatePaymentStatus = async (req, res) => {
    const { id_pago } = req.params;
    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({ message: 'El campo estado es obligatorio' });
    }

    try {
        const result = await pool.query(
            'UPDATE pagos SET estado = $1 WHERE id_pago = $2 RETURNING *',
            [estado, id_pago]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error actualizando pago:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Eliminar un pago
const deletePayment = async (req, res) => {
    const { id_pago } = req.params;
    try {
        const result = await pool.query('DELETE FROM pagos WHERE id_pago = $1 RETURNING *', [id_pago]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.json({ message: 'Pago eliminado', deletedPayment: result.rows[0] });
    } catch (error) {
        console.error('Error eliminando pago:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { 
    getAllPayments, 
    getPaymentById, 
    getUserPaymentMethods, 
    createPayment, 
    updatePaymentStatus, 
    deletePayment 
};
