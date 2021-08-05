const modeloCategorias = require('../modelos/modelo.categorias')

module.exports.listarCategorias = async() =>{
    try {
        const resultado = await modeloCategorias.listarCategorias()
        return resultado;
    } catch (error) {
        console.log('Error del controlador: '+ error)
        throw new Error('Hubo un error desde el controlador de categorias')
    }
}

module.exports.registrarCategoria = async(datos) =>{
    try {
        const resultado = await modeloCategorias.registrarCategoria(datos)
        return resultado
    } catch (error) {
        console.log('Error desde el controlador')
        throw new Error(error)
    }
}