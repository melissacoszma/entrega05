import "./style.css";

console.log("Hello from main");

let puntos = 0;

const botonPedir = document.getElementById("pidoCarta");
const botonMePlanto = document.getElementById("mePlanto");
const botonNuevoJuego = document.getElementById("nuevo");
const botonUnaMas = document.getElementById("unaMas");


const muestraPuntuacion = () => {
    const puntuacion = document.getElementById("puntuacion");
    puntuacion.textContent = puntos;   
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const randomCarta = () => {
     let carta = Math.floor(Math.random() * 10) + 1; // +1 (nuestro mínimo) para excluir el 0 en el resultado
     if(carta > 7){
        carta += 2;
     }
     return carta;
};

const pidoCarta = () =>{
    let carta = randomCarta();
    let valorCarta;

    if (carta >= 7) {
        valorCarta = 0.5; 
    } else {
        valorCarta = carta; 
    }

    if(puntos <= 7){
        puntos += valorCarta;
    }else {
        puntos += 0.5;
    };
    
    muestraPuntuacion();
    mostrarCarta(carta);
    console.log("Carta generada:", carta, "Valor de la carta:", valorCarta);   
    winOrLost();
};

document.addEventListener("DOMContentLoaded", () => {
    botonNuevoJuego.hidden = true;
    botonUnaMas.hidden = true;
    botonMePlanto.disabled = false;
    
    const desactivaPideCarta = (boton) =>{
        boton.disabled = true;
    };

    if (botonPedir) {
        botonPedir.addEventListener("click", pidoCarta);
    };

    if (botonMePlanto) {
        botonMePlanto.addEventListener("click", () => {
            desactivaPideCarta(botonPedir); 
            gameStatusOnPlantar(); 
            botonNuevoJuego.hidden = false; 
            botonUnaMas.hidden = false;
        });
    };

    if (botonNuevoJuego) {
        botonNuevoJuego.addEventListener("click", () => {
            puntos = 0;
            mensaje.textContent = "";
            mostrarCarta(0);
            muestraPuntuacion();
            botonNuevoJuego.hidden = true;
            botonPedir.disabled = false; 
            botonUnaMas.hidden = true; 
            botonMePlanto.disabled = false;
        });
    };

    if (botonUnaMas) {
        botonUnaMas.addEventListener("click", () => {
            muestraPuntuacion();
            pidoCarta();
            botonUnaMas.disabled = true;
        });
    };
    
});

      


const mostrarCarta = (carta) => {
    const imgCarta = document.getElementById("imgCarta");
    let srcCarta;

    
    switch (carta) {
        case 0:
            srcCarta = "./img/back.jpg";
            break;
        case 1:
            srcCarta = "./img/1_as-copas.jpg";
            break;
        case 2:
            srcCarta = "./img/2_dos-copas.jpg";
            break;
        case 3:
            srcCarta = "./img/3_tres-copas.jpg";
            break;
        case 4:
            srcCarta = "./img/4_cuatro-copas.jpg";
            break;
        case 5:
            srcCarta = "./img/5_cinco-copas.jpg";
            break;
        case 6:
            srcCarta = "./img/6_seis-copas.jpg";
            break;
        case 7:
            srcCarta = "./img/7_siete-copas.jpg";
            break;
        case 10:
            srcCarta = "./img/10_sota-copas.jpg";   
            break;
        case 11:
            srcCarta = "./img/11_caballo-copas.jpg"; 
            break;
        case 12:
            srcCarta = "./img/12_rey-copas.jpg";
            break;
        default:
            srcCarta = "./img/back.jpg"; // Carta boca abajo por defecto, el html inicia en esta también
    }

    
    imgCarta.src = srcCarta;
};

const winOrLost = () => {                         //lo ejecutaremos cada vez q se pida carta para comprobar si s eha ganado o perdido
    if (puntos > 7.5) {
        mensaje.textContent = "Has perdido :(";
        console.log("Has perdido");
        botonPedir.disabled = true;
        botonMePlanto.disabled = true;
        botonNuevoJuego.hidden = false;
        botonUnaMas.hidden = true;
    }

    if (puntos === 7.5) {
        mensaje.textContent = "¡Enhorabuena, has ganado :D!";
        console.log("Has ganado");
        botonPedir.disabled = true;
        botonMePlanto.disabled = true;
        botonNuevoJuego.hidden = false;
        botonUnaMas.hidden = true;
    }
}

const gameStatusOnPlantar = () => {
    const mensaje = document.getElementById("mensaje");

    switch (true) {                                        //Para pasar la constante a un switch he tenido q usar una booleana, evalua si cada caso es verdadero y ejecuta solamente el q lo es
        /*case puntos > 7.5:
            mensaje.textContent = "Has perdido :(";         // quito los estados que quiero que se ejecuten automaticamente para pasarlos a una funcion exclusiva
            console.log("Has perdido");
            break;*/

        case puntos <= 4:
            mensaje.textContent = "Has sido muy conservador u.u";
            break;

        case puntos >= 5 && puntos < 6:
            mensaje.textContent = "Te ha entrado el canguelo :S";
            break;

        case puntos >= 6 && puntos <= 7:
            mensaje.textContent = "Casi, casi o.o";
            break;

        /*case puntos === 7.5:
            mensaje.textContent = "¡Enhorabuena, has ganado :D!";
            break;*/

        default:
            mensaje.textContent = "";
            break;
    }
};
