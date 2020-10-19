const {Schema,model} = require('mongoose');

const userModel = new Schema({
    nombre: String,
    email: String,
    rol: String,
    telefono: String,
    imagen: String,
},{
    timestamps: true
});

module.exports = model('user',userModel);
