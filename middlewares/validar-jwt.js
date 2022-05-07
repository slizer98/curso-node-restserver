const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid
        const usuario = req.usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({ msg: 'Invalid Token - user doesnt exist ' });
        }

        //verificar si no existe el usuario
        if (!usuario.status) {
            return res.status(401).json({ msg: 'Invalid Token - user status: false ' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token invalid' });        
    }
}

module.exports = {
    validarJWT
}