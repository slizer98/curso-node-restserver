
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRole, tieneRol} = require('../middlewares');

const { roleIsValid, emailExists, userExistsById } = require('../helpers/db-validators');
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.post('/',[
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The password must have more than 6 letters').isLength({min: 6}),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom(emailExists),
  // check('role', 'Role is not an allowed role').isIn(['USER_ROLE', 'ADMIN_ROLE']),
  check('role').custom(roleIsValid),
  validarCampos
], usuariosPost);

router.put('/:id',[
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(userExistsById),
  check('role').custom(roleIsValid),
  validarCampos
], usuariosPut);

router.delete('/:id',[
  validarJWT,
  // esAdminRole,
  tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'ID is not valid').isMongoId(),
  check('id').custom(userExistsById),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;