import { iniciarCuestionario } from "../contenido/encuesta/encuesta.js";
import { inicializarResultados } from '../contenido/resultado/resultado.js';

export const botonesNavegacion = [
    {
        texto: "Encuesta",
        pagina: "contenido/encuesta/encuesta.html",
        icono: "fa-solid fa-list-check",
        init: iniciarCuestionario,
    },
    {
        texto: "Resultado",
        pagina: "contenido/resultado/resultado.html",
        icono: "fa-solid fa-chart-bar",
        init: inicializarResultados
    },
    // {
    //     texto: "Reflexión",
    //     pagina: "contenido/reflexion/reflexion.html",
    //     icono: "fa-solid fa-comments",
    //     init: null,
    // },
    // {
    //     texto: "Plan",
    //     pagina: "contenido/plan/plan.html",
    //     icono: "fa-solid fa-tasks",
    //     init: null,
    // },
];
