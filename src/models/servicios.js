const {Schema,model} = require('mongoose');

const serviciosSchema = new Schema({
    tipoDeServicios: String,
    banner: String,
    titulo: String,
    contenido: String,
    video: String,
    paquetes: [{
        nombrePaquete: String,
        beneficios: [{
            tipoBaneficio: String,
        }]
    }]
},{
    timestamps: true
});

module.exports = model('servicios',serviciosSchema);