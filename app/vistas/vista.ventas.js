/* const controladorVentas = require('../controladores/controlador.ventas') */

module.exports = async(app) =>{
    app.get('/realizarVenta', async(req,res)=>{
        try {
            res.render('checkout_demo')           
        } catch (error) {
            console.log('Error al renderizar la pantalla de cobro')
            res.status(500).json('Error')
        }
    })

    app.post('/venta', async(req, res)=>{
        try {
            console.log(req.body.productos)
        } catch (error) {
            console.log(error)
            res.status(500).json('error')
        }
    })
}


