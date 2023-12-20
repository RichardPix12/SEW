class Noticias{
    constructor(){
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            return
        }
    }

    readInputFile(noticias){
        var archivo = noticias[0]
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
            var lector = new FileReader();
            lector.onload = function (evento) {
                let noticiasSeparadas = lector.result.split('\n');
                let res = "<h2>Noticias: </h2> "
                for(let i = 0; i<noticiasSeparadas.length;i++){
                    let noticia = noticiasSeparadas[i].split('_')

                    res+="<article> <h3>" + noticia[0] + "</h3>"
                    res+="<h4>"+noticia[1]+"</h4>"
                    res+="<p>"+noticia[2]+"</p>"
                    res+="<p>Autor: "+noticia[3]+"<p></article>"
                }
                
                res+="<section><h3> Introduce tu noticia </h3>"
                res+="<label for='titulo'>Titulo: </label>"
                res+="<textarea id='titulo' placeholder= 'Titulo de la noticia'></textarea>"
                res+="<label for='encabezado'>Encabezado: </label>"
                res+="<textarea id='encabezado' placeholder= 'Encabezado de la noticia'></textarea>"
                res+="<label for='cuerpo'>Cuerpo: </label>"
                res+="<textarea id='cuerpo' placeholder= 'Cuerpo de la noticia'></textarea>"
                res+="<label for='autor'>Autor: </label>"
                res+="<textarea id='autor' placeholder= 'Autor de la noticia'></textarea>"
                res+= "<button onclick='noticias.crearNoticia()'>Crear Noticia</button></section>"
                $("section").html(res)

            }      
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }     
    }

    crearNoticia(){
        const text = document.querySelectorAll('textArea');
        const titulo = text[0].value
        const encabezado = text[1].value
        const cuerpo = text[2].value
        const autor = text[3].value
        
        let res =""
        res+="<article> <h3>" + titulo + "</h3>"
        res+="<h4>"+encabezado+"</h4>"
        res+="<p>"+cuerpo+"</p>"
        res+="<p>Autor: "+autor+"<p></article>"
        $("section article:last").after(res)
    }
}

noticias = new Noticias()