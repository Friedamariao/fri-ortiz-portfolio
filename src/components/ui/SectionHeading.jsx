function SectionHeading({ id, number, label, title, accent }) {
  return (
    <header className="grid gap-6 border-t border-border pt-5 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
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
            <span className="font-serif font-normal italic text-accent">
              {accent}
            </span>
          )}
        </h2>
      </div>
    </header>
  );
}

export default SectionHeading;
