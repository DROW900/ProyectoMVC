const subCategorias = require('../../db/db.modelo.subCategorias')
module.exports.listarSubCategorias = async(id_cat) => {
    try {
        const array = [id_cat]
        const resultado = await subCategorias.findAll({ where: { categoriaId: array[0] } })
        return resultado;
    } catch (error) {
        console.log('Error desde el modelo')
        throw new Error('No se pudieron encontrar las subCategorias')
    }
}