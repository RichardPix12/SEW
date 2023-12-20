class Viajes {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.manejarErrores.bind(this));
    }

    getPosicion(posicion) {
        this.mensaje = "¡Geolocalización llevada a cabo exitosamente!"
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
        alert(this.mensaje)
    }

    manejarErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "Error: El usuario no ha autorizado la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Error: No se ha podido obtener la información de geolocalización";
                break;
            case error.TIMEOUT:
                this.mensaje = "Error: Se ha agotado el tiempo de la petición de geolocalización";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Error: Se ha producido un error desconocido";
                break;
        }
        alert(this.mensaje)
    }

    getLongitud() {
        return this.longitud;
    }

    getLatitud() {
        return this.latitud;
    }

    getAltitud() {
        return this.altitud;
    }

    getMapaEstatico() {
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        let centro = "center=" + this.latitud + "," + this.longitud;
        let zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        let marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        let sensor = "&sensor=false";
        let mapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;

        $("section[data-name='mapaEstatico']").append("<h3>Mapa estático</h3><img src='" + mapa + "' alt='Mapa estático de Google' />");
    }

    getMapaDinamico(){
        var centro = {lat: 43.3672702, lng: -5.8502461};


        var mapaGeoposicionado = new google.maps.Map(document.querySelector("main") , {
            zoom: 8,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });


        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent("Localización encontrada");
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
            }, function() {
                infoWindow.setPosition(mapaGeoposicionado.getCenter());
                infoWindow.setContent("Error: Ha fallado la geolocalización");
                infoWindow.open(mapaGeoposicionado);
            })
        } else {
            infoWindow.setPosition(mapaGeoposicionado.getCenter());
            infoWindow.setContent("Error: El navegador no soporta la geolocalización");
            infoWindow.open(mapaGeoposicionado);
        }
    }
    
    leerArchivoXml(files){
        var archivo = files[0]
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
          {
            var lector = new FileReader();
            lector.onload = function (evento) {
                let datos = lector.result;
                let i=0;
                $("ruta", datos).each(function() {
                    var nombre = $(this).attr('nombre');
                    var tipo = $(this).attr('tipo');
                    var medio = $(this).attr('medio');
                    var horaInicio = $(this).attr('horaInicio');
                    if(horaInicio === undefined){
                        horaInicio = "No especificada"
                    }
                    var horaFin = $(this).attr('horaFin');
                    if(horaFin === undefined){
                        horaFin = "No especificada"
                    }
                    var duracion = $(this).attr('duracion'); 
                    var agencia = $(this).attr('agencia'); 
                    var descripcion = $(this).find('descripcion'); 
                    var adecuadas = $(this).attr('adecuadas'); 
                    var lugarInicio = $(this).attr('lugarInicio'); 
                    var dirInicio = $(this).attr('dirInicio'); 
                    var recomendacion = $(this).attr('recomendacion');
                    var longitud = $($(this).find('coordenada')[0]).attr('longitud');
                    var latitud = $($(this).find('coordenada')[0]).attr('latitud');
                    var altura = $($(this).find('coordenada')[0]).attr('altura');
                    var referencia1 = $($(this).find('referencia')[0]).attr('link');
                    var referencia2 = $($(this).find('referencia')[1]).attr('link');
                    var referencia3 = $($(this).find('referencia')[2]).attr('link');

                    var planimetria = $($('planimetria',datos)[i]).attr("link")
                    var altimetria = $($('altimetria',datos)[i]).attr("link")


                    var hito1 = ($(this).find('hito')[0]);
                    var hito2 = ($(this).find('hito')[1]);
                    var hito3 = ($(this).find('hito')[2]);
                    
                    var nombrehito1 = $(hito1).attr('nombre');
                    var nombrehito2 = $(hito2).attr('nombre');
                    var nombrehito3 = $(hito3).attr('nombre');
                    var descripcionhito1 = $(hito1).attr('descripcion');
                    var descripcionhito2 = $(hito2).attr('descripcion');
                    var descripcionhito3 = $(hito3).attr('descripcion');
                    var distanciahito1 = $(hito1).attr('distancia');
                    var distanciahito2 = $(hito2).attr('distancia');
                    var distanciahito3 = $(hito3).attr('distancia');
                    var longitudhito1 = $($(hito1).find('coordenada')[0]).attr('longitud');
                    var longitudhito2 = $($(hito2).find('coordenada')[0]).attr('longitud');
                    var longitudhito3 = $($(hito3).find('coordenada')[0]).attr('longitud');
                    var latitudhito1 = $($(hito1).find('coordenada')[0]).attr('latitud'); 
                    var latitudhito2 = $($(hito1).find('coordenada')[0]).attr('latitud');
                    var latitudhito3 = $($(hito1).find('coordenada')[0]).attr('latitud');
                    var alturahito1= $($(hito1).find('coordenada')[0]).attr('altura'); 
                    var alturahito2= $($(hito2).find('coordenada')[0]).attr('altura'); 
                    var alturahito3= $($(hito3).find('coordenada')[0]).attr('altura'); 


                    

                    var fotoshito1=[];
                    for(let i = 0; i<$(hito1).find('foto').length;i++){
                        fotoshito1[i] = $($(hito1).find('foto')[i]).attr('link');
                    }
                    var fotoshito2=[];
                    for(let i = 0; i<$(hito2).find('foto').length;i++){
                        fotoshito2[i] = $($(hito2).find('foto')[i]).attr('link');
                    }
                    var fotoshito3=[];
                    for(let i = 0; i<$(hito3).find('foto').length;i++){
                        fotoshito3[i] = $($(hito3).find('foto')[i]).attr('link');
                    }


                    var videoshito1=[]
                    for(let i = 0; i<$(hito1).find('video').length;i++){
                        videoshito1[i] = $($(hito1).find('video')[i]).attr('link');
                    }
                    var videoshito2=[]
                    for(let i = 0; i<$(hito2).find('video').length;i++){
                        videoshito2[i] = $($(hito2).find('video')[i]).attr('link');
                    }
                    var videoshito3=[]
                    for(let i = 0; i<$(hito3).find('video').length;i++){
                        videoshito3[i] = $($(hito3).find('video')[i]).attr('link');
                    }
                    var result = "";
          
                    result +="<h3>Ruta: " +nombre+"</h3>";
                    result +="<ol><li>Tipo de ruta: "+ tipo+"</li>"
                    result+= "<li>Medio de transporte: " +medio + "</li>";
                    result+= "<li>Hora de inicio: " + horaInicio + "</li>";
                    result+= "<li>Hora de fin: " + horaFin + "</li>";
                    result+= "<li>Duracion: " + duracion + "</li>";
                    result += "<li>Agencia: " + agencia + " </li>";
                    result += "<li>Descripción: " + descripcion + " </li>";
                    result += "<li>Adecuadas para: " + adecuadas + " </li>";
                    result += "<li>Lugar de inicio: " + lugarInicio + " </li>";
                    result += "<li>Dirección de inicio: " + dirInicio + " </li>";
                    result += "<li>Recomendacion: " + recomendacion + " </li>";
                    result += "<li>Coordenadas: " + latitud + ", "+longitud+ " </li>";
                    result += "<li>Altura: " + altura + " </li>";
                    result += "<li>Referencias: <a href=" + referencia1 +"> Referencia 1  </a> <a href=" + referencia2 +"> Referencia 2  </a> <a href=" + referencia3 +"> Referencia 3  </a></li>";  
                    result += "</ol>";

                    result += "<h4>Hito: " + nombrehito1 + "</h4>";
                    result += "<ol><li>Descripción: " + descripcionhito1 + "</li>";
                    result += "<li>Distancia respecto al anterior: " +distanciahito1 + "km</li>";
                    result += "<li>Coordeanadas: " + latitudhito1 + ", "+ longitudhito1 +" </li>"; 
                    result += "<li>Altura: " +alturahito1 +"m </li>"
                    result += "</ol>";

                    for(let i = 0; i<fotoshito1.length; i++){
                        result += "<img src =" + fotoshito1[i] + " alt =Fotoh1"+i+ ">"; 
                    }
                    if(videoshito1.length != 0){
                        for(let i = 0; i<videoshito1.length; i++){
                            result += "<video src =" + videoshito1[i] + " controls preload='auto'> </video> "; 
                        }
                    }
                    

                    result += "<h4>Hito: " + nombrehito2 + "</h4>";
                    result += "<ol><li>Descripción: " + descripcionhito2+ "</li>";
                    result += "<li>Distancia respecto al anterior: " +distanciahito2  + "km</li>";
                    result += "<li>Coordeanadas: " + latitudhito2 + ", "+ longitudhito2 +" </li>"; 
                    result += "<li>Altura: " +alturahito2 +"m </li>"
                    result += "</ol>";
                    for(let i = 0; i<fotoshito2.length; i++){
                        result += "<img src =" + fotoshito2[i] + " alt =Fotoh2"+i+ ">"; 
                    }
                    if(videoshito2.length != 0){
                        for(let i = 0; i<videoshito2.length; i++){
                            result += "<video src =" + videoshito2[i] + " controls preload='auto'> </video> "; 
                        }
                    }

                    result += "<h4>Hito: " + nombrehito3 + "</h4>";
                    result += "<ol><li>Descripción: " + descripcionhito3 + "</li>";
                    result += "<li>Distancia respecto al anterior: " +distanciahito3 + "km</li>";
                    result += "<li>Coordeanadas: " + latitudhito3 + ", "+ longitudhito3 +" </li>"; 
                    result += "<li>Altura: " +alturahito3 +"m </li>"
                    result += "</ol>";
                    for(let i = 0; i<fotoshito3.length; i++){
                        result += "<img src =" + fotoshito3[i] + " alt =Fotoh3"+i+ ">"; 
                    }
                    if(videoshito3.length != 0){
                        for(let i = 0; i<videoshito3.length; i++){
                            result += "<video src =" + videoshito3[i] + " controls preload='auto'> </video> "; 
                        }
                    }
                    
                    result += "<h4> Mapas </h4>"
                    result += "<a href ="+planimetria+"> Planimetria </a>"
                    result += "<a href ="+altimetria+"> Altimetria </a>"
                   
                    console.log(result)
                    $("section[data-name='procesXml']").append(result);
                })
              }      
            lector.readAsText(archivo);
            }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
            }       
    }

    convierteKml(files){
        let latitudes = []
        let longitudes = []
        for (let i = 0; i < files.length; i++) {
            let fichero = files[i]

            if(fichero.name.match(/.kml/)) {
                let lector = new FileReader();
                console.log("a1")
                lector.onload = function(evento) {
                    console.log("a2")
                    let data = new DOMParser().parseFromString(lector.result,'text/xml');
                    let coordenadas = $('coordinates',data);
                   
                    for(let i =0;i<coordenadas.length;i++){
                        console.log("a3")
                        let x=coordenadas[i].innerHTML.trim().split(",");
                        latitudes.push(x[0]);
                        longitudes.push(x[1]);
                       
                    }  
                    var ubicacion = new google.maps.LatLng(longitudes[0], 
                        latitudes[0]); //pongo de centro el primer elemento.
                    var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 4,center:ubicacion});
                    let infoWindow = new google.maps.InfoWindow();
                    for(let i =0;i<latitudes.length;i++) {
                        let position = { lat: Number(longitudes[i]), lng: Number(latitudes[i]) };
                        new google.maps.Marker({
                            map: mapa,
                            position: position
                        });
                    }
                    mapa.data.addListener('click', function(event) {
                        infoWindow.setPosition(event.feature.getGeometry().get());
                        infoWindow.setContent(event.feature.getProperty("name"));
                        infoWindow.open(mapa);
                    });                 
                }
                lector.readAsText(fichero);
            }
        }
        
    }

    convierteSvg(files){
        for (let i = 0; i < files.length; i++) {
            let fichero = files[i]
            if(fichero.name.match(/.svg/))   {
                let lector = new FileReader();
                lector.onload = function() {
                    let archivo = lector.result;
                    $("section[data-name='procesaSvg']").append(archivo)
                }
                lector.readAsText(fichero)
            }
        }
    }
   
}

var viajes = new Viajes();