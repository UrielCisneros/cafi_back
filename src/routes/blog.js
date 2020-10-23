const { Router } = require('express');
const router = Router();

router.route('/uno').post(() => {
    console.log('si funciona');
})

router.route('/dos').get(() => {
    console.log('si funciona');
})


module.exports = router;