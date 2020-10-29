const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {login,getUsers,createUser,subirImagen,createAdmin} = require('../controllers/user');

router.route('/login/').post(login);

router.route('/')
    .get(auth,getUsers)
    .post(subirImagen,createUser);

router.route('/admin/').post(auth,subirImagen,createAdmin);


module.exports = router;