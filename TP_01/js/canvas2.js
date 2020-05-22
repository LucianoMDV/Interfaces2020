(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {

        //-------------------------------------> CANVAS ORIGINAL <-------------------------------------
        let c = document.querySelector("#canvasOriginal");
        let ctx = c.getContext("2d");
        let cWidth = c.width;
        let cHeight = c.height;
        //-------------------------------> /////////////////////////// <-------------------------------

        //-------------------------------------> CANVAS EDICION <-------------------------------------
        let cEdicion = document.querySelector("#canvasEdicion");
        let ctxEdicion = cEdicion.getContext("2d");
        //-------------------------------> /////////////////////////// <-------------------------------

        //---------------------------> subir una imagen al canvas ORIGINAL <---------------------------
        document.querySelector('#inputFile').addEventListener('change', e => {
            const ARCHIVO = document.querySelector('#inputFile').files[0];
            const BLOP = new FileReader();
            if (ARCHIVO) {
                BLOP.readAsDataURL(ARCHIVO);
            }
            BLOP.addEventListener("load", e => {
                let imagen = new Image();
                imagen.src = BLOP.result;
                imagen.onload = function() {
                    myDrawImageMrthod(imagen);
                };
            }, false);
        });
        //---------------------------> ////////////////////////////////// <----------------------------

        //2. Pintar una región rectangular de un color utilizando el Contexto de HTML5.
        //---------> x, y, ancho, alto <---------
        ctx.fillRect(220, 0, 100, 200); //automaticamente hace color negro
        //-----------------------------------> /////////////////// <-----------------------------------


        document.querySelector("#btnGrises").addEventListener("click", e => {
            // debugger;
            let imageData = ctx.getImageData(0, 0, cWidth, cHeight);
            let imageDataEditada = escalaGrises(imageData, cWidth, cHeight);
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });


        // //-----------------------------------> dibujar un cubo rojo <----------------------------------
        // let imgData = ctx.createImageData(100, 100); //crea una imagen de 100px ancho por 100px alto
        // for (let i = 0; i < imgData.data.length; i += 4) {
        //     imgData.data[i + 0] = 255;
        //     imgData.data[i + 1] = 0;
        //     imgData.data[i + 2] = 0;
        //     imgData.data[i + 3] = 255;
        // }
        // //-------------> imagen , x, y <---------
        // ctx.putImageData(imgData, 0, 0); //inserta el cubo rojo y lo coloca en la posicion x=0 y=0;
        // //-----------------------------------> //////////////////// <----------------------------------

        // let width = c.width;
        // let height = c.height;
        // let width = 100;
        // let height = 100;
        // let imageData = ctx.createImageData(width, height);

        // let imageData2 = ctx.createImageData(width, height);

        // let x = 110;
        // let y = 0;

        // let r = 255;
        // let g = 0;
        // let b = 255;
        // let a = 255;

        // drawRect(imageData, r, g, b, a);
        // ctx.putImageData(imageData, x, y);

        // drawRect2(imageData2, 0, 0, 0, a);
        // ctx.putImageData(imageData2, 330, y);

        // function drawRect(imageData, r, g, b, a) {
        //     for (let x = 0; x < imageData.width; x++) {
        //         for (let y = 0; y < imageData.height; y++) {
        //             let repartirColor = 255 / height;
        //             r = repartirColor * y;
        //             g = repartirColor * y;
        //             b = repartirColor * y;
        //             setPixel(imageData, x, y, r, g, b, a);
        //         }
        //     }
        // }

        // function drawRect2(imageData, r, g, b, a) {
        //     let repartirColor = 255 / (width / 2);
        //     for (let x = 0; x < imageData.width; x++) {
        //         if (x <= (width / 2)) {
        //             r = repartirColor * x;
        //             g = repartirColor * x;
        //             b = 0;
        //         } else {

        //         }
        //         for (let y = 0; y < imageData.height; y++) {
        //             setPixel(imageData, x, y, r, g, b, a);
        //         }
        //     }
        // }



        // let image1 = new Image();
        // let image2 = new Image();
        // let image3 = new Image();
        // image1.src = "imagen/casa.jpg";
        // image2.src = "imagen/imagen_400x200.jpg";
        // image3.src = "imagen/imagen_200x200.jpg";
        // image1.onload = function() {
        //     image2.onload = function() {
        //         image3.onload = function() {
        //             myDrawImageMrthod(image1, image2, image3);
        //         };
        //     };
        // };

        // function myDrawImageMrthod(image, image2, image3) {
        //     ctx.drawImage(image, 0, 0);
        //     let imageWidth = image.width; //400px
        //     let imageHeight = image.height; //400px
        //     ctx.drawImage(image2, 410, 0);
        //     let image2Width = image2.width; //400px
        //     let image2Height = image2.height; //200px
        //     ctx.drawImage(image3, 620, 0);
        //     let image3Width = image3.width; //200px
        //     let image3Height = image3.height; //200px
        //     // let imageWidth = 200;
        //     // let imageHeight = 200;

        //     // debugger;
        //     let imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
        //     ctx.putImageData(imageData, 0, 0);

        //     let imageData2 = ctx.getImageData(0, 0, image2Width, image2Height);
        //     let redimenImage = redimensionarEnX(imageData, imageData2, imageWidth, imageHeight);
        //     ctx.putImageData(redimenImage, 410, 0);

        //     let redimenImagGet = ctx.getImageData(410, 0, image2Width, image2Height);

        //     let imageData3 = ctx.getImageData(410, 0, image3Width, image3Height);
        //     let redimenImage2 = redimensionarEnY(redimenImagGet, imageData3, image2Width, image2Height);

        //     let redimenImag2Get = ctx.getImageData(0, 0, image3Width, image3Height);
        //     ctx.putImageData(redimenImag2Get, 620, 0);
        //     // console.log("RedimeImage: " + redimenImage);



        // }

        // redimensiona en el eje Y

        function escalaGrises(imagen, ancho, alto) {
            let algo = "";
            for (let x = 0; x < alto; x++) {
                for (let y = 0; y < ancho; y++) {
                    let arrayPixel = getPixel(imagen, x, y);
                    let promedioPixel = verificarMaxyMin(Math.floor((arrayPixel[0] + arrayPixel[1] + arrayPixel[2]) / 3));
                    let promPixelR = promedioPixel;
                    let promPixelG = promedioPixel;
                    let promPixelB = promedioPixel;
                    let promPixelA = 255;

                    setPixel(imagen, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
                }

            }
            return imagen;
        }

        //----------------------------------------> ACA! <----------------------------------------
        // let imagen1 = new Image();
        // imagen1.src = "imagen/casa.jpg";
        // imagen1.onload = function() {
        //     myDrawImageMrthod(imagen1);
        // };

        function myDrawImageMrthod(imagen) {
            ctx.drawImage(imagen, 0, 0);
            let imagenWidth = imagen.width; //400px
            let imagenHeight = imagen.height; //400px

            let imagenData = ctx.getImageData(0, 0, imagenWidth, imagenHeight);
            ctx.putImageData(imagenData, 0, 0);
        }

        function getPixel(imageData, x, y) {
            let index = (x + y * imageData.height) * 4;
            let r = imageData.data[index + 0];
            let g = imageData.data[index + 1];
            let b = imageData.data[index + 2];
            let a = imageData.data[index + 3];
            return [r, g, b, a];
        }

        function setPixel(imageData, x, y, r, g, b, a) {
            let index = (x + y * imageData.height) * 4;
            imageData.data[index + 0] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = a;
        }

        function verificarMaxyMin(promPixel) {
            if (promPixel > 255) {
                promPixel = 255;
            }
            if (promPixel < 0) {
                promPixel = 0;
            }
            return promPixel;
        }

    });
}());