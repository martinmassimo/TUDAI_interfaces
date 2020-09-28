class Columna{
    
    constructor (startDropZone,endDropZone,radioFicha){
        this.radioFicha = radioFicha;
        this.startDropZone = startDropZone;
        this.endDropZone = endDropZone;
        this.positionDrawX = this.startDropZone+this.radioFicha;
        this.fichas = [];
    }
    
    getFichas(){
        return this.fichas;
    }
    addFicha (ficha){
        this.fichas.push(ficha);
        let positionDrawY = 600-15-34-this.fichas.indexOf(ficha)*this.radioFicha*2;
        ficha.setPosition(this.positionDrawX,positionDrawY);
    }

    isPointInside(x){
        return (this.startDropZone<=x)&&(this.endDropZone>=x);
    }
    dibujarse(){
        this.context.drawImage(this.marco,250,169);
    }
    isNotFull(){
        return this.fichas.length<6;
    }
}