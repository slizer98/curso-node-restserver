const mongoose = require('mongoose');

const dbconection = async() => {
    try{

        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database is connected');

    }catch(error){
        console.log(err);
        throw new Error('Error to connect to database');
    }
}


module.exports = {
    dbconection
}