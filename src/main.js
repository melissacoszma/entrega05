import "./style.css";

console.log("Hello from main");

let puntos = 0;

const botonPedir = document.getElementById("pidoCarta");
const botonMePlanto = document.getElementById("mePlanto");
const botonNuevoJuego = document.getElementById("nuevo");
const botonUnaMas = document.getElementById("unaMas");


const muestraPuntuacion = () => {
    const puntuacion = document.getElementById("puntuacion");
    if (puntuacion) {
        puntuacion.textContent = puntos;
    }; 
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const generaNumeroAleatorio = () => {
     return Math.floor(Math.random() * 10) + 1; // +1 (nuestro mínimo) para excluir el 0 en el resultado
};

const randomCarta = (numAleatorio)=> {
    if(numAleatorio > 7){
        return numAleatorio += 2;
     }
     return numAleatorio;
};

const obtenerPuntosCarta = (carta) => {
    if (carta >= 7) {
        return 0.5;
    }
    return carta;
};


const sumarPuntos = (puntoCarta) => {
    return puntos + puntoCarta;
};

const actualizarPuntos = (nuevosPuntos) => {
    puntos = nuevosPuntos;
};

const pidoCarta = () => {
    const numAleatorio = generaNumeroAleatorio();
    const carta = randomCarta(numAleatorio);
    const punto = obtenerPuntosCarta(carta); // obtengo el valor de la carta
    const puntosSumados = sumarPuntos(punto); // suma los puntos
    actualizarPuntos(puntosSumados); // actualizo la variable global
    muestraPuntuacion(); // muestro la puntuación actualizada
    const urlCarta = obtenerUrlCarta(carta); // obtengo la URL de la carta
    mostrarCarta(urlCarta); // muestro la carta en la interfaz
    
};


const bloquearBotonPedir = (estaHabilitado) => {
    const botonPedir = document.getElementById("pidoCarta");

    if (botonPedir) {
        botonPedir.disabled = estaHabilitado;
    };
};

const bloquearBotonMePlanto = (estaHabilitado) => {
    const botonMePlanto = document.getElementById("mePlanto");

    if (botonMePlanto) {
        botonMePlanto.disabled = estaHabilitado;
    };
};

const esconderNuevoJuego = (estaHabilitado) => {
    const botonNuevo = document.getElementById("nuevo");

    if (botonNuevo) {
        botonNuevo.hidden = estaHabilitado;
    };
};

const esconderUnaMas = (estaHabilitado) => {
    const botonUnaMas = document.getElementById("unaMas");

    if (botonUnaMas) {
        botonUnaMas.hidden = estaHabilitado;
    };
};


document.addEventListener("DOMContentLoaded", () => {
    esconderNuevoJuego(true);
    esconderUnaMas(true); 
    bloquearBotonMePlanto(false);
        
    const desactivaPideCarta = (boton) =>{
        boton.disabled = true;
    };

    if (botonPedir) {
        botonPedir.addEventListener("click", () => {
            pidoCarta();
            winOrLost(); // verifico si el jugador ha ganado o perdido 
        });
    }
    

    if (botonMePlanto) {
        botonMePlanto.addEventListener("click", () => {
            desactivaPideCarta(botonPedir); 
            gameStatusOnPlantar(); 
            bloquearBotonMePlanto(true);
            esconderNuevoJuego(false); 
            esconderUnaMas(false);
        });
    };

    if (botonNuevoJuego) {
        botonNuevoJuego.addEventListener("click", () => {
            puntos = 0;
            mensaje.textContent = "";
            const urlCarta = obtenerUrlCarta(0);
            mostrarCarta(urlCarta);
            muestraPuntuacion();
            esconderNuevoJuego(true);
            bloquearBotonPedir(false); 
            esconderUnaMas(true); 
            bloquearBotonMePlanto(false); 
        });
    };

    if (botonUnaMas) {
        botonUnaMas.addEventListener("click", () => {
            muestraPuntuacion();
            pidoCarta();
            esconderUnaMas(true);
        });
    };
    
});

const winOrLost = () => {                         //lo ejecutaremos cada vez q se pida carta para comprobar si s eha ganado o perdido
    if (puntos > 7.5) {
        mensaje.textContent = "Has perdido :(";
        console.log("Has perdido");
        bloquearBotonPedir(true);
        bloquearBotonMePlanto(true);
        esconderNuevoJuego(false);
        esconderUnaMas(true);
    };

    if (puntos === 7.5) {
        mensaje.textContent = "¡Enhorabuena, has ganado :D!";
        console.log("Has ganado");
        bloquearBotonPedir(true);
        bloquearBotonMePlanto(true);
        esconderNuevoJuego(false);
        esconderUnaMas(true);
    };
};

const muestraMensaje = (mensaje) => {
    const elementoMensaje = document.getElementById("mensaje");

    if (elementoMensaje) {
        elementoMensaje.textContent = mensaje;
    };
};

      
const mostrarCarta = (urlCarta) => {
    const imgCarta = document.getElementById("imgCarta");

    if (imgCarta) {
        imgCarta.src = urlCarta;
    };
};

const obtenerUrlCarta = (carta) => {
    let urlCarta;

    switch (carta) {
        case 0:
            urlCarta = "./img/back.jpg";
            break;
        case 1:
            urlCarta = "./img/1_as-copas.jpg";
            break;
        case 2:
            urlCarta = "./img/2_dos-copas.jpg";
            break;
        case 3:
            urlCarta = "./img/3_tres-copas.jpg";
            break;
        case 4:
            urlCarta = "./img/4_cuatro-copas.jpg";
            break;
        case 5:
            urlCarta = "./img/5_cinco-copas.jpg";
            break;
        case 6:
            urlCarta = "./img/6_seis-copas.jpg";
            break;
        case 7:
            urlCarta = "./img/7_siete-copas.jpg";
            break;
        case 10:
            urlCarta = "./img/10_sota-copas.jpg";   
            break;
        case 11:
            urlCarta = "./img/11_caballo-copas.jpg"; 
            break;
        case 12:
            urlCarta = "./img/12_rey-copas.jpg";
            break;
        default:
            urlCarta = "./img/back.jpg"; // carta boca abajo por defecto
            break;
    };

    return urlCarta; 
};




const gameStatusOnPlantar = () => {

        if (puntos <= 4) {
            muestraMensaje("Has sido muy conservador u.u");
        };

        if (puntos >= 5 && puntos < 6) {
             muestraMensaje("Te ha entrado el canguelo :S");
        };

        if (puntos >= 6 && puntos <= 7) {
             muestraMensaje("Casi, casi o.o");
            
        }else {
            muestraMensaje("");
        };
    
};
