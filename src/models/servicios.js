const {Schema,model} = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);

const serviciosSchema = new Schema({
    tipoDeServicios: String,
    banner: String,
    titulo: String,
    contenido: String,
    video: String,
    paquetes: [{
        nombrePaquete: String,
        precio: {
            type: Float
        },
        beneficios: [{
            tipoBaneficio: String,
        }]
    }]
},{
    timestamps: true
});

module.exports = model('servicios',serviciosSchema);