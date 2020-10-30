const empresasCtrl = {};
const imagen = require('../middleware/awsImagen');
const empresasModel = require('../models/empresas');


empresasCtrl.subirImagen = async (req, res, next) => {
	await imagen.upload(req, res, function(err) {
		if (err) {
			res.status(500).json({ message: "error al subir imagen" });
		}else{
            return next();
        }
	});
};

empresasCtrl.getEmpresas = async (req,res) => {
    try {
		const empresas = await empresasModel.find({});
		res.status(200).json(empresas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

empresasCtrl.createEmpresas = async (req,res) => {
	try {
		const newEmpresa = new empresasModel(req.body);
		if(req.file){
			newEmpresa.imagen = req.file.key;
		}
		await newEmpresa.save();
		res.status(200).json({ message: 'Empresa registrada' });
	} catch (error) {
		console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
	}
}

empresasCtrl.editEmpresas = async (req,res) => {
	try {
		const empresaBase = await empresasModel.findById(req.params.idEmpresas);
		const newEmpresa = req.body;

		if(req.file){
			newEmpresa.imagen = req.file.key;
			if(empresaBase.imagen){
				await imagen.eliminarImagen(empresaBase.imagen);
			}
		}else{
			newEmpresa.imagen = empresaBase.imagen;
		}

		await empresasModel.findByIdAndUpdate(req.params.idEmpresas,newEmpresa);
		res.status(200).json({ message: 'Empresa actualizada' });

	} catch (error) {
		console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
	}
}

empresasCtrl.deleteEmpresas = async (req,res) => {
	try {
		const empresaDelete = await empresasModel.findById(req.params.idEmpresas);
		if(empresaDelete.imagen && empresaDelete.imagen != null || empresaDelete.imagen != '' ){
			await imagen.eliminarImagen(empresaDelete.imagen);
		}
		await empresasModel.findByIdAndDelete(req.params.idEmpresas);
		res.status(200).json({ message: 'Eliminado correctamente' });
	} catch (error) {
		console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
	}
}


module.exports = empresasCtrl;