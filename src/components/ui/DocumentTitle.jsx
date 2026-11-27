import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { activities } from "../../data/activities";

const SITE_NAME = "Fri Ortiz";
const HOME_TITLE = "Fri Ortiz | Portafolio CNO IV";

function getActivityCode(activity) {
  const number = activity.id.split("-")[1];

  return activity.id.startsWith("project-") ? `PR${number}` : `Act.${number}`;
}

const pageTitles = {
  "/activities": "Actividades",
  "/road-to-hall-of-fame": "Road to Hall of Fame",
  "/indice-portafolio": "Índice del portafolio",
};

activities.forEach((activity) => {
  pageTitles[activity.path] = `${getActivityCode(activity)} · ${activity.title}`;
});

// Tab titles are cut off from the end, so the specific part goes first.
function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      document.title = HOME_TITLE;
      return;
    }

    const pageTitle = pageTitles[pathname] ?? "Página no encontrada";

    document.title = `${pageTitle} | ${SITE_NAME}`;
  }, [pathname]);

  return null;
}

export default DocumentTitle;
