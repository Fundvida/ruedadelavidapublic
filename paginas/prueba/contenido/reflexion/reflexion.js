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
                bgColor = '#A8D5A2'; // verde suave
            } else if (suma >= 5) {
                rango = 'medio';
                bgColor = '#FFF5B7'; // amarillo suave
            } else {
                rango = 'bajo';
                bgColor = '#E6A5A1'; // rojo suave
            }

            // Obtener la frase de reflexión
            const reflexion = reflexionesPorSeccion.find(r => r.titulo === seccionInfo.titulo);
            const frase = reflexion ? reflexion[rango] : '';

            // Crear fila con colores
            const fila = tablaRespuestasBody.insertRow();
            const celdaSeccion = fila.insertCell();
            celdaSeccion.textContent = seccionInfo.titulo;
            celdaSeccion.classList.add('p-4', 'border', 'border-[#b3a28a]', 'text-center');
            celdaSeccion.style.backgroundColor = bgColor;

            const celdaReflexion = fila.insertCell();
            celdaReflexion.textContent = frase;
            celdaReflexion.classList.add('p-4', 'border', 'border-[#b3a28a]', 'text-center');
            celdaReflexion.style.backgroundColor = bgColor;
        });
    }
    // Si no hay resultados válidos, tabla queda vacía
}

export { inicializarReflexion };
