class Venta{

    static async mostrarProductos(){
        const productos = await Carrito.obtenerProductos();
        document.getElementById('cantidadProductos').innerHTML = productos.length
        let datos = '';
        let total = 0;
        for(let i = 0; i < productos.length; i++){
            datos += `<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class = "my-0">${productos[i].producto.nombre}</h6></div><span class="text-success">$${productos[i].producto.precio}</span></li>`
            total += productos[i].producto.precio
        }
        datos += `<li class="list-group-item d-flex justify-content-between"> <span>Total (MXN)</span><strong id="total">$${total}</strong></li>`
        document.getElementById('listaProductos').innerHTML = datos
    }

    static async validarDatos(){
        let nombre = document.getElementById('cc-name').value
        let tarjetaNumero = document.getElementById('cc-number').value
        let fecha = document.getElementById('cc-expiration').value
        let cvv = document.getElementById('cc-cvv').value
        if(nombre.length == 0){
            alert('Por favor, ingresa un nombre')
            return
        }
        if(tarjetaNumero == 0 || tarjetaNumero.length < 16 || !(/^\d{16}$/.test(tarjetaNumero))){
            alert('El número de tarjeta no es valido')
            return
        }
        if(fecha == null || !(/^\d{4}$/.test(fecha))){
            alert('La vigencia no es valida, recuerde que el formato es MMYY')
            return
        }
        if(cvv == null || !(/^\d{3}$/.test(cvv))){
            alert('El cvv ingrtesado no es correcto')
            return
        }
        await this.generarVenta();
    }

    static async generarVenta(){
        try {
            const carrito = await Carrito.obtenerProductos();
            let metodo
            if(document.getElementById('credit').checked){
                metodo = 'Tarjeta de Crédito'
            }else if(document.getElementById('debit').checked){
                metodo = 'Tarjeta de Débito'
            }else{
                alert('Seleccione un método de pago')
                return
            }
            let total = 0;
            for(let i = 0; i < carrito.length; i++){
                total += carrito[i].producto.precio;
            }
            const resultado = await fetch('http://localhost:3000/venta', {
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *//*",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "productos": carrito,
                    "total": total,
                    "metodo": metodo 
                })
            })
            let valor = await resultado.json()
            if(valor == 1){
                alert('Se realizó la compra correctamente')
                Carrito.vaciarCarrito();
            }           
        } catch (error) {
            alert('Ha ocurrido un error con el servidor' + error)
        }
       
    }
}