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
        let resultado = await fetch('http://localhost:400/login', {
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
            window.location.href = 'http://localhost:400/admin_usuarios'
        } else if (this.token != undefined && this.tipo_rol == 2) {
            window.location.href = 'http://localhost:400/principal'
        }

    }

    static async guardarUsuario(usuario) {
        localStorage.setItem('datosUsuario', JSON.stringify(usuario))
    }

    static async recuperarUsuario() {
        let resultado = await JSON.parse(localStorage.getItem('datosUsuario'))
        return resultado
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
        let resultado = await fetch(`http://localhost:400/usuarios/${id}`, {
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
        window.location.href = 'http://localhost:400/usuario_form'

    }
    static async primer_registro_form() {
        window.location.href = 'http://localhost:400/usuario_comun_form'

    }
    static async registrar() {
        let usuario = await this.recuperarUsuario();
        let nombres = document.getElementById('nombre').value;
        let apellido1 = document.getElementById('pAp').value;
        let apellido2 = document.getElementById('sAp').value;
        let dir = document.getElementById('direccion').value;
        let tel = document.getElementById('telefono').value;
        let roleid = 1;
        let mail = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
        let tipo_rol = usuario.tipo_rol;

        const rawResponse = await fetch(`http://localhost:400/admin_usuario_registrar/${tipo_rol}`, {
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


        const rawResponse = await fetch(`http://localhost:400/primer_registro`, {
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
    static async editar(id) {
        await this.mostrar_form();
        document.getElementById('nombre').value = 'kevin';
        document.getElementById('pAp').value = 'alvarez';
        document.getElementById('sAp').value = 'ramirez';
        document.getElementById('direccion').value = 'una casa';
        document.getElementById('telefono').value = '58295076';
        document.getElementById('email').value = 'k@gmail.com';
        document.getElementById('password').value = 'k123';
    }
}