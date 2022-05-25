const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        eliminarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {existeCategoria, existeProducto} = require('../helpers/validar-categoria'); 

const router = Router();

// {{url}}/api/categorias

// obtener todas las categorias - publico
router.get('/', obtenerProductos);
// obtener una categoria por id - publico
router.get('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);
// crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
    ], crearProducto);

// actualizar un registro por id - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

// eliminar un registro por id - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto);


module.exports = router;