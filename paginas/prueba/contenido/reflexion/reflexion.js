function inicializarReflexion() {
    const tablaRespuestasBody = document.getElementById('tabla-respuestas');
    const respuestasUsuarioGuardadas = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
    const cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];

    // Agregar una columna extra para la pregunta adicional
    const theadRow = document.querySelector('#tabla-respuestas').parentElement.querySelector('thead tr');
    const thAdicional = document.createElement('th');
    thAdicional.className = 'p-4 border border-gray-600';
    thAdicional.textContent = 'Pregunta Adicional';
    theadRow.appendChild(thAdicional);

    if (respuestasUsuarioGuardadas.length > 0 && cuestionariosFiltrados.length > 0) {
        cuestionariosFiltrados.forEach((seccionInfo, indexSeccion) => {
            const fila = tablaRespuestasBody.insertRow();
            const celdaSeccion = fila.insertCell();
            celdaSeccion.textContent = seccionInfo.titulo;
            celdaSeccion.classList.add('p-4', "border");

            const respuestasDeSeccion = respuestasUsuarioGuardadas.find(respuesta =>
                Object.keys(respuesta)[0] === seccionInfo.titulo
            );

            for (let i = 0; i < 10; i++) {
                const celdaRespuesta = fila.insertCell();
                if (respuestasDeSeccion && Object.values(respuestasDeSeccion)[0] && Object.values(respuestasDeSeccion)[0][i]) {
                    const respuesta = Object.values(respuestasDeSeccion)[0][Object.keys(Object.values(respuestasDeSeccion)[0])[i]];
                    celdaRespuesta.textContent = respuesta.opcion || '-';
                    if (respuesta.puntaje !== undefined) {
                        if (respuesta.puntaje < 0.4) {
                            celdaRespuesta.classList.add('text-red-500');
                        } else if (respuesta.puntaje < 0.7) {
                            celdaRespuesta.classList.add('text-yellow-500');
                        } else {
                            celdaRespuesta.classList.add('text-green-500');
                        }
                    }
                } else {
                    celdaRespuesta.textContent = '-';
                }
                celdaRespuesta.classList.add('text-center');
                celdaRespuesta.classList.add('border');
            }

            // Agregar la respuesta adicional al final de cada fila
            const celdaAdicional = fila.insertCell();
            if (respuestasDeSeccion && respuestasDeSeccion.preguntaAdicional) {
                celdaAdicional.textContent = respuestasDeSeccion.preguntaAdicional.opcion || '-';
                if (respuestasDeSeccion.preguntaAdicional.puntaje !== undefined) {
                    if (respuestasDeSeccion.preguntaAdicional.puntaje < 0.4) {
                        celdaAdicional.classList.add('text-red-500');
                    } else if (respuestasDeSeccion.preguntaAdicional.puntaje < 0.7) {
                        celdaAdicional.classList.add('text-yellow-500');
                    } else {
                        celdaAdicional.classList.add('text-green-500');
                    }
                }
            } else {
                celdaAdicional.textContent = '-';
            }
            celdaAdicional.classList.add('text-center');
            celdaAdicional.classList.add('border');
        });
    } else {
        const fila = tablaRespuestasBody.insertRow();
        const celdaMensaje = fila.insertCell();
        celdaMensaje.colSpan = 12;
        celdaMensaje.textContent = 'No se encontraron respuestas del formulario.';
        celdaMensaje.classList.add('text-center', 'p-4');
    }
}

export { inicializarReflexion };