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
        let ctx = canvas.getContext('2d');

        // let figure = new Figure(0, 0, "#canvasOriginal");
        let x = 10;
        let y = 10;
        let width = 20;
        let height = 20;
        let radio = 10;

        // let circle = new Circle(x, y, radio, canvas);
        // let scueare = new Squeare(x, y, width, height, canvas);

        //----------------------------------------> DIBUJOS ALEATORIOS <----------------------------------------
        // let scueare2 = new Squeare(x, y, width + 100, height + 100, canvas);

        // let ima = new Image();
        // ima.src = "./img/casa.jpg";
        // let ima2 = new Image();
        // ima2.src = "./img/img1.jpg";
        // let ima3 = new Image();
        // ima3.src = "./img/img3.jpg";
        // let ima4 = new Image();
        // ima4.src = "./img/img4.jpg";

        // let images = [ima, ima2, ima3, ima4];

        // images.forEach(e => {
        //     e.onload = function() {
        //         setInterval(() => {
        //             scueare2.drawImage(e, randomX(), randomY());
        //         }, 1000);
        //     };
        // });
        //----------------------------------------> ////////////////// <----------------------------------------

        document.querySelector("#repeat").addEventListener("click", function(e) {
            draw("repeat");
        });
        document.querySelector("#repeat-x").addEventListener("click", function(e) {
            draw("repeat-x");
        });
        document.querySelector("#repeat-y").addEventListener("click", function(e) {
            draw("repeat-y");
        });
        document.querySelector("#no-repeat").addEventListener("click", function(e) {
            draw("no-repeat");
        });

        function draw(direction) {
            // var c = document.getElementById("myCanvas");
            // var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var img = document.querySelector("#img1");
            var pat = ctx.createPattern(img, direction);
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = pat;
            ctx.fill();
        }
        // console.log(ima1);
        // let ima = new Image();
        // ima.src = document.querySelector("#img4");
        // let picture = document.querySelector("#img4");

        // let figures;
        // ima.onload = function() {
        //     // let pattern = scueare2.ctx.createPattern(ima, 'no-repeat');
        //     // scueare2.fillFigure(pattern);
        //     scueare2.drawImage(ima);

        //     figures = [scueare2];

        // };

        // setTimeout(() => {
        //     drawFigures();
        // }, 1000);

        // setInterval(() => {
        //     drawFigures();
        // }, 1000);




        // circle.draw();
        // scueare.draw();



        function drawFigures() {
            for (let i = 0; i < figures.length; i++) {
                figures[i].drawRandom2(200, 100);
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