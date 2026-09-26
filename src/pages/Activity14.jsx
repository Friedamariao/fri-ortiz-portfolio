import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "concepto", label: "Qué es y por qué importa" },
    { id: "capas", label: "Cinco capas de protección" },
    { id: "riesgos", label: "Riesgo, impacto y mitigación" },
    { id: "reglas", label: "Reglas de oro" },
    { id: "conclusion", label: "Conclusión" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-14";

const layers = [
    {
        number: "01",
        title: "Privacidad y hábitos",
        items: [
            "Leer los términos de servicio",
            "Configurar ajustes de privacidad",
            "Compartir lo mínimo necesario",
        ],
    },
    {
        number: "02",
        title: "Cuenta y autenticación",
        items: [
            "Passphrase de 10+ caracteres con símbolos",
            "Gestor de contraseñas",
            "Autenticación multifactor",
        ],
    },
    {
        number: "03",
        title: "Red",
        items: [
            "SSID y clave propios con WPA2",
            "VPN en Wi-Fi público",
            "Red aislada para dispositivos IoT",
        ],
    },
    {
        number: "04",
        title: "Dispositivo",
        items: [
            "Reglas de firewall activas",
            "Antivirus y antispyware",
            "Actualizaciones al día",
        ],
    },
    {
        number: "05",
        title: "Datos",
        items: [
            "Cifrado de archivos y discos (p. ej. EFS)",
            "Respaldo local + externo + nube",
            "Borrado seguro por sobrescritura",
        ],
        core: true,
    },
];

const risks = [
    {
        risk: "Malware y/o spyware",
        impact: "Robo o alteración de datos",
        mitigation: "Antivirus y sistemas actualizados",
    },
    {
        risk: "Acceso no autorizado",
        impact: "Pérdida de confidencialidad y exposición de información",
        mitigation: "Contraseñas fuertes y MFA",
    },
    {
        risk: "Wi-Fi inseguro y Bluetooth",
        impact: "Interceptación de información",
        mitigation: "Cifrado del tráfico y uso de VPN",
    },
    {
        risk: "Pérdida del dispositivo",
        impact: "Pérdida o exposición de datos",
        mitigation: "Cifrado de disco y respaldo en otra ubicación",
    },
    {
        risk: "Exceso de información compartida",
        impact: "Pérdida de privacidad",
        mitigation: "Revisar configuración de privacidad y compartir con criterio",
    },
];

const passwordRules = [
    "Entre 8 y 64 caracteres, evitando palabras de diccionario y datos personales como la fecha de cumpleaños.",
    "No es necesario cambiarla cada mes: la longitud importa más que la complejidad.",
    "Una passphrase larga y fácil de recordar es más segura que una clave corta y \"rara\".",
];

const encryptionRules = [
    "Cifrar protege el contenido, no evita la intercepción: solo quien tiene la clave puede leerlo.",
    "Un respaldo debe vivir en al menos tres lugares: red local, otra ubicación física y la nube.",
    "Borrado seguro significa sobrescribir el archivo; darle a \"eliminar\" no lo borra de verdad.",
];

const checklist = [
    "Actualiza tus contraseñas.",
    "Activa la autenticación multifactor.",
    "Cifra y respalda tus datos.",
    "Revisa tu configuración de privacidad.",
    "Sé consciente de lo que compartes.",
];

const resources = [
    {
        href: resourceBase + "/184346_act14.pdf",
        type: "PDF",
        title: "Infografía completa",
        description:
            "Versión entregable en formato vertical, con el esquema de capas, la tabla de riesgos y las reglas de oro.",
        download: "184346_act14.pdf",
    },
];

function Activity14() {
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
                                Parcial II / Actividad 14
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                Ciberseguridad en{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    una mirada
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl font-mono text-sm tracking-wide text-accent uppercase">
                                Protección de datos y privacidad
                            </p>

                            <p className="mt-6 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Infografía profesional para el curso Introducción a la
                                Ciberseguridad de Cisco Networking Academy: cinco capas entre
                                tus datos y un atacante, sus riesgos y cómo se mitigan.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                                <dd className="mt-1 text-accent">Completada</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Parcial</dt>
                                <dd className="mt-1">Segundo parcial</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Formato
                                </dt>
                                <dd className="mt-1">Infografía</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Fecha
                                </dt>
                                <dd className="mt-1">25-09-2026</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_act14.pdf"}
                            download="184346_act14.pdf"
                            className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
                        >
                            Descargar infografía
                        </a>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
                <aside className="lg:col-span-3">
                    <div className="border-t border-border pt-5 lg:sticky lg:top-36">
                        <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                            En esta actividad
                        </p>

                        <nav aria-label="Contenido de la Actividad 14" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/activity-14#" + section.id}
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
                                Infografía · Canva · Cisco Networking Academy
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="space-y-24 lg:col-span-9">
                    <ActivitySection
                        id="concepto"
                        number="01"
                        title="Qué es y por qué importa"
                    >
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                La protección de datos y privacidad es el conjunto de hábitos
                                y controles técnicos, de dispositivos, redes y cuentas, que
                                deciden quién puede leer, copiar o usar la información que
                                proporcionamos. Más que un candado sobre un dato puntual, es
                                una cadena tan fuerte como su eslabón más débil.
                            </p>
                            <p>
                                El teléfono y las computadoras concentran identidad, finanzas,
                                conversaciones y ubicación. Cifrar un archivo evita que se lea,
                                pero no evita que se robe; y cuando un dato ya se filtró, no
                                se trata de simplemente "quitarlo" después. La higiene de
                                datos se ejerce antes del incidente, no después.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="capas"
                        number="02"
                        title="Cinco capas entre tus datos y un atacante"
                    >
                        <p className="max-w-3xl leading-7 text-muted">
                            Cada capa depende de que la anterior resista. Si una falla, la
                            siguiente es el único respaldo que queda entre el atacante y el
                            dato.
                        </p>

                        <ol className="mt-8 divide-y divide-border border-y border-border">
                            {layers.map((layer) => (
                                <li
                                    key={layer.number}
                                    className={[
                                        "grid gap-4 py-6 sm:grid-cols-[3rem_1fr]",
                                        layer.core ? "bg-surface px-4 sm:px-6" : "",
                                    ].join(" ")}
                                >
                                    <span className="font-mono text-xs text-accent">
                                        {layer.number}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold">{layer.title}</h3>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {layer.items.map((item) => (
                                                <span
                                                    key={item}
                                                    className="border border-border bg-background px-3 py-1 text-xs leading-5 text-muted"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection
                        id="riesgos"
                        number="03"
                        title="Riesgo, impacto y mitigación"
                    >
                        <div className="overflow-x-auto border-y border-border">
                            <table className="w-full min-w-[42rem] text-left">
                                <thead className="font-mono text-xs tracking-wider text-muted uppercase">
                                    <tr>
                                        <th className="px-4 py-4 font-normal">Riesgo</th>
                                        <th className="px-4 py-4 font-normal">Impacto</th>
                                        <th className="px-4 py-4 font-normal">Mitigación</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {risks.map((row) => (
                                        <tr key={row.risk}>
                                            <td className="px-4 py-4 align-top font-semibold">
                                                {row.risk}
                                            </td>
                                            <td className="px-4 py-4 align-top text-muted">
                                                {row.impact}
                                            </td>
                                            <td className="px-4 py-4 align-top text-muted">
                                                {row.mitigation}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="reglas"
                        number="04"
                        title="Reglas de oro conforme a NIST"
                    >
                        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                            <article className="bg-background p-6">
                                <h3 className="text-lg font-semibold">Una buena contraseña</h3>
                                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted">
                                    {passwordRules.map((rule) => (
                                        <li key={rule}>{rule}</li>
                                    ))}
                                </ul>
                            </article>

                            <article className="bg-background p-6">
                                <h3 className="text-lg font-semibold">Cifrado y respaldo</h3>

                                <div className="mt-5 flex flex-col items-center gap-3 font-mono text-[0.7rem] sm:flex-row sm:justify-center sm:gap-5">
                                    <span className="border border-border bg-surface px-4 py-2 text-center text-muted">
                                        Datos legibles
                                    </span>
                                    <span className="flex flex-col items-center leading-tight text-accent">
                                        <span>cifrado →</span>
                                        <span>← con la clave</span>
                                    </span>
                                    <span className="border border-border bg-surface px-4 py-2 text-center text-muted">
                                        Datos ilegibles
                                    </span>
                                </div>

                                <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-muted">
                                    {encryptionRules.map((rule) => (
                                        <li key={rule}>{rule}</li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="conclusion" number="05" title="Conclusión">
                        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
                            <p>
                                La higiene de datos nunca termina: debe ser un hábito diario.
                                Un firewall activo no sirve de nada si la contraseña de la
                                cuenta es <code>admin123</code>, pero tampoco existe una
                                contraseña perfecta que proteja un archivo sin cifrar en una
                                red pública. Se trata de ser consciente de lo que hacemos y de
                                la información que compartimos, en vez de esperar a que algo
                                salga mal para tomarlo en serio.
                            </p>
                        </div>

                        <ol className="mt-8 max-w-2xl divide-y divide-border border-y border-border">
                            {checklist.map((item, index) => (
                                <li
                                    key={item}
                                    className="grid gap-3 py-4 sm:grid-cols-[3rem_1fr]"
                                >
                                    <span className="font-mono text-xs text-accent">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="leading-7 text-muted">{item}</span>
                                </li>
                            ))}
                        </ol>

                        <p className="mt-8 max-w-3xl text-xs leading-6 text-muted">
                            Referencia: Cisco Networking Academy.{" "}
                            <em>
                                Introducción a la Ciberseguridad, Módulo 3: Protegiendo sus
                                datos y su privacidad.
                            </em>
                        </p>
                    </ActivitySection>

                    <ActivitySection id="recursos" number="06" title="Recursos">
                        <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
                            {resources.map((resource) => (
                                <ResourceLink key={resource.href} {...resource} />
                            ))}
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Activity14;