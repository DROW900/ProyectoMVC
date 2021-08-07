const modeloSubCategorias = require('../modelos/modelo.subCategorias')
module.exports.listarSubCategorias = async(id_categoria) => {
    try {
        const resultado = await modeloSubCategorias.listarSubCategorias(id_categoria)
        return resultado;
    } catch (error) {
        console.log('Error del controlador: ' + error)
        throw new Error('Hubo un error desde el controlador de SubCategorias')
    }
}