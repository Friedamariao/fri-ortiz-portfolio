import Constellation from "../components/achievements/Constellation";
import { roadToHallOfFameLabs } from "../data/roadToHallOfFame";

function RoadToHallOfFame() {
  const unlockedCount = roadToHallOfFameLabs.filter(
    (lab) => lab.status === "unlocked",
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <section aria-labelledby="hall-of-fame-title" className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              Evidencia académica / CNO IV
            </p>

            <h1
              id="hall-of-fame-title"
              className="mt-6 text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.055em]"
            >
              Road to{" "}
              <span className="font-serif font-normal italic text-accent">
                Hall of Fame
              </span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-muted">
              Ruta de progreso de los laboratorios prácticos de la asignatura:
              reconocimiento, explotación y documentación técnica de cada
              reto, con su evidencia y reporte correspondiente.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-8 border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
            <div>
              <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Desbloqueados
              </dt>
              <dd className="mt-2 text-3xl font-semibold">
                {String(unlockedCount).padStart(2, "0")}
              </dd>
            </div>

            <div>
              <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Laboratorios
              </dt>
              <dd className="mt-2 text-3xl font-semibold">
                {String(roadToHallOfFameLabs.length).padStart(2, "0")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-14">
          <Constellation labs={roadToHallOfFameLabs} />
        </div>
      </section>
    </div>
  );
}

export default RoadToHallOfFame;