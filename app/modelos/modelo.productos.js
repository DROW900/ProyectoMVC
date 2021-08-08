const Productos = require('../../db/db.modelo.productos')

module.exports.listarProductos = async(idSubCategoria) => {
    try {
        const producto = [idSubCategoria, 1] //1 status
        let resultado = await Productos.findAll({ where: { subcategoriaId: producto[0], status: producto[1] } })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}

module.exports.crearProducto = async(data) => {
    try {
        const producto = [
            data.nombre,
            data.descripcion,
            data.precio,
            1, //Preguntar como controlar la disponibilidad
            1, //Status
            data.subcategoriaId
        ]
        let resultado = await Productos.create({ nombre: `${producto[0]}`, descripcion: `${producto[1]}`, precio: `${producto[2]}`, disponibilidad: `${producto[3]}`, status: `${producto[4]}`, subcategoriaId: `${producto[5]}` })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}

module.exports.actualizarProducto = async(data) => {
    try {
        const producto = [
            data.id,
            data.nombre,
            data.descripcion,
            data.precio,
            1, //Preguntar como controlar la disponibilidad
            data.status, //Status
            data.subcategoriaId
        ]
        let resultado = await Productos.update({ nombre: `${producto[1]}`, descripcion: `${producto[2]}`, precio: producto[3], disponibilidad: `${producto[4]}`, status: `${producto[5]}`, subcategoriaId: `${producto[6]}` }, {
            where: {
                id: producto[0]
            }
        })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}

module.exports.eliminarProducto = async(id) => {
    try {
        let producto = [id]
        const resultado = await Productos.update({ status: -1 }, {
            where: {
                id: producto[0]
            }
        })
        return resultado;
    } catch (error) {
        console.log('Error en el modelo')
        throw new Error(error)
    }
}