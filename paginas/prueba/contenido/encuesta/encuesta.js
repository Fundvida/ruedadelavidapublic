import { cuestionarios, opciones } from '../../datos/prueba.data.js';
import { inicializarResultados } from '../../contenido/resultado/resultado.js';

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

    // Inicializa todas las áreas para asegurar que existan aunque no se visiten
    for (let i = 0; i < cuestionariosFiltrados.length; i++) {
        if (!respuestasUsuario[i]) {
            respuestasUsuario[i] = {};
        }
    }

    localStorage.setItem('cuestionariosFiltrados', JSON.stringify(cuestionariosFiltrados));

    tituloCuestionario = document.getElementById('tituloCuestionario');
    tablaCuerpo = document.getElementById('tablaCuerpo');
    botonAnterior = document.getElementById('anteriorCuestionario');
    botonSiguiente = document.getElementById('siguienteCuestionario');
    botonFinalizar = document.getElementById('finalizarCuestionario');
    filaPreguntaAdicional = document.getElementById('filaPreguntaAdicional');
    preguntaAdicionalUsuarioInput = document.getElementById('preguntaAdicionalUsuario');

    if (!tituloCuestionario || !tablaCuerpo || !filaPreguntaAdicional || !botonAnterior || !botonSiguiente || !botonFinalizar) {
        console.error('Elementos del cuestionario no encontrados en el DOM.');
        return;
    }

    // Remover listeners existentes para evitar duplicados
    botonAnterior.removeEventListener("click", cambiarCuestionarioAnterior);
    botonSiguiente.removeEventListener("click", cambiarCuestionarioSiguiente);
    botonFinalizar.removeEventListener("click", finalizarCuestionario);

    // Adjuntar los listeners NUEVAMENTE cada vez que se inicia el cuestionario
    botonAnterior.addEventListener("click", cambiarCuestionarioAnterior);
    botonSiguiente.addEventListener("click", cambiarCuestionarioSiguiente);
    botonFinalizar.addEventListener("click", finalizarCuestionario);

    if (preguntaAdicionalUsuarioInput) {
        preguntaAdicionalUsuarioInput.removeEventListener('input', manejarCambioPreguntaAdicional);
        preguntaAdicionalUsuarioInput.addEventListener('input', manejarCambioPreguntaAdicional);
        // Restaurar la pregunta adicional si existe para la sección actual
        if (respuestasUsuario[indiceActual] && respuestasUsuario[indiceActual]['preguntaAdicional']) {
            preguntaAdicionalUsuarioInput.value = respuestasUsuario[indiceActual]['preguntaAdicional'].pregunta;
            const opcionesAdicionalesCeldas = filaPreguntaAdicional.querySelectorAll('.opciones-adicionales');
            opcionesAdicionalesCeldas.forEach(celda => {
                if (respuestasUsuario[indiceActual]['preguntaAdicional'].opcion && celda.dataset.opcionTexto === respuestasUsuario[indiceActual]['preguntaAdicional'].opcion) {
                    seleccionarOpcionAdicional.call(celda);
                }
            });
        } else {
            preguntaAdicionalUsuarioInput.value = "";
            deshabilitarOpcionesAdicionales();
            respuestaAdicionalUsuario = null;
        }
    } else {
        respuestaAdicionalUsuario = null;
        deshabilitarOpcionesAdicionales();
    }

    renderizarCuestionario();
    actualizarBotones();
}

// Definir las funciones listener por separado para poder removerlas
function cambiarCuestionarioAnterior() {
    cambiarCuestionario(-1);
}

function cambiarCuestionarioSiguiente() {
    cambiarCuestionario(1);
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
    // Guardar la respuesta adicional si existe
    if (preguntaAdicionalUsuarioInput && preguntaAdicionalUsuarioInput.value.trim() !== "") {
        const pregunta = preguntaAdicionalUsuarioInput.value.trim();
        respuestasUsuario[indiceActual]['preguntaAdicional'] = {
            pregunta: pregunta,
            opcion: respuestaAdicionalUsuario ? respuestaAdicionalUsuario.opcion : null,
            puntaje: respuestaAdicionalUsuario ? respuestaAdicionalUsuario.puntaje : null
        };
    } else if (respuestasUsuario[indiceActual] && respuestasUsuario[indiceActual]['preguntaAdicional']) {
        delete respuestasUsuario[indiceActual]['preguntaAdicional']; // Eliminar si se borra la pregunta
    }

    // Guardar las respuestas del cuestionario actual
    localStorage.setItem('respuestasUsuario', JSON.stringify(respuestasUsuario));

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

    // Solo inicializa si no existe
    if (!respuestasUsuario[indiceActual]) {
        respuestasUsuario[indiceActual] = {};
    }

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

             // Restaurar la selección si ya existe una respuesta guardada
            const respuestaGuardada = respuestasUsuario[indiceActual][pregunta];
            if (respuestaGuardada && respuestaGuardada.opcion === opcion.texto) {
                celda.classList.add("bg-[#E89CA1]", "text-white");
            }

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
    localStorage.removeItem('respuestasUsuario'); // Limpiar las respuestas al reiniciar
    iniciarCuestionario(); // Volver a iniciar para re-filtrar o mostrar todo
    actualizarBotones();
    if (preguntaAdicionalUsuarioInput) {
        preguntaAdicionalUsuarioInput.value = "";
    }
    deshabilitarOpcionesAdicionales();
}

function finalizarCuestionario() {
    // Supón que tienes un array de respuestas con área y valor
    // Ejemplo: [{ area: "Salud", valor: 7 }, { area: "Trabajo", valor: 5 }, ...]
    // const respuestas = obtenerRespuestasUsuario(); // Implementa esta función según tu lógica
    if (preguntaAdicionalUsuarioInput && preguntaAdicionalUsuarioInput.value.trim() !== "") {
        const pregunta = preguntaAdicionalUsuarioInput.value.trim();
        respuestasUsuario[indiceActual]['preguntaAdicional'] = {
            pregunta: pregunta,
            opcion: respuestaAdicionalUsuario ? respuestaAdicionalUsuario.opcion : null,
            puntaje: respuestaAdicionalUsuario ? respuestaAdicionalUsuario.puntaje : null
        };
    } else if (respuestasUsuario[indiceActual] && respuestasUsuario[indiceActual]['preguntaAdicional']) {
        delete respuestasUsuario[indiceActual]['preguntaAdicional'];
    }

    // Guarda las respuestas del cuestionario actual en localStorage
    localStorage.setItem('respuestasUsuario', JSON.stringify(respuestasUsuario));
    
    const resultadosPorArea = cuestionariosFiltrados.map((cuestionario, idx) => {
        let suma = 0;
        // Si no hay respuestas para esta área, suma será 0
        const respuestasArea = respuestasUsuario[idx] || {};
        cuestionario.preguntas.forEach(pregunta => {
            const respuesta = respuestasArea[pregunta];
            if (respuesta && typeof respuesta.puntaje === 'number') {
                suma += respuesta.puntaje;
            }
        });
        // Pregunta adicional
        if (respuestasArea['preguntaAdicional'] && typeof respuestasArea['preguntaAdicional'].puntaje === 'number') {
            suma += respuestasArea['preguntaAdicional'].puntaje;
        }
        return Math.round(suma);
    });

    const titulosPorArea = cuestionariosFiltrados.map(c => c.titulo);

    localStorage.setItem('resultadosPorArea', JSON.stringify(resultadosPorArea));
    localStorage.setItem('titulosPorArea', JSON.stringify(titulosPorArea));

    window.loadPage("contenido/resultado/resultado.html", inicializarResultados);
}

export { iniciarCuestionario }; // Exporta la función iniciarCuestionario