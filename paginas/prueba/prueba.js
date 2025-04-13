import { cuestionarios, opciones } from "./prueba.data.js";

let indiceActual = 0;
const respuestasUsuario = [];

function iniciarCuestionario() {
    renderizarCuestionario();

    const botonAnterior = document.getElementById("anteriorCuestionario");
    const botonSiguiente = document.getElementById("siguienteCuestionario");

    if (botonAnterior) {
        botonAnterior.addEventListener("click", () => cambiarCuestionario(-1));
        botonSiguiente.addEventListener("click", () => cambiarCuestionario(1));
    }
}

function cambiarCuestionario(direccion) {
    indiceActual += direccion;

    // Limitar dentro del rango válido
    if (indiceActual < 0) indiceActual = 0;
    if (indiceActual >= cuestionarios.length) indiceActual = cuestionarios.length - 1;

    // Ocultar botón de "Siguiente" si es el último cuestionario
    document.getElementById("siguienteCuestionario").classList.toggle("hidden", indiceActual === cuestionarios.length - 1);

    // Ocultar botón de "Anterior" si es el primer cuestionario
    document.getElementById("anteriorCuestionario").classList.toggle("hidden", indiceActual === 0);

    renderizarCuestionario();
}


function renderizarCuestionario() {
    const tablaCuerpo = document.getElementById("tablaCuerpo");
    const titulo = document.getElementById("tituloCuestionario");

    if (!tablaCuerpo) return;

    titulo.innerText = cuestionarios[indiceActual].titulo;
    tablaCuerpo.innerHTML = "";
    respuestasUsuario[indiceActual] = {};

    cuestionarios[indiceActual].preguntas.forEach((pregunta, indicePregunta) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td class="p-4 border border-gray-600 text-center">${pregunta}</td>`;

        opciones.forEach((opcion, indiceOpcion) => {
            const celda = document.createElement("td");
            celda.className = "p-4 border border-gray-600 text-center cursor-pointer hover:bg-gray-300";
            celda.dataset.pregunta = indicePregunta;
            celda.dataset.opcion = indiceOpcion;

            celda.innerHTML = `<span>${opcion.texto}</span>`;

            celda.addEventListener("click", () => {
                document.querySelectorAll(`td[data-pregunta="${indicePregunta}"]`).forEach(celda => {
                    celda.classList.remove("bg-[#E89CA1]", "text-white");
                });

                celda.classList.add("bg-[#E89CA1]", "text-white");

                respuestasUsuario[indiceActual][pregunta] = {
                    opcion: opcion.texto,
                    puntaje: opcion.puntaje
                };

                validarRespuestas();
            });

            fila.appendChild(celda);
        });

        tablaCuerpo.appendChild(fila);
    });
}

async function loadPage(page) {
    const container = document.getElementById("content");

    try {
        const response = await fetch(page);
        const data = await response.text();
        container.innerHTML = data; // Inserta el contenido dinámicamente
        iniciarCuestionario();
    } catch (error) {
        console.error("Error al cargar el contenido:", error);
        container.innerHTML = "<p class='text-red-500 text-center'>Error al cargar contenido.</p>";
    }
}

// Llamar a la función con la página que quieres renderizar dentro
document.addEventListener("DOMContentLoaded", () => {
    loadPage("prueba-encuesta.html");
});

