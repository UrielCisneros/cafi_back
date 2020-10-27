const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {login,getUsers,createUser,subirImagen} = require('../controllers/user');

router.route('/login/').post(login);

router.route('/')
    .get(auth,getUsers)
    .post(auth,subirImagen,createUser)


module.exports = router;