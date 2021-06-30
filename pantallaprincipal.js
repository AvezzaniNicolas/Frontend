function load() {
    
    //enviarMensajeAlServidor(servidor , cargarOpcionesProvincia);
    enviarMensajeAlServidor(servidor , cargarOpcionesProvincia);
    $("provincia").addEventListener("change", cambiarProvincia);
   $("btnSubir").addEventListener("click",SubirArchivo);
   $("mostrarPost").addEventListener("click",EnviarPost);

    
}

function cambiarProvincia() {
    var valorProvincia = $("provincia").value;
    enviarMensajeAlServidor(servidor + "/Departamento/" + valorProvincia,cargarOpcionesLocalidad);
    enviarMensajeAlServidor(servidor + "/Imagen/" + valorProvincia, function (data){
        $('imagen').src = servidor +data;
});
}


function cargarOpcionesProvincia(valor) {
    var provincias = JSON.parse(valor);
    provincias.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var opciones = ['<option value=0>Selecciones una provincia</option>']

    provincias.forEach(element => {
        opciones.push('<option value="' + element.valor + '">' + element.nombre + '</option>');
    });

    $("provincia").innerHTML = opciones;
}


function cargarOpcionesLocalidad(valor) {
    var localidades = JSON.parse(valor);
    localidades.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var opciones = []

    localidades.forEach(element => {
        opciones.push('<option value="' + element.valor + '">' + element.nombre + '</option>');
    });
    $("localidad").innerHTML = opciones;
}


function enviarMensajeAlServidor(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    // indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);
    //seteo el evento
    xmlhttp.onreadystatechange = function () {
        //Veo si llego la respuesta del servidor
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //Reviso si la respuesta es correcta
            if (xmlhttp.status == 200) {
                funcionARealizar(xmlhttp.responseText);
            }
            else {
                alert("ocurrio un error");
            }
        }
    }

 
    //envio el mensaje    
    xmlhttp.send();
}


function enviarMensajeAlServidorPost(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    // indico hacia donde va el mensaje
    xmlhttp.open("POST", servidor, true);
    //seteo el evento
    xmlhttp.onreadystatechange = function () {
        //Veo si llego la respuesta del servidor
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //Reviso si la respuesta es correcta
            if (xmlhttp.status == 200) {
                funcionARealizar(xmlhttp.responseText);
            }
            else {
                alert("ocurrio un error");
            }
        }
    }

   // var valor = new FormData();
   // valor.append("miNombre","llego al server");
    var envioDatos = { };
    envioDatos.valor = 25;

    //envio el mensaje    
    xmlhttp.send("hola mundo" );
}


function SubirArchivo() {

   // var nombreArchivo = "archivo.jpg"
  //  var file= $("archivo").files[0];
    //declaro el objeto
   // var fileContent = new FormData();
    //fileContent.append("archivo",file);
    //fileContent.append("nombre", "nombre");
    var xmlhttp = new XMLHttpRequest();
    // indico hacia donde va el mensaje
    xmlhttp.open("POST", servidor , true);
    //seteo el evento
    xmlhttp.onreadystatechange = function () {
        //Veo si llego la respuesta del servidor
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //Reviso si la respuesta es correcta
            if (xmlhttp.status == 200) {
                funcionARealizar(xmlhttp.responseText);
            }
            else {
                alert("ocurrio un error");
            }
        }
    }
    //xmlhttp.setRequestHeader('enctype', "multipart/form-data");
    //xmlhttp.setRequestHeader('Content-Disposition', 'attachment; filename="' + nombreArchivo + '"');
    //envio el mensaje    
    xmlhttp.send("hola mundo");
}


//#endregion



function EnviarJSONPost() {

  
    var xmlhttp = new XMLHttpRequest();
 
    xmlhttp.open("POST", servidor + '/HolaMundo/', true);
    xmlhttp.onreadystatechange = function () {
        //Veo si llego la respuesta del servidor
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //Reviso si la respuesta es correcta
            if (xmlhttp.status == 200) {
                alert(xmlhttp.responseText);
            }
            else {
                alert("ocurrio un error");
            }
        }
    }

    var obje = new FormData();
    obje.append("mensaje", $("valor").value );
    //envio el mensaje    
    xmlhttp.send(obje);
}

function EnviarPost() {

  
var persona ={};
// persona.nombre = $('txtnombre').value;
// persona.Apellido = $('txtApellido').value;
// persona.Edad = $('txtEdad').value;
// persona.Pass = $('txtPass').value;
// persona.Usuario = $('txtUsuario').value;


     var xmlhttp = new XMLHttpRequest();
  
     xmlhttp.open("POST", servidor + '/HolaMundo/Esta no es la pass', true);
     xmlhttp.onreadystatechange = function () {
         //Veo si llego la respuesta del servidor
         if (xmlhttp.readyState == XMLHttpRequest.DONE) {
             //Reviso si la respuesta es correcta
             if (xmlhttp.status == 200) {
                 localStorage.setItem('token', "el super hash")
                 
                 alert(xmlhttp.responseText);
             }
             else {
                 alert("ocurrio un error");
             }
         }
     }


     //var cuerpo = new FormData();
     //cuerpo.append('pass',  $('txtValor').value);
    //xmlhttp.send(cuerpo);
   //envio el mensaje simple    
    //xmlhttp.send('"hola mund"');
   
   //envio objeto seriealizado
    xmlhttp.send(JSON.stringify({"usuario":"miusuario", "pass":"miPass"}));
  //  xmlhttp.send(JSON.stringify(persona));
    }