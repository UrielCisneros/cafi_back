const blogCtrl = {};
const imagen = require('../middleware/awsImagen');
const blogModel = require('../models/blog');

blogCtrl.subirImagen = async (req, res, next) => {
	await imagen.upload(req, res, function(err) {
		if (err) {
			res.json({ message: err });
		}
		return next();
	});
};

blogCtrl.getBlogs = async (req,res) => {
    try {
        const blogs = await blogModel.find({})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error }); 
    }
}

blogCtrl.createBlog = async (req,res) => {

}

blogCtrl.editBlog = async (req,res) => {

}

blogCtrl.deleteBlog = async (req,res) => {

}

blogCtrl.createArchivoBlog = async (req,res) => {

}

blogCtrl.editArchivoBlog = async (req,res) => {

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