import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ActivityFigure from "../components/activities/ActivityFigure";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "adquisicion", label: "Adquisición de evidencia" },
    { id: "indicios", label: "Indicios de actividad maliciosa" },
    { id: "diferencias", label: "cmd y PowerShell" },
    { id: "siguientes", label: "Siguientes pasos" },
    { id: "conclusion", label: "Conclusión" },
    { id: "referencias", label: "Referencias" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-19";

const evidenceModules = import.meta.glob("../assets/activity-19/*.png", {
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

// Figure numbers follow the image names: image7 is Figura 07.
function figureNumber(key) {
    return key.replace("image", "").padStart(2, "0");
}

const adquisiciones = [
    {
        id: "fecha-hora",
        title: "Fecha y hora",
        statement: "Obtenga la fecha y hora del sistema.",
        commands: ["date > FechaSistema.txt"],
        figures: [
            [
                "image1",
                "date redirigido a FechaSistema.txt: sábado, 14 de noviembre de 2026, 10:32:21 a. m.",
            ],
        ],
        paragraphs: [
            "Ejecuté date, que devuelve la fecha y la hora actuales del sistema, y con > FechaSistema.txt redirigí la salida a un archivo en la carpeta de la actividad, para dejarla documentada. El equipo registró el sábado 14 de noviembre de 2026 a las 10:32:21 a. m. Esta es la referencia de toda la línea de tiempo de la investigación que nos permite correlacionar los eventos de los logs, las conexiones y los archivos modificados con el momento real, y comparar el reloj del equipo contra la hora real para detectar si fue alterado. Se recolecta primero porque es de los datos más volátiles, según el orden de volatilidad (Brezinski y Killalea, 2002).",
        ],
    },
    {
        id: "procesos",
        title: "Procesos en ejecución",
        statement: "Obtenga un listado de los procesos en ejecución.",
        commands: ["tasklist > Procesos.txt"],
        figures: [
            [
                "image2",
                "tasklist: procesos en ejecución con PID, sesión y uso de memoria",
            ],
        ],
        paragraphs: [
            "Ejecuté tasklist, que lista los procesos que se están ejecutando en el equipo, y con > guardé el resultado en Procesos.txt. La salida tiene cinco columnas:",
            "Este listado permite detectar procesos que no deberían estar en el equipo, como nombres extraños, procesos que imitan a los del sistema o consumos de memoria inusuales. La sesión ayuda a ubicar quién lo ejecuta: un proceso en la sesión del usuario que no corresponde a ningún programa que él use es más sospechoso que uno del sistema. El PID identifica sin ambigüedad a cada proceso cuando hay varios con el mismo nombre, como los svchost.exe, que aparecen muchas veces.",
        ],
        bullets: [
            "Nombre de imagen: el nombre del ejecutable del proceso.",
            "PID: el identificador único que el sistema asigna al proceso mientras está activo.",
            "Nombre de sesión: el tipo de sesión donde corre el proceso. Services son los procesos del sistema y de segundo plano, y Console son los de la sesión interactiva del usuario.",
            "Núm. de sesión: el número de esa sesión. La 0 pertenece a los servicios del sistema y la 1 a la sesión del usuario que está frente al equipo.",
            "Uso de memoria: la memoria RAM que consume el proceso.",
        ],
    },
    {
        id: "servicios",
        title: "Servicios",
        statement:
            "Obtenga los servicios del dispositivo de análisis desde el símbolo del sistema y después desde PowerShell. ¿Qué diferencias aprecia? ¿Cuál es su análisis respecto al resultado?",
        commands: [
            "# PowerShell",
            "Get-Service > ServiciosPS.txt",
            "",
            "# CMD",
            "sc query > ServiciosCMD.txt",
        ],
        figures: [
            [
                "image3",
                "Get-Service en PowerShell: estado, nombre y nombre descriptivo de cada servicio",
            ],
            [
                "image4",
                "sc query en CMD: tipo, estado y códigos de salida de cada servicio activo",
            ],
        ],
        paragraphs: [
            "Listé los servicios con Get-Service en PowerShell y con sc query en CMD para poder compararlos. Get-Service muestra todos los servicios, también los detenidos, en una tabla con tres columnas: Status (si está Running o Stopped), Name (el nombre interno) y DisplayName (el nombre descriptivo). sc query solo muestra los servicios activos y da más detalle técnico de cada uno: el tipo (WIN32_OWN_PROCESS si corre en su propio proceso o WIN32_SHARE_PROCESS si lo comparte con otros servicios), el estado (RUNNING) y los códigos de salida y puntos de control, que indican si el servicio terminó con errores.",
            "La diferencia práctica es que Get-Service sirve para tener el inventario completo y sc query para ver el detalle técnico de lo que está corriendo. Además, la salida de Get-Service son objetos que se pueden filtrar y ordenar, mientras que la de sc query es solo texto. Los servicios importan en una investigación porque son un punto de persistencia habitual del malware, ya que arrancan solos con el sistema. Un nombre sospechoso, o un servicio que no corresponde a ningún software instalado, puede ser un indicio de compromiso.",
        ],
    },
    {
        id: "usuarios-logueados",
        title: "Usuarios logueados",
        statement:
            "Obtenga un listado de los usuarios que se encuentran actualmente logueados en el sistema comprometido.",
        commands: [".\\NetUsers.exe /local > UsuariosLogueados.txt"],
        figures: [
            [
                "image5",
                "NetUsers /local: única sesión activa, FRIEDAMARIA\\friedamaria",
            ],
        ],
        paragraphs: [
            "Usé NetUsers, que lista los usuarios con una sesión abierta en el equipo, porque entrega la información de forma directa y se ejecuta desde la carpeta donde guardo la evidencia. Agregué el switch /local porque por defecto la herramienta omite las cuentas locales, y este equipo no pertenece a un dominio, así que sin él no listaría a ningún usuario. El resultado muestra una sola sesión activa, la de la cuenta local FRIEDAMARIA\\friedamaria; el prefijo FRIEDAMARIA es el nombre del equipo, lo que confirma que no es una cuenta de dominio. No aparece ninguna otra cuenta con sesión abierta, así que no hay sesiones inesperadas. Saber quién está conectado permite identificar al usuario que pudo ejecutar acciones durante el incidente, y en una investigación real el siguiente paso sería confirmar con el responsable del equipo que esa cuenta es la suya.",
        ],
    },
    {
        id: "historico-usuarios",
        title: "Histórico de usuarios",
        statement:
            "Obtenga un listado de los usuarios que alguna vez se loguearon en el sistema comprometido.",
        commands: [
            ".\\NetUsers.exe /history /local > UsuariosHistorico.txt",
            "net user",
        ],
        figures: [
            [
                "image6",
                "NetUsers /history /local y net user: histórico de inicios de sesión y cuentas locales",
            ],
        ],
        paragraphs: [
            "Ejecuté NetUsers con el switch /history, que en lugar de las sesiones actuales lista las cuentas que han iniciado sesión en el equipo, y con /local para incluir las cuentas locales. Para complementarlo usé net user, que lista todas las cuentas locales que existen, hayan iniciado sesión o no. El histórico muestra únicamente a FRIEDAMARIA\\friedamaria, con último inicio de sesión el 2026/11/13 a las 08:50, consistente con la sesión activa del paso anterior. net user muestra siete cuentas: cuatro integradas de Windows (Administrador, DefaultAccount, Invitado y WDAGUtilityAccount), la del usuario (friedamaria) y dos que no son estándar, CodexSandboxOffline y CodexSandboxOnline. Estas dos pertenecen a la herramienta Codex de ChatGPT instalada en el equipo, que las usa como entorno aislado para ejecutar código, y ninguna ha iniciado sesión, por lo que no representan un indicio de compromiso. Este paso importa porque el histórico no depende de quién está conectado en el momento, sino de quién ha usado el equipo, y permite detectar cuentas creadas por un atacante y accesos fuera de lo normal.",
        ],
    },
    {
        id: "informacion-red",
        title: "Información de red",
        statement: "Obtenga la información de la red del sistema comprometido.",
        commands: ["ipconfig /all > InfoRed.txt"],
        figures: [
            [
                "image7",
                "ipconfig /all: configuración completa de los adaptadores de red",
            ],
        ],
        paragraphs: [
            "Ejecuté ipconfig /all, que muestra la configuración completa de cada adaptador de red: dirección física (MAC), direcciones IP, máscara, puerta de enlace, servidores DNS y datos de DHCP. El equipo se llama FriedaMaria y está conectado por Wi-Fi con la dirección 192.168.1.6, MAC 40-1A-58-7F-51-E6, y la puerta de enlace, el DHCP y el DNS en 192.168.1.254. La concesión DHCP se obtuvo el 14 de noviembre a las 08:20:23 a. m. y expira al día siguiente. Los demás adaptadores son virtuales (VirtualBox, Hyper-V y WSL) o están desconectados. Esta información identifica al equipo dentro de la red y permite relacionarlo con el tráfico registrado en routers y firewalls, y un adaptador inesperado sería un posible canal de salida de datos.",
        ],
    },
    {
        id: "netbios",
        title: "Nombres NetBIOS",
        statement:
            "Identifique los nombres asignados por NetBIOS en el sistema comprometido.",
        commands: ["nbtstat -n > NombresNetBios.txt"],
        figures: [
            ["image8", "nbtstat -n: tabla de nombres NetBIOS por interfaz"],
        ],
        paragraphs: [
            "Ejecuté nbtstat -n, que lista los nombres NetBIOS que el equipo tiene registrados en cada interfaz de red. Para cada nombre indica su tipo (UNIQUE si identifica a un solo equipo, GROUP si identifica a un grupo) y su estado (Registered). NetBIOS es un mecanismo de resolución de nombres de las redes Windows, y se revisa en una investigación porque permite identificar con qué nombres se anuncia el equipo en la red y porque es un protocolo que los atacantes usan para enumerar equipos y moverse dentro de una red local.",
        ],
    },
    {
        id: "conexiones",
        title: "Conexiones establecidas",
        statement: "Obtenga las conexiones establecidas en el sistema vulnerado.",
        commands: [
            "netstat -an > Conexiones.txt",
            "netstat -an | findstr ESTABLISHED",
        ],
        figures: [
            ["image9", "netstat -an: conexiones y puertos en escucha"],
            ["image10", "netstat -an filtrado con findstr ESTABLISHED"],
        ],
        paragraphs: [
            "Ejecuté netstat -an, donde -a muestra todas las conexiones y puertos en escucha y -n muestra las direcciones y puertos en formato numérico, sin resolver nombres. La salida tiene cuatro columnas: protocolo, dirección local, dirección remota y estado, como LISTENING si el puerto espera conexiones, ESTABLISHED si hay una conexión activa y TIME_WAIT si la conexión se está cerrando. Para quedarme solo con las conexiones establecidas filtré la salida con findstr ESTABLISHED. Estas conexiones muestran con quién se está comunicando el equipo en ese momento, y permiten detectar conexiones hacia direcciones externas desconocidas, que podrían ser un canal de control del atacante o una salida de datos.",
        ],
    },
    {
        id: "aplicaciones-puertos",
        title: "Aplicaciones y puertos de comunicación",
        statement:
            "Obtenga la relación de las aplicaciones abiertas con el puerto de comunicación establecido en el sistema comprometido.",
        commands: ["netstat -anob > ConexionesApps.txt"],
        figures: [
            [
                "image11",
                "netstat -anob: conexiones con el PID y el ejecutable responsable",
            ],
        ],
        paragraphs: [
            "Ejecuté netstat -anob, que agrega a lo anterior dos opciones: -o para mostrar el PID del proceso que abrió cada conexión y -b para mostrar el ejecutable responsable, entre corchetes. Este comando requiere permisos de administrador. Es importante porque relaciona cada puerto y conexión con la aplicación que la origina: un puerto abierto o una conexión activa de un programa que no debería comunicarse por red es uno de los indicios más claros de actividad maliciosa, y el PID permite identificar sin ambigüedad el proceso cuando hay varios con el mismo nombre.",
        ],
    },
    {
        id: "dominios",
        title: "Dominios accedidos",
        statement:
            "Identifique los dominios a los que se ha accedido desde el ordenador en investigación.",
        commands: ["ipconfig /displaydns > CacheDNS.txt"],
        figures: [
            [
                "image12",
                "ipconfig /displaydns: caché del resolvedor DNS con los dominios consultados",
            ],
        ],
        paragraphs: [
            "Ejecuté ipconfig /displaydns, que muestra la caché del resolvedor DNS, es decir, los nombres de dominio que el equipo consultó recientemente. Cada registro indica el nombre consultado, el tipo de registro (por ejemplo 1 para direcciones IPv4 y 12 para registros PTR), el tiempo de vida y la respuesta obtenida. Esta caché permite saber a qué dominios accedió el equipo aunque el historial del navegador se haya borrado, y sirve para detectar dominios de sitios maliciosos o conexiones a servidores de control.",
        ],
    },
    {
        id: "tabla-arp",
        title: "Tabla ARP",
        statement:
            "Obtenga la información almacenada de comunicación entre la dirección física y la dirección lógica del equipo con los que se haya comunicado recientemente el dispositivo en investigación.",
        commands: ["arp -a > TablaARP.txt"],
        figures: [["image13", "arp -a: caché ARP organizada por interfaz"]],
        paragraphs: [
            "Ejecuté arp -a, que muestra la caché ARP, la tabla que relaciona direcciones IP con direcciones físicas (MAC) de los equipos con los que el sistema se ha comunicado recientemente en la red local. Está organizada por interfaz y cada entrada indica si es dinámica o estática. Es importante porque permite identificar qué dispositivos de la red local interactuaron con el equipo, y detectar ataques de suplantación ARP, en los que dos direcciones IP distintas aparecen con la misma dirección MAC.",
        ],
    },
    {
        id: "redes-wifi",
        title: "Redes Wi-Fi",
        statement:
            "Obtenga un listado de redes Wi-Fi a las que se ha conectado el equipo comprometido.",
        commands: [
            "netsh wlan show profiles",
            'netsh wlan show profile name="CONSULTORIOSPA" key=clear',
        ],
        figures: [
            [
                "image14",
                "netsh wlan show profiles: redes Wi-Fi guardadas en el equipo",
            ],
            [
                "image15",
                "netsh wlan show profile con key=clear: detalle de un perfil Wi-Fi",
            ],
        ],
        paragraphs: [
            'Ejecuté netsh wlan show profiles, que lista las redes Wi-Fi guardadas en el equipo, y después netsh wlan show profile name="CONSULTORIOSPA" key=clear para ver el detalle de una de ellas como el tipo de autenticación, cifrado, modo de conexión y contenido de la clave. El perfil usa autenticación WPA3-Personal y WPA2-Personal con cifrado GCMP-256, GCMP y CCMP, que son configuraciones seguras, y está configurado para conectarse automáticamente y con la selección aleatoria de MAC deshabilitada, por lo que el equipo se presenta con su dirección física real. Esta información sirve para reconstruir los lugares donde se ha conectado el equipo y detectar redes que el usuario no reconozca, que podrían ser puntos de acceso falsos.',
        ],
    },
    {
        id: "historico-comandos",
        title: "Histórico de comandos",
        statement:
            "Recabe el histórico del intérprete de comandos que se han ejecutado en el sistema de análisis.",
        commands: [
            "# CMD",
            "doskey /history > HistorialCMD.txt",
            "",
            "# PowerShell",
            "Get-History > HistorialPS.txt",
        ],
        figures: [
            ["image16", "doskey /history: historial de comandos de la sesión de CMD"],
            [
                "image17",
                "Get-History: historial de comandos de la sesión de PowerShell",
            ],
        ],
        paragraphs: [
            "Recolecté el historial de los dos intérpretes. En CMD ejecuté doskey /history, que muestra los comandos escritos en la sesión actual de esa consola, y en PowerShell ejecuté Get-History, que hace lo mismo con la sesión de PowerShell. Los dos historiales muestran únicamente los comandos de esta recolección, sin comandos ajenos ni sospechosos. El historial importa porque permite ver qué ejecutó el usuario, o un atacante, y en qué orden. Tiene una limitación ya que cada historial vive solo en la memoria de su sesión y se pierde al cerrarla, por lo que no incluye los comandos de sesiones anteriores y debe recolectarse cuanto antes.",
        ],
    },
    {
        id: "unidades-mapeadas",
        title: "Unidades mapeadas",
        statement: "Visualice las unidades mapeadas en el sistema de investigación.",
        commands: ["net use"],
        figures: [["image18", "net use: sin unidades de red conectadas"]],
        paragraphs: [
            'Ejecuté net use, que lista las conexiones del equipo a recursos compartidos de red, como las unidades mapeadas. El resultado fue "No hay entradas en la lista", es decir, el equipo no tiene ninguna unidad de red conectada. Esto importa porque un atacante puede usar unidades de red para moverse hacia otros equipos o sacar archivos, y su ausencia descarta esa vía en este equipo.',
        ],
    },
    {
        id: "recursos-compartidos",
        title: "Recursos compartidos",
        statement: "Obtenga los recursos compartidos del sistema en análisis.",
        commands: ["net share"],
        figures: [
            [
                "image19",
                "net share: recursos administrativos predeterminados (C$, IPC$ y ADMIN$)",
            ],
        ],
        paragraphs: [
            "Ejecuté net share, que lista los recursos que el equipo comparte con la red. Solo aparecen los recursos administrativos que Windows crea de forma predeterminada: C$ (el disco C), ADMIN$ (la carpeta de Windows) e IPC$ (la comunicación entre procesos). El signo $ al final indica que son recursos ocultos. No hay carpetas compartidas adicionales. Esto importa porque un recurso compartido que no sea de los predeterminados puede ser un punto de acceso para un atacante o una vía para sacar archivos del equipo.",
        ],
    },
    {
        id: "informacion-sistema",
        title: "Información del sistema",
        statement: "Obtenga la información relacionada del equipo comprometido.",
        commands: ["systeminfo > InfoEquipo.txt"],
        figures: [
            [
                "image20",
                "systeminfo: datos generales del equipo, sistema operativo y hardware",
            ],
        ],
        paragraphs: [
            "Ejecuté systeminfo, que reúne los datos generales del equipo: nombre del host, sistema operativo y versión, tiempo de arranque, fabricante, modelo, zona horaria, actualizaciones instaladas y adaptadores de red. Esta información identifica el equipo del que proviene la evidencia, lo que es necesario para documentar la cadena de custodia. La versión del sistema operativo indica qué artefactos, logs y herramientas aplican en el análisis. Las actualizaciones instaladas muestran el nivel de parches, que permite saber si el equipo tenía vulnerabilidades conocidas que un atacante pudo aprovechar. El tiempo de arranque indica cuánto tiempo llevaba encendido, y por tanto cuánta actividad hay en la memoria volátil, que se pierde al reiniciar. Por último, la zona horaria permite convertir correctamente las fechas de los logs y de los archivos a una misma referencia, para armar la línea de tiempo.",
        ],
    },
    {
        id: "tareas-programadas",
        title: "Tareas programadas",
        statement:
            "Recupere las tareas programadas en el sistema operativo de análisis.",
        commands: ["schtasks > TareasProgramadas.txt"],
        figures: [
            [
                "image21",
                "schtasks: tareas programadas con su próxima ejecución y estado",
            ],
        ],
        paragraphs: [
            "Ejecuté schtasks, que lista las tareas programadas del sistema con su nombre, la hora de su próxima ejecución y su estado. Las tareas que no pertenecen a Windows corresponden a actualizadores de software conocido y el resto son tareas del propio sistema. No hay tareas de origen desconocido. Este listado importa porque las tareas programadas son uno de los mecanismos de persistencia más usados por el malware ya que permiten que un programa se vuelva a ejecutar solo, a una hora determinada o cada vez que inicia el sistema o el usuario, incluso después de que el atacante cierre su acceso. Por eso se buscan tareas con nombres extraños o que imitan a los del sistema, creadas recientemente, o que ejecuten programas desde carpetas inusuales como las temporales. Las tareas con próxima ejecución N/A se activan por un evento (como el inicio de sesión) y no por horario, y también se revisan por esa razón.",
        ],
    },
    {
        id: "logs-sistema",
        title: "Exportación de logs del sistema",
        statement:
            "Exporte los logs de los registros del sistema para su posterior análisis en la ubicación de Escritorio del usuario en investigación.",
        commands: ['wevtutil epl System "$PWD\\LogsSistema.evtx"'],
        figures: [
            [
                "image22",
                "wevtutil epl System: exportación del registro a LogsSistema.evtx y verificación con ls",
            ],
        ],
        paragraphs: [
            "Ejecuté wevtutil epl System, donde epl (export-log) exporta el registro de eventos System a un archivo .evtx en el directorio de la actividad. Exportarlo conserva una copia del registro tal como estaba en ese momento, antes de que nuevos eventos o un posible borrado lo modifiquen. El registro System guarda eventos como el inicio y apagado del equipo, el arranque y detención de servicios, la carga de controladores y los errores, y con ellos se puede reconstruir qué pasó en el sistema y cuándo.",
        ],
    },
    {
        id: "archivo-hosts",
        title: "Archivo hosts",
        statement:
            "Obtenga el fichero Host del sistema comprometido para su posterior análisis.",
        commands: ["type C:\\Windows\\System32\\drivers\\etc\\hosts > Hosts.txt"],
        figures: [["image23", "Contenido del archivo hosts del equipo"]],
        paragraphs: [
            "Ejecuté type sobre C:\\Windows\\System32\\drivers\\etc\\hosts, el archivo local que asocia nombres de dominio con direcciones IP, y redirigí la salida a Hosts.txt. Windows lo consulta antes que al servidor DNS, por lo que es un objetivo común del malware: al agregar una línea puede redirigir un dominio legítimo (un banco, un antivirus, un sitio de actualizaciones) a un servidor controlado por el atacante, o bloquear dominios de seguridad. En un estado normal solo contiene comentarios, así que cualquier entrada adicional debe justificarse. En este equipo las únicas entradas son las que agregó Docker Desktop (host.docker.internal y gateway.docker.internal hacia 192.168.1.10, y kubernetes.docker.internal hacia 127.0.0.1), delimitadas por su propio bloque de comentarios, sin redirecciones de dominios externos.",
        ],
    },
    {
        id: "arbol-archivos",
        title: "Árbol de archivos por fecha de creación",
        statement:
            "Obtenga el listado con base a la fecha de creación del árbol de directorios y ficheros del sistema operativo comprometido.",
        commands: ["dir C:\\ /a /s /t:c /o:d > ArbolCreacion.txt"],
        figures: [
            [
                "image24",
                "dir C:\\ /a /s /t:c /o:d: raíz de C:\\ ordenada por fecha de creación",
            ],
            [
                "image25",
                "ArbolCreacion.txt: contenido de $Recycle.Bin ordenado por fecha de creación",
            ],
        ],
        paragraphs: [
            "Ejecuté dir sobre C:\\ con /a para incluir archivos ocultos y de sistema, /s para recorrer todos los subdirectorios, /t:c para mostrar la fecha de creación y /o:d para ordenar por fecha, y redirigí el resultado a ArbolCreacion.txt. Esto permite reconstruir una línea de tiempo del disco: en una intrusión, los archivos del atacante (herramientas, malware, datos exfiltrados) aparecen creados en fechas cercanas al incidente, y revisar los ocultos y de sistema evita pasar por alto los lugares donde suelen esconderse. En la raíz de C:\\ las carpetas más antiguas son las del sistema ($Recycle.Bin de 2019 y Windows, Users y Program Files de abril de 2024), y la creación más reciente es xampp (26 de agosto de 2026), un paquete de servidor web instalado por el usuario. No aparecen carpetas nuevas en los días previos a la captura. También se ven pagefile.sys y hiberfil.sys, archivos de sistema que pueden contener restos de la memoria RAM y que conviene preservar en una investigación real.",
        ],
    },
];

const references = [
    {
        text: "Brezinski, D., & Killalea, T. (2002). Guidelines for Evidence Collection and Archiving (RFC 3227). Internet Engineering Task Force.",
        url: "https://www.rfc-editor.org/rfc/rfc3227",
    },
];

function CodeBlock({ lines }) {
    return (
        <pre className="my-4 overflow-x-auto border border-border bg-foreground p-4 font-mono text-xs leading-6 text-background">
            <code>{lines.join("\n")}</code>
        </pre>
    );
}

function Acquisition({ item, index }) {
    const [firstParagraph, ...otherParagraphs] = item.paragraphs;
    const commandCount = item.commands.filter(
        (line) => line !== "" && !line.startsWith("#"),
    ).length;

    return (
        <li
            id={item.id}
            className="grid scroll-mt-36 grid-cols-1 gap-3 py-10 first:pt-0 sm:grid-cols-[3rem_1fr]"
        >
            <span className="font-mono text-med text-accent">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
                <p className="font-mono text-med tracking-wider text-accent uppercase">
                    {item.title}
                </p>
                <h3 className="mt-2 max-w-3xl text-lg leading-7 font-semibold wrap-break-word">
                    {item.statement}
                </h3>

                <p className="mt-5 font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                    {commandCount > 1 ? "Comandos" : "Comando"}
                </p>
                <CodeBlock lines={item.commands} />

                {item.figures.map(([key, caption]) => (
                    <ActivityFigure
                        key={key}
                        src={evidenceSrc(key)}
                        alt={caption}
                        number={figureNumber(key)}
                        caption={caption}
                        className="max-w-3xl"
                    />
                ))}

                <div className="mt-6 max-w-3xl space-y-4 leading-7 wrap-break-word text-muted">
                    <p>{firstParagraph}</p>

                    {item.bullets && (
                        <ul className="list-disc space-y-2 pl-6">
                            {item.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                    )}

                    {otherParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </li>
    );
}

function Activity19() {
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
                                Parcial III / Actividad 19
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                Los primeros minutos{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    cuentan
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl font-mono text-2xl tracking-wide text-accent uppercase">
                                Adquisición forense en escenas de crimen digital
                            </p>
                            <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Adquisición de evidencia en un sistema Windows en caliente con comandos de CMD
                                y PowerShell, explicando qué muestra cada uno y su resultado.
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
                                <dd className="mt-1">CMD · PowerShell</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Formato
                                </dt>
                                <dd className="mt-1">Informe ejecutivo</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_act19.pdf"}
                            download="184346_act19.pdf"
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

                        <nav aria-label="Contenido de la Actividad 19" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/activity-19#" + section.id}
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
                                CMD · PowerShell · NetUsers
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 space-y-24 lg:col-span-9">
                    <ActivitySection
                        id="adquisicion"
                        number="01"
                        title="Adquisición de evidencia"
                    >
                        <p className="mb-12 max-w-3xl leading-7 text-muted">
                            El equipo de trabajo de fuerzas del orden me designó
                            como investigador forense digital. Como primer
                            respondiente, debo adquirir la evidencia forense en el
                            sistema en caliente Windows que ha sido comprometido.
                        </p>

                        <ol className="divide-y divide-border">
                            {adquisiciones.map((item, index) => (
                                <Acquisition key={item.id} item={item} index={index} />
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection
                        id="indicios"
                        number="02"
                        title="Indicios de actividad maliciosa"
                    >
                        <p className="max-w-3xl leading-7 text-muted">
                            En la adquisición no se encontraron indicios de actividad
                            maliciosa. Todos los procesos, servicios y tareas
                            programadas corresponden a software legítimo (Windows,
                            Brave, Edge, Firefox, Office, OneDrive, HP, Docker y
                            Xbox). Las conexiones establecidas y los dominios en
                            caché pertenecen a esos mismos servicios, y las únicas
                            cuentas con sesión son las del usuario del equipo.
                            Además, no hay recursos compartidos ni unidades
                            inesperados, los servicios de acceso remoto están
                            detenidos, y el archivo hosts solo tiene las entradas de
                            Docker Desktop. Aun sin hallazgos, esta revisión es una
                            fotografía del momento, y descartar una intrusión con
                            certeza requeriría el análisis de memoria, disco y
                            registros.
                        </p>
                    </ActivitySection>

                    <ActivitySection
                        id="diferencias"
                        number="03"
                        title="Diferencias entre cmd y PowerShell"
                    >
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            <p>
                                cmd es el intérprete clásico de Windows y trabaja con
                                texto: sus comandos (ipconfig, netstat, arp, dir)
                                devuelven cadenas que se procesan con herramientas
                                como findstr. Es ligero y está en cualquier versión de
                                Windows, por lo que sirve para una recolección rápida.
                            </p>
                            <p>
                                PowerShell es más moderno y trabaja con objetos: sus
                                cmdlets (Get-Service, Get-Process) devuelven
                                propiedades que se pueden filtrar, ordenar y
                                exportar, y da acceso más profundo al sistema
                                (servicios, registro, eventos, red), además de
                                permitir automatizar la recolección. Por esa
                                potencia también es la herramienta preferida de los
                                atacantes, así que su historial es evidencia valiosa.
                            </p>
                            <p>
                                Ambos guardan el historial solo de la sesión actual
                                (doskey /history y Get-History), y algunos comandos
                                cambian entre uno y otro, como sc, que en PowerShell
                                es un alias de Set-Content y requiere sc.exe.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="siguientes"
                        number="04"
                        title="Siguientes pasos en una investigación real"
                    >
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            <p>
                                Lo primero sería asegurar la integridad de lo
                                recolectado: calcular el hash SHA-256 de todos los
                                archivos y documentar la cadena de custodia, para
                                poder demostrar después que la evidencia no fue
                                alterada. Después se adquiriría la memoria RAM con
                                una herramienta forense, como FTK Imager, y se
                                analizaría con Volatility, preservando también
                                pagefile.sys e hiberfil.sys, que pueden contener
                                restos de la memoria. Se crearía además una imagen
                                forense del disco, y todo el análisis se haría sobre
                                esa copia, nunca sobre el original.
                            </p>
                            <p>
                                Con las copias aseguradas, se analizaría el archivo
                                .evtx exportado en busca de inicios de sesión,
                                servicios nuevos y errores en torno a la fecha del
                                incidente, y se correlacionaría con la línea de
                                tiempo de archivos para reconstruir qué ocurrió y
                                cuándo. Finalmente, se revisarían otros puntos de
                                persistencia, como las claves Run del registro y las
                                carpetas de inicio, junto con el tráfico de red
                                asociado a los procesos sospechosos.
                            </p>
                        </div>
                    </ActivitySection>

                    <ActivitySection id="conclusion" number="05" title="Conclusión">
                        <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
                            La actividad mostró que una adquisición en caliente
                            permite reunir, con los comandos, una fotografía del
                            estado del sistema para ubicar qué procesos y servicios
                            corren, quién tiene sesión, cómo está configurada la
                            red, con qué equipos y dominios se comunica y qué tareas
                            están programadas para ejecutarse. Esa información no se
                            encuentra en un disco en frío y permite decidir con
                            fundamento si hay algo sospechoso y hacia dónde dirigir
                            el análisis. Además, entender para qué sirve cada dato,
                            y no solo ejecutar el comando, es lo que permite
                            interpretar el resultado, y guardar cada salida en un
                            archivo permite conservarlo como evidencia. También
                            quedó claro que cmd y PowerShell se complementan, y que
                            esta recolección es un punto de partida que debe
                            seguirse con el análisis de memoria, disco y registros,
                            cuidando siempre la integridad de la evidencia.
                        </p>
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
                                href={resourceBase + "/184346_act19.pdf"}
                                type="PDF"
                                title="Informe ejecutivo"
                                description="Comandos de adquisición, capturas, explicación de cada resultado, indicios, siguientes pasos y conclusión."
                                download="184346_act19.pdf"
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Activity19;
