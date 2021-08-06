class Usuario {
    constructor(email, password) {
        this.email = email
        this.password = password
    }
    async validarUsuario() {
        if (this.email == '' || this.password == '') {
            alert('Alguno de los campos está vacío')
            return
        }
        let resultado = await fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": this.email,
                "contrasenia": this.password
            })
        })
        let datos = await resultado.json();
        console.log(datos)
        this.token = datos.token;
        this.tipo_rol = datos.tipo_rol;
        if (this.token != undefined && this.tipo_rol == 1) {
            window.location.href = 'http://localhost:3000/admin_usuarios'
        } else if (this.token != undefined && this.tipo_rol == 2) {
            window.location.href = 'http://localhost:3000/principal'
        }

    }

    static async guardarUsuario(usuario) {
        localStorage.setItem('datosUsuario', JSON.stringify(usuario))
    }

    static async recuperarUsuario() {
        let resultado = await JSON.parse(localStorage.getItem('datosUsuario'))
        return resultado
    }

    static async listarUsuarios() {
        try {
            const usuario = await this.recuperarUsuario();
            let resultado = await fetch(`http://localhost:3000/usuarios/${usuario.rol}`, {
                method: 'get',
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
            })
            const resultadoJson = await resultado.json()
            console.log(resultadoJson)
            let datosTabla = ""
            for (let i = 0; i < resultadoJson.length; i++) {
                datosTabla += `<tr>
                                    <td>${resultadoJson[i].id}</td>
                                    <td>${resultadoJson[i].nombre}</td>
                                    <td>${resultadoJson[i].primerApellido}</td>
                                    <td>${resultadoJson[i].segundoApellido}</td>
                                    <td>${resultadoJson[i].email}</td>
                                    <td>${resultadoJson[i].telefono}</td>
                                    <td><a href='#'><img src= 'assets/images/edit.png'></a></td>
                                    <td><a href='#'><img src= 'assets/images/cross.png'></a></td>                        
                              </tr>`
            }
            document.getElementById('tbody').innerHTML = datosTabla;
        } catch (error) {
            alert('Acceso Denegado')
        }


    }

    static async ingresar() {

        const email = document.getElementById('inputEmail')
        const password = document.getElementById('inputPassword')
        const usuario = new Usuario(email.value, password.value);
        await usuario.validarUsuario();
        Usuario.guardarUsuario(usuario);



    }
    static async eliminar(id) {
        //localStorage.setItem('id', id)
        let usuario = await this.recuperarUsuario();
        let resultado = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'delete',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
        });
        location.reload();
    }


    static async mostrar_form() {
        window.location.href = 'http://localhost:3000/usuario_form'

    }
    static async primer_registro_form() {
        window.location.href = 'http://localhost:3000/usuario_comun_form'

    }
    static async registrar() {
        let usuario = await this.recuperarUsuario();
        let nombres = document.getElementById('nombre').value;
        let apellido1 = document.getElementById('pAp').value;
        let apellido2 = document.getElementById('sAp').value;
        let dir = document.getElementById('direccion').value;
        let tel = document.getElementById('telefono').value;
        let roleid = document.getElementById('roleid').value;
        let mail = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
        let tipo_rol = usuario.tipo_rol;

        const rawResponse = await fetch(`http://localhost:3000/admin_usuario_registrar/${tipo_rol}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
            body: JSON.stringify({
                nombre: nombres,
                primerApellido: apellido1,
                segundoApellido: apellido2,
                email: mail,
                status: 1,
                contrasenia: pass,
                direccion: dir,
                telefono: tel,
                roleId: roleid



            })
        });


    }
    static async primer_registro() {

        let nombres = document.getElementById('nombre').value;
        let apellido1 = document.getElementById('pAp').value;
        let apellido2 = document.getElementById('sAp').value;
        let dir = document.getElementById('direccion').value;
        let tel = document.getElementById('telefono').value;
        let mail = document.getElementById('email').value;
        let pass = document.getElementById('password').value;


        const rawResponse = await fetch(`http://localhost:3000/primer_registro`, {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${usuario.token}`
            },
            body: JSON.stringify({
                nombre: nombres,
                primerApellido: apellido1,
                segundoApellido: apellido2,
                email: mail,
                status: 1,
                contrasenia: pass,
                direccion: dir,
                telefono: tel,
                roleId: 2
            })
        });


    }
}