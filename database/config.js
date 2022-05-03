const mongoose = require('mongoose');

const dbconection = async() => {
    try{

        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

    }catch(error){
        throw new Error('Error to connect to database', error);
    }
}


module.exports = {
    dbconection
}