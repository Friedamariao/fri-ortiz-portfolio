import ActivityCard from "./ActivityCard";

function PartialSection({ partial, activities }) {
  const partialActivities = activities.filter(
    (activity) => activity.partialId === partial.id,
  );

  return (
    <section
      aria-labelledby={`${partial.id}-title`}
      className="border-t border-border py-14 md:py-18"
    >
      <div className="grid gap-6 md:grid-cols-[8rem_1fr_auto] md:items-start">
        <p className="font-mono text-sm text-accent">{partial.number}</p>

        <div>
          <h2 id={`${partial.id}-title`} className="text-3xl font-semibold">
            {partial.name}
          </h2>

          <p className="mt-2 text-muted">{partial.topic}</p>
        </div>

        <p className="font-mono text-xs tracking-wider text-muted uppercase">
          {partial.statusLabel}
        </p>
      </div>

      {partialActivities.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {partialActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-surface p-8">
          <p className="font-mono text-xs tracking-wider text-muted uppercase">
            Sin actividades publicadas
          </p>

          <p className="mt-3 max-w-xl leading-7 text-muted">
            Las actividades de este parcial se incorporarán conforme avance el
            curso.
          </p>
        </div>
      )}
    </section>
  );
}

export default PartialSection;
