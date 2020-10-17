require('dotenv').config();
const app = require('./app');
require('./database');


async function main() {
    await app.listen(process.env.PORT || '0.0.0.0',process.env.HOST || '0.0.0.0', () => {
        console.log('Server on port ', process.env.PORT || '0.0.0.0');
    }); 
}


main();