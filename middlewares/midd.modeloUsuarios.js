const Joi = require('joi')

module.exports = {

    crearUsuarioComun: Joi.object().keys({
        nombre: Joi.string().max(50).required(),
        primerApellido: Joi.string().max(50).required(),
        segundoApellido: Joi.string().max(50).required(),
        email: Joi.string().email().max(50).required(),
        status: Joi.number().integer().required(),
        contrasenia: Joi.string().min(10).required(),
        direccion: Joi.string().max(50).required(),
        telefono: Joi.string().min(10).max(12).required(),
        roleId: Joi.number().integer()

    })
}