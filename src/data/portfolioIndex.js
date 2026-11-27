// Activities and projects evaluated in the final grade (18 in total).
// `activityId` points to the entry in activities.js, which provides the page
// path. `title` is the official name from the course rubric.
// `file` is relative to public/resources/.

export const indexGroups = [
  {
    id: "partial-1",
    name: "Parcial I",
    topic: "Fundamentos de ciberseguridad",
    items: [
      {
        code: "Act.01",
        activityId: "activity-01",
        title:
          "Análisis en grupo de un ciberataque real y su impacto empresarial",
        file: "activity-01/184346_act01.pdf",
      },
      {
        code: "Act.03",
        activityId: "activity-03",
        title: "No presiones Esc… todavía",
        file: "activity-03/184346_act03.pdf",
      },
      {
        code: "Act.04",
        activityId: "activity-04",
        title: "Una página demasiado convincente",
        file: "activity-04/184346_act04.pdf",
      },
      {
        code: "PR01",
        activityId: "project-01",
        title: "De la teoría a la práctica: walkthrough en acción (guía y video)",
        file: "project-01/184346_project_p1.pdf",
      },
    ],
  },
  {
    id: "partial-2",
    name: "Parcial II",
    topic: "Sistemas de gestión de la seguridad",
    items: [
      {
        code: "Act.07",
        activityId: "activity-07",
        title:
          "Road to hall of fame (Lab File Path traversal - simple case)",
        file: "road-to-hall-of-fame/fpt-01/184346_fpt01.pdf",
      },
      {
        code: "Act.08",
        activityId: "activity-08",
        title:
          "Road to hall of fame (Lab File Path traversal - traversal sequences blocked with absolute path bypass)",
        file: "road-to-hall-of-fame/fpt-02/184346_fpt02.pdf",
      },
      {
        code: "Act.09",
        activityId: "activity-09",
        title:
          "Road to hall of fame (Lab File Path traversal - traversal sequences stripped non-recursively)",
        file: "road-to-hall-of-fame/fpt-03/184346_fpt03.pdf",
      },
      {
        code: "Act.10",
        activityId: "activity-10",
        title:
          "Road to hall of fame (Lab File Path traversal - traversal sequences stripped with superfluous url-decode)",
        file: "road-to-hall-of-fame/fpt-04/184346_fpt04.pdf",
      },
      {
        code: "Act.11",
        activityId: "activity-11",
        title:
          "Road to hall of fame (Lab File Path traversal - validation of start of path)",
        file: "road-to-hall-of-fame/fpt-05/184346_fpt05.pdf",
      },
      {
        code: "Act.12",
        activityId: "activity-12",
        title:
          "Road to hall of fame (Lab File Path traversal - validation of file extensión with null byte bypass)",
        file: "road-to-hall-of-fame/fpt-06/184346_fpt06.pdf",
      },
      {
        code: "Act.13",
        activityId: "activity-13",
        title: "Red team report: pentesting My File Server 1",
        file: "activity-13/184346_act13.pdf",
      },
      {
        code: "PR02",
        activityId: "project-02",
        title: "Blindando la información: gobernanza y cumplimiento",
        file: "project-02/OrtizLopezFriedaMaria-PR02.zip",
        fileType: "ZIP",
      },
    ],
  },
  {
    id: "partial-3",
    name: "Parcial III",
    topic: "Temas actuales en seguridad informática",
    items: [
      {
        code: "Act.15",
        activityId: "activity-15",
        title:
          "La fotografía como testigo: extracción de metadatos GPS para geolocalización",
        file: "activity-15/OrtizLopezFriedaMaría-ACT15.pdf",
      },
      {
        code: "Act.16",
        activityId: "activity-16",
        title: "La verdad en los bits: adquisición forense con FTK Imager",
        file: "activity-16/184346_act16.pdf",
      },
      {
        code: "Act.17",
        activityId: "activity-17",
        title:
          "La memoria del crimen: extracción de evidencia de un volcado RAM",
        file: "activity-17/184346_act17.pdf",
      },
      {
        code: "Act.18",
        activityId: "activity-18",
        title:
          "La investigación forense: la huella digital de un cibercriminal",
        file: "activity-18/184346_act18.pdf",
      },
      {
        code: "Act.19",
        activityId: "activity-19",
        title:
          "Los primeros minutos cuentan: adquisición forense en escenas del crimen digital",
        file: "activity-19/184346_act19.pdf",
      },
      {
        code: "PR03",
        activityId: "project-03",
        title: "Operación narcos",
        file: "project-03/184346_pr03.pdf",
      },
    ],
  },
];
