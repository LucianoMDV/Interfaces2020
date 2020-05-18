(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {

        //-------------------------------------> CANVAS ORIGINAL <-------------------------------------
        let c = document.querySelector("#canvasOriginal");
        let ctx = c.getContext("2d");
        let cWidth = c.width;
        let cHeight = c.height;
        //-------------------------------------> /////////////// <-------------------------------------

        //-------------------------------------> CANVAS EDICION <--------------------------------------
        let cEdicion = document.querySelector("#canvasEdicion");
        let ctxEdicion = cEdicion.getContext("2d");
        let cWidthEdicion = cEdicion.width;
        let cHeightEdicion = cEdicion.height;
        //-------------------------------------> ////////////// <--------------------------------------

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

        //-----------------------------------> BOTONES QUE EDITAN <------------------------------------
        document.querySelector("#btnGrises").addEventListener("click", e => {
            let imageDataEditada = escalaGrises();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });

        //---------------------------------------> BOTON BLUR <----------------------------------------
        let rangoBlur = document.querySelector("#rangoBlur");
        rangoBlur.addEventListener("change", e => {
            document.querySelector("#rangoValor").innerHTML = rangoBlur.value;
        });

        document.querySelector("#btnBlur").addEventListener("click", e => {
            let rangoBlur = document.querySelector("#rangoBlur").value;
            let imagenOriginal = ctx.getImageData(0, 0, c.width, c.height); //capturo del CONTEXTO ORIGINAL
            let imageDataEditada = blur(imagenOriginal);
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
            if (rangoBlur > 1) {
                let imagen2 = ctxEdicion.getImageData(0, 0, cWidthEdicion, cHeightEdicion); //capturo del CAMVAS ORIGINAL
                for (let i = 0; i < rangoBlur; i++) {
                    let imageDataEditada = blur(imagen2);
                    ctxEdicion.putImageData(imageDataEditada, 0, 0);
                }
            }
        });
        //---------------------------------------> ////////// <----------------------------------------

        document.querySelector("#btnRetaurar").addEventListener("click", e => {
            let imagenOriginal = ctx.getImageData(0, 0, c.width, c.height); //capturo del CONTEXTO ORIGINAL
            ctxEdicion.putImageData(imagenOriginal, 0, 0);
        });

        document.querySelector("#btnSepia").addEventListener("click", e => {
            let imageDataEditada = escalaSepia();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });

        //--------------------------------------> BOTON BRILLO <---------------------------------------
        let rango = document.querySelector("#rangoBrillo");
        rango.addEventListener("change", e => {
            document.querySelector("#rangoBrilloValor").innerHTML = rango.value;
        });

        document.querySelector("#btnBrillo").addEventListener("click", e => {
            let rangoBrillo = document.querySelector("#rangoBrillo").value;
            let imageDataEditada = brillo(rangoBrillo);
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //--------------------------------------> //////////// <---------------------------------------

        //-----------------------------------> ////////////////// <------------------------------------

        //--------------------------------------> FUNCION BLUR <---------------------------------------
        function blur(imagen) {
            var matrizFiltro = [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ];
            return apFiltro(matrizFiltro, 9, imagen);
        }


        function apFiltro(filtro, n, imagen) {
            // if (imagen == "") {
            // let imagen = ctx.getImageData(0, 0, c.width, c.height); //capturo del CONTEXTO ORIGINAL
            // }

            for (let x = (0 + 1); x < (c.height - 1); x++) {
                for (let y = (0 + 1); y < (c.width - 1); y++) {
                    let pixel_RGBA_1_SupIzq = getPixel(imagen, x - 1, y - 1); //superior izquirda 1
                    let pixel_RGBA_2_Arriba = getPixel(imagen, x - 1, y); //arriba 2
                    let pixel_RGBA_3_SupDer = getPixel(imagen, x - 1, y + 1); //superior derecha 3
                    let pixel_RGBA_4_Izq = getPixel(imagen, x, y - 1); //izquierda 4
                    let pixel_RGBA_5_Centro = getPixel(imagen, x, y); // pixel a cambiar del medio 5
                    let pixel_RGBA_6_Der = getPixel(imagen, x, y + 1); // derecha 6
                    let pixel_RGBA_7_InfIzq = getPixel(imagen, x + 1, y - 1); // inferior izquierda 7
                    let pixel_RGBA_8_Abajo = getPixel(imagen, x + 1, y); // abajo 8
                    let pixel_RGBA_9_InfDer = getPixel(imagen, x + 1, y + 1); // inferior derecha 9

                    let r = Math.floor((
                        (pixel_RGBA_1_SupIzq[0] * filtro[0][0]) + (pixel_RGBA_2_Arriba[0] * filtro[0][1]) + (pixel_RGBA_3_SupDer[0] * filtro[0][2]) +
                        (pixel_RGBA_4_Izq[0] * filtro[1][0]) + (pixel_RGBA_5_Centro[0] * filtro[1][1]) + (pixel_RGBA_6_Der[0] * filtro[1][2]) +
                        (pixel_RGBA_7_InfIzq[0] * filtro[2][0]) + (pixel_RGBA_8_Abajo[0] * filtro[2][1]) + (pixel_RGBA_9_InfDer[0] * filtro[2][2])
                    ) / n);
                    let g = Math.floor((
                        (pixel_RGBA_1_SupIzq[1] * filtro[0][0]) + (pixel_RGBA_2_Arriba[1] * filtro[0][1]) + (pixel_RGBA_3_SupDer[1] * filtro[0][2]) +
                        (pixel_RGBA_4_Izq[1] * filtro[1][0]) + (pixel_RGBA_5_Centro[1] * filtro[1][1]) + (pixel_RGBA_6_Der[1] * filtro[1][2]) +
                        (pixel_RGBA_7_InfIzq[1] * filtro[2][0]) + (pixel_RGBA_8_Abajo[1] * filtro[2][1]) + (pixel_RGBA_9_InfDer[1] * filtro[2][2])
                    ) / n);
                    let b = Math.floor((
                        (pixel_RGBA_1_SupIzq[2] * filtro[0][0]) + (pixel_RGBA_2_Arriba[2] * filtro[0][1]) + (pixel_RGBA_3_SupDer[2] * filtro[0][2]) +
                        (pixel_RGBA_4_Izq[2] * filtro[1][0]) + (pixel_RGBA_5_Centro[2] * filtro[1][1]) + (pixel_RGBA_6_Der[2] * filtro[1][2]) +
                        (pixel_RGBA_7_InfIzq[2] * filtro[2][0]) + (pixel_RGBA_8_Abajo[2] * filtro[2][1]) + (pixel_RGBA_9_InfDer[2] * filtro[2][2])
                    ) / n);

                    setPixel(imagen, x, y, r, g, b, 255);
                }
            }
            ctxEdicion.putImageData(imagen, 0, 0);
            return imagen;
        }
        //--------------------------------------> //////////// <---------------------------------------

        //-------------------------------------> FUNCION GRISES <--------------------------------------
        function escalaGrises() {
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CAMVAS ORIGINAL
            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);
                    let promedioPixel = verificarMaxyMin(Math.floor((pixelRGBA[0] + pixelRGBA[1] + pixelRGBA[2]) / 3));
                    let promPixelR = promedioPixel;
                    let promPixelG = promedioPixel;
                    let promPixelB = promedioPixel;
                    let promPixelA = 255;
                    setPixel(imagenDeOriginal, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
                }
            }
            return imagenDeOriginal;
        }
        //-------------------------------------> ////////////// <--------------------------------------

        //-------------------------------------> FUNCION SEPIA <---------------------------------------
        function escalaSepia() {
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CAMVAS ORIGINAL
            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);
                    let promPixelR = (0.393 * pixelRGBA[0]) + (0.769 * pixelRGBA[1]) + (0.189 * pixelRGBA[2]);
                    let promPixelG = (0.349 * pixelRGBA[0]) + (0.686 * pixelRGBA[1]) + (0.168 * pixelRGBA[2]);
                    let promPixelB = (0.272 * pixelRGBA[0]) + (0.534 * pixelRGBA[1]) + (0.131 * pixelRGBA[2]);
                    let promPixelA = 255;
                    setPixel(imagenDeOriginal, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
                }
            }
            return imagenDeOriginal;
        }
        //-------------------------------------> ///////////// <---------------------------------------
        //-------------------------------------> FUNCION BRILLO <---------------------------------------
        function brillo(intensidad) {
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CAMVAS ORIGINAL
            // const BRILLO = 30;
            intensidad = 255 * (intensidad * 0.1);
            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);
                    // let promPixelR = (pixelRGBA[0] + BRILLO);
                    // let promPixelG = (pixelRGBA[1] + BRILLO);
                    // let promPixelB = (pixelRGBA[2] + BRILLO);
                    let promPixelR = verificarMaxyMin((pixelRGBA[0] + intensidad));
                    let promPixelG = verificarMaxyMin((pixelRGBA[1] + intensidad));
                    let promPixelB = verificarMaxyMin((pixelRGBA[2] + intensidad));
                    let promPixelA = 255;
                    setPixel(imagenDeOriginal, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
                }
            }
            return imagenDeOriginal;
        }
        //-------------------------------------> ///////////// <---------------------------------------

        function myDrawImageMrthod(imagen) {
            ctx.drawImage(imagen, 0, 0); //dibujo en el CAMVAS ORIGINAL
            //no hace falta pero lo dejo como referencia
            // let imagenWidth = imagen.width; //400px
            // let imagenHeight = imagen.height; //400px

            // let imagenData = ctx.getImageData(0, 0, imagenWidth, imagenHeight);
            // ctx.putImageData(imagenData, 0, 0);
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