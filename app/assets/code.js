
function alerta(){
    let a = 'Bienvenido'
    let x = 'Hola Juan Deseas ingresar'
    swal({
        title: a,
        text: x,
        icon:  'success',
        buttons: {
            NO:{
                value: "NO"
            },
            SI: {
                value: "SI",
            },
        }
    })
    .then((value) => {
        switch (value) {
            case "NO":
                swal('Ooo :0','HASTA PRONTO :)','error');
                break;
            
            case "SI":
                swal(';)','INGRESASTE CON EXITO','success');
                break;
            default:
                swal("HASTA PRONTO :)");
        }
    });
}

const app = new (function() {
    this.tbody = document.getElementById('tbody');
    this.id = document.getElementById('id');
    this.nombres = document.getElementById('nombres');
    this.email = document.getElementById('email');
    this.edad = document.getElementById('edad');
    
    this.listado = () => {
        fetch("../controllers/listado.php")
            .then((res) => res.json())
            .then((data) => {
                this.tbody.innerHTML = "";
        data.forEach((item) => {
            this.tbody.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.nombres}</td>
                    <td>${item.email}</td>
                    <td>${item.edad}</td>
                    <td>
                        <a href="javascript:;" class="btn btn-warning btn-sm" onclick="app.editar(${item.id})">Editar</a>
                        <a href="javascript:;" class="btn btn-danger btn-sm" onclick="app.eliminar(${item.id})">Eliminar</a>
                    </td>
                </tr>
            `;
        });
        })
        .catch((error) => console.log(error));
    };
    this.guardar = () => {
        var form = new FormData();
        form.append("nombres",this.nombres.value);
        form.append("email",this.email.value);
        form.append("edad",this.edad.value);
        form.append("id",this.id.value);
        if (this.id.value === ""){

            fetch("../controllers/guardar.php",{
                method: "POST",
                body: form,
            })
            .then((res) => res.json())
            .then((data) => {
                swal({
                    title: 'CREADO',
                    text: "Se creo correctamente a: "+this.nombres.value,
                    icon:  'success'
                });
                this.listado();
                this.limpiar();
            })
            .catch((error) => console.log(error));
        } else{
            fetch("../controllers/actualizar.php",{
                method: "POST",
                body: form,
            })
            .then((res) => res.json())
            .then((data) => {
                swal({
                    title: "ACTUALIZADO",
                    text: "Gracias por actualisar tu datos: "+this.nombres.value,
                    icon:  'success'
                });
                this.listado();
                this.limpiar();
        })
        .catch((error) => console.log(error));
        }
    };
    this.limpiar = () => {
        this.id.value = "";
        this.nombres.value = "";
        this.email.value = "";
        this.edad.value = "";
    };
    this.eliminar = (id) => {
        var name = new FormData();
        name.append("nombres",this.nombres.value);
        var form = new FormData();
        form.append("id",id);
        fetch("../controllers/eliminar.php",{
            method: "POST",
            body: form,
        })
        .then((res) => res.json())
        .then((data) => {
            swal({
                title: "ELIMINADO",
                text: "Ooo Buelve pronto"+this.nombres.value,
                icon:  'error'
            });
            this.listado();
        })
        .catch((error) => console.log(error));
    };
    this.editar = (id) => {
        var form = new FormData();
        form.append("id",id);
        fetch("../controllers/editar.php",{
            method: "POST",
            body: form,
        })
        .then((res) => res.json())
        .then((data) => {
            this.id.value = data.id;
            this.nombres.value = data.nombres;
            this.email.value = data.email;
            this.edad.value = data.edad;
        })
        .catch((error) => console.log(error));
    }
})();
app.listado();
app.limpiar();
alerta();