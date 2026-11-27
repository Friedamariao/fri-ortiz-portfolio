import { Link } from "react-router-dom";
import { activities } from "../data/activities";
import { indexGroups } from "../data/portfolioIndex";

const resourceBase = import.meta.env.BASE_URL + "resources/";

const activityPaths = Object.fromEntries(
  activities.map((activity) => [activity.id, activity.path]),
);

const totalItems = indexGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);

const linkClassName =
  "inline-flex min-h-11 items-center font-semibold text-accent transition-colors hover:text-accent-hover";

function IndexRow({ item }) {
  const pageHref = activityPaths[item.activityId];
  const fileHref = resourceBase + encodeURI(item.file);
  const fileName = item.file.split("/").pop();
  const fileType = item.fileType ?? "PDF";

  return (
    <li className="grid gap-4 border-b border-border py-6 md:grid-cols-[6rem_1fr_auto] md:items-center md:gap-8">
      <p className="font-mono text-sm tracking-wider text-accent">
        {item.code}
      </p>

      <h3 className="text-lg leading-snug font-semibold wrap-break-word">
        {item.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
        <Link
          to={pageHref}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Ver página
          <span className="sr-only">
            {" "}
            de {item.code} (se abre en una pestaña nueva)
          </span>
        </Link>

        <a
          href={fileHref}
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          Descargar {fileType}
          <span className="sr-only">
            {" "}
            de {item.code} (se abre en una pestaña nueva)
          </span>
        </a>
      </div>
    </li>
  );
}

function PortfolioIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <section
        aria-labelledby="portfolio-index-title"
        className="py-20 md:py-28"
      >
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              Evaluación final / CNO IV
            </p>

            <h1
              id="portfolio-index-title"
              className="mt-6 text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
            >
              Índice del{" "}
              <span className="font-serif font-normal italic text-accent">
                portafolio
              </span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-muted">
              Las actividades y proyectos que se revisan para la calificación
              final, organizados por parcial. Cada una enlaza a su página y a
              su documento de entrega.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-8 border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <div>
              <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Entregas
              </dt>
              <dd className="mt-2 text-3xl font-semibold">{totalItems}</dd>
            </div>

            <div>
              <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Parciales
              </dt>
              <dd className="mt-2 text-3xl font-semibold">
                {String(indexGroups.length).padStart(2, "0")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {indexGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          aria-labelledby={`${group.id}-index-title`}
          className="border-t border-border py-14 md:py-18"
        >
          <div className="grid gap-6 md:grid-cols-[8rem_1fr_auto] md:items-start">
            <p className="font-mono text-sm text-accent">
              {String(groupIndex + 1).padStart(2, "0")}
            </p>

            <div>
              <h2
                id={`${group.id}-index-title`}
                className="text-3xl font-semibold"
              >
                {group.name}
              </h2>
              <p className="mt-2 text-muted">{group.topic}</p>
            </div>

            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              {group.items.length} entregas
            </p>
          </div>

          <ol className="mt-10 border-t border-border">
            {group.items.map((item) => (
              <IndexRow key={item.code} item={item} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

export default PortfolioIndexPage;
