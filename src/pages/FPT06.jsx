import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import evidence01 from "../assets/road-to-hall-of-fame/fpt-06/ev-01.png";
import evidence02 from "../assets/road-to-hall-of-fame/fpt-06/ev-02.png";
import evidence03 from "../assets/road-to-hall-of-fame/fpt-06/ev-03.png";
import evidence04 from "../assets/road-to-hall-of-fame/fpt-06/ev-04.png";
import evidence05 from "../assets/road-to-hall-of-fame/fpt-06/ev-05.png";
import evidence06 from "../assets/road-to-hall-of-fame/fpt-06/ev-06.png";
import evidence07 from "../assets/road-to-hall-of-fame/fpt-06/ev-07.png";
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
    import.meta.env.BASE_URL + "resources/road-to-hall-of-fame/fpt-06";

function FPT06() {
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
                                Road to Hall of Fame · FPT 06
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                File Path Traversal:{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    Validation of File Extension with Null Byte Bypass
                                </span>
                            </h1>

                            <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Satisfacer una validación de extensión (
                                <code className="font-mono text-[0.85em]">.png</code>)
                                insertando un byte nulo que separa esa extensión de la ruta
                                real antes de que el sistema de archivos la resuelva.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                                <dd className="mt-1 text-accent">Practitioner</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Fecha</dt>
                                <dd className="mt-1">28.09.2026</dd>
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
                                <dd className="mt-1">Null byte injection</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_fpt06.pdf"}
                            download="184346_fpt06.pdf"
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

                        <nav aria-label="Contenido de FPT 06" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/road-to-hall-of-fame/fpt-06#" + section.id}
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
                                del servidor. En este laboratorio la aplicación exige que
                                el valor de filename termine con la extensión{" "}
                                <code className="font-mono text-[0.85em]">.png</code> antes
                                de aceptarlo. El objetivo específico es construir un valor
                                que contenga una secuencia de traversal hacia{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>{" "}
                                y que, al mismo tiempo, termine en la extensión esperada,
                                de modo que la validación lo acepte sin que esa extensión
                                llegue a formar parte de la ruta que realmente se abre en
                                el servidor.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="marco-teorico" number="02" title="Marco teórico">
                        <div className="max-w-3xl space-y-8 text-base leading-8 text-muted sm:text-lg">
                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Mecanismo del filtro y su bypass mediante null byte
                                </h3>
                                <p>
                                    Esta variante de la vulnerabilidad exige que el parámetro
                                    filename termine con la extensión{" "}
                                    <code className="font-mono text-[0.85em]">.png</code> y
                                    cualquier extensión que no cumpla esa condición se
                                    descarta antes de intentar abrir el archivo
                                    correspondiente. PortSwigger documenta este obstáculo
                                    como una validación de extensión que puede evadirse
                                    insertando un byte nulo (
                                    <code className="font-mono text-[0.85em]">%00</code>)
                                    inmediatamente antes de la extensión que se pide
                                    (PortSwigger, s.f.). Muchos lenguajes y bibliotecas de
                                    manejo de archivos, sobre todo los que en algún punto de
                                    su implementación dependen de funciones de bajo nivel
                                    escritas en C, interpretan el byte nulo como el
                                    terminador de un string, y todo lo que aparezca después
                                    de{" "}
                                    <code className="font-mono text-[0.85em]">%00</code> se
                                    ignora cuando se resuelve la ruta real, aunque la capa de
                                    validación de la aplicación sí evalúe el string
                                    completo, extensión incluida, antes de llegar a ese
                                    punto.
                                </p>
                                <p>
                                    Al enviar el valor{" "}
                                    <code className="font-mono text-[0.85em]">
                                        ../../../etc/passwd%00.png
                                    </code>
                                    , la validación de la aplicación revisa el string
                                    completo, comprueba que termina en{" "}
                                    <code className="font-mono text-[0.85em]">.png</code> y
                                    lo aprueba. Sin embargo, cuando ese mismo valor llega a
                                    la función del sistema de archivos que efectivamente
                                    abre el archivo, el byte nulo corta la cadena en ese
                                    punto, y lo que el sistema operativo termina abriendo es{" "}
                                    <code className="font-mono text-[0.85em]">
                                        ../../../etc/passwd
                                    </code>
                                    , sin la extensión que se usó únicamente para pasar la
                                    validación.
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
                                    frente a los casos previos es el tipo de defecto
                                    explotado: aquí no se trata de un patrón de traversal
                                    mal eliminado ni de un prefijo mal verificado, sino de
                                    una discrepancia entre cómo dos capas distintas del
                                    sistema interpretan el mismo string, donde la capa de
                                    validación lo lee completo, mientras que la capa que
                                    abre el archivo lo trunca en el primer byte nulo.
                                </p>
                                <p>
                                    El impacto sobre la triada CIA sigue siendo el mismo que
                                    en los casos anteriores: comprometer la Confidencialidad
                                    al exponer archivos internos del servidor. Lo que
                                    distingue este caso es que expone un riesgo particular
                                    de los sistemas compuestos por varias capas o lenguajes:
                                    una validación puede ser perfectamente correcta para el
                                    string que ella misma interpreta, y aun así resultar
                                    insuficiente si otra capa del sistema interpreta ese
                                    mismo string de forma distinta.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Riesgos en un entorno real
                                </h3>
                                <p>
                                    La inyección de bytes nulos es una técnica con origen en
                                    aplicaciones construidas sobre lenguajes o bibliotecas de
                                    bajo nivel escritas en C, donde los strings terminan en
                                    un byte nulo por convención. Aunque muchos entornos de
                                    desarrollo modernos manejan los strings de forma distinta
                                    y ya no son vulnerables a esta técnica de forma directa,
                                    el riesgo persiste en aplicaciones que combinan un
                                    lenguaje de alto nivel para la lógica de negocio con
                                    bibliotecas nativas o llamadas al sistema operativo para
                                    el manejo de archivos, un punto donde la interpretación
                                    del string puede cambiar sin que el desarrollador lo
                                    note. El riesgo práctico es que una validación de
                                    extensión, aunque parezca suficiente, no garantiza que el
                                    archivo que finalmente se abre sea el que esa validación
                                    creyó estar autorizando.
                                </p>
                            </div>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="procedimiento" number="03" title="Procedimiento">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se accede a la instancia del laboratorio "File path
                                traversal, validation of file extension with null byte
                                bypass" de PortSwigger Web Security Academy. El
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
                                    GET /image?filename=75.jpg
                                </code>
                                , junto con las cabeceras enviadas por el navegador.
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
                                Se modifica filename con el valor{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>
                                , sin la extensión{" "}
                                <code className="font-mono text-[0.85em]">.png</code>{" "}
                                exigida por la aplicación. El servidor responde{" "}
                                <code className="font-mono text-[0.85em]">
                                    400 Bad Request
                                </code>{" "}
                                con el mensaje{" "}
                                <code className="font-mono text-[0.85em]">
                                    "No such file"
                                </code>
                                , confirmando que un valor que no termina en la extensión
                                esperada es rechazado.
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence05}
                            alt='Respuesta 400 Bad Request de Burp Suite con el mensaje "No such file" al enviar la ruta sin la extensión .png.'
                            number="05"
                            caption='Ruta sin la extensión .png rechazada: 400 Bad Request, "No such file".'
                            className="max-w-4xl"
                        />

                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Se modifica filename con el valor{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd%00.png
                                </code>
                                , donde{" "}
                                <code className="font-mono text-[0.85em]">%00</code> es la
                                codificación URL de un byte nulo insertado justo antes de
                                la extensión{" "}
                                <code className="font-mono text-[0.85em]">.png</code>. Al
                                enviar la solicitud, el servidor responde{" "}
                                <code className="font-mono text-[0.85em]">200 OK</code> con{" "}
                                <code className="font-mono text-[0.85em]">
                                    Content-Type image/png
                                </code>{" "}
                                y devuelve en el cuerpo el contenido completo del archivo{" "}
                                <code className="font-mono text-[0.85em]">
                                    /etc/passwd
                                </code>
                                .
                            </p>
                        </div>

                        <ActivityFigure
                            src={evidence06}
                            alt="Respuesta HTTP 200 OK de Burp Suite mostrando el contenido de /etc/passwd tras insertar un byte nulo antes de la extensión .png."
                            number="06"
                            caption="Respuesta 200 OK con /etc/passwd, evadiendo la validación de extensión con un byte nulo."
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
                                El payload utilizado fue{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd%00.png
                                </code>
                                , colocado como valor completo del parámetro filename. A
                                diferencia de los casos anteriores, aquí la secuencia de
                                traversal (
                                <code className="font-mono text-[0.85em]">../../../</code>
                                ) no es lo que se intenta ocultar, sino la extensión{" "}
                                <em>.png</em> la que se añade deliberadamente al final,
                                seguida inmediatamente de un byte nulo codificado como{" "}
                                <code className="font-mono text-[0.85em]">%00</code> que la
                                separa del resto de la ruta.
                            </p>
                            <p>
                                Su efectividad depende de que exista una diferencia entre
                                cómo la capa de validación de la aplicación interpreta el
                                string y cómo lo interpreta la función que finalmente abre
                                el archivo. La validación revisa el string completo,{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd%00.png
                                </code>
                                , y confirma que termina en{" "}
                                <code className="font-mono text-[0.85em]">.png</code>, por
                                lo que lo deja pasar. La función de apertura de archivos,
                                en cambio, trata el byte nulo como el fin de la cadena, así
                                que en la práctica solo abre{" "}
                                <code className="font-mono text-[0.85em]">
                                    ../../../etc/passwd
                                </code>
                                , ignorando por completo todo lo que sigue después de{" "}
                                <code className="font-mono text-[0.85em]">%00</code>,
                                incluida la extensión que sirvió para pasar la validación.
                            </p>
                            <p>
                                La validación de extensión de este laboratorio no tiene
                                ningún defecto al comprobar que el string termine en{" "}
                                <code className="font-mono text-[0.85em]">.png</code>; en
                                efecto, un valor sin esa extensión es rechazado, como se
                                confirmó en el paso cinco. Donde falla es que asume que el
                                string que la validación evalúa es exactamente el mismo
                                que el sistema de archivos terminará usando, sin
                                contemplar que un carácter de control como el byte nulo
                                puede hacer que ambas interpretaciones se opongan.
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
                                        Rechazar explícitamente cualquier byte nulo en el
                                        input:
                                    </strong>{" "}
                                    antes de cualquier otra validación hay que verificar que
                                    el valor recibido no contenga el carácter nulo y
                                    descartar la solicitud de inmediato si aparece.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        No confiar en una validación de extensión basada
                                        únicamente en el final del string (endswith):
                                    </strong>{" "}
                                    un string puede terminar en la extensión correcta y aun
                                    así no ser la ruta que finalmente se resuelve; la
                                    extensión debe verificarse sobre la ruta ya
                                    canonicalizada, no sobre el input crudo.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Validación estricta por whitelist:
                                    </strong>{" "}
                                    aceptar únicamente caracteres alfanuméricos en el nombre
                                    del archivo, rechazando cualquier valor que contenga{" "}
                                    <code className="font-mono text-[0.85em]">"/"</code>,{" "}
                                    <code className="font-mono text-[0.85em]">"\\"</code>,
                                    caracteres de control (incluido el byte nulo) o
                                    secuencias de puntos, en lugar de intentar cubrir cada
                                    técnica de evasión conocida por separado.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Canonicalización y verificación de ruta base:
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
                                    en Python) y verificar tanto el directorio como la
                                    extensión sobre ese resultado ya resuelto, nunca sobre el
                                    string tal como llegó del cliente.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Mantener actualizadas las dependencias y el entorno de
                                        ejecución:
                                    </strong>{" "}
                                    muchos entornos modernos ya bloquean o manejan de forma
                                    segura los bytes nulos dentro de strings pasados a APIs
                                    de archivos; usar versiones actualizadas del lenguaje y
                                    sus bibliotecas reduce la superficie expuesta a esta
                                    clase de discrepancias entre capas.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Principio de menor privilegio:
                                    </strong>{" "}
                                    ejecutar el proceso del servidor con permisos mínimos, de
                                    forma que, aunque un payload con byte nulo lograra evadir
                                    la validación de la aplicación, el sistema operativo
                                    continúe negando el acceso a directorios sensibles como{" "}
                                    <code className="font-mono text-[0.85em]">/etc</code> o{" "}
                                    <code className="font-mono text-[0.85em]">/root</code>.
                                </li>
                                <li>
                                    <strong className="text-foreground">
                                        Auditoría y pruebas específicas de bypass:
                                    </strong>{" "}
                                    al probar validaciones de extensión de archivo, incluir
                                    explícitamente payloads con bytes nulos codificados,
                                    además de las variantes ya cubiertas anteriormente
                                    (rutas absolutas, secuencias anidadas, doble
                                    codificación URL, prefijos de directorio).
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
                                    Lab: File path traversal, validation of file extension
                                    with null byte bypass.
                                </em>{" "}
                                Web Security Academy.{" "}
                                <a
                                    href="https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                                >
                                    portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass
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

export default FPT06;