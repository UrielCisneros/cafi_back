require('dotenv').config();
const app = require('./app');
require('./database');

//settings
app.set('port', (process.env.PORT || '0.0.0.0') );
app.set('host', (process.env.HOST || '0.0.0.0'));


async function main() {
    try {
        await app.listen(app.get('port'),app.get('host'), () => {
            console.log('Server on port ', app.get('port'));
        }); 
    } catch (error) {
        console.log(error);
    }

}


main();