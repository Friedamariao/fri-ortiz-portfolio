function ActivitySection({ id, number, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-36">
      <header className="grid gap-3 border-t border-border pt-5 sm:grid-cols-[5rem_1fr]">
        <p className="font-mono text-xs tracking-[0.16em] text-accent">
          {number}
        </p>

        <h2
          id={`${id}-title`}
          className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.04em]"
        >
          {title}
        </h2>
      </header>

      <div className="mt-8 sm:ml-20">{children}</div>
    </section>
  );
}

export default ActivitySection;
