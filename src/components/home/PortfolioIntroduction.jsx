import { homeContent } from "../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

function PortfolioIntroduction() {
    const { introduction } = homeContent;


  return (
    <section
      id="proposito"
      aria-labelledby="proposito-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        id="proposito-heading"
        number="01"
        label="Propósito"
        title="Un registro estructurado del"
        accent="aprendizaje"
      />

      <div className="mt-12 grid gap-8 md:grid-cols-12">
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase md:col-span-3">
          Portfolio purpose
        </p>

        <div className="max-w-3xl space-y-6 text-[clamp(1rem,1.2vw,1.125rem)] leading-8 text-muted md:col-span-8 md:col-start-5">
          {introduction.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioIntroduction;
