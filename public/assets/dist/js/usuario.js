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
            this.id = datos.id
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
        let roleid = 1;
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
    static async editar(id) {
        window.location.href = 'http://localhost:3000/usuario_admin_edit_form'

        console.log(id);
        localStorage.setItem('id_usuario', id);
        this.mostrar_form_edit();

    }
    static async mostrar_form_edit() {
        window.location.href = 'http://localhost:3000/usuario_admin_edit_form'
    }
    static async buscarInfo() {
        let usuario = await this.recuperarUsuario();
        console.log(usuario);
        let id = localStorage.getItem('id_usuario');
        console.log(id);
        const rawResponse = await fetch(`http://localhost:3000/usuario_by_id/${id}/${usuario.tipo_rol}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
        });
        let datos = await rawResponse.json();
        //console.log(datos);
        document.getElementById('id_usuario').value = datos.id;
        document.getElementById('nombre').value = datos.nombre;
        document.getElementById('pAp').value = datos.primerApellido;
        document.getElementById('sAp').value = datos.segundoApellido;
        document.getElementById('direccion').value = datos.direccion;
        document.getElementById('telefono').value = datos.telefono;
        document.getElementById('email').value = datos.email;
        document.getElementById('password').value = datos.contrasenia;


    }
    static async cerrarSesion() {
        localStorage.removeItem('datosUsuario')
        window.location.href = 'principal'
    }
    static async registrar_actualizacion_admin() {


        let usuario = await this.recuperarUsuario();
        let id_usuario = document.getElementById('id_usuario').value;
        let nombres = document.getElementById('nombre').value;
        let apellido1 = document.getElementById('pAp').value;
        let apellido2 = document.getElementById('sAp').value;
        let dir = document.getElementById('direccion').value;
        let tel = document.getElementById('telefono').value;
        let roleId = 1;
        let mail = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
        console.log(id_usuario);
        const rawResponse = await fetch(`http://localhost:3000/usuario/${usuario.tipo_rol}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json, text/plain, */*",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuario.token}`
            },
            body: JSON.stringify({
                id: id_usuario,
                nombre: nombres,
                primerApellido: apellido1,
                segundoApellido: apellido2,
                email: mail,
                status: 1,
                contrasenia: pass,
                direccion: dir,
                telefono: tel,
                roleId: roleId,

            })
        });

    }

    static async validarUsuarioCatalogo() {
        let Usuario = await this.recuperarUsuario();
        console.log(Usuario)
        if (Usuario != null) {
            if (Usuario.token != undefined) {
                console.log('Hola')
                document.getElementById('cerrarSesion').style.display = "block";
                document.getElementById('iniciarSesion').style.display = "none";
            } else {
                console.log('Hola')
                document.getElementById('cerrarSesion').style.display = "none";
                document.getElementById('iniciarSesion').style.display = "block";
            }
        } else {
            console.log('Hola')
            document.getElementById('cerrarSesion').style.display = "none";
            document.getElementById('iniciarSesion').style.display = "block";
        }
    }
}