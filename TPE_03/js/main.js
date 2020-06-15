(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", e => {
        // let player = document.querySelector(".container-player");
        // let caer = document.querySelector(".caer");
        // let primerValor = 0;
        // let separadoValor = 0;

        // let top;
        let container = document.querySelector(".container-player");
        console.log(container);

        // const body = document.querySelector('body');
        // let bodyHeight = window.getComputedStyle(body, null).getPropertyValue("height");
        // const BODYHEIGHT = parseInt(bodyHeight.split('px')[0]);

        // let height = window.getComputedStyle(container, null).getPropertyValue("height");
        // let diferencia = BODYHEIGHT - parseInt(height.split('px')[0]);
        // console.log(height);
        // console.log(diferencia);

        let game = new Game();
        game.initGame();


        // caer.addEventListener("click", e => {
        //     console.log(BODYHEIGHT);
        //     console.log(primerValor);

        //     player.classList.add("caer");
        //     setInterval(() => {

        //         primerValor = getComputedStyle(player).getPropertyValue("--my-var");
        //         // console.log(primerValor);
        //         separadoValor = parseInt(primerValor.split("px")[0]);
        //         // console.log(separadoValor);
        //         // if (separadoValor < diferencia) {
        //         // console.log(BODYHEIGHT - 46);

        //         separadoValor += 1;
        //         player.style.setProperty("--my-var", separadoValor + "px");
        //         // console.log(separadoValor);
        //         // }
        //     }, 40);


        //     // var theCSSprop = window.getComputedStyle(player, null).getPropertyValue("animation");
        //     // console.log(theCSSprop);
        //     // let ms = theCSSprop.split("s")[0];

        //     // setTimeout(() => {
        //     //     player.style.animationPlayState = "paused";
        //     // }, ms * 1000);
        //     // player.style.animationPlayState = "running";

        //     // });
        //     // let secondHand;
        //     // let currentDegree = 0;
        //     // setInterval(() => {
        //     //     currentDegree = (360 / 6);
        //     // }, 1000); //1000ms = 1s
        // });
        // });

        // window.onload = e => {

        // window.addEventListener('keyup', e => {
        //     if (e.keyCode == 38) {

        //         top = window.getComputedStyle(container, null).getPropertyValue("top");
        //         // console.log("TOP: " + top);
        //         top = parseInt(top.split('px')[0]);
        //         top -= 1;

        //         container.animate([
        //             { top: (top + 1) + 'px' },
        //             { top: top + 'px' }
        //             // { transform: 'translateY(0px)' },
        //             // { transform: 'translateY(-40px)' }
        //         ], {
        //             duration: 40,
        //             fill: 'forwards'
        //         });


        //         // container.animate([
        //         //     // { transform: 'translateY(0px)' },
        //         //     // { transform: `translateY(${diferencia}px)` }
        //         //     { top: top + 'px' },
        //         //     { top: diferencia + 'px' }
        //         // ], {
        //         //     duration: ((BODYHEIGHT - parseInt(top) / 5000)), //faltaría que se haga una relación según la altura actual
        //         //     fill: 'forwards'
        //         // });
        //         // console.log((BODYHEIGHT - parseInt(top) / 5000));
        //         // console.log(top);
        //         console.log("TOP: " + top);

        //         player.style.setProperty("--my-var", top + "px");

        //     }
        // });
    });

}());