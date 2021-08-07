const controladorSubCategorias = require('../controladores//controlador.subCategorias');

module.exports = async(app) => {
    app.get('/subCategorias/:id_categoria', async(req, res) => {
        try {
            let datos = await controladorSubCategorias.listarSubCategorias(req.params.id_categoria)
            res.status(200).send(datos);
        } catch (error) {
            console.log('Error desde el controlador de SubCategorias')
            res.status(500).json(error)
        }
    })


}