const serviciosCtrl = {};
const imagen = require('../middleware/awsImagen');
const serviciosModel = require('../models/servicios');

serviciosCtrl.subirImagen = async (req,res,next) => {
    try {
        await imagen.upload(req,res, function (err){
            if (err) {
                res.status(500).json({ message: "error al subir imagen" });
            }else{
                return next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

serviciosCtrl.getServicios = async (req,res) => {
    try {
        const servicios = await serviciosModel.find({});
        res.status(200).json(servicios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}

serviciosCtrl.getServicio = async (req,res) => {
    try {
        const servicio = await serviciosModel.findById(req.params.idServicio);
        if(servicio){
            res.status(200).json(servicio)
        }else{
            res.status(404).json({ message: 'El servicio no existe' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}

serviciosCtrl.createServicio = async (req,res) => {
    try {
        console.log(req.body);
        const newServicio = new serviciosModel(req.body);
        if(req.file){
            newServicio.imagenBanner = req.file.key;
        }
        await newServicio.save();
        res.status(200).json({ message: 'Servicio registrado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}

serviciosCtrl.editServicio = async (req,res) => {
    try {
        const servicioBase = await serviciosModel.findById(req.params.idServicio);
        const newServicio = req.body;

        if(req.file){
            newServicio.imagenBanner = req.file.key;
            if(servicioBase.imagenBanner){
                await imagen.eliminarImagen(servicioBase.imagenBanner);
            }
        }else{
            newServicio.imagenBanner = servicioBase.imagenBanner;
        }
        await serviciosModel.findByIdAndUpdate(req.params.idServicio,newServicio);
        res.status(200).json({ message: 'Servicio actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}

serviciosCtrl.editPaquetesServicios = async (req,res) => {
    try {
        const {paquetes} = req.body;
        const servicioBase = await serviciosModel.findById(req.params.idServicio);
        const newServicio = servicioBase;
        console.log(paquetes);
        console.log(newServicio.paquetes);
        newServicio.paquetes = paquetes;
        await serviciosModel.findByIdAndUpdate(req.params.idServicio, newServicio);
        res.status(200).json({ message: 'Paquetes agregados' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

serviciosCtrl.deleteServicio = async (req,res) => {
    try {
        const eliminacionServicio = await serviciosModel.findById(req.params.idServicio);
        if(eliminacionServicio){
            if(eliminacionServicio.imagenBanner){
                await imagen.eliminarImagen(eliminacionServicio.imagenBanner);
            }
            await serviciosModel.findByIdAndDelete(req.params.idServicio);
            res.status(200).json({message: 'Servicio eliminado'});
        }else{
            res.status(404).json({message: 'Servicio no existe'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}



module.exports = serviciosCtrl;