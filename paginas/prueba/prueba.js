import { botonesNavegacion } from './datos/navegacion.js';

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.controls');
    const contentContainer = document.getElementById('content');
    let currentActiveButton = null;
    let currentPageInitFunction = null; // Variable para almacenar la función de inicialización de la página actual

    function renderNavButtons() {
        botonesNavegacion.forEach((boton, index) => {
            const button = document.createElement('div');
            button.className = `p-4 cursor-pointer w-14 h-14 rounded-full flex justify-center items-center m-3 bg-[#454e56] text-gray-200`;
            button.innerHTML = `<i class="${boton.icono}"></i>`;
            button.dataset.page = boton.pagina;
            button.addEventListener('click', () => {
                loadPage(boton.pagina, boton.init); // Pasar la función de inicialización
                selectButton(button);
            });

            navContainer.appendChild(button);

            if (index === 0) {
                selectButton(button);
                loadPage(boton.pagina, botonesNavegacion[0].init); // Pasar la función de inicialización inicial
            }
        });
    }

    function loadPage(pageUrl, initFunction) {
        contentContainer.classList.add('blur-sm', 'translate-y-4');
        currentPageInitFunction = initFunction; // Almacenar la función de inicialización para llamar después

        setTimeout(() => {
            fetch(pageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    contentContainer.innerHTML = html;
                    contentContainer.classList.remove('blur-sm', 'translate-y-4');
                    contentContainer.classList.add('translate-y-0');

                    // Llamar a la función de inicialización de la página actual si existe
                    if (currentPageInitFunction) {
                        currentPageInitFunction();
                        currentPageInitFunction = null; // Limpiar después de llamar
                    }
                })
                .catch(error => {
                    console.error('Error al cargar la página:', error);
                    contentContainer.innerHTML = `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100px; color: red; font-weight: bold; font-size: 1.2em;">
                            Error al cargar el contenido.
                        </div>
                    `;
                    contentContainer.classList.remove('blur-sm', 'translate-y-4');
                    contentContainer.classList.add('translate-y-0');
                });
        }, 300);
    }

    window.loadPage = loadPage;

    function selectButton(button) {
        if (currentActiveButton) {
            currentActiveButton.classList.remove('bg-[#e89ca1]', 'text-white');
            currentActiveButton.classList.add('bg-[#454e56]', 'text-gray-200');
        }
        button.classList.remove('bg-[#454e56]', 'text-gray-200');
        button.classList.add('bg-[#e89ca1]', 'text-white');
        currentActiveButton = button;
    }

    renderNavButtons();
});