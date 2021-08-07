const controladorCategorias = require('../controladores/controlador.categorias')

module.exports = async(app) => {
    app.get('/categorias', async(req, res) => {
        try {
            let datos = await controladorCategorias.listarCategorias()
            res.status(200).json(datos)
        } catch (error) {
            console.log('Error desde el controlador de Categorias')
            res.status(500).json(error)
        }
    })

    app.post('/categorias', async(req, res) => {
        try {
            let resultado = await controladorCategorias.registrarCategoria(req.body)
            res.status(200).json(resultado)
        } catch (error) {
            console.log('Error desde las vistas de categoria')
            res.status(500).json({ mensaje: 'Error al crear la categoria' })
        }
    })
}