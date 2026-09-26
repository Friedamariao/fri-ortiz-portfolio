export const partials = [
  {
    id: "partial-1",
    number: "01",
    name: "Parcial I",
    topic: "Fundamentos de ciberseguridad",
    status: "active",
    statusLabel: "En desarrollo",
  },
  {
    id: "partial-2",
    number: "02",
    name: "Parcial II",
    topic: "Sistemas de gestión de la seguridad",
    status: "active",
    statusLabel: "En desarrollo",
  },
  {
    id: "partial-3",
    number: "03",
    name: "Parcial III",
    topic: "Temas actuales en seguridad informática",
    status: "pending",
    statusLabel: "Próximamente",
  },
];

export const activities = [
  {
    id: "activity-02",
    number: "02",
    title: "Aquí empieza mi portafolio",
    partialId: "partial-1",
    description:
      "Diseño, implementación y publicación de la estructura base del portafolio digital para la asignatura.",
    status: "available",
    statusLabel: "Disponible",
    path: "/#inicio",
    technologies: ["React", "Vite", "Tailwind CSS", "GitHub Pages"],
    visible: false,
  },
  {
    id: "activity-03",
    number: "03",
    title: "No presiones Esc… todavía",
    partialId: "partial-1",
    description:
      "Implementación y documentación de un programa para registrar eventos de teclado en un entorno controlado.",
    status: "available",
    statusLabel: "Disponible",
    path: "/activities/activity-03",
    technologies: ["Python", "pynput", "pywin32", "Callbacks"],
    visible: true,
  },
  {
    id: "activity-04",
    number: "04",
    title: "Una página demasiado convincente",
    partialId: "partial-1",
    description:
      "Simulación controlada de ingeniería social para analizar la captura de información mediante una página web ficticia y Social-Engineer Toolkit.",
    status: "available",
    statusLabel: "Disponible",
    path: "/activities/activity-04",
    technologies: ["Kali Linux", "SET", "HTTP POST", "HTML", "CSS"],
    visible: true,
  },
  {
    id: "project-01",
    number: "P1",
    title: "De la teoría a la práctica",
    partialId: "partial-1",
    description:
      "Walkthrough técnico de reconocimiento, enumeración y análisis de vulnerabilidades sobre la máquina SnakeOil.",
    status: "available",
    statusLabel: "Disponible",
    path: "/activities/project-01",
    technologies: ["Kali Linux", "Nmap", "Gobuster", "Burp Suite", "JWT"],
    visible: true,
  },
  {
    id: "activity-14",
    number: "14",
    title: "Ciberseguridad en una mirada",
    partialId: "partial-2",
    description:
      "Infografía profesional para el curso Introducción a la Ciberseguridad de Cisco Networking Academy, sobre protección de datos y privacidad: riesgos, capas de seguridad y cómo mitigarlos.",
    status: "available",
    statusLabel: "Disponible",
    path: "/activities/activity-14",
    technologies: ["Infografía", "Cisco NetAcad"],
    visible: true,
  },
];