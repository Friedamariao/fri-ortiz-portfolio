import { homeContent } from "../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

function StudentProfile() {
  const { profile } = homeContent;

  return (
    <section
      id="perfil"
      aria-labelledby="perfil-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          id="perfil-heading"
          number="02"
          label="Perfil"
          title="Perfil de"
          accent="formación"
        />

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <p className="max-w-3xl text-[clamp(1.1rem,1.7vw,1.35rem)] leading-9 md:col-span-7">
            {profile.description}
          </p>

          <dl className="divide-y divide-border border-y border-border md:col-span-4 md:col-start-9">
            {profile.metadata.map((item) => (
              <div key={item.label} className="grid grid-cols-2 gap-4 py-4">
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                  {item.label}
                </dt>

                <dd className="text-sm font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default StudentProfile;
