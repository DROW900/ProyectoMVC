async function listar_productos() {
    const usuario = await Usuario.recuperarUsuario();

    let usuario_admin = await validar_usuario();
    let vista = await fetch(`http://localhost:3000/listar_productos/${usuario_admin.tipo_rol}`, {
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuario.token}`
        },
    });
    let_cargar = await vista.json();
    if (vista) {
        window.location.href = 'http://localhost:3000/lista_de_productos'

    } else {
        alert('No tienes permisos de visualizar la lista de productos');
    }


}

async function validar_usuario() {
    const usuario = await Usuario.recuperarUsuario();
    console.log(usuario);
    let resultado = await fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": usuario.email,
            "contrasenia": usuario.password
        })
    })
    let datos = await resultado.json();
    return datos;
}