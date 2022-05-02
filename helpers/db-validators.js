const Role = require('../models/role');
const Usuario = require('../models/usuario');

const roleIsValid = async(role = '') => {

    const existsRole = await Role.findOne({role});
    if(!existsRole){
      throw new Error(`The role ${role} is not registred in the database`);
    }
}

const emailExists = async(email = '') => {
  const existsEmail = await Usuario.findOne({email});
    if(existsEmail) {
        throw new Error(`The email ${email} is already registred in the database`);
    }
}

const userExistsById = async(id) => {
  const existsUser = await Usuario.findById(id);
    if(!existsUser) {
        throw new Error(`The id ${id} doesn't exist `);
    }
}


module.exports = {
    roleIsValid,
    emailExists,
    userExistsById
}