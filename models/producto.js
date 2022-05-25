const {Schema, model} = require('mongoose');

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {type: String},
    dispobible: {type: Boolean, default: true},
});

productoSchema.methods.toJSON = function() {
    const {__v,estado, ...data} = this.toObject();
    // cambiar _id a uid
    return data;
}


module.exports = model('Producto', productoSchema);