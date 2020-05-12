(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let btn = document.querySelector(".hacerMatriz");
        btn.addEventListener("click", e => {
            let num1 = parseInt(document.querySelector("#num1").value);
            let num2 = parseInt(document.querySelector("#num2").value);
            let valorMaximoMatriz = document.querySelector(".valorMaximoMatriz");
            let valorMaximoFilaPar = document.querySelector(".valorMaximoFilaPar");
            let matriz;
            if ((!isNaN(num1) && !isNaN(num2)) && (num1 > 1 && num2 > 1) && (num1 <= 100 && num2 <= 100)) {
                matriz = hacerMatriz(num1, num2);
                let numMax = buscarValorMaximoEnMatriz(matriz);
                let numMaxPar = buscarValorMaxMinEnFilasParEImp(matriz);
                valorMaximoMatriz.innerHTML = `${numMax}`;
                valorMaximoFilaPar.innerHTML = `${numMaxPar}`;
                btn.setAttribute("disabled", "");
            } else {
                alert("escriba un numero positivo y que tenga valor menor o igual a 100 y minimamente una matriz de 2x2");
            }
        });

        function hacerMatriz(alto, ancho) {
            let matriz = new Array(alto);

            let tablaHead = document.querySelector(".tablaMatriz thead tr");
            let tablaBody = document.querySelector(".tablaMatriz tbody");

            //agrego un array dentro de otro para hacer la matriz
            for (let i = 0; i < matriz.length; i++) {
                matriz[i] = new Array(ancho);
            }

            //cargo la matriz para que tenga numero aleatorios
            for (let x = 0; x < matriz.length; x++) {
                for (let y = 0; y < matriz[x].length; y++) {
                    let numeroAleatorio = Math.ceil((Math.random() * 100) + 1);
                    matriz[x][y] = numeroAleatorio;
                }
            }

            //cargo una primera COLUMNA para diferenciar cada una de ellas.
            tablaHead.innerHTML += `
                <th></th>
            `;

            for (let i = 0; i < matriz.length; i++) {
                tablaHead.innerHTML += `
                    <th id="${i}C">
                        ${ i }C
                    </th>
                `;
            }

            //cargo FILA a FILA con numeros ya pre cargados.
            for (let i = 0; i < matriz.length; i++) {
                let tbody = `
                    <td id="F${i}">
                        F${ i }
                    </td>
                `;
                for (let j = 0; j < matriz[i].length; j++) {
                    //si quisiera la pos simplemente coloco en tbody  ${ i }-${ j } y se muestra en cada casilla
                    tbody += `
                        <td id="${i}-${j}">
                            [${ matriz[i][j] }] 
                        </td>
                    `;
                }
                tablaBody.innerHTML += `
                    <tr>
                        ${ tbody }
                    </tr>
                `;
            }
            return matriz;
        }

        function buscarValorMaximoEnMatriz(matriz) {
            let valorMaximo = 0;
            let pos = "";
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    if (matriz[i][j] > valorMaximo) {
                        valorMaximo = matriz[i][j];
                        pos = i + "-" + j;
                    }
                }
            }

            //le doy color a la celda que salio como mayor numero de la matriz
            let tdTablaBody = document.getElementById(pos);
            tdTablaBody.classList.add('bg-success');

            // return valorMaximo + pos;
            return valorMaximo + " posición: F" + pos + "C";
        }

        function buscarValorMaxMinEnFilasParEImp(matriz) {
            let valorMaximo = 0;
            let valorMinimo = 1001;
            let posMax = "N/A";
            let posMin = "N/A";

            for (let i = 0; i < matriz.length; i++) {
                let esPar = (i % 2 == 0) ? "par" : "impar";
                if (esPar == "par") {
                    for (let j = 0; j < matriz[i].length; j++) {
                        if (matriz[i][j] > valorMaximo) {
                            valorMaximo = matriz[i][j];
                            posMax = i + "-" + j;
                        }
                    }
                } else {
                    for (let j = 0; j < matriz[i].length; j++) {
                        if (matriz[i][j] < valorMinimo) {
                            valorMinimo = matriz[i][j];
                            posMin = i + "-" + j;
                        }
                    }
                }
            }

            //le doy color a la celdas de la matriz
            let tdTablaBodyMax = document.getElementById(posMax);
            let tdTablaBodyMin = document.getElementById(posMin);
            tdTablaBodyMax.classList.add('bg-primary');
            tdTablaBodyMin.classList.add('bg-info');
            return "ValorMaxPar: " + valorMaximo + " posición: F" + posMax + "C" + " ValorMinImpar: " + valorMinimo + " posición: F" + posMin + "C";

        }

    });
}());