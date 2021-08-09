const modeloProducto = require('../modelos/modelo.productos')

module.exports.listarProductos = async(idSubCategoria) => {
    try {
        const resultado = await modeloProducto.listarProductos(idSubCategoria)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}

module.exports.crearProducto = async(datos) => {
    try {
        const resultado = await modeloProducto.crearProducto(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}

module.exports.actualizarProducto = async(datos) => {
    try {
        const resultado = await modeloProducto.actualizarProducto(datos)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}

module.exports.eliminarProducto = async(id) => {
    try {
        const resultado = await modeloProducto.eliminarProducto(id)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}


module.exports.obtenerProductosYdisponibilidad = async() => {
    try {
        const productos = await modeloProducto.obtener_todos_productos_sin_repetir_codigo_barra();
        let stock = []
        for (let index = 0; index < productos.length; index++) {
            productos[index].stock = (await modeloProducto.obtenerDisponibilidad(productos[index].codigo_barra));
        }

        return productos;

    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}


module.exports.obtenerProductoByCodigoBarra = async(codigo_barra) => {
    try {
        const resultado = await modeloProducto.obtenerProductoByCodigoBarra(codigo_barra)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}
module.exports.obtenerProductosYdisponibilidadPorIdSubPrincipal = async(id_sub) => {
    try {
        const productos = await modeloProducto.obtenerProductosPorIdSubPrincipal(id_sub);
        let stock = []

        for (let index = 0; index < productos.length; index++) {
            productos[index].stock = (await modeloProducto.obtenerDisponibilidad(productos[index].codigo_barra));
        }
        for (let index = 0; index < productos.length; index++) {
            productos[index].id = (await modeloProducto.obtenerIdProductoPorCodigoBarra(productos[index].codigo_barra));
        }
        return productos;
        // console.log(productos[0].productos.id);

    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de productos')
    }
}