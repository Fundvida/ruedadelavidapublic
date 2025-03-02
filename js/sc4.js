let form_upd_sec = document.getElementById("form_update_seccion");
let txt_new_nomb_sec = document.getElementById("txt_new_nomb_sec");
let txt_nomb_sec = document.getElementById("txt_nombre_seccion");
let txt_number = document.getElementById("txt_number_seccion");
let msg_error = document.getElementById("msg_error");
let msg_error_input = document.getElementById("msg_error_input");
let tbody_sec = document.getElementById("tbody_secciones");
let btn_upd_sec = document.getElementById("btn_update_seccion");
let btn_new_sec = document.getElementById("btn_new_section");

const secciones_pred = [
  { number: 1, text: "CONTRIBUCIÓN SOCIAL", color: "#b2e2f2" },
  { number: 2, text: "OCIO", color: "#fdfd96" },
  { number: 3, text: "SALUD", color: "#acf7c3" },
  { number: 4, text: "FAMILIA", color: "#f47e8e" },
  { number: 5, text: "AMISTADES", color: "#ffe180" },
  { number: 6, text: "PAREJA", color: "#ff85d5" },
  { number: 7, text: "HOGAR", color: "#e79eff" },
  { number: 8, text: "CRECIMIENTO PERSONAL", color: "#d8f79a" },
  { number: 9, text: "EDUCACIÓN", color: "#6a9eda" },
  { number: 10, text: "ESPIRITUALIDAD", color: "#e4fbfb" },
  { number: 11, text: "ECONOMÍA", color: "#009d71" },
  { number: 12, text: "TRABAJO", color: "#d8af97" },
];

form_upd_sec.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let data = JSON.parse(sessionStorage.getItem("data")) || [];

if (data.length === 0) {
  data = secciones_pred;
  sessionStorage.setItem("data", JSON.stringify(data));
}

let createTasks = () => {
  tbody_sec.innerHTML = "";
  data.map((x, y) => {
    return (tbody_sec.innerHTML += `
      <tr id=${y}>
        <td>${x.number}</td>
        <td>${x.text}</td>
        <td>
          <span class="options">
            <i onClick ="deleteTask(this);" class="fas fa-trash-alt"></i>
          </span>
        </td>
      </tr>
    `);
  });
  // resetForm();
};

let deletedSections1 = [];

let deleteTask = (e) => {
  let selectedTask = e.parentElement.parentElement.parentElement;
  let sectionId = selectedTask.id;
  let sectionName = selectedTask.children[1].innerHTML;

  if (canDeleteSection(sectionName)) {
    selectedTask.remove();
    let taskId = parseInt(sectionId);
    data.splice(taskId, 1);
    sessionStorage.setItem("data", JSON.stringify(data));

    // Guarda el ID y nombre de la sección eliminada en deletedSections
    deletedSections1.push({ id: sectionId, name: sectionName });
    saveDeletedSections();
    createTasks();
    //showDeletedSections();
  } else {
    alert("No se puede eliminar esta sección.");
  }
};

// Función para guardar los IDs y nombres de las secciones eliminadas
let saveDeletedSections = () => {
  localStorage.setItem("deletedSections1", JSON.stringify(deletedSections1));
};

// Función para mostrar los IDs y nombres de las secciones eliminadas en un alert
let showDeletedSections = () => {
  let deletedSections1String = JSON.stringify(deletedSections1, null, 2);
  alert(deletedSections1String);
};

window.addEventListener("DOMContentLoaded", () => {
document.getElementById("eliminaField").addEventListener("click", ir);
});

let ir = () => {
    // Guarda las secciones eliminadas en el almacenamiento local antes de redireccionar
    saveDeletedSections();
    // Redirecciona a la página del formulario
    //showDeletedSections();
    window.location.href = "pruebav1.html";
    

};

// // window.addEventListener("DOMContentLoaded", () => {
// //   document.getElementById("eliminaField").addEventListener("click", eliminarFieldsets);
// // });

let canDeleteSection = (sectionName) => {
  const protectedSections = [
    "CONTRIBUCIÓN SOCIAL",
    "OCIO",
    "SALUD",
    "FAMILIA",
    "AMISTADES",
    "HOGAR",
    "CRECIMIENTO PERSONAL",
  ];

  return !protectedSections.includes(sectionName);
};

let acceptData = () => {
  const pointer = data.find((d) => d.number == txt_number.value);
  console.log(pointer);
  if (pointer !== null) {
    pointer.text = txt_nomb_sec.value;
  }
  sessionStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

(() => {
  console.log(data);
  createTasks();
})();
