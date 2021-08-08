const modeloCarritos = require('../modelos/modelo.carritos.js');

module.exports.listarProductos = async(id) =>{
    try {
        let resultado = await modeloCarritos.listarProductos(id);
        return resultado;
    } catch (error) {
        console.log('Error desde el controlador')
        throw new Error(error)
    }
}

module.exports.agregarProducto = async(datos) =>{
    try {
        let resultado = await modeloCarritos.agregarProducto(datos);
        return resultado;
    } catch (error) {
        console.log('Error desde el controlador de Carrito')
        throw new Error(error)
    }
}

module.exports.eliminarProducto = async(idEnlace)=>{
    try {
        let resultado = await modeloCarritos.eliminarProducto(idEnlace)
        return resultado;
    } catch (error) {
        console.log('Error desde el controlador')
        throw new Error(error);
    }
}

module.exports.vaciarProductos = async(idUsuario)=>{
    try {
        let resultado = await modeloCarritos.vaciarProductos(idUsuario)
        return resultado;
    } catch (error) {
        console.log('Error desde el controlador')
        throw new Error(error);
    }
}
