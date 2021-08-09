const modeloVentas = require('../modelos/modelo.ventas.js')

module.exports.generarVenta = async(datos) =>{
    try {
        const resultado = await modeloVentas.generarVenta(datos);
        return resultado
    } catch (error) {
        throw new Error(error);
    }
}