const {Schema,model} = require('mongoose');

const capacitacionSchema = new Schema({
    titulo: String,
    urlVideo: String,
    descripcion: String,
},{
    timestamps: true
})

module.exports = model('capacitacion',capacitacionSchema);