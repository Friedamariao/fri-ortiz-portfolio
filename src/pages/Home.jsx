import { portfolio } from "../data/portfolio";

function Home() {
  const { student, course } = portfolio;

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
          className="mt-6 max-w-5xl text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.94] font-semibold tracking-[-0.06em]"
        >
          {student.fullName}
        </h1>

        <p className="mt-7 font-serif text-[clamp(1.75rem,4vw,3.5rem)] leading-tight italic text-accent">
          {student.alias}
        </p>
      </div>

      <div className="border-t border-border pt-6 md:col-span-3 md:mt-16">
        <p className="font-mono text-xs tracking-wider text-muted uppercase">
          Portafolio académico
        </p>

        <p className="mt-4 text-base leading-7">{student.program}</p>

        <p className="mt-2 text-sm leading-6 text-muted">{course.name}</p>

        <p className="mt-6 font-mono text-xs tracking-wider text-accent uppercase">
          Status: {student.status}
        </p>
      </div>
    </section>
  );
}

export default Home;
