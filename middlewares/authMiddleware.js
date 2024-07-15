// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const connection = require('../config/db'); // Asegúrate de tener la conexión a la base de datos

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

    jwt.verify(token, config.secretKey, (error, decoded) => {
        if (error) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });

        connection.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
            if (error) {
                res.status(500).send('Error getting the user');
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    });
};