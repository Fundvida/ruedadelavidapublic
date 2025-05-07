import { reflexionesPorSeccion } from '../../datos/reflexion.data.js';

function inicializarReflexion() {
    const tablaRespuestasBody = document.getElementById('tabla-respuestas');
    const respuestasUsuarioGuardadas = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
    const cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];

    if (respuestasUsuarioGuardadas.length > 0 && cuestionariosFiltrados.length > 0 &&
        respuestasUsuarioGuardadas.some(resp => Object.keys(resp || {}).length > 0)) 
    {
        cuestionariosFiltrados.forEach((seccionInfo, indexSeccion) => {
            const respuestasDeSeccion = respuestasUsuarioGuardadas[indexSeccion] || {};
            let suma = 0;

            Object.values(respuestasDeSeccion).forEach(respuesta => {
                if (respuesta && typeof respuesta.puntaje === 'number') {
                    suma += respuesta.puntaje;
                }
            });

            suma = Math.round(suma);

            // Determinar el rango y color
            let rango = '';
            let bgColor = '';
            if (suma > 8) {
                rango = 'alto';
                bgColor = 'rgb(74, 183, 80)'; // verde suave
            } else if (suma >= 5) {
                rango = 'medio';
                bgColor = 'rgb(249, 242, 93)'; // amarillo suave
            } else {
                rango = 'bajo';
                bgColor = 'rgb(213, 68, 68)'; // rojo suave
            }

            // Obtener la frase de reflexión
            const reflexion = reflexionesPorSeccion.find(r => r.titulo === seccionInfo.titulo);
            const frase = reflexion ? reflexion[rango] : '';

            // Crear fila con colores
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
    }
    // Si no hay resultados válidos, tabla queda vacía
}

export { inicializarReflexion };
