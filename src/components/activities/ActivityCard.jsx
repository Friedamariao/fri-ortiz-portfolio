import { Link } from "react-router-dom";

function ActivityCard({ activity }) {
  const isAvailable = activity.status === "available";

  return (
    <article className="flex h-full flex-col rounded-none border border-border bg-background p-6 transition-colors duration-200 hover:border-accent sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
          Actividad {activity.number}
        </p>

        <p
          className={[
            "font-mono text-[0.68rem] tracking-wider uppercase",
            isAvailable ? "text-accent" : "text-muted",
          ].join(" ")}
        >
          {activity.statusLabel}
        </p>
      </div>

      <h3 className="mt-6 text-2xl leading-tight font-semibold">
        {activity.title}
      </h3>

      <p className="mt-4 flex-1 leading-7 text-muted">{activity.description}</p>

      <div className="mt-8 border-t border-border pt-5">
        {isAvailable ? (
          <Link
            to={activity.path}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-hover"
            aria-label={`Ver Actividad ${activity.number}: ${activity.title}`}
          >
            Ver actividad
          </Link>
        ) : (
          <p className="flex min-h-11 items-center font-mono text-xs text-muted">
            La documentación se está preparando.
          </p>
        )}
      </div>
    </article>
  );
}

export default ActivityCard;
