const modeloRoles = require('../modelos/modelo.roles')

module.exports.registrarRol = async(datos) =>{
    try {
        const resultado = await modeloRoles.registrarRol(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: '+ error)
        throw new Error('Hubo un error desde el controlador')
    }
}