const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res) => {

    const { email, password } = req.body;

    try{

        // verificar si existe el email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario /  password no son correctos - email'
            });
        }
        
        // si el usuario esta activo en la base de datos
        if (!usuario.status ) {
            return res.status(400).json({
                msg: 'El usuario /  password no son correctos - status:false'
            });
        }

        // verificar si el password 
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'El usuario /  password no son correctos - password'
            });
        }

        // crear un JWT
        const token = await generarJWT(usuario.id);
        
        
        res.json({
            usuario,
            token
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'talk to the admin',
        });
    }
}


module.exports = {
    login
}