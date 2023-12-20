class Memoria{
    juegoDeMemoria = {
        elements: [
            { element: 'HTML5', source: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg' },
            { element: 'HTML5', source: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg' },
            { element: 'CSS3', source: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg' },
            { element: 'CSS3', source: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg' },
            { element: 'JS', source: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg' },
            { element: 'JS', source: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg' },
            { element: 'PHP' , source: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'},
            { element: 'PHP' , source: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'},
            { element: 'SVG', source: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg'},
            { element: 'SVG', source: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg'},
            { element: 'W3C', source: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg'},
            { element: 'W3C', source: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg'}
        ]
    };

    constructor(){
        this.hasFlippedCard = false
        this.lockBoard = false
        this.firstCard = null
        this.secondCard = null
        this.shuffleElements()
        this.createElements()
        this.addEventListeners()
    }

    shuffleElements(){
        for (let i = this.juegoDeMemoria.elements.length - 1; i > 0; i--) {    
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.juegoDeMemoria.elements[i], this.juegoDeMemoria.elements[randomIndex]] = [this.juegoDeMemoria.elements[randomIndex], this.juegoDeMemoria.elements[i]];
        }
        
    }

    unflipCards(){
        //Lo primero será bloquear el main, por tanto se bloquea el tablero
        this.lockBoard = true

        //Resetea todas las cartas
        const cartas = document.querySelectorAll('article[data-state="flip"]');
        for (let i = 0; i < cartas.length; i++) {
            cartas[i].setAttribute('data-state', 'unflipped');
        }
        //Poner un timeout y resetear el talero
        setTimeout(this.resetBoard(),1000)
        //Desbloquear el tablero
        this.lockBoard=false
    }

    resetBoard(){
        this.hasFlippedCard = false
        this.lockBoard = false
        this.firstCard = null
        this.secondCard = null
    }

    checkForMatch(){
        //Comparo las dos cartas
        
        const texto1 = this.firstCard.dataset.element;
        const texto2 = this.secondCard.dataset.element;
        if(texto1 === texto2){
            this.disableCards()
        }else{
            this.unflipCards()
        }
    }

    disableCards(){
        //Pongo las cartas a revealed
        this.firstCard.setAttribute('data-state', 'revealed')
        this.secondCard.setAttribute('data-state', 'revealed')

        //reseteo el tablero
        setTimeout(this.resetBoard(),1000)
    }

    createElements(){
        const cartas = this.juegoDeMemoria.elements
        
        for(let i = 0; i<cartas.length; i++){
            document.write(
                "<article data-element='" + cartas[i].element +"' data-state='unflipped'>"
                + "<h3> Juego de memoria </h3>"
                + "<img src='" +cartas[i].source + "' alt='" + cartas[i].element+"'>"
                + "</article>"
            )
        }
    }

    addEventListeners(){
        const cartas = document.querySelectorAll('article');
        for(let i = 0; i<cartas.length;  i++){
            cartas[i].addEventListener('click', this.flipCard.bind(this,cartas[i], this));
        }
    }

    flipCard(carta,game){
        //Si la tarjeta pulsada por el usuario ya estaba revelada y formaba parte de una pareja ya
        //descubierta (atributo data-state a revealed), el método retorna y no hace nada más.
        if(carta.dataset.state === "revealed"){
            return
        }

        //Si la propiedad lockBoard del juego estaba al valor true, el método retorna y no hace
        //nada más.
        if(this.lockBoard === true){
            return
        }
        //Si la tarjeta pulsada por el usuario coincide con la tarjeta pulsada anteriormente como
        //primer elemento de la pareja actual (variable firstCard del juego), el método retorna y
        //no hace nada más.
        if(carta === this.firstCard)
        {
            return
        }
        //Modificar el atributo data-state de la tarjeta al valor flip para que la tarjeta se dé la
        //vuelta y se vea la imagen.
        
        
        if(this.hasFlippedCard === true){
            carta.dataset.state = "flip"
            this.secondCard = carta
            this.checkForMatch()
            
        }else{
            carta.dataset.state = "flip"
            this.hasFlippedCard= true
            this.firstCard = carta
        }

    }
}

