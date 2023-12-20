class Fondo{
    constructor(nombrePais,nombreCapital,coordCapi){
        this.nombrePais = nombrePais
        this.nombreCapital = nombreCapital
        this.coordCapi = coordCapi
    }

    buscarImagen(){
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI,
            {
                tags: this.nombreCapital,
                tagmode: "any",
                format: "json"
            })
        .done(function(data){
            let image = data.items[1].media.m.replace('_m','_b')
            $("body").css('background-image','url('+image+')')
        });
    }
}

fondo = new Fondo("Kirguistan","Biskek","12")
