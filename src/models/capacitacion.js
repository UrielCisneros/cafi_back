const {Schema,model} = require('mongoose');
const mongoodePaginate = require('mongoose-paginate-v2');

const capacitacionSchema = new Schema({
    titulo: String,
    urlVideo: String,
    descripcion: String,
},{
    timestamps: true
});

capacitacionSchema.plugin(mongoodePaginate);

module.exports = model('capacitacion',capacitacionSchema);