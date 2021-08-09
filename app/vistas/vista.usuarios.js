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
    app.get('/usuario_by_id/:id/:tipo_rol', midd.usuarioValido, midd.verificarPermisos, async(req, res) => {
        //Hacer middleware para verificar tipo de usuario (poder)
        try {

            let data = await controladorUsuarios.listarUsuarioById(req.params.id);
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
                const datos = { tipo_rol: resultado[0], token: validacion, id: resultado[1] }
                res.status(200).json(datos);
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Error al ingresar')
        }
    })

    app.post('/admin_usuario_registrar/:tipo_rol', midd.usuarioValido, midd.verificarPermisos, async(req, res) => {
        try {
            console.log(req.body);
            let data = await controladorUsuarios.registrarUsuario(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })
    app.post('/primer_registro', midd.validacionesServidorParaUsuarios, async(req, res) => {
        try {
            console.log(req.body);
            let data = await controladorUsuarios.registrarUsuario(req.body);
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })

    app.get('/usuario_comun_form', async(req, res) => {
        try {

            res.render('usuario_comun_form');
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    })


    app.put('/usuario/:tipo_rol', midd.usuarioValido, midd.verificarPermisos, async(req, res) => {
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

    app.get('/usuario_form', async(req, res) => {
        try {
            res.render('usuario_form');

        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Usuarios')
        }
    })
    app.get('/usuario_admin_edit_form', async(req, res) => {
        try {
            res.render('usuario_admin_edit_form');
        } catch (error) {
            console.log(error)
            res.status(500).json('Error ruta: Usuarios')
        }
    })
}