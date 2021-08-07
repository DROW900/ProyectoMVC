const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Productos = require('./db.modelo.productos');
const Usuarios = require('./db.modelo.usuarios')

class Carritos extends Model{}

Carritos.init(
    {
        
    },
    {
        sequelize,
        modelName: 'carrito',
        timestamps: true
    });

    Usuarios.hasMany(Carritos)
    Productos.hasMany(Carritos)

    Carritos.Usuarios = Carritos.belongsTo(Usuarios);  
    Carritos.Productos = Carritos.belongsTo(Productos);



module.exports = Carritos;