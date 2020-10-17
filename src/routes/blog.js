const { Router } = require('express');
const router = Router();

router.route('/uno').post(() => {
    console.log('si funciona');
})


module.exports = router;