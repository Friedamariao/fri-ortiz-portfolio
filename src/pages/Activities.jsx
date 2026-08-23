import PartialSection from "../components/activities/PartialSection";
import { activities, partials } from "../data/activities";

function Activities() {
  const publishedActivities = activities.filter(
    (activity) => activity.status === "available",
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <section aria-labelledby="activities-title" className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
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
              Registro organizado de las actividades, prácticas, informes,
              código fuente y evidencias desarrolladas durante los tres
              parciales de la asignatura.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-8 border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <div>
              <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Publicadas
              </dt>
              <dd className="mt-2 text-3xl font-semibold">
                {String(publishedActivities).padStart(2, "0")}
              </dd>
            </div>

            <div>
              <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Parciales
              </dt>
              <dd className="mt-2 text-3xl font-semibold">
                {String(partials.length).padStart(2, "0")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {partials.map((partial) => (
        <PartialSection
          key={partial.id}
          partial={partial}
          activities={activities}
        />
      ))}
    </div>
  );
}

export default Activities;
