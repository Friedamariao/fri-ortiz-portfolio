import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/road-to-hall-of-fame/fpt-03/ev-01.png";
import evidence02 from "../assets/road-to-hall-of-fame/fpt-03/ev-02.png";
import evidence03 from "../assets/road-to-hall-of-fame/fpt-03/ev-03.png";
import evidence04 from "../assets/road-to-hall-of-fame/fpt-03/ev-04.png";
import evidence05 from "../assets/road-to-hall-of-fame/fpt-03/ev-05.png";
import evidence06 from "../assets/road-to-hall-of-fame/fpt-03/ev-06.png";
import evidence07 from "../assets/road-to-hall-of-fame/fpt-03/ev-07.png";
import evidence08 from "../assets/road-to-hall-of-fame/fpt-03/ev-08.png";
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
  import.meta.env.BASE_URL + "resources/road-to-hall-of-fame/fpt-03";

function FPT03() {
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
                Road to Hall of Fame · FPT 03
              </p>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                File Path Traversal:{" "}
                <span className="font-serif font-normal italic text-accent">
                  Traversal Sequences Stripped Non-Recursively
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Explotar un filtro que elimina las secuencias{" "}
                <code className="font-mono text-[0.85em]">../</code> una
                sola vez, sin volver a evaluar el resultado, para recuperar{" "}
                <code className="font-mono text-[0.85em]">/etc/passwd</code>{" "}
                con una secuencia de traversal anidada.
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
                <dd className="mt-1">Bypass con secuencias anidadas</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/184346_fpt03.pdf"}
              download="184346_fpt03.pdf"
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

            <nav aria-label="Contenido de FPT 03" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={"/road-to-hall-of-fame/fpt-03#" + section.id}
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
                Explotar una vulnerabilidad de path traversal presente en
                la funcionalidad de visualización de imágenes de producto
                de la aplicación, con el fin de recuperar el contenido del
                archivo{" "}
                <code className="font-mono text-[0.85em]">
                  /etc/passwd
                </code>{" "}
                del servidor. La aplicación implementa un filtro que
                elimina las secuencias de traversal (
                <code className="font-mono text-[0.85em]">../</code>) del
                parámetro filename, pero lo hace de forma no recursiva, es
                decir, aplica la eliminación una sola vez sin volver a
                evaluar el resultado. El objetivo específico es construir
                un payload capaz de evadir dicho filtro aprovechando esta
                debilidad en su lógica de saneamiento.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="marco-teorico" number="02" title="Marco teórico">
            <div className="max-w-3xl space-y-8 text-base leading-8 text-muted sm:text-lg">
              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-foreground">
                  Mecanismo del filtro y su bypass mediante secuencias
                  anidadas
                </h3>
                <p>
                  Nuevamente a diferencia del caso simple, esta página sí
                  intenta detectar y eliminar la secuencia{" "}
                  <code className="font-mono text-[0.85em]">../</code> del
                  valor de filename antes de resolver la ruta del archivo.
                  Sin embargo, esta defensa parte del supuesto de que la
                  eliminación de la secuencia solo necesita ejecutarse una
                  vez sobre el string recibido.
                </p>
                <p>
                  El propio PortSwigger documenta esta clase de bypass como
                  uno de los obstáculos comunes al explotar path traversal,
                  ya que cuando el filtro elimina las secuencias de
                  traversal de forma no recursiva, es posible anidar una
                  secuencia de traversal dentro de otra, de modo que, al
                  eliminarse la secuencia interna, los caracteres restantes
                  se recompongan en una nueva secuencia válida (PortSwigger,
                  s.f.).
                </p>
                <p>
                  La causa técnica suele ser una llamada de saneamiento del
                  tipo "reemplazar{" "}
                  <code className="font-mono text-[0.85em]">../</code> por
                  vacío" ejecutada una sola vez sobre el string completo, en
                  lugar de repetirse en bucle hasta que ya no queden
                  coincidencias. Al recibir el payload{" "}
                  <code className="font-mono text-[0.85em]">....//</code>,
                  la función localiza la subcadena{" "}
                  <code className="font-mono text-[0.85em]">../</code>{" "}
                  contenida en su interior (los caracteres 2 a 4) y la
                  elimina, pero no vuelve a examinar el resultado de esa
                  sustitución. Lo que queda tras la eliminación, un punto
                  inicial seguido de la barra final (
                  <code className="font-mono text-[0.85em]">".."</code> +{" "}
                  <code className="font-mono text-[0.85em]">"/"</code>), se
                  recompone en una secuencia{" "}
                  <code className="font-mono text-[0.85em]">../</code>{" "}
                  perfectamente válida, que el filtro nunca llega a detectar
                  porque su verificación ya terminó. Repitiendo este bloque
                  en cada nivel de la ruta (
                  <code className="font-mono text-[0.85em]">
                    ....//....//....//
                  </code>
                  ), el servidor termina procesando{" "}
                  <code className="font-mono text-[0.85em]">../../../</code>{" "}
                  antepuesto a{" "}
                  <code className="font-mono text-[0.85em]">
                    etc/passwd
                  </code>
                  , retrocediendo desde el directorio de imágenes hasta la
                  raíz del sistema de archivos.
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
                  CWE-22 (MITRE Corporation, 2024). La diferencia frente al
                  caso del bypass por ruta absoluta no es la categoría ni el
                  archivo objetivo, sino el tipo de defecto en la defensa:
                  aquí el filtro sí cubre el vector correcto de secuencias
                  relativas, pero lo hace con un algoritmo de una sola
                  pasada que no contempla que su propia eliminación puede
                  generar una nueva secuencia explotable.
                </p>
                <p>
                  El impacto sobre la tríada CIA es el mismo que en los
                  casos previos, pues compromete la Confidencialidad al
                  exponer archivos internos del servidor que no deberían
                  ser accesibles desde la capa de presentación de la
                  aplicación. Lo que cambia es el fondo del problema: un
                  control de seguridad que depende de una única operación
                  de limpieza de texto es frágil por diseño, porque su
                  corrección depende del supuesto de que basta con una
                  única saneación, que no siempre es válido frente a un
                  input adversarial construido específicamente para
                  violarlo.
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="text-xl font-semibold text-foreground">
                  Riesgos en un entorno real
                </h3>
                <p>
                  Este patrón, sanear un input eliminando un patrón
                  peligroso con una sola operación de reemplazo, es una
                  práctica frecuente en aplicaciones reales, sobre todo
                  cuando el saneamiento se agrega como parche rápido tras
                  detectar un path traversal en una auditoría, sin
                  rediseñar la validación desde cero. El riesgo práctico es
                  que una prueba superficial (probar{" "}
                  <code className="font-mono text-[0.85em]">
                    ../../../etc/passwd
                  </code>{" "}
                  directamente) parece confirmar que la vulnerabilidad
                  quedó corregida, ya que el filtro efectivamente la
                  bloquea, mientras que la misma exposición del archivo{" "}
                  <code className="font-mono text-[0.85em]">
                    /etc/passwd
                  </code>
                  ,{" "}
                  <code className="font-mono text-[0.85em]">
                    /etc/shadow
                  </code>{" "}
                  o de archivos de configuración internos sigue siendo
                  alcanzable con un payload ligeramente más elaborado que
                  cualquier atacante con conocimiento de esta clase de
                  bypass puede construir.
                </p>
              </div>
            </div>
          </ActivitySection>

          <ActivitySection id="procedimiento" number="03" title="Procedimiento">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se accede a la instancia del laboratorio "File path
                traversal, traversal sequences stripped non-recursively" de
                PortSwigger Web Security Academy. El laboratorio inicia en
                estado "Not solved" y presenta una tienda en línea con
                productos que incluyen imágenes cargadas dinámicamente.
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
                Con Burp Suite en modo de interceptación de tráfico, se
                navega por la tienda y se revisa el historial de proxy. Se
                identifica que cada imagen de producto se carga mediante
                una solicitud GET al endpoint{" "}
                <code className="font-mono text-[0.85em]">/image</code>,
                pasando el nombre del archivo en el parámetro filename (por
                ejemplo,{" "}
                <code className="font-mono text-[0.85em]">
                  /image?filename=53.jpg
                </code>
                ).
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
                Se selecciona una de las solicitudes de imagen en el
                historial y, mediante el menú contextual, se envía al
                módulo Repeater para poder modificar y reenviar la
                solicitud de forma controlada.
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
                En Repeater se visualiza la solicitud original sin
                modificar:{" "}
                <code className="font-mono text-[0.85em]">
                  GET /image?filename=53.jpg
                </code>
                , junto con las cabeceras enviadas por el navegador,
                incluyendo la cookie de sesión del laboratorio.
              </p>
            </div>

            <ActivityFigure
              src={evidence04}
              alt="Módulo Repeater de Burp Suite con la petición original sin modificar."
              number="04"
              caption="Petición original en Repeater, sin modificar el parámetro filename."
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se modifica el parámetro filename con la secuencia de
                traversal estándar{" "}
                <code className="font-mono text-[0.85em]">
                  ../../../etc/passwd
                </code>{" "}
                y se envía la solicitud. El servidor responde con un código{" "}
                <code className="font-mono text-[0.85em]">
                  400 Bad Request
                </code>{" "}
                y el mensaje{" "}
                <code className="font-mono text-[0.85em]">
                  "No such file"
                </code>
                , lo que confirma que la aplicación cuenta con un filtro
                que bloquea o elimina las secuencias de traversal directas.
              </p>
            </div>

            <ActivityFigure
              src={evidence05}
              alt='Respuesta 400 Bad Request de Burp Suite con el mensaje "No such file" al enviar una secuencia de traversal estándar.'
              number="05"
              caption='Secuencia de traversal estándar bloqueada: 400 Bad Request, "No such file".'
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Dado que el filtro elimina las secuencias{" "}
                <code className="font-mono text-[0.85em]">../</code> de
                forma no recursiva, se construye un payload con secuencias
                anidadas:{" "}
                <code className="font-mono text-[0.85em]">
                  ....//....//....//etc/passwd
                </code>
                . Al eliminarse el{" "}
                <code className="font-mono text-[0.85em]">../</code>{" "}
                interno de cada bloque{" "}
                <code className="font-mono text-[0.85em]">....</code>, el
                resultado se recompone en una secuencia{" "}
                <code className="font-mono text-[0.85em]">../</code>{" "}
                válida, evadiendo así el saneamiento.
              </p>
            </div>

            <ActivityFigure
              src={evidence06}
              alt="Módulo Repeater de Burp Suite con el payload de secuencias anidadas construido en el parámetro filename."
              number="06"
              caption="Payload de secuencias anidadas construido en el parámetro filename."
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al enviar la solicitud con el payload de bypass, el
                servidor responde con un código{" "}
                <code className="font-mono text-[0.85em]">200 OK</code> y
                devuelve en el cuerpo de la respuesta el contenido completo
                del archivo{" "}
                <code className="font-mono text-[0.85em]">
                  /etc/passwd
                </code>{" "}
                del sistema, incluyendo las entradas de los usuarios del
                sistema operativo (root, daemon, bin, sys, entre otros).
              </p>
            </div>

            <ActivityFigure
              src={evidence07}
              alt="Respuesta HTTP 200 OK de Burp Suite mostrando el contenido del archivo /etc/passwd del sistema."
              number="07"
              caption="Respuesta 200 OK con el contenido de /etc/passwd, evadiendo el filtro con la secuencia anidada."
              className="max-w-4xl"
            />

            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al regresar a la aplicación, el laboratorio muestra el
                estado "Solved" junto con el mensaje "Congratulations, you
                solved the lab!", confirmando que la explotación fue
                exitosa.
              </p>
            </div>

            <ActivityFigure
              src={evidence08}
              alt='Instancia del laboratorio de PortSwigger con la etiqueta del reto actualizada a "Solved".'
              number="08"
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
                El payload utilizado fue{" "}
                <code className="font-mono text-[0.85em]">
                  ....//....//....//etc/passwd
                </code>
                , colocado como valor completo del parámetro filename. A
                diferencia del bypass por ruta absoluta, aquí sí están
                presentes secuencias de traversal, solo que no aparecen
                como el patrón literal{" "}
                <code className="font-mono text-[0.85em]">"../"</code> que
                el filtro busca, sino envueltas dentro de un bloque más
                largo (
                <code className="font-mono text-[0.85em]">"....//"</code>)
                que las oculta de una revisión hecha en una sola pasada.
              </p>
              <p>
                Su efectividad depende de que el saneamiento se implemente
                como una operación de búsqueda y reemplazo ejecutada una
                única vez sobre el string recibido, en lugar de repetirse
                hasta que ya no queden coincidencias. Es un comportamiento
                común en implementaciones que asumen que basta con
                "limpiar" el input una sola vez: al quitar la subcadena{" "}
                <code className="font-mono text-[0.85em]">../</code> del
                interior de cada bloque{" "}
                <code className="font-mono text-[0.85em]">....</code>, los
                caracteres que quedan a los lados se juntan y forman de
                nuevo una secuencia{" "}
                <code className="font-mono text-[0.85em]">../</code>{" "}
                completa, la cual ya no vuelve a pasar por el filtro.
              </p>
              <p>
                El filtro contra{" "}
                <code className="font-mono text-[0.85em]">"../"</code> sí
                llega a activarse con este payload, a diferencia del caso
                de ruta absoluta, y de hecho elimina exactamente lo que fue
                diseñado para eliminar. El problema no está en que ignore
                el patrón, sino en que su lógica de una sola pasada no
                contempla que el propio acto de eliminar una coincidencia
                puede generar una coincidencia nueva, dejando desprotegido
                el vector de secuencias anidadas.
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
                Las mismas medidas de fondo aplicables al caso simple
                siguen siendo válidas aquí, con un énfasis adicional en el
                motivo por el cual este filtro específico resultó
                insuficiente.
              </p>
              <ul className="list-disc space-y-4 pl-6">
                <li>
                  <strong className="text-foreground">
                    Evitar el paso directo de entradas a APIs del sistema de
                    archivos:
                  </strong>{" "}
                  en lugar de dejar que el cliente mande cualquier ruta o
                  nombre de archivo, usar un identificador aleatorio (UUID)
                  que el servidor traduce internamente contra una base de
                  datos para encontrar el archivo real.
                </li>
                <li>
                  <strong className="text-foreground">
                    Validación estricta por lista blanca, no por bloqueo de
                    patrones:
                  </strong>{" "}
                  en lugar de intentar limpiar el input quitando secuencias
                  específicas como{" "}
                  <code className="font-mono text-[0.85em]">"../"</code> (un
                  enfoque de blacklist que este laboratorio demuestra que es
                  frágil incluso cuando sí contempla el vector correcto),
                  aceptar únicamente caracteres alfanuméricos y una
                  extensión de archivo predefinida, rechazando cualquier
                  valor que contenga{" "}
                  <code className="font-mono text-[0.85em]">"/"</code>,{" "}
                  <code className="font-mono text-[0.85em]">"\\"</code>,
                  puntos repetidos, o que no cumpla ese formato exacto.
                </li>
                <li>
                  <strong className="text-foreground">
                    Saneamiento en bucle hasta punto fijo, si el reemplazo
                    de patrones es inevitable:
                  </strong>{" "}
                  cuando por alguna razón se deba seguir eliminando
                  secuencias como{" "}
                  <code className="font-mono text-[0.85em]">"../"</code> del
                  input, la eliminación debe repetirse en un ciclo hasta que
                  una nueva pasada ya no produzca ningún cambio en el
                  string, en lugar de ejecutarse una sola vez; esto cierra
                  específicamente la clase de bypass basada en secuencias
                  anidadas explotada en este laboratorio.
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
                  depender de que el saneamiento previo del string haya
                  sido correcto.
                </li>
                <li>
                  <strong className="text-foreground">
                    Principio de menor privilegio:
                  </strong>{" "}
                  ejecutar el proceso del servidor con permisos mínimos, de
                  forma que, aunque una secuencia de traversal lograra
                  evadir la validación de la aplicación, el sistema
                  operativo continúe negando el acceso a directorios
                  sensibles como{" "}
                  <code className="font-mono text-[0.85em]">/etc</code> o{" "}
                  <code className="font-mono text-[0.85em]">/root</code>.
                </li>
                <li>
                  <strong className="text-foreground">
                    Auditoría y pruebas específicas de bypass:
                  </strong>{" "}
                  al probar defensas anti-traversal, incluir explícitamente
                  casos de secuencias anidadas, codificaciones alternas y
                  rutas absolutas dentro de las pruebas de penetración, en
                  lugar de validar la corrección del filtro únicamente
                  contra el vector de ataque original que motivó su
                  implementación.
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
                PortSwigger. (s. f.).{" "}
                <em>
                  Lab: File path traversal, traversal sequences stripped
                  non-recursively.
                </em>{" "}
                Web Security Academy.{" "}
                <a
                  href="https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively
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

export default FPT03;