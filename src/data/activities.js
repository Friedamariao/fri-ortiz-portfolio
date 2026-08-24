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
    status: "pending",
    statusLabel: "Próximamente",
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
];
