const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {validarCampos} = require('../middlewares/validar-campos');
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
              } = require('../controllers/usuarios');
              

router.get('/', usuariosGet);
router.post('/',[
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password must have more than 6 letters').isLength({min: 6}),
  check('email', 'The email is not valid').isEmail(),
  check('role', 'Role is not an allowed role').isIn(['USER_ROLE', 'ADMIN_ROLE']),
  validarCampos
], usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;