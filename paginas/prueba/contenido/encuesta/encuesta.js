import { cuestionarios, opciones } from '../../datos/prueba.data.js';

let indiceActual = 0;
const respuestasUsuario = [];
let preguntaAdicionalUsuarioInput;
let respuestaAdicionalUsuario = null;
let tituloCuestionario;
let tablaCuerpo;
let botonAnterior;
let botonSiguiente;
let botonFinalizar;
let filaPreguntaAdicional;

let cuestionariosFiltrados = []; // Array para almacenar los cuestionarios filtrados
let eventosAdjuntados = false

function iniciarCuestionario() {
    const seccionesSeleccionadasNumeros = JSON.parse(localStorage.getItem("seccionesSeleccionadas"));

    // Filtrar el array de cuestionarios si hay secciones seleccionadas
    if (seccionesSeleccionadasNumeros && seccionesSeleccionadasNumeros.length > 0) {
        cuestionariosFiltrados = cuestionarios.filter(cuestionario =>
            seccionesSeleccionadasNumeros.includes(cuestionario.numeroSeccion)
        );
    } else {
        // Si no hay secciones seleccionadas, usar todos los cuestionarios
        cuestionariosFiltrados = cuestionarios;
    }

    tituloCuestionario = document.getElementById('tituloCuestionario');
    tablaCuerpo = document.getElementById('tablaCuerpo');
    botonAnterior = document.getElementById('anteriorCuestionario');
    botonSiguiente = document.getElementById('siguienteCuestionario');
    botonFinalizar = document.getElementById('finalizarCuestionario');
    filaPreguntaAdicional = document.getElementById('filaPreguntaAdicional');
    preguntaAdicionalUsuarioInput = document.getElementById('preguntaAdicionalUsuario');

    if (!tituloCuestionario || !tablaCuerpo || !filaPreguntaAdicional) {
        console.error('Elementos del cuestionario no encontrados en el DOM.');
        return;
    }

    renderizarCuestionario();
    actualizarBotones();

    if (!eventosAdjuntados) {
        if (botonAnterior) {
            botonAnterior.addEventListener("click", () => cambiarCuestionario(-1));
        }
        if (botonSiguiente) {
            botonSiguiente.addEventListener("click", () => cambiarCuestionario(1));
        }
        if (botonFinalizar) {
            botonFinalizar.addEventListener("click", reiniciarCuestionario);
        }
        eventosAdjuntados = true;
    }

    if (preguntaAdicionalUsuarioInput) {
        preguntaAdicionalUsuarioInput.addEventListener('input', manejarCambioPreguntaAdicional);
    }
    deshabilitarOpcionesAdicionales();
}

function deshabilitarOpcionesAdicionales() {
    const opcionesAdicionalesCeldas = filaPreguntaAdicional.querySelectorAll('.opciones-adicionales');
    opcionesAdicionalesCeldas.forEach(celda => {
        celda.classList.remove('cursor-pointer', 'hover:bg-gray-300');
        celda.removeEventListener('click', seleccionarOpcionAdicional);
    });
}

function manejarCambioPreguntaAdicional(event) {
    const pregunta = event.target.value.trim();
    const opcionesAdicionalesCeldas = filaPreguntaAdicional.querySelectorAll('.opciones-adicionales');

    opcionesAdicionalesCeldas.forEach(celda => {
        celda.innerHTML = '';
        celda.dataset.opcionTexto = null;
        celda.dataset.opcionPuntaje = null;
        celda.classList.remove('bg-[#E89CA1]', 'text-white', 'cursor-pointer', 'hover:bg-gray-300');
        celda.removeEventListener('click', seleccionarOpcionAdicional);
    });
    respuestaAdicionalUsuario = null;

    if (pregunta.length >= 6) {
        opciones.forEach((opcion, index) => {
            const opcionTexto = document.createElement('span');
            opcionTexto.textContent = opcion.texto;
            opcionesAdicionalesCeldas[index].appendChild(opcionTexto);
            opcionesAdicionalesCeldas[index].dataset.opcionTexto = opcion.texto;
            opcionesAdicionalesCeldas[index].dataset.opcionPuntaje = opcion.puntaje;
            opcionesAdicionalesCeldas[index].classList.add('cursor-pointer', 'hover:bg-gray-300');
            opcionesAdicionalesCeldas[index].addEventListener('click', seleccionarOpcionAdicional);
        });
    } else if (pregunta.length < 6 && pregunta.length > 0) {
        deshabilitarOpcionesAdicionales();
    } else if (pregunta.length === 0) {
        deshabilitarOpcionesAdicionales();
    }
}

function seleccionarOpcionAdicional() {
    const pregunta = preguntaAdicionalUsuarioInput.value.trim();
    const opcionesAdicionalesCeldas = filaPreguntaAdicional.querySelectorAll('.opciones-adicionales');

    opcionesAdicionalesCeldas.forEach(celda => {
        celda.classList.remove('bg-[#E89CA1]', 'text-white');
    });
    this.classList.add('bg-[#E89CA1]', 'text-white');
    respuestaAdicionalUsuario = {
        pregunta: pregunta,
        opcion: this.dataset.opcionTexto,
        puntaje: parseFloat(this.dataset.opcionPuntaje)
    };
}

function cambiarCuestionario(direccion) {
    indiceActual += direccion;
    actualizarBotones();
    renderizarCuestionario();
}

function actualizarBotones() {
    if (botonSiguiente) {
        botonSiguiente.classList.toggle("hidden", indiceActual === cuestionariosFiltrados.length - 1);
    }
    if (botonAnterior) {
        botonAnterior.classList.toggle("hidden", indiceActual === 0);
    }
    if (botonFinalizar) {
        botonFinalizar.classList.toggle("hidden", indiceActual !== cuestionariosFiltrados.length - 1);
    }
}

function renderizarCuestionario() {
    if (!tablaCuerpo || !tituloCuestionario) return;

    tituloCuestionario.innerText = cuestionariosFiltrados[indiceActual].titulo;
    const filasExistentes = tablaCuerpo.querySelectorAll('tr:not(#filaPreguntaAdicional)');
    filasExistentes.forEach(fila => fila.remove());
    respuestasUsuario[indiceActual] = {};

    const opcionesAdicionalesCeldas = filaPreguntaAdicional.querySelectorAll('.opciones-adicionales');
    opcionesAdicionalesCeldas.forEach(celda => {
        celda.innerHTML = '';
        celda.dataset.opcionTexto = null;
        celda.dataset.opcionPuntaje = null;
        celda.classList.remove('bg-[#E89CA1]', 'text-white', 'cursor-pointer', 'hover:bg-gray-300');
        celda.removeEventListener('click', seleccionarOpcionAdicional);
    });
    if (preguntaAdicionalUsuarioInput) {
        preguntaAdicionalUsuarioInput.value = '';
    }
    respuestaAdicionalUsuario = null;
    deshabilitarOpcionesAdicionales();

    cuestionariosFiltrados[indiceActual].preguntas.forEach((pregunta, indicePregunta) => {
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
            });
            fila.appendChild(celda);
        });
        tablaCuerpo.insertBefore(fila, filaPreguntaAdicional);
    });
}

function reiniciarCuestionario() {
    indiceActual = 0;
    respuestasUsuario.length = 0;
    respuestaAdicionalUsuario = null;
    iniciarCuestionario(); // Volver a iniciar para re-filtrar o mostrar todo
    actualizarBotones();
    if (preguntaAdicionalUsuarioInput) {
        preguntaAdicionalUsuarioInput.value = "";
    }
    deshabilitarOpcionesAdicionales();
}

export { iniciarCuestionario }; // Exporta la función iniciarCuestionario