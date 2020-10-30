const userCtrl = {};
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const imagen = require('../middleware/awsImagen');

userCtrl.subirImagen = async (req, res, next) => {
	await imagen.upload(req, res, function(err) {
		if (err) {
			res.status(500).json({ message: "error al subir imagen" });
		}else{
            return next();
        }
	});
};


userCtrl.login = async (req ,res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await userModel.findOne({ email });

        if(!user){
            res.status(404).json({ message: 'Este usuario no existe' });
        }else{
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(404).json({ message: 'Contraseña incorrecta' });
            } else {
                const token = jwt.sign(
                    {
                        email: user.email,
                        nombre: user.nombre,
                        _id: user._id,
                        imagen: user.imagen,
                        rol: user.rol,
                    },
                    process.env.AUTH_KEY
                );
                //token
                res.json({ token });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error en el servidor', err });
    }
}

userCtrl.getUsers = async (req,res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error en el servidor', err });  
    }
}

userCtrl.createUser = (req,res) => {
    try {
        const { password,repeatPassword } = req.body;
        const newUser = new userModel(req.body);
        newUser.rol = 'User';
        console.log(newUser);
        console.log(password);
        console.log(repeatPassword);
        if(req.file){
            newUser.imagen = req.file.key;
        }
        
        if(!password || !repeatPassword){
            res.status(404).json({ message: 'Las contrasenas son obligatorias' });
        }else{
            if(password !== repeatPassword){
                res.status(404).json({ message: 'Las contrasenas no son iguales' });
            }else{
                bcrypt.hash(password,null,null, async function (err,hash){
                    if(err){
                        res.status(500).json({ message: 'Error al encriptar la contrasena', err });
                    }else{
                        newUser.password = hash;
                        await newUser.save((err,useStored) => {
                            if(err){
                                res.status(500).json({ message: 'Ups, algo paso al registrar el usuario', err });
                            }else{
                                if(!useStored){
                                    res.status(404).json({ message: 'Error al crear el usuario' });
                                }else{
                                    const token = jwt.sign(
                                        {
                                            email: newUser.email,
                                            nombre: newUser.nombre,
                                            _id: newUser._id,
                                            imagen: newUser.imagen,
                                            rol: newUser.rol,
                                        },
                                        process.env.AUTH_KEY
                                    );
									res.json({ token });
                                }
                            }
                        })
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}

userCtrl.createAdmin = (req,res) => {
    try {
        const { password,repeatPassword } = req.body;
        const newUser = new userModel(req.body);
        newUser.rol = 'Admin';
        if(req.file){
            newUser.imagen = req.file.key;
        }
        
        if(!password || !repeatPassword){
            res.status(404).json({ message: 'Las contrasenas son obligatorias' });
        }else{
            if(password !== repeatPassword){
                res.status(404).json({ message: 'Las contrasenas no son iguales' });
            }else{
                bcrypt.hash(password,null,null, async function (err,hash){
                    if(err){
                        res.status(500).json({ message: 'Error al encriptar la contrasena', err });
                    }else{
                        newUser.password = hash;
                        await newUser.save((err,useStored) => {
                            if(err){
                                res.status(500).json({ message: 'Ups, algo paso al registrar el usuario', err });
                            }else{
                                if(!useStored){
                                    res.status(404).json({ message: 'Error al crear el usuario' });
                                }else{
                                    const token = jwt.sign(
                                        {
                                            email: newUser.email,
                                            nombre: newUser.nombre,
                                            _id: newUser._id,
                                            imagen: newUser.imagen,
                                            rol: newUser.rol,
                                        },
                                        process.env.AUTH_KEY
                                    );
									res.json({ token });
                                }
                            }
                        })
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor', error });   
    }
}


module.exports = userCtrl;