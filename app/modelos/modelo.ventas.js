const Ventas = require('../../db/db.modelo.ventas');
const ProductosVenta = require('../../db/db.modelo.productosVenta')

module.exports.generarVenta = async(datos) =>{
    try {
        const array =[datos.total,datos.metodo,datos.productos[0].usuarioId]
        const venta = await Ventas.create({total: array[0], metodoPago: array[1], usuarioId: array[2]})
        for(let i = 0; i < datos.productos.length ; i++){
            let aux = await ProductosVenta.create({ventaId: venta.id, productoId: datos.productos[i].productoId, precioproducto: datos.productos[i].producto.precio})
        }
        return  
    } catch (error) {
        throw new Error(error)
    }

}