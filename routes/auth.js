const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('email','Email is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
    validarCampos   
] ,login);



module.exports = router;