const Usuarios = require('../../db/db.modelo.usuarios')
const Roles = require('../../db/db.modelo.roles')

module.exports.listarUsuarios = async() => {
    try {
        let resultado = await Usuarios.findAll({ where: { status: 1, roleId: 1 } })
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log("Error desde el modelo Usuario")
        throw new Error(error)
    }
}
module.exports.listarUsuarioById = async(id) => {
    try {
        let arr = [id]
        let resultado = await Usuarios.findByPk(arr[0])
            // console.log(resultado);
        return resultado;
    } catch (error) {
        console.log("Error desde el modelo Usuario")
        throw new Error(error)
    }
}
module.exports.validarUsuario = async(datos) => {
    try {
        let login = [datos.email, datos.contrasenia];
        let resultado = await Usuarios.findOne({ where: { email: login[0], contrasenia: login[1], status: 1 } })
        let tipoUsuario = await Roles.findByPk(resultado.roleId)
        const datosRegreso = [tipoUsuario.tipo_rol, resultado.id]
        console.log(datosRegreso)
        if (resultado != undefined) {
            return datosRegreso;
        }
    } catch (error) {
        console.log('Error desde el modelo')
        throw new Error(error)
    }
}

module.exports.registrarUsuario = async(datos) => {
    try {
        let nuevoUsuario = [
            datos.nombre,
            datos.primerApellido,
            datos.segundoApellido,
            datos.email,
            1,
            datos.contrasenia,
            datos.direccion,
            datos.telefono,
            datos.roleId
        ]
        const usuario = await Usuarios.create({ nombre: `${nuevoUsuario[0]}`, primerApellido: `${nuevoUsuario[1]}`, segundoApellido: `${nuevoUsuario[2]}`, email: `${nuevoUsuario[3]}`, status: `${nuevoUsuario[4]}`, contrasenia: `${nuevoUsuario[5]}`, direccion: `${nuevoUsuario[6]}`, telefono: `${nuevoUsuario[7]}`, roleId: `${nuevoUsuario[8]}` })
        return usuario
    } catch (error) {
        console.log('Error desde el modelo de usuarios ' + error)
        throw new Error(error)
    }
}

module.exports.modificarUsuario = async(datos) => {
    try {
        let nuevoUsuario = [
                datos.id,
                datos.nombre,
                datos.primerApellido,
                datos.segundoApellido,
                datos.email,
                1,
                datos.contrasenia,
                datos.direccion,
                datos.telefono,
                datos.roleId
            ]
            //console.log(nuevoUsuario);
        const resultado = await Usuarios.update({ nombre: `${nuevoUsuario[1]}`, primerApellido: `${nuevoUsuario[2]}`, segundoApellido: `${nuevoUsuario[3]}`, email: `${nuevoUsuario[4]}`, status: `${nuevoUsuario[5]}`, contrasenia: `${nuevoUsuario[6]}`, direccion: `${nuevoUsuario[7]}`, telefono: `${nuevoUsuario[8]}`, roleId: `${nuevoUsuario[9]}` }, {
            where: {
                id: nuevoUsuario[0]
            }
        })
        return resultado;
    } catch (error) {
        console.log('Error desde el modelo de usuarios')
        throw new Error(error)
    }
}

module.exports.eliminarUsuario = async(id) => {
    try {
        const resultado = await Usuarios.update({ status: -1 }, {
            where: {
                id: id
            }
        })
        return resultado;
    } catch (error) {
        console.log('Error en el modelo')
    }
}