(function() {
    'use strict';
    class Circulo {
        constructor(x, y, radio, color) {
            this.x = x;
            this.y = y;
            this.radio = radio;
            this.color = color;
        }

        dibujar(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    class Cuadrado {
        constructor(x, y, w, h, color) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.color = color;
        }

        dibujar(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        //-----------------------------------------> CANVAS <------------------------------------------

        //-----------------------------------> dibujar fondo negro <-----------------------------------
        let c = document.querySelector("#canvasOriginal2");
        let ctx = c.getContext("2d");

        let cua1 = new Cuadrado(0, 0, 100, 100, "#FFAACC");
        let cir1 = new Circulo(210, 50, 50, "#AACCBB");

        cua1.dibujar(ctx);
        cir1.dibujar(ctx);

















        function random_rgba() {
            var o = Math.round,
                r = Math.random,
                s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
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

    });
}());