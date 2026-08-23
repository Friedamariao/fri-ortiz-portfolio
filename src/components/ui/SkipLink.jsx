function SkipLink() {
  function handleSkip(event) {
    event.preventDefault();

    const mainContent = document.getElementById("contenido-principal");

    if (!mainContent) {
      return;
    }

    mainContent.focus({ preventScroll: true });
    mainContent.scrollIntoView();
  }

  return (
    <a
      href="#contenido-principal"
      onClick={handleSkip}
      className="fixed top-3 left-3 z-50 -translate-y-24 bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform focus:translate-y-0"
      // className="sr-only fixed top-4 left-4 z-50 bg-foreground px-4 py-3 text-sm font-semibold text-background focus:not-sr-only"
    >
      Saltar al contenido
    </a>
  );
}

export default SkipLink;
