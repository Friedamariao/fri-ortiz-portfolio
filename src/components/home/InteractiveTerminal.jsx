import { useEffect, useRef, useState } from "react";

const WELCOME_MESSAGE = "Bienvenida. Escribe help para empezar.";

let hasPlayedWelcomeAnimation = false;

const commandResponses = {
  help: "Comandos disponibles: help, whoami, course, portfolio, sections, tech, contact, clear",

  whoami:
    "Frieda María Ortiz López (Fri) — Estudiante de Ing. en Tecnologías de la Información, UPSLP",

  course: "CNO IV — Seguridad Informática · Agosto–diciembre 2026",

  portfolio:
    "Portafolio académico que documenta progresivamente el aprendizaje del curso.",

  sections:
    "Inicio [activo] · Actividades [activo] · Proyectos [próximamente] · Certificados [próximamente] · Contacto [activo]",

  tech: "React 19 · Vite · Tailwind CSS v4 · React Router · Git · GitHub Pages · HTTPS",

  contact:
    "Usa el formulario de contacto disponible al final de la página de Inicio.",
};

const availableCommands = Object.keys(commandResponses).concat("clear");

function InteractiveTerminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);

  const [welcomeAnimation] = useState(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const shouldAnimate = !hasPlayedWelcomeAnimation && !prefersReducedMotion;

    return {
      shouldAnimate,
      initialText: shouldAnimate ? "" : WELCOME_MESSAGE,
    };
  });

  const { shouldAnimate, initialText } = welcomeAnimation;

  const [welcomeText, setWelcomeText] = useState(initialText);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const outputRef = useRef(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (!shouldAnimate) {
      return undefined;
    }

    let currentCharacter = 0;

    const typingInterval = window.setInterval(() => {
      currentCharacter += 1;

      setWelcomeText(WELCOME_MESSAGE.slice(0, currentCharacter));

      if (currentCharacter >= WELCOME_MESSAGE.length) {
        window.clearInterval(typingInterval);
        hasPlayedWelcomeAnimation = true;
      }
    }, 42);

    return () => {
      window.clearInterval(typingInterval);
    };
  }, [shouldAnimate]);

  useEffect(() => {
    const output = outputRef.current;

    if (output) {
      output.scrollTop = output.scrollHeight;
    }
  }, [history]);

  function executeCommand(rawCommand) {
    const normalizedCommand = rawCommand.trim().toLowerCase();

    if (!normalizedCommand) {
      return;
    }

    if (normalizedCommand === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }

    const response =
      commandResponses[normalizedCommand] ??
      "Comando no reconocido. Escribe 'help' para ver las opciones.";

    setHistory((currentHistory) => [
      ...currentHistory,
      {
        id: nextId.current++,
        command: normalizedCommand,
        response,
      },
    ]);

    setCommand("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    executeCommand(command);
  }

  return (
    <aside aria-label="Terminal interactiva del portafolio" className="w-full">
      <div className="overflow-hidden rounded-xl border border-terminal-border bg-terminal-background font-mono text-[0.85rem] shadow-[0_20px_40px_-24px_rgba(42,33,27,0.35)]">
        <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2.5">
          <div className="flex gap-2" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#d1664b]" />
            <span className="size-2.5 rounded-full bg-terminal-success" />
            <span className="size-2.5 rounded-full bg-[#7ca982]" />
          </div>

          <p className="flex items-center gap-2 text-terminal-success">
            <span className="terminal-session-dot" aria-hidden="true">
              ●
            </span>

            <span>sesión activa</span>
          </p>
        </div>

        <div
          ref={outputRef}
          role="log"
          aria-live="polite"
          aria-label="Historial de la terminal"
          className="terminal-scrollbar h-75 overflow-y-auto p-4 text-terminal-foreground"
        >
          <p className="mb-1 whitespace-pre-wrap" aria-hidden="true">
            {welcomeText}

            {welcomeText.length < WELCOME_MESSAGE.length && (
              <span className="terminal-typing-cursor">▋</span>
            )}
          </p>

          <span className="sr-only">{WELCOME_MESSAGE}</span>

          {history.map((entry) => (
            <div key={entry.id} className="mt-4">
              <p className="mb-1 whitespace-pre-wrap">
                <span className="text-accent-on-dark">
                  fri@cnoiv:~/portfolio$
                </span>{" "}
                {entry.command}
              </p>

              <p className="whitespace-pre-wrap">{entry.response}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 pb-4"
        >
          <label htmlFor="terminal-command" className="sr-only">
            Escribe un comando
          </label>

          <span className="shrink-0 text-accent-on-dark" aria-hidden="true">
            fri@cnoiv:~/portfolio$
          </span>

          <div className="relative flex min-w-0 flex-1 items-center">
            <input
              id="terminal-command"
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              autoComplete="off"
              spellCheck="false"
              className="terminal-input min-w-0 flex-1 border-0 bg-transparent p-0 text-terminal-foreground caret-accent-on-dark outline-none"
            />

            {!isInputFocused && command.length === 0 && (
              <span
                className="terminal-idle-cursor pointer-events-none absolute left-0"
                aria-hidden="true"
              />
            )}
          </div>
        </form>
      </div>

      <p className="mt-3 font-mono text-[0.72rem] leading-5 text-muted">
        Comandos: {availableCommands.join(" · ")}
      </p>
    </aside>
  );
}

export default InteractiveTerminal;
