const controladorUsuarios = require('../controladores/controlador.usuarios')
const midd = require('../../middlewares/midd.usuarios')

module.exports = async(app) => {
    app.get('/usuarios/:tipo_rol', midd.usuarioValido, midd.verificarPermisos, async(req, res) => {
        //Hacer middleware para verificar tipo de usuario (poder)
        try {
            let data = await controladorUsuarios.listarUsuario();
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Acceso denegado')
        }
    })

    app.get('/admin_usuarios', async(req, res) => {
        try {
            let data = await controladorUsuarios.listarUsuarios();

            res.render('usuarios', { usuarios: data });
        } catch (error) {
            console.log(error)
            res.status(500).json('Error al cargar vista Login')
        }
    })

    app.get('/login', async(req, res) => {
        try {

            res.render("login_demo")
        } catch (error) {
            console.log(error)
            res.status(500).json('Error al cargar vista Login')
        }
    })

    app.post('/login', async(req, res) => {
        try {
            let resultado = await controladorUsuarios.validarUsuario(req.body)
            if (resultado != undefined) {
                let validacion = await controladorUsuarios.generaToken(req.body)
                const datos = { tipo_rol: resultado, token: validacion }
                res.status(200).json(datos);
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Error al ingresar')
        }
    })

    app.post('/usuarios', /* midd.usuarioValido */ async(req, res) => {
        try {
            let data = await controladorUsuarios.registrarUsuario(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Usuarios')
        }
    })



    app.put('/usuarios', midd.usuarioValido, async(req, res) => {
        try {
            let data = await controladorUsuarios.modificarUsuario(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Usuarios')
        }
    })

    app.delete('/usuarios/:id', midd.usuarioValido, async(req, res) => {
        try {
            let data = await controladorUsuarios.eliminarUsuario(req.params.id);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Usuarios')
        }
    })

    app.get('/admin/usuario_form/:tipo_rol', midd.verificarPermisos, midd.validarUsuario, async(req, res) => {
        try {
            console.log('entre al end point');
            res.render('usuario_form');

        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Usuarios')
        }
    })

}