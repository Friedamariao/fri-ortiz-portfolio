import { portfolio } from "../../data/portfolio";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  const { student, course } = portfolio;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-6 gap-y-2 px-5 py-2 font-mono text-[0.7rem] tracking-wider text-muted uppercase sm:px-8">
          <span>{course.name}</span>
          <span>{student.institution}</span>
          <span>{course.term}</span>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="flex min-h-11 items-center gap-3 focus-visible:rounded-none"
          aria-label="Ir al inicio"
        >
          <span className="font-serif text-3xl leading-none italic text-accent">
            {student.alias}
          </span>

          <span className="hidden border-l border-border pl-3 text-xs leading-relaxed text-muted sm:block">
            {student.fullName}
          </span>
        </Link>

        <Navigation />
      </div>
    </header>
  );
}

export default Header;
