class Sudoku{
  
    constructor(){
        this.numeros = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6"
        //this.numeros = "23.94.67.8..3259149..76.32.1.....7925.321.4864..68.5317..1....96598721433...9...7"
        //this.numeros = "8.4.71.9.976.3....5.196....3.7495...692183...4.5726..92483591..169847...753612984"
        this.filas = 9
        this.columnas = 9
        this.tablero=[]
        this.start()
        this.paintSudoku()
    }

    start(){
        for(let i = 0; i<9;i++){
            let col = []
            for(let j=0;j<9;j++){
                let num = this.numeros[i*9+j]
                if(num === "."){
                    col.push(0)
                }else{
                    col.push(parseInt(num))
                }
            }
            this.tablero.push(col)
        }
    }

    createStructure(){
        for(let i= 0; i<this.tablero.length; i++){
            for(let j=0; j<this.tablero.length;j++){
                document.write("<p></p>")
            }
        }
    }

    paintSudoku(){
        this.createStructure()
        let parrafos = document.querySelectorAll("p")
        
        //Compruebo que la longitud sea la misma para que este bien creados
        if(!this.numeros.length === parrafos.length){
            return
        }

       for(let i= 0; i<this.tablero.length;i++){
            for(let j= 0; j<this.tablero.length;j++){
                let cuadrante = this.obtenerCuadrante(i, j);
                if(this.tablero[i][j] === 0){
                    parrafos[i*9+j].setAttribute('data-state', 'unclicked');   
                    parrafos[i*9+j].setAttribute('data-row', i);
                    parrafos[i*9+j].setAttribute('data-column', j);
                    parrafos[i*9+j].setAttribute('data-cuadrante', cuadrante);
                    parrafos[i*9+j].addEventListener('click', this.clickCell.bind(this,parrafos[i*9+j]));
                }else{
                    parrafos[i*9+j].textContent=this.tablero[i][j]
                    parrafos[i*9+j].setAttribute('data-state', 'blocked');   
                    parrafos[i*9+j].setAttribute('data-row', i);
                    parrafos[i*9+j].setAttribute('data-column', j);
                    parrafos[i*9+j].setAttribute('data-cuadrante', cuadrante);
                 }     
            }
        }
    }

    clickCell(celda){
        //Primero de todo pongo todas a unclicked
        let parrafos = document.querySelectorAll("p")

        for(let i =0; i<parrafos.length;i++){
            parrafos[i].dataset.state = 'unclicked'
        }
        //Clicko la actual
        celda.dataset.state = 'clicked'
    }

    addKeyDownEvent(){
        document.addEventListener('keydown',this.checkNumber.bind(this))
    }

    checkNumber(event){
        //Compruebo que sea un numero lo pulsado
        if(!(parseInt(event.key) === 1||
            parseInt(event.key)  === 2||
            parseInt(event.key)  === 3||
            parseInt(event.key)  === 4||
            parseInt(event.key)  === 5||
            parseInt(event.key)  === 6||
            parseInt(event.key)  === 7||
            parseInt(event.key)  === 8||
            parseInt(event.key)  === 9)){
                return
            }
        //Busco si hay alguna celda pulsada
        let count = 0
        let parrafos = document.querySelectorAll("p")
        for(let i = 0; i<parrafos.length;i++){
            if(parrafos[i].dataset.state === 'clicked'){
                count++
            }
        }
        if(count === 0){
            alert("Debes seleccionar una tecla anteriormente")
            return
        }
        this.introduceNumber(parseInt(event.key))
    }

    introduceNumber(number){
        let parrafos = document.querySelectorAll("p");
        let cell;
        for (let i = 0; i < parrafos.length; i++) {
            if (parrafos[i].dataset.state === 'clicked') {
                cell = parrafos[i];
            }
        }

        
        let fila = cell.dataset.row
        let columna = cell.dataset.column
        let cuadrante = this.obtenerCuadrante(fila, columna);
        // Calcular fila y columna desde la posición en la lista

        //Comprobar que no exista ningun numero en la cuadricula
        for (let i = 0; i < this.columnas; i++) {
            if (this.tablero[fila][i] === number) {
            return;
            }
        }

        //Comprobar que no exista ningún número igual en la columna
        for (let i = 0; i < this.filas; i++) {
            if (this.tablero[i][columna] === number) {
            return
            }
        }
        
        //Comprobar que no exista ningún número igual en la cuadricula
        let numEnCuadrante = this.obtenerNumerosCuadrante(cuadrante,parrafos)
        for(let i = 0; i<numEnCuadrante.length;i++){
            if(parseInt(numEnCuadrante[i])===number){
                return
            }
        }
        // Actualizar el estado de la celda
        cell.textContent = number;
        cell.dataset.state = "correct";
        this.tablero[fila][columna] = number
        
        // Comprobar si el juego está completo
        parrafos = document.querySelectorAll("p");
        for (let i = 0; i < parrafos.length; i++) {
        if (parrafos[i].dataset.state === 'unclicked') {
            return;
        }
        }
        alert("Enhorabuena, has completado el Sudoku");
    }

    obtenerCuadrante(fila, columna) {
        const cuadranteFila = Math.floor(fila / 3);
        const cuadranteColumna = Math.floor(columna / 3);
        return cuadranteFila * 3 + cuadranteColumna + 1;
    }

    obtenerNumerosCuadrante(cuadrante,parrafos){
        let numEnCuadrante = []
        for(let i=0;i<parrafos.length;i++){
            if(parseInt(parrafos[i].dataset.cuadrante) === cuadrante){
                numEnCuadrante.push(parrafos[i].textContent)
            }
        }
        return numEnCuadrante
    }

} 
