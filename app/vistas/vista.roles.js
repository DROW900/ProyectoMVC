const controladorRoles = require('../controladores/controlador.roles')


module.exports = async (app) =>{
    app.post('/rol', async(req,res) => {
        try {
            let data = await controladorRoles.registrarRol(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: rol')
        }
    })
}