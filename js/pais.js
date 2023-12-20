class Pais{
    constructor(nombrePais, capital,poblacion){
        this.nombrePais = nombrePais;
        this.capital = capital;
        this.poblacion = poblacion;
        this.gobierno;
        this.latitud;
        this.longitud;
        this.religion;
        this.rellenaValores();
    }

    rellenaValores(){
        this.gobierno = "Republica parlamentaria";
        this.latitud = 42.87675;
        this.longitud =74.42705;
        this.religion = "Musulmana"
    }   

    getNombre(){
        return this.nombrePais;
    }
    
    getCapital(){
        return this.capital;
    }

    getPoblacion(){
        return this.poblacion;
    } 

    getSecundario(){
        return"<ul>"+
             "<li>" + this.gobierno + "</li>"+
            "<li>" + this.religion + "</li>" +
            "</ul>"
    }

    getCoordenadas(){
        document.write("<p> Coordenadas: " + this.latitud + "," + this.longitud +"</p>")
    }

    getMeteorologia(){
        const APIKey = "3e27444a94df2cc0cd1fc88d3ce638ea"
        let url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.latitud+"&lon="+ this.longitud + "&appid="+APIKey

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                
                let res ="<h2>Predicción meteorológica</h2>"
                const pronostico = datos.list
                
                for(let i = 0; i<pronostico.length; i++){
                    res += 
                            "<p> Fecha: "+pronostico[i].dt_txt + "</p>"
                            +"<p> Temperatura Maxima: "+ pronostico[i].main.temp_max+ "</p>"
                            +"<p> Temperatura Minima: "+ pronostico[i].main.temp_min+ "</p>"
                            +"<p> Porcentaje de humedad: "+pronostico[i].main.humidity + "%</p>"
                            +'<p> Icono: </p><img src=https://openweathermap.org/img/w/' +pronostico[i].weather[0].icon+ '.png alt="Icono de meteo">'
                            //+"<p> Cantidad de lluvia:"+ + "</p>"
                            
                }
                $("main section:nth-child(2)").html(res)
            }
        })
    }

}

pais = new Pais("Kirguistan","Biskek","6,692 millones")