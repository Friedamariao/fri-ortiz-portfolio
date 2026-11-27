import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ActivityFigure from "../components/activities/ActivityFigure";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "hechos", label: "Hechos del caso" },
    { id: "analisis", label: "Análisis de memoria" },
    { id: "hallazgos", label: "Hallazgos" },
    { id: "lineas", label: "Líneas de investigación" },
    { id: "conclusion", label: "Conclusión" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-17";

const evidenceModules = import.meta.glob("../assets/activity-17/*.png", {
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

// Figure numbers follow the evidence keys: ev-07 is Figura 07.
function figureNumber(key) {
    return key.replace("ev-", "");
}

const hipotesis = [
    "Se autodenomina “Morty”, tras vincular un enlace de Reddit con un grupo secreto en Telegram donde se presume que contactó a la víctima GTH.",
    "En ese canal, el usuario “Ricky” escribió que quien quiera pertenecer a “S0_Just_M0v3_Socy” debe enviar 0.0000043 BTC a su cartera; se presume una red botnet.",
    "SEDENE proporcionó las iniciales FAF3 (posible objetivo) y el CNDI las iniciales TFE (posible autor de los servidores Lunar, usados para “publicitar” a víctimas).",
    "La evidencia EV455FGM vincula los ataques con cierto direccionamiento IP y sistema operativo, y la EV456FGM con el uso de correos electrónicos y una contraseña.",
    "Se busca identificar los servicios Torrent con los que envía los videos de sus víctimas para pedir un rescate.",
];

const preguntas = [
    {
        id: "marca-de-tiempo",
        statement:
            "Identifique la marca de tiempo local para el volcado de memoria. ¿Cuál es su análisis respecto al resultado obtenido en “Image local date and time”?",
        commands: [String.raw`.\volatility.exe -f .\OtterCTF.vmem imageinfo`],
        figures: [["ev-01", "Salida de imageinfo"]],
        paragraphs: [
            "El campo Image local date and time devolvió 2018-08-04 22:34:22 +0300 (19:34:22 UTC), la memoria se capturó el 4 de agosto de 2018 a las 22:34 hora local del equipo. Este dato fija el instante al que corresponde todo lo observado como procesos, conexiones y sesiones y permite correlacionar la evidencia con fuentes externas.",
            "El plugin imageinfo también identifica qué versión de Windows se estaba ejecutando (perfil) y reporta la fecha y hora de la captura, esto es necesario ya que los demás plugins requieren conocer el perfil para interpretar la memoria. Para obtenerlo, se localiza la estructura KDBG (Kernel Debugger Block), un bloque de datos que Windows mantiene en la memoria del kernel para uso de los depuradores y que contiene la versión y compilación del kernel, además de punteros a las listas de procesos y módulos cargados. Con esa información se puede determinar el perfil, que resultó ser Win7SP1x64 y se usará en los comandos siguientes.",
        ],
    },
    {
        id: "sistema-operativo",
        statement:
            "Identifique el Sistema Operativo y arquitectura que el cibercriminal ha utilizado.",
        commands: [String.raw`.\volatility.exe -f .\OtterCTF.vmem imageinfo`],
        figures: [],
        figureNote: "La salida es la misma de la Figura 01.",
        paragraphs: [
            "El campo Suggested Profiles indicó Win7SP1x64, por lo que podemos determinar que el cibercriminal utilizaba Windows 7 con Service Pack 1 (Image Type (Service Pack): 1) y arquitectura de 64 bits (AS Layer1: WindowsAMD64PagedMemory), con dos procesadores. Se trata de un sistema sin soporte de seguridad y con vulnerabilidades conocidas, dato que se vinculará con la evidencia EV455FGM.",
            "Identificar el sistema operativo y la arquitectura es indispensable porque cada versión de Windows organiza de forma distinta sus estructuras internas, y con un perfil incorrecto los demás plugins devuelven resultados vacíos o erróneos. Los otros perfiles sugeridos corresponden a Windows Server 2008 R2, que comparte el mismo kernel, por lo que Win7SP1x64 es el más probable para un equipo de uso personal.",
        ],
    },
    {
        id: "contrasena",
        statement:
            "¿Cuál es la contraseña del perfil del cibercriminal quien se presume utilizaba el ordenador pues el inicio de sesión se encontraba visible cuando el sistema en vivo estaba en ejecución?",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 hashdump`,
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 lsadump`,
        ],
        figures: [["ev-02", "Salida de hashdump y lsadump"]],
        paragraphs: [
            "El comando hashdump listó tres cuentas locales: Administrator y Guest, ambas con el hash de contraseña vacía, y Rick, la cuenta del usuario del equipo, con hash NTLM 518172d012f97d3a8fcc089615283940. Como un hash no se puede revertir directamente, se ejecutó lsadump, que recuperó el secreto DefaultPassword con el valor MortyIsReallyAnOtter. Esta es la contraseña de la cuenta Rick, y se vincula con el alias “Morty” del caso y con la evidencia EV456FGM.",
            "El plugin hashdump extrae los hashes de las cuentas locales del registro (SAM) cargado en memoria, y necesita el perfil Win7SP1x64 para ubicar esas estructuras. El plugin lsadump lee los LSA Secrets del hive SECURITY, que Windows cifra con la clave de arranque del sistema y Volatility descifra. Cuando el equipo tiene configurado el inicio de sesión automático, Windows guarda ahí la contraseña como DefaultPassword, lo que explica por qué el inicio de sesión estaba visible con el sistema en ejecución.",
        ],
    },
    {
        id: "ip-local",
        statement:
            "Identifique el direccionamiento IP que fue utilizado por el cibercriminal al momento de atacar el sistema local.",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 netscan`,
        ],
        figures: [["ev-03", "Salida de netscan"]],
        paragraphs: [
            "El comando netscan mostró que todas las conexiones salientes del equipo se originan desde la dirección IP 192.168.202.131, por lo que esta es la IP utilizada por el cibercriminal. Se trata de una dirección privada, de la red local del equipo, que se vincula con la evidencia EV455FGM, en la que los ataques provienen de cierto direccionamiento IP bajo un sistema operativo específico (Windows 7 SP1 x64). Al ser privada, la IP pública con la que salía a Internet debe obtenerse de otras fuentes, como los registros del router o del proveedor.",
            "El plugin netscan escanea la memoria buscando las estructuras de red del kernel como conexiones TCP y sockets UDP e indica la IP local y remota, el puerto, el estado y el proceso propietario. Se usa porque es el plugin que reconstruye la actividad de red del equipo en el momento de la captura. En este caso no hay conexiones activas (ESTABLISHED) y las que fueron observadas están CLOSED, lo que nos indica que son rastros de comunicaciones previas.",
        ],
    },
    {
        id: "registro",
        statement:
            "Visualice las llaves del Registro del Sistema disponibles. ¿Por qué es de utilidad conocer el Registro del Sistema del dispositivo comprometido?",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 hivelist`,
        ],
        figures: [["ev-04", "Salida de hivelist"]],
        paragraphs: [
            "El comando hivelist mostró los hives del Registro cargados en memoria. Un hive es cada uno de los archivos en que Windows divide el Registro, y agrupa un conjunto de llaves y valores de configuración. Se identificaron los del sistema: SYSTEM, SOFTWARE, SAM, SECURITY, HARDWARE, DEFAULT y BCD y los del usuario Rick (C:\\Users\\Rick\\ntuser.dat y UsrClass.dat), además de los de los perfiles de servicio NetworkService y LocalService y el archivo Syscache.hve. Cada hive aparece con su dirección virtual y física, que son las que se usan para consultar sus llaves.",
            "Conocer el Registro del dispositivo comprometido es útil porque concentra la configuración del sistema y la actividad de los usuarios: nombre del equipo, cuentas y credenciales (SAM y SECURITY), software instalado, programas que se ejecutan al inicio (persistencia), historial de documentos y programas usados, y dispositivos conectados. En este caso, los hives SAM y SECURITY se usaron para obtener la contraseña de Rick, y su ntuser.dat contiene rastros de su actividad. El plugin hivelist es el primer paso para trabajar con el Registro, porque indica qué hives están disponibles y en qué dirección de memoria se encuentran.",
        ],
    },
    {
        id: "nombre-equipo",
        statement: "Identifique el nombre del ordenador del cibercriminal.",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 printkey -K "ControlSet001\Control\ComputerName\ComputerName"`,
        ],
        figures: [["ev-05", "Salida de printkey"]],
        paragraphs: [
            "El comando printkey mostró que el valor ComputerName del hive SYSTEM es WIN-LO6FAF3DTFE, por lo que este es el nombre del ordenador del cibercriminal. El nombre contiene las iniciales FAF3 y TFE que aportan las instituciones en el caso, lo que sugiere que este equipo corresponde a los sujetos señalados y ayuda a vincularlo con la evidencia. La llave se actualizó por última vez el 2 de junio de 2018, dos meses antes de la captura de la memoria, lo que indica que el nombre se configuró entonces y no ha cambiado desde ese momento.",
            "El plugin printkey muestra las subllaves y valores de una llave del Registro, y con la opción -K se indica la ruta dentro del hive. El nombre del equipo se almacena en el hive SYSTEM, en ControlSet001\\Control\\ComputerName\\ComputerName. Se usa ControlSet001 porque CurrentControlSet es un acceso directo que se crea al arrancar el sistema y no siempre se resuelve en un volcado de memoria.",
        ],
    },
    {
        id: "procesos",
        statement:
            "Identifique tres procesos que considere importante del cual el cibercriminal haya iniciado la ejecución del software.",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 pstree`,
        ],
        figures: [
            ["ev-06", "Salida de pstree"],
            ["ev-07", "Salida de pstree (continuación)"],
        ],
        paragraphs: [
            "El plugin pstree muestra los procesos en forma de árbol, indicando el proceso padre (PPid) y la hora de inicio de cada uno. Se usa porque los programas que abre el usuario son lanzados por explorer.exe, el escritorio de Windows, lo que permite distinguirlos de los procesos del sistema. De los procesos que cuelgan de explorer.exe (PID 2728), se identificaron tres relevantes para el caso.",
        ],
        labeled: [
            {
                label: "Proceso A: BitTorrent.exe (PID 2836, iniciado a las 19:27:07 UTC).",
                text: "¿Por qué considera que es importante? Es un cliente Torrent, el tipo de servicio que el caso indica que el cibercriminal utiliza para enviar los videos de sus víctimas. Tiene 24 hilos y dos procesos hijos, y concentra la mayor parte de las conexiones de red observadas.",
            },
            {
                label: "Proceso B: LunarMS.exe (PID 708, iniciado a las 19:27:39 UTC).",
                text: "¿Por qué considera que es importante? Su nombre se relaciona con los “servidores Lunar” que menciona el caso, y fue lanzado directamente por el usuario desde explorer.exe. Mantuvo una conexión de red hacia un servidor externo.",
            },
            {
                label: "Proceso C: Rick And Morty (PID 3820, iniciado a las 19:32:55 UTC).",
                text: "¿Por qué considera que es importante? Es un programa con nombre sin extensión, abierto por el usuario, que a su vez lanzó a vmware-tray.ex (PID 3720). Un componente de VMware iniciado por un programa ajeno a VMware es atípico, y ese proceso 3720 es el que el caso señala como sospechoso.",
            },
        ],
    },
    {
        id: "servidor",
        statement:
            "Identifique el direccionamiento IP que conecta al servidor malicioso. ¿Cuál fue el puerto que utilizó además de la dirección IP? ¿Cuál es la ubicación posible del atacante?",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 netscan | Select-String LunarMS`,
        ],
        figures: [
            ["ev-07", "Salida de netscan filtrada por LunarMS"],
            ["ev-08", "Consulta de la IP en geolocation.com"],
            ["ev-09", "Consulta de la IP en geolocation.com"],
        ],
        paragraphs: [
            "El comando netscan mostró que el proceso LunarMS.exe (PID 708) se conectó desde la IP local 192.168.202.131 a la dirección 77.102.199.102 por el puerto 7575, por lo que esta es la IP del servidor malicioso. El proceso coincide con los “servidores Lunar” que menciona el caso. La conexión aparece en estado CLOSED, es decir, ya estaba cerrada al capturar la memoria y se trata de un rastro de comunicación previa. Según la consulta en geolocation.com, la IP se ubica en Londres, Inglaterra, Reino Unido. Esta ubicación es aproximada y depende del proveedor de Internet y de si hay VPN o proxy, por lo que debe tomarse como indicio y no como ubicación exacta del atacante.",
            "El plugin netscan escanea la memoria buscando las estructuras de red del kernel, incluidas las conexiones ya cerradas, e indica la IP local y remota, el puerto, el estado y el proceso propietario. Se filtró por LunarMS porque es el proceso del caso, lo que permite aislar su conexión entre las decenas que muestra la salida.",
        ],
    },
    {
        id: "correos",
        statement:
            "Identifique los correos electrónicos que el cibercriminal utilizó para llevar a cabo los ataques de ingeniería social. ¿Cuáles fueron los correos empleados? ¿Desde qué plataforma y navegador fueron abiertos estos correos electrónicos?",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 yarascan -p 4076,4084,1796,3924,3648,576,1808,2748 -Y "/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/" > emails.txt`,
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 yarascan -p 4076,4084,1796,3924,3648,576,1808,2748 -Y "mail.com" > mailcom.txt`,
        ],
        figures: [
            ["ev-10", "Correos encontrados en la memoria de los procesos de Chrome"],
            ["ev-11", "Resultados de la búsqueda de mail.com"],
            ["ev-12", "Procesos propietarios de los hallazgos"],
        ],
        paragraphs: [
            "Los correos utilizados fueron rickypinky@mail.com y rickopicko@mail.com, que fueron encontrados en la memoria de los procesos de Chrome, con el texto username justo antes de ellos, lo que sugiere que podría haber sido un formulario de acceso. Fueron abiertos desde la plataforma de correo web mail.com, ya que en la misma memoria aparecen sus URL de inicio de sesión (/login), bandeja de entrada (/mail?sid=...) y otras secciones, con un identificador de sesión. El navegador utilizado fue Google Chrome ya que los hallazgos pertenecen a seis procesos chrome.exe (PID 1796, 1808, 2748, 3648, 3924 y 4076).",
            "El plugin yarascan busca patrones en la memoria de los procesos mediante reglas YARA. Se aplicó a los procesos de Chrome con una expresión regular que reconoce direcciones de correo, y después con la cadena mail.com para identificar la plataforma, ya que el contenido de las páginas web abiertas permanece en la memoria de esos procesos. La última captura, que lista los procesos propietarios de los hallazgos, permite confirmar el navegador.",
        ],
    },
    {
        id: "cartera",
        statement:
            "Después de un análisis exhaustivo, se obtuvo un indicio de interés, se trata del proceso 3720, el cual fue ejecutado en el ordenador vulnerado, dicho proceso indica una ejecución falsa de un programa, sin embargo, oculta un mensaje malicioso. Identifique pues la cartera del monedero cripto a donde presuntamente son enviados los recursos del rescate.",
        commands: [
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 cmdline -p 3720`,
            String.raw`.\volatility.exe -f .\OtterCTF.vmem --profile=Win7SP1x64 yarascan -p 3720 -W -Y "/[13][a-km-zA-HJ-NP-Z1-9]{25,34}/" > wallet_w.txt`,
        ],
        figures: [
            ["ev-13", "Salida de cmdline sobre el proceso 3720"],
            ["ev-14", "Búsqueda de referencias a Bitcoin en el proceso 3720"],
            ["ev-15", "Salida de yarascan con el patrón de cartera"],
            ["ev-16", "Consulta de la cartera en BTC Black"],
        ],
        labeled: [
            {
                label: "¿Cuál es la cartera de criptomoneda?",
                text: "La cartera es 1MmpEmebJkqXG8nQv4cjJSmxZQFVmFo63M, una dirección Bitcoin válida, hallada en la memoria del proceso 3720 junto al mensaje “Send 0.16 to the address below. I paid, Now give me back my files.” El proceso se ejecuta como vmware-tray.exe desde C:\\Users\\Rick\\AppData\\Local\\Temp\\RarSFX0\\, una carpeta temporal de un archivo autoextraíble, y no desde la instalación de VMware. Su memoria contiene referencias a encryptDirectory, criptografía y al proyecto hidden_tear, por lo que se trata de un ransomware que se hace pasar por un componente de VMware.",
            },
            {
                label: "¿Dicha cartera se encuentra reportada en listas negras de BTC black?",
                text: "No. La consulta en BTC Black indica que la dirección no está en la lista negra. Esto significa solo que no hay reportes registrados en esa base de datos, no que la cartera sea legítima, por lo que debe investigarse por otras vías, como el análisis de sus transacciones en el blockchain.",
            },
        ],
        paragraphs: [
            "El plugin cmdline muestra la ruta y los argumentos con los que se lanzó el proceso, lo que permite detectar el engaño. El plugin yarascan busca patrones en la memoria; se usó una expresión regular con la forma de una dirección Bitcoin y la opción -W para texto Unicode, que es como el programa almacena el mensaje.",
        ],
    },
];

const hallazgos = [
    "El análisis del volcado de memoria permitió identificar el equipo como un Windows 7 SP1 de 64 bits, de nombre WIN-LO6FAF3DTFE, que contiene las iniciales FAF3 y TFE señaladas en el caso, con la IP local privada 192.168.202.131, capturado el 4 de agosto de 2018 a las 22:34:22 (UTC+3). Estos datos permiten vincular el equipo con la evidencia EV455FGM. La cuenta de usuario Rick tenía configurado el inicio de sesión automático, por lo que su contraseña, MortyIsReallyAnOtter, quedó almacenada en el sistema y fue recuperable de la memoria, lo que se relaciona con el alias “Morty” y con la evidencia EV456FGM.",
    "La actividad del usuario coincide con las hipótesis del caso: ejecutó BitTorrent.exe, relacionado con los servicios Torrent; LunarMS.exe, que se conectó al servidor 77.102.199.102 por el puerto 7575, ubicado aproximadamente en Londres, Reino Unido; y Chrome, desde donde accedió al correo web de mail.com con las cuentas rickypinky@mail.com y rickopicko@mail.com. Además, el proceso 3720 se hace pasar por un componente de VMware, pero se ejecuta desde una carpeta temporal y contiene un programa de cifrado de tipo ransomware, con un mensaje que solicita enviar 0.16 BTC a la cartera 1MmpEmebJkqXG8nQv4cjJSmxZQFVmFo63M, que no figura en las listas negras de BTC Black.",
];

const lineasInvestigacion = [
    "Se recomienda rastrear la cartera en el blockchain para conocer sus transacciones y el destino de los fondos, ya que no estar en una lista negra no la descarta. En paralelo, se puede solicitar a mail.com, por la vía legal correspondiente, información sobre las cuentas utilizadas como datos de registro, direcciones IP de acceso y mensajes enviados, e investigar a quién le pertenece el servidor 77.102.199.102 y qué función cumple dentro del esquema de los servidores Lunar.",
    "Para profundizar en el análisis técnico, conviene examinar el ejecutable vmware-tray.exe en el disco del equipo, adquirir y analizar su imagen, y revisar el historial de Chrome y los archivos de registro del usuario para intentar reconstruir su actividad. Finalmente, se recomienda calcular el hash del volcado OtterCTF.vmem y mantener la cadena de custodia, para garantizar la validez de los hallazgos.",
];

const conclusion =
    "El análisis de memoria volátil permitió reconstruir, a partir de una sola imagen de RAM, el estado del equipo al momento de su captura: quién lo usaba, qué programas ejecutaba, con qué servidores y cuentas de correo se comunicaba y qué amenaza permanecía activa, información que un análisis de disco no habría mostrado con la misma inmediatez. Los hallazgos son consistentes con las hipótesis del caso y aportan indicios sólidos para vincular el equipo con las evidencias EV455FGM y EV456FGM, aunque deben considerarse como indicios y no como prueba concluyente: la geolocalización de la IP es aproximada, que la cartera no figure en una lista negra no la descarta, y aún debe determinarse si el equipo es el origen o una víctima del ransomware. Por ello, el siguiente paso es corroborar estos resultados con otras fuentes, como el análisis del disco, la cadena de bloques y la información de los proveedores involucrados. En conjunto, la actividad mostró el valor de Volatility y del análisis de memoria como herramienta de investigación en casos de cibercrimen.";

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

                <p className="mt-5 font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                    {item.commands.length > 1 ? "Comandos" : "Comando"}
                </p>
                <CodeBlock lines={item.commands} />

                {item.figures.map(([key, caption]) => (
                    <ActivityFigure
                        key={key + caption}
                        src={evidenceSrc(key)}
                        alt={caption}
                        number={figureNumber(key)}
                        caption={caption}
                        className="max-w-3xl"
                    />
                ))}

                {item.figureNote && (
                    <p className="mt-4 font-mono text-[0.7rem] text-muted">
                        {item.figureNote}
                    </p>
                )}

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

function Activity17() {
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

    // Inter's contextual alternates turn the x in "Win7SP1x64" into a multiplication sign.
    return (
        <article className="font-features-['calt'_0]">
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
                                Parcial III / Actividad 17
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                La memoria{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    del crimen
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl font-mono text-2xl tracking-wide text-accent uppercase">
                                Extracción de Evidencia de un volcado de RAM
                            </p>
                            <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Análisis forense de memoria volátil con Volatility sobre el volcado                OtterCTF.vmem de un presunto cibercriminal: equipo, credenciales,
                                conexiones, procesos, correos y la cartera de un ransomware.
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
                                <dd className="mt-1">Volatility</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Muestra</dt>
                                <dd className="mt-1">OtterCTF.vmem</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/OrtizLopezFriedaMaría-Act17.pdf"}
                            download="OrtizLopezFriedaMaría-Act17.pdf"
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

                        <nav aria-label="Contenido de la Actividad 17" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/activity-17#" + section.id}
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
                                Volatility · geolocation.com · BTC Black
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 space-y-24 lg:col-span-9">
                    <ActivitySection id="hechos" number="01" title="Hechos del caso">
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            <p>
                                Elementos de la FGM especializada obtuvieron una
                                muestra de un volcado de memoria RAM de un presunto
                                cibercriminal, a quien se presume que realiza
                                actividades para el trasiego de estupefacientes y
                                rapto. Según información de fuentes abiertas, tiene
                                amplios conocimientos en tecnologías de la
                                información y “engancha” a sus víctimas mediante
                                ingeniería social en redes sociales. Las hipótesis
                                son:
                            </p>

                            <ul className="list-disc space-y-3 pl-6">
                                {hipotesis.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="analisis"
                        number="02"
                        title="Análisis de memoria"
                    >
                        <ol className="divide-y divide-border">
                            {preguntas.map((item, index) => (
                                <Question key={item.id} item={item} index={index} />
                            ))}
                        </ol>
                    </ActivitySection>

                    <ActivitySection id="hallazgos" number="03" title="Hallazgos">
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {hallazgos.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    <ActivitySection
                        id="lineas"
                        number="04"
                        title="Líneas de investigación y recomendaciones"
                    >
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {lineasInvestigacion.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    <ActivitySection id="conclusion" number="05" title="Conclusión">
                        <p className="max-w-3xl leading-7 text-muted">{conclusion}</p>
                    </ActivitySection>

                    <ActivitySection id="recursos" number="06" title="Recursos">
                        <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
                            <ResourceLink
                                href={resourceBase + "/OrtizLopezFriedaMaría-Act17.pdf"}
                                type="PDF"
                                title="Informe forense"
                                description="Informe completo con los comandos, capturas, hallazgos y conclusión."
                                download="OrtizLopezFriedaMaría-Act17.pdf"
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Activity17;
