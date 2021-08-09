const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db.conexion');
const SubCategorias = require('../db/db.modelo.subCategorias');
//Se define el modelo de los poductos que se va a utilizar
class Productos extends Model {}

Productos.init({
    //Se definen los campos del modelo
    codigo_barra: { type: DataTypes.STRING(150), allowNull: false },
    nombre: { type: DataTypes.STRING(50), allowNull: false },
    descripcion: { type: DataTypes.STRING(150), allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    disponibilidad: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },

}, {
    sequelize: sequelize,
    modelName: 'productos',
    timestamps: true
});

Productos.SubCategorias = Productos.belongsTo(SubCategorias);
module.exports = Productos;