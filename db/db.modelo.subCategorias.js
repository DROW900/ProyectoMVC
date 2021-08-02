const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/db.conexion');
const Categorias = require('../db/db.modelo.categorias')

//
class SubCategorias extends Model{}

SubCategorias.init(
    {
        //Se definen los campos del modelo
        nombre: {type: DataTypes.STRING(50), allowNull:false},
        descripcion: {type: DataTypes.STRING(150), allowNull:false},
        status: {type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize: sequelize,
        modelName: 'subcategorias',
        timestamps: true
    });
SubCategorias.Categorias = SubCategorias.belongsTo(Categorias);

module.exports = SubCategorias;
