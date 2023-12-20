class Agenda{

    constructor(){
        this.url = "https://ergast.com/api/f1/current/races"
        this.last_api_call = null
        this.last_api_result = null
    }

    cargarDatos(){
        if (this.last_api_call == null || ((new Date() - this.last_api_call) / (1000 * 60)) > 10) {
            this.last_api_call = new Date(); 
            let self = this       
            $.ajax({
                dataType: "xml",
                url: this.url,
                method: 'GET',
                success: function(datos){  
                    let res = "<section><h2>Circuitos del mundial</h2>"
                    res +="<input type='button' value='Ver carreras' onclick='agenda.cargarDatos();'></input>"
                    self.last_api_result = datos
                    $(datos).find("Race").each(function () {
                        var raceName = $(this).find("RaceName").text()
                        var circuitName = $(this).find("Circuit").find("CircuitName").text()
                        var latitude = $(this).find("Circuit").find("Location").attr("lat")
                        var longitude = $(this).find("Circuit").find("Location").attr("long");
                        var date = $(this).find("Date").first().text();    
                        res+= "<article>"
                        res+="<h3>Carrera: "+raceName+"</h3>"
                        res+="<p>Nombre del ciruclo: "+circuitName +"</p>"
                        res+="<p>Coordenadas: " + latitude + ", "+ longitude +"</p>" 
                        res+="<p>Fecha: "+ date +"</p>"
                        res+="</article>"
                    });
                    res+="</section>"
                $("main").html(res)
                }
            });
        }else{
            let datos = this.last_api_result
            
            let res = "<section><h2>Circuitos del mundial</h2>"
                res +="<input type='button' value='Ver carreras' onclick='agenda.cargarDatos();'></input>"
                self.last_api_result = datos
                $(datos).find("Race").each(function () {
                    var raceName = $(this).find("RaceName").text()
                    var circuitName = $(this).find("Circuit").find("CircuitName").text()
                    var latitude = $(this).find("Circuit").find("Location").attr("lat")
                    var longitude = $(this).find("Circuit").find("Location").attr("long");
                    var date = $(this).find("Date").first().text();    
                    res+= "<article>"
                    res+="<h3>Carrera: "+raceName+"</h3>"
                    res+="<p>Nombre del ciruclo: "+circuitName +"</p>"
                    res+="<p>Coordenadas: " + latitude + ", "+ longitude +"</p>" 
                    res+="<p>Fecha: "+ date +"</p>"
                    res+="</article>"
                });
                res+="</section>"
            $("main").html(res)
        }               
    }

}

agenda = new Agenda();