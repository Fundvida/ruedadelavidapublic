function inicializarResultados() {
    generarGraficoPizza();
    generarLeyendaPizza();
    generarGraficoRadar();
}

function generarGraficoPizza() {
    const ctx = document.getElementById('pizza-chart');
    if (!ctx) {
        console.error('Elemento con ID "pizza-chart" no encontrado.');
        return;
    }

    // Lee los resultados guardados
    let respuestasUsuario = [];
    let cuestionariosFiltrados = [];
    try {
        respuestasUsuario = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
        cuestionariosFiltrados = JSON.parse(localStorage.getItem('cuestionariosFiltrados')) || [];
    } catch (e) {
        console.error('Error al leer los datos del localStorage:', e);
    }

    // Generar los títulos y resultados por área
    const titulosPorArea = cuestionariosFiltrados.map(c => c.titulo);
    const resultadosPorArea = cuestionariosFiltrados.map((cuestionario, idx) => {
        let suma = 0;
        const respuestasArea = respuestasUsuario[idx] || {};
        cuestionario.preguntas.forEach(pregunta => {
            const respuesta = respuestasArea[pregunta];
            if (respuesta && typeof respuesta.puntaje === 'number') {
                suma += respuesta.puntaje;
            }
        });
        // Incluir la pregunta adicional si existe
        if (respuestasArea['preguntaAdicional'] && typeof respuestasArea['preguntaAdicional'].puntaje === 'number') {
            suma += respuestasArea['preguntaAdicional'].puntaje;
        }
        return Math.round(suma);
    });

    // Usa la cantidad real de áreas (mínimo 8, máximo 12)
    const cantidad = Math.max(8, Math.min(titulosPorArea.length, 12));
    const labels = titulosPorArea.slice(0, cantidad).map(label => {
    if (label.length > 15 && label.includes(' ')) {
        const palabras = label.split(' ');
        const mitad = Math.ceil(palabras.length / 2);
        return palabras.slice(0, mitad).join(' ') + '\n' + palabras.slice(mitad).join(' ');
    }
    return label;
});


    const resultadosReales = resultadosPorArea.slice(0, cantidad).map(valor => valor || 0); // Asegura que no haya valores undefined
    const resultadosFijos = Array(cantidad).fill(1); // Valores fijos para el gráfico

    const coloresBase = [
        // Rosas (de más profundo a más suave)
        "#B85C74", // Rosa más profundo pastelado
        "#D1788C", // Rosa antiguo pastel
        "#E89CA1", // Rosa palo elegante
        "#EC729C", // Rosa más vibrante pastel
        "#F7A1B5", // Rosa suave
        "#F9C5D5", // Rosa algodón de azúcar

        // Azules (de más profundo a más suave)
        "#3E4660", // Azul sombra suave
        "#505B80", // Azul base original
        "#5A668E", // Azul ligeramente más oscuro
        "#6A749F", // Azul medio
        "#9BA2C2", // Azul lavanda apagado
        "#B3B9D1"  // Azul pastel grisáceo
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
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
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
                    display: true,
                    color: '#fff',
                    font: function(context) {
                    return context.chart.canvas.clientWidth < 400
                        ? { weight: 'bold', size: 7 } // Celular
                        : { weight: 'bold', size: 12 }; // Escritorio
                    },  
                    anchor: 'center',
                    align: 'end',
                    formatter: function(value, context) {
                        return window.pizzaChartData.labels[context.dataIndex];
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}



function generarGraficoRadar() {
    const ctxRadar = document.getElementById('radar-chart');
    if (!ctxRadar) {
        console.error('Elemento con ID "radar-chart" no encontrado.');
        return;
    }
    
    const dataRadar = {
        labels: window.pizzaChartData.labels,
        datasets: [{
            label: 'Resultados',
            data: window.pizzaChartData.resultados,
            backgroundColor: 'transparent', // Fondo transparente
            borderColor: '#b89b72', // Color del borde
            pointBackgroundColor: '#b89b72',
            pointBorderColor: '#b89b72',
            pointHoverBackgroundColor: '#b89b72',
            pointHoverBorderColor: 'rgba(179,181,198,1)'
        }]
    };

    const optionsRadar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
            angleLines: {
                display: false // Oculta las líneas de los ángulos
            },
            grid: {
                display: false // Oculta la red de araña
            },
            suggestedMin: 0,
            suggestedMax: 10,  // Ajusta según el rango de tus datos
            ticks: {
                display: false // Oculta los números del eje
            },
            pointLabels: {  
                display: false,
                color: '#7c5a36', 
                font: {
                    size: 12  
            }
            },
        }
    },
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            display: true, // <-- ACTIVAR etiquetas en los vértices
            anchor: 'end',  
            align: 'end',    
            font: {
                size: 18,
                weight: 'bold'
            },
            color: '#050506',     // Color de la etiqueta
            formatter: function(value) {
                    return value;
            }
        }
    }
};

    window.radarChartInstance = new Chart(ctxRadar, {
        type: 'radar',
        data: dataRadar,
        options: optionsRadar,
        plugins: [ChartDataLabels] // Registra el plugin
    });
}

function generarLeyendaPizza() {
    const legendContainer = document.getElementById('pizza-legend');
    if (!legendContainer) return;

    // Limpia la leyenda anterior
    legendContainer.innerHTML = '';

    // Apila los recuadros en columna
    // Estilo para el contenedor de la leyenda
    legendContainer.style.display = 'flex';
    legendContainer.style.flexDirection = 'column';
    legendContainer.style.alignItems = 'center'; // Cambiado de 'flex-start' a 'center'
    legendContainer.style.marginTop = '30px';    // Más cerca del gráfico
    legendContainer.style.marginLeft = '0';      // Elimina cualquier desplazamiento lateral
    legendContainer.style.flex = '1';            // Permite adaptarse mejor al espacio disponible
    legendContainer.style.width = '100%';

    // URLs de los íconos en el mismo orden que los títulos
    const iconMap = {
    "CONTRIBUCION SOCIAL": "https://cdn.lordicon.com/oncyjozz.json",
    "OCIO": "https://cdn.lordicon.com/mxddzdmt.json",
    "SALUD": "https://cdn.lordicon.com/fdaaenax.json",
    "FAMILIA": "https://cdn.lordicon.com/kjkiqtxg.json",
    "AMISTADES": "https://cdn.lordicon.com/xhbsnkyp.json",
    "PAREJA": "https://cdn.lordicon.com/hqrgkqvs.json",
    "HOGAR": "https://cdn.lordicon.com/etqbfrgp.json",
    "CRECIMIENTO PERSONAL": "https://cdn.lordicon.com/xxdqfhbi.json",
    "EDUCACIÓN": "https://cdn.lordicon.com/ttioogfl.json",
    "ESPIRITUALIDAD": "https://cdn.lordicon.com/jluicbpf.json",
    "ECONOMÍA": "https://cdn.lordicon.com/hbwqfgcf.json",
    "TRABAJO": "https://cdn.lordicon.com/pqxdilfs.json"
};

const iconUrlsReordenados = window.pizzaChartData.labels.map(label => {
        const labelUpper = label.replace(/\s+/g, ' ').replace(/\n/g, ' ').trim().toUpperCase();
    return iconMap[labelUpper] || null; // O un ícono por defecto
});

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
        lordIcon.setAttribute('src', iconUrlsReordenados[i]); // Asigna el ícono correspondiente
        lordIcon.setAttribute('trigger', 'hover');
        lordIcon.setAttribute('colors', `outline:#000000,primary:${color}`);
        lordIcon.style.minWidth = '40px';

        // Contenedor del texto (label y resultado)
        const item = document.createElement('div');
        item.style.background = color;
        item.style.color = '#fff';
        item.style.padding = '8px 16px';
        item.style.borderRadius = '8px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.fontWeight = 'bold';
        item.style.width = '260px'; // <-- Ancho fijo igual para todos

        if (window.innerWidth < 768) {
            item.style.fontSize = '0.75rem';
            item.style.padding = '6px 12px'; // Reduce el padding
            item.style.width = '220px'; // Más angosto en móvil
        } else {
            item.style.fontSize = '1rem'; // Normal en escritorio
        }

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