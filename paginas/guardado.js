document.addEventListener('DOMContentLoaded', () => {
    const respuestasUsuario = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
    const cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividadesGuardadas')) || [];

    const resumenDiv = document.getElementById('resumen-por-area');
    const detallesDiv = document.getElementById('resultados-detallados');
    const actividadesDiv = document.getElementById('actividades-guardadas');

    const resultadosPorArea = [];
    const titulosPorArea = [];

    cuestionariosFiltrados.forEach((cuestionario, idx) => {
        let suma = 0;
        const respuestas = respuestasUsuario[idx] || {};

        cuestionario.preguntas.forEach(pregunta => {
            const r = respuestas[pregunta];
            if (r && typeof r.puntaje === 'number') suma += r.puntaje;
        });

        if (respuestas.preguntaAdicional && typeof respuestas.preguntaAdicional.puntaje === 'number') {
            suma += respuestas.preguntaAdicional.puntaje;
        }

        resultadosPorArea.push(Math.round(suma));
        titulosPorArea.push(cuestionario.titulo);
    });

    // Mostrar resumen por área (leyenda sencilla)
    if (resumenDiv && titulosPorArea.length > 0) {
        resumenDiv.innerHTML = titulosPorArea.map((titulo, i) => `
            <div class="p-4 bg-gray-50 border rounded shadow-sm text-gray-700">
                <strong>${titulo}:</strong> ${resultadosPorArea[i]} puntos
            </div>
        `).join('');
    }

    // Mostrar resultados detallados
    if (detallesDiv && cuestionariosFiltrados.length > 0) {
        let html = '<ul class="list-disc pl-5 space-y-4">';
        cuestionariosFiltrados.forEach((cuestionario, idx) => {
            const respuestas = respuestasUsuario[idx] || {};
            const puntajeTotal = resultadosPorArea[idx];

            html += `<li><strong class="text-gray-800">${cuestionario.titulo}:</strong> ${puntajeTotal} puntos<ul class="list-disc pl-6 text-sm text-gray-600">`;

            cuestionario.preguntas.forEach(pregunta => {
                const r = respuestas[pregunta];
                if (r) html += `<li>${pregunta}: ${r.opcion} (${r.puntaje} pts)</li>`;
            });

            const pa = respuestas.preguntaAdicional;
            if (pa && pa.pregunta) {
                html += `<li>${pa.pregunta}: ${pa.opcion ? `${pa.opcion} (${pa.puntaje} pts)` : 'Sin respuesta'}</li>`;
            }

            html += '</ul></li>';
        });
        html += '</ul>';
        detallesDiv.innerHTML = html;
    } else {
        detallesDiv.innerHTML = '<p class="text-gray-500">No hay respuestas para mostrar.</p>';
    }

    // Mostrar actividades guardadas
    if (actividadesDiv && actividadesGuardadas.length > 0) {
        let html = `
            <div class="overflow-x-auto">
                <table class="table-auto w-full text-sm border border-gray-300">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="p-2 border">Área</th>
                            <th class="p-2 border">Actividad</th>
                            <th class="p-2 border">Fecha Inicio</th>
                            <th class="p-2 border">Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        actividadesGuardadas.forEach(a => {
            html += `
                <tr>
                    <td class="p-2 border">${a.area}</td>
                    <td class="p-2 border">${a.actividad}</td>
                    <td class="p-2 border">${a.fechaInicio}</td>
                    <td class="p-2 border">${a.fechaFin}</td>
                </tr>
            `;
        });
        html += '</tbody></table></div>';
        actividadesDiv.innerHTML = html;
    } else {
        actividadesDiv.innerHTML = '<p class="text-gray-500">No hay actividades registradas.</p>';
    }
});
