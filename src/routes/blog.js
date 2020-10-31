const { Router } = require('express');
const router = Router();
const { 
    subirImagen,
    subirArchivo,
    createBlog,
    editBlog,
    deleteBlog,
    getBlogs,
    createArchivoBlog,
    editArchivoBlog,
    deleteArchivoBlog,
    createCommentBlog,
    editCommentBlog,
    deleteCommentBlog,
} = require('../controllers/blog');

router.route('/')
    .post(subirImagen,createBlog)
    .get(getBlogs);

router.route('/:idBlog')
    .put(subirImagen,editBlog)
    .delete(deleteBlog);

router.route('/archivos/:idBlog')
    .post(subirArchivo,createArchivoBlog);

router.route('/archivos/:idBlog/file/:idArchivo')
    .put(subirArchivo,editArchivoBlog)
    .delete(deleteArchivoBlog);

router.route('/comentario/:idBlog/user/:idUser')
    .post(createCommentBlog);

router.route('/comentarios/:idBlog/comentario/:idComentario')
    .put(editCommentBlog)
    .delete(deleteCommentBlog);

module.exports = router;