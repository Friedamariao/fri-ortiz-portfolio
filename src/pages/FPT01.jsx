import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/road-to-hall-of-fame/fpt-01/ev-01.png";
import evidence02 from "../assets/road-to-hall-of-fame/fpt-01/ev-02.png";
import evidence03 from "../assets/road-to-hall-of-fame/fpt-01/ev-03.png";
import evidence04 from "../assets/road-to-hall-of-fame/fpt-01/ev-04.png";
import evidence05 from "../assets/road-to-hall-of-fame/fpt-01/ev-05.png";
import evidence06 from "../assets/road-to-hall-of-fame/fpt-01/ev-06.png";
import evidence07 from "../assets/road-to-hall-of-fame/fpt-01/ev-07.png";
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
    import.meta.env.BASE_URL + "resources/road-to-hall-of-fame/fpt-01";

function FPT01() {
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
                                Road to Hall of Fame · FPT 01
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                File Path Traversal:{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    Simple Case
                                </span>
                            </h1>

                            <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Exponer el contenido del archivo del sistema operativo{" "}
                                <code className="font-mono text-[0.85em]">/etc/passwd</code>,
                                alojado fuera del directorio de recursos estáticos del
                                servidor, manipulando el parámetro <em>filename</em> de la
                                funcionalidad de carga de imágenes de una tienda en línea
                                vulnerable.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                                <dd className="mt-1 text-accent">Apprentice</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                                <dd className="mt-1">13.09.2026</dd>
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
                                <dd className="mt-1">Lectura arbitraria de archivos</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_fpt01.pdf"}
                            download="184346_fpt01.pdf"
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

                        <nav aria-label="Contenido de FPT 01" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/road-to-hall-of-fame/fpt-01#" + section.id}
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
                                Exponer el contenido del archivo del sistema operativo{" "}
                                <code className="font-mono text-[0.85em]">/etc/passwd</code>,
                                alojado fuera del directorio de recursos estáticos del
                                servidor, manipulando el parámetro <em>filename</em> de la
                                funcionalidad de carga de imágenes de una tienda en línea
                                vulnerable. El objetivo académico es identificar, mediante
                                interceptación de tráfico con Burp Suite, un punto donde la
                                entrada del usuario se concatena sin validar a una ruta del
                                sistema de archivos, y demostrar cómo esa falta de saneamiento
                                permite escapar del directorio autorizado.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="marco-teorico" number="02" title="Marco teórico">
                        <div className="max-w-3xl space-y-8 text-base leading-8 text-muted sm:text-lg">
                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Definición y origen de la vulnerabilidad
                                </h3>
                                <p>
                                    El path traversal o directory traversal es una
                                    vulnerabilidad del lado del servidor que permite a un
                                    atacante interactuar con archivos arbitrarios del sistema
                                    de archivos a los que no debería tener acceso, incluyendo
                                    código fuente de la aplicación, credenciales o archivos de
                                    configuración del sistema operativo (PortSwiggger, s.f).
                                </p>
                                <p>
                                    Formalmente, este defecto está catalogado como{" "}
                                    <strong className="text-foreground">
                                        CWE-22: Improper Limitation of a Pathname to a Restricted
                                        Directory
                                    </strong>
                                    , cuya definición establece que el producto construye una
                                    ruta de archivo a partir de una entrada externa sin
                                    neutralizar los elementos especiales que permitirían que
                                    esa ruta resuelva a una ubicación fuera del directorio
                                    restringido previsto (MITRE Corporation, 2024).
                                </p>
                                <p>
                                    La causa de origen es que el backend recibe un valor
                                    controlado por el cliente, como lo es el parámetro de
                                    filename, y lo concatena directamente a una ruta del
                                    servidor en lugar de resolverlo contra una lista de
                                    recursos permitidos. La secuencia{" "}
                                    <code className="font-mono text-[0.85em]">../</code> es
                                    interpretada por el sistema operativo como una instrucción
                                    de navegación hacia el directorio padre; al repetirla
                                    varias veces, un atacante podría retroceder desde el
                                    subdirectorio de almacenamiento hasta la raíz del sistema
                                    de archivos, y desde ahí construir la ruta hacia cualquier
                                    archivo legible por el proceso del servidor.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Clasificación según OWASP Top 10 y triada CIA
                                </h3>
                                <p>
                                    OWASP (Open Worldwide Application Security Project) es una
                                    fundación sin fines de lucro dedicada a la seguridad del
                                    software. Su Top 10 es el framework más usado en la
                                    industria para clasificar los riesgos más críticos y
                                    frecuentes en aplicaciones web, construido a partir del
                                    análisis de cientos de miles de aplicaciones reales.
                                </p>
                                <p>
                                    Dentro del framework de OWASP, en su Top 10 de 2025, esta
                                    debilidad se agrupa bajo la categoría{" "}
                                    <strong className="text-foreground">
                                        A01:2025 - Broken Access Control
                                    </strong>
                                    , la de mayor incidencia entre todas las categorías
                                    evaluadas. El 100% de las aplicaciones analizadas presentó
                                    alguna forma de control de acceso roto (OWASP Foundation,
                                    2025). El propio listado oficial de OWASP incluye
                                    explícitamente CWE-22 (Path Traversal) entre las
                                    debilidades mapeadas a esta categoría, confirmando que el
                                    fallo explotado en este laboratorio corresponde
                                    formalmente a un control de acceso roto, ya que el servidor
                                    no verifica si el recurso solicitado pertenece al espacio
                                    autorizado para el usuario.
                                </p>
                                <p>
                                    Evaluando el impacto bajo la tríada de Confidencialidad,
                                    Integridad y Disponibilidad (CIA), el efecto inmediato
                                    recae sobre la Confidencialidad, ya que permite la
                                    exfiltración de archivos internos, credenciales o código
                                    fuente. Si el mismo endpoint permitiera además operaciones
                                    de escritura sobre rutas manipuladas, la Integridad y la
                                    Disponibilidad quedarían igualmente comprometidas, al poder
                                    sobrescribirse binarios, cron jobs o archivos de
                                    configuración críticos.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Riesgos en un entorno real
                                </h3>
                                <p>
                                    En un deploy real, esta vulnerabilidad se explota
                                    comúnmente para leer{" "}
                                    <code className="font-mono text-[0.85em]">/etc/passwd</code>{" "}
                                    o <code className="font-mono text-[0.85em]">/etc/shadow</code>
                                    , archivos <code className="font-mono text-[0.85em]">.env</code>{" "}
                                    con secretos, datos confidenciales de la infraestructura, o
                                    llaves privadas de SSH. Cuando además existe la capacidad
                                    de subir archivos o la posibilidad de sobrescribir scripts
                                    binarios, puede escalar hasta la Ejecución Remota de
                                    Código (RCE), lo que representa un escenario fatídico pues
                                    compromete totalmente el servidor.
                                </p>
                            </div>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="procedimiento" number="03" title="Procedimiento">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se inició Burp Suite Community Edition y se accedió al
                                navegador Chromium integrado de la herramienta desde el botón{" "}
                                <em>Open Browser</em>, el cual ya está enrutado para pasar
                                todo su tráfico a través del proxy sin una configuración
                                adicional. Con ese navegador se accedió a la instancia del
                                laboratorio de PortSwigger, donde se puede observar que la
                                etiqueta del reto muestra el estado "Not solved" como punto
                                de partida.
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
                                Al recorrer el catálogo de productos en el navegador de
                                Burp, se revisó en paralelo la pestaña Proxy &gt; HTTP
                                history, donde queda registrado el historial completo de
                                peticiones generadas por la página. Ahí se observó que la
                                carga de imágenes generaba automáticamente varias peticiones
                                GET hacia el mismo endpoint,{" "}
                                <code className="font-mono text-[0.85em]">/image</code>, cada
                                una con un parámetro filename distinto (
                                <code className="font-mono text-[0.85em]">
                                    filename=6.jpg
                                </code>
                                ,{" "}
                                <code className="font-mono text-[0.85em]">
                                    filename=57.jpg
                                </code>
                                , etc.). Este patrón indicó que el backend usa directamente
                                ese valor para localizar y devolver un archivo del sistema,
                                lo que lo hizo ideal para probar la manipulación de rutas.
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
                                Se seleccionó una de las peticiones dirigidas a{" "}
                                <code className="font-mono text-[0.85em]">/image</code> y se
                                envió al módulo Repeater mediante el menú contextual (
                                <em>Send to Repeater</em>), lo que permite editar el
                                parámetro filename y reenviar la solicitud cuantas veces sea
                                necesario sin depender de recargar el navegador en cada
                                intento.
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
                                En el valor del parámetro se construyó el payload{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd
                                </code>
                                , aprovechando que cada secuencia{" "}
                                <code className="font-mono text-[0.85em]">../</code> retrocede
                                un nivel en el directorio desde la carpeta base donde el
                                servidor almacena las imágenes.
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
                            alt="Módulo Repeater de Burp Suite con el parámetro filename modificado al payload ../../../etc/passwd."
                            number="05"
                            caption="Parámetro filename reemplazado por el payload ../../../etc/passwd."
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se reenvió la petición con este valor desde Repeater. El
                                servidor respondió{" "}
                                <code className="font-mono text-[0.85em]">HTTP/2 200 OK</code>
                                , devolviendo en el cuerpo el contenido real de{" "}
                                <code className="font-mono text-[0.85em]">/etc/passwd</code>{" "}
                                del sistema operativo.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence06}
                            alt="Respuesta HTTP 200 OK de Burp Suite mostrando el contenido del archivo /etc/passwd del sistema."
                            number="06"
                            caption="Respuesta 200 OK con el contenido de /etc/passwd expuesto en el cuerpo de la respuesta."
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Finalmente, se regresó a la pestaña de la tienda y se
                                refrescó la página. La plataforma de PortSwigger reconoció
                                la explotación exitosa y actualizó el estado del laboratorio
                                de "Not solved" a "Solved".
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
                                El vector de ataque{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd
                                </code>{" "}
                                explota un error de diseño del backend: la ausencia de
                                verificación sobre el resultado final de concatenar la
                                carpeta base del servidor con el valor proporcionado por el
                                cliente.
                            </p>
                            <p>
                                La secuencia{" "}
                                <code className="font-mono text-[0.85em]">../</code>{" "}
                                corresponde a una convención estándar de los sistemas de
                                archivos UNIX para referenciar el directorio inmediatamente
                                superior al directorio de trabajo actual. Al repetirse tres
                                veces, el puntero de ruta retrocede sucesivamente desde el
                                subdirectorio de almacenamiento de imágenes hasta alcanzar
                                la raíz del sistema (
                                <code className="font-mono text-[0.85em]">/</code>).
                            </p>
                            <p>
                                A partir de que se alcanza la raíz, el segmento{" "}
                                <code className="font-mono text-[0.85em]">etc/passwd</code>{" "}
                                completa la ruta hacia el archivo del sistema que almacena
                                las cuentas de usuario locales, junto con sus
                                identificadores, directorios de inicio y shells asignados
                                por defecto.
                            </p>
                            <p>
                                La condición que habilita la explotación no es la sintaxis
                                de la secuencia en sí, que es una funcionalidad normal del
                                sistema operativo, sino la ausencia de una comprobación
                                posterior a la concatenación. El backend nunca evalúa si la
                                ruta resultante permanece dentro del directorio de imágenes
                                autorizado antes de proceder a leer el archivo
                                correspondiente y devolver su contenido en la respuesta.
                            </p>
                            <p>
                                Al no existir sanitización ni validación contra una
                                whitelist de caracteres o rutas permitidas, la función del
                                backend concatena la entrada de forma cruda (por ejemplo,{" "}
                                <code className="font-mono text-[0.85em]">
                                    '/var/www/images/' + '../../../etc/passwd'
                                </code>
                                ), resolviendo la ruta canónica en{" "}
                                <code className="font-mono text-[0.85em]">
                                    '/etc/passwd'
                                </code>{" "}
                                y forzando a la API del sistema de archivos a leer y
                                devolver un archivo sensible del sistema operativo.
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
                                Las medidas de mitigación pueden agruparse en dos niveles:
                                aquellas que eliminan la causa estructural de la
                                vulnerabilidad, y aquellas que actúan como controles de
                                contención en caso de que las primeras fallen.
                            </p>
                            <p>
                                En el primer nivel, la medida más efectiva consiste en
                                eliminar por completo la dependencia de la entrada del
                                cliente para construir rutas de archivo. En lugar de recibir
                                un nombre de archivo, el sistema puede recibir un
                                identificador asociado a la ruta real mediante una tabla en
                                base de datos, de forma que la resolución de la ruta ocurra
                                íntegramente en el servidor y sea independiente del valor
                                enviado por el cliente. Cuando el manejo de un nombre de
                                archivo resulte indispensable, debe aplicarse una validación
                                estricta por whitelist, aceptando exclusivamente caracteres
                                alfanuméricos y extensiones predefinidas, y rechazando de
                                forma explícita cualquier separador de ruta o secuencia de
                                puntos antes de procesar la solicitud.
                            </p>
                            <p>
                                En el segundo nivel, puede emplearse la canonicalización de
                                la ruta solicitada con funciones nativas del lenguaje de
                                desarrollo, verificando que la ruta absoluta obtenida se
                                encuentre contenida dentro del directorio base autorizado.
                            </p>
                            <p>
                                En el plano de infraestructura, se pueden restringir los
                                privilegios bajo los cuales se ejecuta el proceso del
                                servidor, con un entorno aislado o una cuenta de servicio
                                con permisos mínimos; esto limita el impacto de una posible
                                falla en la validación previa, dado que el propio sistema
                                operativo impediría el acceso a directorios críticos como{" "}
                                <code className="font-mono text-[0.85em]">/etc</code> o{" "}
                                <code className="font-mono text-[0.85em]">/root</code>.
                                También la implementación de un Web Application Firewall
                                permite detectar patrones de evasión de rutas antes de que
                                alcancen la lógica de la aplicación, mientras que la
                                incorporación de análisis estático de código y pruebas de
                                penetración periódicas fortalecen la identificación
                                temprana de este tipo de debilidades a lo largo del ciclo
                                de desarrollo.
                            </p>
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

export default FPT01;