const tablaResultados = document.getElementById("tablaResultados");

for (const [seccion, total] of Object.entries(totales)) {
    if (total >= 1 && total <= 8) {
    const fila = document.createElement("tr");

    const columnaSeccion = document.createElement("td");
    columnaSeccion.textContent = seccion;
    fila.appendChild(columnaSeccion);

    const columnaTitulo = document.createElement("td");
    const tituloSelect = document.getElementById("resultadosSelect");
    const selectedOption = tituloSelect.options[tituloSelect.selectedIndex];
    columnaTitulo.textContent = selectedOption.textContent;
    fila.appendChild(columnaTitulo);

    const columnaDescripcion = document.createElement("td");
    const descripcionInput = document.getElementById("description");
    columnaDescripcion.textContent = descripcionInput.value;
    fila.appendChild(columnaDescripcion);

    const columnaFechaInicio = document.createElement("td");
    const fechaInicioInput = document.getElementById("dateAlpha");
    columnaFechaInicio.textContent = fechaInicioInput.value;
    fila.appendChild(columnaFechaInicio);

    const columnaFechaFin = document.createElement("td");
    const fechaFinInput = document.getElementById("dateOmega");
    columnaFechaFin.textContent = fechaFinInput.value;
    fila.appendChild(columnaFechaFin);

    const columnaHoraInicio = document.createElement("td");
    const horaInicioInput = document.getElementById("timeAlpha");
    columnaHoraInicio.textContent = horaInicioInput.value;
    fila.appendChild(columnaHoraInicio);

    const columnaHoraFin = document.createElement("td");
    const horaFinInput = document.getElementById("timeOmega");
    columnaHoraFin.textContent = horaFinInput.value;
    fila.appendChild(columnaHoraFin);

    const columnaAgendar = document.createElement("td");
    const agendarLink = document.createElement("a");
    agendarLink.setAttribute("class", "button1");
    agendarLink.setAttribute("target", "_blank");
    agendarLink.setAttribute("data-format", "google");
    agendarLink.textContent = "Agendar";
    columnaAgendar.appendChild(agendarLink);
    fila.appendChild(columnaAgendar);

    tablaResultados.appendChild(fila);
    }
}
