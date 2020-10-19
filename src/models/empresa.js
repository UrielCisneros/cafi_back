const {Schema, model} = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose,4);

const empresaSchema = new Schema({
    nombre: String,
    telefono: String,
    logo: String,
    quienesSomos: String,
    politicas: String,
    ubicacion: {
        lat: String,
        lng: String,
    },
    facebook: String,
    instagram: String,
    youtube: String,
    whatsapp: String,
    numeroDeClientes: String,
    urlVideoPromocional: String,
    correo: String,
    paquetes: [{
        nombrePaquete: String,
        precio: {
            type: Float
        },
        beneficios: [{
            tipoBaneficio: String,
        }]
    }],
},{
    timestamps: true
})

module.exports = model('empresa',empresaSchema);