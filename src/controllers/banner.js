const bannerCtrl = {};
const imagen = require('../middleware/awsImagen');
const bannerModel = require('../models/banner');

bannerCtrl.subirImagen = async (req, res, next) => {
	await imagen.upload(req, res, function(err) {
		if (err) {
			res.status(500).json({ message: "error al subir imagen" });
		}else{
            return next();
        }
	});
};

bannerCtrl.getBanners = async (req,res) => {
    try {
        const banner = await bannerModel.find({});
        res.status(200).json(banner);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

bannerCtrl.createBanner = async (req,res) => {
    try {
        const newBanner = new bannerModel(req.body);
        if(req.file){
            newBanner.imagen = req.file.key;
        }
        await newBanner.save();
        res.status(200).json({ message: 'Banner creado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

bannerCtrl.editBanner = async (req,res) => {
    try {
        const bannerBase = await bannerModel.findById(req.params.idBanner);
        const editBanner = req.body;
        if(req.file){
            editBanner.imagen = req.file.key;
            if(bannerBase.imagen){
                await imagen.eliminarImagen(bannerBase.imagen);
            }
        }else{
            editBanner.imagen = bannerBase.imagen;
        }
        await bannerModel.findByIdAndUpdate(req.params.idBanner,editBanner);
        res.status(200).json({ message: 'Banner actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

bannerCtrl.deleteBanner = async (req,res) => {
    try {
        const bannerBase = await bannerModel.findById(req.params.idBanner);
        if(bannerBase.imagen && bannerBase.imagen != null || bannerBase.imagen != '' ){
			await imagen.eliminarImagen(bannerBase.imagen);
		}
		await bannerModel.findByIdAndDelete(req.params.idBanner);
		res.status(200).json({ message: 'Eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}


module.exports = bannerCtrl;
