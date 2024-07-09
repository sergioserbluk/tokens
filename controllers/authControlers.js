const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const config = require('../config/config');
const secretKey = config.secretKey;
const tokenExpiresln = config.tokenExpiresln;
exports.register = (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newuser = {id: User.length + 1, username, password: hashedPassword};
    User.push(newuser);
    const token = jwt.sign({id: newuser.id}, secretKey, {expiresln: tokenExpiresln});
    res.status(200).send({auth: true, token});
}
exports.login = (req, res) => {
    const {username, password} = req.body;
    const user = User.find(user => user.username === username);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({auth: false, token: null});
    }
    const token = jwt.sign({id: user.id}, secretKey, {expiresln: tokenExpiresln});
    res.status(200).send({auth: true, token});
}
