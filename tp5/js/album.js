document.addEventListener("DOMContentLoaded",() => {
    let baseUrl = "http://localhost:8080"
    document.querySelectorAll(".artistaButtom").forEach(element => {
        element.addEventListener("click",function(){
        window.location.href = "artista.html";
    });
    })
    document.querySelector("#back").addEventListener("click",goBack);
    function goBack(){
        window.history.back();
    }
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("BtnModal");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

})