
const express = require('express')
var cors = require('cors');
const { dbconection } = require('../database/config.js');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // conect to database
        this.conectDB();
        
        // Middlewares
        this.middlewares();

        // Routes of the aplication
        this.routes();
    }

    async conectDB(){
        await dbconection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());
        
        // directory for static files
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios.js'));
    }

    listen(){
        

        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`)
        });
    }
}

module.exports = Server;