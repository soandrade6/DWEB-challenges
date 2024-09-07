const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

//Tú código va acá
//hint: Busca sobre la función eval

let operacion = "";

// Agregar evento click a cada botón
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valorBoton = boton.textContent;

        // Limpiar pantalla
        if (valorBoton === "C") {
            operacion = "";
            pantalla.textContent = "0";
            return;
        }

        // Borrar último carácter
        if (valorBoton === "←") {
            operacion = operacion.slice(0, -1);
            pantalla.textContent = operacion || "0";
            return;
        }

        // Realizar cálculo
        if (valorBoton === "=") {
            try {
                // Evaluar la operación y mostrar el resultado
                operacion = eval(operacion);
                pantalla.textContent = operacion;
            } catch (error) {
                pantalla.textContent = "Error!";
            }
            return;
        }

        // Evitar múltiples operadores consecutivos
        if (/[+\-*/]/.test(valorBoton) && /[+\-*/]$/.test(operacion)) {
            return;
        }

        // Agregar número u operador a la operación
        operacion += valorBoton;
        pantalla.textContent = operacion;
    });
});
