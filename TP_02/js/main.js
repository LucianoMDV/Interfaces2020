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
        let x = 10;
        let y = 10;
        let radio = 10;
        let circle = new Circle(x, y, radio);
        circle.draw();

        //----------------------------------------> //////// <----------------------------------------

    });
}());