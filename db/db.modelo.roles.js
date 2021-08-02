const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

class Roles extends Model{}

Roles.init(
    {
        //Se definen los campos del modelo
        nombre: {type: DataTypes.STRING(50), allowNull:false},
        descripcion: {type: DataTypes.STRING(150), allowNull:false},
        tipo_rol: {type: DataTypes.INTEGER, allowNull:false }, //1 admin, 2 usuario comun
        status: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize: sequelize,
        modelName: 'roles',
        timestamps: true
    });

module.exports = Roles;