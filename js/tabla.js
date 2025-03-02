// Obtener los fieldsets con clase "seccionPareja" y "seccionHogar" de la rueda
const contribucionFieldset = document.querySelector(".seccionContribucion");
const ocioFieldset = document.querySelector(".seccionOcio");
const saludFieldset = document.querySelector(".seccionSalud");
const familiaFieldset = document.querySelector(".seccionFamilia");
const amistadesFieldset = document.querySelector(".seccionAmistades");
const parejasFieldset = document.querySelector(".seccionPareja");
const hogarFieldset = document.querySelector(".seccionHogar");
const crecimientoPersonalFieldset = document.querySelector(".seccionCrecimientoPersonal");
const educacionFieldset = document.querySelector(".seccionEducacion");
const espiritualidadFieldset = document.querySelector(".seccionEspiritualidad");
const economiaFieldset = document.querySelector(".seccionEconomia");
const trabajoFieldset = document.querySelector(".seccionTrabajo");

// Obtener los botones con clase "next"

const contribucionBtn = contribucionFieldset.querySelector(".next");
const ocioBtn = ocioFieldset.querySelector(".next");
const saludBtn = saludFieldset.querySelector(".next");
const familiaBtn = familiaFieldset.querySelector(".next");
const amistadesBtn = amistadesFieldset.querySelector(".next");
const parejasBtn = parejasFieldset.querySelector(".next");
const hogarBtn = hogarFieldset.querySelector(".next");
const crecimientoPersonalBtn = crecimientoPersonalFieldset.querySelector(".next");
const educacionBtn = educacionFieldset.querySelector(".next");
const espiritualidadBtn = espiritualidadFieldset.querySelector(".next");
const economiaBtn = economiaFieldset.querySelector(".next");
const trabajoBtn = trabajoFieldset.querySelector(".next");

// Función para agregar las respuestas a la tabla

function agregarRespuestas(fieldset) {
    const seccion = fieldset.querySelector(".fs-title").textContent;
    const selects = fieldset.querySelectorAll("select");
    const tabla = document.querySelector("#tabla-respuestas tbody");
    const filas = tabla.getElementsByTagName("tr");
    for (let i = filas.length - 1; i >= 0; i--) {
        const seccionColumna = filas[i].getElementsByTagName("td")[0];
        if (seccionColumna.textContent === seccion) {
            tabla.deleteRow(i);
        }
    }
    const fila = tabla.insertRow();
    const seccionColumna = fila.insertCell();
    seccionColumna.textContent = seccion;
    selects.forEach((select) => {
        const textoColumna = fila.insertCell();
        textoColumna.textContent = select.options[select.selectedIndex].text;
        const colorColumna = fila.insertCell();
        const valorSeleccionado = parseFloat(select.value);
        if (valorSeleccionado <= 0.3) {
            colorColumna.style.backgroundColor = "red";
        } else if (valorSeleccionado === 0.5) {
            colorColumna.style.backgroundColor = "yellow";
        } else if (valorSeleccionado >= 0.8) {
            colorColumna.style.backgroundColor = "green";
        }
    });
}

contribucionBtn.addEventListener("click", () => agregarRespuestas(contribucionFieldset));
ocioBtn.addEventListener("click", () => agregarRespuestas(ocioFieldset));
saludBtn.addEventListener("click", () => agregarRespuestas(saludFieldset));
familiaBtn.addEventListener("click", () => agregarRespuestas(familiaFieldset));
amistadesBtn.addEventListener("click", () => agregarRespuestas(amistadesFieldset));
parejasBtn.addEventListener("click", () => agregarRespuestas(parejasFieldset));
hogarBtn.addEventListener("click", () => agregarRespuestas(hogarFieldset));
crecimientoPersonalBtn.addEventListener("click", () => agregarRespuestas(crecimientoPersonalFieldset));
educacionBtn.addEventListener("click", () => agregarRespuestas(educacionFieldset));
espiritualidadBtn.addEventListener("click", () => agregarRespuestas(espiritualidadFieldset));
economiaBtn.addEventListener("click", () => agregarRespuestas(economiaFieldset));
trabajoBtn.addEventListener("click", () => agregarRespuestas(trabajoFieldset));


