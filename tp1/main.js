window.addEventListener("load",() => {
    
    // Canvas e iniciación de variables
    const canvas = document.querySelector("#myCanvas");
    let height = canvas.height;
    let width = canvas.width;
    const ctx = canvas.getContext("2d");
    let herramienta = 'lapiz';
    let color = "black";
    let lineWidth = 3;
    let dibujando = false;
    let ImageDataTemporal;
    // Eventos para lienzo
    document.querySelector("#cargarfoto").addEventListener('change', cargarFoto);
    document.querySelector("#blanco").addEventListener('click', borrarLienzo);
    document.querySelector("#descargar").addEventListener('click',descargar);
    // Eventos para herramientas
    canvas.addEventListener('mousedown', posicionInicial);
    canvas.addEventListener('mouseup', posicionFinal);
    canvas.addEventListener('mousemove', dibujar);
    document.querySelector("#goma").addEventListener('click',seleccionarGoma);
    document.querySelector("#lapiz").addEventListener('click',seleccionarLapiz);
    // Eventos para filtros 
    document.querySelector("#sepia").addEventListener('click',sepia);
    document.querySelector("#binarizacion").addEventListener('click',binarizacion);

    // Funciones para lienzo
    function cargarFoto(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;
            image.onload = function(){
                canvas.width = this.width;
                canvas.height = this.height;
                ctx.drawImage(image,0,0,canvas.width,canvas.height);
                ImageDataTemporal = ctx.getImageData(0,0,canvas.width,canvas.height);
            }
        }
    }
    function borrarLienzo(e){
        e.preventDefault();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0,0,width,height);
    }    
    function descargar () {
        var link = document.createElement('a');
        link.download = 'paint_pro_imagen.png';
        link.href = canvas.toDataURL();
        link.click();
    }
    // Funciones para herramientas
    function seleccionarLapiz(){
        herramienta = 'lapiz';
    }
    function seleccionarGoma(){
        herramienta = 'goma';
    }
    function posicionInicial(e){
        dibujando = true;
        dibujar(e);
    }
    function posicionFinal(){
        dibujando = false;
        ctx.beginPath();
    }
    function dibujar(e){
        if (!dibujando) return;
        let correccion = canvas.getBoundingClientRect();
        
        if (herramienta == "lapiz") {
            color = document.querySelector("#colorlapiz").value;
            ctx.strokeStyle = color;
            lineWidth = document.querySelector("#grosorlapiz").value;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.lineTo(Math.round(e.clientX-correccion.left),Math.round(e.clientY-correccion.top));
            ctx.moveTo(Math.round(e.clientX-correccion.left),Math.round(e.clientY-correccion.top));
            ctx.stroke();
        }
        else if (herramienta == "goma"){
            ctx.beginPath();
            lineWidth = document.querySelector("#grosorgoma").value;
            ctx.lineWidth = lineWidth;
            ctx.clearRect(Math.round(e.clientX-correccion.left)-(lineWidth/2),Math.round(e.clientY-correccion.top)-(lineWidth/2),lineWidth,lineWidth);
        }

        ctx.stroke();
    }
    // Funciones para filtros
    function binarizacion (){
        var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imgData.data;
        for(var i = 0; i < data.length; i += 4) {
        var grayscale= (data[i]+data[i+1]+data[i+2])/3;
        data[i]=grayscale;
        data[i+1]=grayscale;
        data[i+2]=grayscale;
        }
        ctx.putImageData(imgData,0,0);
    } 
});


