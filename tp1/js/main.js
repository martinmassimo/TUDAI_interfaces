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
    document.querySelector("#brillo").addEventListener('change',ajustarBrillo);
    document.querySelector("#original").addEventListener('click',original);
    document.querySelector("#sepia").addEventListener('click',sepia);
    document.querySelector("#escalaGrises").addEventListener('click',escalaGrises);
    document.querySelector("#negativo").addEventListener('click',negativo);
    document.querySelector("#blur").addEventListener('click',blur);
    document.querySelector("#bordes").addEventListener('click',bordes);

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
                height = canvas.height;
                width = canvas.width;
            }
        }
    }
    function borrarLienzo(e){
        e.preventDefault();
        width = 900;
        height = 450;    
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0,0,width,height);
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
    // Funciones para filtros simples con matrices
    function original(){
        ctx.putImageData(ImageDataTemporal, 0, 0);
    }
    function ajustarBrillo (){
        let value = this.value/10;
        console.log(value);
        filtro([1, 0, 0, 0, 1, 0, 0, 0, 1, value, value, value]);
    }
    function escalaGrises(){
        filtro([0.2126, 0.2126, 0.2126, 0.7152, 0.7152, 0.7152, 0.0722, 0.0722, 0.0722, 0, 0, 0]);
    }
    function negativo(){
        filtro([-1, 0, 0, 0, -1, 0, 0, 0, -1, 255, 255, 255]);
    }
    function sepia(){
        filtro([0.393, 0.349, 0.272, 0.769, 0.686, 0.534, 0.189, 0.168, 0.131, 0, 0, 0]);
    }
    function filtro (matrix){
        var imageData = ctx.createImageData(width,height);
        var pxlData = imageData.data;
        for (var i = 0; i < ImageDataTemporal.data.length; i += 4){
          var r = ImageDataTemporal.data[i];
          var g = ImageDataTemporal.data[i + 1];
          var b = ImageDataTemporal.data[i + 2];
          pxlData[i]     = checkRange(matrix[0]*r + matrix[3]*g + matrix[6]*b + matrix[9]);
          pxlData[i + 1] = checkRange(matrix[1]*r + matrix[4]*g + matrix[7]*b + matrix[10]);
          pxlData[i + 2] = checkRange(matrix[2]*r + matrix[5]*g + matrix[8]*b + matrix[11]);
          pxlData[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
      }
      function checkRange(number){
          if (number>255){
              return 255
          }
          else if (number<0){
              return 0
          }
          else return number;
      }
    // Funciones para filtros avanzados con matrices de convoluciones
    function blur(){
        let weights = [
                    1/9,1/9,1/9,
                    1/9,1/9,1/9,
                    1/9,1/9,1/9
        ];
        convolucion(ImageDataTemporal,weights,1);
    }
    function bordes(){
        let weights = [
                    0,1,0,
                    1,-4,1,
                    0,1,0
        ];
        convolucion(ImageDataTemporal,weights,1);
    }
    function convolucion (imageData, weights, opaque) {
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side/2);
        var src = imageData.data;
        var sw = imageData.width;
        var sh = imageData.height;
        // pad output by the convolution matrix
        var w = sw;
        var h = sh;
        var output = ctx.createImageData(w, h);
        var dst = output.data;
        // go through the destination image pixels
        var alphaFac = opaque ? 1 : 0;
        for (var y=0; y<h; y++) {
          for (var x=0; x<w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y*w+x)*4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r=0, g=0, b=0, a=0;
            for (var cy=0; cy<side; cy++) {
              for (var cx=0; cx<side; cx++) {
                var scy = sy + cy - halfSide;
                var scx = sx + cx - halfSide;
                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                  var srcOff = (scy*sw+scx)*4;
                  var wt = weights[cy*side+cx];
                  r += src[srcOff] * wt;
                  g += src[srcOff+1] * wt;
                  b += src[srcOff+2] * wt;
                  a += src[srcOff+3] * wt;
                }
              }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
          }
        }
        ctx.putImageData(output, 0, 0);
      };
});


