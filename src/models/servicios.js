const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);

const serviciosSchema = new mongoose.Schema({
    tipoDeServicios: String,
    imagenBanner: String,
    titulo: String,
    contenido: String,
    video: String,
    paquetes: [{
        nombrePaquete: String,
        precio: {
            type: Float
        },
        beneficios: [{
            tipoBeneficio: String,
        }]
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('servicios',serviciosSchema);