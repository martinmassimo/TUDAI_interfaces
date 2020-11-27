document.addEventListener("DOMContentLoaded",() => {
    let page = home;
    page.addEventListener(onchange,cambiar)
    function cambiar(){
        alert("das");
    }


    setTimeout(quitLoader,3000);
    function quitLoader() {
        document.querySelector("#loader").classList.toggle("hidden");
        document.querySelector("header").classList.toggle("hidden");
        document.querySelector("#conteiner").classList.toggle("hidden");
        document.querySelector("#scroll").classList.toggle("hidden");
    }
})