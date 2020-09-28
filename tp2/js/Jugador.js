class Jugador {
    constructor (color){
        this.color= color;
        // this.nombre = nombre;
        this.turno = false;
        this.fichas = [];
    }
    getPosNombre (){
        return this.posX;
    }
    setPosNombre (nombre){
        this.nombre = nombre;
    }
    getColor (){
        return this.color;
    }
    setColor (color){
        this.color = color;
    }
    isHisTurn (){
        return this.turno;
    }
    swichTurno (){
        this.turno = !this.turno;
    }
    addFicha (ficha){
        this.fichas.push(ficha);
    }
    getFichas (){
        return this.fichas;
    }
    getFichaPointedInside(x,y){
        let f = null;
        this.fichas.forEach(ficha =>{
            if (ficha.isPointInside(x, y)){
                f = ficha;
            }
        })
        return f;
    }
    esSuFicha(ficha){
        return this.fichas.includes(ficha);
    }
}