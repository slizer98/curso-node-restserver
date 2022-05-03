const mongoose = require('mongoose');

const dbconection = async() => {
    try{

        mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => console.log('DB is connected'))
            .catch(err => console.log(err));

    }catch(error){
        console.log(error);
        throw new Error('Error to connect to database');
    }
}

module.exports = {
    dbconection
}