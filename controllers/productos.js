const {Producto} = require('../models')

// obtener categorias - paginado - total de registros - populate 
const obtenerProductos = async(req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'name')
            .populate('categoria', 'nombre')
            .limit(Number(limit))
            .skip(Number(from))
    ])
    
    res.json({
        total,
        productos
    })
}

// obtener categoria  - populate {}
const obtenerProducto = async(req, res) => {
    const producto = await Producto.findById(req.params.id)
        .populate('usuario', 'name')
        .populate('categoria', 'nombre');
    res.json(producto);
}

const crearProducto = async(req, res) => {
    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if(productoDB) {
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        });
    }

    // generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    // guardar db
    await producto.save();

    res.json(producto)
}

// actualizar categoria
const actualizarProducto = async(req, res) => {
    const { id } = req.params;
    const {estado, usuario, ...data} = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    res.json(producto);
}

// eliminar producto - estado: false
const eliminarProducto = async(req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.json(`Producto ${producto.nombre} eliminada`);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}