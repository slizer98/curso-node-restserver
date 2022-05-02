const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet =  async(req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limit))
            .skip(Number(from))
    ])
    
    res.json({
        total,
        users
    })
}

const usuariosPost = async (req, res) => {
    
    const {name, email, password, role} = req.body;
    const usuario = new Usuario({name, email, password, role});
 
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

const usuariosPut = async(req, res) => {
    const {id} = req.params;
    const {_id,password, google, correo, ...resto} = req.body;

    // TODO: valid vs bd
    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    res.status(201).json(usuario)
}

const usuariosDelete = async(req, res) => {
    const {id} = req.params;

    //phisically remove
    // const usuario = await Usuario.findByIdAndDelete(id);

    // change status to false (logical deleted)
    const usuario = await Usuario.findByIdAndUpdate(id, {status: false}, {new: true});
    
    res.status(201).json(usuario)
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