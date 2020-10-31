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
        console.log(req.file);
        if(req.file){
            newBanner.imagenBanner = req.file.key;
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
            editBanner.imagenBanner = req.file.key;
            if(bannerBase.imagenBanner){
                await imagen.eliminarImagen(bannerBase.imagenBanner);
            }
        }else{
            editBanner.imagenBanner = bannerBase.imagenBanner;
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
        if(bannerBase.imagenBanner && bannerBase.imagenBanner != null || bannerBase.imagenBanner != '' ){
			await imagen.eliminarImagen(bannerBase.imagenBanner);
		}
		await bannerModel.findByIdAndDelete(req.params.idBanner);
		res.status(200).json({ message: 'Eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}


module.exports = bannerCtrl;
