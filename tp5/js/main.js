document.addEventListener("DOMContentLoaded",() => {
    document.querySelectorAll(".albumArtist").forEach(element => {
        element.addEventListener("click",function(){
        window.location.href = "artista.html";
    });
    document.querySelector("#back").addEventListener("click",goBack);
    function goBack(){
        window.history.back();
    }
});
});
