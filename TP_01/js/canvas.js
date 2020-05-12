(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        //-----------------------------------------> CANVAS <------------------------------------------

        //-----------------------------------> dibujar fondo negro <-----------------------------------
        let c = document.querySelector("#canvasOriginal");
        let ctx = c.getContext("2d");
        //-----------------------------------> /////////////////// <-----------------------------------git

        //---------> x, y, ancho, alto <---------
        // ctx.fillRect(220, 0, 100, 100); //automaticamente hace color negro
        //-----------------------------------> /////////////////// <-----------------------------------

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

        //redimensiona en el eje Y
        // function redimensionarEnY(imagen, imagen2, ancho, alto) {
        //     // debugger;
        //     let auxImagen = imagen2;
        //     for (let x = 0; x < alto; x += 2) {
        //         for (let y = 0; y < ancho; y++) {
        //             if (((x + 1) < ancho) && ((y + 1) < alto)) {
        //                 let array1 = getPixel(imagen, x, y);
        //                 let array2 = getPixel(imagen, x + 1, y);
        //                 // if ((y % 2) == 0) {

        //                 // }
        //                 let promPixelR = verificarMaxyMin(Math.floor((array1[0] + array2[0]) / 2));
        //                 let promPixelG = verificarMaxyMin(Math.floor((array1[1] + array2[1]) / 2));
        //                 let promPixelB = verificarMaxyMin(Math.floor((array1[2] + array2[2]) / 2));
        //                 let promPixelA = verificarMaxyMin(Math.floor((array1[3] + array2[3]) / 2));

        //                 setPixel(auxImagen, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
        //                 // }
        //             }

        //         }

        //     }
        // }

        //     //redimensiona en el eje X
        //     function redimensionarEnX(imagen, imagen2, ancho, alto) {
        //         let auxImagen = imagen2;
        //         for (let x = 0; x < alto; x++) {
        //             for (let y = 0; y < ancho; y += 2) {
        //                 if (((x + 1) < ancho) && ((y + 1) < alto)) {
        //                     let array1 = getPixel(imagen, x, y); //0,0 ; 0,2
        //                     let array2 = getPixel(imagen, x, y + 1); //0,1; 0,4

        //                     // if (array1[0] != array2[0] && array1[1] != array2[1] && array1[2] != array2[2] && array1[3] != array2[3]) {
        //                     //     console.log(array1);
        //                     //     console.log(array2);
        //                     // }
        //                     // if ((y % 2) == 0) {

        //                     // }
        //                     let promPixelR = verificarMaxyMin(Math.floor((array1[0] + array2[0]) / 2));
        //                     let promPixelG = verificarMaxyMin(Math.floor((array1[1] + array2[1]) / 2));
        //                     let promPixelB = verificarMaxyMin(Math.floor((array1[2] + array2[2]) / 2));
        //                     let promPixelA = verificarMaxyMin(Math.floor((array1[3] + array2[3]) / 2));

        //                     setPixel(auxImagen, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
        //                     // }
        //                 }

        //             }

        //         }
        //         console.log(getPixel(imagen, 0, 0));
        //         // console.log(imagen);
        //         return auxImagen;
        //         // let image2 = new Image(200, 200);
        //         // ctx.drawImage(image2, 0, 120);
        //         // let imageData2 = ctx.getImageData(0, 0, 200, 200);
        //         // console.log(imageData2);
        //         // ctx.putImageData(imageData2, 0, 0);


        //     }

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

            // debugger;
            let imagenData = ctx.getImageData(0, 0, imagenWidth, imagenHeight);
            ctx.putImageData(imagenData, 0, 0);
        }

        // function verificarMaxyMin(promPixel) {
        //     if (promPixel > 255) {
        //         promPixel = 255;
        //     }
        //     if (promPixel < 0) {
        //         promPixel = 0;
        //     }
        //     return promPixel;
        // }

        // function getPixel(imageData, x, y) {
        //     let index = (x + y * imageData.height) * 4;
        //     let r = imageData.data[index + 0];
        //     let g = imageData.data[index + 1];
        //     let b = imageData.data[index + 2];
        //     let a = imageData.data[index + 3];
        //     return [r, g, b, a];
        // }

        // function setPixel(imageData, x, y, r, g, b, a) {
        //     let index = (x + y * imageData.height) * 4;
        //     imageData.data[index + 0] = r;
        //     imageData.data[index + 1] = g;
        //     imageData.data[index + 2] = b;
        //     imageData.data[index + 3] = a;
        // }

    });
}());