import { portfolio } from "../../data/portfolio";
import { Link } from "react-router-dom";

function Footer() {
  const { student, course, site, socialLinks } = portfolio;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2">
        <div>
          <p className="font-serif text-2xl italic text-accent">
            {student.alias}
          </p>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            {student.fullName} · {course.name}
            <br />
            {student.institution} · {course.term}
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 content-center text-sm font-semibold underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/#inicio"
              className="min-h-11 content-center text-sm font-semibold underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Volver arriba
            </Link>
          </div>

          <div className="font-mono text-[0.7rem] leading-6 tracking-wider text-muted uppercase md:text-right">
            <p>Portfolio status: {site.status}</p>
            <p>Version: {site.version} · 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
