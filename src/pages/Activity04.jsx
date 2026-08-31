import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/activity-04/ev-01.png";
import evidence02 from "../assets/activity-04/ev-02.png";
import evidence03 from "../assets/activity-04/ev-03.png";
import evidence04 from "../assets/activity-04/ev-04.png";
import evidence05 from "../assets/activity-04/ev-05.png";
import evidence06 from "../assets/activity-04/ev-06.png";
import evidence07 from "../assets/activity-04/ev-07.png";
import evidence08 from "../assets/activity-04/ev-08.png";
import evidence09 from "../assets/activity-04/ev-09.png";
import evidence10 from "../assets/activity-04/ev-10.png";
import evidence11 from "../assets/activity-04/ev-11.png";
import evidence12 from "../assets/activity-04/ev-12.png";
import evidence13 from "../assets/activity-04/ev-13.png";
import evidence14 from "../assets/activity-04/ev-14.png";
import evidence15 from "../assets/activity-04/ev-15.png";
import evidence16 from "../assets/activity-04/ev-16.png";
import flowDiagram from "../assets/activity-04/flow-diagram.png";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";

const pageSections = [
  { id: "objetivo", label: "Objetivo y escenario" },
  { id: "pagina", label: "Página ficticia" },
  { id: "laboratorio", label: "Configuración" },
  { id: "ejecucion", label: "Ejecución de SET" },
  { id: "flujo", label: "Flujo de información" },
  { id: "indicadores", label: "Indicadores" },
  { id: "controles", label: "Controles" },
  { id: "conclusion", label: "Conclusión" },
  { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-04";

const indicators = [
  "Sentido de urgencia o amenaza de suspensión de la cuenta.",
  "Solicitud inesperada de credenciales o información sensible.",
  "URL o dominio que no pertenece a la organización.",
  "Enlaces sospechosos o recibidos sin haberlos solicitado.",
  "Inconsistencias en la redacción, el formato o la apariencia.",
];

const controls = [
  {
    title: "Autenticación multifactor",
    description:
      "Reduce el impacto de una contraseña capturada al exigir otro factor, aunque algunos códigos de un solo uso también pueden ser objeto de phishing.",
  },
  {
    title: "Contraseñas únicas y gestores",
    description:
      "Evitan que una credencial comprometida permita acceder a otros servicios, pero no impiden que el usuario la escriba en un sitio falso.",
  },
  {
    title: "Verificación de URL y canales oficiales",
    description:
      "Permite comprobar el dominio y confirmar solicitudes inesperadas desde el sitio oficial o por un canal independiente.",
  },
  {
    title: "Capacitación y concientización",
    description:
      "Ayuda a reconocer señales de engaño y a mantener una actitud crítica, aunque no elimina por completo el error humano.",
  },
  {
    title: "Actualizaciones de seguridad",
    description:
      "Corrigen vulnerabilidades conocidas que podrían combinarse con una campaña de phishing.",
  },
  {
    title: "Filtrado web y protección DNS",
    description:
      "Pueden bloquear dominios maliciosos antes del acceso, aunque un dominio nuevo todavía podría no estar clasificado.",
  },
];

function EvidenceGrid({ items }) {
  return (
    <div className="grid gap-x-6 md:grid-cols-2">
      {items.map((item) => (
        <ActivityFigure
          key={item.number}
          src={item.src}
          alt={item.alt}
          number={item.number}
          caption={item.caption}
          className="max-w-none"
        />
      ))}
    </div>
  );
}

function Activity04() {
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
                Parcial I / Actividad 04
              </p>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                Una página demasiado{" "}
                <span className="font-serif font-normal italic text-accent">
                  convincente
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Simulación controlada de ingeniería social con Social-Engineer
                Toolkit para analizar cómo un formulario puede transmitir y
                registrar información.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                <dd className="mt-1 text-accent">Completada</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                <dd className="mt-1">31.08.2026</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Herramienta
                </dt>
                <dd className="mt-1">SET</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Entorno</dt>
                <dd className="mt-1">Kali Linux</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/demo/index.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Ver sitio estático
            </a>

            <a
              href={resourceBase + "/184346_act04.pdf"}
              download="184346_act04.pdf"
              className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Descargar reporte
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

            <nav aria-label="Contenido de la Actividad 04" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={"/activities/activity-04#" + section.id}
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
                Kali Linux · SET · Credential Harvester · HTTP POST · HTML · CSS
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-24 lg:col-span-9">
          <ActivitySection
            id="objetivo"
            number="01"
            title="Objetivo y escenario"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El objetivo fue implementar y analizar, dentro de un laboratorio
                controlado, una simulación de ingeniería social mediante
                Social-Engineer Toolkit (SET) y una página web ficticia.
              </p>
              <p>
                El escenario representa un aviso falso de actualización de
                credenciales. El enlace conduce al portal corporativo inventado
                de Vantex Solutions, donde un mensaje de sesión expirada busca
                generar urgencia y solicitar nuevamente el usuario y la
                contraseña.
              </p>
            </div>

            <div className="mt-10 max-w-3xl border-l-2 border-accent bg-surface px-5 py-4">
              <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                Alcance ético
              </p>
              <p className="mt-2 leading-7 text-muted">
                La práctica utilizó una organización y credenciales ficticias,
                permaneció en la dirección local 127.0.0.1 y no fue publicada en
                Internet. La versión disponible aquí es únicamente una
                representación estática sin envío de información.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="pagina" number="02" title="Página web ficticia">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El portal se desarrolló con HTML y CSS e incluyó el nombre de la
                organización, campos de usuario y contraseña, un botón de
                ingreso y un mensaje que indicaba que la sesión había expirado.
              </p>
              <p>
                Durante el laboratorio, el formulario utilizó el método HTTP
                POST y los parámetros <code>username</code> y{" "}
                <code>password</code>. En la representación pública todos los
                controles están deshabilitados y no existe una acción de envío.
              </p>
            </div>

            <EvidenceGrid
              items={[
                {
                  src: evidence01,
                  alt: "Código HTML del formulario con los campos username y password.",
                  number: "01",
                  caption:
                    "Configuración original del formulario utilizado únicamente dentro del laboratorio.",
                },
                {
                  src: evidence02,
                  alt: "Portal ficticio Vantex Solutions abierto en el navegador.",
                  number: "02",
                  caption:
                    "Vista del portal corporativo ficticio antes de importarlo en SET.",
                },
              ]}
            />
          </ActivitySection>

          <ActivitySection
            id="laboratorio"
            number="03"
            title="Configuración del laboratorio"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La práctica se realizó en una máquina virtual con Kali Linux
                ejecutada mediante Oracle VirtualBox. Se creó el directorio
                <code> login-act04</code> y se configuró una carpeta compartida
                para transferir el archivo <code>index.html</code> desde el
                equipo anfitrión.
              </p>
            </div>

            <EvidenceGrid
              items={[
                {
                  src: evidence03,
                  alt: "Terminal de Kali Linux mostrando la creación del directorio login-act04.",
                  number: "03",
                  caption: "Creación y acceso al directorio de trabajo.",
                },
                {
                  src: evidence04,
                  alt: "Configuración de la carpeta compartida en Oracle VirtualBox.",
                  number: "04",
                  caption:
                    "Carpeta compartida configurada entre el anfitrión y Kali Linux.",
                },
                {
                  src: evidence05,
                  alt: "Terminal y navegador mostrando la copia y comprobación del archivo index.html.",
                  number: "05",
                  caption:
                    "Verificación de los archivos y apertura local de la página ficticia.",
                },
              ]}
            />
          </ActivitySection>

          <ActivitySection
            id="ejecucion"
            number="04"
            title="Ejecución de Credential Harvester"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Credential Harvester es un módulo de SET que recibe y registra
                los valores enviados desde formularios web. Para configurarlo se
                seleccionaron Social Engineering Attacks, Website Attack
                Vectors, Credential Harvester Attack Method y, finalmente,
                Custom Import.
              </p>
            </div>

            <EvidenceGrid
              items={[
                {
                  src: evidence06,
                  alt: "Pantalla inicial de Social-Engineer Toolkit.",
                  number: "06",
                  caption:
                    "Inicio de Social-Engineer Toolkit desde Kali Linux.",
                },
                {
                  src: evidence07,
                  alt: "Menú de SET con Social Engineering Attacks seleccionado.",
                  number: "07",
                  caption: "Selección del módulo Social Engineering Attacks.",
                },
                {
                  src: evidence08,
                  alt: "Menú de SET con Website Attack Vectors seleccionado.",
                  number: "08",
                  caption:
                    "Acceso a los vectores de ataque basados en sitios web.",
                },
                {
                  src: evidence09,
                  alt: "Menú de métodos de ataque web con Credential Harvester.",
                  number: "09",
                  caption: "Selección de Credential Harvester Attack Method.",
                },
                {
                  src: evidence10,
                  alt: "Menú de plantillas web con la opción Custom Import.",
                  number: "10",
                  caption:
                    "Selección de Custom Import para utilizar la página propia.",
                },
                {
                  src: evidence11,
                  alt: "Terminal mostrando la configuración local de Custom Import.",
                  number: "11",
                  caption:
                    "Configuración con 127.0.0.1, la ruta local y la copia de index.html.",
                },
                {
                  src: evidence12,
                  alt: "Terminal de SET indicando que el servidor está escuchando.",
                  number: "12",
                  caption:
                    "Credential Harvester iniciado localmente y a la espera de la petición.",
                },
                {
                  src: evidence13,
                  alt: "Portal ficticio cargado desde la dirección local 127.0.0.1.",
                  number: "13",
                  caption:
                    "Página ficticia servida por SET dentro del laboratorio.",
                },
                {
                  src: evidence14,
                  alt: "Terminal de SET mostrando los parámetros de prueba recibidos.",
                  number: "14",
                  caption:
                    "SET identifica los campos de usuario y contraseña enviados con datos ficticios.",
                },
                {
                  src: evidence15,
                  alt: "Terminal de SET mostrando el registro completo de la petición local.",
                  number: "15",
                  caption:
                    "Comprobación de la recepción y procesamiento de los parámetros.",
                },
                {
                  src: evidence16,
                  alt: "Terminal mostrando el archivo XML generado por SET.",
                  number: "16",
                  caption:
                    "Reporte XML conservado por SET después de finalizar la simulación.",
                },
              ]}
            />
          </ActivitySection>

          <ActivitySection
            id="flujo"
            number="05"
            title="Flujo de captura de información"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                En el laboratorio, el navegador generó una petición HTTP POST
                con los parámetros del formulario. La petición permaneció dentro
                de la máquina virtual, llegó al servidor local de SET y fue
                procesada por Credential Harvester. Al finalizar la ejecución,
                SET generó un reporte XML con los datos de prueba.
              </p>
              <p>
                Esto representa una captura de credenciales, no la vulneración
                de una contraseña. En la captura, el usuario proporciona el
                dato; en la vulneración se intenta descubrirlo mediante técnicas
                como fuerza bruta, diccionarios o tablas precalculadas.
              </p>
            </div>

            <ActivityFigure
              src={flowDiagram}
              alt="Diagrama del flujo desde el usuario y el formulario hasta SET y el reporte XML."
              number="17"
              caption="Recorrido de la información durante la simulación ejecutada en el servidor local."
              className="max-w-4xl"
            />
          </ActivitySection>

          <ActivitySection
            id="indicadores"
            number="06"
            title="Indicadores de phishing"
          >
            <ol className="divide-y divide-border border-y border-border">
              {indicators.map((indicator, index) => (
                <li
                  key={indicator}
                  className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-7 text-muted">{indicator}</span>
                </li>
              ))}
            </ol>
          </ActivitySection>

          <ActivitySection
            id="controles"
            number="07"
            title="Controles de seguridad"
          >
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {controls.map((control, index) => (
                <article key={control.title} className="bg-background p-6">
                  <p className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold">
                    {control.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {control.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl leading-7 text-muted">
              Ningún control elimina por sí solo todos los ataques de phishing.
              La protección más sólida combina medidas técnicas con hábitos de
              verificación y capacitación continua.
            </p>
          </ActivitySection>

          <ActivitySection id="conclusion" number="08" title="Conclusión">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La práctica demostró que no siempre es necesario vulnerar
                técnicamente una contraseña para obtenerla: una página
                convincente puede conseguir que el propio usuario entregue la
                información sin reconocer el engaño.
              </p>
              <p>
                También permitió comprender que una apariencia profesional no
                garantiza la legitimidad de un sitio. Es necesario revisar el
                contexto, el dominio, el origen de la solicitud y las señales de
                urgencia, además de combinar capacitación, autenticación
                multifactor y controles tecnológicos.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="recursos" number="09" title="Recursos">
            <div className="grid gap-5 sm:grid-cols-2">
              <a
                href={resourceBase + "/demo/index.html"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-36 flex-col justify-between border border-border bg-background p-5 transition-colors duration-200 hover:border-accent hover:bg-surface"
              >
                <div>
                  <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                    HTML
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">Sitio estático</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Copia visual del portal ficticio. No recibe ni transmite
                    información.
                  </p>
                </div>
                <span className="mt-5 text-sm font-semibold">Abrir demo</span>
              </a>

              <a
                href={resourceBase + "/184346_act04.pdf"}
                download="184346_act04.pdf"
                className="group flex min-h-36 flex-col justify-between border border-border bg-background p-5 transition-colors duration-200 hover:border-accent hover:bg-surface"
              >
                <div>
                  <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                    PDF
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">Informe final</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Documentación completa de la práctica, sus evidencias,
                    análisis, controles de seguridad y conclusión.
                  </p>
                </div>
                <span className="mt-5 text-sm font-semibold">Descargar</span>
              </a>
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Activity04;
