const modeloProducto = require('../modelos/modelo.productos')

module.exports.listarProductos = async(idSubCategoria) =>{
    try {
        const resultado = await modeloProducto.listarProductos(idSubCategoria)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: '+ error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}

module.exports.crearProducto = async(datos) =>{
    try {
        const resultado = await modeloProducto.crearProducto(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: '+ error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}

module.exports.actualizarProducto = async(datos) =>{
    try {
        const resultado = await modeloProducto.actualizarProducto(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: '+ error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}

module.exports.eliminarProducto = async(id) =>{
    try {
        const resultado = await modeloProducto.eliminarProducto(id)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: '+ error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}