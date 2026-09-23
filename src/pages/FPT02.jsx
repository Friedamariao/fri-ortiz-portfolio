import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/road-to-hall-of-fame/fpt-02/ev-01.png";
import evidence02 from "../assets/road-to-hall-of-fame/fpt-02/ev-02.png";
import evidence03 from "../assets/road-to-hall-of-fame/fpt-02/ev-03.png";
import evidence04 from "../assets/road-to-hall-of-fame/fpt-02/ev-04.png";
import evidence05 from "../assets/road-to-hall-of-fame/fpt-02/ev-05.png";
import evidence06 from "../assets/road-to-hall-of-fame/fpt-02/ev-06.png";
import evidence07 from "../assets/road-to-hall-of-fame/fpt-02/ev-07.png";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";

const pageSections = [
  { id: "objetivo", label: "Objetivo del laboratorio" },
  { id: "marco-teorico", label: "Marco teórico" },
  { id: "procedimiento", label: "Procedimiento" },
  { id: "payload", label: "Explicación del payload" },
  { id: "mitigacion", label: "Mitigación recomendada" },
  { id: "referencias", label: "Referencias" },
];

const resourceBase =
  import.meta.env.BASE_URL + "resources/road-to-hall-of-fame/fpt-02";

function FPT02() {
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
            to="/road-to-hall-of-fame"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            Volver a Road to Hall of Fame
          </Link>

          <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                Road to Hall of Fame · FPT 02
              </p>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                File Path Traversal:{" "}
                <span className="font-serif font-normal italic text-accent">
                  Traversal Sequences Blocked with Absolute Path Bypass
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Recuperar el contenido de{" "}
                <code className="font-mono text-[0.85em]">/etc/passwd</code>{" "}
                en una aplicación que sí filtra las secuencias{" "}
                <code className="font-mono text-[0.85em]">../</code>,
                demostrando que ese filtro puede eludirse proporcionando
                directamente una ruta absoluta en el parámetro filename.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                <dd className="mt-1 text-accent">Practitioner</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                <dd className="mt-1">22.09.2026</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Herramienta
                </dt>
                <dd className="mt-1">Burp Suite</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Explotación
                </dt>
                <dd className="mt-1">Bypass por ruta absoluta</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/184346_fpt02.pdf"}
              download="184346_fpt02.pdf"
              className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Descargar informe
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="border-t border-border pt-5 lg:sticky lg:top-36">
            <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
              En este laboratorio
            </p>

            <nav aria-label="Contenido de FPT 02" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={"/road-to-hall-of-fame/fpt-02#" + section.id}
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
                Burp Suite Community Edition · PortSwigger Web Security
                Academy · HTTP/2
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-24 lg:col-span-9">
          <ActivitySection
            id="objetivo"
            number="01"
            title="Objetivo del laboratorio"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Recuperar el contenido del archivo{" "}
                <code className="font-mono text-[0.85em]">/etc/passwd</code>{" "}
                en una aplicación que sí implementa un filtro contra
                secuencias de traversal (
                <code className="font-mono text-[0.85em]">../</code>),
                demostrando que dicho filtro puede eludirse proporcionando
                directamente una ruta absoluta en el parámetro filename, sin
                necesidad de usar secuencias de retroceso de directorio. El
                objetivo académico es identificar, mediante interceptación
                de tráfico con Burp Suite, un punto donde la entrada del
                usuario se concatena sin validar a una ruta del sistema de
                archivos, y demostrar cómo esa falta de saneamiento permite
                escapar del directorio autorizado.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="marco-teorico" number="02" title="Marco teórico">
            <div className="max-w-3xl space-y-8 text-base leading-8 text-muted sm:text-lg">
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-foreground">
                  Mecanismo del filtro y su bypass mediante ruta absoluta
                </h3>
                <p>
                  A diferencia del simple case, esta página sí intenta
                  defenderse, ya que detecta y bloquea la secuencia{" "}
                  <code className="font-mono text-[0.85em]">../</code> antes
                  de resolver la ruta del archivo. Sin embargo, esta defensa
                  parte de un supuesto: que el valor recibido siempre será
                  una ruta relativa a la carpeta donde se almacenan las
                  imágenes.
                </p>
                <p>
                  El propio PortSwigger documenta esta clase de bypass como
                  uno de los obstáculos comunes al explotar path traversal:
                  cuando el filtro bloquea únicamente secuencias de
                  retroceso, suele ser posible usar una ruta absoluta desde
                  la raíz del sistema de archivos, como{" "}
                  <code className="font-mono text-[0.85em]">
                    filename=/etc/passwd
                  </code>
                  , para referenciar el archivo directamente, sin recurrir a
                  ninguna secuencia de traversal (PortSwigger, s.f.).
                </p>
                <p>
                  La causa técnica es que muchas funciones de manejo de
                  rutas en distintos lenguajes descartan por completo el
                  directorio base cuando la entrada recibida ya es una ruta
                  absoluta, es decir, cuando comienza con{" "}
                  <code className="font-mono text-[0.85em]">"/"</code>. En
                  ese caso, la función no concatena ambos valores, sino que
                  regresa únicamente la ruta absoluta que le fue dada. El
                  filtro anti-traversal, diseñado para detectar patrones
                  como{" "}
                  <code className="font-mono text-[0.85em]">"../"</code>, no
                  se activa, porque el payload{" "}
                  <code className="font-mono text-[0.85em]">
                    /etc/passwd
                  </code>{" "}
                  no contiene ninguna secuencia de ese tipo: es solo una
                  ruta completa y válida que la función de resolución de
                  rutas interpreta de forma literal, ignorando la carpeta de
                  imágenes que debía usar.
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-foreground">
                  Clasificación según OWASP Top 10 y triada CIA
                </h3>
                <p>
                  Al igual que en el caso simple, esta vulnerabilidad
                  corresponde a la categoría{" "}
                  <strong className="text-foreground">
                    A01:2025 – Broken Access Control
                  </strong>{" "}
                  del OWASP Top 10 de 2025, la categoría de mayor incidencia
                  registrada, presente en el 100% de las aplicaciones
                  evaluadas (OWASP Foundation, 2025), y sigue mapeada a
                  CWE-22 (MITRE Corporation, 2024). La diferencia relevante
                  frente al caso simple no es la categoría, sino la robustez
                  de la defensa: aquí el desarrollador sí intentó mitigar la
                  falla, pero implementó una validación incompleta que cubre
                  un solo vector de ataque (retroceso de directorio) y pasa
                  por alto otro (ruta absoluta).
                </p>
                <p>
                  El impacto sobre la tríada CIA es idéntico al del caso
                  simple: comprometer la Confidencialidad al exponer
                  archivos internos del servidor. Lo que cambia es el
                  fondo, pues un control de seguridad basado en bloquear
                  patrones específicos (blacklist) es inherentemente
                  frágil, porque solo cubre los vectores que el
                  desarrollador anticipó.
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-foreground">
                  Riesgos en un entorno real
                </h3>
                <p>
                  Este patrón de filtrado incompleto es común en
                  aplicaciones reales que intentan parchear un path
                  traversal detectado en una auditoría previa, bloqueando
                  únicamente la cadena{" "}
                  <code className="font-mono text-[0.85em]">"../"</code> sin
                  revisar rutas absolutas ni otras variantes de
                  codificación. El riesgo práctico es que el equipo de
                  desarrollo puede dar por cerrada la vulnerabilidad tras
                  una prueba superficial, dejando expuesto el mismo archivo{" "}
                  <code className="font-mono text-[0.85em]">
                    /etc/passwd
                  </code>
                  ,{" "}
                  <code className="font-mono text-[0.85em]">
                    /etc/shadow
                  </code>{" "}
                  o archivos de configuración internos ante cualquier
                  atacante que pruebe una ruta absoluta directa.
                </p>
              </div>
            </div>
          </ActivitySection>

          <ActivitySection id="procedimiento" number="03" title="Procedimiento">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se accedió a la instancia del laboratorio provista por
                PortSwigger utilizando el navegador Chromium integrado de
                Burp Suite, verificando el estado inicial "Not solved".
              </p>
            </div>

            <ActivityFigure
              src={evidence01}
              alt='Instancia del laboratorio de PortSwigger con la etiqueta del reto en estado "Not solved".'
              number="01"
              caption='Estado inicial del laboratorio: "Not solved".'
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al navegar el catálogo de productos, se revisó la pestaña
                Proxy &gt; HTTP history de Burp Suite, donde se
                identificaron múltiples peticiones GET dirigidas al
                endpoint{" "}
                <code className="font-mono text-[0.85em]">/image</code>,
                cada una con un parámetro filename distinto (
                <code className="font-mono text-[0.85em]">
                  filename=55.jpg
                </code>
                ,{" "}
                <code className="font-mono text-[0.85em]">
                  filename=72.jpg
                </code>
                ,{" "}
                <code className="font-mono text-[0.85em]">
                  filename=36.jpg
                </code>
                , etc.).
              </p>
            </div>

            <ActivityFigure
              src={evidence02}
              alt="Historial de peticiones HTTP mostrando varias solicitudes GET al endpoint /image con distintos valores de filename."
              number="02"
              caption="Historial de peticiones (Proxy > HTTP history) con el patrón /image?filename=."
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se seleccionó una de estas peticiones y se envió al módulo
                Repeater mediante el menú contextual (
                <em>Send to Repeater</em>).
              </p>
            </div>

            <ActivityFigure
              src={evidence03}
              alt="Menú contextual de Burp Suite con la opción Send to Repeater seleccionada sobre una petición a /image."
              number="03"
              caption='Envío de la petición a Repeater desde el menú contextual ("Send to Repeater").'
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                A diferencia del laboratorio anterior, en este caso el
                objetivo no era construir una secuencia de retroceso de
                directorio, sino sustituir por completo el valor del
                parámetro filename por la ruta absoluta del archivo
                objetivo, dado que la aplicación bloquea específicamente los
                patrones de traversal relativo.
              </p>
            </div>

            <ActivityFigure
              src={evidence04}
              alt="Módulo Repeater de Burp Suite con la petición original antes de modificar el parámetro filename."
              number="04"
              caption="Petición original en Repeater, antes de modificar el parámetro filename."
              className="max-w-4xl"
            />

            <ActivityFigure
              src={evidence05}
              alt="Módulo Repeater de Burp Suite con el parámetro filename reemplazado por la ruta absoluta /etc/passwd."
              number="05"
              caption="Parámetro filename reemplazado por la ruta absoluta /etc/passwd."
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se reenvió la petición modificada. El servidor respondió{" "}
                <code className="font-mono text-[0.85em]">HTTP/2 200 OK</code>
                , devolviendo en el cuerpo el contenido real de{" "}
                <code className="font-mono text-[0.85em]">/etc/passwd</code>,
                lo que confirmó que la ruta absoluta evadió el filtro
                anti-traversal implementado por la aplicación.
              </p>
            </div>

            <ActivityFigure
              src={evidence06}
              alt="Respuesta HTTP 200 OK de Burp Suite mostrando el contenido del archivo /etc/passwd del sistema."
              number="06"
              caption="Respuesta 200 OK con el contenido de /etc/passwd, evadiendo el filtro con una ruta absoluta."
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se regresó a la pestaña de la tienda y se refrescó la
                página. La plataforma de PortSwigger reconoció la
                explotación exitosa y actualizó el estado del laboratorio de
                "Not solved" a "Solved".
              </p>
            </div>

            <ActivityFigure
              src={evidence07}
              alt='Instancia del laboratorio de PortSwigger con la etiqueta del reto actualizada a "Solved".'
              number="07"
              caption='Estado final del laboratorio: "Solved".'
              className="max-w-4xl"
            />
          </ActivitySection>

          <ActivitySection
            id="payload"
            number="04"
            title="Explicación del payload"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El vector de ataque utilizado fue simplemente{" "}
                <code className="font-mono text-[0.85em]">
                  /etc/passwd
                </code>
                , colocado como valor completo del parámetro filename, en
                sustitución del nombre de archivo original. A diferencia del
                caso simple, este payload no contiene ninguna secuencia{" "}
                <code className="font-mono text-[0.85em]">"../"</code>: es
                directamente la ruta absoluta del archivo objetivo dentro
                del sistema de archivos del servidor.
              </p>
              <p>
                Su efectividad depende de cómo el backend combina la
                carpeta base de imágenes con el valor recibido. Cuando esa
                combinación se realiza mediante una función de manejo de
                rutas del lenguaje de programación, en lugar de una simple
                concatenación de texto, es un comportamiento estándar en
                muchas de estas funciones que, si el segundo valor ya es una
                ruta absoluta, el resultado final sea exclusivamente esa
                ruta absoluta, descartando la carpeta base por completo.
              </p>
              <p>
                El filtro que la aplicación implementó contra{" "}
                <code className="font-mono text-[0.85em]">"../"</code> nunca
                llega a intervenir, porque el payload no contiene ese
                patrón y el problema no está en el filtro como tal, más
                bien en que fue diseñado para bloquear solo un vector de
                ataque, dejando desprotegida la posibilidad de una ruta
                absoluta.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="mitigacion"
            number="05"
            title="Mitigación recomendada"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Las mismas medidas de fondo aplicables al caso simple siguen
                siendo válidas aquí, con un énfasis adicional en el motivo
                por el cual este filtro específico resultó insuficiente.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li>
                  <strong className="text-foreground">
                    Evitar el paso directo de entradas a APIs del sistema de
                    archivos:
                  </strong>{" "}
                  en vez de dejar que el cliente mande cualquier ruta o
                  nombre de archivo, usar un identificador aleatorio (UUID)
                  que el servidor traduce internamente contra una base de
                  datos para encontrar el archivo real.
                </li>
                <li>
                  <strong className="text-foreground">
                    Validación estricta por lista blanca, no por bloqueo de
                    patrones:
                  </strong>{" "}
                  en lugar de intentar detectar y bloquear secuencias
                  específicas como{" "}
                  <code className="font-mono text-[0.85em]">"../"</code> (un
                  enfoque de blacklist que este laboratorio demuestra que es
                  insuficiente), aceptar únicamente caracteres alfanuméricos
                  y una extensión de archivo predefinida, rechazando
                  cualquier valor que contenga{" "}
                  <code className="font-mono text-[0.85em]">"/"</code>,{" "}
                  <code className="font-mono text-[0.85em]">"\\"</code> o que
                  no cumpla ese formato exacto, incluyendo las rutas
                  absolutas.
                </li>
                <li>
                  <strong className="text-foreground">
                    Canonicalización y verificación de ruta base:
                  </strong>{" "}
                  resolver la ruta absoluta canónica resultante mediante
                  funciones nativas del lenguaje de desarrollo, como{" "}
                  <code className="font-mono text-[0.85em]">
                    getCanonicalPath()
                  </code>{" "}
                  en Java o{" "}
                  <code className="font-mono text-[0.85em]">
                    os.path.realpath()
                  </code>{" "}
                  /{" "}
                  <code className="font-mono text-[0.85em]">
                    Path.resolve()
                  </code>{" "}
                  en Python, y verificar que dicho resultado comience
                  estrictamente dentro del directorio base autorizado, sin
                  importar si la entrada original parecía relativa o
                  absoluta.
                </li>
                <li>
                  <strong className="text-foreground">
                    Principio de menor privilegio:
                  </strong>{" "}
                  ejecutar el proceso del servidor con permisos mínimos, de
                  forma que, aunque una ruta absoluta lograra evadir la
                  validación de la aplicación, el sistema operativo
                  continúe negando el acceso a directorios sensibles como{" "}
                  <code className="font-mono text-[0.85em]">/etc</code> o{" "}
                  <code className="font-mono text-[0.85em]">/root</code>.
                </li>
                <li>
                  <strong className="text-foreground">
                    Auditoría y pruebas específicas de bypass:
                  </strong>{" "}
                  al probar defensas anti-traversal, incluir explícitamente
                  casos de ruta absoluta, secuencias anidadas y
                  codificaciones alternas dentro de las pruebas de
                  penetración, en lugar de validar la corrección del filtro
                  únicamente contra el vector de ataque original.
                </li>
              </ul>
            </div>
          </ActivitySection>

          <ActivitySection id="referencias" number="06" title="Referencias">
            <ol className="max-w-3xl space-y-6 divide-y divide-border border-y border-border text-sm leading-7 text-muted">
              <li className="pt-6 first:pt-0">
                MITRE Corporation. (2024).{" "}
                <em>
                  CWE-22: Improper limitation of a pathname to a restricted
                  directory ('Path Traversal').
                </em>{" "}
                Common Weakness Enumeration.{" "}
                <a
                  href="https://cwe.mitre.org/data/definitions/22.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  cwe.mitre.org/data/definitions/22.html
                </a>
              </li>
              <li className="pt-6">
                OWASP Foundation. (2025).{" "}
                <em>A01:2025 – Broken Access Control.</em> OWASP Top 10:2025.{" "}
                <a
                  href="https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  owasp.org/Top10/2025/A01_2025-Broken_Access_Control
                </a>
              </li>
              <li className="pt-6">
                PortSwigger. (s.f.).{" "}
                <em>What is path traversal, and how to prevent it?</em> Web
                Security Academy.{" "}
                <a
                  href="https://portswigger.net/web-security/file-path-traversal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  portswigger.net/web-security/file-path-traversal
                </a>
              </li>
            </ol>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default FPT02;