"use strict";

class Api{
   constructor(){
    navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),this.mostrarPosiblesErrores.bind(this));
    this.mapa=""
   }
   getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
}
    mostrarPosiblesErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
    }
}
    loadMap(){
       
        let ubicacionInicial=  { lat: 43.36, lng: -5.86 };
        this.mapa = new google.maps.Map(document.querySelector('main'),{zoom: 4,center:ubicacionInicial});
     
    }
    ponerMarcador(){
        let latitud= parseInt($('input:text[name=latitud]').val());
        let longitud= parseInt($('input:text[name=longitud]').val());
      
        let ubicacion = { lat:latitud , lng: longitud };

        new google.maps.Marker({position:ubicacion,map:this.mapa});
    
    }
    reiniciarMapa(){
        this.loadMap();
        $('input[name=archivo').val('');
    }

    loadFile(files){
        var fichero = files[0];
       
        if(fichero.name.match(/.geojson/)){
            let reader = new FileReader();
            reader.onload = e =>  this.mapa.data.addGeoJson(JSON.parse(reader.result));;
            reader.readAsText(fichero);
        }
        else {
            $("input[name=archivo]").after("Error : ¡¡¡ Archivo no válido !!!");
        }
    }
    async copiarOviedo(){
        await navigator.clipboard.writeText('43.37,-5.847');
    }
    async copiarMadrid(){
        await navigator.clipboard.writeText('40.44,-3.65');
    }
    async copiarTokyo(){
        await navigator.clipboard.writeText('35.48,137.12');
    }

    async copiarUbicacion(){
        await navigator.clipboard.writeText(this.latitud+","+this.longitud);
        alert('Copiado');
    }
    
    
    async pegarUbicacion(){
        let coordenadas = await navigator.clipboard.readText();
        
        let coordenadasArray = coordenadas.split(',');
        $('input:text[name=latitud]').val(coordenadasArray[0]);
        $('input:text[name=longitud]').val(coordenadasArray[1]);
    }
}
  
let api = new Api();