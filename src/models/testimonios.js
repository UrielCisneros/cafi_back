const {Schema,model} = require('mongoose');

const testimoniosSchema = new Schema({
    testimonios: [{
        imagen: String,
        video: String,
    }]
},{
    timestamps:true
});

module.exports = model('testimonios',testimoniosSchema);

