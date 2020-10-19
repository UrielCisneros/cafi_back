const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    
    
    const connection = mongoose.connection;
    
    connection.once('open', () => {
        console.log('database is connected');
    }); 
} catch (error) {
    console.log(error);
}

