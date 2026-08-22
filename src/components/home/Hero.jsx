import { portfolio } from "../../data/portfolio";

function Hero() {
  const { student, course, socialLinks } = portfolio;
  const github = socialLinks.find((link) => link.label === "GitHub");

  return (
    <section
      id="inicio"
      aria-labelledby="titulo-principal"
      className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-12 md:py-28"
    >
      <div className="md:col-span-9">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          UPSLP / CNO IV / Agosto–diciembre 2026
        </p>

        <h1
          id="titulo-principal"
          className="mt-6 max-w-4xl text-[clamp(3rem,6.2vw,5.75rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
        >
          <span className="block">Frieda María</span>
          <span className="block">Ortiz López</span>
        </h1>

        <p className="mt-7 font-serif text-[clamp(1.75rem,4vw,3.5rem)] leading-tight italic text-accent">
          {student.alias}
        </p>

        <p className="mt-10 max-w-2xl text-[clamp(1.1rem,1.8vw,1.35rem)] leading-8 text-muted">
          Estudiante de Ingeniería en Tecnologías de la Información interesada
          en ciberseguridad, desarrollo de software y documentación técnica.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#proposito"
            className="inline-flex min-h-11 items-center justify-center bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-accent-hover"
          >
            Explorar el portafolio
          </a>

          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center border border-border px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:bg-surface"
            >
              Ver GitHub ↗
            </a>
          )}
        </div>
      </div>

      <aside className="border-t border-border pt-6 md:col-span-3 md:mt-16">
        <p className="font-mono text-xs tracking-wider text-muted uppercase">
          Portafolio académico
        </p>

        <p className="mt-4 text-base leading-7">{student.program}</p>

        <p className="mt-2 text-sm leading-6 text-muted">{course.name}</p>

        <dl className="mt-8 space-y-4 border-t border-border pt-5 font-mono text-xs tracking-wider uppercase">
          <div>
            <dt className="text-muted">Estado</dt>
            <dd className="mt-1 text-accent">Aprendiendo / documentando</dd>
          </div>

          <div>
            <dt className="text-muted">Periodo</dt>
            <dd className="mt-1">{course.term}</dd>
          </div>

          <div>
            <dt className="text-muted">Semestre</dt>
            <dd className="mt-1">{student.semester}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

export default Hero;
