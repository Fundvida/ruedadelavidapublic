import { reflexionesPorSeccion } from '../../datos/reflexion.data.js';

function inicializarReflexion() {
    const tablaRespuestasBody = document.getElementById('tabla-respuestas');
    const respuestasUsuarioGuardadas = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
    const cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];

    if (respuestasUsuarioGuardadas.length > 0 && cuestionariosFiltrados.length > 0) {
        cuestionariosFiltrados.forEach((seccionInfo, indexSeccion) => {
            // Sumar el puntaje total de la sección
            const respuestasDeSeccion = respuestasUsuarioGuardadas[indexSeccion] || {};
            let suma = 0;
            Object.values(respuestasDeSeccion).forEach(respuesta => {
                if (respuesta && typeof respuesta.puntaje === 'number') {
                    suma += respuesta.puntaje;
                }
            });
            suma = Math.round(suma);

            // Determinar el rango de puntaje
            let rango = '';
            let bgColor = '';
            if (suma > 8) {
                rango = 'alto';
                bgColor = '#A5D6A7'; // verde suave
            } else if (suma >= 5) {
                rango = 'medio';
                bgColor = '#FFF59D'; // amarillo suave
            } else {
                rango = 'bajo';
                bgColor = '#EF9A9A'; // rojo suave
            }

             // Buscar el objeto de reflexión por título
            const reflexion = reflexionesPorSeccion.find(
                r => r.titulo === seccionInfo.titulo
            );
            const frase = reflexion ? reflexion[rango] : 'Reflexiona sobre esta área.';

            // Crear la fila
            const fila = tablaRespuestasBody.insertRow();
            const celdaSeccion = fila.insertCell();
            celdaSeccion.textContent = seccionInfo.titulo;
            celdaSeccion.classList.add('p-4', 'border', 'text-center');
            celdaSeccion.style.backgroundColor = bgColor;

            const celdaReflexion = fila.insertCell();
            celdaReflexion.textContent = frase;
            celdaReflexion.classList.add('p-4', 'border', 'text-center');
            celdaReflexion.style.backgroundColor = bgColor;
        });
    } else {
        const fila = tablaRespuestasBody.insertRow();
        const celdaMensaje = fila.insertCell();
        celdaMensaje.colSpan = 2;
        celdaMensaje.textContent = 'No se encontraron respuestas del formulario.';
        celdaMensaje.classList.add('text-center', 'p-4');
    }
}

export { inicializarReflexion };