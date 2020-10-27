const empresaCtrl = {};
const imagen = require('../middleware/awsImagen');
const empresa = require('../models/empresa');
const empresaModel = require('../models/empresa');

empresaCtrl.subirImagen = async (req, res, next) => {
	await imagen.upload(req, res, function(err) {
		if (err) {
			res.json({ message: err });
		}
		return next();
	});
};

empresaCtrl.createEmpresa = async (req,res) => {
    try {
        const newEmpresa = new empresaModel(req.body);
        if(req.file){
            newEmpresa.logo = req.file.key;
        }

        await newEmpresa.save((err,useStored) => {
            if(err){
                res.status(500).json({ message: 'Ups, algo paso al registrar el usuario', error });
            }else{
                if(!useStored){
                    res.status(404).json({ message: 'Error al crear el usuario' });
                }else{
                    res.status(200).json({ message: 'Empresa registrada' });
                }
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

empresaCtrl.editPaquetes = async (req,res) => {
    try {
        const {paquetes, ubicacion} = req.body;
        console.log(paquetes);
        const empresaBase = await empresaModel.findById(req.params.idEmpresa);
        const editEmpresa = empresaBase;
        editEmpresa.paquetes = paquetes;
        editEmpresa.ubicacion = ubicacion;
        await empresaModel.findByIdAndUpdate(req.params.idEmpresa, editEmpresa);
        res.status(200).json({ message: 'Paquetes agregados' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

empresaCtrl.editEmpresa = async (req,res) => {
    try {
        const empresaBase = await empresaModel.findById(req.params.idEmpresa)
        const newEmpresa = req.body;
        if(req.file){
            newEmpresa.logo = req.file.key;
            if(empresaBase.logo){
                await imagen.eliminarImagen(empresaBase.logo);
            }
        }else{
            newEmpresa.logo = empresaBase.logo;
        }
        await empresaModel.findByIdAndUpdate(req.params.idEmpresa,newEmpresa);
        res.status(200).json({ message: 'Empresa editada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

empresaCtrl.getEmpresa = async (req,res) => {
    try {
        const epresa = await empresaModel.find({});
        if(empresa.length){
            res.status(200).json(epresa[0])
        }else{
            res.status(200).json(epresa)
        }
    } catch (eror) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

module.exports = empresaCtrl;