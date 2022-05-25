const {Categoria} = require('../models')

// obtener categorias - paginado - total de registros - populate 
const obtenerCategorias = async(req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {estado: true};
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .limit(Number(limit))
            .skip(Number(from))
            .populate('usuario', 'name')
    ])
    
    res.json({
        total,
        categorias
    })
}

// obtener categoria  - populate {}
const obtenerCategoria = async(req, res) => {
    const categoria = await Categoria.findById(req.params.id)
        .populate('usuario', 'name');
    res.json(categoria);
}

const crearCategoria = async(req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        });
    }

    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    // guardar db
    await categoria.save();

    res.json(categoria)
}

// actualizar categoria
const actualizarCategoria = async(req, res) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json(categoria);
}

// eliminar categoria - estado: false
const eliminarCategoria = async(req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(`Categoria ${categoria.nombre} eliminada`);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}