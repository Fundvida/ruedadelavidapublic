import { controlsData } from "./conoce.data.js";
import { sections } from "./conoce.data.js";

function renderControls() {
    const controlsContainer = document.querySelector(".controls");
    controlsContainer.innerHTML = "";

    controlsData.forEach((item, index) => {
        const button = document.createElement("div");
        button.className = `p-4 cursor-pointer w-10 h-10 md:w-14 md:h-14 rounded-full flex justify-center items-center m-3 bg-[#454e56] text-gray-200`;
        button.innerHTML = `<i class="${item.icon}"></i>`;
        button.onclick = function () {
            selectButton(button);
            loadPage(item.page);
        };

        controlsContainer.appendChild(button);

        if (index === 0) selectButton(button);
    });
}

function loadPage(page) {
    const content = document.getElementById("content");

    // Ocultar el contenido antes de cambiarlo
    content.classList.add("blur-sm", "translate-y-4");

    setTimeout(() => {
        fetch(page)
            .then((response) => response.text())
            .then((data) => {
                content.innerHTML = data;
                updateSections(); // Asegura que se recarguen las secciones en cada página

                // Mostrar el nuevo contenido con animación
                content.classList.remove("blur-sm", "translate-y-4");
                content.classList.add("translate-y-0");
                window.scrollTo({ top: 0 });
            })
            .catch((error) => console.error("Error al cargar la página:", error));
    }, 300); // Pequeña pausa para la salida antes de mostrar la nueva página
}

function selectButton(selected) {
    document.querySelectorAll(".controls div").forEach((button) => {
        button.classList.remove("bg-[#e89ca1]", "text-white");
        button.classList.add("bg-[#454e56]", "text-gray-200");
    });

    selected.classList.remove("bg-[#454e56]", "text-gray-200");
    selected.classList.add("bg-[#e89ca1]", "text-white");
}

document.addEventListener("DOMContentLoaded", function () {
    renderControls();
    loadPage(controlsData[0].page);
});

function updateSections() {
    const container = document.getElementById("about-container");
    if (!container) return; // Evita errores si el contenedor no existe en una página

    container.innerHTML = "";

    sections.forEach((section) => {
        const div = document.createElement("div");
        div.className =
            "p-4 md:p-6 rounded-lg shadow-xl ring-2 ring-gray-300 bg-white transition duration-300 hover:ring-4 hover:shadow-2xl hover:-translate-y-2 flex flex-col";
        div.innerHTML = `
            <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-[#edb1b5] text-center mb-2">${section.title}</h3>
            <p class="text-base md:text-xl lg:text-2xl text-[#505b80] text-balance tracking-widest text-justify">${section.text}</p>
        `;
        container.appendChild(div);
    });
}