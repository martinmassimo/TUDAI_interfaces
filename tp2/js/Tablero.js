class Tablero{
    
    constructor (context,radioFicha){
        this.context = context;
        this.columns = [];
        for (let i=0;i<=7;i++){
            this.columns.push(new Columna(260+radioFicha*2*i,260+radioFicha*2+radioFicha*i*2-1,radioFicha));
        }
        this.marco = new Image();
        this.marco.src = "img/tablero.png";
        this.marco.onload = () => 
        this.context.drawImage(this.marco,250,169);
    }
    
    movimientoFicha (ficha,column){
        column.addFicha(ficha);
    }
    getColumnSelected(x){
        let c = null;
        this.columns.forEach(column =>{
            if (column.isPointInside(x)){
                c = column;
            }
        })
        return c;
    }
    dibujarse(){
        this.context.drawImage(this.marco,250,169);
    }
    isWinner(jugador,ficha,column){
        let indexCol = this.columns.indexOf(column);
        let indexFil = column.fichas.indexOf(ficha);
        return (this.checkHorizontal(jugador,indexFil))||(this.checkVertical(jugador,indexCol))||(this.checkDiagonal1(jugador,indexCol,indexFil))||(this.checkDiagonal2(jugador,indexCol,indexFil))
    }
    checkHorizontal(jugador,indexFil){
        let position = 0;
        let score = 0;
        let win = false;
        while((!win)&&(position<7)){
            if (jugador.esSuFicha(this.columns[position].getFichas()[indexFil])){
                score++;
                if (score==4){
                    win =  true;
                }
            }
            else{
                score = 0;
            }
            position++;
        }
        return win;
    }
    checkVertical(jugador,indexCol){
        let position = 0;
        let score = 0;
        let win = false;
        while((!win)&&(position<6)){
            if (jugador.esSuFicha(this.columns[indexCol].getFichas()[position])){
                score++;
                if (score==4){
                    win =  true;
                }
            }
            else{
                score = 0;
            }
            position++;
        }
        return win;
    }
    checkDiagonal1(jugador,indexCol,indexFil){
        let menor = Math.min(indexCol,indexFil);
        indexCol -= menor;
        indexFil -= menor;
        let score = 0;
        let win = false;
        while((!win)&&(indexCol<7)&&(indexFil<6)){
            if (jugador.esSuFicha(this.columns[indexCol].getFichas()[indexFil])){
                score++;
                if (score==4){
                    win =  true;
                }
            }
            else{
                score = 0;
            }
            indexCol++;
            indexFil++;
        }
        return win;
    }
    checkDiagonal2(jugador,indexCol,indexFil){
        let menor = Math.min(5-indexFil,indexCol);
        indexCol -= menor;
        indexFil += menor;
        let score = 0;
        let win = false;
        while((!win)&&(indexCol<7)&&(indexFil>=0)){
            if (jugador.esSuFicha(this.columns[indexCol].getFichas()[indexFil])){
                score++;
                if (score==4){
                    win =  true;
                }
            }
            else{
                score = 0;
            }
            indexCol++;
            indexFil--;
        }
        return win;
    }
}