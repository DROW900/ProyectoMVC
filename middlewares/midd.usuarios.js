const controladorUsuarios = require('../app/controladores/controlador.usuarios')

module.exports.usuarioValido = async (req,res,next)=>{
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = await controladorUsuarios.verificacionUsuario(token)
            console.log(verificado)
            req.params.usuario = verificado.data
            return next()
        }else{
            throw new Error ('Este es un sistema seguro y requiere autorización')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}

module.exports.verificarPermisos = async (req,res, next) =>{
    try {
        if(req.params.tipoRol == 1){
            return next()
        }else{
            throw new Error('Error: Acceso Denegado')
        }
    } catch (error) {
        console.log(error)
        res.status(403).json('Error: Acceso Denegado')
    }
}

