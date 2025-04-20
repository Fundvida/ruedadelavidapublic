export const opciones = [
    { texto: "Nunca", puntaje: 0 },
    { texto: "Rara vez", puntaje: 0.3 },
    { texto: "Algunas veces", puntaje: 0.5 },
    { texto: "Frecuentemente", puntaje: 0.8 },
    { texto: "Siempre", puntaje: 1 }
];

export const cuestionarios = [
    {
        numeroSeccion: 1,
        titulo: "CONTRIBUCION SOCIAL",
        preguntas: [
            "¿Has participado en alguna acción solidaria?",
            "¿Te has ofrecido como voluntario?",
            "¿Te gusta colaborar con causas benéficas?",
            "¿Ayudas a amigos en momentos difíciles?",
            "¿Participas en actividades comunitarias?",
            "¿Ofreces tus habilidades a quienes las necesitan?",
            "¿Has donado objetos que ya no usas?",
            "¿Apoyas a alguien en proyectos personales?",
            "¿Colaboras con organizaciones educativas?",
            "¿Disfrutas participar en campañas sociales?"
        ]
    },
    {
        numeroSeccion: 2,
        titulo: "OCIO",
        preguntas: [
            "¿Tienes suficiente tiempo libre para hacer lo que disfrutas?",
            "¿Encuentras tiempo para relajarte?",
            "¿Te gusta explorar nuevas actividades?",
            "¿Haces actividades de ocio con amigos y familiares?",
            "¿Te sientes cómodo con los gastos de ocio?",
            "¿Logras equilibrar trabajo y tiempo libre?",
            "¿Pruebas nuevas actividades en tu tiempo libre?",
            "¿Disfrutas pasar tiempo a solas?",
            "¿Te sientes renovado después de hacer tus actividades favoritas?",
            "¿Te interesa aprender nuevas habilidades en tu tiempo libre?"
        ]
    },
    {
        numeroSeccion: 3,
        titulo: "SALUD",
        preguntas: [
            "¿Te alimentas de manera saludable y equilibrada?",
            "¿Realizas actividad física?",
            "¿Descansas lo suficiente y duermes adecuadamente?",
            "¿Evitas hábitos poco saludables como fumar, beber en exceso?",
            "¿Acudes regularmente a controles médicos y revisiones de salud?",
            "¿Te sientes bien física y emocionalmente?",
            "¿Estás dispuesto/a a hacer cambios en tus hábitos diarios para mejorar tu salud?",
            "¿Te mantienes hidratado/a bebiendo suficiente agua diariamente?",
            "¿Te preocupas por el cuidado de tu piel y tomas medidas para protegerte del sol y otros factores ambientales?",
            "¿Estás dispuesto/a a buscar ayuda y asesoramiento de profesionales de la salud si lo necesitas?"
        ]
    },
    {
        numeroSeccion: 4,
        titulo: "FAMILIA",
        preguntas: [
            "¿Estás en contacto regular con tu familia (a través de llamadas, mensajes de texto, videollamadas?",
            "¿Eres capaz de resolver los conflictos de manera efectiva con los miembros de tu familia?",
            "¿Pasas tiempo de calidad con los miembros de tu familia, como hacer actividades juntos o tener cenas familiares regulares?",
            "¿Tienes una buena comunicación con tus padres/hermanos/hijos?",
            "¿Trabajas activamente en mejorar las relaciones con los miembros de tu familia que tienen una relación tensa contigo?",
            "¿Te sientes feliz y satisfecho/a con la relación que tienes con tus padres/hermanos/hijos?",
            "¿Crees que tus relaciones con los miembros de tu familia son saludables y te aportan felicidad y satisfacción?",
            "¿Estás dispuesto/a a trabajar en resolver los conflictos pendientes con los miembros de tu familia?",
            "¿Te sientes apreciado/a y valorado/a por los miembros de tu familia?",
            "¿Estás satisfecho/a con la cantidad de tiempo que dedicas a tu familia?"
        ]
    },
    {
        numeroSeccion: 5,
        titulo: "AMISTADES",
        preguntas: [
            "¿Te sientes satisfecho/a con la cantidad de amigos que tienes?",
            "¿Te esfuerzas por mantener el contacto con tus amigos, aunque sea a través de llamadas o mensajes de texto?",
            "¿Te sientes cómodo/a compartiendo tus sentimientos y emociones con tus amigos?",
            "¿Estás dispuesto/a a trabajar en resolver los conflictos pendientes con tus amigos?",
            "¿Te sientes apreciado/a y valorado/a por tus amigos?",
            "¿Te sientes cómodo/a diciéndole NO a tus amigos cuando no puedes comprometerte a un plan o actividad?",
            "¿Estás dispuesto/a a dar segundas oportunidades a amigos que hayan hecho algo que te haya molestado?",
            "¿Te sientes cómodo/a con el nivel de comunicación que tienes con tus amigos?",
            "¿Te esfuerzas por mantener un equilibrio entre tus relaciones con amigos y tu tiempo para ti mismo/a?",
            "¿Te sientes satisfecho/a con el nivel de apoyo emocional que recibes de tus amigos?"
        ]
    },
    {
        numeroSeccion: 6,
        titulo: "PAREJA",
        preguntas: [
            "¿Trabajas activamente en resolver los conflictos con tu pareja?",
            "¿Comunicas tus sentimientos y necesidades en la relación de pareja?",
            "¿Expresas a tu pareja el valor y la importancia que tiene en tu vida?",
            "¿Respetas los límites y necesidades personales de tu pareja?",
            "¿Estás dispuesto/a a comprometerte y a trabajar en mejorar la relación de pareja",
            "¿Trabajas en superar los patrones de conducta negativos en la relación de pareja?",
            "¿Te sientes seguro/a y en confianza con tu pareja?",
            "¿Estás dispuesto/a a cambiar conductas o actitudes que afecten negativamente la relación de pareja?",
            "¿Trabajas en mejorar la comunicación y la conexión emocional con tu pareja?",
            "¿Mantienes un equilibrio saludable entre tu relación de pareja y otras áreas de tu vida?"
        ]
    },
    {
        numeroSeccion: 7,
        titulo: "HOGAR",
        preguntas: [
            "¿Estás satisfecho/a con el tamaño de tu hogar actual?",
            "¿Te gusta la ubicación de tu hogar?",
            "¿Te sientes cómodo/a con el nivel de limpieza y orden de tu hogar?",
            "¿Tienes suficiente privacidad en tu hogar?",
            "¿Tienes suficiente espacio para almacenar tus pertenencias personales?",
            "¿Te sientes cómodo/a invitando a amigos y familiares a tu hogar?",
            "¿Estás contento/a con los gastos asociados a tu hogar?",
            "¿Tienes acceso a servicios públicos confiables, como agua potable y saneamiento básico?",
            "¿Tienes suficiente espacio al aire libre, como jardines, patios o terrazas?",
            "¿Te sientes cómodo/a con el nivel de accesibilidad y movilidad dentro de tu hogar?"
        ]
    },
    {
        numeroSeccion: 8,
        titulo: "CRECIMIENTO PERSONAL",
        preguntas: [
            "¿Te tomas tiempo para reflexionar sobre tus pensamientos y emociones?",
            "¿Te permites cometer errores y aprender de ellos?",
            "¿Estás dispuesto/a a pedir ayuda cuando lo necesitas?",
            "¿Te dedicas tiempo para hacer actividades que te gustan y te relajan?",
            "¿Estás dispuesto/a a salir de tu zona de confort para experimentar cosas nuevas?",
            "¿Te fijas metas y objetivos para tu vida?",
            "¿Te sientes cómodo/a expresando tus necesidades y sentimientos?",
            "¿Te sientes cómodo/a tomando decisiones importantes?",
            "¿Te dedicas tiempo para el cuidado de tu salud mental?",
            "¿Te permites tiempo para descansar y recargar energía?"
        ]
    },
    {
        numeroSeccion: 9,
        titulo: "EDUCACIÓN",
        preguntas: [
            "¿Dedicas tiempo diariamente a aprender algo nuevo?",
            "¿Buscas nuevas formas de aprender, como cursos en línea o aplicaciones móviles?",
            "¿Inviertes en libros y materiales educativos para complementar tu formación?",
            "¿Estás dispuesto/a a aceptar críticas constructivas para mejorar tu aprendizaje?",
            "¿Te enfocas en aprender cosas que te apasionan y motivan?",
            "¿Estás dispuesto/a a salir de tu zona de confort para aprender cosas nuevas y desafiantes?",
            "¿Te informas y mantienes actualizado/a en tu área de interés?",
            "¿Te enfocas en aprender a largo plazo y no solo para un examen o evaluación?",
            "¿Aprovechas las oportunidades de retroalimentación para mejorar tus habilidades de estudio?",
            "¿Te esfuerzas por mantenerte motivado/a y enfocado/a en tus objetivos de aprendizaje?"
        ]
    },
    {
        numeroSeccion: 10,
        titulo: "ESPIRITUALIDAD",
        preguntas: [
            "¿Dedicas tiempo regularmente para conectarte con tu espiritualidad?",
            "¿Tienes una práctica espiritual que te ayude a conectarte con tu ser interior?",
            "¿TTe has unido a algún grupo de meditación o espiritualidad para compartir tus prácticas y aprender de otros?",
            "¿Te has tomado tiempo para reflexionar sobre tus creencias y valores personales?",
            "¿Te sientes cómodo/a hablando de tus creencias espirituales con otras personas?",
            "¿Has explorado diferentes formas de conexión espiritual, como el arte o la música?",
            "¿Has tenido momentos de claridad o intuición que te hayan llevado a tomar una decisión importante?",
            "¿Has encontrado inspiración en algún líder espiritual o maestro?",
            "¿Te has perdonado a ti mismo/a por errores pasados y te has comprometido a seguir adelante con amor y compasión?",
            "¿Te sientes en paz con tus dudas y preguntas sobre tu espiritualidad?"
        ]
    },
    {
        numeroSeccion: 11,
        titulo: "ECONOMÍA",
        preguntas: [
            "¿Te tomas el tiempo para hacer un presupuesto mensual?",
            "¿Guardas un porcentaje de tus ingresos para ahorros?",
            "¿Investigas antes de realizar grandes compras para obtener el mejor precio y calidad?",
            "¿Evitas las compras impulsivas?",
            "¿Tienes un plan de ahorro para emergencias financieras?",
            "¿Tienes un fondo de ahorro para gastos importantes a largo plazo, como la compra de una casa o un coche?",
            "¿Estás al tanto de los impuestos que debes pagar cada año?",
            "¿Tienes un plan de retiro para el futuro?",
            "¿Utilizas herramientas para controlar tus gastos y analizar tu flujo de efectivo?",
            "¿Eres cuidadoso/a al elegir opciones de inversión para minimizar los riesgos?"
        ]
    },
    {
        numeroSeccion: 12,
        titulo: "TRABAJO",
        preguntas: [
            "¿Estás dedicando tiempo para identificar tus habilidades y pasiones en el trabajo?",
            "¿Estás buscando nuevas oportunidades laborales que se alineen con tus objetivos y valores personales?",
            "¿Estás actualizando regularmente tu currículum y perfil en redes profesionales?",
            "¿Estás buscando oportunidades para trabajar en proyectos desafiantes y gratificantes?",
            "¿Estás logrando un equilibrio adecuado entre el trabajo y la vida personal?",
            "¿Estás construyendo y manteniendo relaciones positivas con tus compañeros de trabajo?",
            "¿Estás cumpliendo con tus plazos y objetivos en el trabajo?",
            "¿Estás fomentando la colaboración y el trabajo en equipo en el trabajo?",
            "¿Estás estableciendo límites saludables entre el trabajo y la vida personal?",
            "¿Estás manteniendo una actitud de aprendizaje y curiosidad en el trabajo?"
        ]
    },
];
