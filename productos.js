addEventListener("load", load);
//llamo al servidor
var servidor = "https://servidorbackend.herokuapp.com/peliculas";
var serviDelete = "https://servidorbackend.herokuapp.com/eliminarproducto";
var serviFormMod = "https://servidorbackend.herokuapp.com/FormModProducto";
var serviModProducto = "https://servidorbackend.herokuapp.com/modificarproducto";
//var servidor = "http://localhost:666/peliculas";
//var serviDelete = "http://localhost:666/eliminarproducto";
//var serviFormMod = "http://localhost:666/FormModProducto";
//var serviModProducto = "http://localhost:666/modificarproducto";

function $(demo){
    return document.getElementById(demo);
}



function load(){
    enviarMensajeAlServidor(servidor , cargarProductos);

}

function cargarProductos(valor) {

    var productos = JSON.parse(valor);
    var todo=[];
    productos.forEach(element => {
        todo.push('<div class="col-md-3"  style="padding:1%;">'+
                      '<div class="card" style="width: 12.5rem;background:#212121;color:white">'+
                        '<img src="'+element.imagen+'" class="card-img-top">'+
                        '<p><i class="fas fa-star"></i>'+element.precio+'</p>'+
                        '<div class="card-body" style="height:180px">'+
                           '<p align="center" class="card-text">'+element.nombre+'</p>'+
                           '<input class="form-control" type="text" id="id_producto" name="id_producto" value="'+element.id_producto+'" hidden>'+
                           '<button type="submit" style="float: left;margin: 5px;border-radius:30px"  id="modificar" class="btn btn-dark" onclick="formMod('+element.id_producto+')"><i class="fas fa-pencil-alt"></i></a>'+
                           '<button type="submit" style="text-decoration:underline;cursor:pointer; float: left;margin-right:5px;border-radius:30px;margin-top: 2%" class="btn btn-light card-text" onclick="eliminarDato('+element.id_producto+')"><i class="fas fa-trash-alt"></i></button>'+
                        '</div>'+
                      '</div>'+
                  '</div>'

                 );
                 
 
    });
    $('productos').innerHTML=todo;
    
    
}
function eliminarDato(id){
    var eliminar = confirm('De verdad desea eliminar este dato?');


    if ( eliminar ) {
          
        var xmlhttp = new XMLHttpRequest();
        var datos = new FormData();
        datos.append("id_producto",id);
    
        // indico hacia donde va el mensaje
        xmlhttp.open("POST", serviDelete, true);
        //seteo el evento
        xmlhttp.onreadystatechange = function () {
            //Veo si llego la respuesta del servidor
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                //Reviso si la respuesta es correcta
                if (xmlhttp.status == 200) {
                    alert("eliminado");
                }
                else {
                    alert("ocurrio un error");
                }
            }
        
        }
    
       
        xmlhttp.setRequestHeader("enctype", "multipart/form-data");
    
        //envio el mensaje    
        xmlhttp.send(datos);
        }
        
}
function formMod(id){
    enviarMensajeAlServidorPost(serviFormMod,retornoDelClick);



    function retornoDelClick(respuesta){
        $('productos').hidden=true;
      
        var productos = JSON.parse(respuesta);
        var todo=[];
        productos.forEach(element => {
        todo.push('<div class="col-md-12">'+
                        '<div class="form-row">'+
                            '<div class="form-group col-md-8">'+
                                '<label for="inputEmail4">Nombre</label>'+
                                '<input type="text" class="form-control" name="nombre" id="nombre" value="'+element.nombre+'">'+
                             '</div>'+
                             '<div class="form-group">'+
                            '<label for="inputEmail4">Descripcion</label>'+
                            '<textarea type="text" class="form-control" name="descripcion" id="descripcion" value="'+element.descripcion+'">'+element.descripcion+'</textarea>'+
                        '</div>'+
                            '<div class="form-row">'+
                            '<div class="form-group col-md-8">'+
                                '<label for="inputPassword4">Precio</label>'+
                                '<input type="text" class="form-control" name="precio" id="precio" value="'+element.precio+'">'+
                         '</div>'+
                            '<div class="form-group">'+
                            '<label for="inputEmail4">imagen</label>'+
                            '<input type="text" class="form-control" name="imagen" id="imagen" value="'+element.imagen+'">'+
                        '</div>'+
                            '<div class="form-group">'+
                           '<button type="submit" name="modificar" id="modificar" class="btn btn-dark" onclick="modificarDato('+element.id_producto+','+$("nombre").value+','+$("descripcion").value+','+$("precio").value+','+$("imagen").value+')">Modificar</button>'+
                        '</div>'+
                '</div>'
                 );
                 
 
        });
    
        $('form').innerHTML=todo;
        //window.location="ModificarProducto.html";
    }

    function enviarMensajeAlServidorPost(serviFormMod, funcionARealizar){
        var xmlhttp = new XMLHttpRequest();
        var datos = new FormData();
        datos.append("id_producto",id);
    
        // indico hacia donde va el mensaje
        xmlhttp.open("POST", serviFormMod, true);
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
    
       
        xmlhttp.setRequestHeader("enctype", "multipart/form-data");
    
        //envio el mensaje    
        xmlhttp.send(datos);
     }
        
}
function modificarDato(id,nombre,descripcion,precio,imagen){
    enviarMensajeAlServidorPost(serviModPelicula,retornoDelClick);



    function retornoDelClick(respuesta){
        alert(respuesta);
    }

    function enviarMensajeAlServidorPost(serviModProducto, funcionARealizar){
        var xmlhttp = new XMLHttpRequest();
        var datos = new FormData();
        datos.append("id_producto",id);
        datos.append("nombre",nombre);
        datos.append("descripcion",descripcion);
        datos.append("precio",precio);
        datos.append("imagen",imagen);
        
    
        // indico hacia donde va el mensaje
        xmlhttp.open("POST", serviModProducto, true);
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
    
       
        xmlhttp.setRequestHeader("enctype", "multipart/form-data");
    
        //envio el mensaje    
        xmlhttp.send(datos);
     }
        
}


function enviarMensajeAlServidor(servidor, funcionARealizar){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET",servidor,true);
   
    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){
            if(xmlhttp.status == 200){
                console.log(xmlhttp.response);
                funcionARealizar(xmlhttp.responseText);
            }else{
                alert("Ocurrio un error");
            }
        }

    }
    xmlhttp.send();    
}
