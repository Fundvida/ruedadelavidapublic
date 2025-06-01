import { auth, db } from "../admin/firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // Importa signOut
import { collection, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function () {
    let respuestasUsuario = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
    let cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];
    let actividadesGuardadas = JSON.parse(localStorage.getItem('actividadesGuardadas')) || [];

    const resumenDiv = document.getElementById('resumen-por-area');
    const detallesDiv = document.getElementById('resultados-detallados');
    const actividadesDiv = document.getElementById('actividades-guardadas');

    // Referencias a los nuevos botones
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Configurar acciones de los botones
    if (loginBtn) {
        // Asumiendo que 'login.html' está en '/paginas/admin/login.html'
        loginBtn.addEventListener('click', () => {
            window.location.href = '/paginas/admin/login.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                console.log("Sesión cerrada exitosamente. Redirigiendo a login.");
                // Limpia el localStorage al cerrar sesión para evitar mostrar datos antiguos
                localStorage.removeItem('respuestasUsuario');
                localStorage.removeItem('cuestionariosFiltrados');
                localStorage.removeItem('actividadesGuardadas');
                window.location.href = '/paginas/admin/login.html'; // Redirige al login
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un problema al cerrar tu sesión. Inténtalo de nuevo.");
            }
        });
    }

    async function obtenerResultadosMasRecientes(usuarioId) {
        if (!usuarioId) {
            console.warn("No se proporcionó un usuario para obtener los resultados de Firestore.");
            return null;
        }
        try {
            const q = query(
                collection(db, "resultados"),
                where("usuarioId", "==", usuarioId),
                orderBy("fechaGuardado", "desc"),
                limit(1)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data();
            } else {
                console.log("No se encontraron resultados guardados en Firestore para este usuario.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener resultados de Firestore:", error);
            return null;
        }
    }

    function renderizarResultados() {
        const resultadosPorArea = [];
        const titulosPorArea = [];

        if (cuestionariosFiltrados.length > 0) {
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
        }


        // Mostrar resumen por área (leyenda sencilla)
        if (resumenDiv && titulosPorArea.length > 0) {
            resumenDiv.innerHTML = titulosPorArea.map((titulo, i) => `
                <div class="p-4 bg-gray-50 border rounded shadow-sm text-gray-700">
                    <strong>${titulo}:</strong> ${resultadosPorArea[i]} puntos
                </div>
            `).join('');
        } else if (resumenDiv) {
            resumenDiv.innerHTML = '<p class="text-gray-500">No hay resumen de áreas para mostrar.</p>';
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
        } else if (detallesDiv) {
            detallesDiv.innerHTML = '<p class="text-gray-500">No hay respuestas detalladas para mostrar.</p>';
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
        } else if (actividadesDiv) {
            actividadesDiv.innerHTML = '<p class="text-gray-500">No hay actividades registradas.</p>';
        }
    }

    // Lógica principal al cargar el DOM
    renderizarResultados(); // Muestra los datos de localStorage primero

    // Escucha los cambios de estado de autenticación
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Usuario logeado: oculta Iniciar Sesión, muestra Cerrar Sesión
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');

            console.log("Usuario logeado:", user.uid);
            const resultadosFirestore = await obtenerResultadosMasRecientes(user.uid);

            if (resultadosFirestore) {
                console.log("Datos más recientes obtenidos de Firestore:", resultadosFirestore);
                respuestasUsuario = resultadosFirestore.respuestasUsuario || [];
                cuestionariosFiltrados = resultadosFirestore.cuestionariosFiltrados || [];
                actividadesGuardadas = resultadosFirestore.actividadesGuardadas || [];
                renderizarResultados(); // Vuelve a renderizar con los datos de Firestore
            } else {
                console.log("No se pudo obtener datos recientes de Firestore, mostrando datos de localStorage.");
            }
        } else {
            // No hay usuario logeado: muestra Iniciar Sesión, oculta Cerrar Sesión
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            console.log("No hay usuario logeado. Mostrando datos de localStorage.");
        }
    });
});