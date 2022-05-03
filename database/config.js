const mongoose = require('mongoose');

const dbconection = () => {
    try{

        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

    }catch(error){
        throw new Error('Error to connect to database', error);
    }
}


module.exports = {
    dbconection
}