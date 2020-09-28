class Ficha {
    constructor (posX,posY,radius,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.radius = radius;
        this.context = context;
        this.highlighted= false;
        this.strokeStyle = '#000000';
        this.highlightedStyle= '#CC0000';
    }
    getPosX (){
        return this.posX;
    }
    setPosX (posX){
        this.posX = posX;
    }
    getPosY (){
        return this.posY;
    }
    setPosY (posY){
        this.posY = posY;
    }
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
    }
    getFill (){
        return this.fill;
    }
    setFill (fill){
        this.fill = fill;
    }
    getContext (){
        return this.context;
    }
    setContext (context){
        this.context = context;
    }
    getHighlighted (){
        return this.highlighted;
    }
    setHighlithed(boolean){
        this.highlighted = boolean;
    }
    getHighlightedStyle (){
        return this.highlightedtyle;
    }
    setHighlithedtyle(boolean){
        this.highlightedtyle = boolean;
    }
    dibujarse (){
        if (this.highlighted){
            this.context.strokeStyle = this.highlightedStyle;
            this.context.lineWidth = 4;
        }
        else {
            this.context.strokeStyle = this.strokeStyle;
            this.context.lineWidth = 2;
        }
        this.context.fillStyle = this.fill;
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius,0, 2*Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }
    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}