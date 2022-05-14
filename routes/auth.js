const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('email','Email is required').isEmail(),
    check('password','Password is required').not().isEmpty(),
    validarCampos   
] ,login);

router.post('/google',[
    check('id_token','id_tokenof google is required ').not().isEmpty(),
    validarCampos   
] ,googleSignIn);



module.exports = router;