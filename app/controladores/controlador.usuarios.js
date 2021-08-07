const modeloUsuarios = require('../modelos/modelo.usuarios')
const jwt = require('jsonwebtoken')

module.exports.listarUsuarios = async() => {
    try {
        const resultado = await modeloUsuarios.listarUsuarios()
        return resultado
    } catch (error) {
        console.log('Error del controlador')
        throw new Error('Hubo un error desde el controlador')
    }
}
module.exports.listarUsuarioById = async(id) => {
    try {
        const resultado = await modeloUsuarios.listarUsuarioById(id)
        return resultado
    } catch (error) {
        console.log('Error del controlador')
        throw new Error('Hubo un error desde el controlador')
    }
}

module.exports.verificacionUsuario = async(token) => {
    const resultado = jwt.verify(token, process.env.SECRET_KEY)
    if (resultado) {
        return resultado
    } else {
        throw new Error('Token no valido!')
    }
}

module.exports.generaToken = async(data) => {
    const resultado = jwt.sign({
            data
        }, process.env.SECRET_KEY) //Tiempo maximo 15 minutos de validez
    return resultado
}

module.exports.validarUsuario = async(datos) => {
    try {
        const resultado = await modeloUsuarios.validarUsuario(datos)
        return resultado
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.registrarUsuario = async(datos) => {
    try {
        //Encriptar antes de enviar
        const resultado = await modeloUsuarios.registrarUsuario(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador')
        throw new Error('Hubo un error desde el controlador')
    }
}

module.exports.modificarUsuario = async(datos) => {
    try {
        //Encriptar antes de enviar
        const resultado = await modeloUsuarios.modificarUsuario(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador')
        throw new Error('Hubo un error desde el controlador')
    }
}

module.exports.eliminarUsuario = async(id) => {
    try {
        //Encriptar antes de enviar
        const resultado = await modeloUsuarios.eliminarUsuario(id)
        return resultado;
    } catch (error) {
        console.log('Error del controlador')
        throw new Error('Hubo un error desde el controlador')
    }
}