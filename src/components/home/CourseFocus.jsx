import { homeContent } from "../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

function CourseFocus() {
  const { courseFocus } = homeContent;

  return (
    <section
      id="enfoque"
      aria-labelledby="enfoque-heading"
      className="scroll-mt-32 bg-foreground text-background"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <SectionHeading
          id="enfoque-heading"
          number="03"
          label="Curso"
          title="Ruta de"
          accent="estudio"
          inverted
        />

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-background/75">
              {courseFocus.description}
            </p>

            <p className="mt-7 font-mono text-xs tracking-[0.16em] text-accent-on-dark uppercase">
              Course scope
            </p>
          </div>

          <ol className="border-t border-background/20 md:col-span-6 md:col-start-7">
            {courseFocus.areas.map((area, index) => (
              <li
                key={area}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-background/20 py-5"
              >
                <span
                  className="font-mono text-xs text-accent-on-dark"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-base leading-6">{area}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default CourseFocus;
