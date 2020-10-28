const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {subirImagen,getServicio,getServicios,createServicio,editServicio,deleteServicio,editPaquetesServicios} = require('../controllers/servicios');

router.route('/')
    .get(getServicios)
    .post(auth,subirImagen,createServicio);

router.route('/:idServicio')
    .get(getServicio)
    .put(auth,subirImagen,editServicio)
    .delete(auth,deleteServicio);

router.route('/paquetes/:idServicio').put(auth,editPaquetesServicios);

module.exports = router;