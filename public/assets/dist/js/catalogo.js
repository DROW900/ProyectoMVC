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

            dato += `<li><button class="dropdown-item">${datos[index].nombre}</button></li>`;

        }

        document.getElementById('ulSub').innerHTML = dato;


    }
}