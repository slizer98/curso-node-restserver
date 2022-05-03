const mongoose = require('mongoose');

const dbconection = async() => {
    try{

        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('DB is connected');

    }catch(error){
        console.log(error);
        throw new Error('Error to connect to database', error);
    }
}


module.exports = {
    dbconection
}