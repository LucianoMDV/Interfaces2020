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

        //---------------------------------------> MOUSE DOWN <----------------------------------------
        let click;
        let lapiz = document.querySelector("#btnLapiz");
        lapiz.addEventListener("click", e => {
            goma.classList.remove("active");
            lapiz.className += " active";
            dibujarLinea("lapiz");
        });

        let goma = document.querySelector("#btnGoma");
        goma.addEventListener("click", e => {
            lapiz.classList.remove("active");
            goma.className += " active";
            dibujarLinea("goma");
        });

        function dibujarLinea(queEs) {
            click = false;
            cEdicion.addEventListener("mousedown", e => { //presiono el click y empiezo a querer hacer algo
                ctxEdicion.beginPath();
                click = true;
            });

            cEdicion.addEventListener("mousemove", e => { //muevo el mouse y hace una linea
                if (click == true) {
                    dibujar(e, queEs);
                }
            });

            cEdicion.addEventListener("mouseup", e => { //suelto el click deja de dibujar
                click = false;
                // ctxEdicion.closePath();
                ctx.closePath();
            });

            function dibujar(e, queEs) {
                let x = e.layerX;
                let y = e.layerY;

                line(x, y, e, queEs);
            }

            function line(x, y, e, queEs) {
                // console.log(e);
                // console.log("X: " + x + " Y: " + y);
                // let r = 0;
                // let g = 0;
                // let b = 0;
                // let a = 255;
                // let imagenEdicion = ctxEdicion.getImageData(0, 0, cWidthEdicion, cHeightEdicion); //capturo del CONTEXTO ORIGINAL
                // setPixel(imagenEdicion, x, y, r, g, b, a);

                // ctxEdicion.moveTo(antesX, antesY); //0, 0
                ctxEdicion.lineWidth = 10;
                let color;
                if (queEs == "lapiz") {
                    color = "black";
                    // ctxEdicion.strokeStyle = "black";
                    // ctxEdicion.strokeStyle = "#FFFFFF";

                    // ctxEdicion.lineTo(x, y); // 200, 300
                    // ctxEdicion.stroke();
                } else if (queEs == "goma") {
                    color = "white";
                    // ctxEdicion.strokeStyle = "#FFFFFF";
                    // ctxEdicion.clearRect(x, y, 10, 10);
                }
                if (click) {
                    ctxEdicion.strokeStyle = color;
                    ctxEdicion.lineTo(x, y); // 200, 300
                    ctxEdicion.stroke();
                }
            }
        }

        //---------------------------------------> ////////// <----------------------------------------

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

        //-------------------------------------> BOTONES QUE EDITAN <--------------------------------------

        //--------------------------------------> BOTON GRISES <---------------------------------------
        document.querySelector("#btnGrises").addEventListener("click", e => {
            let imageDataEditada = escalaGrises();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //--------------------------------------> //////////// <---------------------------------------

        //--------------------------------------> BOTON GUARDAR <---------------------------------------
        let guardar = document.querySelector("#btnGuardar");
        guardar.addEventListener("click", e => {
            let dir = cEdicion.toDataURL('image/jpg');
            guardar.href = dir;
        });
        //--------------------------------------> //////////// <---------------------------------------

        //-----------------------> BOTON LIMPIAR <--------------------------------------
        document.querySelector("#btnLimpiar").addEventListener("click", e => {
            let imageDataEditada = limpiar();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //-------------------------------------> ////////////// <--------------------------------------

        //-------------------------------------> BOTON NEGATIVO <--------------------------------------
        document.querySelector("#btnNegativo").addEventListener("click", e => {
            let imageDataEditada = negativo();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //-------------------------------------> ////////////// <--------------------------------------

        //-------------------------------------> BOTON BINARIZACION <--------------------------------------
        document.querySelector("#btnBinario").addEventListener("click", e => {
            let imageDataEditada = binarizacion();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //-------------------------------------> ////////////// <--------------------------------------

        //---------------------------------> BOTON SATURACION <----------------------------------
        let rangoSaturacion = document.querySelector("#rangoSaturacion");
        rangoSaturacion.addEventListener("change", e => {
            document.querySelector("#rangoSaturacionValor").innerHTML = rangoSaturacion.value;
        });

        document.querySelector("#btnSaturacion").addEventListener("click", e => {
            let rangoSaturacion = parseInt(document.querySelector("#rangoSaturacion").value);

            // rangoSaturacion = rangoSaturacion * 10;
            // let contraste = -250;
            // let imageDataEditada = saturacion2(rangoSaturacion);

            rangoSaturacion = rangoSaturacion * 0.1;
            let imageDataEditada = saturacion(rangoSaturacion);
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //---------------------------------> ////////////////////// <----------------------------------

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

        //-------------------------------------> BOTON RESTAURAR <-------------------------------------
        document.querySelector("#btnRetaurar").addEventListener("click", e => {
            let imagenOriginal = ctx.getImageData(0, 0, c.width, c.height); //capturo del CONTEXTO ORIGINAL
            ctxEdicion.putImageData(imagenOriginal, 0, 0);
        });
        //-------------------------------------> /////////////// <-------------------------------------

        //---------------------------------------> BOTON SEPIA <---------------------------------------
        document.querySelector("#btnSepia").addEventListener("click", e => {
            let imageDataEditada = escalaSepia();
            ctxEdicion.putImageData(imageDataEditada, 0, 0);
        });
        //---------------------------------------> /////////// <---------------------------------------

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

        //-------------------------------------> ////////////////// <--------------------------------------

        //--------------------------------------> FUNCION BLUR <---------------------------------------
        function blur(imagen) {
            let matrizFiltro = [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ];
            return apFiltro(matrizFiltro, 9, imagen);
        }


        function apFiltro(filtro, n, imagen) {

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

        //------------------------------------> FUNCION NEGATIVO <-------------------------------------
        function negativo() {
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CONTEXTO ORIGINAL
            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);
                    let promPixelR = 255 - pixelRGBA[0];
                    let promPixelG = 255 - pixelRGBA[1];
                    let promPixelB = 255 - pixelRGBA[2];
                    let promPixelA = 255;
                    setPixel(imagenDeOriginal, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
                }
            }
            return imagenDeOriginal;
        }
        //-------------------------------------> ////////////// <--------------------------------------

        //------------------------------------> FUNCION LIMPIAR <-------------------------------------
        function limpiar() {
            let imagenEdicion = ctxEdicion.getImageData(0, 0, cWidth, cHeight); //capturo del CONTEXTO ORIGINAL
            for (let x = 0; x < cHeightEdicion; x++) {
                for (let y = 0; y < cWidthEdicion; y++) {
                    let promPixelR = 255;
                    let promPixelG = 255;
                    let promPixelB = 255;
                    let promPixelA = 255;
                    setPixel(imagenEdicion, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
                }
            }
            return imagenEdicion;
        }
        //-------------------------------------> ////////////// <--------------------------------------

        //----------------------------------> FUNCION BINARIZACION <-----------------------------------
        function binarizacion() {
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CONTEXTO ORIGINAL
            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);
                    let promedioPixel = verificarMaxyMin(Math.floor((pixelRGBA[0] + pixelRGBA[1] + pixelRGBA[2]) / 3));
                    let blanco_O_NegroPixel = comprobarBlanco_O_Negro(promedioPixel);
                    let pixelR = blanco_O_NegroPixel;
                    let pixelG = blanco_O_NegroPixel;
                    let pixelB = blanco_O_NegroPixel;
                    let pixelA = 255;
                    setPixel(imagenDeOriginal, x, y, pixelR, pixelG, pixelB, pixelA);
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

        //--------------------------------> FUNCION BLANCO O NEGRO <-----------------------------------
        function comprobarBlanco_O_Negro(pixel) {
            // debugger;
            if ((pixel > 127) && (pixel <= 255)) {
                return 255;
            } else if ((pixel >= 0) && (pixel <= 127)) {
                return 0;
            }
        }
        //--------------------------------> ////////////////////// <-----------------------------------

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

        function saturacion(saturacion) {
            console.log(saturacion);
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CAMVAS ORIGINAL
            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);

                    let hsv = rgbToHsv(pixelRGBA[0], pixelRGBA[1], pixelRGBA[2]);
                    let rgb = HSVtoRGB(hsv[0], (hsv[1] + saturacion), hsv[2]);
                    // debugger;
                    let a = 255;

                    setPixel(imagenDeOriginal, x, y, rgb[0], rgb[1], rgb[2], a);
                }
            }
            return imagenDeOriginal;

        }

        function saturacion2(contraste) {
            let imagenDeOriginal = ctx.getImageData(0, 0, cWidth, cHeight); //capturo del CAMVAS ORIGINAL
            // let C = 100;
            let FACTOR = (259 * (contraste + 255)) / (255 * (259 - contraste));

            for (let x = 0; x < cHeight; x++) {
                for (let y = 0; y < cWidth; y++) {
                    let pixelRGBA = getPixel(imagenDeOriginal, x, y);
                    let r = FACTOR * (pixelRGBA[0] - 128) + 128;
                    let g = FACTOR * (pixelRGBA[1] - 128) + 128;
                    let b = FACTOR * (pixelRGBA[2] - 128) + 128;
                    let a = 255;

                    setPixel(imagenDeOriginal, x, y, r, g, b, a);
                }
            }
            return imagenDeOriginal;

        }

        function rgbToHsv(r, g, b) {
            var h;
            var s;
            var v;

            var maxColor = Math.max(r, g, b);
            var minColor = Math.min(r, g, b);
            var delta = maxColor - minColor;

            // Calculate hue
            // To simplify the formula, we use 0-6 range.
            if (delta == 0) {
                h = 0;
            } else if (r == maxColor) {
                h = (6 + (g - b) / delta) % 6;
            } else if (g == maxColor) {
                h = 2 + (b - r) / delta;
            } else if (b == maxColor) {
                h = 4 + (r - g) / delta;
            } else {
                h = 0;
            }
            // Then adjust the range to be 0-1
            h = h / 6;

            // Calculate saturation
            if (maxColor != 0) {
                s = delta / maxColor;
            } else {
                s = 0;
            }

            // Calculate value
            v = maxColor / 255;

            // return { h: h, s: s, v: v };
            return [h, s, v];
        }

        function HSVtoRGB(h, s, v) {
            var r, g, b, i, f, p, q, t;
            if (arguments.length === 1) {
                s = h.s;
                v = h.v;
                h = h.h;
            }
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
            }
            return [
                Math.round(r * 255),
                Math.round(g * 255),
                Math.round(b * 255)
            ];
        }

    });
}());