import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/road-to-hall-of-fame/fpt-04/ev-01.png";
import evidence02 from "../assets/road-to-hall-of-fame/fpt-04/ev-02.png";
import evidence03 from "../assets/road-to-hall-of-fame/fpt-04/ev-03.png";
import evidence04 from "../assets/road-to-hall-of-fame/fpt-04/ev-04.png";
import evidence05 from "../assets/road-to-hall-of-fame/fpt-04/ev-05.png";
import evidence06 from "../assets/road-to-hall-of-fame/fpt-04/ev-06.png";
import evidence07 from "../assets/road-to-hall-of-fame/fpt-04/ev-07.png";
import evidence08 from "../assets/road-to-hall-of-fame/fpt-04/ev-08.png";
import evidence09 from "../assets/road-to-hall-of-fame/fpt-04/ev-09.png";
import evidence10 from "../assets/road-to-hall-of-fame/fpt-04/ev-10.png";
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
    import.meta.env.BASE_URL + "resources/road-to-hall-of-fame/fpt-04";

function FPT04() {
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
                                Road to Hall of Fame · FPT 04
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                File Path Traversal:{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    Traversal Sequences Stripped with Superfluous URL-Decode
                                </span>
                            </h1>

                            <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Evadir un filtro que sí bloquea{" "}
                                <code className="font-mono text-[0.85em]">../</code>{" "}
                                correctamente, aprovechando una decodificación URL
                                adicional que la aplicación aplica después de validar el
                                input.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                                <dd className="mt-1 text-accent">Practitioner</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                                <dd className="mt-1">25.09.2026</dd>
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
                                <dd className="mt-1">Doble codificación URL</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_fpt04.pdf"}
                            download="184346_fpt04.pdf"
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

                        <nav aria-label="Contenido de FPT 04" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/road-to-hall-of-fame/fpt-04#" + section.id}
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
                                la funcionalidad de visualización de imágenes de producto,
                                con el fin de recuperar el contenido del archivo{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>{" "}
                                del servidor. La aplicación bloquea el input que contiene
                                secuencias de traversal explícitas y, adicionalmente,
                                realiza una decodificación URL del valor recibido después
                                de aplicar dicha validación. El objetivo específico es
                                construir un payload que aproveche ese orden de
                                operaciones para introducir una secuencia de traversal que
                                solo se vuelve visible después del punto en el que el
                                filtro ya dejó de revisar el input.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="marco-teorico" number="02" title="Marco teórico">
                        <div className="max-w-3xl space-y-8 text-base leading-8 text-muted sm:text-lg">
                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Mecanismo del filtro y su bypass mediante URL-decode
                                    superfluo
                                </h3>
                                <p>
                                    Esta variante del laboratorio implementa una defensa más
                                    estricta que las anteriores, ya que bloquea directamente
                                    cualquier solicitud cuyo parámetro filename contenga la
                                    secuencia{" "}
                                    <code className="font-mono text-[0.85em]">"../"</code> de
                                    forma literal, sin importar si aparece una o varias
                                    veces. A diferencia del caso de saneamiento no recursivo,
                                    aquí el filtro sí detecta correctamente tanto la
                                    secuencia simple como las variantes anidadas, por lo que
                                    esos vectores no producen ningún resultado distinto de
                                    un 400 Bad Request.
                                </p>
                                <p>
                                    El problema no está en la detección del patrón, sino en
                                    el momento en que ocurre. PortSwigger documenta este
                                    obstáculo como un caso en el que la aplicación primero
                                    valida el input recibido y, después de aprobarlo, aplica
                                    una decodificación URL adicional sobre ese mismo valor
                                    antes de usarlo para construir la ruta del archivo
                                    (PortSwigger, s.f.). Esa segunda decodificación es
                                    "superflua" porque el servidor web ya había decodificado
                                    la solicitud una vez al recibirla, así que cualquier
                                    carácter que siga codificado en ese punto (por ejemplo,{" "}
                                    <code className="font-mono text-[0.85em]">%252f</code>)
                                    es indicio de que fue codificado dos veces
                                    intencionalmente por el atacante.
                                </p>
                                <p>
                                    Al enviar el valor{" "}
                                    <code className="font-mono text-[0.85em]">
                                        ..%252f..%252f..%252fetc/passwd
                                    </code>
                                    , la primera decodificación (la que hace el servidor web
                                    de forma transparente al recibir la solicitud) convierte{" "}
                                    <code className="font-mono text-[0.85em]">%25</code> en
                                    el carácter{" "}
                                    <code className="font-mono text-[0.85em]">%</code>,
                                    dejando el string como{" "}
                                    <code className="font-mono text-[0.85em]">
                                        ..%2f..%2f..%2fetc/passwd
                                    </code>
                                    . En ese momento no existe ningún{" "}
                                    <code className="font-mono text-[0.85em]">"../"</code>{" "}
                                    literal, así que el filtro anti-traversal lo deja pasar
                                    sin problema. Acto seguido, la aplicación ejecuta su
                                    propia decodificación URL adicional sobre ese valor ya
                                    aprobado, la cual sí interpreta{" "}
                                    <code className="font-mono text-[0.85em]">%2f</code>{" "}
                                    como el carácter{" "}
                                    <code className="font-mono text-[0.85em]">/</code>,
                                    produciendo finalmente{" "}
                                    <code className="font-mono text-[0.85em]">
                                        ../../../etc/passwd
                                    </code>
                                    , momento en el que la secuencia de traversal ya está
                                    fuera del alcance de cualquier validación previa.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Clasificación según OWASP Top 10 y triada CIA
                                </h3>
                                <p>
                                    Al igual que en los casos anteriores, esta vulnerabilidad
                                    corresponde a la categoría{" "}
                                    <strong className="text-foreground">
                                        A01:2025 – Broken Access Control
                                    </strong>{" "}
                                    del OWASP Top 10 de 2025, la categoría de mayor
                                    incidencia registrada, presente en el 100% de las
                                    aplicaciones evaluadas (OWASP Foundation, 2025), y sigue
                                    mapeada a CWE-22 (MITRE Corporation, 2024). La diferencia
                                    frente a los casos previos no es la categoría, sino que
                                    aquí el filtro sí cubre correctamente el vector de
                                    entrada (detecta{" "}
                                    <code className="font-mono text-[0.85em]">"../"</code> en
                                    cualquiera de sus repeticiones), pero la falla aparece en
                                    una etapa posterior del procesamiento que el
                                    desarrollador no consideró parte de la superficie de
                                    validación: una transformación del propio dato ya
                                    validado.
                                </p>
                                <p>
                                    El impacto sobre la tríada CIA sigue siendo el mismo que
                                    en los casos anteriores: comprometer la Confidencialidad
                                    al exponer archivos internos del servidor. Lo que
                                    distingue este caso es que ilustra un principio más
                                    amplio de validación de entradas: cualquier
                                    transformación o normalización que se aplique al dato
                                    después de validarlo puede reintroducir el patrón que la
                                    validación buscaba bloquear, por lo que la validación
                                    debe ejecutarse sobre la forma final y completamente
                                    resuelta del dato, nunca antes de una transformación
                                    pendiente.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Riesgos en un entorno real
                                </h3>
                                <p>
                                    Este patrón de vulnerabilidad, decodificar el input en
                                    más de una etapa del pipeline de procesamiento sin que
                                    todas las etapas de validación se ejecuten después de la
                                    última decodificación, es frecuente en aplicaciones que
                                    combinan un servidor web, un framework y código de
                                    aplicación propio, cada uno con su propio punto de
                                    decodificación URL implícito. El riesgo práctico es que
                                    un equipo de desarrollo puede confiar en que "el
                                    framework ya decodifica la URL", sin darse cuenta de que
                                    su propio código realiza una decodificación adicional
                                    más adelante en el flujo, dejando abierta una ventana de
                                    bypass que ninguna prueba basada en secuencias de
                                    traversal sin codificar lograría detectar.
                                </p>
                            </div>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="procedimiento" number="03" title="Procedimiento">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se accede a la instancia del laboratorio "File path
                                traversal, traversal sequences stripped with superfluous
                                URL-decode" de PortSwigger Web Security Academy. El
                                laboratorio inicia en estado "Not solved" y presenta una
                                tienda en línea con productos cuyas imágenes se cargan
                                dinámicamente.
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
                                Con Burp Suite interceptando el tráfico, se navega por la
                                tienda y se revisa el historial de proxy. Se confirma que
                                cada imagen de producto se solicita mediante{" "}
                                <code className="font-mono text-[0.85em]">
                                    GET /image?filename=&lt;archivo&gt;.jpg
                                </code>
                                .
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
                                    GET /image?filename=58.jpg
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
                                Se modifica filename con la secuencia{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd
                                </code>
                                . El servidor responde{" "}
                                <code className="font-mono text-[0.85em]">
                                    400 Bad Request
                                </code>{" "}
                                con el mensaje{" "}
                                <code className="font-mono text-[0.85em]">
                                    "No such file"
                                </code>
                                , confirmando que el filtro detecta y bloquea la secuencia
                                de traversal literal.
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
                                Se prueba{" "}
                                <code className="font-mono text-[0.85em]">
                                    filename=/etc/passwd
                                </code>
                                , la ruta absoluta del archivo objetivo. La respuesta
                                vuelve a ser 400 Bad Request ("No such file"), lo que
                                descarta este vector para esta variante particular del
                                laboratorio.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence06}
                            alt="Respuesta 400 Bad Request de Burp Suite al probar la ruta absoluta /etc/passwd."
                            number="06"
                            caption="Ruta absoluta también bloqueada: 400 Bad Request."
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se prueba{" "}
                                <code className="font-mono text-[0.85em]">
                                    filename=....//....//....//etc/passwd
                                </code>
                                , la técnica de secuencias anidadas efectiva contra un
                                saneamiento no recursivo. La respuesta es nuevamente 400
                                Bad Request, lo que confirma que, a diferencia de la
                                Actividad 09, este filtro sí elimina correctamente las
                                secuencias de traversal aunque estén anidadas.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence07}
                            alt="Respuesta 400 Bad Request de Burp Suite al probar una secuencia de traversal anidada."
                            number="07"
                            caption="Secuencia anidada también bloqueada: este filtro sí es recursivo."
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se modifica filename con el valor{" "}
                                <code className="font-mono text-[0.85em]">
                                    ..%252f..%252f..%252fetc/passwd
                                </code>
                                , donde{" "}
                                <code className="font-mono text-[0.85em]">%25</code> es la
                                codificación URL del carácter{" "}
                                <code className="font-mono text-[0.85em]">%</code>. Este
                                payload está pensado para sobrevivir a la validación del
                                filtro y sólo revelar la secuencia de traversal después de
                                una decodificación adicional.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence08}
                            alt="Módulo Repeater de Burp Suite con el payload de doble codificación URL construido en el parámetro filename."
                            number="08"
                            caption="Payload de doble codificación URL construido en el parámetro filename."
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Al enviar la solicitud, el servidor responde{" "}
                                <code className="font-mono text-[0.85em]">200 OK</code> con
                                el contenido completo del archivo{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>
                                . El panel Inspector de Burp Suite, usado sobre el
                                fragmento{" "}
                                <code className="font-mono text-[0.85em]">%252f</code> de
                                la solicitud, confirma que ese valor corresponde a una
                                codificación URL que, al decodificarse, produce el
                                carácter{" "}
                                <code className="font-mono text-[0.85em]">/</code>{" "}
                                utilizado para reconstruir la secuencia de traversal.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence09}
                            alt="Respuesta HTTP 200 OK de Burp Suite mostrando el contenido de /etc/passwd, con el panel Inspector decodificando el fragmento %252f."
                            number="09"
                            caption="Respuesta 200 OK con /etc/passwd; el Inspector confirma que %252f decodifica a /."
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
                            src={evidence10}
                            alt='Instancia del laboratorio de PortSwigger con la etiqueta del reto actualizada a "Solved".'
                            number="10"
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
                                El payload que utilicé fue{" "}
                                <code className="font-mono text-[0.85em]">
                                    ..%252f..%252f..%252fetc/passwd
                                </code>
                                , como valor del parámetro filename. Este payload es
                                distinto a los dos anteriores (ruta absoluta y secuencias
                                anidadas), que ya fueron descartados. En vez de reordenar
                                o repetir caracteres para ocultar el{" "}
                                <code className="font-mono text-[0.85em]">"../"</code>,
                                aquí se codifica dos veces, de modo que en el momento en
                                que el filtro revisa el input, el patrón todavía no existe
                                en esa forma.
                            </p>
                            <p>
                                Su efectividad depende de que la aplicación decodifique la
                                URL en dos momentos distintos. Primero, el servidor web
                                decodifica la solicitud una sola vez de forma automática al
                                recibirla:{" "}
                                <code className="font-mono text-[0.85em]">%25</code> se
                                convierte en{" "}
                                <code className="font-mono text-[0.85em]">%</code>, así
                                que{" "}
                                <code className="font-mono text-[0.85em]">%252f</code>{" "}
                                pasa a ser{" "}
                                <code className="font-mono text-[0.85em]">%2f</code>. En
                                ese punto el filtro anti-traversal revisa el string, no
                                encuentra ningún{" "}
                                <code className="font-mono text-[0.85em]">"../"</code>{" "}
                                literal (
                                <code className="font-mono text-[0.85em]">%2f</code>{" "}
                                todavía no es una barra) y deja pasar el valor. Después de
                                esa validación, la propia aplicación ejecuta una segunda
                                decodificación URL sobre ese mismo dato ya aprobado, y esta
                                sí convierte{" "}
                                <code className="font-mono text-[0.85em]">%2f</code> en{" "}
                                <code className="font-mono text-[0.85em]">/</code>,
                                reconstruyendo en ese momento la secuencia{" "}
                                <code className="font-mono text-[0.85em]">../../../</code>{" "}
                                que finalmente se usa para localizar el archivo.
                            </p>
                            <p>
                                El filtro no tiene ningún defecto al detectar el patrón{" "}
                                <code className="font-mono text-[0.85em]">"../"</code> en
                                sí, como se confirmó con los pasos seis y siete, lo
                                bloquea correctamente incluso en variantes repetidas o
                                anidadas. Su punto débil es el orden de las operaciones:
                                valida el dato antes de que termine de tomar su forma
                                final, cuando debería hacerlo después de esa segunda
                                decodificación.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="mitigacion"
                        number="05"
                        title="Mitigación recomendada"
                    >
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <ul className="list-disc space-y-4 pl-6">
                                <li>
                                    <strong className="text-foreground">
                                        Validar el input después de la última transformación y
                                        no antes:
                                    </strong>{" "}
                                    cualquier decodificación, conversión de caracteres
                                    especiales a su forma literal o normalización que la
                                    aplicación vaya a aplicar al dato debe ejecutarse
                                    primero, y la validación anti-traversal debe correr
                                    sobre el resultado final que realmente se usará para
                                    construir la ruta.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Eliminar decodificaciones redundantes:
                                    </strong>{" "}
                                    si el servidor web o el framework ya decodifican la URL
                                    automáticamente, sin que el desarrollador lo programe
                                    explícitamente, el código de la aplicación no debería
                                    volver a decodificar el mismo valor, ya que cada
                                    decodificación adicional es una oportunidad para que un
                                    input doblemente codificado revele un patrón que ya
                                    debería haber sido bloqueado.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Validación estricta por whitelist, no por bloqueo de
                                        patrones (blacklist):
                                    </strong>{" "}
                                    en lugar de buscar y rechazar secuencias específicas
                                    como{" "}
                                    <code className="font-mono text-[0.85em]">"../"</code> en
                                    cualquiera de sus codificaciones, aceptar únicamente
                                    caracteres alfanuméricos y una extensión de archivo
                                    predefinida, rechazando cualquier valor que contenga{" "}
                                    <code className="font-mono text-[0.85em]">"/"</code>,{" "}
                                    <code className="font-mono text-[0.85em]">"\\"</code>,{" "}
                                    <code className="font-mono text-[0.85em]">"%"</code> o
                                    que no cumpla ese formato exacto.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Canonicalización y verificación de ruta base:
                                    </strong>{" "}
                                    resolver la ruta absoluta canónica final mediante
                                    funciones nativas del lenguaje (
                                    <code className="font-mono text-[0.85em]">
                                        getCanonicalPath()
                                    </code>{" "}
                                    en Java,{" "}
                                    <code className="font-mono text-[0.85em]">
                                        os.path.realpath()
                                    </code>{" "}
                                    /{" "}
                                    <code className="font-mono text-[0.85em]">
                                        Path.resolve()
                                    </code>{" "}
                                    en Python) y verificar que el resultado se ubique
                                    estrictamente dentro del directorio autorizado, sin
                                    depender de que ninguna etapa de saneamiento previa haya
                                    sido correcta.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Principio de menor privilegio:
                                    </strong>{" "}
                                    ejecutar el proceso del servidor con permisos mínimos, de
                                    forma que, aunque un payload doblemente codificado
                                    lograra evadir la validación de la aplicación, el
                                    sistema operativo continúe negando el acceso a
                                    directorios sensibles como{" "}
                                    <code className="font-mono text-[0.85em]">/etc</code> o{" "}
                                    <code className="font-mono text-[0.85em]">/root</code>.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Auditoría y pruebas específicas de bypass:
                                    </strong>{" "}
                                    al probar defensas anti-traversal, incluir explícitamente
                                    payloads con codificación URL simple y doble, además de
                                    rutas absolutas y secuencias anidadas, en lugar de
                                    validar la corrección del filtro únicamente contra el
                                    vector de ataque original que motivó su implementación.
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
                                    with superfluous URL-decode.
                                </em>{" "}
                                Web Security Academy.{" "}
                                <a
                                    href="https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                                >
                                    portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode
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

export default FPT04;