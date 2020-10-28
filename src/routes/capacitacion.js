const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {getCapacitaciones,createCapacitacion,editCapacitacion,deleteCapacitacion} = require('../controllers/capacitacion');
const { createBanner } = require('../controllers/banner');

router.route('/').get(getCapacitaciones).post(auth,createCapacitacion);

router.route('/:idCapacitacion').put(auth,editCapacitacion).delete(auth,deleteCapacitacion);

module.exports = router;