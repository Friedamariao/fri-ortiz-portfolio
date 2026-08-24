function ResourceLink({ href, type, title, description, download }) {
  return (
    <a
      href={href}
      download={download}
      className="group flex min-h-36 flex-col justify-between border border-border bg-background p-5 transition-colors duration-200 hover:border-accent hover:bg-surface"
    >
      <div>
        <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
          {type}
        </p>
        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </div>

      <span className="mt-5 text-sm font-semibold">Descargar</span>
    </a>
  );
}

export default ResourceLink;
