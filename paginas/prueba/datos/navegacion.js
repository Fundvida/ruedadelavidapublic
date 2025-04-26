import { iniciarCuestionario } from "../contenido/encuesta/encuesta.js";
import { inicializarResultados } from '../contenido/resultado/resultado.js';
import { inicializarReflexion } from '../contenido/reflexion/reflexion.js';
import { inicializarPlan } from '../contenido/plan/plan.js';

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
        icono: "fa-solid fa-chart-pie",
        init: inicializarResultados,
    },
    {
        texto: "Reflexión",
        pagina: "contenido/reflexion/reflexion.html",
        icono: "fa-solid fa-chart-bar",
        init: inicializarReflexion,
    },
    {
        texto: "Plan",
        pagina: "contenido/plan/plan.html",
        icono: "fa-solid fa-calendar-check",
        init: inicializarPlan,
    },
];
