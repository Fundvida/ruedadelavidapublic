import actividadesPorArea from './plan.data.js';

function inicializarPlan() {
    console.log('Función de inicialización del Plan llamada.');

    const seleccionArea = document.getElementById('seleccion-area');
    const listaActividades = document.getElementById('lista-actividades');
    const agregarActividadBoton = document.getElementById('agregar-actividad');
    const mensajeSeleccionaArea = document.createElement('p');
    mensajeSeleccionaArea.className = 'text-gray-700 mb-4';
    mensajeSeleccionaArea.textContent = 'Por favor, selecciona un área para comenzar a planificar tus actividades.';

    const cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];
    let numActividades = 0;
    const actividadesSeleccionadas = {};

    // Limpiar el contenedor de actividades inicialmente
    listaActividades.innerHTML = '';
    listaActividades.appendChild(mensajeSeleccionaArea);
    agregarActividadBoton.disabled = true;

    // Llenar el combo de selección de área
    cuestionariosFiltrados.forEach(area => {
        const opcion = document.createElement('option');
        opcion.value = area.titulo;
        opcion.textContent = area.titulo;
        seleccionArea.appendChild(opcion);
    });

    function actualizarOpcionesActividad(filaIndex, areaSeleccionada) {
        const actividadSelect = document.getElementById(`actividad-${filaIndex}`);
        if (actividadSelect) {
            const valorActual = actividadSelect.value;
            actividadSelect.innerHTML = '<option value="">Selecciona una actividad</option>';
            if (areaSeleccionada && actividadesPorArea[areaSeleccionada]) {
                const actividadesDisponibles = actividadesPorArea[areaSeleccionada].filter(actividad =>
                    !Object.values(actividadesSeleccionadas).flat().includes(actividad) || actividad === valorActual
                );
                actividadesDisponibles.forEach(actividad => {
                    const opcion = document.createElement('option');
                    opcion.value = actividad;
                    opcion.textContent = actividad;
                    actividadSelect.appendChild(opcion);
                });
                actividadSelect.value = valorActual;
            }
        }
    }

    function crearNuevaFilaActividad(areaSeleccionada) {
        if (numActividades < 10) {
            const nuevaFila = document.createElement('div');
            nuevaFila.id = `actividad-fila-${numActividades}`;
            nuevaFila.className = 'grid grid-cols-3 gap-4 mb-4';

            nuevaFila.innerHTML = `
                <div>
                    <label for="actividad-${numActividades}" class="block text-gray-700 text-sm font-bold mb-2">Actividad:</label>
                    <select id="actividad-${numActividades}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline actividad-select">
                        <option value="">Selecciona una actividad</option>
                    </select>
                </div>
                <div>
                    <label for="fecha-inicio-${numActividades}" class="block text-gray-700 text-sm font-bold mb-2">Fecha Inicio:</label>
                    <input type="date" id="fecha-inicio-${numActividades}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline fecha-inicio">
                </div>
                <div>
                    <label for="fecha-fin-${numActividades}" class="block text-gray-700 text-sm font-bold mb-2">Fecha Fin:</label>
                    <input type="date" id="fecha-fin-${numActividades}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline fecha-fin">
                </div>
            `;
            listaActividades.appendChild(nuevaFila);
            actualizarOpcionesActividad(numActividades, areaSeleccionada);
            numActividades++;
        } else {
            alert('Solo puedes agregar hasta 10 actividades.');
        }
    }

    function handleAreaChange(event) {
        const areaSeleccionada = event.target.value;
        if (areaSeleccionada) {
            agregarActividadBoton.disabled = false;
        } else {
            agregarActividadBoton.disabled = true;
        }
        // Limpiar las actividades existentes y el rastreo al cambiar de área
        listaActividades.innerHTML = '';
        listaActividades.appendChild(mensajeSeleccionaArea);
        numActividades = 0;
        Object.keys(actividadesSeleccionadas).forEach(key => delete actividadesSeleccionadas[key]);
    }

    function handleAgregarActividad() {
        const areaSeleccionada = seleccionArea.value;
        if (areaSeleccionada) {
            crearNuevaFilaActividad(areaSeleccionada);
        } else {
            alert('Por favor, selecciona un área antes de agregar una actividad.');
        }
    }

    function handleActividadChange(event) {
        if (event.target.classList.contains('actividad-select')) {
            const filaIndex = event.target.id.split('-')[1];
            const actividadSeleccionada = event.target.value;
            actividadesSeleccionadas[filaIndex] = [actividadSeleccionada];
            // No necesitamos actualizar la disponibilidad inmediatamente aquí,
            // se actualizará cuando se cambie el área o se agregue una nueva actividad.
            actualizarDisponibilidadActividades();
        }
    }

    function actualizarDisponibilidadActividades() {
        document.querySelectorAll('.actividad-select').forEach(select => {
            const filaIndex = select.id.split('-')[1];
            const valorActual = select.value;
            select.innerHTML = '<option value="">Selecciona una actividad</option>';
            if (seleccionArea.value && actividadesPorArea[seleccionArea.value]) {
                const actividadesDisponibles = actividadesPorArea[seleccionArea.value].filter(actividad =>
                    !Object.values(actividadesSeleccionadas).flat().includes(actividad) || actividad === valorActual
                );
                actividadesDisponibles.forEach(actividad => {
                    const opcion = document.createElement('option');
                    opcion.value = actividad;
                    opcion.textContent = actividad;
                    select.appendChild(opcion);
                });
                select.value = valorActual;
            }
        });
    }

    // Event Listeners con funciones separadas y remoción (aunque DOMContentLoaded solo se ejecuta una vez por carga de página)
    const areaChangeListener = (event) => {
        handleAreaChange(event);
    };
    seleccionArea.addEventListener('change', areaChangeListener);

    const agregarActividadListener = () => {
        handleAgregarActividad();
    };
    agregarActividadBoton.addEventListener('click', agregarActividadListener);

    const actividadChangeListener = (event) => {
        handleActividadChange(event);
    };
    listaActividades.addEventListener('change', actividadChangeListener);

    // Cargar actividades guardadas (si las hay) - Pendiente de implementación detallada
    const planGuardado = localStorage.getItem('planDeAccion');
    if (planGuardado) {
        const plan = JSON.parse(planGuardado);
        console.log('Plan guardado:', plan);
        // Aquí iría la lógica para reconstruir la interfaz con el plan guardado
    }
}

export { inicializarPlan };