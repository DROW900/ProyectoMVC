
module.exports = async(app)=>{
    app.get('/principal', async(req,res)=>{
        try {
            res.render("principal")
        } catch (error) {
            console.log('Error al cargar la vista')
            res.status(200).json('Error')
        }
    })
}