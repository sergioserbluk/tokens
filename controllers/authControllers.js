const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const config = require('../config/config');
const connection = require('../config/db');
exports.register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newuser = { id: User.length + 1, username, password: hashedPassword };
    connection.query('INSERT INTO users SET ?', newuser, (error, result) => {
        if (error) {
            res.status(500).send('Error registering the user');
        } else {
            const token = jwt.sign({ id: result.insertId }, config.secretKey, { expiresIn: config.tokenExpiresIn });
            res.status(201).send({ auth: true, token });
        }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, result) => {
        if (error) {
            res.status(500).send('Error logging in');
        } else {
            const user = result[0];
            if (!user) return res.status(404).send('User not found');
            const passwordIsValid = bcrypt.compareSync(password, user.password);//compara la contraseña ingresada con la contraseña encriptada, si son iguales devuelve true
            if (passwordIsValid==false) return res.status(401).send({ auth: false, token: user.password, message: 'Invalid password'});//si la contraseña no es valida devuelve un mensaje de error
            const token = jwt.sign({ id: user.id }, config.secretKey, { expiresIn: config.tokenExpiresIn });
            res.status(200).send({ auth: true, token });
        }
    });
};
exports.protected = (req, res) => { //funcion para verificar si el usuario esta logueado
    res.status(200).send(`hola usuario ${req.userId}`);
};
//funcion para cambiar la contraseña
exports.changePassword = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    connection.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username], (error, result) => {
        if (error) {
            res.status(500).send('Error changing the password', error);
        } else {
            res.status(200).send('Password changed successfully');
        }
    });
};
//post para registrar un usuario
//post para loguear un usuario
//put para cambiar la contraseña