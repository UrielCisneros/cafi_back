const blogCtrl = {};
const imagen = require('../middleware/awsImagen');
const blogModel = require('../models/blog');

blogCtrl.subirImagen = async (req, res, next) => {
	await imagen.upload(req, res, function(err) {
		if (err) {
			res.status(500).json({ message: "error al subir imagen" });
		}else{
            return next();
        }
	});
};

blogCtrl.subirArchivo = async (req, res, next) => {
	await imagen.uploadFile(req, res, function(err) {
		if (err) {
			res.status(500).json({ message: "error al subir el archivo." });
		}else{
            return next();
        }
	});
};

blogCtrl.getBlogs = async (req,res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const options = {
            page,
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        }
       const blogs = await blogModel.paginate({}, options);
       res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

blogCtrl.createBlog = async (req,res) => {
    try {
        console.log(req.body);
        const newBlog = new blogModel(req.body);
        if(req.file){
            newBlog.imagen = req.file.key;
        }

        await newBlog.save();
        res.status(200).json({message: 'Blog registrado'});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

blogCtrl.editBlog = async (req,res) => {
    try {
        const blogBase = await blogModel.findById(req.params.idBlog);
        const newBlog = req.body;
        if(req.file){
            newBlog.imagen = req.file.key;
            if(blogBase.imagen){
                await imagen.eliminarImagen(blogBase.imagen);
            }
        }else{
            newBlog.imagen = blogBase.imagen;
        }

        await blogModel.findByIdAndUpdate(req.params.idBlog,newBlog);
        res.status(200).json({message: "Blog actualizado"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

blogCtrl.deleteBlog = async (req,res) => {

}

blogCtrl.createArchivoBlog = async (req,res) => {
    try {
        console.log(req.file);
        const archivo = req.file.key;
        const name = req.file.originalname;
        const extencion = name.split('.')

        await blogModel.updateOne({
            _id: req.params.idBlog
        },
        {
            $addToSet: {
                archivos: [{
                    archivo,
                    name,
                    extencion: extencion[extencion.length - 1]
                }]
            }
        },
         (err,response) => {
            if(err){
                res.status(500).json({ message: 'Algo paso al agregar el archivo, favor de vilver a intentar.', err });
            }else{
                if(!response){
                    res.status(404).json({ message: 'Error al guardar' });
                }else{
                    res.status(200).json({ message: 'Archivo guardado' });
                }
            }
        }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

blogCtrl.editArchivoBlog = async (req,res) => {
    try {
        const blogBase = await blogModel.findById(req.params.idBlog);
        const archivoBase = blogBase.archivos.filter((x) => x._id == req.params.idArchivo);

        const newArchivo = req.file.key;
        const name = req.file.originalname;
        const extencion = name.split('.');

        await blogBase.updateOne(
            {
                'archivos._id': req.params.idArchivo
            },
            {
                $set: {
                    'archivos.$': { archivo: newArchivo, name: name, extencion: extencion }
                }
            }
        )

        await imagen.eliminarImagen(archivoBase[0].archivo);
        res.status(200).json({ message: 'Archivo actualizado' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });  
    }
}

blogCtrl.deleteArchivoBlog = async (req,res) => {

}

blogCtrl.createCommentBlog = async (req,res) => {

}

blogCtrl.editCommentBlog = async (req,res) => {

}

blogCtrl.deleteCommentBlog = async (req,res) => {

}


module.exports = blogCtrl;