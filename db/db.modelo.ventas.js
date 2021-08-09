const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Usuarios = require('./db.modelo.usuarios')

class Ventas extends Model{}

Ventas.init(
    {
        total:{type: DataTypes.INTEGER, allowNull: false},
        metodoPago:{type: DataTypes.STRING(50), allowNull: false}       
    },
    {
        sequelize,
        modelName: 'ventas',
        timestamps: true
    });
    Usuarios.hasMany(Ventas)
    Ventas.Usuarios = Ventas.belongsTo(Usuarios);  

module.exports = Ventas;