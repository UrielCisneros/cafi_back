const express = require('express');
const cors = require('cors');

const app = express();

//settings
app.set('port', (process.env.PORT || 8000));
app.set('host', (process.env.HOST || 3000));

//Config CORS (Rutas de acceso) << Ver como dar seguriad con apps moviles >>
/* const whitelist = ['http://localhost:3000'];

const corsOptions = {
    origin: (origin,callback) => {
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe){
            callback(null,true);
        }else{
            callback(new Error('Este server no tiene acceso'));
        }
    }
} */

//middlewares
app.use(cors());
app.use(express.json());

//rutes

app.use('/api/login',require('./routes/user'));
app.use('/api/prueba',require('./routes/blog'));




/* app.use('/api/admin', require('./routes/administrador'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/pago', require('./routes/pagos'));
app.use('/api/cliente', require('./routes/cliente')); */


module.exports = app;
