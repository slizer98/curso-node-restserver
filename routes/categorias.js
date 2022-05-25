const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {existeCategoria} = require('../helpers/validar-categoria'); 

const router = Router();

// {{url}}/api/categorias

// obtener todas las categorias - publico
router.get('/', obtenerCategorias);
// obtener una categoria por id - publico
router.get('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);
// crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria);

// actualizar un registro por id - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

// eliminar un registro por id - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], eliminarCategoria);


module.exports = router;