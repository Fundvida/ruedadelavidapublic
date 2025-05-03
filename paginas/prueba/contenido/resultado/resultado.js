function inicializarResultados() {
    generarGraficoPizza();
    generarLeyendaPizza();
}

function generarGraficoPizza() {
    const ctx = document.getElementById('pizza-chart');
    if (!ctx) {
        console.error('Elemento con ID "pizza-chart" no encontrado.');
        return;
    }

    // Lee los resultados guardados
    let resultadosGuardados = [];
    let titulosGuardados = [];
    try {
        resultadosGuardados = JSON.parse(localStorage.getItem('resultadosPorArea')) || [];
        titulosGuardados = JSON.parse(localStorage.getItem('titulosPorArea')) || [];

    } catch (e) {
        resultadosGuardados = [];
        titulosGuardados = [];
    }

    // Usa la cantidad real de áreas (mínimo 8, máximo 12)
    const cantidad = Math.max(8, Math.min(titulosGuardados.length, 12));
    const labels = titulosGuardados.slice(0, cantidad);

    // Asegura que cada área tenga un resultado, aunque sea 0
    const resultadosReales = resultadosGuardados.slice(0, cantidad); // Valores reales para la leyenda
    const resultadosFijos = Array(cantidad).fill(1); // Valores fijos para el gráfico

    const coloresBase = [
    "rgb(154, 0, 76)",     //Rojo oscuro
    "rgb(196, 0, 77)",      //Rojo cereza
    "rgb(241, 80, 61)",    // Rojo anaranjado
    "rgb(249, 137, 35)",   // Naranja
    "rgb(255, 210, 0)",    // Amarillo oscuro
    "rgb(234, 234, 99)",   // Amarillo claro
    "rgb(167, 214, 109)",  // Verde claro
    "rgb(102, 206, 156)",  // Verde menta
    "rgb(0, 193, 188)",    //# Turquesa
    "rgb(45, 136, 162)",  // # Azul océano
    "rgb(43, 60, 116)",   // # Azul oscuro
    "rgb(76, 26, 69)"     // # Púrpura oscuro
    ];

    const backgroundColor = coloresBase.slice(0, cantidad);

    window.pizzaChartData = {
        labels,
        resultados: resultadosReales, // Usamos los valores reales para la leyenda
        backgroundColor
    };

    const data = {
        labels: window.pizzaChartData.labels,
        datasets: [{
            data: resultadosFijos, // Usamos valores fijos para el gráfico
            backgroundColor: window.pizzaChartData.backgroundColor,
            borderWidth: 1
        }]
    };

    if (window.pizzaChartInstance) {
        window.pizzaChartInstance.destroy();
    }

    window.pizzaChartInstance = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const index = context.dataIndex;
                            const label = window.pizzaChartData.labels[index];
                            const valor = window.pizzaChartData.resultados[index];
                            return `  ${valor}`;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: function(value, context) {
                        return window.pizzaChartData.labels[context.dataIndex];
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

function generarLeyendaPizza() {
    const legendContainer = document.getElementById('pizza-legend');
    if (!legendContainer) return;

    // Limpia la leyenda anterior
    legendContainer.innerHTML = '';

    // Apila los recuadros en columna
    legendContainer.style.display = 'flex';
    legendContainer.style.flexDirection = 'column';
    legendContainer.style.alignItems = 'flex-start';
    legendContainer.style.marginTop = '50px';

    // URLs de los íconos en el mismo orden que los títulos
    const iconUrls = [
        "https://cdn.lordicon.com/oncyjozz.json", // CONTRIBUCION SOCIAL
        "https://cdn.lordicon.com/mxddzdmt.json", // OCIO
        "https://cdn.lordicon.com/fdaaenax.json", // SALUD
        "https://cdn.lordicon.com/kjkiqtxg.json", // FAMILIA
        "https://cdn.lordicon.com/xhbsnkyp.json", // AMISTADES
        "https://cdn.lordicon.com/hqrgkqvs.json", // PAREJA
        "https://cdn.lordicon.com/etqbfrgp.json", // HOGAR
        "https://cdn.lordicon.com/xxdqfhbi.json", // CRECIMIENTO PERSONAL
        "https://cdn.lordicon.com/ttioogfl.json", // EDUCACIÓN
        "https://cdn.lordicon.com/jluicbpf.json", // ESPIRITUALIDAD
        "https://cdn.lordicon.com/hbwqfgcf.json", // ECONOMÍA
        "https://cdn.lordicon.com/pqxdilfs.json"  // TRABAJO
    ];

        // Generar los elementos de la leyenda
        window.pizzaChartData.labels.forEach((label, i) => {
        const color = window.pizzaChartData.backgroundColor[i];
        const resultado = Math.round(window.pizzaChartData.resultados[i]);

        // Contenedor principal
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.marginBottom = '10px';

        // Ícono de lord-icon (fuera del item)
        const lordIcon = document.createElement('lord-icon');
        lordIcon.setAttribute('src', iconUrls[i]); // Asigna el ícono correspondiente
        lordIcon.setAttribute('trigger', 'hover');
        lordIcon.setAttribute('colors', `outline:#000000,primary:${color}`);
        lordIcon.style.minWidth = '40px';
        lordIcon.style.minHeight = '40px';
        lordIcon.style.marginRight = '10px';

        // Contenedor del texto (label y resultado)
        const item = document.createElement('div');
        item.style.background = color;
        item.style.color = '#fff';
        item.style.padding = '8px 16px';
        item.style.borderRadius = '8px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between'; // Alinea el label y el resultado
        item.style.minWidth = '300px'; // Asegura que ocupe todo el ancho disponible
        item.style.fontWeight = 'bold';

        // Texto del label
        const labelText = document.createElement('span');
        labelText.textContent = label;

        // Texto del resultado
        const resultText = document.createElement('span');
        resultText.textContent = resultado;

        // Añadir el label y el resultado al contenedor del texto
        item.appendChild(labelText);
        item.appendChild(resultText);

        // Añadir el ícono y el contenedor del texto al contenedor principal
        container.appendChild(lordIcon);
        container.appendChild(item);

        // Añadir el contenedor principal a la leyenda
        legendContainer.appendChild(container);
    });
}

export { inicializarResultados };