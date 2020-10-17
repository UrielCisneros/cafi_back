const {Schema,model} = require('mongoose');

const empresasSchema = new Schema({
    empresa: [{
        nombre: String,
        imagen: String,
        url: String,
    }]
},{
    timestamps: true
});

module.exports = model('empresas',empresasSchema);

