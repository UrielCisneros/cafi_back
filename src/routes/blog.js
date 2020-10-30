const { Router } = require('express');
const router = Router();
const { 
    subirImagen,
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
    .post(createBlog)
    .get(getBlogs);

router.route('/:idBlog')
    .put(editBlog)
    .delete(deleteBlog);

router.route('/archivos/:idBlog')
    .post(createArchivoBlog);

router.route('/archivos/:idBlog/edit/:idArchivo')
    .put(editArchivoBlog)
    .delete(deleteArchivoBlog);

router.route('/comentario/:idBlog/user/:idUser')
    .post(createCommentBlog);

router.route('/comentarios/:idBlog/comentario/:idComentario')
    .put(editCommentBlog)
    .delete(deleteCommentBlog);

module.exports = router;