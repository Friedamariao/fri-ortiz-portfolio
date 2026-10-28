import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ActivityFigure from "../components/activities/ActivityFigure";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "resumen", label: "Resumen" },
    { id: "metodologia", label: "Metodología" },
    { id: "parte-1", label: "Parte I · Documento" },
    { id: "parte-2", label: "Parte II · Fotografía" },
    { id: "hallazgos", label: "Hallazgos" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-15";

const evidenceModules = import.meta.glob("../assets/activity-15/*.png", {
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

function EvidenceGrid({ items }) {
    const gridClassName =
        items.length > 1 ? "grid gap-x-6 md:grid-cols-2" : "grid";

    return (
        <div className={gridClassName}>
            {items.map(([key, caption], index) => (
                <ActivityFigure
                    key={key}
                    src={evidenceSrc(key)}
                    alt={caption}
                    number={String(index + 1).padStart(2, "0")}
                    caption={caption}
                />
            ))}
        </div>
    );
}

function AnswerCrop({ src, alt }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (!isPreviewOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsPreviewOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isPreviewOpen]);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="block max-w-xs cursor-zoom-in border border-border bg-surface p-2 transition-colors duration-200 hover:border-accent"
                aria-label={"Ampliar captura: " + alt}
            >
                <img src={src} alt={alt} loading="lazy" className="h-auto w-full" />
            </button>

            {isPreviewOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={"Vista previa: " + alt}
                    onClick={() => setIsPreviewOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-10"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
                >
                    <button
                        type="button"
                        onClick={() => setIsPreviewOpen(false)}
                        aria-label="Cerrar vista previa"
                        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center border border-background/40 text-background/70 transition-colors hover:border-background hover:text-background sm:top-8 sm:right-8"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>

                    <img
                        src={src}
                        alt={alt}
                        onClick={(event) => event.stopPropagation()}
                        className="max-h-full max-w-full cursor-default border border-background/20 object-contain"
                    />
                </div>
            )}
        </>
    );
}

const parteUno = [
    {
        q: "¿Cómo categorizó el archivo INTERPOL?",
        a: "Fue categorizado como Unclassified, en el campo InterpolClassification.",
        field: "InterpolClassification",
        crops: ["p1-classification-template"],
    },
    {
        q: "¿Qué template fue utilizado para la elaboración del archivo por parte de INTERPOL?",
        a: "El template G03 Basic Doc SP.dotx, identificado en el campo Template.",
        field: "Template",
        crops: ["p1-classification-template", "p1-template-edittime"],
    },
    {
        q: "¿Cuál fue el tiempo total de edición del fichero?",
        a: "45 minutos, identificado en el campo Total Edit Time.",
        field: "Total Edit Time",
        crops: ["p1-template-edittime"],
    },
    {
        q: "Identifique la compañía propietaria del fichero.",
        a: "OIPC – INTERPOL, identificado en el campo Company.",
        field: "Company",
        crops: ["p1-company"],
    },
    {
        q: "¿Quién realizó la última modificación del fichero?",
        a: "Carolyn Lejeune, identificado en el campo Last Modified By.",
        field: "Last Modified By",
        crops: ["p1-creator-lastmodified"],
    },
    {
        q: "¿Cuál fue la fecha de creación del fichero en investigación?",
        a: "El 3 de mayo del 2019, a las 3:35 PM, identificado en el campo Create Date.",
        field: "Create Date",
        crops: ["p1-createdate"],
    },
    {
        q: "De acuerdo al análisis de metadatos del fichero de INTERPOL, identifique el creador del mismo.",
        a: "Carolyn Lejeune, identificado en el campo Creator.",
        field: "Creator",
        crops: ["p1-creator-lastmodified"],
    },
];

const parteDos = [
    {
        q: "¿Cuál fue la apertura ISO utilizada?",
        a: "Se utilizó una apertura ISO de 100, ubicado en el campo ISO.",
        field: "ISO",
        crops: ["p2-iso"],
    },
    {
        q: "¿Cuál es la longitud focal de la cámara con la que fue capturada la imagen?",
        a: "La longitud focal fue de 3.8 mm, ubicado en el campo Focal Length.",
        field: "Focal Length",
        crops: ["p2-focal-flash"],
    },
    {
        q: "¿Se utilizó captura con flash para obtener la imagen?",
        a: "No, el flash no se activó; esto se ve en el campo Flash.",
        field: "Flash",
        crops: ["p2-focal-flash"],
    },
    {
        q: "Señale la fecha de creación del archivo.",
        a: "La fecha de creación fue el 28 de mayo del 2020, a las 6:11 PM con 41 segundos, visible en el campo Create Date.",
        field: "Create Date",
        crops: ["p2-createdate"],
    },
    {
        q: "Identifique los datos de ubicación GPS y señale el lugar exacto donde se tomó la fotografía.",
        a: "Latitud 51° 15' 12.99\" N, longitud 0° 32' 21.93\" W (decimal: 51.253610, -0.539426), altitud 96.7 m. Al ubicar las coordenadas en Google Maps, la fotografía fue tomada en una zona residencial de Merrow, Guildford, Surrey, Reino Unido.",
        field: "GPS Position",
        crops: ["p2-gps", "p2-maps-wide", "p2-maps-zoom"],
    },
    {
        q: "Elimine todos los metadatos de la muestra analizada y verifique el resultado.",
        a: 'Se creó una copia XiaomiMiA2Lite_limpia.jpg y se ejecutó exiftool -all= sobre ella, confirmando "1 image files updated". Al verificar con ExifTool, solo quedan los datos propios del archivo (tipo, dimensiones, codificación) y el tamaño pasó de 15 kB a 251 bytes.',
        field: "exiftool -all=",
        crops: ["p2-cleanup"],
    },
];

const archivoEvidence = [
    ["fig-01", "Contenido de la carpeta infocrim con los archivos de la muestra"],
    [
        "fig-02",
        "Metadatos del documento WOA database application form.docx extraídos con ExifTool",
    ],
    [
        "fig-03",
        "Metadatos del documento WOA database application form.docx: campos de plantilla, edición, compañía y autoría",
    ],
];

const imagenEvidence = [
    [
        "fig-04",
        "Metadatos de la fotografía XiaomiMiA2Lite.jpg: datos de cámara, exposición y fechas",
    ],
    ["fig-05", "Metadatos de la fotografía XiaomiMiA2Lite.jpg: datos de ubicación GPS"],
    ["fig-06", "Ubicación de las coordenadas GPS en Google Maps"],
    ["fig-07", "Acercamiento de la ubicación en Google Maps (Merrow, Guildford, Surrey)"],
    [
        "fig-08",
        "Eliminación de los metadatos de la copia XiaomiMiA2Lite_limpia.jpg y verificación",
    ],
];

function SeverityNote({ children }) {
    return (
        <span className="border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] whitespace-nowrap text-accent uppercase">
            {children}
        </span>
    );
}

function QAList({ items }) {
    return (
        <ol className="mt-8 divide-y divide-border border-y border-border">
            {items.map((item, index) => (
                <li key={item.field} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
                    <span className="font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                        <p className="font-semibold">{item.q}</p>
                        <p className="mt-2 leading-7 text-muted">{item.a}</p>
                        <div className="mt-3">
                            <SeverityNote>{item.field}</SeverityNote>
                        </div>
                        {item.crops && item.crops.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                                {item.crops.map((key) => (
                                    <AnswerCrop
                                        key={key}
                                        src={evidenceSrc(key)}
                                        alt={"Captura de respuesta: " + item.field}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}

function Activity15() {
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
                                Parcial III / Actividad 15
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                La fotografía{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    como testigo
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl font-mono text-sm tracking-wide text-accent uppercase">
                                Extracción de metadatos GPS para geolocalización
                            </p>

                            <p className="mt-6 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Análisis forense de metadatos con ExifTool sobre dos
                                muestras de investigación: un documento de INTERPOL
                                (<code>.docx</code>) y una fotografía (<code>.jpg</code>)
                                con información de ubicación GPS, incluyendo la
                                eliminación y verificación de dichos metadatos.
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
                                <dd className="mt-1">ExifTool</dd>
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
                            href={resourceBase + "/OrtizLopezFriedaMaría-ACT15.pdf"}
                            download="OrtizLopezFriedaMaría-ACT15.pdf"
                            className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
                        >
                            Descargar informe
                        </a>
                        <a
                            href="#parte-1"
                            className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                        >
                            Ver análisis
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

                        <nav aria-label="Contenido de la Actividad 15" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/activity-15#" + section.id}
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
                                ExifTool · PowerShell · Google Maps
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 space-y-24 lg:col-span-9">
                    <ActivitySection id="resumen" number="01" title="Resumen">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                Toda fotografía digital carga, además de la imagen,
                                un registro silencioso de cómo y dónde fue tomada:
                                cámara, exposición, fecha y, con frecuencia,
                                coordenadas GPS exactas. Este ejercicio forense parte
                                de dos muestras de investigación (un documento de
                                INTERPOL y una fotografía) y usa ExifTool para
                                extraer esos metadatos, responder preguntas de
                                investigación a partir de ellos y, finalmente,
                                sanear la muestra eliminándolos.
                            </p>
                            <p>
                                El resultado evidencia por qué una fotografía puede
                                "testificar" involuntariamente la ubicación de quien
                                la tomó, y por qué la limpieza de metadatos es un
                                paso obligatorio antes de compartir evidencia o
                                contenido sensible.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="metodologia" number="02" title="Metodología">
                        <p className="max-w-3xl leading-7 text-muted">
                            Todo el análisis se realizó desde PowerShell, invocando
                            ExifTool directamente sobre cada muestra y, en el caso de
                            la fotografía, repitiendo la extracción sobre una copia
                            saneada para verificar la eliminación de los metadatos.
                        </p>

                        <ol className="mt-8 divide-y divide-border border-y border-border">
                            <li className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                                <span className="font-mono text-xs text-accent">01</span>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Documento INTERPOL
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        <code>WOA database application form.docx</code>,
                                        metadatos extraídos con{" "}
                                        <code>exiftool.exe "WOA database application form.docx"</code>.
                                    </p>
                                </div>
                            </li>
                            <li className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                                <span className="font-mono text-xs text-accent">02</span>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Fotografía con GPS
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        <code>XiaomiMiA2Lite.jpg</code>, metadatos
                                        extraídos con{" "}
                                        <code>exiftool.exe XiaomiMiA2Lite.jpg</code>, incluyendo
                                        geolocalización GPS cruzada con Google Maps.
                                    </p>
                                </div>
                            </li>
                            <li className="grid gap-4 py-6 sm:grid-cols-[3rem_1fr]">
                                <span className="font-mono text-xs text-accent">03</span>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Saneamiento y verificación
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        Copia de la fotografía (
                                        <code>XiaomiMiA2Lite_limpia.jpg</code>) y
                                        eliminación total de metadatos con{" "}
                                        <code>exiftool.exe -all= XiaomiMiA2Lite_limpia.jpg</code>,
                                        verificada con una segunda extracción.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </ActivitySection>

                    <ActivitySection
                        id="parte-1"
                        number="03"
                        title="Parte I · Metadatos del documento"
                    >
                        <p className="max-w-3xl leading-7 text-muted">
                            Se ejecutó{" "}
                            <code>exiftool.exe "WOA database application form.docx"</code>,
                            que devolvió en la salida los metadatos del archivo
                            docx.
                        </p>

                        <QAList items={parteUno} />

                        <div className="mt-10">
                            <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                                Evidencia
                            </p>
                            <EvidenceGrid items={archivoEvidence} />
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="parte-2"
                        number="04"
                        title="Parte II · Metadatos de la fotografía"
                    >
                        <p className="max-w-3xl leading-7 text-muted">
                            Se ejecutó <code>exiftool.exe XiaomiMiA2Lite.jpg</code>,
                            que devolvió en la salida los metadatos del archivo jpg.
                        </p>

                        <QAList items={parteDos} />

                        <div className="mt-10">
                            <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                                Evidencia
                            </p>
                            <EvidenceGrid items={imagenEvidence} />
                        </div>
                    </ActivitySection>

                    <ActivitySection id="hallazgos" number="05" title="Hallazgos">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                El documento de INTERPOL expuso, sin intención,
                                quién lo creó y editó por última vez, qué plantilla
                                institucional se usó y cuánto tiempo se invirtió en
                                su edición: suficiente para reconstruir parte del
                                flujo de trabajo interno detrás de un archivo
                                aparentemente anónimo.
                            </p>
                            <p>
                                La fotografía fue más reveladora todavía: sus
                                metadatos EXIF ubicaron, con precisión de segundos de
                                arco, el punto exacto donde fue tomada: una zona
                                residencial de Merrow, Guildford, Reino Unido, algo
                                que ningún observador podría deducir de la imagen en
                                sí. Esto confirma que compartir una fotografía sin
                                sanear sus metadatos equivale a compartir, junto con
                                ella, la ubicación de quien la tomó.
                            </p>
                            <p>
                                El comando <code>exiftool -all=</code> redujo el
                                archivo de 15 kB a 251 bytes, dejando únicamente los
                                datos intrínsecos del propio archivo (tipo,
                                dimensiones, codificación): la eliminación de
                                metadatos es efectiva y verificable, y debería ser un
                                paso estándar antes de publicar o transferir
                                cualquier imagen sensible.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="recursos" number="06" title="Recursos">
                        <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
                            <ResourceLink
                                href={resourceBase + "/OrtizLopezFriedaMaría-ACT15.pdf"}
                                type="PDF"
                                title="Informe forense"
                                description="Análisis completo de metadatos de ambas muestras, con procedimiento y evidencia."
                                download="OrtizLopezFriedaMaría-ACT15.pdf"
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Activity15;
