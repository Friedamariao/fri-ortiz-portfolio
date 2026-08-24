import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import activityLogImage from "../assets/activity-03/activity_log.png";
import formatKeyImage from "../assets/activity-03/format_key.png";
import activeWindowImage from "../assets/activity-03/get_active_window.png";
import listenerImage from "../assets/activity-03/listener.png";
import onPressImage from "../assets/activity-03/on_press.png";
import onReleaseImage from "../assets/activity-03/on_release.png";
import saveLogImage from "../assets/activity-03/save_log.png";
import sourceCodeImage from "../assets/activity-03/source_code.png";
import timestampImage from "../assets/activity-03/timestamp.png";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
  { id: "introduccion", label: "Introducción" },
  { id: "implementacion", label: "Implementación técnica" },
  { id: "persistencia", label: "Persistencia del registro" },
  { id: "asociacion-temporal", label: "Asociación temporal" },
  { id: "cambio-ventana", label: "Cambio de ventana" },
  { id: "evidencias", label: "Evidencias" },
  { id: "conclusiones", label: "Conclusiones" },
  { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-03";

const resources = [
  {
    href: resourceBase + "/184346_act03.pdf",
    type: "PDF",
    title: "Informe final",
    description: "Versión entregable de la documentación de la actividad.",
    download: "184346_act03.pdf",
  },
  {
    href: resourceBase + "/spyware.py",
    type: "PYTHON",
    title: "Código fuente",
    description: "Implementación completa utilizada durante la práctica.",
    download: "spyware.py",
  },
  {
    href: resourceBase + "/activity.log",
    type: "LOG",
    title: "Registro de prueba",
    description: "Salida generada durante la comprobación controlada.",
    download: "activity.log",
  },
];

function Activity03() {
  const [activeSection, setActiveSection] = useState(pageSections[0].id);

  useEffect(() => {
    const sectionElements = pageSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-24% 0px -62% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <article>
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pt-8 pb-14 sm:px-8 md:pt-10 md:pb-20">
          <Link
            to="/activities"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            Volver a actividades
          </Link>

          <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                Parcial I / Actividad 03
              </p>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                No presiones Esc…{" "}
                <span className="font-serif font-normal italic text-accent">
                  todavía
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Registro de eventos del teclado, asociación temporal y detección
                de cambios de ventana mediante Python en un entorno controlado.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                <dd className="mt-1 text-accent">Completada</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                <dd className="mt-1">24.08.2026</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Lenguaje
                </dt>
                <dd className="mt-1">Python</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Entorno</dt>
                <dd className="mt-1">Windows</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/184346_act03.pdf"}
              download="184346_act03.pdf"
              className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Descargar informe
            </a>

            <a
              href={resourceBase + "/spyware.py"}
              download="spyware.py"
              className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Descargar código
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="border-t border-border pt-5 lg:sticky lg:top-36">
            <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
              En esta actividad
            </p>

            <nav aria-label="Contenido de la Actividad 03" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={"/activities/activity-03#" + section.id}
                      aria-current={
                        activeSection === section.id ? "location" : undefined
                      }
                      className={[
                        "relative grid min-h-10 grid-cols-[2rem_1fr] items-center border-l pl-3 text-sm transition-[color,border-color,transform] duration-200",
                        activeSection === section.id
                          ? "translate-x-1 border-accent text-accent"
                          : "border-transparent text-muted hover:text-accent",
                      ].join(" ")}
                    >
                      <span className="font-mono text-[0.65rem]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.label}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 border-t border-border pt-5">
              <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Tecnologías
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Python · pynput · pywin32 · event hooks · callbacks
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-24 lg:col-span-9">
          <ActivitySection id="introduccion" number="01" title="Introducción">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Un spyware es un tipo de software malicioso diseñado para
                recopilar información de un dispositivo y de sus usuarios sin su
                consentimiento. Puede obtener datos personales, hábitos de
                navegación, credenciales o información financiera para enviarlos
                a terceros con fines comerciales o delictivos.
              </p>

              <p>
                Una técnica que puede formar parte del spyware es el registro de
                eventos del teclado, conocido como <em>keylogging</em>. Esta
                técnica captura los eventos generados al presionar teclas y
                permite relacionarlos con datos como la fecha y la hora en que
                ocurrieron.
              </p>

              <p>
                En esta actividad se desarrolló, con fines académicos, un
                programa en Python capaz de registrar eventos del teclado,
                almacenarlos en un archivo local y asignarles una marca de
                tiempo. También se investigó cómo obtener el título de la
                ventana activa para aportar contexto al registro.
              </p>
            </div>

            <div className="mt-10 max-w-3xl border-l-2 border-accent bg-surface px-5 py-4">
              <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                Alcance ético
              </p>
              <p className="mt-2 leading-7 text-muted">
                La prueba se realizó exclusivamente en un equipo propio y en un
                entorno controlado. El uso de este tipo de herramientas sin
                consentimiento representa un riesgo para la privacidad y la
                seguridad de las personas.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="implementacion"
            number="02"
            title="Implementación técnica"
          >
            <div className="max-w-3xl space-y-5 leading-8 text-muted">
              <p>
                La implementación se realizó en Python con la clase{" "}
                <code className="font-mono text-sm text-foreground">
                  Listener
                </code>{" "}
                de la librería{" "}
                <code className="font-mono text-sm text-foreground">
                  pynput
                </code>
                . Esta clase permite detectar eventos del teclado mediante un{" "}
                <em>event hook</em> y ejecutar funciones de tipo{" "}
                <em>callback</em> como respuesta.
              </p>

              <p>
                También se utilizó{" "}
                <code className="font-mono text-sm text-foreground">
                  datetime
                </code>{" "}
                para obtener la fecha y hora de cada evento,{" "}
                <code className="font-mono text-sm text-foreground">
                  activity.log
                </code>{" "}
                para conservar los registros y{" "}
                <code className="font-mono text-sm text-foreground">
                  win32gui
                </code>{" "}
                para consultar el título de la ventana que se encuentra en
                primer plano.
              </p>
            </div>

            <div className="mt-14 space-y-16">
              <section aria-labelledby="format-key-title">
                <h3 id="format-key-title" className="text-2xl font-semibold">
                  Captura y representación de teclas
                </h3>
                <p className="mt-4 max-w-3xl leading-8 text-muted">
                  La función{" "}
                  <code className="font-mono text-sm text-foreground">
                    format_key()
                  </code>{" "}
                  utiliza{" "}
                  <code className="font-mono text-sm text-foreground">
                    key.char
                  </code>{" "}
                  para letras, números y símbolos. Cuando recibe una tecla
                  especial, captura{" "}
                  <code className="font-mono text-sm text-foreground">
                    AttributeError
                  </code>{" "}
                  y guarda su nombre entre corchetes, por ejemplo{" "}
                  <code className="font-mono text-sm text-foreground">
                    [enter]
                  </code>{" "}
                  o{" "}
                  <code className="font-mono text-sm text-foreground">
                    [esc]
                  </code>
                  .
                </p>

                <ActivityFigure
                  src={formatKeyImage}
                  alt="Fragmento de la función format_key que diferencia caracteres y teclas especiales."
                  number="01"
                  caption="Representación de caracteres y teclas especiales mediante format_key()."
                />
              </section>

              <section aria-labelledby="callbacks-title">
                <h3 id="callbacks-title" className="text-2xl font-semibold">
                  Callbacks de presión y liberación
                </h3>
                <p className="mt-4 max-w-3xl leading-8 text-muted">
                  <code className="font-mono text-sm text-foreground">
                    on_press()
                  </code>{" "}
                  registra cada pulsación y comprueba si la ventana activa ha
                  cambiado.{" "}
                  <code className="font-mono text-sm text-foreground">
                    on_release()
                  </code>{" "}
                  registra únicamente la liberación de teclas especiales y
                  detiene el listener cuando se suelta{" "}
                  <code className="font-mono text-sm text-foreground">Esc</code>
                  .
                </p>

                <ActivityFigure
                  src={onPressImage}
                  alt="Código de on_press con registro de cambios de ventana y teclas presionadas."
                  number="02"
                  caption="Callback ejecutado cada vez que se presiona una tecla."
                />

                <ActivityFigure
                  src={onReleaseImage}
                  alt="Código de on_release con registro de teclas especiales y cierre mediante Esc."
                  number="03"
                  caption="Registro de liberaciones especiales y finalización controlada."
                />
              </section>

              <section aria-labelledby="listener-title">
                <h3 id="listener-title" className="text-2xl font-semibold">
                  Inicio del listener
                </h3>
                <p className="mt-4 max-w-3xl leading-8 text-muted">
                  El listener conecta los eventos con sus callbacks. El método{" "}
                  <code className="font-mono text-sm text-foreground">
                    listener.join()
                  </code>{" "}
                  mantiene el programa en ejecución hasta que{" "}
                  <code className="font-mono text-sm text-foreground">
                    on_release()
                  </code>{" "}
                  devuelve{" "}
                  <code className="font-mono text-sm text-foreground">
                    False
                  </code>
                  .
                </p>

                <ActivityFigure
                  src={listenerImage}
                  alt="Inicialización del Listener con los callbacks on_press y on_release."
                  number="04"
                  caption="Conexión de los eventos del teclado con sus funciones callback."
                />
              </section>
            </div>
          </ActivitySection>

          <ActivitySection
            id="persistencia"
            number="03"
            title="Persistencia del registro en archivo local"
          >
            <div className="max-w-3xl space-y-5 leading-8 text-muted">
              <p>
                La función{" "}
                <code className="font-mono text-sm text-foreground">
                  save_log()
                </code>{" "}
                abre{" "}
                <code className="font-mono text-sm text-foreground">
                  activity.log
                </code>{" "}
                en modo{" "}
                <code className="font-mono text-sm text-foreground">"a"</code>.
                De esta manera, cada evento se agrega al final del archivo sin
                sobrescribir los registros anteriores. Si el archivo no existe,
                Python lo crea automáticamente.
              </p>

              <p>
                Cada línea conserva tres datos separados por barras verticales:
                el momento del evento, el tipo de evento y la tecla o ventana
                relacionada.
              </p>
            </div>

            <ActivityFigure
              src={saveLogImage}
              alt="Función save_log que agrega los eventos al archivo activity.log."
              number="05"
              caption="Escritura de eventos en modo de anexado para conservar el historial."
            />
          </ActivitySection>

          <ActivitySection
            id="asociacion-temporal"
            number="04"
            title="Asociación temporal"
          >
            <div className="max-w-3xl space-y-5 leading-8 text-muted">
              <p>
                Cada evento incluye una marca de tiempo con año, mes, día, hora,
                minutos, segundos y milisegundos.{" "}
                <code className="font-mono text-sm text-foreground">
                  datetime.now()
                </code>{" "}
                obtiene el momento actual y{" "}
                <code className="font-mono text-sm text-foreground">
                  strftime()
                </code>{" "}
                define el formato almacenado.
              </p>

              <p>
                Esta asociación permite reconstruir el orden de los eventos y
                reconocer cuánto tiempo transcurrió entre una acción y otra.
              </p>
            </div>

            <ActivityFigure
              src={timestampImage}
              alt="Expresión de Python utilizada para obtener una marca de tiempo."
              number="06"
              caption="Generación de la fecha y hora asociada con cada evento."
            />
          </ActivitySection>

          <ActivitySection
            id="cambio-ventana"
            number="05"
            title="Detección del cambio de ventana"
          >
            <div className="max-w-3xl space-y-5 leading-8 text-muted">
              <p>
                La función{" "}
                <code className="font-mono text-sm text-foreground">
                  get_active_window()
                </code>{" "}
                obtiene el identificador de la ventana en primer plano mediante{" "}
                <code className="font-mono text-sm text-foreground">
                  GetForegroundWindow()
                </code>{" "}
                y consulta su título con{" "}
                <code className="font-mono text-sm text-foreground">
                  GetWindowText()
                </code>
                .
              </p>

              <p>
                El título actual se compara con{" "}
                <code className="font-mono text-sm text-foreground">
                  last_window
                </code>
                . Cuando son diferentes, se guarda un evento{" "}
                <code className="font-mono text-sm text-foreground">
                  WINDOW_CHANGE
                </code>{" "}
                antes de registrar la tecla presionada.
              </p>
            </div>

            <ActivityFigure
              src={activeWindowImage}
              alt="Función que obtiene el título de la ventana activa mediante win32gui."
              number="07"
              caption="Consulta de la ventana que se encuentra en primer plano."
            />

            <div className="max-w-3xl border-l-2 border-border px-5 py-1">
              <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                Limitación
              </p>
              <p className="mt-2 leading-7 text-muted">
                La comparación se realiza dentro de{" "}
                <code className="font-mono text-sm text-foreground">
                  on_press()
                </code>
                . Por lo tanto, el cambio de ventana se registra cuando se
                presiona una tecla en la nueva ventana, no mediante un proceso
                independiente de monitoreo continuo.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="evidencias" number="06" title="Evidencias">
            <div className="max-w-3xl space-y-5 leading-8 text-muted">
              <p>
                Las pruebas se realizaron en un equipo propio. Se verificó el
                registro de caracteres, teclas especiales, marcas de tiempo,
                cambios de ventana y la conservación de los eventos en{" "}
                <code className="font-mono text-sm text-foreground">
                  activity.log
                </code>
                .
              </p>

              <p>
                El resultado muestra cambios entre Spotify, Visual Studio Code,
                Word, Brave y WhatsApp. Finalmente, el programa registró la
                presión y liberación de{" "}
                <code className="font-mono text-sm text-foreground">[esc]</code>{" "}
                y terminó correctamente.
              </p>
            </div>

            <ActivityFigure
              src={activityLogImage}
              alt="Archivo activity.log con marcas de tiempo, pulsaciones, liberaciones y cambios de ventana."
              number="08"
              caption="Registro generado durante la prueba funcional en un entorno controlado."
              className="max-w-md"
            />
          </ActivitySection>

          <ActivitySection id="conclusiones" number="07" title="Conclusiones">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La actividad permitió comprender cómo funcionan los{" "}
                <em>event hooks</em> y los callbacks para detectar y responder a
                los eventos generados por el teclado.
              </p>

              <p>
                La asociación temporal facilitó la identificación del momento,
                el orden y el tipo de cada evento. El uso de{" "}
                <code className="font-mono text-sm text-foreground">
                  win32gui
                </code>{" "}
                agregó contexto mediante el título de la ventana activa y
                permitió distinguir cuándo cambiaba el entorno de trabajo.
              </p>

              <p>
                Finalmente, la práctica mostró que una implementación sencilla
                puede recopilar información relevante sobre la actividad de un
                usuario. Además de comprender su funcionamiento técnico, es
                indispensable reconocer los riesgos de privacidad y limitar su
                uso a espacios donde exista autorización expresa.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="recursos" number="08" title="Recursos y anexos">
            <p className="max-w-3xl leading-8 text-muted">
              Los siguientes archivos corresponden a la entrega académica y a
              los resultados generados durante la prueba.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {resources.map((resource) => (
                <ResourceLink key={resource.href} {...resource} />
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-semibold">Código completo</h3>
              <p className="mt-4 max-w-3xl leading-8 text-muted">
                Vista general de la implementación documentada. El archivo{" "}
                <code className="font-mono text-sm text-foreground">
                  spyware.py
                </code>{" "}
                está disponible para descarga en su formato original.
              </p>

              <ActivityFigure
                src={sourceCodeImage}
                alt="Código fuente completo del programa desarrollado para la Actividad 03."
                number="09"
                caption="Implementación completa del registro de eventos del teclado."
                className="max-w-md"
              />
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Activity03;
