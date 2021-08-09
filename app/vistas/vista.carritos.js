const controladorCarrito = require('../controladores/controlador.carritos')
const middUser = require('../../middlewares/midd.usuarios')

module.exports = async(app) =>{

    app.get('/vercarrito', async(req,res)=>{
        try {
            res.render("carrito")
        } catch (error) {
            res.status(500).json('Error al cargar la página')
        }
    })
    app.get('/carrito/:idUsuario', async(req,res)=>{
        try {
            let resultado = await controladorCarrito.listarProductos(req.params.idUsuario)
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.post('/carrito', middUser.usuarioValido, async (req,res)=>{
        try {
            let resultado = await controladorCarrito.agregarProducto(req.body);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.delete('/carrito/:idEnlace',middUser.usuarioValido ,async (req,res)=>{
        try {
            let resultado = await controladorCarrito.eliminarProducto(req.params.idEnlace);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.delete('/vaciarcarrito/:idUsuario',middUser.usuarioValido,async(req,res)=>{
        try {
            let resultado = await controladorCarrito.vaciarProductos(req.params.idUsuario);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json(error)
        }
    })
}