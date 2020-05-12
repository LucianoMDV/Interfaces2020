class Vehiculo {
    constructor(nombre, color, cantPuerta) {
        this.nombre = nombre;
        this.color = color;
        this.cantPuerta = cantPuerta;
    }

}

class Auto extends Vehiculo {
    constructor(nombre, color, cantPuerta) {
        super(nombre, color, cantPuerta);
    }
}

class Camion extends Vehiculo {
    constructor(nombre, color, cantPuerta, acoplado) {
        super(nombre, color, cantPuerta);
        this.acoplado = acoplado;
    }

}