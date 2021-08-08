class Catalogo {

    static async obtenerCategorias() {
        let resultado = await fetch('http://localhost:3000/categorias', {
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
            },
        })
        let datosObtenidos = await resultado.json();
        let aux = ''
        for (let index = 0; index < datosObtenidos.length; index++) {
            aux += `<li><button onclick="Catalogo.getSubCategorias(this.value)" value="${datosObtenidos[index].id}" class="dropdown-item">${datosObtenidos[index].nombre}</button></li>`;
        }
        document.getElementById('ulCat').innerHTML = aux;
    }

    static async getSubCategorias(id_cat) {
        let subCategorias = await fetch(`http://localhost:3000/subCategorias/${id_cat}`, {
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
            },
        });
        let datos = await subCategorias.json();
        // console.log(datos);

        let dato = ''
        for (let index = 0; index < datos.length; index++) {

            dato += `<li><button onclick=(Catalogo.obtenerProductos(this.value)) value="${datos[index].id}" class="dropdown-item">${datos[index].nombre}</button></li>`;

        }
        document.getElementById('ulSub').innerHTML = dato;


    }

    static async obtenerProductos(id_sub) {

        let datos = await fetch(`http://localhost:3000/productos/${id_sub}`, {
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
            },
        });
        let productos = await datos.json();
        console.log(productos);
        let producto = ''

        for (let index = 0; index < productos.length; index++) {
            producto += ` <div class="col"><div class="card shadow-sm" '><img src="${productos[0].url}" class="imagenes" id='img0 ' alt="error"><div class="card-body"><h3 >${productos[0].nombre}</h3><p class="card-text">$${productos[0].precio}</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button value="${productos[0].id}" onclick="agregarProd(this.value)" type="button" class="btn btn-sm btn-outline-secondary"><img src="./assets/images/anadir-al-carrito-1.png" alt=""></button><button type="button" class="btn btn-sm btn-outline-secondary">Edit</button></div> </div></div></div></div>`;

        }
        document.getElementById('productos').innerHTML = producto;

    }
}