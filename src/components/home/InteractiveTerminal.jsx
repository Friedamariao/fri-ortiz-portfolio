import { useEffect, useRef, useState } from "react";

const commandResponses = {
  help: "Comandos disponibles: help, whoami, course, portfolio, sections, tech, contact, clear",

  whoami:
    "Frieda María Ortiz López (Fri) — Ing. en Tecnologías de la Información, UPSLP",

  course: "CNO IV — Seguridad Informática · Agosto–diciembre 2026",

  portfolio:
    "Portafolio académico que documenta progresivamente el aprendizaje del curso.",

  sections:
    "Inicio [activo] · Notas [próximamente] · Herramientas [próximamente] · Proyectos [próximamente] · Certificados [próximamente]",

  tech: "React 19 · Vite · Tailwind CSS v4 · GitHub Pages · HTTPS",

  contact: "Usa el formulario de contacto disponible en esta misma página.",
};

const availableCommands = Object.keys(commandResponses).concat("clear");

function InteractiveTerminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const outputRef = useRef(null);
  const nextId = useRef(1);

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
    <aside aria-label="Terminal interactiva del portafolio">
      <div className="overflow-hidden rounded-xl border border-terminal-border bg-terminal-background font-mono text-[0.85rem] shadow-[0_20px_40px_-24px_rgba(42,33,27,0.35)]">
        <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="flex gap-2" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#d1664b]" />
              <span className="size-2.5 rounded-full bg-terminal-success" />
              <span className="size-2.5 rounded-full bg-[#7ca982]" />
            </div>
          </div>

          <p className="flex items-center gap-2 text-terminal-success">
            <span aria-hidden="true">●</span>
            <span>sesión activa</span>
          </p>
        </div>

        <div
          ref={outputRef}
          role="log"
          aria-live="polite"
          aria-label="Historial de la terminal"
          className="terminal-scrollbar h-65 overflow-y-auto p-4 text-terminal-foreground"
        >
          <p className="mb-1 whitespace-pre-wrap">
            Bienvenida. Escribe <strong>help</strong> para empezar.
          </p>

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

          <input
            id="terminal-command"
            type="text"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            spellCheck="false"
            className="terminal-input min-w-0 flex-1 border-0 bg-transparent p-0 text-terminal-foreground caret-accent-on-dark outline-none"
          />
        </form>
      </div>

      <p className="mt-3 font-mono text-[0.72rem] leading-5 text-muted">
        Comandos: {availableCommands.join(" · ")}
      </p>
    </aside>
  );
}

export default InteractiveTerminal;
