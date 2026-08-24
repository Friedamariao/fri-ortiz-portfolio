function ActivityFigure({ src, alt, number, caption, className = "max-w-xl" }) {
  return (
    <figure className={`mx-auto my-10 w-full ${className}`}>
      <div className="border border-border bg-surface p-2 sm:p-3">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto h-auto w-full"
        />
      </div>

      <figcaption className="mt-3 grid gap-1 font-mono text-[0.7rem] leading-5 text-muted sm:grid-cols-[5rem_1fr]">
        <span className="text-accent">Figura {number}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

export default ActivityFigure;
