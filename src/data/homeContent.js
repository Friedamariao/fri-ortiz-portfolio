export const homeContent = {
  introduction: {
    title: "Un registro del aprendizaje",
    accent: "aprendizaje",
    paragraphs: [
      "Este portafolio digital reúne y documenta las actividades, prácticas, y proyectos desarrollados durante la asignatura CNO IV: Seguridad Informática. Pero más allá del requisito académico, es para mí un espacio donde puedo ver con claridad a lo que he puesto mi esfuerzo, he trabajado y logrado, durante el curso.",
      "El contenido se actualizará progresivamente durante el semestre conforme se desarrollen nuevas actividades, prácticas y proyectos.",
    ],
  },

  profile: {
    title: "Perfil académico",
    accent: "académico",
    description:
      "Soy Frieda María Ortiz López, estudiante de séptimo semestre de Ingeniería en Tecnologías de la Información en la Universidad Politécnica de San Luis Potosí.\nLo que me atrapó para entrar a a la carrera fue la programación, poder tomar una idea y, con las herramientas correctas, convertirla en algo tangible. Esa curiosidad me ha llevado a moverme para trabajar con distintas herramientas como React, Node.js, Python, Docker y PostgreSQL en proyectos de gestión y bases de datos. Actualmente busco ampliar mis conocimientos en pruebas de penetración, análisis de vulnerabilidades y redes.\nCombino mis estudios con dos trabajos, uno de ellos en el área de project management de Presyst, una aplicación web y móvil para empresas proveedoras de servicios, y procuro siempre tener algo nuevo que aprender",
    metadata: [
      {
        label: "Semestre",
        value: "07",
      },
      {
        label: "Programa",
        value: "Ingeniería en TI",
      },
      {
        label: "Enfoque",
        value: "Ciberseguridad",
      },
      {
        label: "Ubicación",
        value: "San Luis Potosí, MX",
      },
      {
        label: "Estado",
        value: "En formación",
      },
    ],
  },

  courseFocus: {
    title: "Áreas de estudio",
    accent: "estudio",
    description:
      "La materia integra fundamentos, ejercicios prácticos y documentación técnica orientados a comprender los riesgos, controles y procesos relacionados con la protección de sistemas de información.",
    areas: [
      "Parcial I — Fundamentos de ciberseguridad",
      "Parcial II — Sistemas de gestión de la seguridad",
      "Parcial III — Temas actuales en seguridad informática",
    ],
  },

  sections: [
    {
      id: "home",
      number: "01",
      name: "Inicio",
      description:
        "Presentación general, identidad académica, propósito e información técnica del portafolio.",
      status: "Disponible",
    },
    {
      id: "activities",
      number: "02",
      name: "Actividades",
      description:
        "Registro organizado por parcial de las prácticas, evidencias y código desarrollados durante el curso.",
      status: "Disponible",
    },
    {
      id: "projects",
      number: "03",
      name: "Proyectos",
      description:
        "Prácticas que sintetizan las competencias adquiridas a lo largo del curso.",
      status: "Próximamente",
    },
    {
      id: "certificates",
      number: "04",
      name: "Certificados",
      description:
        "Credenciales y formación complementaria relacionada con el área.",
      status: "Próximamente",
    },
  ],

  technicalInformation: {
    items: [
      { label: "Lenguaje", value: "JavaScript (JSX)" },
      { label: "Librería de UI", value: "React 19" },
      { label: "Enrutamiento", value: "React Router" },
      { label: "Construcción", value: "Vite" },
      { label: "Estilos", value: "Tailwind CSS v4" },
      { label: "Formulario y correo", value: "EmailJS" },
      { label: "Control de versiones", value: "Git y GitHub" },
      { label: "Publicación", value: "GitHub Pages" },
    ],

    explanation:
      "El portafolio utiliza una arquitectura basada en componentes reutilizables, organizados por dominio (inicio, actividades, contacto, interfaz) para facilitar su mantenimiento conforme crezca durante el semestre. El desarrollo lo realicé con un enfoque mobile-first, cuidando el contraste de color y manteniendo un diseño limpio y ordenado, adecuado para el contexto académico del portafolio",
  },
};
