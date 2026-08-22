import { homeContent } from "../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

function TechnicalInformation() {
  const { technicalInformation } = homeContent;

  return (
    <section
      id="informacion-tecnica"
      aria-labelledby="tecnica-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        id="tecnica-heading"
        number="05"
        label="Implementación"
        title="Información técnica del"
        accent="sitio"
      />

      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <dl className="divide-y divide-border border-y border-border md:col-span-6">
          {technicalInformation.items.map((item) => (
            <div
              key={item.label}
              className="grid gap-2 py-5 sm:grid-cols-2 sm:gap-6"
            >
              <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                {item.label}
              </dt>

              <dd className="text-sm font-semibold sm:text-right">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="md:col-span-5 md:col-start-8">
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
            Architecture overview
          </p>

          <p className="mt-6 text-[clamp(1rem,1.3vw,1.125rem)] leading-8 text-muted">
            {technicalInformation.explanation}
          </p>

          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              Documentation status
            </p>

            <p className="mt-2 text-sm font-semibold">
              Estructura inicial implementada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechnicalInformation;
