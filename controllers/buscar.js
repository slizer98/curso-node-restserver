const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models');

const buscar = (req, res) => {

    const coleccionesPermitidas = [
        'productos',
        'usuarios',
        'categorias',
        'roles'
    ];

    const buscarUsuarios = async (termino = '', res) => {
        const esMongoId = ObjectId.isValid(termino);
        if(esMongoId){
            const usuario = await Usuario.findById(termino);
            return res.json({
                results: (usuario) ? [usuario] : []
            })
        }

        const regex = new RegExp(termino, 'i');
        
        const usuarios = await Usuario.find({
            $or: [
                {name: regex },
                {email: regex },
            ],
            $and: [{status: true}]
        })
        res.json({
            results: usuarios
        })
    }

    const buscarCategorias = async (termino = '', res) => {
        const esMongoId = ObjectId.isValid(termino);
        if(esMongoId){
            const categoria = await Categoria.findById(termino);
            return res.json({
                results: (categoria) ? [categoria] : []
            })
        }

        const regex = new RegExp(termino, 'i');
        
        const categorias = await Categoria.find({nombre: regex, estado: true})
        res.json({
            results: categorias
        })
    }

    const buscarProductos = async (termino = '', res) => {
        const esMongoId = ObjectId.isValid(termino);
        if(esMongoId){
            const producto = await Producto.findById(termino).populate('categoria', 'nombre');
            return res.json({
                results: (producto) ? [producto] : []
            })
        }

        const regex = new RegExp(termino, 'i');
        
        const productos = await Producto.find({nombre: regex, estado: true})
                                        .populate('categoria', 'nombre');
        res.json({
            results: productos
        })
    }
    
    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            ok: false,
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas.join(', ')}`
        });
    }
    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'se le olvido hacer esta busqueda'
            })
    }
    
    // res.json({
    //     coleccion,
    //     termino
    // })
}

module.exports = {
    buscar
}