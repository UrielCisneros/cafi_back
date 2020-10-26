const { Router } = require('express');
const router = Router();

const {login,getUsers,createUser,subirImagen} = require('../controllers/user');

router.route('/login/').post(login);

router.route('/')
    .get(getUsers)
    .post(subirImagen,createUser)


module.exports = router;