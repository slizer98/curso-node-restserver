
const usuariosGet =  (req, res) => {
    const {q, nombre='No name', page = 1, limit = 10} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        page,
        limit
    })
}

const usuariosPost = (req, res) => {
    const {nombre, edad } = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre, 
        edad
    })
}
const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.status(201).json({
        msg: 'put API - controlador',
        id
    })
}
const usuariosDelete = (req, res) => {
    res.status(201).json({
        msg: 'delete API - controlador'
    })
}
const usuariosPatch = (req, res) => {
    res.status(201).json({
        msg: 'patch API - controlador'
    })
}





module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}