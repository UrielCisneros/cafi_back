const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {subirImagen,getEmpresa,createEmpresa,editEmpresa} = require('../controllers/empresa');

router.route('/')
    .get(getEmpresa)
    .post(auth,subirImagen,createEmpresa)

router.route('/:idEmpresa').put(auth,subirImagen,editEmpresa)


module.exports = router;