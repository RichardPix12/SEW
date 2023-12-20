class Crucigrama{
    constructor(){
        this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16"
        //this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"
        //this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"
        this.nivel= "facil"
        this.filas = 11
        this.columnas = 9
        this.init_time
        this.end_time
        this.tablero
        this.inicializaTablero()
        this.start()
    }
    

    inicializaTablero(){
        this.tablero = []
        for(let i = 0 ; i<this.filas;i++){
            let col = []
            for(let j=0;j<this.columnas;j++){
                col.push(0)
            }
            this.tablero.push(col)
        }
    }

    start(){
        let elementos = this.board.split(',');
        for(let i = 0 ; i<this.filas;i++){
            for(let j=0;j<this.columnas;j++){
                if(elementos[i*9+j] === "."){
                    this.tablero[i][j] = 0
                }else if(elementos[i*9+j] === "#"){
                    this.tablero[i][j] = -1
                }else if(!isNaN(elementos[i*9+j])){                       
                    this.tablero[i][j] = parseInt(elementos[i*9+j])
                }else{
                    this.tablero[i][j] = elementos[i*9+j]
                }
            }
        }
    }

    paintMathWord(){
        let res = ""
        for(let i = 0; i<this.filas;i++){
            for(let j=0; j<this.columnas;j++){
                if(this.tablero[i][j] === 0){
                    res += "<p data-state='unclicked' data-row = '" +i+ "' data-column='"+j+"'  onClick=crucigrama.clickCell(this)> </p>"
                }else if(this.tablero[i][j] === -1){
                    res += "<p data-state='empty'data-row = '" +i+ "' data-column='"+j+"' > </p>"
                }else{
                    res += "<p data-state = 'blocked' data-row = '" +i+ "' data-column='"+j+"' >"+this.tablero[i][j]+ "</p>"
                }
            }
        }
        $("main").html(res)
        this.init_time = new Date()
    }

    clickCell(celda){
        //Primero de todo pongo todas a unclicked
        let parrafos = document.querySelectorAll("p")

        for(let i =0; i<parrafos.length;i++){
            if(parrafos[i].dataset.state === 'clicked'){
                parrafos[i].dataset.state = 'unclicked'
            }
        }
        if(celda.dataset.state==='correct'){
            return
        }
        //Clicko la actual
        celda.dataset.state = 'clicked'
    }

    check_win_condition(){
        for(let i =0; i< this.filas; i++){
            for (let j=0; j<this.columnas; j++){
                if(this.tablero[i][j] === 0){
                    return false
                }      
            }
        }
        return true
    }

    calculate_date_difference(){
        // Restar las fechas
        const dif = Math.abs(this.init_time - this.end_time);

        // Calcular horas, minutos y segundos
        const segundos = Math.floor(dif / 1000) % 60;
        const minutos = Math.floor(dif / (1000 * 60)) % 60;
        const horas = Math.floor(dif / (1000 * 60 * 60));

        // Formatear la diferencia
        return horas + "::" + minutos + "::" + segundos;
    }

    addKeyDownEvent(){
        document.addEventListener('keydown',this.checkElement.bind(this))
    }

    checkElement(event){       
         //Compruebo que sea un numero o un operador matematico lo pulsado
         if(!(parseInt(event.key) === 1||
            parseInt(event.key)  === 2||
            parseInt(event.key)  === 3||
            parseInt(event.key)  === 4||
            parseInt(event.key)  === 5||
            parseInt(event.key)  === 6||
            parseInt(event.key)  === 7||
            parseInt(event.key)  === 8||
            parseInt(event.key)  === 9||
            event.key  === "+"||
            event.key  === "-"||
            event.key  === "*"||
            event.key  === "/")){
                return
            } 
          
        //Busco si hay alguna celda pulsada
        let count = 0
        let parrafos = $("p")
        let fila
        let columna
            for(let i = 0; i<parrafos.length;i++){
                if(parrafos[i].dataset.state === 'clicked'){
                    count++
                    fila =parseInt( parrafos[i].dataset.row)
                    columna = parseInt(parrafos[i].dataset.column)
                }
            }
            if(count === 0){
                alert("Debes seleccionar una tecla anteriormente")
                return
            }
        this.introduceElement(event.key,fila,columna)  
    }

    introduceElement(element,fila,columna){

        var expression_row = true
        var expression_col = true
        this.tablero[fila][columna] = element
        if(!(this.tablero[fila][columna+1]===-1 || columna+1 >= this.columnas)){

            for(let j= columna+1; j<this.columnas; j++){
                if(this.tablero[fila][j]=== '='){
                    
                    let first_number = this.tablero[fila][j-3]
                    let second_number = this.tablero[fila][j-1]
                    let expression = this.tablero[fila][j-2]
                    let result = this.tablero[fila][j+1]

                    if(first_number !== 0 &&
                        second_number!== 0 &&
                        expression !== 0 &&
                        result!==0){
                            const joined = [first_number, expression, second_number].join(' ');                            
                            const resultOfJoined = eval(joined)

                            if(!(parseInt(result) === resultOfJoined)){
                                expression_row = false
                                break
                            }
                        }
                }
            }
            
        }

        if(! (fila+1 >= this.filas || this.tablero[fila+1][columna]===-1 )){      
            for(let i=fila+1; i<this.filas ;i++){
                if(this.tablero[i][columna]=== '='){
                    let first_number = this.tablero[i-3][columna]
                    let second_number = this.tablero[i-1][columna]
                    let expression = this.tablero[i-2][columna]
                    let result = this.tablero[i+1][columna]
                    if(first_number !== 0 &&
                        second_number!== 0 &&
                        expression !== 0 &&
                        result!==0){
                            const joined = [first_number, expression, second_number].join(' ');
                            const resultOfJoined = eval(joined)

                            if(!(result === resultOfJoined)){
                                expression_col = false
                                break
                            }
                        }
                }
            }
        }

        if(expression_col === true && expression_row === true){
            let parrafos = $("p")
            for(let i = 0; i<parrafos.length;i++){
                if(parseInt(parrafos[i].dataset.row) === fila && parseInt(parrafos[i].dataset.column)===columna ){
                    parrafos[i].dataset.state ="correct"
                    parrafos[i].textContent = element
                }
            } 
        }else{
            this.tablero[fila][columna] = 0
            alert("No es correcto")
        }

        if(this.check_win_condition()){
            this.end_time = new Date()
            const tiempo = this.calculate_date_difference()
            
            alert("El juego ha terminado en " + tiempo)
            this.createRecordForm()
        }
    }

    createRecordForm(){
        let result = "<section><h3>Introduce tus datos</h3>"
        result += "<form action='#' method='post' name='record'>"
        result += "<label for='nombre'>Nombre: </label>" 
        result +="<input type='text' name='nombre' id='nombre' />"
        result +="<label for='apellidos'>Apellidos: </label>"
        result +="<input type='text' name='apellidos' id='apellidos'/>"
        result +="<label for='nivel'>Nivel: </label>"
        result +="<input type='text' name='nivel' id='nivel' value='" + this.nivel + "' readonly />"
        result +="<label for='tiempo'>Tiempo: </label>"
        result +="<input type='text' name='tiempo' id='tiempo' value='" + this.calculate_date_difference() + "' readonly />"
        result += "<input type='submit' value='Confirmar' /> </form> </section>" 
        $("main").after(result)

    }
}

crucigrama = new Crucigrama()