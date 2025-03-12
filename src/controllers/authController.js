const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../utils/db.js');

const register = async (req, res) => {
    const { nombre, email, contraseña, rol } = req.body;

    try {
        // Verificar si el email ya está registrado
        const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email, rol, fecha_registro',
            [nombre, email, hashedPassword, rol || 'usuario']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña existe en la base de datos
        if (!user.contraseña) {
            return res.status(500).json({ message: 'Error interno: contraseña no registrada' });
        }

        // Verificar la contraseña encriptada
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT con el ID y el rol del usuario
        const token = jwt.sign(
            { id: user.id_usuario, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Enviar token junto con información básica del usuario
        res.json({
            token,
            user: {
                id: user.id_usuario,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Nueva función para obtener la información del usuario autenticado
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { register, login, getProfile };
