const controladorCarrito = require('../controladores/controlador.carritos')

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

    app.post('/carrito', async (req,res)=>{
        try {
            let resultado = await controladorCarrito.agregarProducto(req.body);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json(error)
        }
    })
}