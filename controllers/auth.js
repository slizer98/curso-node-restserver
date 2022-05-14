const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { DefaultTransporter } = require('google-auth-library');


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

const googleSignIn = async(req, res) => {
    
    const { id_token } = req.body;
    try{
        const {email, name, img} = await googleVerify(id_token);
        // verificar si existe el email
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            const data = {
                name,
                email,
                password: ':v',
                img,
                google: true
            }
            usuario = new Usuario(data);
            console.log('usuario creado');
            await usuario.save();
        }
        // si el usuario esta activo en la base de datos
        if (!usuario.status ) {
            return res.status(401).json({
                msg: 'Hable con el administrador - status:false'
            });
        }

        // crear un JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch(err){
        res.status(500).json({
            ok: false,
            msg: 'El token no se pudo verificar',
            err
        });
    }
}


module.exports = {
    login,
    googleSignIn
}