import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32"
    >
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
        Error / 404
      </p>

      <h1
        id="not-found-title"
        className="mt-6 text-[clamp(3rem,8vw,7rem)] leading-none font-semibold tracking-[-0.055em]"
      >
        Página no encontrada
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
        La página que buscas no existe, cambió de ubicación o todavía no está
        disponible dentro del portafolio.
      </p>

      <Link
        to="/"
        className="mt-10 inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
