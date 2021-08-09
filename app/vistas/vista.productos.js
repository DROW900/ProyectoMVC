const controladorProducto = require('../controladores/controlador.productos')
const midd = require('../../middlewares/midd.usuarios')

module.exports = async(app) => {
    app.get('/productos/:idSubCategoria', async(req, res) => {
        try {
            let data = await controladorProducto.listarProductos(req.params.idSubCategoria);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: producto')
        }
    })

    app.post('/productos', midd.usuarioValido, async(req, res) => {
        try {
            let data = await controladorProducto.crearProducto(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: producto')
        }
    })

    app.put('/productos', midd.usuarioValido, async(req, res) => {
        try {
            let data = await controladorProducto.actualizarProducto(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: producto')
        }
    })



    app.delete('/productos/:id', midd.usuarioValido, async(req, res) => {
        try {
            let data = await controladorProducto.eliminarProducto(req.params.id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: producto')
        }
    })
    app.get('/listar_productos/:tipo_rol', midd.usuarioValido, midd.verificarPermisos, async(req, res) => {
        try {

            res.send(true);
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: producto')
        }
    })
    app.get('/lista_de_productos', async(req, res) => {
        try {
            let resultados = await controladorProducto.obtenerProductosYdisponibilidad();
            //console.log(resultados);
            res.render('lista_productos', { productos: resultados });
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: producto')
        }
    })
}