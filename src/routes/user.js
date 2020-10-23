const { Router } = require('express');
const router = Router();

const {login} = require('../controllers/user');

router.route('/login/').post(login);

router.route('/dos').get(() => {
    console.log('si funciona');
})


module.exports = router;