function inicializarResultados() {
    generarGraficoPizza();
}

function generarGraficoPizza() {
    const pizzaChart = document.getElementById('pizza-chart');
    if (!pizzaChart) {
        console.error('Elemento con ID "pizza-chart" no encontrado.');
        return;
    }

    const numSlices = 12;
    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-pink-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-lime-500',
        'bg-cyan-500',
        'bg-amber-500',
    ];

    // Limpiar cualquier estilo previo
    pizzaChart.style.backgroundImage = '';

    for (let i = 0; i < numSlices; i++) {
        const slice = document.createElement('div');
        slice.className = `absolute inset-0 rounded-full ${colors[i % colors.length]}`;
        slice.style.clipPath = `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * i / numSlices)}% ${50 + 50 * Math.sin(2 * Math.PI * i / numSlices)}%, ${50 + 50 * Math.cos(2 * Math.PI * (i + 1) / numSlices)}% ${50 + 50 * Math.sin(2 * Math.PI * (i + 1) / numSlices)}%, 50% 50%)`;
        pizzaChart.appendChild(slice);
    }
}

export { inicializarResultados };