const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Usuarios = require('../db/db.modelo.usuarios');
const Productos = require('../db/db.modelo.productos');

class Carritos extends Model{}

Carritos.init(
    {
        status: {type: DataTypes.INTEGER, allowNull:false}
    },
    {
        sequelize: sequelize,
        modelName: 'carrito',
        timestamps: true
    });

Carritos.Usuarios = Carritos.belongsTo(Usuarios);
Carritos.Productos = Carritos.belongsTo(Productos);

module.exports = Carritos;