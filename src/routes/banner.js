const { Router } = require('express');
const auth = require('../middleware/auth');
const {getBanners,createBanner,editBanner,deleteBanner,subirImagen} = require('../controllers/banner');
const router = Router();

router.route('/')
    .get(getBanners)
    .post(auth,subirImagen,createBanner)

router.route('/:idBanner').put(auth,subirImagen,editBanner).delete(auth,deleteBanner)


module.exports = router;