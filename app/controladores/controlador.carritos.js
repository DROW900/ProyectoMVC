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

