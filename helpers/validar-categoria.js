const Categoria = require('../models/categoria'); 
const Producto = require('../models/producto');

const existeCategoria = async(id) => {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
        throw new Error(`La categoria con el id ${id} no existe`);
    }
}
const existeProducto = async(id) => {
    const producto = await Producto.findById(id);
    if (!producto) {
        throw new Error(`El producto con el id ${id} no existe`);
    }
}

module.exports = {
    existeCategoria,
    existeProducto
}
