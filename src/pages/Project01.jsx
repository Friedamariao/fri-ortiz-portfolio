import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";

const imageModules = import.meta.glob("../assets/project-01/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const image = (number) =>
  imageModules[`../assets/project-01/image${number}.png`];

const pageSections = [
  { id: "introduccion", label: "Introducción" },
  { id: "entorno", label: "Entorno de laboratorio" },
  { id: "descubrimiento", label: "Descubrimiento" },
  { id: "escaneo", label: "Puertos y servicios" },
  { id: "enumeracion", label: "Enumeración web" },
  { id: "vulnerabilidades", label: "Vulnerabilidades" },
  { id: "autenticacion", label: "Registro y JWT" },
  { id: "explotacion", label: "Command injection" },
  { id: "pendientes", label: "Próximos pasos" },
];

const evidenceGroups = {
  environment: [
    [1, "Configuración del primer adaptador de Kali Linux en modo NAT."],
    [2, "Segundo adaptador de Kali Linux conectado a la red Host-Only."],
    [3, "Interfaz Host-Only configurada en la máquina vulnerable SnakeOil."],
  ],
  discovery: [
    [4, "Identificación de las interfaces y direcciones IP de Kali Linux."],
    [5, "Descubrimiento de hosts activos mediante netdiscover sobre eth1."],
  ],
  scan: [[6, "Escaneo completo de puertos y detección de versiones con Nmap."]],
  enumeration: [
    [7, "Petición manual al servidor nginx del puerto 80."],
    [8, "Respuesta HTTP de la aplicación disponible en el puerto 8080."],
    [9, "Aplicación Snake Oil explorada desde el navegador."],
    [10, "Publicación que revela el uso de Flask y flask-jwt-extended."],
  ],
  vulnerabilities: [
    [11, "Enumeración de directorios y endpoints mediante Gobuster."],
    [12, "Comprobación individual de las rutas descubiertas."],
    [13, "Endpoint /users exponiendo información de las cuentas."],
  ],
  authentication: [
    [14, "Registro de un usuario propio mediante una petición POST."],
    [15, "Petición de autenticación preparada en Burp Suite Repeater."],
    [16, "Respuesta del servidor con un access token en formato JWT."],
  ],
  exploitation: [
    [17, "Primera solicitud al endpoint /run para identificar sus parámetros."],
    [18, "Respuesta que indica el formato esperado por el endpoint."],
    [19, "Petición a /run con una URL local como parámetro."],
    [20, "Respuesta que solicita una llave secreta adicional."],
    [21, "Prueba de acceso a /secret mediante el encabezado Authorization."],
    [22, "JWT enviado como cookie access_token_cookie."],
    [23, "Respuesta válida del endpoint /secret con la llave requerida."],
    [24, "Nueva petición a /run utilizando la llave obtenida."],
    [25, "Respuesta que evidencia la ejecución interna de curl."],
  ],
};

function EvidenceGrid({ items, start }) {
  return (
    <div className="grid gap-x-6 md:grid-cols-2">
      {items.map(([imageNumber, caption], index) => (
        <ActivityFigure
          key={imageNumber}
          src={image(imageNumber)}
          alt={caption}
          number={String(start + index).padStart(2, "0")}
          caption={caption}
          className="max-w-none"
        />
      ))}
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="my-6 overflow-x-auto border border-border bg-foreground p-5 font-mono text-sm leading-7 text-background">
      <code>{children}</code>
    </pre>
  );
}

function Project01() {
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
                Parcial I / Proyecto 01
              </p>
              <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                De la teoría a la{" "}
                <span className="font-serif font-normal italic text-accent">
                  práctica
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Walkthrough técnico de reconocimiento, enumeración y análisis de
                vulnerabilidades sobre la máquina virtual SnakeOil.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                <dd className="mt-1 text-accent">Completo</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Nivel</dt>
                <dd className="mt-1">Proyecto P1</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Atacante
                </dt>
                <dd className="mt-1">Kali Linux</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Objetivo
                </dt>
                <dd className="mt-1">SnakeOil</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="border-t border-border pt-5 lg:sticky lg:top-36">
            <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
              En este walkthrough
            </p>
            <nav aria-label="Contenido del Proyecto 01" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={`/activities/project-01#${section.id}`}
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
                Herramientas
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                VirtualBox · Kali Linux · netdiscover · Nmap · curl · Gobuster ·
                Burp Suite
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-24 lg:col-span-9">
          <ActivitySection id="introduccion" number="01" title="Introducción">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Este proyecto aplica una metodología de pruebas de penetración
                sobre una máquina virtual vulnerable. El objetivo es reconocer
                el sistema, enumerar los servicios disponibles, analizar
                posibles vulnerabilidades y documentar el procedimiento técnico.
              </p>
              <p>
                El trabajo se desarrolla exclusivamente en un laboratorio
                aislado y sobre la máquina SnakeOil distribuida con fines de
                aprendizaje. Los resultados presentados corresponden al avance
                actual del walkthrough.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="entorno"
            number="02"
            title="Entorno de laboratorio"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El entorno utiliza VirtualBox con Kali Linux como máquina
                atacante y SnakeOil como máquina objetivo. Kali dispone de una
                interfaz NAT para actualizaciones y una interfaz Host-Only para
                comunicarse con el objetivo. SnakeOil utiliza únicamente la red
                Host-Only, sin salida directa a Internet.
              </p>
              <p>
                Esta separación mantiene las pruebas dentro del segmento privado
                y evita exponer deliberadamente la máquina vulnerable a redes
                externas.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.environment} start={1} />
          </ActivitySection>

          <ActivitySection
            id="descubrimiento"
            number="03"
            title="Fase de descubrimiento"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Primero se ejecutó <code>ip a</code> para identificar las
                interfaces de Kali. La interfaz <code>eth1</code> recibió la
                dirección <code>192.168.56.102/24</code>, por lo que el rango de
                búsqueda fue <code>192.168.56.0/24</code>.
              </p>
              <p>
                Netdiscover encontró los hosts activos del segmento. Después de
                comparar los resultados con la configuración Host-Only de
                VirtualBox, se identificó <code>192.168.56.101</code> como la IP
                de SnakeOil.
              </p>
            </div>
            <CodeBlock>sudo netdiscover -i eth1 -r 192.168.56.0/24</CodeBlock>
            <EvidenceGrid items={evidenceGroups.discovery} start={4} />
          </ActivitySection>

          <ActivitySection
            id="escaneo"
            number="04"
            title="Escaneo de puertos y servicios"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se utilizó Nmap para escanear todos los puertos TCP mediante SYN
                scan y detectar las versiones de los servicios. El análisis
                encontró SSH en el puerto 22 y dos servidores HTTP nginx en los
                puertos 80 y 8080.
              </p>
            </div>
            <CodeBlock>sudo nmap -p- -sS -sV 192.168.56.101</CodeBlock>
            <div className="overflow-x-auto border-y border-border">
              <table className="w-full min-w-[38rem] text-left">
                <thead className="font-mono text-xs tracking-wider text-muted uppercase">
                  <tr>
                    <th className="px-4 py-4 font-normal">Puerto</th>
                    <th className="px-4 py-4 font-normal">Servicio</th>
                    <th className="px-4 py-4 font-normal">Versión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-4">22/tcp</td>
                    <td className="px-4 py-4">SSH</td>
                    <td className="px-4 py-4">OpenSSH 7.9p1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">80/tcp</td>
                    <td className="px-4 py-4">HTTP</td>
                    <td className="px-4 py-4">nginx 1.14.2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">8080/tcp</td>
                    <td className="px-4 py-4">HTTP</td>
                    <td className="px-4 py-4">nginx 1.14.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <EvidenceGrid items={evidenceGroups.scan} start={6} />
          </ActivitySection>

          <ActivitySection
            id="enumeracion"
            number="05"
            title="Enumeración de servicios web"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El puerto 80 mostró una página estática de bienvenida de nginx.
                En el puerto 8080 se encontró la aplicación Good Tech Inc.'s
                Snake Oil Project, con publicaciones editables y creación de
                contenido sin autenticación visible.
              </p>
              <p>
                Una publicación también reveló el uso de Flask y
                <code> flask-jwt-extended</code>, información relevante para
                orientar el análisis posterior del mecanismo de autenticación.
              </p>
            </div>
            <CodeBlock>{`curl -i http://192.168.56.101
curl -i http://192.168.56.101:8080`}</CodeBlock>
            <EvidenceGrid items={evidenceGroups.enumeration} start={7} />
          </ActivitySection>

          <ActivitySection
            id="vulnerabilidades"
            number="06"
            title="Análisis de vulnerabilidades"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Gobuster permitió descubrir rutas no enlazadas desde la
                interfaz:
                <code> /login</code>, <code>/registration</code>,
                <code> /run</code>, <code>/secret</code>, <code>/test</code> y
                <code> /users</code>. La existencia de estas rutas amplió la
                superficie de ataque conocida.
              </p>
              <p>
                El endpoint <code>/users</code> devolvió sin autenticación una
                lista de usuarios y contraseñas hasheadas. Aunque el algoritmo
                PBKDF2-SHA256 dificulta el cracking directo, la exposición del
                conjunto de usuarios y hashes constituye una divulgación de
                información sensible.
              </p>
            </div>
            <CodeBlock>
              gobuster dir -u http://192.168.56.101:8080 -w
              /usr/share/wordlists/dirb/common.txt
            </CodeBlock>
            <EvidenceGrid items={evidenceGroups.vulnerabilities} start={11} />
          </ActivitySection>

          <ActivitySection
            id="autenticacion"
            number="07"
            title="Registro, autenticación y JWT"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El endpoint <code>/registration</code> permitió crear una cuenta
                sin controles adicionales y devolvió inmediatamente un token de
                acceso JWT. Después se reprodujo el inicio de sesión en Burp
                Suite Repeater para modificar y reenviar las solicitudes durante
                las pruebas siguientes.
              </p>
            </div>
            <CodeBlock>{`curl -i -X POST http://192.168.56.101:8080/registration \\
  -H "Content-Type: application/json" \\
  -d '{"username":"nobody","password":"test123"}'`}</CodeBlock>
            <EvidenceGrid items={evidenceGroups.authentication} start={14} />
          </ActivitySection>

          <ActivitySection
            id="explotacion"
            number="08"
            title="Análisis de command injection"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Las respuestas de <code>/run</code> indicaron que el endpoint
                esperaba una URL y una llave secreta. El acceso a
                <code> /secret</code> falló al enviar el JWT mediante el
                encabezado Authorization, pero funcionó al colocarlo en la
                cookie
                <code> access_token_cookie</code>, revelando la llave requerida.
              </p>
              <p>
                Al enviar nuevamente una URL a <code>/run</code>, la respuesta
                incluyó la salida de <code>curl</code> ejecutado por el
                servidor. Esto indica que el valor controlado por el usuario
                llega a un comando del sistema sin una validación adecuada,
                comportamiento compatible con una vulnerabilidad de inyección de
                comandos.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.exploitation} start={17} />
          </ActivitySection>

          <ActivitySection id="pendientes" number="09" title="Próximos pasos">
            <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {[
                ["Walkthrough", "Completar explotación y postexplotación."],
                ["Informe", "Incorporar la versión final descargable en PDF."],
                ["Video", "Agregar la demostración publicada en YouTube."],
              ].map(([title, description]) => (
                <article key={title} className="bg-background p-6">
                  <p className="font-mono text-xs tracking-wider text-accent uppercase">
                    En desarrollo
                  </p>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Project01;
