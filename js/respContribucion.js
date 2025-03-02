const sections = readAllSections();

const sectionsEnabled=controlSections();
console.log(sections);
readSaveAct();
// Obtenemos los elementos HTML que vamos a usar
const form = document.getElementById("msform");
//fieldset 

const contribuciones = document.querySelector(".seccionContribucion");
const ocio = document.querySelector(".seccionOcio");
const salud = document.querySelector(".seccionSalud");
const familia = document.querySelector(".seccionFamilia");
const amistades = document.querySelector(".seccionAmistades");
const pareja = document.querySelector(".seccionPareja");
const hogar = document.querySelector(".seccionHogar");
const crecimientoPersonal = document.querySelector(".seccionCrecimientoPersonal");
const educacion = document.querySelector(".seccionEducacion");
const espiritualidad = document.querySelector(".seccionEspiritualidad");
const economia = document.querySelector(".seccionEconomia");
const trabajo = document.querySelector(".seccionTrabajo");
//respuestas select option
const contribucionesSelects = contribuciones.querySelectorAll("select");
const ocioSelects = ocio.querySelectorAll("select");
const saludSelects = salud.querySelectorAll("select");
const familiaSelects = familia.querySelectorAll("select");
const amistadesSelects = amistades.querySelectorAll("select");
const parejaSelects = pareja.querySelectorAll("select");
const hogarSelects = hogar.querySelectorAll("select");
const crecimientoPersonalSelects = crecimientoPersonal.querySelectorAll("select");
const educacionSelects = educacion.querySelectorAll("select");
const espiritualidadSelects = espiritualidad.querySelectorAll("select");
const economiaSelects = economia.querySelectorAll("select");
const trabajoSelects = trabajo.querySelectorAll("select");
//resultados del icon 
const contribucionesInput = document.querySelector("input[name='totalContribuciones']");
const ocioInput = document.querySelector("input[name='totalOcio']");
const saludInput = document.querySelector("input[name='totalSalud']");
const familiaInput = document.querySelector("input[name='totalFamilia']");
const amistadesInput = document.querySelector("input[name='totalAmistades']");
const parejaInput = document.querySelector("input[name='totalPareja']");
const hogarInput = document.querySelector("input[name='totalHogar']");
const crecimientoPersonalInput = document.querySelector("input[name='totalCrecimientoPersonal']");
const educacionInput = document.querySelector("input[name='totalEducacion']");
const espiritualidadInput = document.querySelector("input[name='totalEspiritualidad']");
const economiaInput = document.querySelector("input[name='totalEconomia']");
const trabajoInput = document.querySelector("input[name='totalTrabajo']");
//resultados de la prueba
const altoInput = document.querySelector("input[name='resultadoAlto']");
const intermedioInput = document.querySelector("input[name='resultadoIntermedio']");
const bajoInput = document.querySelector("input[name='resultadoBajo']");
const resultadosSelect = document.getElementById("resultadosSelect");
/**Resultados Menores Iguales que 4 */
const resultadosMenoresIguales4 = document.querySelector(".resultadosMenoresIguales4");
//no tocar
if (sections) {
  sections.forEach((s) => {
    // if(window[`${s.sectionName}Selects`]==s.sectionName){
    let i = 0;
    switch (s.sectionName) {
      case "contribuciones":
        s.options.forEach((select, index) => {
          contribucionesSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(contribucionFieldset);
        enableOptionResultadoSelect('contribuciones');

        break;
      case "ocio":
        s.options.forEach((select, index) => {
          ocioSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(ocioFieldset);
        enableOptionResultadoSelect('ocio');

        break;
      case "salud":
        s.options.forEach((select, index) => {
          saludSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(saludFieldset);
        enableOptionResultadoSelect('salud');
        break;
      case "familia":
        s.options.forEach((select, index) => {
          familiaSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(familiaFieldset);
        enableOptionResultadoSelect('familia');
        break;
      case "amistades":
        s.options.forEach((select, index) => {
          amistadesSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        enableOptionResultadoSelect('amistades');
        agregarRespuestas(amistadesFieldset);
        break;
      case "pareja":
        s.options.forEach((select, index) => {
          parejaSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(parejasFieldset);
        enableOptionResultadoSelect('pareja');
        break;
      case "hogar":
        s.options.forEach((select, index) => {
          hogarSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(hogarFieldset);
        enableOptionResultadoSelect('hogar');
        break;
      case "crecimientoPersonal":
        s.options.forEach((select, index) => {
          crecimientoPersonalSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(crecimientoPersonalFieldset);
        enableOptionResultadoSelect('crecimientoPersonal');
        break;
      case "educacion":
        s.options.forEach((select, index) => {
          educacionSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(educacionFieldset);
        enableOptionResultadoSelect('educacion');
        break;
      case "espiritualidad":
        s.options.forEach((select, index) => {
          espiritualidadSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(espiritualidadFieldset);
        enableOptionResultadoSelect('espiritualidad');
        break;
      case "economia":
        s.options.forEach((select, index) => {
          economiaSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(economiaFieldset);
        enableOptionResultadoSelect('economia');
        break;
      case "trabajo":
        s.options.forEach((select, index) => {
          trabajoSelects[index].selectedIndex = select.index;
        });
        actualizarTotales();
        actualizarResultados();
        mostrarResultadosMenoresIguales4();
        agregarRespuestas(trabajoFieldset);
        enableOptionResultadoSelect('trabajo');
        break;
      case "default":
        break;
    }
    // window[`${s.sectionName}Selects`][i].selectedIndex = select.index;
    // i += 1;
    // }
  });
}


// Función para calcular el valor total de las respuestas de un conjunto de selects
function calcularTotal(selects) {
  let total = 0;
  for (let i = 0; i < selects.length; i++) {
    total += parseFloat(selects[i].value);
  }
  return total;
}

// Función para actualizar los valores totales cuando se presiona el botón Next
function actualizarTotales() {
  
  contribucionesInput.value = Math.round(calcularTotal(contribucionesSelects));
  ocioInput.value = Math.round(calcularTotal(ocioSelects));
  saludInput.value = Math.round(calcularTotal(saludSelects));
  familiaInput.value = Math.round(calcularTotal(familiaSelects));
  amistadesInput.value = Math.round(calcularTotal(amistadesSelects));
  parejaInput.value = Math.round(calcularTotal(parejaSelects));
  hogarInput.value = Math.round(calcularTotal(hogarSelects));
  crecimientoPersonalInput.value = Math.round(calcularTotal(crecimientoPersonalSelects));
  educacionInput.value = Math.round(calcularTotal(educacionSelects));
  espiritualidadInput.value = Math.round(calcularTotal(espiritualidadSelects));
  economiaInput.value = Math.round(calcularTotal(economiaSelects));
  trabajoInput.value = Math.round(calcularTotal(trabajoSelects));
}
//
const getTotals = () => {
  const total=[];
  let j=0
  sectionsEnabled.map((s,i)=>{
    switch(i){
      case 0:s?total[j]=Math.round(calcularTotal(contribucionesSelects)):'';s?j++:'';break;
      case 1:s?total[j]=Math.round(calcularTotal(ocioSelects)):'';s?j++:'';break;
      case 2:s?total[j]=Math.round(calcularTotal(saludSelects)):'';s?j++:'';break;
      case 3:s?total[j]=Math.round(calcularTotal(familiaSelects)):'';s?j++:'';break;
      case 4:s?total[j]=Math.round(calcularTotal(amistadesSelects)):'';s?j++:'';break;
      case 5:s?total[j]=Math.round(calcularTotal(parejaSelects)):'';s?j++:'';break;
      case 6:s?total[j]=Math.round(calcularTotal(hogarSelects)):'';s?j++:'';break;
      case 7:s?total[j]=Math.round(calcularTotal(crecimientoPersonalSelects)):'';s?j++:'';break;
      case 8:s?total[j]=Math.round(calcularTotal(educacionSelects)):'';s?j++:'';break;
      case 9:s?total[j]=Math.round(calcularTotal(espiritualidadSelects)):'';s?j++:'';break;
      case 10:s?total[j]=Math.round(calcularTotal(economiaSelects)):'';s?j++:'';break;
      case 11:s?total[j]=Math.round(calcularTotal(trabajoSelects)):'';s?j++:'';break;
    }
  })
  return total;
};

function obtenerSeccionResultadoAlto(totales) {
  const secciones = {
    0: "Contribuciones",
    1: "Ocio",
    2: "Salud",
    3: "Familia",
    4: "Amistades",
    5: "Pareja",
    6: "Hogar",
    7: "Crecimiento Personal",
    8: "Educación",
    9: "Espiritualidad",
    10: "Economía",
    11: "Trabajo",
  };
  const indiceResultadoAlto = totales.indexOf(Math.max(...totales));
  return secciones[indiceResultadoAlto];
}
function obtenerSeccionResultadoBajo(totales) {
  const secciones = {
    0: "Contribuciones",
    1: "Ocio",
    2: "Salud",
    3: "Familia",
    4: "Amistades",
    5: "Pareja",
    6: "Hogar",
    7: "CrecimientoPersonal",
    8: "Educación",
    9: "Espiritualidad",
    10: "Economía",
    11: "Trabajo",
  };
  const indiceResultadoBajo = totales.indexOf(Math.min(...totales));
  return secciones[indiceResultadoBajo];
}

function actualizarResultados() {
  // Calcular los totales de cada sección
  const contribucionesTotal = Math.round(calcularTotal(contribucionesSelects));
  const ocioTotal = Math.round(calcularTotal(ocioSelects));
  const saludTotal = Math.round(calcularTotal(saludSelects));
  const familiaTotal = Math.round(calcularTotal(familiaSelects));
  const amistadesTotal = Math.round(calcularTotal(amistadesSelects));
  const parejaTotal = Math.round(calcularTotal(parejaSelects));
  const hogarTotal = Math.round(calcularTotal(hogarSelects));
  const crecimientopTotal = Math.round(calcularTotal(crecimientoPersonalSelects));
  const educacionTotal = Math.round(calcularTotal(educacionSelects));
  const espiritualidadTotal = Math.round(calcularTotal(espiritualidadSelects));
  const economiaTotal = Math.round(calcularTotal(economiaSelects));
  const trabajoTotal = Math.round(calcularTotal(trabajoSelects));

  // Encontrar el resultado más alto
  const resultadosAltos = [
    contribucionesTotal,
    ocioTotal,
    saludTotal,
    familiaTotal,
    amistadesTotal,
    parejaTotal,
    hogarTotal,
    crecimientopTotal,
    educacionTotal,
    espiritualidadTotal,
    economiaTotal,
    trabajoTotal,
  ];
  const resultadoAlto = Math.max(...resultadosAltos);
  altoInput.value = resultadoAlto;

  // Encontrar el nombre de la sección con el resultado más alto
  const seccionResultadoAlto = obtenerSeccionResultadoAlto(resultadosAltos);
  altoInput.nextElementSibling.textContent = ` (${seccionResultadoAlto})`;

  // Encontrar el resultado más bajo
  const resultadosBajos = [
    contribucionesTotal,
    ocioTotal,
    saludTotal,
    familiaTotal,
    amistadesTotal,
    parejaTotal,
    hogarTotal,
    crecimientopTotal,
    educacionTotal,
    espiritualidadTotal,
    economiaTotal,
    trabajoTotal,
  ];
  const resultadoBajo = Math.min(...resultadosBajos);
  bajoInput.value = resultadoBajo;

  // Encontrar el nombre de la sección con el resultado más bajo
  const seccionResultadoBajo = obtenerSeccionResultadoBajo(resultadosBajos);
  bajoInput.nextElementSibling.textContent = ` (${seccionResultadoBajo})`;

  // Encontrar el nombre de la sección con el resultado más bajo
  const seccionResultadoBajos = obtenerSeccionResultadoBajo(resultadosBajos);
  bajoInput.nextElementSibling.textContent = ` (${seccionResultadoBajo})`;

  // Encontrar el resultado intermedio
  const resultadosIntermedios = resultadosAltos.filter(
    (total) => total !== resultadoAlto && total !== resultadoBajo
  );
  const resultadoIntermedio = resultadosIntermedios[0];
  intermedioInput.value = resultadoIntermedio;
}
//solo  texto de color rojo
function mostrarResultadosMenoresIguales4() {
  const secciones = {
    contribuciones: "Contribuciones",
    ocio: "Ocio",
    salud: "Salud",
    familia: "Familia",
    amistades: "Amistades",
    pareja: "Pareja",
    hogar: "Hogar",
    crecimientoPersonal: "Crecimiento Personal",
    educacion: "Educación",
    espiritualidad: "Espiritualidad",
    economia: "Economía",
    trabajo: "Trabajo",
  };

  const contribucionesSelects = contribuciones.querySelectorAll("select");
  const ocioSelects = ocio.querySelectorAll("select");
  const saludSelects = salud.querySelectorAll("select");
  const familiaSelects = familia.querySelectorAll("select");
  const amistadesSelects = amistades.querySelectorAll("select");
  const parejaSelects = pareja.querySelectorAll("select");
  const hogarSelects = hogar.querySelectorAll("select");
  const crecimientoPersonalSelects =
    crecimientoPersonal.querySelectorAll("select");
  const educacionSelects = educacion.querySelectorAll("select");
  const espiritualidadSelects = espiritualidad.querySelectorAll("select");
  const economiaSelects = economia.querySelectorAll("select");
  const trabajoSelects = trabajo.querySelectorAll("select");

  const totales = {
    contribuciones: Math.round(calcularTotal(contribucionesSelects)),
    ocio: Math.round(calcularTotal(ocioSelects)),
    salud: Math.round(calcularTotal(saludSelects)),
    familia: Math.round(calcularTotal(familiaSelects)),
    amistades: Math.round(calcularTotal(amistadesSelects)),
    pareja: Math.round(calcularTotal(parejaSelects)),
    hogar: Math.round(calcularTotal(hogarSelects)),
    crecimientoPersonal: Math.round(calcularTotal(crecimientoPersonalSelects)),
    educacion: Math.round(calcularTotal(educacionSelects)),
    espiritualidad: Math.round(calcularTotal(espiritualidadSelects)),
    economia: Math.round(calcularTotal(economiaSelects)),
    trabajo: Math.round(calcularTotal(trabajoSelects)),
  };

  const resultadosMenoresIguales4Array = [];

  for (const [seccion, total] of Object.entries(totales)) {
    if (total >= 1 && total <= 8) {
      //res menores 4
      resultadosMenoresIguales4Array.push(secciones[seccion]);
    }
  }

  resultadosMenoresIguales4.textContent =
    resultadosMenoresIguales4Array.join(", ");
}

// Agregamos un event listener al botón Next de cada sección
contribuciones
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    const contribucionesSelects = contribuciones.querySelectorAll("select");
    
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(contribucionesSelects, "contribuciones");
    enableOptionResultadoSelect('contribuciones');
    drawScores(getTotals());
  });
ocio.querySelector("input[name='next']").addEventListener("click", function () {
  
  actualizarTotales();
  actualizarResultados();
  mostrarResultadosMenoresIguales4();
  saveResultsSection(ocioSelects, "ocio");
  enableOptionResultadoSelect('ocio');
  drawScores(getTotals());
});
salud
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(saludSelects, "salud");
    enableOptionResultadoSelect('salud');
    drawScores(getTotals());
  });
familia
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(familiaSelects, "familia");
    enableOptionResultadoSelect('familia');
    drawScores(getTotals());
  });
amistades
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(amistadesSelects, "amistades");
    enableOptionResultadoSelect('amistades');
    drawScores(getTotals());
  });
pareja
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(parejaSelects, "pareja");
    enableOptionResultadoSelect('pareja');
    drawScores(getTotals());
  });
hogar
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(hogarSelects, "hogar");
    enableOptionResultadoSelect('hogar');
    drawScores(getTotals());
  });
crecimientoPersonal
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(crecimientoPersonalSelects, "crecimientoPersonal");
    enableOptionResultadoSelect('crecimientoPersonal');
    drawScores(getTotals());
  });
educacion
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(educacionSelects, "educacion");
    enableOptionResultadoSelect('educacion');
    drawScores(getTotals());
  });
espiritualidad
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(espiritualidadSelects, "espiritualidad");
    enableOptionResultadoSelect('espiritualidad');
    drawScores(getTotals());
  });
economia
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(economiaSelects, "economia");
    enableOptionResultadoSelect('economia');
    drawScores(getTotals());
  });

trabajo
  .querySelector("input[name='next']")
  .addEventListener("click", function () {
    actualizarTotales();
    actualizarResultados();
    mostrarResultadosMenoresIguales4();
    saveResultsSection(trabajoSelects, "trabajo");
    loadOptionsResultadosSelect();
    drawScores(getTotals());
  });
