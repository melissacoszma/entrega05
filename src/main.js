import "./style.css";

console.log("Hello from main");

let puntos;

puntos = 0;

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

    // Asignar el valor de la carta
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


    gameOver();
    muestraPuntuacion();
    mostrarCarta(carta);
    console.log("Carta generada:", carta, "Valor de la carta:", valorCarta);   
};

document.addEventListener("DOMContentLoaded", () => {
    const botonPedir = document.getElementById("pidoCarta");
    if (botonPedir) {
        botonPedir.addEventListener("click", pidoCarta);
    }
});

const mostrarCarta = (carta) => {
    const imgCarta = document.getElementById("imgCarta");
    let srcCarta;

    
    switch (carta) {
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

    // Actualizar el src de la imagen
    imgCarta.src = srcCarta;
};

    


const gameOver = () => {
    if(puntos > 7.5){
        const mensaje = document.getElementById("mensaje");
        mensaje.textContent = "has perdido";
        console.log("has perdido");
    }
    if(puntos <= 4){
        mensaje.textContent =  "has sido muy conservador";
    }
    if(puntos >=5 && puntos < 6 ){
        mensaje.textContent = "te ha entrado el canguelo";
    }
    if(puntos >= 6 && puntos <= 7){
        mensaje.textContent = "casi, casi";
    }
    if(puntos == 7.5){
        mensaje.textContent = "enhorabuena, has ganado"
    };
}
