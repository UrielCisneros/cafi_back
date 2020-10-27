const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {subirImagen,getEmpresas,createEmpresas,editEmpresas,deleteEmpresas} = require('../controllers/empresas');

router.route('/')
    .get(getEmpresas)
    .post(auth,subirImagen,createEmpresas)

router.route('/:idEmpresas').put(auth,subirImagen,editEmpresas).delete(auth,deleteEmpresas);


module.exports = router; 