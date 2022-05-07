
const {Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        unique: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        requered: true,
        emun: ['USER_ROLE', 'ADMIN_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    // cambiar _id a uid
    user.uid = _id;
    
    return user;
}


module.exports = model('Usuario', UsuarioSchema);