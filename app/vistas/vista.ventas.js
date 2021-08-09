const controladorVentas = require('../controladores/controlador.ventas')

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
            const resultado = await controladorVentas.generarVenta(req.body);
            res.status(200).json(1); 
        } catch (error) {
            console.log(error)
            res.status(500).json('error')
        }
    })
}


