(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        let btn = document.querySelector(".hacerMatriz");
        btn.addEventListener("click", e => {
            let num1 = parseInt(document.querySelector("#num1").value);
            let num2 = parseInt(document.querySelector("#num2").value);
            let valorMaximoMatriz = document.querySelector(".valorMaximoMatriz");
            let valorMaximoFilaPar = document.querySelector(".valorMaximoFilaPar");
            let valorMinimoFilaImpar = document.querySelector(".valorMinimoFilaImpar");
            let valorPromedio = document.querySelector(".valorPromedio");

            if ((!isNaN(num1) && !isNaN(num2)) && (num1 > 1 && num2 > 1) && (num1 <= 100 && num2 <= 100)) {
                let matriz = new Array(num1);
                let maxMatriz = 0;
                let maxFilaPar = 0;
                let minFilaImpar = 1001;
                let posMatrizMax = "N/A";
                let posFilaParMax = "N/A";
                let posFilaImparMin = "N/A";
                let arrayResultMatriz = new Array(maxMatriz, posMatrizMax);
                let arrayResultFilaPar = new Array(maxFilaPar, posFilaParMax);
                let arrayResultFilaImpar = new Array(minFilaImpar, posFilaImparMin);
                let acumlador = 0;
                // let promedio = 0;
                let arrayResultProm = [];

                crearMatriz(matriz, num2);
                crearTabla(matriz);

                for (let i = 0; i < matriz.length; i++) {
                    let esPar = (i % 2 == 0) ? "par" : "impar";
                    for (let j = 0; j < matriz[i].length; j++) {
                        buscarValoresEnMatriz(matriz[i][j], arrayResultMatriz, "maximo", i, j);
                        if (esPar == "par") {
                            buscarValoresEnMatriz(matriz[i][j], arrayResultFilaPar, "maximo", i, j);
                        } else {
                            buscarValoresEnMatriz(matriz[i][j], arrayResultFilaImpar, "minimo", i, j);
                        }
                        acumlador += matriz[i][j];
                    }
                    calcularValorPromedio(acumlador, matriz.length, arrayResultProm);
                    acumlador = 0;
                }

                //le doy color a la celdas de la matriz
                let tdTablaBody = document.getElementById(arrayResultMatriz[1]);
                tdTablaBody.classList.add('bg-success');
                tdTablaBody.classList.add('text-white');
                let tdTablaBodyMax = document.getElementById(arrayResultFilaPar[1]);
                tdTablaBodyMax.classList.add('bg-primary');
                tdTablaBodyMax.classList.add('text-white');
                let tdTablaBodyMin = document.getElementById(arrayResultFilaImpar[1]);
                tdTablaBodyMin.classList.add('bg-warning');

                //muresto los valores resultantes en pantalla
                valorMaximoMatriz.innerHTML = `Posicion: F${arrayResultMatriz[1]}C - Valor: ${arrayResultMatriz[0]}`;
                valorMaximoFilaPar.innerHTML = `Posicion: F${arrayResultFilaPar[1]}C - Valor: ${arrayResultFilaPar[0]}`;
                valorMinimoFilaImpar.innerHTML = `Posicion: F${arrayResultFilaImpar[1]}C - Valor: ${arrayResultFilaImpar[0]}`;

                valorPromedio.innerHTML = "";
                for (let i = 0; i < arrayResultProm.length; i++) {
                    valorPromedio.innerHTML += `
                        <li class="list-inline-item">Pos: F${i} Valor: ${arrayResultProm[i]}</li>
                    `;
                }

                btn.setAttribute("disabled", "");
            } else {
                alert("escriba un numero positivo y que tenga valor menor o igual a 100 y minimamente una matriz de 2x2");
            }
        });

        function crearMatriz(matriz, ancho) {
            //agrego un array dentro de otro para hacer la matriz
            for (let i = 0; i < matriz.length; i++) {
                matriz[i] = new Array(ancho);
            }

            //cargo la matriz para que tenga numero aleatorios
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    let numeroAleatorio = Math.ceil((Math.random() * 100) + 1);
                    matriz[i][j] = numeroAleatorio;
                }
            }
        }

        function crearTabla(matriz) {

            let tablaHead = document.querySelector(".tablaMatriz thead tr");
            let tablaBody = document.querySelector(".tablaMatriz tbody");
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
        }

        function buscarValoresEnMatriz(numeroEnPosicion, arrayResult, condicion, i, j) {
            if (condicion == "maximo") {
                if (numeroEnPosicion > arrayResult[0]) {
                    arrayResult[0] = numeroEnPosicion;
                    arrayResult[1] = i + "-" + j;
                }
            } else if (condicion == "minimo") {
                if (numeroEnPosicion < arrayResult[0]) {
                    arrayResult[0] = numeroEnPosicion;
                    arrayResult[1] = i + "-" + j;
                }
            }
        }

        function calcularValorPromedio(acumlador, cantidad, arrayResultProm) {
            let promedio = (acumlador / cantidad).toPrecision(4);
            arrayResultProm.push(promedio);
        }


    });
}());