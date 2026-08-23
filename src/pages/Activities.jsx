function Activities() {
  const partials = [
    {
      number: "01",
      title: "Parcial I",
      subject: "Fundamentos de ciberseguridad",
      status: "En desarrollo",
    },
    {
      number: "02",
      title: "Parcial II",
      subject: "Sistemas de gestión de la seguridad",
      status: "Próximamente",
    },
    {
      number: "03",
      title: "Parcial III",
      subject: "Temas actuales en seguridad informática",
      status: "Próximamente",
    },
  ];

  return (
    <section
      aria-labelledby="activities-title"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="max-w-3xl">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          Evidencia académica / CNO IV
        </p>

        <h1
          id="activities-title"
          className="mt-6 text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
        >
          Actividades
        </h1>

        <p className="mt-8 text-lg leading-8 text-muted">
          Registro organizado de las actividades, prácticas, informes, código
          fuente y evidencias desarrolladas durante los tres parciales de la
          asignatura.
        </p>
      </div>

      <div className="mt-16 border-t border-border">
        {partials.map((partial) => (
          <article
            key={partial.number}
            className="grid gap-4 border-b border-border py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center"
          >
            <p className="font-mono text-sm text-accent">{partial.number}</p>

            <div>
              <h2 className="text-2xl font-semibold">{partial.title}</h2>

              <p className="mt-2 text-muted">{partial.subject}</p>
            </div>

            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              {partial.status}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;
