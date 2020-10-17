const {Schema, model} = require('mongoose');

const bannerSchema = new Schema({
    imagen: [{
        imagen: String,
        titulo: String,
        subTitulo: String,
        redireccion: String
    }]
},{
    timestamps:true
});

module.exports = model('banner',bannerSchema);