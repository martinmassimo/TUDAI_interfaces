document.addEventListener("DOMContentLoaded",() => {
    window.addEventListener("scroll", parallax);
    function parallax(){
        let y = window.scrollY;
        
        console.log(y);
    }
    // Acordeon
    const details = document.querySelectorAll("details");
    // Add the onclick listeners.
    details.forEach((targetDetail) => {
      targetDetail.addEventListener("click", () => {
        // Close all the details that are not targetDetail.
        details.forEach((detail) => {
          if (detail !== targetDetail) {
            detail.removeAttribute("open");
          }
        });
      });
    });
})