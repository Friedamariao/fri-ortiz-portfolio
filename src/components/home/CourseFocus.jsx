import { homeContent } from "../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

function CourseFocus() {
  const { courseFocus } = homeContent;

  return (
    <section
      id="enfoque"
      aria-labelledby="enfoque-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeading
        id="enfoque-heading"
        number="03"
        label="Curso"
        title="Ruta de"
        accent="estudio"
      />

      <div className="mt-12 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-muted">
            {courseFocus.description}
          </p>

          <p className="mt-7 font-mono text-xs tracking-[0.16em] text-accent uppercase">
            Course scope
          </p>
        </div>

        <ol className="border-t border-border md:col-span-6 md:col-start-7">
          {courseFocus.areas.map((area, index) => (
            <li
              key={area}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-5"
            >
              <span
                className="font-mono text-xs text-accent"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-base leading-6">{area}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default CourseFocus;
