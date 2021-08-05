//Importación de los módulos necesarios
const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors')
const midd = require('./middlewares/midd')
const sequelize = require('./db/db.conexion')
const Categorias = require('./db/db.modelo.categorias');
const SubCategorias = require('./db/db.modelo.subCategorias')
const Productos = require('./db/db.modelo.productos')
const Roles = require('./db/db.modelo.roles')
const Usuarios = require('./db/db.modelo.usuarios');
const Carritos = require('./db/db.modelo.carritos')
const vistaRoles = require('./app/vistas/vista.roles');
const vistaUsuarios = require('./app/vistas/vista.usuarios');
const vistaProductos = require('./app/vistas/vista.productos');
const vistaCategorias = require('./app/vistas/vista.categorias');
const vistaInterfaz = require('./app/vistas/vista.interfaz')
<<<<<<< HEAD
    //Middleware globales
=======

//Middleware globales
>>>>>>> 073e731b00bb9c566b8b9996bbdf169a4b630b7a
app.use(express.json())
app.use(cors())
    /* app.use(midd.limiter) */

//Configuraciones globales
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//Se levanta el servidor
async function inicioServer() {
    try {
        await Categorias.sync({ alter: true });
        await SubCategorias.sync({ alter: true });
        await Productos.sync({ alter: true });
        await Roles.sync({ alter: true });
        await Usuarios.sync({ alter: true });
        await Carritos.sync({ alter: true });

        console.log('Se sincronizaron los modelos correctamente')
        await sequelize.authenticate()
        console.log('Se autenticó correctamente la DB')
        app.listen(process.env.PORT, function() {
            console.log(`Servidor inicializado en http://${process.env.HOST}:${process.env.PORT}`)
        })
    } catch (error) {
        console.log('No se pudo conectar correctamente con la Base de datos', error)
    }
}

inicioServer();

//Rutas a llamar
vistaRoles(app)
vistaUsuarios(app)
vistaInterfaz(app)
vistaProductos(app)
vistaCategorias(app)