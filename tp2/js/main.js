window.addEventListener("load",() => {
    // Canvas e iniciación de variables y eventos generales
    document.querySelector("#restart").addEventListener("click",restartGame);
    const canvas = document.querySelector("#myCanvas");
    const context = canvas.getContext("2d");    
    let juego = new Juego (canvas,context)
    $("#myModal").modal('show');
    document.querySelector("#play").addEventListener("click",start);
    // Inicialización del Juego, invoca los listener sobre el canvas y activa el temporizador
    function start(){
        juego.startGame();
        addEventListeners();
        updateClock();
    }
    // Reinicia y sobreescribe variables para reiniciar el juego, oculta ganador y hace visible el timmer nuevamente
    function restartGame(){
            juego.startGame();
            addEventListeners();
            document.querySelector("#winner").classList.add('invisible');
            document.querySelector("#timmer").classList.remove('invisible');
    }
    // Timmer para jugar
    function updateClock() {
        document.querySelector("#countDown").innerHTML = juego.totalTime;
        if(juego.totalTime==0){
            juego.swichTurno();
            juego.totalTime = 30;
        }
        else{
            juego.totalTime-=1;
        }
        setTimeout(updateClock,1000);
    }
    // Eventos sobre el mouse en el canvas
    function addEventListeners(){
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMoved, false);
    }
    function removeEventListeners(){
        canvas.removeEventListener('mousedown', onMouseDown, false);
        canvas.removeEventListener('mouseup', onMouseUp, false);
        canvas.removeEventListener('mousemove', onMouseMoved, false);
    }
    // Funciones triggers de eventos en el canvas que invocan a su implementación en el juego
    function onMouseDown(event) {
        juego.onMouseDown(event);
    }
    function onMouseMoved(event) {        
        juego.onMouseMoved(event);
    }
    function onMouseUp(event) {
        let haveWinner = juego.onMouseUp(event);
        if (haveWinner) removeEventListeners();
    }
});


