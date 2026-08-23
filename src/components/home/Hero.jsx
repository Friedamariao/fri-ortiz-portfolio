import { portfolio } from "../../data/portfolio";
import { Link } from "react-router-dom";
import InteractiveTerminal from "./InteractiveTerminal";

function Hero() {
  const { student, socialLinks } = portfolio;
  const github = socialLinks.find((link) => link.label === "GitHub");

  return (
    <section
      id="inicio"
      aria-labelledby="titulo-principal"
      className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:grid-cols-12 sm:px-8 md:py-28 lg:gap-16"
    >
      <div className="md:col-span-7">
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
          Estudiante de Ingeniería en Tecnologías de la Información interesada
          en ciberseguridad, desarrollo de software y documentación técnica.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            to="/#proposito"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-accent-hover"
          >
            Explorar el portafolio
          </Link>

          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:bg-surface"
            >
              Ver GitHub ↗
            </a>
          )}
        </div>
      </div>

      <div className="md:col-span-5">
        <InteractiveTerminal />
      </div>
    </section>
  );
}

export default Hero;
