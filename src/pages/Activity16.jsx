import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ActivityFigure from "../components/activities/ActivityFigure";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "resumen", label: "Resumen" },
    { id: "metodologia", label: "Metodología" },
    { id: "procedimiento", label: "Procedimiento" },
    { id: "preguntas", label: "Preguntas" },
    { id: "resultados", label: "Resultados" },
    { id: "analisis", label: "Análisis" },
    { id: "lineas", label: "Líneas de investigación" },
    { id: "conclusiones", label: "Conclusiones" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-16";

const evidenceModules = import.meta.glob("../assets/activity-16/*.png", {
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

const procedimiento = [
    {
        key: "ev-01",
        text: 'Se instaló y ejecutó como administrador el programa AccessData FTK Imager, en su versión 4.3.1.1.',
    },
    {
        key: "ev-02",
        text: 'En la barra de menú, dentro de File, se seleccionó Create Disk Image, que inicia el asistente para crear la imagen forense.',
    },
    {
        key: "ev-03",
        text: 'Se eligió Physical Drive como tipo de fuente: copia el dispositivo completo desde el sector 0, incluyendo la tabla de particiones, el espacio no asignado y los archivos borrados.',
    },
    {
        key: "ev-04",
        text: 'Se seleccionó la memoria USB de 8 GB (Kingston DataTraveler, \\\\.\\PHYSICALDRIVE1) que funcionó como evidencia.',
    },
    {
        key: "ev-05",
        text: 'Se eligió el formato Raw (dd): una copia byte a byte sin compresión ni encabezados, de lectura universal.',
    },
    {
        key: "ev-06",
        text: 'Se ingresó la información del caso: Case Number InfoCrim-01_21.11.2023, Evidence Number 00 (Original Adq), Unique Description, Examiner y Notes. Estos datos quedan registrados en la imagen y en el log.',
    },
    {
        key: "ev-07",
        text: 'Se configuró el destino en la carpeta InfoCrim13, con el nombre de archivo infocrim_OrtizLopezFrieda, fragmentos de 1500 MB, compresión 0 (ninguna) y Use AD Encryption desactivado.',
    },
    {
        key: "ev-08",
        text: 'El destino quedó en la lista con Verify images after they are created activo. Se dio clic en Start a la 1:20 am.',
    },
    {
        key: "ev-09",
        text: 'Comenzó la adquisición de la imagen; una barra de estado y un contador mostraron el transcurso del tiempo.',
    },
    {
        key: "ev-10",
        text: 'La imagen se creó exitosamente (Image created successfully) en 5:11 minutos. Drive/Image Verify Results mostró 15,249,408 sectores, con los hashes MD5 y SHA-1 coincidiendo (Match) y sin bloques defectuosos.',
    },
    {
        key: "ev-11",
        text: 'En la ventana de Creating Image, al dar clic en Image Summary, la primera mitad del resumen muestra los datos del caso (Case Number, Evidence Number, Unique Description, Examiner, Notes) y el inicio de la información del dispositivo fuente: la geometría (512 bytes por sector, 15,249,408 sectores) y el modelo de la unidad.',
    },
    {
        key: "ev-12",
        text: 'La segunda mitad del resumen muestra el número de serie y la interfaz del dispositivo, el tamaño de 7,446 MB, los hashes MD5 y SHA-1, la adquisición de 01:20:18 a 01:25:29, los 5 segmentos generados y la verificación de 01:25:30 a 01:26:25, con ambos hashes verified.',
    },
    {
        key: "ev-13",
        text: 'La carpeta InfoCrim13 quedó con 6 archivos: los 5 fragmentos (.001 a .005) y el log infocrim_OrtizLopezFrieda.001.txt, cuyo contenido se revisó en el Bloc de notas.',
    },
];

const preguntas = [
    {
        q: "¿Qué tipo de formato se refiere el Raw (dd)?",
        a: "Es una copia byte a byte del dispositivo que se está analizando. Este formato no agrega encabezados ni metadatos al archivo, pues se enfoca únicamente en los datos que contiene el disco, sin modificar nada. Su capacidad es la misma que la original, pues no comprime los datos para no perder fidelidad ni modificar sus datos. Se puede leer con herramientas forenses y de análisis, y los metadatos de utilidad se guardan en el .txt del log.",
    },
    {
        q: "¿Qué tipo de formato se refiere el E01?",
        a: "Es el formato de imagen EnCase, que es un contenedor, no un dumpeo en crudo. Guarda los metadatos del caso, como el número de caso, el examinador, notas y fechas. Además, sí permite compresión, por lo que normalmente ocupa menos que el original.",
    },
    {
        q: "¿Cuál es la diferencia entre un formato SMART y un formato E01?",
        a: "Ambos formatos son parte de la familia Expert Witness Format, pero su origen es distinto. SMART proviene de la herramienta SMART de ASR Data, es más antiguo y su extensión es .s01. E01 es de EnCase y es el formato por default en el campo: contiene más campos de metadatos y tiene mejor soporte entre herramientas.",
    },
    {
        q: "¿Cuántos archivos fueron generados?",
        a: "Se generaron 6 archivos: 5 fragmentos de la imagen (.001 a .005) y 1 del log (.txt).",
    },
];

const resultados = [
    { dato: "Dispositivo fuente", resultado: "\\\\.\\PHYSICALDRIVE1, USB removible de 7,446 MB" },
    { dato: "Sectores copiados", resultado: "15,249,408 (512 bytes cada uno)" },
    { dato: "Formato", resultado: "Raw (dd), fragmentos de 1500 MB, sin compresión ni cifrado" },
    { dato: "Archivos generados", resultado: "6: 5 fragmentos (.001 a .005) y 1 log (.txt)" },
    { dato: "Adquisición", resultado: "01:20:18 a 01:25:29 (5 min 11 s)" },
    { dato: "Verificación", resultado: "01:25:30 a 01:26:25 (55 s)" },
    { dato: "MD5", resultado: "8686d78a8e3313d990e9fed3f8e34d94 (Match)" },
    { dato: "SHA-1", resultado: "d414fa5fb686b3832bac234ce45eb07a40c734c8 (Match)" },
    { dato: "Bloques defectuosos", resultado: "Ninguno" },
];

const analisis = [
    {
        label: "Integridad.",
        text: "Los hashes calculados sobre los fragmentos coinciden con los obtenidos al leer el dispositivo original, tanto en MD5 como en SHA-1. Esto demuestra que la imagen es idéntica a la USB y que no se alteró durante la copia ni al guardarla.",
    },
    {
        label: "Completitud.",
        text: "15,249,408 sectores × 512 bytes equivalen a 7,807,696,896 bytes, es decir los 7,446 MB que reporta FTK Imager, y la verificación no encontró bloques ilegibles. Como es una copia bit a bit, incluye también archivos borrados, espacio no asignado y la tabla de particiones, no solo los archivos visibles.",
    },
    {
        label: "Rendimiento.",
        text: "Se copiaron 7,446 MB en 311 segundos, unos 24 MB/s, una velocidad coherente con una memoria USB 2.0. La verificación tardó 55 s, porque se limita a leer los fragmentos y recalcular los hashes, sin volver a leer el dispositivo.",
    },
    {
        label: "Fragmentación.",
        text: "El valor por defecto de 1500 MB produjo 5 fragmentos: cuatro de 1500 MB y uno final de 1,446 MB. Juntos forman una sola imagen.",
    },
    {
        label: "Trazabilidad.",
        text: "El log registra los datos del caso (Case Number, Evidence Number, Examiner, Notes), el dispositivo, los hashes y las horas de adquisición y verificación. Con eso se documenta quién adquirió qué, cuándo y con qué resultado.",
    },
    {
        label: "Limitación.",
        text: "La adquisición se hizo sin bloqueador de escritura, por lo que el sistema operativo pudo escribir metadatos en la USB antes de la copia. En esta práctica no se analizó el contenido de la imagen.",
    },
];

const lineasInvestigacion = [
    {
        label: "Explorar la imagen.",
        text: "Cargarla en FTK Imager con Add Evidence Item > Image File para identificar la tabla de particiones, el sistema de archivos (FAT32, NTFS) y la estructura de carpetas, sin modificar nada.",
    },
    {
        label: "Recuperar archivos borrados y espacio no asignado.",
        text: "Una copia bit a bit conserva lo que el usuario eliminó. Se pueden buscar documentos relacionados con el caso a través de la técnica de file carving.",
    },
    {
        label: "Analizar metadatos y construir una línea de tiempo.",
        text: "Revisar fechas de creación, modificación y acceso, el autor de documentos y los datos EXIF de imágenes. Ordenarlos cronológicamente y compararlos con la fecha del incidente a analizar.",
    },
    {
        label: "Buscar por palabras clave y patrones.",
        text: "Buscar nombres de instituciones, correos, URLs, nombres de personas o empresas vinculadas al caso.",
    },
    {
        label: "Buscar software malicioso.",
        text: "Revisar ejecutables, scripts, archivos autorun y herramientas como keyloggers o troyanos, y comparar sus hashes con bases de datos de amenazas conocidas.",
    },
    {
        label: "Relacionar el dispositivo con otros equipos.",
        text: "El número de serie de la USB permite rastrear en el registro de Windows en cuáles equipos se conectó, y ligarla con usuarios y fechas.",
    },
    {
        label: "Ampliar la evidencia.",
        text: "Adquirir los equipos asociados, correos y registros de acceso, y esta vez con bloqueador de escritura.",
    },
    {
        label: "Documentar y presentar.",
        text: "Redactar un informe con la cadena de custodia, los hashes, los hallazgos y las limitaciones, de forma que pueda presentarse ante una institución.",
    },
];

function SeverityNote({ children }) {
    return (
        <span className="border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] whitespace-nowrap text-accent uppercase">
            {children}
        </span>
    );
}

function Activity16() {
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
                                Parcial III / Actividad 16
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                La verdad{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    en los bits
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl font-mono text-sm tracking-wide text-accent uppercase">
                                Adquisición forense con FTK Imager
                            </p>

                            <p className="mt-6 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Adquisición de evidencia digital mediante una imagen
                                forense bit a bit, usando AccessData FTK Imager sobre
                                una memoria USB, con verificación de integridad por
                                hash y documentación completa del proceso.
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
                                <dd className="mt-1">FTK Imager</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Formato
                                </dt>
                                <dd className="mt-1">Informe forense</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_act16.pdf"}
                            download="184346_act16.pdf"
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

                        <nav aria-label="Contenido de la Actividad 16" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/activity-16#" + section.id}
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
                                FTK Imager 4.3.1.1 · Kingston DataTraveler (USB)
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 space-y-24 lg:col-span-9">
                    <ActivitySection id="resumen" number="01" title="Resumen">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                El análisis forense digital busca entender la
                                naturaleza de un incidente sin alterar la evidencia
                                original. Su primera fase, la adquisición, exige
                                copias bit a bit obtenidas con herramientas y
                                procedimientos adecuados, de forma que el resultado
                                pueda sostenerse ante un marco legal.
                            </p>
                            <p>
                                Esta práctica, como parte del equipo de
                                especialistas del Laboratorio de Informática
                                Forense, consistió en adquirir una memoria USB con
                                AccessData FTK Imager, documentando cada paso,
                                verificando la integridad de la imagen con hashes
                                MD5 y SHA-1, y analizando los resultados y
                                limitaciones del proceso.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="metodologia" number="02" title="Metodología">
                        <p className="max-w-3xl leading-7 text-muted">
                            La adquisición se realizó desde AccessData FTK Imager
                            4.3.1.1, siguiendo las cinco fases del análisis forense
                            digital (adquisición, preservación, análisis,
                            documentación y presentación), centrada en la primera de
                            ellas.
                        </p>

                        <ol className="mt-8 divide-y divide-border border-y border-border">
                            <li className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                                <span className="font-mono text-xs text-accent">01</span>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Dispositivo de evidencia
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        Memoria USB Kingston DataTraveler 2.0, de 7,446
                                        MB, conectada como{" "}
                                        <code>\\.\PHYSICALDRIVE1</code>, sin
                                        bloqueador de escritura.
                                    </p>
                                </div>
                            </li>
                            <li className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                                <span className="font-mono text-xs text-accent">02</span>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Tipo de copia
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        Physical Drive, formato Raw (dd): copia byte a
                                        byte del dispositivo completo, incluyendo
                                        espacio no asignado y archivos borrados.
                                    </p>
                                </div>
                            </li>
                            <li className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                                <span className="font-mono text-xs text-accent">03</span>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Verificación de integridad
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        Cálculo y comparación de hashes MD5 y SHA-1
                                        entre el dispositivo original y los
                                        fragmentos generados, con{" "}
                                        <code>Verify images after they are created</code>{" "}
                                        activo.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </ActivitySection>

                    <ActivitySection
                        id="procedimiento"
                        number="03"
                        title="Procedimiento"
                    >
                        <ol className="space-y-12">
                            {procedimiento.map((step, index) => (
                                <li key={step.key}>
                                    <p className="max-w-3xl leading-7 text-muted">
                                        <span className="mr-3 font-mono text-xs text-accent">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        {step.text}
                                    </p>
                                    <div className="mt-5 max-w-xl">
                                        <ActivityFigure
                                            src={evidenceSrc(step.key)}
                                            alt={step.text}
                                            number={String(index + 1).padStart(2, "0")}
                                            caption={step.text}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection id="preguntas" number="04" title="Preguntas">
                        <ol className="mt-2 divide-y divide-border border-y border-border">
                            {preguntas.map((item, index) => (
                                <li
                                    key={item.q}
                                    className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]"
                                >
                                    <span className="font-mono text-xs text-accent">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <p className="font-semibold">{item.q}</p>
                                        <p className="mt-2 leading-7 text-muted">{item.a}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection id="resultados" number="05" title="Resultados">
                        <p className="max-w-3xl leading-7 text-muted">
                            La adquisición produjo una imagen Raw (dd) de la USB
                            Kingston DataTraveler 2.0 (S/N 5B0FEC504499), con estos
                            resultados:
                        </p>

                        <div className="mt-8 space-y-4 md:hidden">
                            {resultados.map((row) => (
                                <div
                                    key={row.dato}
                                    className="border border-border bg-surface p-4"
                                >
                                    <SeverityNote>{row.dato}</SeverityNote>
                                    <p className="mt-2 text-sm leading-6 break-all text-muted">
                                        {row.resultado}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 hidden overflow-x-auto border-y border-border md:block">
                            <table className="w-full min-w-[48rem] text-left">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-3 pr-4 font-mono text-xs tracking-wider text-muted uppercase">
                                            Dato
                                        </th>
                                        <th className="py-3 font-mono text-xs tracking-wider text-muted uppercase">
                                            Resultado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultados.map((row) => (
                                        <tr key={row.dato} className="border-b border-border">
                                            <td className="py-3 pr-4 align-top font-mono text-xs whitespace-nowrap text-accent">
                                                {row.dato}
                                            </td>
                                            <td className="py-3 align-top text-sm leading-6 break-all text-muted">
                                                {row.resultado}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="analisis" number="06" title="Análisis">
                        <ul className="max-w-3xl space-y-5 leading-7 text-muted">
                            {analisis.map((item) => (
                                <li key={item.label}>
                                    <span className="font-semibold text-foreground">
                                        {item.label}
                                    </span>{" "}
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </ActivitySection>

                    <ActivitySection
                        id="lineas"
                        number="07"
                        title="Líneas de investigación"
                    >
                        <ol className="max-w-3xl space-y-5 leading-7 text-muted">
                            {lineasInvestigacion.map((item, index) => (
                                <li key={item.label} className="flex gap-3">
                                    <span className="font-mono text-xs text-accent">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span>
                                        <span className="font-semibold text-foreground">
                                            {item.label}
                                        </span>{" "}
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection id="conclusiones" number="08" title="Conclusiones">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Con la práctica se creó una imagen forense bit a bit
                                de una memoria USB Kingston de 7,446 MB, en formato
                                Raw (dd) y con los parámetros indicados: datos del
                                caso, nombre de archivo y fragmentos de 1500 MB. La
                                integridad quedó comprobada con la verificación de
                                los hashes MD5 y SHA-1, que coincidieron con los del
                                dispositivo original (Match), y sin bloques
                                defectuosos, de modo que la copia es completa y fiel.
                            </p>
                            <p>
                                Los hashes son la base de la validez de la
                                evidencia. Permiten demostrar en cualquier momento
                                posterior que la imagen sigue siendo idéntica al
                                original, y por eso son indispensables cuando los
                                resultados se presentan con soporte legal. El
                                formato Raw es universal y ocupa lo mismo que el
                                dispositivo, pero no guarda metadatos propios, así
                                que el archivo de log resulta parte esencial de la
                                evidencia: ahí quedan registrados los datos del
                                caso, el dispositivo, los hashes y las marcas de
                                tiempo. Formatos como E01 integran esa información y
                                la verificación en el propio archivo.
                            </p>
                            <p>
                                La práctica también mostró que la adquisición es la
                                fase crítica del proceso forense, porque lo que se
                                copie y cómo se documente determina todo el análisis
                                posterior. Al no usarse un bloqueador de escritura,
                                el sistema operativo pudo escribir metadatos en la
                                USB, algo que en un caso real no es aceptable. Como
                                siguiente fase, el análisis debe hacerse sobre una
                                copia de la imagen, verificando antes los hashes,
                                para recuperar archivos borrados y examinar
                                metadatos y línea de tiempo en relación con el
                                incidente de fraude bancario.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="recursos" number="09" title="Recursos">
                        <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
                            <ResourceLink
                                href={resourceBase + "/184346_act16.pdf"}
                                type="PDF"
                                title="Informe forense"
                                description="Procedimiento completo, preguntas, resultados, análisis y conclusiones."
                                download="184346_act16.pdf"
                            />
                            <ResourceLink
                                href={resourceBase + "/infocrim_OrtizLopezFrieda.001.txt"}
                                type="TXT"
                                title="Log de adquisición"
                                description="Registro generado por FTK Imager con los datos del caso, el dispositivo, los hashes y las marcas de tiempo."
                                download="infocrim_OrtizLopezFrieda.001.txt"
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Activity16;