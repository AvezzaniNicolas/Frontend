addEventListener("load", load);

var servidor = "https://servidorbackend.herokuapp.com/altaproducto";
//var servidor = "http://localhost:666/altaproducto";

function $(demo){
    return document.getElementById(demo);
}

function load() {
    document.getElementById("guardar").addEventListener("click", click);
    
     
}
 function click(){
    enviarMensajeAlServidorPost(servidor, retornoDelClick);
 }
 function retornoDelClick(respuesta){
        alert(respuesta);  
}
 
function enviarMensajeAlServidorPost(servidor, funcionARealizar){
 
     var xmlhttp = new XMLHttpRequest();
     var obje = new FormData();
     obje.append("nombre",$("nombre").value);
     obje.append("descripcion",$("descripcion").value);
     obje.append("precio",$("precio").value);
     obje.append("imagen",$("imagen").value);
         
     var msg="falta ingresar datos en \n";
     var ok=true;

     if($('nombre').value==""){
         msg+="Nombre\n";
         ok=false;
     }
     if($('descripcion').value==""){
        msg+="Descripcion\n";
        ok=false;
     }
     if($('precio').value==""){
        msg+="Precio\n";
        ok=false;
     }
     if($('imagen').value==""){
        msg+="Imagen\n";
        ok=false;
     }        
     else{
        xmlhttp.open("POST", servidor, true);
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
        xmlhttp.send(obje);
    }

}
