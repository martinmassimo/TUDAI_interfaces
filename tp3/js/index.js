document.addEventListener("DOMContentLoaded",() => {
    window.addEventListener("scroll", parallax);

    function parallax(){
        let y = window.scrollY;
        document.querySelector("#capa1").style.opacity = 1-(y/500);
        document.querySelector("#capa2").style.opacity = 1-(y/500);
        if (y<350){
            document.querySelector("#countdown").style.opacity = (y/350);
        }
        else if ((y>350)&&(y<=750)){
            document.querySelector("#countdown").style.opacity = 1-((y-350)/250);
            document.querySelector("#actor1").style.opacity = ((y-400)/350);
            document.querySelector("#actor1").style.right = 60-(y-690)+"px";
            document.querySelector("#actor2").style.opacity = ((y-400)/350);
            document.querySelector("#actor2").style.top = 60-(y-690)+"px";
            document.querySelector("#actor3").style.opacity = ((y-400)/350);
            document.querySelector("#actor3").style.left = 60-(y-690)+"px";
        }
        else if ((y>750)&&(y<1100)) {
            document.querySelector("#actor1").style.opacity = 1-((y-750)/350);
            document.querySelector("#actor2").style.opacity = 1-((y-750)/350);
            document.querySelector("#actor3").style.opacity = 1-((y-750)/350);
            document.querySelector("#actor1").style.right = (y-750)+"px";
            document.querySelector("#actor2").style.top = -(y-750)+"px";
            document.querySelector("#actor3").style.left = (y-750)+"px";
            document.querySelector("#carousel").style.opacity = ((y-750)/500);
        }
        else if ((y>1100)&&(y<1300)){
            document.querySelector("#carousel").style.opacity = ((y-750)/500);

        }
        
        
        console.log(y);
    }
    setInterval(countDown,1000);
    function countDown(){
        let actual = new Date().getTime();
        let fecha = new Date("2020-12-10 21:00:00").getTime();
        let espera = fecha - actual;
        let dias = Math.floor(espera / (1000 * 60 * 60 * 24));
        let horas = Math.floor((espera % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((espera % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((espera % (1000 * 60)) / 1000);
        document.querySelector("#dias").innerHTML = dias;
        document.querySelector("#horas").innerHTML = horas;
        document.querySelector("#minutos").innerHTML = minutos;
        document.querySelector("#segundos").innerHTML = segundos; 
    }
})