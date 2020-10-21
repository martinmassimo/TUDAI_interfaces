document.addEventListener("DOMContentLoaded",() => {
    document.querySelector("#enviar").addEventListener("click",function(){
        event.preventDefault();
        document.querySelector("#enviar").classList.toggle("enviando");
    })
})