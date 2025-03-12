const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware para verificar el rol del usuario
const authorizeRole = (rolesPermitidos) => (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
    }
    next();
};

module.exports = { authenticateToken, authorizeRole };
