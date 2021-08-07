const controladorCategorias = require('../controladores/controlador.categorias');
const controladorSubCategorias = require('../controladores/controlador.Subcategorias');
module.exports = async(app) => {
    app.get('/principal', async(req, res) => {
        try {

            let resultado = await controladorCategorias.listarCategorias();
            //let datosSubCat = await controladorSubCategorias.listarSubCategorias(1);
            res.render('principal', { categorias: resultado })
        } catch (error) {
            console.log('Error al cargar la vista')
            res.status(200).json('Error')
        }
    })
}