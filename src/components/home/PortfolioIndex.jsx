import { homeContent } from "../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

function PortfolioIndex() {
  const { sections } = homeContent;

  return (
    <section
      id="estructura"
      aria-labelledby="estructura-heading"
      className="bg-foreground text-background"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          id="estructura-heading"
          number="04"
          label="Índice"
          title="Un mapa para recorrer  "
          accent="el portafolio"
        />

        <div className="mt-14 border-t border-background/20">
          {sections.map((section) => {
            const isAvailable = section.status === "Disponible";

            return (
              <article
                key={section.id}
                className="grid gap-5 border-b border-background/20 py-7 md:grid-cols-12 md:items-center"
              >
                <p
                  className="font-mono text-xs tracking-wider text-background/60 md:col-span-1"
                  aria-hidden="true"
                >
                  {section.number}
                </p>

                <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.035em] md:col-span-3">
                  {section.name}
                </h3>

                <p className="max-w-2xl leading-7 text-background/70 md:col-span-5">
                  {section.description}
                </p>

                <p
                  className={`font-mono text-xs tracking-[0.14em] uppercase md:col-span-3 md:text-right ${
                    isAvailable
                      ? "text-terminal-success"
                      : "text-terminal-warning"
                  }`}
                >
                  {isAvailable ? "● " : "○ "}
                  {section.status}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PortfolioIndex;
