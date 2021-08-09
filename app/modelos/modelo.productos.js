const Productos = require('../../db/db.modelo.productos')
const sequelize = require('sequelize');
const Op = sequelize.Op
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
            data.subcategoriaId,
            data.url
        ]
        let resultado = await Productos.create({ nombre: `${producto[0]}`, descripcion: `${producto[1]}`, precio: `${producto[2]}`, disponibilidad: `${producto[3]}`, status: `${producto[4]}`, subcategoriaId: `${producto[5]}`, url: `${producto[6]}` })
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
module.exports.obtenerProductosPorIdSubPrincipal = async() => {
    try {
        const producto = [1] //1 status
        let resultado = await Productos.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('codigo_barra')), 'codigo_barra'], 'nombre', 'precio', 'url', 'descripcion',
            ]


        }, { where: { status: producto[0] } })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}
module.exports.obtener_todos_productos_sin_repetir_codigo_barra = async() => {
    try {
        const producto = [1] //1 status
        let resultado = await Productos.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('codigo_barra')), 'codigo_barra'], 'nombre', 'precio', 'url', 'descripcion',
            ]


        }, { where: { status: producto[0] } })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}

module.exports.obtenerProductosYdisponibilidad_por_id_sub = async(id_subcategoria) => {
    try {
        const producto = [1, id_subcategoria] //1 status
        let resultado = await Productos.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('codigo_barra')), 'codigo_barra'], 'nombre', 'precio', 'url', 'descripcion',
            ]


        }, { where: { status: producto[0], subcategoriaId: producto[1] } })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}



module.exports.obtenerDisponibilidad = async(codigo_barra) => {
    try {
        console.log(codigo_barra);
        let producto = [codigo_barra]
        const { count, rows } = await Productos.findAndCountAll({
            where: {
                codigo_barra: {
                    [Op.like]: producto[0]
                },
                status: 1
            },

        });
        return count;
    } catch (error) {
        console.log('Error en el modelo')
        throw new Error(error)
    }


}

module.exports.obtenerProductoByCodigoBarra = async(codigo_barra) => {
    try {
        let producto = [1, codigo_barra]
        const resultado = await Productos.findOne({
            where: {
                codigo_barra: producto[1],
                status: producto[0]

            }
        })
        return resultado;
    } catch (error) {
        console.log('Error en el modelo')
        throw new Error(error)
    }


}

module.exports.obtenerIdProductoPorCodigoBarra = async(codigo_barra) => {
    try {
        const producto = [1, codigo_barra] //1 status
        let resultado = await Productos.findOne({
            attributes: ['id']


        }, { where: { status: producto[0], codigo_barra: producto[1] } })
        return resultado;
    } catch (error) {
        console.log('Ocurrio un error desde el modelo producto')
        throw new Error(error)
    }
}