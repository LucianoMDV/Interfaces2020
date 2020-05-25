(function() {

    "use strict";

    document.addEventListener("DOMContentLoaded", e => {

        //----------------------------------------> COLOR_01 <----------------------------------------
        let color1 = document.querySelector("#color1");
        color1.addEventListener("click", e => {
            color1.classList.toggle("bg-primary");
        });
        //----------------------------------------> //////// <----------------------------------------

        //----------------------------------------> COLOR_02 <----------------------------------------
        let color2 = document.querySelector("#color2");
        color2.addEventListener("mouseover", e => {
            color2.classList.add("bg-success");
        });
        color2.addEventListener("mouseout", e => {
            color2.classList.remove("bg-success");
        });
        //----------------------------------------> //////// <----------------------------------------

        //----------------------------------------> COLOR_03 <----------------------------------------
        let selectColor = document.querySelector("#selectColor");
        selectColor.addEventListener("change", e => {
            // console.log(selectColor.value);
            color3.classList = "col";
            color3.classList.toggle(selectColor.value);
        });
        //----------------------------------------> //////// <----------------------------------------

        //----------------------------------------> CANVAS <----------------------------------------
        let canvas = document.querySelector("#canvasOriginal");
        // let ctx = canvas.getContext('2d');

        let x = 10;
        let y = 10;
        let width = 20;
        let height = 20;
        let radio = 10;

        let circle = new Circle(x, y, radio);
        let scueare = new Squeare(x, y, width, height);
        let figures = [circle, scueare];

        // circle.draw();
        // scueare.draw();

        setInterval(() => {
            drawFigures();
        }, 1000);

        function drawFigures() {
            for (let i = 0; i < figures.length; i++) {
                figures[i].drawRandom(randomX(), randomY(), randomRGBA());
            }
        }

        function randomX() {
            let valor = Math.floor(Math.random() * (canvas.height + 1));
            console.log("X: " + valor);
            return valor;
        }

        function randomY() {
            let valor = Math.floor(Math.random() * (canvas.width + 1));
            console.log("Y: " + valor);
            return valor;
        }

        function randomRGBA() {
            let r = Math.round(Math.random() * 255);
            let g = Math.round(Math.random() * 255);
            let b = Math.round(Math.random() * 255);
            let a = 255;
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        //----------------------------------------> //////// <----------------------------------------

    });
}());