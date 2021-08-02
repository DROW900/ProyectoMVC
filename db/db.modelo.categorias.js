const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');

//Se define el modelo de los poductos que se va a utilizar
class Categorias extends Model{}

Categorias.init(
    {
        //Se definen los campos del modelo
        nombre: {type: DataTypes.STRING(50), allowNull:false},
        descripcion: {type: DataTypes.STRING(150), allowNull:false},
        status: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize: sequelize,
        modelName: 'categorias',
        timestamps: true
    });

module.exports = Categorias;