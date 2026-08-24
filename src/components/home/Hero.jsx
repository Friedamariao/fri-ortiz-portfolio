import { Link } from "react-router-dom";
import githubIcon from "../../assets/icons/github.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import { portfolio } from "../../data/portfolio";
import InteractiveTerminal from "./InteractiveTerminal";

function Hero() {
  const { student, socialLinks } = portfolio;

  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

  return (
    <section
      id="inicio"
      aria-labelledby="titulo-principal"
      className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:grid-cols-2 sm:px-8 md:py-28 lg:gap-16"
    >
      <div className="min-w-0">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          UPSLP / CNO IV / Agosto–diciembre 2026
        </p>

        <h1
          id="titulo-principal"
          className="mt-6 text-[clamp(3rem,6.2vw,5.75rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
        >
          <span className="block">Frieda María</span>
          <span className="block">Ortiz López</span>
        </h1>

        <p className="mt-7 font-serif text-[clamp(1.75rem,4vw,3.5rem)] leading-tight italic text-accent">
          {student.alias}
        </p>

        <p className="mt-10 max-w-2xl text-[clamp(1.05rem,1.8vw,1.25rem)] leading-8 text-muted">
          Estudiante de Ingeniería en Tecnologías de la Información con ganas
          constantes de seguir aprendiendo y creciendo dentro de la
          ciberseguridad interesada por el pentesting y el análisis de
          vulnerabilidades.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/activities"
            className="inline-flex min-h-11 items-center justify-center rounded-none bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-accent-hover"
          >
            Ver actividades
          </Link>

          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de GitHub"
              title="GitHub"
              className="inline-flex size-11 shrink-0 items-center justify-center border border-border transition-colors duration-200 hover:border-accent hover:bg-surface"
            >
              <img
                src={githubIcon}
                alt=""
                aria-hidden="true"
                className="size-5"
              />
            </a>
          )}

          {linkedin && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de LinkedIn"
              title="LinkedIn"
              className="inline-flex size-11 shrink-0 items-center justify-center border border-border transition-colors duration-200 hover:border-accent hover:bg-surface"
            >
              <img
                src={linkedinIcon}
                alt=""
                aria-hidden="true"
                className="size-5"
              />
            </a>
          )}
        </div>
      </div>

      <div className="min-w-0">
        <InteractiveTerminal />
      </div>
    </section>
  );
}

export default Hero;
