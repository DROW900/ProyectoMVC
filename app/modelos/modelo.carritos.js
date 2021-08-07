const Usuarios = require('../../db/db.modelo.usuarios')
const Productos = require('../../db/db.modelo.productos');
const Carrito = require('../../db/db.modelo.carritos');
const Carritos = require('../../db/db.modelo.carritos');

module.exports.listarProductos = async(datos)=>{
    try {
        const productos = await Carrito.findAll({where:{usuarioId: datos}, include: Productos})
        console.log(productos)
        return productos;
    } catch (error) {
        console.log('Error desde el modelo' + error)
        throw new Error(error)
    }
}

module.exports.agregarProducto = async(datos)=>{
    try {
        let array = [datos.idUsuario, datos.idProducto]
        const resultado = await Carrito.create({usuarioId: array[0], productoId: array[1]})
        console.log(array)
        return resultado;
    } catch (error) {
        console.log('Error desde el modelo: ' + error)
        throw new Error(error)
    }

}