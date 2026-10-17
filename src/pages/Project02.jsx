import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ResourceLink from "../components/activities/ResourceLink";

const resourceBase = import.meta.env.BASE_URL + "resources/project-02";
const zipFileName = "OrtizLopezFriedaMaria-PR02.zip";

const pageSections = [
    { id: "introduccion", label: "Introducción" },
    { id: "entorno", label: "El entorno" },
    { id: "perspectivas", label: "Dos perspectivas" },
    { id: "objetivos", label: "Objetivos" },
    { id: "reglas", label: "Alcance y reglas" },
    { id: "resultado", label: "Resultado en el laboratorio" },
    { id: "entregables", label: "Entregables" },
    { id: "recursos", label: "Descarga" },
];

const labComponents = [
    {
        name: "Plataforma INTERAFAS",
        detail:
            "Aplicación web de gestión en PHP, con base de datos MariaDB, desplegada en contenedores Docker. Concentra expedientes, contratos, pagos y proveedores.",
    },
    {
        name: "API de INTERAFAS",
        detail:
            "Servicio que expone el contexto de cuenta y otras funciones de la plataforma a otros módulos.",
    },
    {
        name: "Módulo de operaciones y red OT",
        detail:
            "Conecta la plataforma con una red operacional simulada, con su panel HMI y un flujo de actualización de firmware. Todo el impacto físico es simulado.",
    },
    {
        name: "Pulso Metropolitano",
        detail:
            "Portal de noticias ficticio que cubre el incidente mientras evoluciona. Aporta la cobertura mediática y las reacciones públicas.",
    },
    {
        name: "Auditor",
        detail:
            "Plataforma del laboratorio donde se registra el intento, se validan las banderas y se exporta la bitácora de actividad.",
    },
];

const rules = [
    {
        label: "Objetivo autorizado",
        value: "Únicamente la aplicación INTERAFAS, dentro del entorno de laboratorio.",
    },
    {
        label: "Periodo",
        value: "Del 3 al 10 de octubre de 2026.",
    },
    {
        label: "Fuera del ejercicio",
        value:
            "Denegación de servicio, ingeniería social y cambios sobre la infraestructura subyacente.",
    },
    {
        label: "Datos",
        value: "Sintéticos. No se probó ningún sistema en producción.",
    },
    {
        label: "Trazabilidad",
        value:
            "Toda la actividad queda registrada en la bitácora del laboratorio, que se exporta al cierre.",
    },
];

const difficultyLevels = [
    { level: 1, flags: 2 },
    { level: 2, flags: 4 },
    { level: 3, flags: 4 },
    { level: 4, flags: 7 },
    { level: 5, flags: 3 },
];

const maxFlagsPerLevel = Math.max(...difficultyLevels.map((item) => item.flags));

const categories = [
    "Exposición de información",
    "Control de acceso",
    "Inyección",
    "Archivos",
    "Sesiones",
    "API",
    "Lógica de negocio",
    "Arquitectura",
    "IT → OT",
    "Firmware simulado",
];

const deliverables = [
    {
        number: "01",
        name: "Bitácora del laboratorio",
        file: "01.matricula.zip",
        description:
            "Archivo que genera INTERAFAS-LAB al terminar, con los logs y evidencias del recorrido.",
    },
    {
        number: "02",
        name: "Informe de seguridad ofensiva",
        file: "InformeSeguridadOfensiva.pdf",
        description: "Documentación de las 20 vulnerabilidades identificadas.",
    },
    {
        number: "03",
        name: "Propuesta de gobernanza ISO/IEC 27001",
        file: "ISO27.pdf",
        description:
            "Propuesta de gobernanza y seguridad de la información a partir de los hallazgos.",
    },
    {
        number: "04",
        name: "Plan de comunicación de crisis",
        file: "PlanComunicacionCrisis.pdf",
        description:
            "Plan institucional para comunicar durante un incidente de ciberseguridad.",
    },
    {
        number: "05",
        name: "Plan de respuesta ante incidentes",
        file: "PlanRespuestaAnteIncidentes.pdf",
        description:
            "Estrategia y procedimientos de INTERAFAS para responder a incidentes.",
    },
];

function Paragraphs({ children }) {
    return (
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
            {children}
        </div>
    );
}

function Project02() {
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

                if (visibleEntry) setActiveSection(visibleEntry.target.id);
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
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-accent"
                    >
                        Volver a actividades
                    </Link>

                    <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                                Parcial II / Proyecto 02
                            </p>
                            <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                Blindando la{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    información
                                </span>
                            </h1>
                            <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Gobernanza y cumplimiento sobre INTERAFAS-LAB, un entorno
                                académico que simula una organización de infraestructura
                                crítica atravesando una cadena de incidentes.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                                <dd className="mt-1 text-accent">Completo</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                                <dd className="mt-1">Proyecto P2</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Entorno
                                </dt>
                                <dd className="mt-1">INTERAFAS-LAB</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Rol</dt>
                                <dd className="mt-1">Auditor de seguridad</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={`${resourceBase}/${zipFileName}`}
                            download={zipFileName}
                            className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
                        >
                            Descargar paquete (ZIP)
                        </a>
                        <Link
                            to="/activities/project-02#entorno"
                            className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
                        >
                            Ver contexto del laboratorio
                        </Link>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
                <aside className="lg:col-span-3">
                    <div className="border-t border-border pt-5 lg:sticky lg:top-36">
                        <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                            En este proyecto
                        </p>
                        <nav aria-label="Contenido del Proyecto 02" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={`/activities/project-02#${section.id}`}
                                            aria-current={
                                                activeSection === section.id ? "location" : undefined
                                            }
                                            className={[
                                                "grid min-h-10 grid-cols-[2rem_1fr] items-center border-l pl-3 text-sm transition-[color,border-color,transform] duration-200",
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
                                Marcos de referencia
                            </p>
                            <p className="mt-3 text-sm leading-6 text-muted">
                                ISO/IEC 27001 · Playbooks de respuesta a incidentes de CISA ·
                                PTES · OWASP · CVSS v3.1
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="space-y-24 lg:col-span-9">
                    <ActivitySection id="introduccion" number="01" title="Introducción">
                        <Paragraphs>
                            <p>
                                El Proyecto 02 cierra el segundo parcial, dedicado a los
                                sistemas de gestión de la seguridad. A diferencia del primer
                                proyecto, donde el reto era comprometer una máquina, aquí la
                                pregunta es qué debería tener una organización para que algo
                                así no le pase, o para que le cueste mucho menos cuando le
                                pase.
                            </p>
                            <p>
                                El trabajo parte de un laboratorio práctico en el que se
                                identifican y comprueban vulnerabilidades dentro de una
                                organización ficticia, y de ahí se pasa a diseñar los
                                documentos de gobernanza, comunicación y respuesta que la
                                organización necesitaba.
                            </p>
                            <p>
                                Esta página describe el contexto del laboratorio y reúne todo
                                el trabajo en un solo paquete descargable. El procedimiento
                                técnico y el contenido de cada documento se encuentran dentro
                                del paquete.
                            </p>
                        </Paragraphs>
                    </ActivitySection>

                    <ActivitySection
                        id="entorno"
                        number="02"
                        title="INTERAFAS-LAB: el entorno"
                    >
                        <Paragraphs>
                            <p>
                                INTERAFAS-LAB representa a una organización ficticia
                                responsable de servicios de infraestructura crítica. El
                                escenario integra aplicaciones web, APIs, bases de datos,
                                procesos administrativos, medios de comunicación y componentes
                                operacionales simulados, de modo que un mismo incidente se
                                puede analizar desde lo técnico, lo organizacional y lo
                                estratégico.
                            </p>
                            <p>
                                El laboratorio está formado por cinco componentes que se
                                ejecutan juntos:
                            </p>
                        </Paragraphs>

                        <ul className="mt-8 grid gap-4 md:grid-cols-2">
                            {labComponents.map((component) => (
                                <li
                                    key={component.name}
                                    className="border border-border bg-background p-5"
                                >
                                    <h3 className="text-lg font-semibold">{component.name}</h3>
                                    <p className="mt-2 text-sm leading-6 text-muted">
                                        {component.detail}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </ActivitySection>

                    <ActivitySection
                        id="perspectivas"
                        number="03"
                        title="Dos perspectivas sobre el mismo incidente"
                    >
                        <Paragraphs>
                            <p>
                                El proyecto se recorre en dos papeles consecutivos. Primero
                                como <strong>auditor de seguridad</strong>: se identifican
                                vulnerabilidades, se recopilan evidencias y se analiza el
                                impacto de una cadena progresiva de incidentes, que empieza
                                con fallas de poca complejidad y termina en el entorno
                                operacional simulado.
                            </p>
                            <p>
                                Después se adopta la perspectiva de{" "}
                                <strong>gobernanza y gestión de crisis</strong>. Con lo
                                encontrado en la auditoría, la cobertura de los medios, las
                                reacciones al incidente y los cambios que se observan dentro de
                                la organización, se proponen controles, responsabilidades,
                                mecanismos de comunicación y procedimientos de respuesta.
                            </p>
                            <p>
                                La idea de fondo es que una debilidad que parece aislada puede
                                ser una pieza de una cadena de ataque, y que un incidente
                                tecnológico puede crecer hasta volverse una crisis operacional
                                y reputacional.
                            </p>
                        </Paragraphs>
                    </ActivitySection>

                    <ActivitySection id="objetivos" number="04" title="Objetivos">
                        <Paragraphs>
                            <p>
                                <strong>Objetivo general.</strong> Evaluar la postura de
                                ciberseguridad y la capacidad de respuesta de una organización
                                de infraestructura crítica, combinando evidencia técnica y
                                mediática con mecanismos de gobernanza, comunicación de crisis
                                y respuesta ante incidentes.
                            </p>
                            <p>
                                <strong>Técnico.</strong> Identificar, comprobar y documentar
                                20 vulnerabilidades, con sus banderas, logs y evidencias, y
                                determinar su causa, su impacto y su relación con otros
                                eventos de la cadena de ataque.
                            </p>
                            <p>
                                <strong>Organizacional.</strong> Relacionar esos hallazgos con
                                la evolución del incidente, la cobertura de los medios y las
                                decisiones de la crisis, para detectar deficiencias de
                                gobernanza, de responsabilidades y de comunicación
                                institucional.
                            </p>
                            <p>
                                <strong>Propositivo.</strong> Proponer controles y
                                procedimientos con base en ISO/IEC 27001, un plan de
                                comunicación de crisis y un plan de respuesta ante incidentes
                                con playbooks que cubran preparación, análisis, contención,
                                remediación, recuperación, comunicación y lecciones
                                aprendidas.
                            </p>
                        </Paragraphs>
                    </ActivitySection>

                    <ActivitySection id="reglas" number="05" title="Alcance y reglas">
                        <Paragraphs>
                            <p>
                                El ejercicio se hizo con autorización y con reglas acordadas
                                de antemano, que fijan qué se puede probar y qué no.
                            </p>
                        </Paragraphs>

                        <dl className="mt-8 divide-y divide-border border-y border-border">
                            {rules.map((rule) => (
                                <div
                                    key={rule.label}
                                    className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
                                >
                                    <dt className="font-mono text-xs tracking-wider text-accent uppercase">
                                        {rule.label}
                                    </dt>
                                    <dd className="text-sm leading-6 text-muted sm:text-base">
                                        {rule.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </ActivitySection>

                    <ActivitySection
                        id="resultado"
                        number="06"
                        title="Resultado en el laboratorio"
                    >
                        <Paragraphs>
                            <p>
                                El laboratorio reparte las vulnerabilidades en 20 banderas con
                                dificultad creciente, del nivel 1 al 5. Las primeras son de
                                exposición simple y las últimas llegan al impacto simulado
                                sobre la red operacional. Se registraron las 20, con el
                                puntaje máximo.
                            </p>
                        </Paragraphs>

                        <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-border py-6 md:grid-cols-4">
                            <div>
                                <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                                    Banderas
                                </dt>
                                <dd className="mt-2 text-3xl font-semibold">20 / 20</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                                    Puntaje
                                </dt>
                                <dd className="mt-2 text-3xl font-semibold">65 / 65</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                                    Sistemas
                                </dt>
                                <dd className="mt-2 text-3xl font-semibold">6</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                                    Periodo
                                </dt>
                                <dd className="mt-2 text-3xl font-semibold">3–10 oct</dd>
                            </div>
                        </dl>

                        <div className="mt-10 grid gap-10 md:grid-cols-2">
                            <div>
                                <h3 className="font-mono text-xs tracking-wider text-accent uppercase">
                                    Banderas por nivel de dificultad
                                </h3>
                                <ul className="mt-5 space-y-3">
                                    {difficultyLevels.map((item) => (
                                        <li
                                            key={item.level}
                                            className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-3 text-sm"
                                        >
                                            <span className="font-mono text-xs text-muted">
                                                Nivel {item.level}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="block h-2 bg-surface"
                                            >
                                                <span
                                                    className="block h-full bg-accent"
                                                    style={{
                                                        width: `${(item.flags / maxFlagsPerLevel) * 100}%`,
                                                    }}
                                                />
                                            </span>
                                            <span className="text-right font-mono text-xs">
                                                {item.flags}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-mono text-xs tracking-wider text-accent uppercase">
                                    Categorías que cubre
                                </h3>
                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <li
                                            key={category}
                                            className="border border-border px-3 py-1.5 text-sm text-muted"
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="entregables" number="07" title="Entregables">
                        <Paragraphs>
                            <p>
                                El proyecto produce cinco entregables, que se entregan juntos
                                en un solo archivo comprimido.
                            </p>
                        </Paragraphs>

                        <ol className="mt-8 divide-y divide-border border-y border-border">
                            {deliverables.map((item) => (
                                <li
                                    key={item.number}
                                    className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] sm:gap-4"
                                >
                                    <span className="font-mono text-xs text-accent">
                                        {item.number}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="mt-1 text-sm leading-6 text-muted">
                                            {item.description}
                                        </p>
                                        <p className="mt-2 font-mono text-xs text-muted">
                                            {item.file}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection id="recursos" number="08" title="Descarga">
                        <Paragraphs>
                            <p>
                                El paquete incluye los cinco entregables. El detalle técnico
                                de cada hallazgo y el contenido de los documentos están
                                únicamente dentro del archivo.
                            </p>
                        </Paragraphs>

                        <div className="mt-8">
                            <ResourceLink
                                href={`${resourceBase}/${zipFileName}`}
                                download={zipFileName}
                                type="ZIP"
                                title="Paquete completo del Proyecto 02"
                                description="Bitácora del laboratorio, informe de seguridad ofensiva, propuesta ISO/IEC 27001, plan de comunicación de crisis y plan de respuesta ante incidentes."
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Project02;