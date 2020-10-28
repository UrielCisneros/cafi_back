const capacitacionCtrl = {};
const capacitacionModel = require('../models/capacitacion');

capacitacionCtrl.getCapacitaciones = async (req,res) => {
    try {
        const capacitaciones = await capacitacionModel.find({});
        res.status(200).json(capacitaciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

capacitacionCtrl.createCapacitacion = async (req,res) => {
    try {
        const newCapacitacion = new capacitacionModel(req.body);
        await newCapacitacion.save();
        res.status(200).json({ message: 'Empresa registrada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

capacitacionCtrl.editCapacitacion = async (req,res) => {
    try {
        await capacitacionModel.findByIdAndUpdate(req.params.idCapacitacion,req.body);
		res.status(200).json({ message: 'Capacitacion actualizada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

capacitacionCtrl.deleteCapacitacion = async (req,res) => {
    try {
        const eliminarCapacitacion = await capacitacionModel.findById(req.params.idCapacitacion);
        if(eliminarCapacitacion){
            await capacitacionModel.findByIdAndDelete(req.params.idCapacitacion);
            res.status(200).json({message: 'Capacitacion eliminada'});
        }else{
            res.status(404).json({message: 'Capacitacion no existe'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
} 


module.exports = capacitacionCtrl;