const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet =  (req, res) => {
    const {q, nombre='No name', page = 1, limit = 10} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        page,
        limit
    })
}

const usuariosPost = async (req, res) => {
    
    const {name, email, password, role} = req.body;
    const usuario = new Usuario({name, email, password, role});

    // check if the email exists
    const existsEmail = await Usuario.findOne({email});
    if(existsEmail) {
        return res.status(400).json({msg: 'The email already exists'});
    }
    
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // save password
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.status(201).json({
        msg: 'put API - controlador',
        id
    })
}
const usuariosDelete = (req, res) => {
    res.status(201).json({
        msg: 'delete API - controlador'
    })
}
const usuariosPatch = (req, res) => {
    res.status(201).json({
        msg: 'patch API - controlador'
    })
}





module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}