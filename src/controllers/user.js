const userCtrl = {};
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');


userCtrl.login = async (req ,res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(404).json({ message: 'Contraseña incorrecta' });
            next();
        } else {
            const token = jwt.sign(
                {
                    email: user.email,
                    nombre: user.nombre,
                    _id: user._id,
                    imagen: user.imagen,
                    rol: 'Admin'
                },
                process.env.AUTH_KEY
            );
            //token
            res.json({ token });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error en el servidor', err });
    }
}


module.exports = userCtrl;