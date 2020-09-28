window.addEventListener("load",() => {
    // Canvas e iniciación de variables
    const canvas = document.querySelector("#myCanvas");
    const ctx = canvas.getContext("2d");    
    const radioFicha = 34;
    let isMouseDown = false;
    let utimaFichaClickeada = null;
    let lastPositionXFicha = null;
    let lastPositionYFicha = null;
    let tablero = null;
    let jugadores = []
    let jugador1 = null;
    let jugador2 = null;
    let jugadorTurno = jugador1;
    let totalTime = null;
    // Funciones iniciales
    startGame();
    document.querySelector("#restart").addEventListener("click",startGame);
    // Timmer para jugar
    function updateClock() {
        document.querySelector("#countDown").innerHTML = totalTime;
        if(totalTime==0){
            swichTurno();
            totalTime = 30;
        }
        else{
            totalTime-=1;
        }
        setTimeout(updateClock,1000);
    }
    // Funciones
    function startGame(){
        tablero = new Tablero(ctx,radioFicha);
        jugadores = [];
        jugador1 = new Jugador('#4CAF50');
        jugador2 = new Jugador('#FFEB3B');
        jugadores.push(jugador1);
        jugadores.push(jugador2);
        jugador1.swichTurno();
        jugadorTurno = jugador1;
        crearFichas();
        tablero.dibujarse();
        dibujarFichas();
        totalTime = 30;
        updateClock();
    }
    function crearFichas(){
        for (let i=0;i<7;i++){
            let delta = radioFicha*2;
            jugador1.addFicha(new Ficha(60,150+i*delta,radioFicha,jugador1.getColor(),ctx));
            jugador1.addFicha(new Ficha(60+delta,150+i*delta,radioFicha,jugador1.getColor(),ctx));
            jugador1.addFicha(new Ficha(60+delta*2,150+i*delta,radioFicha,jugador1.getColor(),ctx));
            jugador2.addFicha(new Ficha(820,150+i*delta,radioFicha,jugador2.getColor(),ctx));
            jugador2.addFicha(new Ficha(820+delta,150+i*delta,radioFicha,jugador2.getColor(),ctx));
            jugador2.addFicha(new Ficha(820+delta*2,150+i*delta,radioFicha,jugador2.getColor(),ctx));
        }
    }
    function dibujarFichas(){
        clearCanvas('#FFFFFF',canvas);
        jugadores.forEach(jugador =>
            jugador.getFichas().forEach(ficha =>
                ficha.dibujarse()
                )
            );
        tablero.dibujarse();
    }
    // Funciones para lienzo
    function clearCanvas(color, canvas) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // Eventos para draggear fichas
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false);
    // Funciones para draggear fichas
    function onMouseDown(event) {
        isMouseDown = true;
        if (utimaFichaClickeada != null) {
            utimaFichaClickeada.setHighlithed(false);
            utimaFichaClickeada = null;
        }
    
        let fichaClickeada = findClickedFicha(event.layerX, event.layerY);
        if (fichaClickeada != null) {
            fichaClickeada.setHighlithed(true);
            utimaFichaClickeada = fichaClickeada;
            lastPositionXFicha = utimaFichaClickeada.getPosX();
            lastPositionYFicha = utimaFichaClickeada.getPosY();
        }
    
        dibujarFichas();
    }
    function findClickedFicha(x, y) {
        let ficha = null;
        jugadores.forEach(jugador =>{
            if (jugador.isHisTurn()){
                ficha = jugador.getFichaPointedInside(x,y);
            }
        })
        return ficha;
    }
    function onMouseMoved(event) {        
        if (isMouseDown && utimaFichaClickeada != null) {
            utimaFichaClickeada.setPosition(event.layerX, event.layerY);
            dibujarFichas();
        }
    }
    function onMouseUp(event) {
        isMouseDown = false;

        if ((turnoValido())&&(movimientoValido(event.layerX,event.layerY))){
            let column = tablero.getColumnSelected(event.layerX)
            tablero.movimientoFicha(utimaFichaClickeada,column);
            if (!tablero.isWinner(jugadorTurno,utimaFichaClickeada,column)){
                swichTurno();
                totalTime = 30;
            }
            else {
                document.querySelector("#winner").classList.toggle('invisible');
                document.querySelector("#jugador").innerHTML = jugadores.indexOf(jugadorTurno)+1;
                document.querySelector("#timmer").classList.toggle('invisible');
            }
        }
        else if (utimaFichaClickeada!= null){
            utimaFichaClickeada.setPosition(lastPositionXFicha,lastPositionYFicha);
        }
        if (utimaFichaClickeada!= null){
            utimaFichaClickeada.setHighlithed(false);
        }   
        dibujarFichas();
    }
    function turnoValido(){
        return ((jugadorTurno.isHisTurn())&&(jugadorTurno.esSuFicha(utimaFichaClickeada)))
    }
    function movimientoValido(x,y){
        return ((x>250)&&(x<736)&&(y<196)&&tablero.getColumnSelected(x).isNotFull())
    }
    
    function swichTurno(){
        let jugador = null;
        jugadores.forEach(j =>{
            j.swichTurno();
            if (j.isHisTurn()){
                jugador = j;
            }
        });
        document.querySelector("#player2").classList.toggle('invisible');
        document.querySelector("#player1").classList.toggle('invisible');
        jugadorTurno = jugador
    }
});


