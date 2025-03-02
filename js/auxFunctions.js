const sectionsNames = [
    'contribuciones',
    'ocio',
    'salud',
    'familia',
    'amistades',
    'pareja',
    'hogar',
    'crecimientoPersonal',
    'educacion',
    'espiritualidad',
    'economia',
    'trabajo',
];
function resetReload() {
    if (localStorage.getItem('reload'))
        localStorage.removeItem('reload');
}
function saveResultsSection(selects, name) {
    const resultsArray = { sectionName: name, options: [] };
    let i = 0;
    // select.options[select.selectedIndex].text,
    selects.forEach((select) => {

        resultsArray.options[i] = {
            index: select.selectedIndex,
            value: parseFloat(select.value),
        }
        i += 1;
    });
    console.log(resultsArray);
    if (checkResultsStoredSection(name)) {
        localStorage.setItem(name, JSON.stringify(resultsArray));
    } else {
        localStorage.setItem(name, JSON.stringify(resultsArray));
    }
}

const checkResultsStoredSection = (name) => {
    return localStorage.getItem(name) ? true : false;
}

function removeResultsSections(name) {
    if (checkResultsStoredSection(name)) {
        localStorage.removeItem(name);
    }
}

function removeAllSections() {
    sectionsNames.map((name) => {
        if (checkResultsStoredSection(name)) {
            localStorage.removeItem(name);
        }
    })
}

function readAllSections() {

    let sections = [];
    sectionsNames.map((name) => {
        if (checkResultsStoredSection(name)) {
            const resultsArray = JSON.parse(localStorage.getItem(name));
            // sections[name]=resultsArray;
            // Array.push(sections,resultsArray);
            sections.push(resultsArray)
        }
    })
    // if (sections.length > 0) {
    //     loadOptionsResultadosSelect();
    // }

    return sections;
}

function removeAuthInfo() {
    if (checkResultsStoredSection('authInfo')) {
        localStorage.removeItem('authInfo');
    }
}

function removeInputs() {
    if (checkResultsStoredSection('input1')) {
        localStorage.removeItem('input1');
    }
    if (checkResultsStoredSection('input2')) {
        localStorage.removeItem('input2');
    }
    if (checkResultsStoredSection('input3')) {
        localStorage.removeItem('input3');
    }
    if (checkResultsStoredSection('input4')) {
        localStorage.removeItem('input4');
    }
}

function enableOptionResultadoSelect(sectionName) {
    
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

    const resultadosSelect = document.getElementById("resultadosSelect");
    // resultadosSelect.options.length=0
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
    const educacionSelects = educacion?educacion.querySelectorAll("select"):null;
    const espiritualidadSelects = espiritualidad?espiritualidad.querySelectorAll("select"):null;
    const economiaSelects = economia?economia.querySelectorAll("select"):null;
    const trabajoSelects = trabajo?trabajo.querySelectorAll("select"):null;

    const totales = {
        contribuciones: Math.round(calcularTotal(contribucionesSelects)),
        ocio: Math.round(calcularTotal(ocioSelects)),
        salud: Math.round(calcularTotal(saludSelects)),
        familia: Math.round(calcularTotal(familiaSelects)),
        amistades: Math.round(calcularTotal(amistadesSelects)),
        pareja: Math.round(calcularTotal(parejaSelects)),
        hogar: Math.round(calcularTotal(hogarSelects)),
        crecimientoPersonal: Math.round(calcularTotal(crecimientoPersonalSelects)),
        educacion: educacionSelects?Math.round(calcularTotal(educacionSelects)):null,
        espiritualidad: espiritualidadSelects?Math.round(calcularTotal(espiritualidadSelects)):null,
        economia: economiaSelects?Math.round(calcularTotal(economiaSelects)):null,
        trabajo: trabajoSelects?Math.round(calcularTotal(trabajoSelects)):null,
    };
    const resultadosMenoresIguales4Array = [];
    for (const [seccion, total] of Object.entries(totales)) {
        console.log(seccion)
        if (sectionName == seccion && total >= 1 && total <= 8) {
            const option = document.createElement("option");
            option.text = secciones[seccion];
            resultadosSelect.add(option);
            // resultadosMenoresIguales4Array.push(secciones[seccion]);
        }
    }
    console.log('entro');
    // console.log(sectionName);
    console.log(totales);
    let sortedArray = Object.entries(totales).sort((a, b) => a[1] - b[1]);
    console.log(sortedArray);
    let sortedMap = new Map(sortedArray);
    console.log(sortedMap);

    let values = Array.from(resultadosSelect.options).map(function (option) {
        return option.value;
    });
    console.log(values);
    resultadosSelect.options.length = 0
    for (const [seccion, total] of sortedMap) {
        if (values.includes(secciones[seccion]) && total >= 1 && total <= 8) {
            const option = document.createElement("option");
            option.text = secciones[seccion];
            resultadosSelect.add(option);
        }
    }


    // resultadosMenoresIguales4.textContent =
    //     resultadosMenoresIguales4Array.join(", ");

    // let totalesSorted=Object.fromEntries(sortedArray);
    // console.log(totalesSorted);
    // for (const [seccion, total] of Object.entries(totales)) {
    //     console.log(seccion)
    //     if(sectionName==seccion && total <= 8) {
    //         const option = document.createElement("option");
    //         option.text = secciones[seccion];
    //         resultadosSelect.add(option);
    //     }
    // }
    // var optionsSelect = Array.prototype.slice.call(resultadosSelect.options);

    // // Sort the array.
    // optionsSelect.sort(function (a, b) {
    //     // return a.text.localeCompare(b.text);
    //     return Number(a.value) - Number(b.value);
    // });

    // // Remove the old options from the select element.
    // resultadosSelect.innerHTML = '';

    // // Add the sorted options to the select element.
    // optionsSelect.forEach(function (option) {
    //      resultadosSelect.appendChild(option);
    // });

}
function loadOptionsResultadosSelect() {
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

    const resultadosSelect = document.getElementById("resultadosSelect");
    resultadosSelect.options.length = 0
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


    for (const [seccion, total] of Object.entries(totales)) {
        if (total >= 1 && total <= 8) {
            const option = document.createElement("option");
            option.text = secciones[seccion];
            resultadosSelect.add(option);
        }
    }
    let sortedArray = Object.entries(totales).sort((a, b) => a[1] - b[1]);
    console.log(sortedArray);
    let sortedMap = new Map(sortedArray);
    console.log(sortedMap);

    let values = Array.from(resultadosSelect.options).map(function (option) {
        return option.value;
    });
    console.log(values);
    resultadosSelect.options.length = 0
    for (const [seccion, total] of sortedMap) {
        if (total >= 1 && total <= 8) {
            const option = document.createElement("option");
            option.text = secciones[seccion];
            resultadosSelect.add(option);
        }
    }
}

function formatDate(dateT) {

    dateT = dateT.slice(0, -9);
    // Create a new Date object from the datetime-local string
    let date = new Date(dateT);

    // Format the date and hour in the "yyyy-mm-dd hh:00" format
    let formattedDateTime =
        date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0');
    return formattedDateTime;
}
function prepareDownload(evento) {
    var newRow = $("<tr>");
    newRow.append($("<td>").text(evento.summary));
    newRow.append($("<td>").text(evento.description));
    newRow.append(
        $("<td>").text(formatDate(evento.start.dateTime))
    );
    newRow.append(
        $("<td>").text(formatDate(evento.end.dateTime))
    );
    // newRow.append(
    //     $("<td>").text(dayjs(evento.start.dateTime).format("HH:mm"))
    // );
    // newRow.append($("<td>").text(dayjs(evento.end.dateTime).format("HH:mm")));

    $("#dataTable tbody").append(newRow);

    $(function () {
        $("#downloadButton").click(function () {
            var tableData = [];

            $("#dataTable tbody tr").each(function () {
                var rowData = [];
                $(this)
                    .find("td")
                    .each(function () {
                        rowData.push($(this).text());
                    });
                tableData.push(rowData);
            });

            // Agregar títulos de columna
            tableData.unshift([
                "Título",
                "Actividad",
                "Fecha de inicio",
                "Fecha de fin",
            ]);

            // Generar el archivo Excel
            var worksheet = XLSX.utils.aoa_to_sheet(tableData);
            var workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            var workbookOutput = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "binary",
            });

            saveAs(
                new Blob([s2ab(workbookOutput)], {
                    type: "application/octet-stream",
                }),
                "tabla.xlsx"
            );
        });

        // Función auxiliar para convertir cadena a matriz de bytes
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        }
    });

}

function controlSections() {
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
    // const sec_enabled = [true, true, true, true, true, true, true, true, true, true, true, true];
    let sec_enabled = [false, false, false, false, false, false, false, false, false, false, false, false];
    seccionesEN = JSON.parse(sessionStorage.getItem("data")) || [];
    if (seccionesEN.length > 0) {
        let i=-1;
        secciones_pred.map((sec1) => {
            i+=1;
            seccionesEN.map((sec2) => {
                if(sec1.text==sec2.text){
                    sec_enabled[i]=true;
                }
            })
        })
    }else{const updatedArray = sec_enabled.map(() => true);sec_enabled=updatedArray}
    console.log(sec_enabled);
    return sec_enabled;
}