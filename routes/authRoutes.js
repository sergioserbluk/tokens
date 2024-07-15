//routing de la autenticación
const express = require('express');
const authControllers = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.put('/change-password', authControllers.changePassword);//ruta para cambiar la contraseña
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`hola usuario ${req.userId}`);
});
module.exports = router;
