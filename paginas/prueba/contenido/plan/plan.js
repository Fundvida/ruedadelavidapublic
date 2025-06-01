import actividadesPorArea from '../../datos/plan.data.js';
import { auth, db } from '../../../admin/firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function inicializarPlan() {
    // localStorage.removeItem('actividadesGuardadas');
    const seleccionArea = document.getElementById('seleccion-area');
    const listaActividades = document.getElementById('lista-actividades');
    const agregarActividadBoton = document.getElementById('agregar-actividad');
    const guardarActividadBoton = document.getElementById('guardar-actividad');
    const contenedorActividades = document.getElementById('contenedor-actividades');

    // --- NUEVO: Calcular áreas de rango bajo y medio ---
    let respuestasUsuarioGuardadas = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
    let cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];
    let actividadesGuardadas = JSON.parse(localStorage.getItem('actividadesGuardadas')) || [];

    const guardarResultadosBtn = document.getElementById('guardarResultadosBtn');

    let usuario = null;

    // --- Autenticación y Carga de Datos desde Firebase ---
    onAuthStateChanged(auth, async (user) => {
        usuario = user;
        if (user) {
            console.log("Usuario logeado:", usuario.uid);
            await cargarDatosUsuarioDesdeFirebase(user.uid);
            mostrarTablaActividades(); // Actualiza la UI con los datos cargados/existentes
        } else {
            console.log("No hay usuario logeado.");
            // Si no hay usuario, asegura que se muestren los datos locales si existen
            mostrarTablaActividades();
        }
    });

    if (guardarResultadosBtn) {
        guardarResultadosBtn.addEventListener('click', async () => {
            if (!usuario) {
                console.error("Intento de guardar sin usuario logeado.");
                return;
            }

            try {
                const datosParaGuardar = {
                    usuarioId: usuario.uid,
                    respuestasUsuario: respuestasUsuarioGuardadas,
                    cuestionariosFiltrados: cuestionariosFiltrados,
                    actividadesGuardadas: JSON.parse(localStorage.getItem('actividadesGuardadas')) || [],
                    fechaGuardado: serverTimestamp(), // Esto guarda la fecha y hora del servidor de Firebase
                };

                await addDoc(collection(db, "resultados"), datosParaGuardar);

                console.log("Redirigiendo a /paginas/guardado/guardado.html");
                window.location.href = '/paginas/guardado/guardado.html';

            } catch (error) {
                console.error("Error al guardar los resultados:", error);
            }
        });
    }

    async function cargarDatosUsuarioDesdeFirebase(uid) {
        if (respuestasUsuarioGuardadas.length === 0 || cuestionariosFiltrados.length === 0 || actividadesGuardadas.length === 0) {
            try {
                const q = query(
                    collection(db, "resultados"),
                    where("usuarioId", "==", uid),
                    orderBy("fechaGuardado", "desc"),
                    limit(1)
                );
                const userDoc = await getDocs(q);

                if (!userDoc.empty) {
                    const data = userDoc.docs[0].data();
                    if (data.respuestasUsuario && respuestasUsuarioGuardadas.length === 0) {
                        localStorage.setItem('respuestasUsuario', JSON.stringify(data.respuestasUsuario));
                        respuestasUsuarioGuardadas = data.respuestasUsuario;
                    }
                    if (data.cuestionariosFiltrados && cuestionariosFiltrados.length === 0) {
                        localStorage.setItem('cuestionariosFiltrados', JSON.stringify(data.cuestionariosFiltrados));
                        cuestionariosFiltrados = data.cuestionariosFiltrados;
                    }
                    if (data.actividadesGuardadas && actividadesGuardadas.length === 0) {
                        localStorage.setItem('actividadesGuardadas', JSON.stringify(data.actividadesGuardadas));
                        actividadesGuardadas = data.actividadesGuardadas;
                    }
                    console.log("Datos cargados desde Firebase.");
                } else {
                    console.log("No hay datos de usuario en Firebase para cargar.");
                }
            } catch (error) {
                console.error("Error al cargar datos de Firebase:", error);
            }
        } else {
            console.log("Datos ya existen en localStorage, no se carga de Firebase.");
        }
    }

    // Determinar el rango de cada área
    let areasBajo = [];
    let areasMedio = [];
    if (respuestasUsuarioGuardadas.length && cuestionariosFiltrados.length) {
        cuestionariosFiltrados.forEach((area, idx) => {
            let suma = 0;
            const respuestasDeSeccion = respuestasUsuarioGuardadas[idx] || {};
            Object.values(respuestasDeSeccion).forEach(respuesta => {
                if (respuesta && typeof respuesta.puntaje === 'number') {
                    suma += respuesta.puntaje;
                }
            });
            suma = Math.round(suma);
            if (suma < 5) {
                areasBajo.push(area);
            } else if (suma >= 5 && suma <= 8) {
                areasMedio.push(area);
            }
        });
    }
    // Unir primero bajo, luego medio, máximo 10
    const areasParaPlan = [...areasBajo, ...areasMedio].slice(0, 10);
    const areasBajoValores = areasBajo.map(area => area.numeroSeccion);

    // --- FIN NUEVO ---

    let numActividades = 0;
    const actividadesSeleccionadas = {};
    let areasBajoCompletadas = false;

    // Inicialización de la interfaz
    contenedorActividades.innerHTML = '';
    agregarActividadBoton.disabled = true;

    // Llenar el combo de áreas
    areasParaPlan.forEach(area => {
        const opcion = document.createElement('option');
        opcion.value = area.numeroSeccion;
        opcion.textContent = area.titulo;
        // Marcar las opciones de rango medio con un atributo personalizado
        if (areasMedio.includes(area)) {
            opcion.setAttribute('data-rango', 'medio');
        } else {
            opcion.setAttribute('data-rango', 'bajo');
        }
        seleccionArea.appendChild(opcion);
    });

    function obtenerActividadesArea(numeroSeccion) {
        const area = actividadesPorArea.find(area => area.numeroSeccion === parseInt(numeroSeccion));
        return area ? area.actividades : [];
    }

    function crearNuevaFilaActividad(areaSeleccionada) {
        const numeroSeccion = parseInt(areaSeleccionada);
        const actividadesArea = obtenerActividadesArea(numeroSeccion);

        if (actividadesArea.length && numActividades < 10) {
            const nuevaFila = document.createElement('div');
            nuevaFila.id = `actividad-fila-${numActividades}`;
            nuevaFila.setAttribute('data-area', areaSeleccionada);
            nuevaFila.className = 'grid grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-4 items-center';

            nuevaFila.innerHTML = `
            <div>
                <select id="actividad-${numActividades}" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#7C5C56] leading-tight focus:outline-none focus:shadow-outline actividad-select">
                    <option value="">Selecciona una actividad</option>
                    ${actividadesArea
                    .map(actividad => `<option value="${actividad}">${actividad}</option>`)
                    .join('')}
                </select>
            </div>
            <div>
                <input type="date" id="fecha-inicio-${numActividades}" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#7C5C56] leading-tight focus:outline-none focus:shadow-outline fecha-inicio">
            </div>
            <div>
                <input type="date" id="fecha-fin-${numActividades}" class="shadow appearance-none border rounded w-full py-2 px-3 text-[#7C5C56] leading-tight focus:outline-none focus:shadow-outline fecha-fin">
            </div>
             <div class="flex justify-center">
                <button class="delete-activity cursor-pointer" data-id="${numActividades}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`;

            contenedorActividades.appendChild(nuevaFila);

            const deleteButton = nuevaFila.querySelector('.delete-activity');
            if (deleteButton) {
                deleteButton.addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    eliminarActividad(parseInt(id));
                });
            }

            const fechaInicio = nuevaFila.querySelector(`#fecha-inicio-${numActividades}`);
            const fechaFin = nuevaFila.querySelector(`#fecha-fin-${numActividades}`);

            // Agregar validación de fechas
            fechaInicio.addEventListener('change', () => {
                fechaFin.min = fechaInicio.value;
                if (fechaFin.value && fechaFin.value < fechaInicio.value) {
                    fechaFin.value = fechaInicio.value;
                }
            });

            fechaFin.addEventListener('change', () => {
                if (fechaInicio.value && fechaFin.value < fechaInicio.value) {
                    alert('La fecha de fin no puede ser anterior a la fecha de inicio');
                    fechaFin.value = fechaInicio.value;
                }
            });

            actualizarOpcionesActividad(numActividades, areaSeleccionada);
            numActividades++;
        } else {
            if (numActividades >= 10) {
                alert('Solo puedes agregar hasta 10 actividades.');
            }
        }
    }

    function eliminarActividad(filaIndex) {
        const fila = document.getElementById(`actividad-fila-${filaIndex}`);
        if (fila) {
            // Obtener el select de actividad antes de eliminar la fila
            const select = fila.querySelector('.actividad-select');
            if (select && select.value) {
                // Eliminar la actividad de las seleccionadas
                delete actividadesSeleccionadas[filaIndex];
            }

            // Eliminar la fila
            fila.remove();

            // Actualizar las actividades disponibles
            actualizarDisponibilidadActividades();
        }
    }

    function actualizarDisponibilidadActividades() {
        const actividadesSelects = document.querySelectorAll('.actividad-select');
        const areaSeleccionada = seleccionArea.value;

        if (!areaSeleccionada) return;

        actividadesSelects.forEach(select => {
            const filaIndex = select.id.split('-')[1];
            if (filaIndex) {
                actualizarOpcionesActividad(filaIndex, areaSeleccionada);
            }
        });
    }

    function actualizarOpcionesActividad(filaIndex, areaSeleccionada) {
        const actividadSelect = document.getElementById(`actividad-${filaIndex}`);
        if (!actividadSelect) return;

        const valorActual = actividadSelect.value;
        const numeroSeccion = parseInt(areaSeleccionada);
        const actividadesArea = actividadesPorArea.find(area => area.numeroSeccion === numeroSeccion);

        if (actividadesArea) {
            const actividadesDisponibles = actividadesArea.actividades.filter(actividad =>
                !Object.values(actividadesSeleccionadas).flat().includes(actividad) ||
                actividad === valorActual
            );

            actividadSelect.innerHTML = '<option value="">Selecciona una actividad</option>' +
                actividadesDisponibles.map(actividad =>
                    `<option value="${actividad}">${actividad}</option>`
                ).join('');

            actividadSelect.value = valorActual;
        }
    }

    function mostrarAlerta(mensaje) {
        const alertContainer = document.getElementById("alert-container"); // Asegúrate de tener un contenedor con este ID en tu HTML
        alertContainer.innerHTML = `
        <div class="bg-red-100 border border-red-200 text-red-700 pl-5 pr-10 py-3 rounded relative" role="alert">
            <span class="block sm:inline">${mensaje}</span>
            <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="this.parentNode.remove()">
                <i class="fas fa-times text-red-800 text-2xl cursor-pointer"></i>
            </button>
        </div>
    `;
    }

    function guardarActividades() {
        const actividades = [];
        const filas = document.querySelectorAll('#contenedor-actividades > div');

        filas.forEach(fila => {
            const actividad = fila.querySelector('.actividad-select').value;
            const fechaInicio = fila.querySelector('.fecha-inicio').value;
            const fechaFin = fila.querySelector('.fecha-fin').value;
            const area = seleccionArea.options[seleccionArea.selectedIndex].text; // Obtener el área seleccionada

            if (actividad && fechaInicio && fechaFin) {
                actividades.push({ area, actividad, fechaInicio, fechaFin });
            }
        });

        if (actividades.length > 0) {
            const actividadesGuardadas = JSON.parse(localStorage.getItem('actividadesGuardadas')) || [];
            const nuevasActividades = [...actividadesGuardadas, ...actividades];

            //localStorage.setItem('actividadesGuardadas', JSON.stringify(nuevasActividades));
            const actividadesUnicas = [];
            const actividadesSet = new Set(); // Para almacenar actividades como cadenas y detectar duplicados

            nuevasActividades.forEach(act => {
                const key = `${act.area}|${act.actividad}|${act.fechaInicio}|${act.fechaFin}`;
                if (!actividadesSet.has(key)) {
                    actividadesSet.add(key);
                    actividadesUnicas.push(act);
                }
            });

            // Guardar
            localStorage.setItem('actividadesGuardadas', JSON.stringify(actividadesUnicas));

            const areasGuardadas = nuevasActividades.map(act => act.area);
            areasBajoCompletadas = areasBajo.every(area => areasGuardadas.includes(area.titulo));

            // Mostrar la tabla con todas las actividades guardadas
            mostrarTablaActividades();
        } else {
            mostrarAlerta('Debes elegir una fecha para la actividad.');
        }
    }

    function mostrarTablaActividades(actividades) {
        // Obtener las actividades guardadas del localStorage
        const actividadesGuardadas = JSON.parse(localStorage.getItem('actividadesGuardadas')) || [];

        // Eliminar cualquier tabla existente antes de crear una nueva
        const tablaExistente = document.querySelector('#tabla-actividades');
        if (tablaExistente) {
            tablaExistente.remove();
        }

        // Crear la tabla
        const tabla = document.createElement('table');
        tabla.id = 'tabla-actividades'; // Asignar un ID para evitar duplicados
        tabla.className = 'w-full mt-4 border-collapse border border-gray-300';

        const encabezado = `
        <thead>
            <tr>
                <th class="border border-gray-300 px-4 py-2">Área</th>
                <th class="border border-gray-300 px-4 py-2">Actividad</th>
                <th class="border border-gray-300 px-4 py-2">Fecha Inicio</th>
                <th class="border border-gray-300 px-4 py-2">Fecha Final</th>
            </tr>
        </thead>
    `;

        const cuerpo = actividadesGuardadas.map(act => `
        <tr>
            <td class="border border-gray-300 px-4 py-2">${act.area}</td>
            <td class="border border-gray-300 px-4 py-2">${act.actividad}</td>
            <td class="border border-gray-300 px-4 py-2">${act.fechaInicio}</td>
            <td class="border border-gray-300 px-4 py-2">${act.fechaFin}</td>
        </tr>
    `).join('');

        tabla.innerHTML = encabezado + `<tbody>${cuerpo}</tbody>`;

        // Agregar la tabla al DOM
        listaActividades.appendChild(tabla);

        // Mostrar los botones de descarga
        const botonesDescarga = document.getElementById('botones-descarga');
        if (botonesDescarga) {
            botonesDescarga.style.display = 'flex';
        }
    }

    // Manejador del botón "Guardar Actividades"
    guardarActividadBoton.addEventListener('click', guardarActividades);

    // Descargar tabla como Excel
    document.getElementById('descargar-excel').addEventListener('click', () => {
        const actividadesGuardadas = JSON.parse(localStorage.getItem('actividadesGuardadas')) || [];
        if (actividadesGuardadas.length === 0) return;

        // Crear hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(actividadesGuardadas);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Actividades");

        // Descargar archivo
        XLSX.writeFile(wb, "actividades.xlsx");
    });

    // Descargar tabla como PDF
    document.getElementById('descargar-pdf').addEventListener('click', () => {
        const tabla = document.getElementById('tabla-actividades');
        if (!tabla) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.autoTable({
            html: '#tabla-actividades',
            theme: 'striped',
            headStyles: { fillColor: [233, 156, 161] }, // color rosado suave
            styles: { fontSize: 10, cellPadding: 3 },
            margin: { top: 20 }
        });

        doc.save('actividades.pdf');
    });


    // Manejadores de eventos
    seleccionArea.addEventListener('change', (event) => {
        const areaSeleccionada = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const rango = selectedOption ? selectedOption.getAttribute('data-rango') : null;

        // Validación: ¿faltan áreas de rango bajo sin actividad?
        const actividadesActuales = Array.from(document.querySelectorAll('#contenedor-actividades > div')).map(fila => {
            return fila.getAttribute('data-area');
        });
        const faltanBajo = areasBajoValores.some(numSeccion => !actividadesActuales.includes(String(numSeccion)));

        // Solo mostrar la alerta si faltan áreas de rango bajo
        if (rango === 'medio' && !areasBajoCompletadas) {
            mostrarAlerta('Primero debes elegir actividades de las áreas en color rojo.');
            // Detener aquí para que no borre ni habilite nada más
            return;
        }

        // Si ya no faltan áreas de rango bajo, puedes deshabilitar las opciones de rango bajo
        if (!faltanBajo) {
            Array.from(seleccionArea.options).forEach(opt => {
                if (opt.getAttribute('data-rango') === 'bajo' && opt.value !== "") {
                    opt.disabled = true;
                }
            });
        }

        agregarActividadBoton.disabled = !areaSeleccionada;
        if (areaSeleccionada) {
            contenedorActividades.innerHTML = '';
            numActividades = 0;
            Object.keys(actividadesSeleccionadas).forEach(key => delete actividadesSeleccionadas[key]);
        }
    });
    agregarActividadBoton.addEventListener('click', () => {
        if (seleccionArea.value) {
            crearNuevaFilaActividad(seleccionArea.value);
        } else {
            alert('Por favor, selecciona un área antes de agregar una actividad.');
        }
    });

    listaActividades.addEventListener('change', (event) => {
        if (!event.target.classList.contains('actividad-select')) return;

        const filaIndex = event.target.id.split('-')[1];
        const actividadSeleccionada = event.target.value;

        if (actividadSeleccionada) {
            actividadesSeleccionadas[filaIndex] = [actividadSeleccionada];
            actualizarDisponibilidadActividades();
        } else {
            delete actividadesSeleccionadas[filaIndex];
        }
    });
}

export { inicializarPlan };