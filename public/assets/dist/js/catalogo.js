class Catalogo{

    static async obtenerCategorias(){
        let resultado = await fetch('http://localhost:4000/categorias',{
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json', 
            },
        })
        let datosObtenidos = await resultado.json();
        let aux = ''
        for(let index = 0; index < datosObtenidos.length;  index++){
            aux += `<li><button value="${datosObtenidos[index].id}" class="dropdown-item">${datosObtenidos[index].nombre}</button></li>`;
        }
        document.getElementById('ul').innerHTML = aux;
    }
}