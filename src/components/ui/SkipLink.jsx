function SkipLink() {
  return (
    <a
      href="#contenido-principal"
      className="sr-only fixed top-4 left-4 z-50 bg-foreground px-4 py-3 text-sm font-semibold text-background focus:not-sr-only"
    >
      Saltar al contenido principal
    </a>
  );
}

export default SkipLink;
