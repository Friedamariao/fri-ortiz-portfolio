import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/road-to-hall-of-fame/fpt-05/ev-01.png";
import evidence02 from "../assets/road-to-hall-of-fame/fpt-05/ev-02.png";
import evidence03 from "../assets/road-to-hall-of-fame/fpt-05/ev-03.png";
import evidence04 from "../assets/road-to-hall-of-fame/fpt-05/ev-04.png";
import evidence05 from "../assets/road-to-hall-of-fame/fpt-05/ev-05.png";
import evidence06 from "../assets/road-to-hall-of-fame/fpt-05/ev-06.png";
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
    import.meta.env.BASE_URL + "resources/road-to-hall-of-fame/fpt-05";

function FPT05() {
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
                                Road to Hall of Fame · FPT 05
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                File Path Traversal:{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    Validation of Start of Path
                                </span>
                            </h1>

                            <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Satisfacer una validación de prefijo (
                                <code className="font-mono text-[0.85em]">startsWith</code>)
                                sobre la ruta completa del archivo, mientras se conserva una
                                secuencia de traversal que la lleva fuera del directorio
                                autorizado.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                                <dd className="mt-1 text-accent">Practitioner</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                                <dd className="mt-1">26.09.2026</dd>
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
                                <dd className="mt-1">Bypass de validación de prefijo</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_fpt05.pdf"}
                            download="184346_fpt05.pdf"
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

                        <nav aria-label="Contenido de FPT 05" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/road-to-hall-of-fame/fpt-05#" + section.id}
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
                                Explotar una vulnerabilidad de path traversal presente en la
                                funcionalidad de visualización de imágenes de producto, con
                                el fin de recuperar el contenido del archivo{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>{" "}
                                del servidor. A diferencia de las variantes anteriores, en
                                este laboratorio la aplicación recibe la ruta completa del
                                archivo a través del parámetro filename y valida que dicha
                                ruta comience con el directorio esperado,{" "}
                                <code className="font-mono text-[0.85em]">
                                    /var/www/images/
                                </code>
                                . El objetivo específico es construir un valor que satisfaga
                                esa validación de prefijo y, al mismo tiempo, contenga una
                                secuencia de traversal que permita salir de ese directorio.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="marco-teorico" number="02" title="Marco teórico">
                        <div className="max-w-3xl space-y-8 text-base leading-8 text-muted sm:text-lg">
                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Mecanismo del filtro y su bypass mediante validación de
                                    prefijo incompleta
                                </h3>
                                <p>
                                    Todas las variantes anteriores de este laboratorio recibían
                                    únicamente el nombre del archivo (por ejemplo,{" "}
                                    <code className="font-mono text-[0.85em]">15.jpg</code>) y
                                    la aplicación se encargaba de anteponer el directorio base
                                    antes de acceder al archivo. Esta variante cambia el
                                    diseño, ya que el historial de proxy muestra que la
                                    aplicación envía y espera la ruta completa del archivo,
                                    incluyendo el directorio, como valor del parámetro (
                                    <code className="font-mono text-[0.85em]">
                                        filename=/var/www/images/15.jpg
                                    </code>
                                    ). Como defensa, el servidor valida que ese valor comience
                                    literalmente con la cadena{" "}
                                    <code className="font-mono text-[0.85em]">
                                        /var/www/images/
                                    </code>
                                    , y si no es así, responde como si el parámetro faltara
                                    por completo.
                                </p>
                                <p>
                                    PortSwigger documenta este obstáculo como una validación
                                    de prefijo (
                                    <code className="font-mono text-[0.85em]">
                                        startsWith
                                    </code>
                                    ) que resulta insuficiente cuando el resto de la ruta,
                                    después del prefijo válido, no se sanea (PortSwigger,
                                    s.f.). El hecho de que un string comience con el
                                    directorio autorizado no garantiza que el resultado
                                    final, una vez resuelto por el sistema de archivos, se
                                    mantenga dentro de ese directorio.
                                </p>
                                <p>
                                    Al enviar el valor{" "}
                                    <code className="font-mono text-[0.85em]">
                                        /var/www/images/../../../etc/passwd
                                    </code>
                                    , el prefijo{" "}
                                    <code className="font-mono text-[0.85em]">
                                        /var/www/images/
                                    </code>{" "}
                                    satisface la validación, por lo que la solicitud pasa esa
                                    comprobación sin problema. Sin embargo, el sistema de
                                    archivos no interpreta la ruta como un string estático,
                                    sino que resuelve cada componente en orden: primero entra
                                    a{" "}
                                    <code className="font-mono text-[0.85em]">
                                        var/www/images
                                    </code>
                                    , y luego cada{" "}
                                    <code className="font-mono text-[0.85em]">../</code> lo
                                    hace retroceder un nivel, hasta salir por completo de ese
                                    directorio y llegar a la raíz del sistema de archivos,
                                    desde donde{" "}
                                    <code className="font-mono text-[0.85em]">
                                        etc/passwd
                                    </code>{" "}
                                    es alcanzable. La validación de prefijo se cumplió en el
                                    string original, pero no dice nada sobre a dónde apunta
                                    realmente la ruta después de resolverse.
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
                                    del OWASP Top 10 de 2025, la categoría de mayor incidencia
                                    registrada, presente en el 100% de las aplicaciones
                                    evaluadas (OWASP Foundation, 2025), y sigue mapeada a
                                    CWE-22 (MITRE Corporation, 2024). La diferencia frente a
                                    los casos previos es el tipo de control implementado:
                                    aquí no se trata de eliminar o detectar secuencias de
                                    traversal, sino de restringir el directorio de origen
                                    mediante una comprobación de prefijo sobre el string
                                    recibido, un enfoque que verifica el punto de partida de
                                    la ruta, pero no su destino final.
                                </p>
                                <p>
                                    El impacto sobre la triada CIA sigue siendo el mismo que
                                    en los casos anteriores: comprometer la Confidencialidad
                                    al exponer archivos internos del servidor. Lo que
                                    distingue este caso es que expone la diferencia entre
                                    validar la forma de un dato y validar su significado
                                    real: una ruta puede cumplir perfectamente la condición
                                    de "empezar con el directorio correcto" y, aun así,
                                    terminar apuntando a un archivo completamente distinto
                                    una vez que el sistema operativo resuelve los componentes{" "}
                                    <code className="font-mono text-[0.85em]">../</code> que
                                    le siguen.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Riesgos en un entorno real
                                </h3>
                                <p>
                                    Validar únicamente el prefijo de una ruta es una práctica
                                    común en aplicaciones que reciben rutas de archivos
                                    completas desde el cliente, especialmente cuando se busca
                                    dar cierta flexibilidad al usuario final, por ejemplo,
                                    para acceder a subcarpetas dentro de un directorio
                                    compartido. El riesgo es que un desarrollador puede
                                    considerar suficiente esta comprobación por parecer
                                    sólida si se piensa que "si empieza con la carpeta
                                    permitida, debe estar dentro de la carpeta permitida",
                                    pero sin considerar que el propio string puede incluir
                                    instrucciones de navegación como los retrocesos en el
                                    directorio, que el sistema de archivos ejecutará después
                                    de que la validación ya haya aprobado el dato.
                                </p>
                            </div>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="procedimiento" number="03" title="Procedimiento">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se accede a la instancia del laboratorio "File path
                                traversal, validation of start of path" de PortSwigger Web
                                Security Academy. El laboratorio inicia en estado "Not
                                solved" y presenta una tienda en línea con productos cuyas
                                imágenes se cargan dinámicamente.
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
                            alt="Historial de peticiones HTTP mostrando varias solicitudes GET al endpoint /image con la ruta completa /var/www/images/ en filename."
                            number="02"
                            caption="Historial de peticiones (Proxy > HTTP history) con el patrón /image?filename=/var/www/images/."
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

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                En Repeater se visualiza la solicitud original sin
                                modificar:{" "}
                                <code className="font-mono text-[0.85em]">
                                    GET /image?filename=/var/www/images/15.jpg
                                </code>
                                , junto con las cabeceras enviadas por el navegador.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence03}
                            alt="Módulo Repeater de Burp Suite con la petición original sin modificar, filename=/var/www/images/15.jpg."
                            number="03"
                            caption="Petición original en Repeater, con la ruta completa esperada por la aplicación."
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se modifica filename con el valor{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>
                                , sin el prefijo esperado. El servidor responde{" "}
                                <code className="font-mono text-[0.85em]">
                                    400 Bad Request
                                </code>{" "}
                                con el mensaje{" "}
                                <code className="font-mono text-[0.85em]">
                                    "Missing parameter 'filename'"
                                </code>
                                , lo que indica que la aplicación descarta por completo
                                cualquier valor que no comience con{" "}
                                <code className="font-mono text-[0.85em]">
                                    /var/www/images/
                                </code>
                                , tratándolo como si el parámetro nunca se hubiera enviado.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence04}
                            alt={
                                'Respuesta 400 Bad Request de Burp Suite con el mensaje "Missing parameter \'filename\'" al enviar la ruta sin el prefijo esperado.'
                            }
                            number="04"
                            caption={
                                'Ruta sin el prefijo esperado rechazada: 400 Bad Request, "Missing parameter \'filename\'".'
                            }
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se modifica filename con el valor{" "}
                                <code className="font-mono text-[0.85em]">
                                    /var/www/images/../../../etc/passwd
                                </code>
                                , que sí comienza con el prefijo exigido por la validación
                                pero continúa con secuencias de traversal. Al enviar la
                                solicitud, el servidor responde{" "}
                                <code className="font-mono text-[0.85em]">200 OK</code> con
                                el contenido completo del archivo{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>
                                .
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence05}
                            alt="Respuesta HTTP 200 OK de Burp Suite mostrando el contenido de /etc/passwd tras enviar el prefijo válido seguido de secuencias de traversal."
                            number="05"
                            caption="Respuesta 200 OK con /etc/passwd, evadiendo la validación de prefijo con secuencias de traversal."
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
                            src={evidence06}
                            alt='Instancia del laboratorio de PortSwigger con la etiqueta del reto actualizada a "Solved".'
                            number="06"
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
                                    /var/www/images/../../../etc/passwd
                                </code>
                                , colocado como valor completo del parámetro filename. A
                                diferencia de intentar ocultar o codificar el patrón{" "}
                                <code className="font-mono text-[0.85em]">"../"</code>,
                                esta vez el payload lo expone tal cual: la estrategia no
                                trata de evadir la detección de la secuencia de traversal,
                                sino de satisfacer la condición que revisa que el valor
                                recibido comience con el directorio que está autorizado.
                            </p>
                            <p>
                                Su efectividad depende de que la validación de la
                                aplicación se limite a comprobar el inicio del string, algo
                                equivalente a una función{" "}
                                <code className="font-mono text-[0.85em]">
                                    startsWith("/var/www/images/")
                                </code>
                                , sin canonicalizar ni resolver el resto de la ruta. El
                                payload cumple esa condición literalmente, ya que los
                                primeros caracteres de la cadena son exactamente{" "}
                                <code className="font-mono text-[0.85em]">
                                    /var/www/images/
                                </code>
                                . Aprobada esa comprobación, el valor completo se entrega a
                                la función del sistema de archivos que sí interpreta cada
                                segmento de la ruta, incluyendo los{" "}
                                <code className="font-mono text-[0.85em]">../</code> que
                                siguen al prefijo, y que la llevan a salir del directorio
                                de imágenes y llegar hasta{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>
                                .
                            </p>
                            <p>
                                La validación de esta aplicación no tiene ningún defecto al
                                comprobar el prefijo; en efecto, cualquier valor que no
                                comience con{" "}
                                <code className="font-mono text-[0.85em]">
                                    /var/www/images/
                                </code>{" "}
                                es rechazado, como se confirmó en el paso cinco. La
                                debilidad recae en que, al verificar si el inicio es o no
                                correcto sin sanitizar el resto de la ruta, el usuario aún
                                puede moverse a través de los directorios.
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
                                        No validar solo el prefijo del string recibido:
                                    </strong>{" "}
                                    una comprobación de tipo{" "}
                                    <code className="font-mono text-[0.85em]">
                                        startsWith()
                                    </code>{" "}
                                    sobre una ruta sin resolver no es una validación de
                                    seguridad confiable, ya que no tiene en cuenta los
                                    componentes de navegación (
                                    <code className="font-mono text-[0.85em]">../</code>) que
                                    puedan aparecer después del prefijo aceptado.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Canonicalizar antes de realizar la validación:
                                    </strong>{" "}
                                    resolver la ruta completa a su forma absoluta y canónica
                                    mediante funciones nativas del lenguaje (
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
                                    en Python) y verificar el prefijo únicamente sobre ese
                                    resultado ya resuelto, nunca sobre el string tal como
                                    llegó del cliente.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Evitar que el cliente controle la ruta completa:
                                    </strong>{" "}
                                    en lugar de recibir el directorio y el nombre de archivo
                                    en un mismo parámetro, separar ambos valores, fijar el
                                    directorio base en el servidor sin que el cliente pueda
                                    influir en él, y aceptar del cliente únicamente el
                                    nombre del archivo, validado además contra una whitelist
                                    de caracteres o extensiones permitidas.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Verificar la relación de contención, no solo la
                                        coincidencia de texto:
                                    </strong>{" "}
                                    tras canonicalizar la ruta, confirmar explícitamente que
                                    el resultado se encuentra dentro del directorio
                                    autorizado, en lugar de asumir que un prefijo textual
                                    correcto implica una ubicación final correcta.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Principio de menor privilegio:
                                    </strong>{" "}
                                    ejecutar el proceso del servidor con permisos mínimos, de
                                    forma que, aunque una ruta lograra evadir la validación
                                    de la aplicación, el sistema operativo continúe negando
                                    el acceso a directorios sensibles como{" "}
                                    <code className="font-mono text-[0.85em]">/etc</code> o{" "}
                                    <code className="font-mono text-[0.85em]">/root</code>.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Auditoría y pruebas específicas de bypass:
                                    </strong>{" "}
                                    al probar validaciones basadas en el directorio de
                                    origen, incluir explícitamente payloads que combinen el
                                    prefijo esperado con secuencias de traversal, además de
                                    las variantes como rutas absolutas, secuencias anidadas
                                    y doble codificación URL.
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
                                <em>Lab: File path traversal, validation of start of path.</em>{" "}
                                Web Security Academy.{" "}
                                <a
                                    href="https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                                >
                                    portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path
                                </a>
                            </li>
                            <li className="pt-6">
                                PortSwigger. (s. f.).{" "}
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

export default FPT05;