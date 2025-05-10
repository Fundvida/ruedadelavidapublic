import { seccionesPredeterminadas } from './datos/personaliza.data.js';

document.addEventListener("DOMContentLoaded", () => {
    const tbodySec = document.getElementById("tbody_secciones");
    const btnSaveChanges = document.getElementById("btn_save_changes");
    const alertContainer = document.getElementById("alert-container");

    localStorage.removeItem("seccionesSeleccionadas");
    let seccionesSeleccionadasNumeros = [];

    const crearTareas = () => {
        tbodySec.innerHTML = "";
        seccionesPredeterminadas.forEach((seccion) => {
            const estaSeleccionado = seccionesSeleccionadasNumeros.includes(seccion.numero);
            const fila = tbodySec.insertRow();
            fila.id = `seccion-${seccion.numero}`; // Usar un ID único basado en el número
            fila.classList.add('table-row', 'cursor-pointer', 'hover:bg-gray-100', 'border-b', 'border-gray-200');
            fila.style.backgroundColor = estaSeleccionado ? '#505B80' : 'white';
            fila.style.color = estaSeleccionado ? 'white' : '#505B80';

            const celdaNumero = fila.insertCell();
            celdaNumero.classList.add('px-6', 'py-2', 'whitespace-nowrap', 'text-lg', 'font-medium', 'text-center');
            celdaNumero.textContent = seccion.numero;

            const celdaTexto = fila.insertCell();
            celdaTexto.classList.add('px-6', 'py-2', 'text-lg', 'text-start');
            celdaTexto.textContent = seccion.texto;

            // Almacenar el número de la sección en el dataset de la fila para acceder fácilmente
            fila.dataset.numeroSeccion = seccion.numero;
        });
    };

    tbodySec.addEventListener("click", (evento) => {
        const fila = evento.target.closest(".table-row");
        if (fila) {
            const numeroSeccion = parseInt(fila.dataset.numeroSeccion);
            alternarSeleccionFila(numeroSeccion, fila);
        }
    });

    const alternarSeleccionFila = (numeroSeccion, fila) => {
        const indiceFila = seccionesSeleccionadasNumeros.indexOf(numeroSeccion);

        if (indiceFila !== -1) {
            seccionesSeleccionadasNumeros.splice(indiceFila, 1);
        } else {
            seccionesSeleccionadasNumeros.push(numeroSeccion);
        }

        const estaSeleccionado = seccionesSeleccionadasNumeros.includes(numeroSeccion);
        fila.style.backgroundColor = estaSeleccionado ? '#505B80' : 'white';
        fila.style.color = estaSeleccionado ? 'white' : '#505B80';
    };

    const guardarCambios = () => {
        if (seccionesSeleccionadasNumeros.length >= 8) {
            // Ordenar los números de sección antes de guardar
            seccionesSeleccionadasNumeros.sort((a, b) => a - b);
            localStorage.setItem("seccionesSeleccionadas", JSON.stringify(seccionesSeleccionadasNumeros));
            window.location.href = "/paginas/prueba/prueba.html";
        } else {
            const restantes = 8 - seccionesSeleccionadasNumeros.length;
            mostrarAlerta(`Debes elegir ${restantes} secciones más.`);
        }
    };

    const mostrarAlerta = (mensaje) => {
        alertContainer.innerHTML = `
            <div class="bg-red-100 border border-red-200 text-red-700 pl-5 pr-10 py-3 rounded relative" role="alert">
                <span class="block sm:inline">${mensaje}</span>
                <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="this.parentNode.remove()">
                    <i class="fas fa-times text-red-800 text-2xl cursor-pointer"></i>
                </button>
            </div>
        `;
    };

    btnSaveChanges.addEventListener("click", guardarCambios);

    crearTareas();
});