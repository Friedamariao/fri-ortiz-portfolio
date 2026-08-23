import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation";

function NavigationItem({ item, onNavigate }) {
  if (item.status === "pending") {
    return (
      <span
        className="flex min-h-11 cursor-not-allowed items-center gap-2 text-sm text-muted"
        aria-disabled="true"
        title="Esta sección se habilitará conforme avance el curso"
      >
        <span>{item.label}</span>

        <span className="font-mono text-[0.65rem] tracking-wider uppercase">
          Próximamente
        </span>
      </span>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "flex min-h-11 items-center border-b text-sm font-semibold transition-colors duration-200 hover:text-accent",
          isActive
            ? "border-accent text-accent"
            : "border-transparent text-foreground",
        ].join(" ")
      }
    >
      {item.label}
    </NavLink>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav aria-label="Navegación principal">
      <button
        type="button"
        className="flex min-h-11 min-w-11 items-center justify-center border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface lg:hidden"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={
          isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        }
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        {isOpen ? "Cerrar" : "Menú"}
      </button>

      <ul className="hidden items-center gap-7 lg:flex">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <NavigationItem item={item} />
          </li>
        ))}
      </ul>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full right-0 left-0 border-y border-border bg-background px-5 py-6 shadow-sm lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-3">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <NavigationItem item={item} onNavigate={closeMenu} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
