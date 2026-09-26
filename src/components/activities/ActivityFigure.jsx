import { useEffect, useState } from "react";

function ActivityFigure({ src, alt, number, caption, className = "max-w-xl" }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Close the preview with Escape while it's open, and restore normal
  // page scroll when it closes (the overlay locks scroll while open).
  useEffect(() => {
    if (!isPreviewOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isPreviewOpen]);

  return (
    <figure className={`mx-auto my-10 w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsPreviewOpen(true)}
        className="block w-full cursor-zoom-in border border-border bg-surface p-2 transition-colors duration-200 hover:border-accent sm:p-3"
        aria-label={`Ampliar Figura ${number}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto h-auto w-full"
        />
      </button>

      <figcaption className="mt-3 grid gap-1 font-mono text-[0.7rem] leading-5 text-muted sm:grid-cols-[5rem_1fr]">
        <span className="text-accent">Figura {number}</span>
        <span>{caption}</span>
      </figcaption>

      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista previa de la Figura ${number}`}
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Cerrar vista previa"
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center border border-background/40 text-background/70 transition-colors hover:border-background hover:text-background sm:top-8 sm:right-8"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <img
            src={src}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full cursor-default border border-background/20 object-contain"
          />
        </div>
      )}
    </figure>
  );
}

export default ActivityFigure;