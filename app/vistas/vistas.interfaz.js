module.exports = async (app) =>{
    app.get('/principal', async(req,res) => {
        //Hacer middleware para verificar tipo de usuario (poder)
        try {
            res.render("principal")
        } catch (error) {
            console.log(error)
            res.status(500).json('Error en renderizar la pagina principal')
        }        
    })
}