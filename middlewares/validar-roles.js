

const esAdminRole = (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificaar el role son validar el token primero'
        });
    }
    
    const {role, nombre} = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({ 
            msg: 'You do not have permissions to access this resource' 
        });
    }
    next();
}

const tieneRol = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificaar el role son validar el token primero'
            })
        }
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `The service requires one of these roles: ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}