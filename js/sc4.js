document.addEventListener("DOMContentLoaded", () => {
  const tbodySec = document.getElementById("tbody_secciones");
  const btnSaveChanges = document.getElementById("btn_save_changes");

  const secciones_pred = [
    { number: 1, text: "CONTRIBUCION_SOCIAL", color: "#b2e2f2" },
    { number: 2, text: "OCIO", color: "#fdfd96" },
    { number: 3, text: "SALUD", color: "#acf7c3" },
    { number: 4, text: "FAMILIA", color: "#f47e8e" },
    { number: 5, text: "AMISTADES", color: "#ffe180" },
    { number: 6, text: "PAREJA", color: "#ff85d5" },
    { number: 7, text: "HOGAR", color: "#e79eff" },
    { number: 8, text: "CRECIMIENTO_PERSONAL", color: "#d8f79a" },
    { number: 9, text: "EDUCACIÓN", color: "#6a9eda" },
    { number: 10, text: "ESPIRITUALIDAD", color: "#e4fbfb" },
    { number: 11, text: "ECONOMÍA", color: "#009d71" },
    { number: 12, text: "TRABAJO", color: "#d8af97" },
  ];

  let data = JSON.parse(sessionStorage.getItem("data")) || secciones_pred;
  let selectedRows = JSON.parse(sessionStorage.getItem("selectedRows")) || [];

  const createTasks = () => {
    tbodySec.innerHTML = "";
    secciones_pred.forEach((section, index) => {
      const isSelected = selectedRows.includes(index);
      tbodySec.innerHTML += `
        <tr id=${index} class="table-row" style="cursor: pointer; background-color: ${isSelected ? '#505B80' : 'white'}; color: ${isSelected ? 'white' : '#505B80'}">
          <td>${section.number}</td>
          <td>${section.text}</td>
        </tr>
      `;
    });
  };

  tbodySec.addEventListener("click", (event) => {
    const row = event.target.closest(".table-row");
    if (row) {
      toggleRowSelection(row);
    }
  });

  const toggleRowSelection = (row) => {
    const rowId = parseInt(row.id);
    const rowIndex = selectedRows.indexOf(rowId);

    if (rowIndex !== -1) {
      selectedRows.splice(rowIndex, 1);
      row.style.backgroundColor = "white";
      row.style.color = "#505B80";
    } else {
      selectedRows.push(rowId);
      row.style.backgroundColor = "#505B80";
      row.style.color = "white";
    }
  };

  const saveChanges = () => {
    if (selectedRows.length >= 8) {
      // Filtrar las secciones seleccionadas para mantenerlas en 'data'
      data = secciones_pred.filter((_, index) => selectedRows.includes(index));

      // Crear 'deletedSections1' con las secciones eliminadas en el formato { id, name }
      const deletedSections1 = secciones_pred
        .map((section, index) => ({ id: index, name: section.text }))
        .filter(section => !selectedRows.includes(section.id));

      // Guardar los datos actualizados
      sessionStorage.setItem("data", JSON.stringify(data));
      sessionStorage.setItem("selectedRows", JSON.stringify(selectedRows));
      localStorage.setItem("deletedSections1", JSON.stringify(deletedSections1));

      // Redirigir a otra página
      window.location.href = "pruebav1.html";
    } else {
      // Mostrar alerta si no se seleccionaron suficientes filas
      const remaining = 8 - selectedRows.length;
      showAlert(`Debes elegir ${remaining} secciones más.`);
    }
  };

  const showAlert = (message) => {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  };

  btnSaveChanges.addEventListener("click", saveChanges);

  createTasks();
});