const {DataTypes, Model} = require('sequelize');
const sequelize = require('./db.conexion');
const Ventas = require('./db.modelo.ventas')
const Productos = require('./db.modelo.productos')

class ProductosVenta extends Model{}

ProductosVenta.init(
    {
        precioproducto:{type: DataTypes.INTEGER, allowNull: false}
    },
    {
        sequelize,
        modelName: 'productosVentas',
        timestamps: true
    });
    Ventas.hasMany(ProductosVenta)
    Productos.hasMany(ProductosVenta)
    ProductosVenta.Ventas = ProductosVenta.belongsTo(Ventas);
    ProductosVenta.Productos = ProductosVenta.belongsTo(Productos);  

module.exports = ProductosVenta;