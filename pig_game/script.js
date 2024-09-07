let score = [0, 0];        // Puntaje global
let roundScore = 0;        // Puntaje de la ronda actual
let current = 0;           // Jugador actual (0 o 1)
let dice;
let gameRunning = true;    // Controla si el juego está en curso
let animation = 0;         // Controla la animación del dado

// Reiniciar las puntuaciones al inicio
document.querySelector(".score-0").textContent = "0";
document.querySelector(".score-1").textContent = "0";
document.querySelector(".current-0").textContent = "0";
document.querySelector(".current-1").textContent = "0";

document.getElementById("rotate").onclick = function() {
    // Tirar el dado
    dice = Math.floor(Math.random() * 6 + 1);
    
    if (gameRunning) {
        // Mostrar el valor del dado
        document.querySelector("#dice-img").src = "assets/dice-" + dice + ".JPG";
        
        // Efecto de animación (alternar entre 'tada' y 'shake')
        if (animation === 0) {
            document.querySelector("#dice-img").classList.add("tada");
            document.querySelector("#dice-img").classList.remove('shake');
            animation = 1;
        } else {
            document.querySelector("#dice-img").classList.remove('tada');
            document.querySelector("#dice-img").classList.add('shake');
            animation = 0;
        }

        // Lógica del juego: Si el dado es diferente de 1
        if (dice !== 1) {
            // Sumar el valor del dado al puntaje de la ronda
            roundScore += dice;
            document.querySelector(".current-" + current).textContent = roundScore;  // Actualizar puntaje actual en la UI
        } else {
            // Si el dado es 1, el jugador pierde el puntaje de la ronda y su turno
            nextPlayer();
        }
    }
};

document.getElementById("hold").onclick = function() {
    if (gameRunning) {
        // Sumar el puntaje de la ronda al puntaje global del jugador actual
        score[current] += roundScore;
        document.querySelector(".score-" + current).textContent = score[current];  // Actualizar puntaje global en la UI

        // Verificar si el jugador actual ha ganado (puntaje global >= 100)
        if (score[current] >= 100) {
            document.querySelector("#pl-" + current).textContent = "PLAYER " + (current + 1) + " WINS!";
            gameRunning = false;  // Detener el juego
        } else {
            // Cambiar al siguiente jugador si no ha ganado
            nextPlayer();
        }
    }
};

function nextPlayer() {
    // Reiniciar el puntaje de la ronda
    roundScore = 0;
    document.querySelector(".current-" + current).textContent = "0";  // Actualizar puntaje de la ronda en la UI

    // Cambiar al siguiente jugador
    current = 1 - current;  // Alternar entre 0 y 1

    // Alternar la clase "active" para indicar el jugador actual
    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");
}

// Nuevo juego: Reiniciar todos los valores y la UI
document.querySelector("#new").addEventListener('click', game);

function game() {
    score = [0, 0];        // Reiniciar el puntaje global
    roundScore = 0;        // Reiniciar el puntaje de la ronda
    current = 0;           // Reiniciar el jugador actual
    gameRunning = true;    // Reanudar el juego

    // Actualizar la UI para un nuevo juego
    document.querySelector(".score-0").textContent = "0";
    document.querySelector(".score-1").textContent = "0";
    document.querySelector(".current-0").textContent = "0";
    document.querySelector(".current-1").textContent = "0";
    document.querySelector("#pl-0").innerHTML = "<h2 id='pl-0'>PLAYER 1 <i class='fas fa-circle'></i></h2>";
    document.querySelector("#pl-1").innerHTML = "<h2 id='pl-1'>PLAYER 2 <i class='fas fa-circle'></i></h2>";

    // Asegurarse de que el Jugador 1 comience como activo
    document.querySelector(".player-0").classList.add("active");
    document.querySelector(".player-1").classList.remove("active");
}
