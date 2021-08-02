const Roles = require('../../db/db.modelo.roles')

module.exports.registrarRol = async(datos)=>{
    try {
        let nuevoRol = [
            datos.nombre, 
            datos.descripcion, 
            datos.tipo_rol,
            1
        ]
        console.log(nuevoRol)
        const rol = await Roles.build({nombre:`${nuevoRol[0]}`, descripcion: `${nuevoRol[1]}`, tipo_rol: `${nuevoRol[2]}`, status:1})
        await rol.save();
        return rol
    } catch (error) {
        console.log('Error desde el modelo de rol')
        throw new Error(error)
    }
}