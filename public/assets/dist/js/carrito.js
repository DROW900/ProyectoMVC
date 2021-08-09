class Carrito{   
    static async agregarProducto(idProducto){
        await this.validarUsuarioCarrito();
        const usuario = await Usuario.recuperarUsuario();      
        let resultado = await fetch(`http://localhost:3000/carrito/`, {
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
            body: JSON.stringify({
                idUsuario: usuario.id,
                idProducto: idProducto
            })
        })
        const resultadoDecode = await resultado.json()
        alert('¡Se ha agregado el producto correctamente!')
    }

    static async mostrarProductos(){
        const productosObtenidos = await this.obtenerProductos();
        console.log(productosObtenidos)
        if(productosObtenidos.length === 0){
            document.getElementById('productosCarrito').innerHTML = "<h3>Aún no haz agregado nada a tu carrito :C</h3>"
            document.getElementById('botonComprar').style.display = 'none'
            document.getElementById('botonVaciar').style.display = 'none'
        }else{
            let producto = ''
            for (let index = 0; index < productosObtenidos.length; index++) {
                producto += ` <div class="col"><div class="card shadow-sm" '><img src="${productosObtenidos[index].producto.url}" class="imagenes" id='img0 ' alt="Imagen Producto"><div class="card-body"><h3>${productosObtenidos[index].producto.nombre}</h3><p class="card-text">Precio: $${productosObtenidos[index].producto.precio}</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button  type="button" class="btn btn-sm btn-outline-secondary"><img src="./assets/images/anadir-al-carrito-1.png" alt=""></button><button type="button" class="btn btn-danger btn-sm btn-outline-secondary" value="${productosObtenidos[index].id}" onclick="Carrito.eliminarProducto(this.value)">Eliminar</button></div></div></div></div></div>`;
            }
            document.getElementById('productosCarrito').innerHTML = producto;
        }
    }

    static async obtenerProductos(){
        const usuario = await Usuario.recuperarUsuario();
        let datos = await fetch(`http://localhost:3000/carrito/${usuario.id}`, {
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
            },
        });
        let productos = await datos.json();
        return productos;       
    }

    static async eliminarProducto(idEnlace){
        const usuario = Usuario.recuperarUsuario();
        let datos = await fetch(`http://localhost:3000/carrito/${idEnlace}`, {
            method: 'delete',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
        });
        let resultado = await datos.json()
        location.reload()

    }

    static async vaciarCarrito(){
        const usuario = await Usuario.recuperarUsuario();
        let datos = await fetch(`http://localhost:3000/vaciarcarrito/${usuario.id}`, {
            method: 'delete',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
        });
        let resultado = await datos.json()
        location.reload()
    }

    static async validarUsuarioCarrito(){
        let usuario = await Usuario.recuperarUsuario();
        if(usuario != null){
            if(usuario.token != undefined){
                return true
            }else{
                alert('Ingresa Sesión para continuar');
                window.location.href = 'login'             
            }
        }else{
            alert('Inicia Sesión para conitinuar')
            window.location.href = 'login'
        }       
    }
}