import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ActivityFigure from "../components/activities/ActivityFigure";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "resumen", label: "Resumen" },
    { id: "escenario", label: "Escenario" },
    { id: "analisis", label: "Análisis forense" },
    { id: "lineas", label: "Líneas de investigación posteriores" },
    { id: "conclusiones", label: "Conclusiones" },
    { id: "referencias", label: "Referencias" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-18";

const evidenceModules = import.meta.glob("../assets/activity-18/*.png", {
    eager: true,
    query: "?url",
    import: "default",
});

function evidenceSrc(key) {
    const match = Object.entries(evidenceModules).find(([path]) =>
        path.endsWith("/" + key + ".png"),
    );
    return match ? match[1] : "";
}

const resumen = [
    "Se analizó con Autopsy la imagen forense del caso Hacking Case del NIST: una computadora portátil abandonada junto con equipo inalámbrico y relacionada con actividades de piratería del sospechoso Greg Schardt, alias “Mr. Evil”. Se creó el caso INV01UPSLP, se importó la imagen de ocho partes, se comprobó su MD5 contra el publicado por NIST y se revisó el registro de Windows para responder 11 preguntas del escenario.",
    "El equipo ejecutaba Windows XP de 32 bits, se instaló el 19 de agosto de 2004 a las 17:48:27 (hora central) y se apagó por última vez el 27 de agosto de 2004 a las 10:46:33. El propietario registrado es Greg Schardt, el equipo se llama N-1A9ODN6ZXK4LQ, el dominio principal es EVIL y el sistema tiene cinco cuentas, una de ellas Mr. Evil. Estos datos son hechos comprobados; que Schardt haya usado las herramientas de red instaladas es una hipótesis que todavía requiere más evidencia.",
];

const escenario = [
    "El 20/09/04, una computadora portátil Dell CPi, número de serie VLQLW, fue encontrada abandonada junto con una tarjeta PCMCIA inalámbrica y una antena externa 802.11b casera. Se sospecha que fue utilizada con fines de piratería, aunque no se puede vincular a un sospechoso, Greg Schardt.",
    "Schardt también recibe el apodo en línea de “Mr. Evil” y algunos de sus asociados han dicho que estacionaría su vehículo dentro del alcance de puntos de acceso inalámbricos (como Starbucks y otros hotspots de T-Mobile), donde interceptaría el tráfico de Internet para intentar obtener números de tarjetas de crédito, nombres de usuario y contraseñas.",
    "La muestra se utiliza para entrenamiento forense digital dirigido a los agentes de NSA Cybersecurity y a las fuerzas del orden en el mundo. El escenario completo tiene 31 preguntas de análisis, de las cuales se responden únicamente las 11 que se indican. Se debe encontrar cualquier software de piratería, evidencia de su uso y cualquier dato que pueda haberse generado, e intentar vincular la computadora con el sospechoso.",
];

const preguntas = [
    {
        id: "preparacion",
        statement:
            "Obtenga la imagen forense de análisis a través del enlace: https://cfreds-archive.nist.gov/Hacking_Case.html, la evidencia está compuesta por 08 partes, descargue los ficheros en una misma carpeta dentro de una “nueva carpeta” en el escritorio.",
        intro:
            "A continuación, ejecute Autopsy, seleccione “New Case”, configure el proyecto con los siguientes datos.",
        details: [
            "Case Name: INV01UPSLP.",
            "Directorio Base: destino de directorio creado.",
            "Number: 01.",
            "En la sección “Examiner”, introduzca sus credenciales.",
            "Notes: Fraude (carding) Greg Schardt.",
            "Organization Name: Universidad Politécnica de San Luis Potosí.",
            "Name: CNO IV – Seguridad Informática.",
        ],
        figures: [
            ["image1", "Partes de la imagen en la carpeta de la actividad"],
            ["image2", "Datos del caso en Autopsy"],
            ["image3", "Organización creada en Autopsy"],
            ["image4", "Selección del host en Autopsy"],
        ],
        paragraphs: [],
    },
    {
        id: "tipo-origen",
        statement:
            "En la ventana siguiente seleccione “Disk Image or VM File”.",
        figures: [["image20", "Selección del tipo de origen de datos"]],
        labeled: [
            {
                label: "¿A qué se refiere el tipo de origen “Logical Files”?",
                text: "Se refiere a agregar como fuente de datos archivos o carpetas individuales que están en la computadora del examinador o en una unidad compartida, sin necesidad de crear antes una imagen de disco. Es útil cuando solo se tiene un conjunto de archivos por analizar. Tiene limitaciones pues Autopsy ignora las marcas de tiempo de esos archivos, porque pueden corresponder al momento en que se copiaron, y no revisa espacio no asignado ni archivos borrados, solo los archivos existentes.",
            },
            {
                label: "¿A qué se refiere el tipo de origen “Local Disk”?",
                text: "Se refiere a un dispositivo de almacenamiento conectado al equipo del examinador, como un disco local o una unidad USB, que Autopsy analiza directamente sin hacer antes una copia en imagen. Es más útil con dispositivos USB conectados mediante un bloqueador de escritura. Si el disco se está modificando durante el análisis, Autopsy no verá los archivos agregados después, y puede ser necesario ejecutar Autopsy como administrador para ver todos los dispositivos.",
            },
        ],
        paragraphs: [],
    },
    {
        id: "hash",
        statement:
            "En la ventana siguiente seleccione la ubicación donde se encuentran los ficheros que serán analizados. ¿Cuál es el hash de la imagen? ¿Coinciden el hash de adquisición y verificación?",
        figures: [
            ["image5", "Ubicación de los ficheros de la imagen"],
            ["image6", "Módulos de ingesta seleccionados"],
            ["image7", "Resumen de la fuente de datos"],
            ["image8", "Hashes calculados por Autopsy"],
        ],
        paragraphs: [
            "Después marqué todos los módulos de búsqueda que se encuentran disponibles y finalicé el proceso de importación de evidencia.",
            "MD5: aee4fcd9301c03b3b054623ca261959a",
            "El hash de adquisición es el valor calculado al crear la imagen a partir del disco original, y el hash de verificación es el que se calcula después sobre la imagen para confirmar que no ha cambiado. En esta práctica usé como hash de adquisición el publicado por NIST y como hash de verificación el calculado por Autopsy.",
        ],
    },
    {
        id: "sistema-operativo",
        statement: "¿Qué sistema operativo se utilizó en la computadora?",
        figures: [["image9", "Operating System Information en Autopsy"]],
        paragraphs: [
            "El sistema operativo utilizado fue Microsoft Windows XP, de 32 bits. Para identificarlo, en Autopsy abrí Data Artifacts y di clic en Operating System Information. El módulo Recent Activity extrajo del registro del sistema que el programa es Microsoft Windows XP, con arquitectura x86 y ruta de instalación C:\\WINDOWS.",
        ],
    },
    {
        id: "fecha-instalacion",
        statement: "¿Cuándo fue la fecha de instalación?",
        figures: [["image10", "Valor InstallDate en la clave CurrentVersion"]],
        paragraphs: [
            "La fecha de instalación del sistema operativo fue el 19 de agosto de 2004 a las 17:48:27, hora central de verano (CDT, UTC−5), equivalente a las 22:48:27 UTC. Para obtenerla, abrí el archivo software ubicado en /WINDOWS/system32/config y lo revisé con el visor de registro de la pestaña Application. En la clave Microsoft\\Windows NT\\CurrentVersion localicé el valor InstallDate, que contiene 0x41252e3b (1092955707). Se trata de una marca de tiempo Unix, es decir, los segundos transcurridos desde el 1 de enero de 1970 en UTC; al convertirla obtuve la fecha indicada. No usé la fecha de modificación de la clave (27 de agosto de 2004), porque corresponde a un cambio posterior en el registro y no a la instalación.",
        ],
    },
    {
        id: "zona-horaria",
        statement: "¿Cuál es la configuración de zona horaria?",
        figures: [["image11", "Clave TimeZoneInformation del archivo system"]],
        paragraphs: [
            "El equipo estaba configurado en la zona de hora central (Central Standard Time, UTC−6), con cambio automático a horario de verano (Central Daylight Time, UTC−5). Para identificarlo, abrí el archivo system ubicado en /WINDOWS/system32/config y lo revisé en el visor de registro de la pestaña Application, en la clave ControlSet001\\Control\\TimeZoneInformation, donde el campo StandardName es “Central Standard Time”.",
        ],
    },
    {
        id: "propietario",
        statement: "¿Quién es el propietario registrado?",
        figures: [
            ["image12", "Operating System Information: campo Owner"],
            ["image13", "Valor RegisteredOwner en la clave CurrentVersion"],
        ],
        paragraphs: [
            "El propietario registrado del sistema es Greg Schardt. Para identificarlo, abrí Data Artifacts → Operating System Information, donde el módulo Recent Activity muestra el campo Owner con el valor “Greg Schardt” y la organización como “N/A”. Este dato corresponde al valor RegisteredOwner de la clave Microsoft\\Windows NT\\CurrentVersion del registro, que Windows guarda al momento de la instalación. Esto indica a nombre de quién se registró el equipo, pero por sí solo no demuestra quién lo utilizó.",
        ],
    },
    {
        id: "nombre-equipo",
        statement: "¿Cuál es el nombre de la cuenta de la computadora?",
        figures: [["image14", "Clave ComputerName del archivo system"]],
        paragraphs: [
            "El nombre de la computadora es N-1A9ODN6ZXK4LQ. Para identificarlo, en el visor de registro abrí el archivo system (/WINDOWS/system32/config), dentro de la clave ControlSet001\\Control\\ComputerName\\ComputerName, donde el valor ComputerName contiene el mismo nombre.",
        ],
    },
    {
        id: "dominio",
        statement: "¿Cuál es el nombre de dominio principal?",
        figures: [
            ["image15", "Valor PolPrDmN en el archivo SECURITY"],
            ["image16", "Conversión de los bytes a texto"],
        ],
        paragraphs: [
            "El nombre de dominio principal es EVIL. Se obtuvo abriendo el archivo SECURITY, ubicado en /WINDOWS/system32/config, y lo revisé con el visor de registro de la pestaña Application. Dentro de la clave Policy localicé el valor PolPrDmN, que corresponde al nombre de dominio principal (Primary Domain Name) y contiene los bytes 08 00 0A 00 08 00 00 00 45 00 56 00 49 00 4C 00.",
            "Como el valor no se muestra como texto legible, lo decodifiqué con el convertidor Hex to String de RapidTables. Introduje los bytes y seleccioné la codificación UTF-16 little endian, que es la que utiliza Windows para guardar texto en el registro, donde cada carácter ocupa dos bytes. El convertidor devolvió “EVIL”. Los primeros ocho bytes se mostraron como caracteres no imprimibles porque forman un encabezado y no parte del nombre, por lo que el texto del dominio corresponde a los bytes 45 00 56 00 49 00 4C 00.",
        ],
    },
    {
        id: "apagado",
        statement:
            "¿Cuándo fue la última fecha/hora registrada en que se apagó la computadora?",
        commands: ["[DateTime]::FromFileTimeUtc(0x01C48C4D0700FCC4)"],
        figures: [
            ["image17", "Valor ShutdownTime en la clave Windows"],
            ["image18", "Conversión del valor FILETIME en PowerShell"],
        ],
        paragraphs: [
            "La última fecha y hora de apagado registrada fue el 27 de agosto de 2004 a las 10:46:33, hora central de verano (CDT, UTC−5), equivalente a las 15:46:33 UTC. Se puede obtener con el archivo system, ubicado en /WINDOWS/system32/config, y lo revisé con el visor de registro de la pestaña Application. En la clave ControlSet001\\Control\\Windows localicé el valor ShutdownTime, que Windows actualiza cuando el equipo se apaga y que contiene los bytes C4 FC 00 07 4D 8C C4 01.",
            "Estos ocho bytes representan una fecha en formato FILETIME, es decir, el número de intervalos de 100 nanosegundos transcurridos desde el 1 de enero de 1601 en UTC, almacenado con el byte menos significativo primero. Para convertirlos invertí el orden de los bytes, lo que dio el número hexadecimal 0x01C48C4D0700FCC4, y lo introduje en PowerShell con la instrucción [DateTime]::FromFileTimeUtc(0x01C48C4D0700FCC4). El resultado fue el viernes 27 de agosto de 2004 a las 03:46:33 p. m. (15:46:33 UTC); al restar cinco horas por el horario de verano de la zona central, obtuve las 10:46:33 CDT.",
        ],
    },
    {
        id: "cuentas",
        statement: "¿Cuántas cuentas están registradas (número total)?",
        figures: [["image19", "Subclaves de Names en el archivo SAM"]],
        paragraphs: [
            "Hay 5 cuentas registradas: Administrator, Guest, HelpAssistant, Mr. Evil y SUPPORT_388945a0. Para identificarlas, abrí el archivo SAM, ubicado en /WINDOWS/system32/config, y lo revisé en el visor de registro de la pestaña Application. En la clave SAM\\Domains\\Account\\Users\\Names cada subclave corresponde a una cuenta, y el panel de metadatos indica 5 subclaves.",
        ],
    },
];

const lineasInvestigacion = [
    "Con base en lo observado, propuse las siguientes líneas de investigación para una fase posterior. Ninguna se ejecutó en esta actividad, por lo que no se presentan como hallazgos.",
    "La primera consiste en comprobar si las herramientas de red instaladas se utilizaron realmente. Los programas como Ethereal, Network Stumbler, Look@LAN y Cain & Abel aparecen en la lista de programas instalados, pero esa lista solo prueba que existen en el sistema. Revisaría los archivos de captura de tráfico, las carpetas de usuario de la cuenta Mr. Evil, los accesos recientes y los archivos Prefetch para determinar si hubo ejecución y en qué fechas.",
    "La segunda es revisar las comunicaciones del equipo. Autopsy registró dos cuentas de comunicación y un mensaje de correo electrónico. Analizaría su contenido, remitentes, destinatarios y fechas, además de los registros de los clientes de chat y de FTP instalados (mIRC y CuteFTP), para identificar con quién se comunicaba el usuario y qué información pudo intercambiar.",
    "La tercera es reforzar la atribución a una persona. Buscaría los términos “Greg Schardt” y “Mr. Evil” en toda la imagen mediante la búsqueda por palabras clave, y revisaría el historial de navegación y los archivos personales de la cuenta Mr. Evil. Esto permitiría pasar de un indicio (el nombre del propietario y el nombre de la cuenta) a una relación más sólida entre la persona y la actividad.",
    "La cuarta es construir una línea de tiempo con las fechas de instalación de los programas (19 al 27 de agosto de 2004), la instalación del sistema y el último apagado. Con ella se vería si la instalación de las herramientas fue continua o si hubo periodos de inactividad, y se podría contrastar con registros externos, como los del proveedor de red o los de los puntos de acceso involucrados.",
];

const conclusiones = [
    "La imagen analizada conservó su integridad: el MD5 calculado en Autopsy (aee4fcd9301c03b3b054623ca261959a) coincide con el valor publicado por NIST, por lo que el análisis se realizó sobre una copia fiel de la evidencia. Con ella se comprobó que el equipo ejecutaba Windows XP de 32 bits, que se instaló el 19 de agosto de 2004 a las 17:48:27 (hora central) y que su último apagado ocurrió el 27 de agosto de 2004 a las 10:46:33. El propietario registrado es Greg Schardt, el equipo se llama N-1A9ODN6ZXK4LQ, el nombre de usuario es EVIL y el sistema tiene cinco cuentas, una de ellas Mr. Evil.",
    "Estos datos son hechos comprobados porque se obtuvieron directamente de los registros de Windows y de la propia imagen. Las herramientas de red y de recuperación de contraseñas instaladas entre el 19 y el 27 de agosto de 2004 son, en cambio, un indicio: su presencia muestra que estaban en el equipo, pero no demuestra que se hayan usado contra terceros ni quién las operó. Que haya sido el propietario registrado quien las usó es una hipótesis razonable que todavía requiere más evidencia.",
    "En conjunto, la coincidencia entre el propietario, la cuenta de usuario y el periodo de instalación de los programas orienta la investigación hacia Greg Schardt, pero no basta para atribuirle una actividad concreta. Para ello hacen falta las líneas de investigación propuestas, en particular la revisión de las comunicaciones y de los rastros de ejecución de las herramientas. Además, este análisis se hizo sobre una copia de la imagen con el hash verificado y sin modificar el original, lo que conserva la validez de la evidencia ante una eventual revisión.",
];

const references = [
    {
        text: "National Institute of Standards and Technology. (s. f.). Hacking Case. Computer Forensic Reference Data Sets (CFReDS).",
        url: "https://cfreds.nist.gov/all/NIST/HackingCase",
    },
    {
        text: "National Institute of Standards and Technology. (s. f.). Hacking Case: Test answers. Computer Forensic Reference Data Sets (CFReDS).",
        url: "https://cfreds-archive.nist.gov/images/TestAnswers.pdf",
    },
    {
        text: "RapidTables. (2026). Hex to ASCII text converter.",
        url: "https://www.rapidtables.com/convert/number/hex-to-ascii.html",
    },
    {
        text: "Wh1t3s0u1. (2021). CFReDS Project: Hacking Case Challenge Writeup. Medium.",
        url: "https://medium.com/@sshekhar01/cfreds-project-hacking-case-challenge-writeup-6a52883eac0b",
    },
];

// Figures are numbered in the order they appear on the page.
const figureNumbers = Object.fromEntries(
    preguntas
        .flatMap((item) => item.figures.map(([key]) => key))
        .map((key, index) => [key, String(index + 1).padStart(2, "0")]),
);

function CodeBlock({ lines }) {
    return (
        <pre className="my-4 overflow-x-auto border border-border bg-foreground p-4 font-mono text-xs leading-6 text-background">
            <code>{lines.join("\n")}</code>
        </pre>
    );
}

function Question({ item, index }) {
    return (
        <li className="grid grid-cols-1 gap-3 py-10 first:pt-0 sm:grid-cols-[3rem_1fr]">
            <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
                <h3 className="max-w-3xl text-lg leading-7 font-semibold wrap-break-word">
                    {item.statement}
                </h3>

                {item.intro && (
                    <p className="mt-4 max-w-3xl leading-7 wrap-break-word text-muted">
                        {item.intro}
                    </p>
                )}

                {item.details && (
                    <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-6 leading-7 wrap-break-word text-muted">
                        {item.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                        ))}
                    </ul>
                )}

                {item.commands && (
                    <>
                        <p className="mt-5 font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                            {item.commands.length > 1 ? "Comandos" : "Comando"}
                        </p>
                        <CodeBlock lines={item.commands} />
                    </>
                )}

                {item.figures.map(([key, caption]) => (
                    <ActivityFigure
                        key={key}
                        src={evidenceSrc(key)}
                        alt={caption}
                        number={figureNumbers[key]}
                        caption={caption}
                        className="max-w-3xl"
                    />
                ))}

                <div className="mt-6 max-w-3xl space-y-4 leading-7 wrap-break-word text-muted">
                    {item.labeled?.map((entry) => (
                        <p key={entry.label}>
                            <span className="font-semibold text-foreground">
                                {entry.label}
                            </span>{" "}
                            {entry.text}
                        </p>
                    ))}
                    {item.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </li>
    );
}

function Activity18() {
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
                                Parcial III / Actividad 18
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                La huella digital{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    de un cibercriminal
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl font-mono text-2xl tracking-wide text-accent uppercase">
                                La investigación forense
                            </p>
                            <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Análisis forense con Autopsy de la imagen del caso
                                Hacking Case del NIST: sistema operativo, fechas de
                                instalación y apagado, zona horaria, propietario,
                                equipo, dominio y cuentas.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                                <dd className="mt-1 text-accent">Completada</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Parcial</dt>
                                <dd className="mt-1">Tercer parcial</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Herramienta
                                </dt>
                                <dd className="mt-1">Autopsy</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Muestra</dt>
                                <dd className="mt-1">Hacking Case (NIST)</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/OrtizLopezFriedaMaría-Act18.pdf"}
                            download="OrtizLopezFriedaMaría-Act18.pdf"
                            className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
                        >
                            Descargar informe
                        </a>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
                <aside className="min-w-0 lg:col-span-3">
                    <div className="border-t border-border pt-5 lg:sticky lg:top-36">
                        <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                            En esta actividad
                        </p>

                        <nav aria-label="Contenido de la Actividad 18" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/activity-18#" + section.id}
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
                                Herramientas
                            </p>
                            <p className="mt-3 text-sm leading-6 text-muted">
                                Autopsy · PowerShell · RapidTables
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 space-y-24 lg:col-span-9">
                    <ActivitySection id="resumen" number="01" title="Resumen">
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {resumen.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    <ActivitySection id="escenario" number="02" title="Escenario">
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {escenario.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    <ActivitySection id="analisis" number="03" title="Análisis forense">
                        <ol className="divide-y divide-border">
                            {preguntas.map((item, index) => (
                                <Question key={item.id} item={item} index={index} />
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection
                        id="lineas"
                        number="04"
                        title="Líneas de investigación posteriores"
                    >
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {lineasInvestigacion.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    <ActivitySection id="conclusiones" number="05" title="Conclusiones">
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {conclusiones.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    <ActivitySection id="referencias" number="06" title="Referencias">
                        <ul className="max-w-3xl space-y-4 text-sm leading-6 text-muted">
                            {references.map((reference) => (
                                <li key={reference.url} className="border-t border-border pt-4">
                                    <p>{reference.text}</p>
                                    <a
                                        href={reference.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="break-all text-accent transition-colors hover:text-accent-hover"
                                    >
                                        {reference.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </ActivitySection>

                    <ActivitySection id="recursos" number="07" title="Recursos">
                        <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
                            <ResourceLink
                                href={resourceBase + "/OrtizLopezFriedaMaría-Act18.pdf"}
                                type="PDF"
                                title="Informe forense"
                                description="Informe completo con el proceso en Autopsy, capturas, respuestas, líneas de investigación y conclusiones."
                                download="OrtizLopezFriedaMaría-Act18.pdf"
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Activity18;
