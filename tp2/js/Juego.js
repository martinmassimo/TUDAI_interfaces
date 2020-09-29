class Juego{
    
    constructor (canvas,context){
        this.canvas = canvas;
        this.context = context;
        this.jugadorTurno = null
        this.radioFicha = 34;
        this.utimaFichaClickeada = null;
        this.lastPositionXFicha = null;
        this.lastPositionYFicha = null;
        this.jugador1 = null;
        this.jugador2 = null;
        this.totalTime = null;
        this.isMouseDown = false;
        
    }
    // Inicializa variables e invoca metodos de crear fichas y renderizar (fichas y tablero)
    // para comenzar el juego
    startGame(){
        this.tablero = new Tablero(this.context,this.radioFicha);;
        this.jugador1 = new Jugador('#4CAF50');
        this.jugador2 = new Jugador('#FFEB3B');
        this.jugadores = []
        this.jugadores.push(this.jugador1);
        this.jugadores.push(this.jugador2);
        this.jugador1.swichTurno();
        this.jugadorTurno = this.jugador1;
        this.totalTime = 30;
        this.crearFichas();
        this.draw();
    }
    // Crea las fichas de cada jugador con colores distintos, en sus respectivas posiciones y se las asigna a cada uno
    crearFichas(){
        for (let i=0;i<7;i++){
            let delta = this.radioFicha*2;
            this.jugador1.addFicha(new Ficha(60,150+i*delta,this.radioFicha,this.jugador1.getColor(),this.context));
            this.jugador1.addFicha(new Ficha(60+delta,150+i*delta,this.radioFicha,this.jugador1.getColor(),this.context));
            this.jugador1.addFicha(new Ficha(60+delta*2,150+i*delta,this.radioFicha,this.jugador1.getColor(),this.context));
            this.jugador2.addFicha(new Ficha(820,150+i*delta,this.radioFicha,this.jugador2.getColor(),this.context));
            this.jugador2.addFicha(new Ficha(820+delta,150+i*delta,this.radioFicha,this.jugador2.getColor(),this.context));
            this.jugador2.addFicha(new Ficha(820+delta*2,150+i*delta,this.radioFicha,this.jugador2.getColor(),this.context));
        }
    }
    // cambia el turno del jugador y retorna el jugador de turno actual
    // adicionalmente hace visible el indicador visual que indica en pantalla quien es
    swichTurno(){
        let jugador = null;
        this.jugadores.forEach(j =>{
            j.swichTurno();
            if (j.isHisTurn()) jugador = j
        });
        document.querySelector("#player2").classList.toggle('invisible');
        document.querySelector("#player1").classList.toggle('invisible');
        this.jugadorTurno = jugador
    }
    haveWinner(){
        
    }
    // Renderiza las fichas (método local) y el tablero
    draw(){
        this.dibujarFichas();
        this.tablero.dibujarse();
    }
    // Renderiza las fichas de todos los jugadores
    dibujarFichas(){
        this.clearCanvas('#FFFFFF');
        this.jugadores.forEach(jugador =>
            jugador.drawFichas()
        )
    }
    // Limpiar lienzo de canvas
    clearCanvas(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        if (this.utimaFichaClickeada != null) {
            this.utimaFichaClickeada.setHighlithed(false);
            this.utimaFichaClickeada = null;
        }
    
        let fichaClickeada = this.findClickedFicha(event.layerX, event.layerY);
        if (fichaClickeada != null) {
            fichaClickeada.setHighlithed(true);
            this.utimaFichaClickeada = fichaClickeada;
            this.lastPositionXFicha = this.utimaFichaClickeada.getPosX();
            this.lastPositionYFicha = this.utimaFichaClickeada.getPosY();
        }
        this.draw();
    }
    findClickedFicha(x, y) {
        let ficha = null;
        this.jugadores.forEach(jugador =>{
            if (jugador.isHisTurn()){
                ficha = jugador.getFichaPointedInside(x,y);
            }
        })
        return ficha;
    }
    onMouseMoved(event) {        
        if (this.isMouseDown && this.utimaFichaClickeada != null) {
            this.utimaFichaClickeada.setPosition(event.layerX, event.layerY);
            this.draw();
        }
    }
    onMouseUp(event) {
        this.isMouseDown = false;

        if ((this.turnoValido())&&(this.movimientoValido(event.layerX,event.layerY))){
            let column = this.tablero.getColumnSelected(event.layerX)
            this.tablero.movimientoFicha(this.utimaFichaClickeada,column);
            
            if (!this.tablero.isWinner(this.jugadorTurno,this.utimaFichaClickeada,column)){
                this.swichTurno();
                this.totalTime = 30;
            }
            else {
                document.querySelector("#winner").classList.toggle('invisible');
                document.querySelector("#timmer").classList.toggle('invisible');
                document.querySelector("#jugador").innerHTML = this.jugadores.indexOf(this.jugadorTurno)+1;
                this.draw();
                return true;
            }
        }
        else if (this.utimaFichaClickeada!= null){
            this.utimaFichaClickeada.setPosition(this.lastPositionXFicha,this.lastPositionYFicha);
        }
        if (this.utimaFichaClickeada!= null){
            this.utimaFichaClickeada.setHighlithed(false);
        }   
        this.draw();
    }
    turnoValido(){
        return ((this.jugadorTurno.isHisTurn())&&(this.jugadorTurno.esSuFicha(this.utimaFichaClickeada)))
    }
    movimientoValido(x,y){
        return ((x>250)&&(x<736)&&(y<196)&&this.tablero.getColumnSelected(x).isNotFull())
    }
}