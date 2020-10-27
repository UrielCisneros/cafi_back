const {Schema,model} = require('mongoose');

const empresasSchema = new Schema({
    nombre: String,
    imagen: String,
    url: String,
},{
    timestamps: true
});

module.exports = model('empresaCafi',empresasSchema);

