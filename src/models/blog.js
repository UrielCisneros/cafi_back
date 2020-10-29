const {Schema,model} = require('mongoose');

const mongoodePaginate = require('mongoose-paginate-v2');

const blogModel = new Schema({
    nombre: String,
    autor: String,
    contenido: String,
    imagen: String,
    url: {
        type: String,
        unique: true
    },
    archivos: [{
        archivo: String
    }],
    comentarios: [{
        usuario: {
            type: Schema.ObjectId,
            ref: 'user'
        },
        comentario: String
    }]
},{
    timestamps: true
});

blogModel.plugin(mongoodePaginate)

module.exports = model('blog',blogModel);
