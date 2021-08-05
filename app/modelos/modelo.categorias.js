const Categorias = require('../../db/db.modelo.categorias')

module.exports.listarCategorias = async()=>{
    try {
        const array = [1]
        const resultado = await Categorias.findAll({where:{status: array[0]}})
        return resultado;
    } catch (error) {
        console.log('Error desde el modelo')
        throw new Error('No se pudieron encontrar los productos solicitados')
    }
}

module.exports.registrarCategoria = async(datos)=>{
    try {
        const datosIngreso = [datos.nombre, datos.descripcion, 1];
        const resultado = await Categorias.create({nombre:datosIngreso[0], descripcion:datosIngreso[1], status:datosIngreso[2]})
        return resultado
    } catch (error) {
        console.log('Ocurrió un error desde el modelo de categoria')
        throw new Error(error)
    }
}