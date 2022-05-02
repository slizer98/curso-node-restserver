const {Schema, model} = require('mongoose');

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'role is required']
    }
});


module.exports = model('Role', RoleSchema);