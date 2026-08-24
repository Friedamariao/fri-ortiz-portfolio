function SectionHeading({
  id,
  number,
  label,
  title,
  accent,
  inverted = false,
}) {
  const borderColor = inverted ? "border-background/20" : "border-border";

  const accentColor = inverted ? "text-accent-on-dark" : "text-accent";

  return (
    <header
      className={`grid gap-6 border-t pt-5 md:grid-cols-12 ${borderColor}`}
    >
      <div className="md:col-span-3">
        <p
          className={`font-mono text-xs tracking-[0.16em] uppercase ${accentColor}`}
        >
          {number} / {label}
        </p>
      </div>

      <div className="md:col-span-9">
        <h2
          id={id}
          className="max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.045em]"
        >
          {title}{" "}
          {accent && (
            <span className={`font-serif font-normal italic ${accentColor}`}>
              {accent}
            </span>
          )}
        </h2>
      </div>
    </header>
  );
}

export default SectionHeading;

