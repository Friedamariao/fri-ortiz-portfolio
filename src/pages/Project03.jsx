import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivitySection from "../components/activities/ActivitySection";
import ActivityFigure from "../components/activities/ActivityFigure";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
    { id: "introduccion", label: "Introducción" },
    { id: "evidencia", label: "Extracción e identificación" },
    { id: "sistema", label: "Sistema operativo y navegación" },
    { id: "documentos", label: "Documentos, imágenes y metadatos" },
    { id: "programas", label: "Programas y otros artefactos" },
    { id: "analisis", label: "Investigación y análisis del caso" },
    { id: "referencias", label: "Referencias" },
    { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/project-03";

const evidenceModules = import.meta.glob("../assets/project-03/*.png", {
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

const introduccion = [
    "Una operación internacional de inteligencia alertó a las autoridades de Nueva Zelanda sobre el posible ingreso de sustancias ilícitas a su territorio. Como resultado, dos pasajeros procedentes de Australia, identificados como John Fredricksen y Jane Esteban, fueron interceptados por agentes aduanales en el aeropuerto de Wellington.",
    "Durante la inspección del equipaje se descubrió un kilogramo de metanfetamina oculto en una maleta. Tras el aseguramiento de los pasajeros, las autoridades obtuvieron información sobre dos posibles lugares de entrega: la biblioteca de Eastbourne y un inmueble ubicado en Petone.",
    "La intervención policial en este último domicilio permitió localizar sustancias ilícitas, armas de fuego y una computadora de escritorio. El inmueble se encuentra relacionado con Steve Kowhai, un individuo bajo investigación por su posible participación en actividades de distribución de drogas.",
    "Los investigadores consideran que el dispositivo podría contener información sobre comunicaciones entre los involucrados, desplazamientos, archivos relacionados con las operaciones y mecanismos empleados para ocultar información.",
    "Para el desarrollo de esta práctica se utiliza la imagen forense Narcos-1, perteneciente al escenario 2019 Narcos de Digital Corpora. Mediante Autopsy se busca identificar y analizar los artefactos digitales almacenados en el equipo, relacionar los hallazgos con el contexto de la investigación y determinar qué actividades pueden sustentarse a partir de la evidencia disponible. El uso de conjuntos de datos estandarizados permite aplicar y evaluar procedimientos de informática forense en un entorno académico (Garfinkel et al., 2009).",
];

const actividad = [
    "Formas parte de una unidad especializada de investigación forense digital. Las autoridades han puesto a tu disposición una imagen forense del equipo relacionado con Steve Kowhai, identificada como Narcos-1.",
    "Tu responsabilidad consiste en examinar la evidencia digital para identificar información relevante, reconstruir acontecimientos y determinar qué indicios permiten establecer posibles vínculos entre el dispositivo analizado y los hechos investigados.",
    "El objetivo central de la investigación será determinar qué actividades pueden demostrarse a partir del disco.",
];

const evidenciaIntro =
    "Descarga Narcos-1.zip, conserva el archivo original y verifica su integridad. Usa FTK Imager, Autopsy u otra herramienta compatible. Para cada respuesta registra el valor exacto, la ruta dentro de la imagen, la herramienta o procedimiento y una captura o salida comprobable.";

const analisisIntro =
    "En esta segunda parte no bastará identificar archivos. Fundamenta cada respuesta en indicios localizados en Narcos-1. Señala expresamente lo observado, la interpretación que propones y aquello que no puede confirmarse con la evidencia disponible. Registra fechas con zona horaria y evita afirmar que una descarga equivale a una ejecución.";

/*
 * Each part holds its entries. An entry has an optional question number,
 * a title (the question statement) and an ordered list of blocks:
 *   p      paragraph (optional bold lead)
 *   h      sub-heading
 *   facts  label / value pairs
 *   table  head + rows
 *   figs   figures as [imageKey, caption]
 */
const parts = [
    {
        id: "evidencia",
        title: "Extracción e identificación de evidencia digital",
        intro: evidenciaIntro,
        entries: [
            {
                id: "hash",
                title: "Identificación e integridad de la evidencia digital",
                blocks: [
                    {
                        t: "p",
                        v: "Como parte de la preparación de la evidencia, calculé el hash SHA-256 del archivo Narcos-1.001, correspondiente a la imagen forense utilizada durante la investigación.",
                    },
                    {
                        t: "p",
                        v: "Para realizar este procedimiento, utilicé Windows PowerShell 5.1 mediante el comando Get-FileHash, especificando el algoritmo SHA-256. Este cálculo genera una huella digital de 64 caracteres hexadecimales que permite identificar el archivo y detectar posibles modificaciones mediante comparaciones posteriores.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["Archivo analizado", "Narcos-1.001"],
                            ["Herramienta", "Windows PowerShell 5.1"],
                            ["Algoritmo", "SHA-256"],
                            [
                                "Hash obtenido",
                                "F6E02885C1EA25729D2E1F895D8E771D1D62514F4C517337532CF2BC576A203E",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image2", "Hash SHA-256 de Narcos-1.001 calculado en PowerShell"],
                        ],
                    },
                    {
                        t: "p",
                        v: "El valor obtenido se registró como referencia de integridad para la imagen forense examinada. No se realizó una comparación con un hash oficial de origen, por lo que este procedimiento documenta la huella digital del archivo disponible.",
                    },
                ],
            },
            {
                id: "autopsy",
                title: "Configuración de Autopsy",
                blocks: [
                    {
                        t: "p",
                        v: "Para realizar el análisis forense, creé un nuevo caso en Autopsy denominado PR03-Narcos. Seleccioné el archivo Narcos-1.001 como fuente de datos y establecí la zona horaria Pacific/Auckland, correspondiente a Nueva Zelanda.",
                    },
                    {
                        t: "figs",
                        items: [
                            [
                                "image3",
                                "Fuente de datos Narcos-1.001 y zona horaria Pacific/Auckland en Autopsy",
                            ],
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "sistema",
        title: "Sistema operativo y navegación",
        entries: [
            {
                id: "windows",
                number: "01",
                title: "¿Qué edición y versión de Windows se encuentran instaladas en el equipo? Indica el artefacto donde se obtiene la información.",
                blocks: [
                    {
                        t: "p",
                        v: "Mediante Autopsy identifiqué el equipo tenía instalado Windows 10 Pro, versión 1809, con arquitectura de 64 bits y compilación 17763. Inicialmente, consulté el apartado Operating System Information y posteriormente confirmé la edición y versión mediante los valores ProductName, ReleaseId y CurrentBuild de la clave CurrentVersion del registro de Windows.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["Ruta de la evidencia", "C:\\Windows\\System32\\config\\SOFTWARE"],
                            [
                                "Clave del registro",
                                "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image4", "Operating System Information en Autopsy"],
                            ["image5", "Clave CurrentVersion del archivo SOFTWARE"],
                        ],
                    },
                ],
            },
            {
                id: "perfil",
                number: "02",
                title: "¿Cuál es el nombre de la carpeta del perfil principal y cuál es su ruta absoluta?",
                blocks: [
                    {
                        t: "p",
                        v: "El perfil principal del equipo se identificó al examinar el directorio Users, donde se localizó la carpeta Steve, correspondiente al usuario del sistema investigado.",
                    },
                    { t: "facts", rows: [["Ruta de la evidencia", "C:\\Users\\Steve"]] },
                    { t: "figs", items: [["image6", "Carpeta Steve dentro del directorio Users"]] },
                ],
            },
            {
                id: "userassist",
                number: "03",
                title: "¿Cuál es la ruta de la clave UserAssist que registra actividad de programas en el perfil principal?",
                blocks: [
                    {
                        t: "p",
                        v: "Dentro del archivo NTUSER.DAT del perfil Steve, localicé la clave UserAssist, la cual almacena información relacionada con la ejecución de programas y la actividad del usuario en Windows (Singh & Singh, 2017).",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["Ruta de la evidencia", "C:\\Users\\Steve\\NTUSER.DAT"],
                            [
                                "Clave del registro",
                                "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\UserAssist",
                            ],
                        ],
                    },
                    { t: "figs", items: [["image7", "Clave UserAssist en NTUSER.DAT"]] },
                ],
            },
            {
                id: "navegadores",
                number: "04",
                title: "¿Qué dos navegadores presentan artefactos de actividad? Identifica el archivo o base de datos del historial de cada uno.",
                blocks: [
                    {
                        t: "p",
                        v: "Al revisar el apartado Web History, se identificaron registros de actividad correspondientes a Google Chrome y Microsoft Edge. En Chrome, el historial se encuentra en el archivo History del perfil Default, mientras que los registros asociados a Edge se almacenan en la base de datos WebCacheV01.dat.",
                    },
                    {
                        t: "facts",
                        rows: [
                            [
                                "Google Chrome",
                                "C:\\Users\\Steve\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History",
                            ],
                            [
                                "Microsoft Edge",
                                "C:\\Users\\Steve\\AppData\\Local\\Microsoft\\Windows\\WebCache\\WebCacheV01.dat",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image8", "Registros de Google Chrome en Web History"],
                            ["image9", "Registros de Microsoft Edge en Web History"],
                        ],
                    },
                ],
            },
            {
                id: "md5-history",
                number: "05",
                title: "¿Cuál es el hash MD5 del archivo History del perfil predeterminado de Chrome?",
                blocks: [
                    {
                        t: "p",
                        v: "Se localizó el archivo History dentro del perfil predeterminado de Google Chrome y se consultaron sus metadatos en el apartado File Metadata, donde se obtuvo su hash MD5.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["MD5", "f3f979c6dee9fbb7cbdf5818aaa4b723"],
                            [
                                "Ruta",
                                "C:\\Users\\Steve\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\History",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image10", "Metadatos del archivo History de Chrome"]],
                    },
                ],
            },
        ],
    },
    {
        id: "documentos",
        title: "Documentos, imágenes y metadatos",
        entries: [
            {
                id: "ruta-airport",
                number: "06",
                title: "¿Cuál es la ruta absoluta del archivo airport crystals.jpg?",
                blocks: [
                    {
                        t: "p",
                        v: "Se realizó una búsqueda por nombre mediante File Search by Attributes. El archivo airport crystals.jpg se localizó dentro de la carpeta Misc, perteneciente al directorio de documentos del usuario Steve.",
                    },
                    {
                        t: "facts",
                        rows: [
                            [
                                "Ruta absoluta",
                                "C:\\Users\\Steve\\Documents\\Misc\\airport crystals.jpg",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image11", "Búsqueda por nombre de airport crystals.jpg"],
                            ["image12", "Archivo airport crystals.jpg en la carpeta Misc"],
                        ],
                    },
                ],
            },
            {
                id: "creacion-airport",
                number: "07",
                title: "¿Cuál es la fecha y hora de creación de airport crystals.jpg (NZDT)?",
                blocks: [
                    {
                        t: "p",
                        v: "Inicialmente, los metadatos del archivo mostraban las fechas en la zona horaria local (CST). Para obtener la hora correspondiente a Nueva Zelanda, ingresé a Tools → Options → View y, en el apartado When displaying times, seleccioné la opción Use another time zone, estableciendo Pacific/Auckland como zona horaria de visualización.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image13", "Zona horaria de visualización Pacific/Auckland"],
                        ],
                    },
                    {
                        t: "p",
                        v: "Una vez aplicada la configuración, consulté nuevamente el atributo Created del archivo, obteniendo la siguiente información:",
                    },
                    {
                        t: "facts",
                        rows: [
                            [
                                "Fecha y hora de creación",
                                "31 de enero de 2019 a las 10:25:18 NZDT (UTC+13)",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image14", "Atributo Created de airport crystals.jpg en NZDT"]],
                    },
                ],
            },
            {
                id: "md5-dropoff",
                number: "08",
                title: "¿Cuál es el hash MD5 completo de dropoff.jpg?",
                blocks: [
                    {
                        t: "p",
                        v: "Se localizó el archivo dropoff.jpg mediante una búsqueda por su atributo de nombre y se consultó el hash MD5 registrado en sus metadatos.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["MD5", "7feb763bebe42c3a3464c9ee3bb1d3e8"],
                            ["Ruta", "C:\\Users\\Steve\\Documents\\Misc\\dropoff.jpg"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image15", "Búsqueda por nombre de dropoff.jpg"],
                            ["image16", "Metadatos de dropoff.jpg"],
                        ],
                    },
                ],
            },
            {
                id: "modificacion-dropoff",
                number: "09",
                title: "¿Cuál es la fecha y hora de última modificación de dropoff.jpg (NZDT)?",
                blocks: [
                    {
                        t: "p",
                        v: "Al consultar el atributo Modified de los metadatos, con la zona horaria Pacific/Auckland previamente configurada, se obtuvo la siguiente fecha de última modificación:",
                    },
                    {
                        t: "facts",
                        rows: [["Fecha y hora", "2 de febrero de 2019 a las 14:06:06 NZDT (UTC+13)"]],
                    },
                    {
                        t: "figs",
                        items: [["image16", "Atributo Modified de dropoff.jpg en NZDT"]],
                    },
                ],
            },
            {
                id: "flightbookings",
                number: "10",
                title: "¿Cuál es el nombre exacto y la ruta del archivo de imagen relacionado con reservaciones de vuelo en Documents\\Misc?",
                blocks: [
                    {
                        t: "p",
                        v: "Al explorar la carpeta Misc del directorio de documentos del usuario Steve, se identificó una imagen en formato PNG relacionada con reservaciones de vuelo.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["Nombre del archivo", "flightbookings.PNG"],
                            [
                                "Ruta absoluta",
                                "C:\\Users\\Steve\\Documents\\Misc\\flightbookings.PNG",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image17", "Archivo flightbookings.PNG en la carpeta Misc"]],
                    },
                ],
            },
            {
                id: "md5-method",
                number: "11",
                title: "¿Cuál es el hash MD5 del archivo Method run.jpg?",
                blocks: [
                    {
                        t: "p",
                        v: "Dentro de la carpeta Misc, se localizó el archivo Method run.jpg y se consultaron sus metadatos para obtener el valor correspondiente al hash MD5.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["MD5", "69b225bc0ef5a0c003f1e2a6646aaf92"],
                            ["Ruta", "C:\\Users\\Steve\\Documents\\Misc\\Method run.jpg"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image18", "Metadatos de Method run.jpg"]],
                    },
                ],
            },
        ],
    },
    {
        id: "programas",
        title: "Programas y otros artefactos",
        entries: [
            {
                id: "md5-bne",
                number: "12",
                title: "¿Cuál es el hash MD5 completo de BNE.png?",
                blocks: [
                    {
                        t: "p",
                        v: "Se realizó una búsqueda por nombre del archivo BNE.png, el cual se localizó en la subcarpeta Misc del directorio de descargas del usuario Steve. Posteriormente, se consultaron sus metadatos para obtener el hash MD5.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["MD5", "dffa98bdd7371d1806adb09db27ba283"],
                            ["Ruta", "C:\\Users\\Steve\\Downloads\\Misc\\BNE.png"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image19", "Metadatos de BNE.png"]],
                    },
                ],
            },
            {
                id: "esteganografia",
                number: "13",
                title: "¿Cuál es el nombre, ruta y MD5 del instalador de una herramienta de esteganografía en Downloads?",
                blocks: [
                    {
                        t: "p",
                        v: "Dentro del directorio de descargas se identificó el instalador de Image Steganography, una herramienta que permite ocultar información dentro de imágenes. Al consultar sus metadatos, se obtuvo el hash MD5 del archivo.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["Nombre del archivo", "Image Steganography 1.5.2 Setup.exe"],
                            [
                                "Ruta",
                                "C:\\Users\\Steve\\Downloads\\Image Steganography 1.5.2 Setup.exe",
                            ],
                            ["MD5", "c9b7c382dea6d7f45ae1bf437860cb69"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image20", "Búsqueda por atributos en Autopsy"],
                            ["image21", "Metadatos del instalador Image Steganography 1.5.2"],
                        ],
                    },
                ],
            },
            {
                id: "cifrado",
                number: "14",
                title: "¿Cuál es el nombre y la ruta del instalador de una herramienta de cifrado encontrado en Downloads?",
                blocks: [
                    {
                        t: "p",
                        v: "Al examinar el directorio de descargas del usuario Steve, identifiqué un archivo ejecutable correspondiente al instalador de TrueCrypt, versión 7.1a, una herramienta diseñada para proteger información mediante la creación de volúmenes cifrados. Su presencia constituye un indicio de interés en mecanismos de protección u ocultación de información; sin embargo, el hallazgo del instalador por sí solo no permite confirmar que el programa haya sido instalado o utilizado.",
                    },
                    {
                        t: "facts",
                        rows: [
                            ["Nombre del archivo", "TrueCrypt Setup 7.1a.exe"],
                            ["Ruta", "C:\\Users\\Steve\\Downloads\\TrueCrypt Setup 7.1a.exe"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image22", "Instalador TrueCrypt Setup 7.1a.exe en Downloads"]],
                    },
                ],
            },
            {
                id: "discord-timeline",
                number: "15",
                title: "¿Cuáles son las rutas de la caché de Discord y de ActivitiesCache.db utilizada por Windows Timeline?",
                blocks: [
                    {
                        t: "p",
                        v: "Dentro del perfil Steve, localicé la carpeta de caché de Discord en el directorio AppData\\Roaming, donde se conservan archivos temporales generados por la aplicación. Asimismo, mediante una búsqueda por nombre, identifiqué el archivo ActivitiesCache.db, una base de datos SQLite utilizada por Windows Timeline para almacenar registros relacionados con la actividad del usuario en el sistema.",
                    },
                    {
                        t: "p",
                        v: "Ambos artefactos son de interés forense, ya que permiten complementar la investigación sobre el uso de aplicaciones y las actividades realizadas en el equipo.",
                    },
                    {
                        t: "facts",
                        rows: [
                            [
                                "Ruta de la caché de Discord",
                                "C:\\Users\\Steve\\AppData\\Roaming\\Discord\\Cache",
                            ],
                            [
                                "Ruta de Windows Timeline",
                                "C:\\Users\\Steve\\AppData\\Local\\ConnectedDevicesPlatform\\2418c0082017486a\\ActivitiesCache.db",
                            ],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image23", "Caché de Discord en AppData\\Roaming"],
                            ["image24", "Archivo ActivitiesCache.db de Windows Timeline"],
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "analisis",
        title: "Investigación, interpretación y análisis del caso",
        intro: analisisIntro,
        entries: [
            {
                id: "coincidencias",
                number: "16",
                title: "Examina flightbookings, BNE.png y dropoff.jpg. ¿Qué coincidencias sobre lugares, desplazamientos o logística identificas?",
                blocks: [
                    {
                        t: "p",
                        v: "Al examinar el contenido de las tres imágenes mediante la pestaña Application de Autopsy, identifiqué las siguientes coincidencias geográficas y temporales:",
                    },
                    {
                        t: "p",
                        lead: "BNE.png:",
                        v: "contiene una fotografía del Story Bridge y el paisaje urbano de Brisbane, Australia (Brisbane City Council, s. f.). El nombre del archivo coincide con el código aeroportuario que aparece en la cotización de vuelos.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image25", "BNE.png en Autopsy"],
                            ["image26", "Contenido de BNE.png"],
                        ],
                    },
                    {
                        t: "p",
                        lead: "flightbookings.PNG:",
                        v: "muestra una cotización para dos pasajeros adultos, con un vuelo de Brisbane (BNE) a Wellington (WLG) el 16 de febrero de 2019 mediante Virgin Australia y un vuelo de regreso el 23 de febrero de 2019 mediante Qantas Airways, con escala en AKL. El costo total indicado es de AU$1,327.82.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image27", "flightbookings.PNG en Autopsy"],
                            ["image28", "Cotización de vuelos Brisbane–Wellington"],
                        ],
                    },
                    {
                        t: "p",
                        lead: "dropoff.jpg:",
                        v: "contiene una captura de Google Maps en la que se señala la ubicación de Eastbourne Library, situada en 38 Rimu St, Eastbourne, Lower Hutt, Nueva Zelanda. Este lugar coincide con uno de los posibles puntos de entrega mencionados en el contexto de la investigación.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image29", "dropoff.jpg en Autopsy"],
                            ["image30", "Ubicación de Eastbourne Library en Google Maps"],
                        ],
                    },
                    {
                        t: "p",
                        v: "Adicionalmente, al comparar los metadatos de los archivos, identifiqué la siguiente relación temporal:",
                    },
                    {
                        t: "table",
                        head: ["Archivo", "Fecha y hora de creación (NZDT)"],
                        rows: [
                            ["BNE.png", "01/02/2019 13:13:19"],
                            ["dropoff.jpg", "02/02/2019 14:06:05"],
                            ["flightbookings.PNG", "02/02/2019 15:28:44"],
                        ],
                    },
                    {
                        t: "p",
                        v: "Los tres archivos presentan la misma fecha y hora de último acceso: 2 de febrero de 2019 a las 15:31:06 NZDT (UTC+13).",
                    },
                    { t: "h", v: "Interpretación" },
                    {
                        t: "p",
                        v: "La coincidencia entre las ubicaciones, los desplazamientos internacionales y el número de pasajeros constituye un indicio de que el equipo pudo haber sido utilizado para consultar o recopilar información relacionada con la planificación logística de los hechos investigados. Particularmente, la ubicación de Eastbourne Library resulta relevante debido a su coincidencia directa con uno de los posibles puntos de entrega identificados por las autoridades.",
                    },
                    { t: "h", v: "Limitaciones" },
                    {
                        t: "p",
                        v: "La evidencia disponible no permite confirmar que los vuelos hayan sido adquiridos, que los pasajeros de la cotización correspondan a John Fredricksen y Jane Esteban, ni que se haya efectuado una entrega en la biblioteca. Asimismo, la coincidencia en las fechas de último acceso no demuestra que los archivos hayan sido abiertos intencionalmente por Steve Kowhai, puesto que también podría corresponder a procesos automatizados del sistema o de alguna aplicación.",
                    },
                ],
            },
            {
                id: "rutas",
                number: "17",
                title: "Contrasta airport crystals.jpg y Method run.jpg con un registro de actividad del equipo. ¿Qué interpretación sobre su finalidad puede sostenerse?",
                blocks: [
                    {
                        t: "p",
                        v: "Al examinar el contenido de las imágenes, identifiqué que ambas representan desplazamientos terrestres dentro de la región de Wellington, Nueva Zelanda.",
                    },
                    {
                        t: "p",
                        v: "El archivo airport crystals.jpg muestra un trayecto entre Eastbourne y el aeropuerto internacional de Wellington, pasando por Petone, con una distancia de 31.6 km y un tiempo estimado de 47 minutos en automóvil.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image31", "airport crystals.jpg en Autopsy"],
                            ["image32", "Contenido de airport crystals.jpg"],
                        ],
                    },
                    {
                        t: "p",
                        v: "Por su parte, Method run.jpg presenta un recorrido que incluye Eastbourne, Wainuiomata, Naenae y Stokes Valley, con una distancia de 42.5 km y un tiempo estimado de 54 minutos. Adicionalmente, contiene una anotación en color rojo con la palabra «Home» junto a Eastbourne.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image33", "Method run.jpg en Autopsy"],
                            ["image34", "Contenido de Method run.jpg"],
                        ],
                    },
                    { t: "h", v: "Correlación con el historial de navegación" },
                    {
                        t: "p",
                        v: "Para corroborar los hallazgos, analicé el historial de navegación de Google Chrome mediante el apartado Web History de Autopsy, donde identifiqué registros de consultas en Google Maps realizadas el 31 de enero de 2019, cuyas ubicaciones coinciden con las representadas en las imágenes recuperadas.",
                    },
                    {
                        t: "p",
                        v: "A las 10:19:26 NZDT se registró una consulta que incluía las cuatro localidades presentes en Method run.jpg: Wainuiomata, Eastbourne, Stokes Valley y Naenae. La creación del archivo ocurrió 1 minuto y 58 segundos después de dicha consulta.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image35", "Consulta de Google Maps con las cuatro localidades"],
                        ],
                    },
                    {
                        t: "p",
                        v: "Asimismo, a las 10:24:43 NZDT se registró una consulta de la ruta entre Eastbourne y el Aeropuerto Internacional de Wellington, tan solo 35 segundos antes de la creación de airport crystals.jpg. Esta coincidencia temporal y geográfica permite establecer una relación entre el historial de navegación y el contenido de la imagen.",
                    },
                    {
                        t: "figs",
                        items: [
                            [
                                "image36",
                                "Consulta de la ruta Eastbourne–Aeropuerto Internacional de Wellington",
                            ],
                        ],
                    },
                    { t: "h", v: "Registros de archivos recientes" },
                    {
                        t: "p",
                        v: "Como evidencia complementaria, identifiqué referencias a ambas imágenes en el apartado Recent Documents, mediante los archivos de acceso directo Method run.lnk y airport crystals.lnk. Estos registros permiten corroborar su ubicación dentro del perfil del usuario Steve y presentan fechas de acceso que coinciden con las fechas de creación de las imágenes.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image37", "Recent Documents: Method run.lnk"],
                            ["image38", "Recent Documents: airport crystals.lnk"],
                        ],
                    },
                    { t: "h", v: "Artefactos de navegación de Microsoft Edge" },
                    {
                        t: "p",
                        v: "También encontré referencias a ambos archivos en los registros recuperados de WebCacheV01.dat, asociados al usuario Steve. Las direcciones registradas utilizan el protocolo file:///, lo que permite identificar referencias a los archivos almacenados localmente en el equipo, aunque estos registros no presentan una fecha de acceso.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image39", "WebCacheV01.dat: referencia a Method run.jpg"],
                            ["image40", "WebCacheV01.dat: referencia a airport crystals.jpg"],
                        ],
                    },
                    { t: "h", v: "Identificación de la herramienta de captura" },
                    {
                        t: "p",
                        v: "Finalmente, analicé los flujos alternativos de datos Zone.Identifier de ambas imágenes. En los dos archivos identifiqué el atributo:",
                    },
                    {
                        t: "facts",
                        rows: [
                            [
                                "Atributo",
                                "LastWriterPackageFamilyName=Microsoft.ScreenSketch_8wekyb3d8bbwe",
                            ],
                        ],
                    },
                    {
                        t: "p",
                        v: "Este registro es compatible con la intervención de la herramienta de captura de pantalla de Windows en el almacenamiento o procesamiento de las imágenes.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image41", "Zone.Identifier de airport crystals.jpg"],
                            ["image42", "Zone.Identifier de Method run.jpg"],
                        ],
                    },
                    { t: "h", v: "Interpretación" },
                    {
                        t: "p",
                        v: "La correspondencia geográfica y la proximidad temporal entre las consultas de Google Maps y la creación de las imágenes, junto con los registros de archivos recientes y los indicios del uso de la herramienta de captura de pantalla de Windows, permiten sostener que el equipo fue utilizado para consultar rutas y conservar representaciones de posibles desplazamientos. Considerando que Eastbourne, Petone y el Aeropuerto Internacional de Wellington son lugares relevantes para los hechos investigados, estas actividades constituyen indicios de una posible planificación logística relacionada con el caso.",
                    },
                    { t: "h", v: "Limitaciones" },
                    {
                        t: "p",
                        v: "La evidencia no permite confirmar que los recorridos se hayan realizado físicamente, que su finalidad fuera el transporte de sustancias ilícitas ni que Steve Kowhai haya sido personalmente responsable de las consultas o de la creación de las imágenes. Tampoco es posible establecer que Eastbourne fuera su domicilio únicamente a partir de la anotación «Home».",
                    },
                ],
            },
            {
                id: "discord",
                number: "18",
                title: "¿Qué evidencia permite afirmar que Discord estuvo presente o fue utilizado en el equipo? ¿Qué no puede concluirse sobre conversaciones, interlocutores o autoría sin recuperar mensajes verificables?",
                blocks: [
                    {
                        t: "p",
                        v: "Durante el análisis identifiqué el archivo DiscordSetup.exe dentro del directorio de descargas del usuario Steve, lo cual confirma la presencia del instalador de Discord en el equipo.",
                    },
                    {
                        t: "table",
                        head: ["Atributo", "Valor"],
                        rows: [
                            ["Nombre", "DiscordSetup.exe"],
                            ["Ruta", "C:\\Users\\Steve\\Downloads\\Misc\\DiscordSetup.exe"],
                            ["Creación", "29/01/2019 09:56:03 NZDT"],
                            ["Modificación", "29/01/2019 09:56:07 NZDT"],
                            ["Tamaño", "61,394,264 bytes"],
                            ["MD5", "0e0d73ea5cea1e930a1a1349d0907ef5"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image43", "Metadatos de DiscordSetup.exe"]],
                    },
                    { t: "h", v: "Evidencia de ejecución" },
                    {
                        t: "p",
                        v: "Aunque Discord no apareció entre los programas identificados en el apartado Installed Programs, encontré múltiples registros correspondientes a DISCORD.EXE en Run Programs, recuperados de archivos Prefetch de Windows. Estos archivos registran información relacionada con el inicio de aplicaciones, por lo que constituyen evidencia de su ejecución (Microsoft, 2021).",
                    },
                    {
                        t: "p",
                        v: "Entre los registros identificados se encuentran los siguientes:",
                    },
                    {
                        t: "table",
                        head: ["Fecha", "Hora (NZDT)"],
                        rows: [
                            ["29/01/2019", "09:57:09"],
                            ["30/01/2019", "10:02:53"],
                            ["31/01/2019", "09:41:16"],
                            ["01/02/2019", "15:39:41"],
                            ["02/02/2019", "15:38:39"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [["image44", "Registros Prefetch de DISCORD.EXE en Run Programs"]],
                    },
                    { t: "h", v: "Evidencia de actividad de la aplicación" },
                    {
                        t: "p",
                        v: "Dentro del perfil del usuario Steve identifiqué el directorio C:\\Users\\Steve\\AppData\\Roaming\\Discord\\. En este se encontraron archivos de configuración, cookies, registros y directorios de almacenamiento asociados con la aplicación, además de referencias a la versión 0.0.304.",
                    },
                    {
                        t: "figs",
                        items: [["image45", "Directorio AppData\\Roaming\\Discord"]],
                    },
                    {
                        t: "p",
                        v: "Al examinar los archivos de la aplicación, identifiqué los siguientes artefactos:",
                    },
                    {
                        t: "table",
                        head: ["Artefacto", "Hallazgo"],
                        rows: [
                            ["Cache", "Recursos almacenados y referencias a dominios de Discord."],
                            ["Local Storage\\leveldb", "Archivos de almacenamiento local persistente."],
                            ["GPUCache", "Archivos de caché relacionados con el procesamiento gráfico."],
                            ["settings.json", "Archivo de configuración de la aplicación."],
                            ["modules.log", "Archivo de registro de la aplicación."],
                        ],
                    },
                    {
                        t: "p",
                        v: "En particular, el archivo data_3 de la carpeta Cache contiene encabezados HTTP y referencias a dominios de Discord. También se identificaron modificaciones en archivos de caché y almacenamiento local hasta el 2 de febrero de 2019.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image46", "Archivo data_3 de la caché de Discord"],
                            ["image47", "Carpeta Local Storage\\leveldb de Discord"],
                            ["image48", "Carpeta GPUCache de Discord"],
                        ],
                    },
                    { t: "h", v: "Corroboración mediante el historial de navegación" },
                    {
                        t: "p",
                        v: "Como evidencia complementaria, localicé un registro asociado al dominio discordapp.com, recuperado del archivo WebCacheV01.dat mediante Microsoft Edge Analyzer y vinculado al perfil del usuario Steve. Este registro refuerza la existencia de actividad relacionada con Discord, aunque no presenta una fecha de acceso ni permite identificar una conversación específica.",
                    },
                    {
                        t: "figs",
                        items: [["image49", "Registro de discordapp.com en WebCacheV01.dat"]],
                    },
                    { t: "h", v: "Interpretación" },
                    {
                        t: "p",
                        v: "La presencia del instalador, los registros de ejecución de DISCORD.EXE y los archivos de almacenamiento local permiten sostener que Discord estuvo presente y fue ejecutado en el equipo durante el periodo investigado. Por su naturaleza como plataforma de comunicación, constituye una posible vía de intercambio de información que merece un análisis forense adicional.",
                    },
                    { t: "h", v: "Limitaciones" },
                    {
                        t: "p",
                        v: "Los artefactos identificados no permiten confirmar el envío o recepción de mensajes específicos, el contenido de las conversaciones, la identidad de los interlocutores ni su relación con los hechos investigados. Tampoco permiten atribuir personalmente a Steve Kowhai la autoría de posibles comunicaciones o distinguir todas las ejecuciones automáticas de aquellas iniciadas manualmente.",
                    },
                    {
                        t: "p",
                        v: "Para establecer estas relaciones sería necesario recuperar mensajes verificables, identificadores de cuentas y canales, marcas temporales y otros elementos que permitan corroborar su autenticidad y procedencia.",
                    },
                ],
            },
            {
                id: "cifrado-esteganografia",
                number: "19",
                title: "Analiza los indicios de herramientas de esteganografía y cifrado. Diferencia descarga, instalación, ejecución y uso efectivo; explica qué artefactos respaldan cada nivel.",
                blocks: [
                    {
                        t: "p",
                        v: "Durante el análisis de la imagen forense Narcos-1 identifiqué evidencias relacionadas con dos herramientas: TrueCrypt 7.1a, utilizada para el cifrado de información, e Image Steganography 1.5.2, diseñada para ocultar información dentro de imágenes. Para determinar el alcance de los hallazgos, examiné los registros de descarga, instalación y ejecución de ambos programas, así como otros artefactos que pudieran indicar su uso efectivo.",
                    },
                    { t: "h", v: "Evidencia de descarga" },
                    {
                        t: "p",
                        v: "En el apartado Web Downloads de Autopsy localicé registros correspondientes a la descarga de ambos instaladores mediante Google Chrome.",
                    },
                    {
                        t: "table",
                        head: ["Programa", "Fecha y hora (NZDT)", "Origen"],
                        rows: [
                            ["TrueCrypt 7.1a", "30/01/2019, 12:27:43", "Softpedia"],
                            ["Image Steganography 1.5.2", "01/02/2019, 13:16:32", "SourceForge"],
                        ],
                    },
                    {
                        t: "figs",
                        items: [
                            ["image50", "Descarga de TrueCrypt en Web Downloads"],
                            ["image51", "Descarga de Image Steganography en Web Downloads"],
                        ],
                    },
                    {
                        t: "p",
                        v: "Estos registros permiten establecer que se realizaron descargas asociadas con ambas herramientas, aunque por sí solos no demuestran que los programas fueran instalados o ejecutados.",
                    },
                    { t: "h", v: "Evidencia de instalación" },
                    {
                        t: "p",
                        v: "En Installed Programs identifiqué un registro correspondiente a TrueCrypt 7.1a, lo que respalda su instalación en el equipo.",
                    },
                    {
                        t: "p",
                        v: "Por otra parte, encontré directorios asociados con Image Steganography en el perfil del usuario Steve, dentro de AppData\\Roaming. Estos directorios, junto con los registros de ejecución encontrados posteriormente, son compatibles con la presencia de la aplicación, aunque no permiten reconstruir por completo su proceso de instalación.",
                    },
                    {
                        t: "figs",
                        items: [["image52", "TrueCrypt 7.1a en Installed Programs"]],
                    },
                    { t: "h", v: "Evidencia de ejecución" },
                    {
                        t: "p",
                        v: "Para comprobar si las herramientas fueron ejecutadas, examiné el apartado Run Programs, donde Autopsy presenta información recuperada de los archivos Prefetch de Windows. Identifiqué los siguientes registros:",
                    },
                    {
                        t: "table",
                        head: ["Programa", "Fecha y hora (NZDT)"],
                        rows: [
                            ["TRUECRYPT FORMAT.EXE", "30/01/2019, 12:31:29"],
                            ["Image Steganography 1.5.2 Setup", "01/02/2019, 13:16:46"],
                            ["IMAGE STEGANOGRAPHY.EXE", "01/02/2019, 13:16:56"],
                        ],
                    },
                    {
                        t: "p",
                        v: "El registro de TRUECRYPT FORMAT.EXE confirma la ejecución de un componente de TrueCrypt relacionado con la creación de volúmenes cifrados, pero no permite comprobar que se haya completado dicha operación.",
                    },
                    {
                        t: "p",
                        v: "En el caso de Image Steganography, se identificó la ejecución del instalador y, diez segundos después, de la aplicación principal. Esto permite demostrar que no solamente se descargó el instalador, sino que también se ejecutó el programa.",
                    },
                    {
                        t: "figs",
                        items: [
                            ["image53", "Prefetch de TRUECRYPT FORMAT.EXE"],
                            ["image54", "Prefetch de Image Steganography 1.5.2 Setup"],
                            ["image55", "Prefetch de IMAGE STEGANOGRAPHY.EXE"],
                        ],
                    },
                    { t: "h", v: "Indicios de uso efectivo" },
                    {
                        t: "p",
                        lead: "TrueCrypt.",
                        v: "Dentro del directorio C:\\Users\\Steve\\AppData\\Roaming\\TrueCrypt localicé el archivo Configuration.xml, creado el 30 de enero de 2019 a las 12:31:46 NZDT y modificado a las 13:34:14 NZDT. Su contenido incluye parámetros relacionados con el funcionamiento de TrueCrypt, entre los que destacan:",
                    },
                    {
                        t: "table",
                        head: ["Parámetro", "Valor", "Significado"],
                        rows: [
                            ["SaveVolumeHistory", "0", "Historial de volúmenes deshabilitado."],
                            ["CachePasswords", "0", "Caché de contraseñas deshabilitada."],
                            ["PreserveTimestamps", "1", "Conservación de marcas temporales habilitada."],
                            ["LastSelectedDrive", "F:", "Última letra de unidad seleccionada."],
                        ],
                    },
                    {
                        t: "p",
                        v: "La existencia de este archivo permite corroborar que se conservaron preferencias de configuración del programa. Sin embargo, estos valores no demuestran que se haya creado o montado efectivamente un volumen cifrado.",
                    },
                    {
                        t: "figs",
                        items: [["image56", "Archivo Configuration.xml de TrueCrypt"]],
                    },
                    {
                        t: "p",
                        v: "Adicionalmente, identifiqué un registro de archivo denominado secret, localizado en C:\\Users\\Steve\\Documents\\secret. Autopsy lo clasifica como Unallocated, con un tamaño recuperado de cero bytes y sin marcas temporales disponibles. Por lo tanto, aunque se conserva una referencia al archivo, no fue posible examinar su contenido ni determinar su formato original.",
                    },
                    {
                        t: "figs",
                        items: [["image57", "Registro del archivo secret en Autopsy"]],
                    },
                    {
                        t: "p",
                        v: "En el apartado Recent Documents también localicé el acceso directo secret.lnk, asociado con la misma ruta y con una fecha de acceso registrada del 30 de enero de 2019 a las 12:35:30 NZDT. Esta marca temporal se encuentra cuatro minutos y un segundo después de la ejecución de TRUECRYPT FORMAT.EXE, lo que constituye una coincidencia temporal relevante. No obstante, no es suficiente para confirmar que secret fuera un contenedor cifrado o que hubiera sido generado mediante TrueCrypt.",
                    },
                    {
                        t: "figs",
                        items: [["image58", "Acceso directo secret.lnk en Recent Documents"]],
                    },
                    {
                        t: "p",
                        lead: "Image Steganography.",
                        v: "Los registros Prefetch y los directorios asociados demuestran la ejecución de la aplicación. Adicionalmente, se identificó una referencia en Recent Documents al archivo package.jpg, ubicado originalmente en C:\\Users\\Steve\\Downloads\\Misc\\package.jpg, con una fecha de acceso registrada del 1 de febrero de 2019 a las 15:49:18 NZDT. Esta referencia corresponde al mismo día en que se ejecutó Image Steganography. Sin embargo, el archivo no se encontraba disponible en su ubicación original durante la revisión, por lo que no fue posible analizar su contenido ni determinar si incorporaba información oculta.",
                    },
                    { t: "h", v: "Interpretación" },
                    {
                        t: "p",
                        v: "Los artefactos recuperados permiten demostrar la descarga de ambas herramientas y su posterior ejecución. En el caso de TrueCrypt, también se identificó un registro de instalación y un archivo de configuración. La proximidad temporal entre las ejecuciones y los registros asociados con secret y package.jpg plantea la posibilidad de que se hayan utilizado mecanismos de cifrado o esteganografía.",
                    },
                    {
                        t: "p",
                        v: "Estos hallazgos son relevantes para la investigación, ya que ambas herramientas tienen funciones que permiten proteger u ocultar información digital.",
                    },
                    { t: "h", v: "Limitaciones" },
                    {
                        t: "p",
                        v: "A pesar de la evidencia identificada, no fue posible confirmar la creación o el montaje de un volumen cifrado, recuperar el contenido del archivo secret ni demostrar que package.jpg contuviera información oculta.",
                    },
                    {
                        t: "p",
                        v: "Tampoco se puede establecer que las herramientas fueran utilizadas para encubrir actividades ilícitas, ya que su instalación y ejecución pueden corresponder a usos legítimos. Para confirmar su uso efectivo sería necesario recuperar los archivos involucrados, examinar su contenido y obtener artefactos adicionales que documenten las operaciones realizadas.",
                    },
                ],
            },
            {
                id: "hipotesis",
                number: "20",
                title: "Formula una hipótesis sobre la relación del equipo con los hechos investigados y una explicación alternativa. Sustenta el análisis con cuatro hallazgos y señala dos evidencias adicionales necesarias.",
                blocks: [
                    { t: "h", v: "Hipótesis principal" },
                    {
                        t: "p",
                        v: "A partir de los artefactos identificados en la imagen forense Narcos-1, planteo la hipótesis de que el equipo asociado con Steve Kowhai pudo haber sido utilizado para consultar rutas, organizar desplazamientos y gestionar información relacionada con posibles actividades logísticas vinculadas al caso investigado.",
                    },
                    {
                        t: "p",
                        v: "Esta hipótesis se fundamenta en los siguientes hallazgos:",
                    },
                    {
                        t: "p",
                        lead: "1. Consultas y registros de rutas geográficas.",
                        v: "El historial de Google Chrome contiene consultas a Google Maps realizadas el 31 de enero de 2019, relacionadas con localidades de la región de Wellington, como Eastbourne, Wainuiomata, Stokes Valley y Naenae, además del aeropuerto internacional de Wellington. Estas consultas coinciden geográfica y temporalmente con las imágenes Method run.jpg y airport crystals.jpg, lo que permite establecer que el equipo fue utilizado para consultar y conservar información sobre posibles desplazamientos.",
                    },
                    {
                        t: "p",
                        lead: "2. Información relacionada con viajes internacionales.",
                        v: "Se identificó el archivo flightbookings.PNG, que contiene información sobre vuelos entre Brisbane, Australia, y Wellington, Nueva Zelanda, para febrero de 2019. Asimismo, se localizó BNE.png, una imagen de Brisbane. La presencia de estos archivos resulta relevante porque la investigación involucra el ingreso de pasajeros procedentes de Australia. Sin embargo, la información no permite confirmar que las reservaciones fueran adquiridas, utilizadas o estuvieran vinculadas con las personas investigadas.",
                    },
                    {
                        t: "p",
                        lead: "3. Presencia y ejecución de Discord.",
                        v: "Se identificaron registros de ejecución de Discord mediante archivos Prefetch, además de directorios de configuración y almacenamiento local dentro del perfil Steve. También se encontró un registro de descarga de flightbookings.PNG desde una dirección de cdn.discordapp.com/attachments, con fecha del 2 de febrero de 2019 a las 15:28:26 NZDT. Este hallazgo permite relacionar el archivo de reservaciones con contenido alojado en la infraestructura de Discord. No obstante, sin recuperar conversaciones verificables, no es posible identificar a los participantes, determinar quién compartió el archivo ni confirmar la finalidad de su intercambio.",
                    },
                    {
                        t: "p",
                        lead: "4. Ejecución de herramientas de cifrado y esteganografía.",
                        v: "El análisis permitió comprobar la descarga y ejecución de TrueCrypt 7.1a e Image Steganography 1.5.2. También se localizaron referencias a los archivos secret y package.jpg, cuyas fechas presentan coincidencias temporales con la actividad de dichas herramientas. Estos hallazgos permiten plantear la posibilidad de que se hubieran utilizado mecanismos para proteger u ocultar información. Sin embargo, no se recuperó evidencia suficiente para demostrar que se hubiera realizado una operación efectiva de cifrado o esteganografía.",
                    },
                    { t: "h", v: "Explicación alternativa" },
                    {
                        t: "p",
                        v: "Una explicación alternativa es que el equipo hubiera sido utilizado para actividades personales o legítimas, sin relación con la distribución de sustancias ilícitas.",
                    },
                    {
                        t: "p",
                        v: "Las consultas de Google Maps podrían corresponder a planificación de viajes o desplazamientos cotidianos, mientras que las imágenes de reservaciones podrían haber sido guardadas como parte de una búsqueda de vuelos. De igual manera, Discord es una plataforma de comunicación utilizada para diferentes actividades, y las herramientas de cifrado y esteganografía pueden emplearse con fines de privacidad, aprendizaje o protección de archivos.",
                    },
                    {
                        t: "p",
                        v: "También debe considerarse que los artefactos encontrados corresponden a la actividad registrada en el dispositivo, sin que esto permita atribuir automáticamente todas las acciones a Steve Kowhai.",
                    },
                    { t: "h", v: "Evidencias adicionales necesarias" },
                    {
                        t: "p",
                        v: "Para fortalecer o descartar la hipótesis principal sería necesario obtener, al menos, dos tipos de evidencia adicionales:",
                    },
                    {
                        t: "p",
                        lead: "1. Comunicaciones verificables de Discord.",
                        v: "Recuperar mensajes, archivos adjuntos y metadatos que permitan identificar las cuentas participantes, las fechas de intercambio y el contexto en el que se compartieron los documentos. Esto ayudaría a determinar si existieron comunicaciones relacionadas con los desplazamientos o los hechos investigados.",
                    },
                    {
                        t: "p",
                        lead: "2. Registros independientes de desplazamiento y reservaciones.",
                        v: "Obtener confirmaciones de compra, manifiestos de pasajeros, registros de abordaje u otras evidencias de viaje que permitan contrastar las rutas y reservaciones almacenadas en el equipo con movimientos efectivamente realizados por las personas investigadas.",
                    },
                    { t: "h", v: "Conclusión del análisis" },
                    {
                        t: "p",
                        v: "Los hallazgos permiten demostrar que el equipo registró consultas de rutas geográficas, almacenó información relacionada con vuelos internacionales y presentó evidencias de ejecución de Discord y de herramientas de cifrado y esteganografía. Sin embargo, no fue posible confirmar que las funciones de ocultamiento o cifrado se hubieran utilizado efectivamente.",
                    },
                    {
                        t: "p",
                        v: "La coincidencia entre estos elementos y el contexto de la investigación constituye un conjunto de indicios que justifica profundizar en el análisis. Sin embargo, la evidencia disponible no permite establecer de manera concluyente la participación de Steve Kowhai en actividades de distribución de drogas, ni demostrar que el equipo se haya utilizado directamente para cometer u ocultar un delito.",
                    },
                    {
                        t: "p",
                        v: "Por lo tanto, la hipótesis principal debe mantenerse como una interpretación preliminar sustentada en los artefactos recuperados sujeta a corroboración mediante evidencia adicional.",
                    },
                ],
            },
        ],
    },
];

const references = [
    {
        text: "Autopsy. (s. f.). Autopsy user's guide (Version 4.23.0).",
        url: "https://sleuthkit.org/autopsy/docs/user-docs/4.23.0/",
    },
    {
        text: "Brisbane City Council. (s. f.). Story Bridge renewal.",
        url: "https://www.brisbane.qld.gov.au/transport-and-parking/transport-projects/story-bridge-renewal",
    },
    {
        text: "Digital Corpora. (s. f.). 2019 Narcos [Conjunto de datos].",
        url: "https://digitalcorpora.org/corpora/scenarios/2019-narcos/",
    },
    {
        text: "Garfinkel, Farrell, Roussev y Dinolt. (2009). Bringing Science to Digital Forensics with Standardized Forensic Corpora. Digital Forensic Research Workshop (DFRWS), Montreal, Canada.",
        url: "https://simson.net/clips/academic/2009.DFRWS.Corpora.pdf",
    },
    {
        text: "Microsoft. (2021, 13 de octubre). OperationStart function (winbase.h). Microsoft Learn.",
        url: "https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-operationstart",
    },
    {
        text: "Singh, B., & Singh, U. (2017). Program execution analysis using UserAssist key in modern Windows. En Proceedings of the 14th International Joint Conference on e-Business and Telecommunications (pp. 420–429). SciTePress.",
        url: "https://doi.org/10.5220/0006416704200429",
    },
];

// Figures are numbered in the order they appear on the page.
const figureNumbers = {};
let figureCounter = 0;
parts.forEach((part) => {
    part.entries.forEach((entry) => {
        entry.blocks.forEach((block, blockIndex) => {
            if (block.t !== "figs") return;
            block.items.forEach(([key]) => {
                figureCounter += 1;
                figureNumbers[entry.id + ":" + blockIndex + ":" + key] = String(
                    figureCounter,
                ).padStart(2, "0");
            });
        });
    });
});

function DataTable({ head, rows }) {
    return (
        <div className="mt-5 max-w-3xl overflow-x-auto border border-border">
            <table className="w-full border-collapse text-left text-sm leading-6">
                <thead>
                    <tr className="border-b border-border">
                        {head.map((cell) => (
                            <th
                                key={cell}
                                className="px-4 py-3 font-mono text-[0.68rem] font-semibold tracking-wider whitespace-nowrap text-muted uppercase"
                            >
                                {cell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.join("|")} className="border-b border-border last:border-b-0">
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-4 py-3 align-top wrap-break-word text-muted"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Facts({ rows }) {
    return (
        <dl className="mt-5 max-w-3xl divide-y divide-border border-y border-border text-sm">
            {rows.map(([label, value]) => (
                <div
                    key={label}
                    className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4"
                >
                    <dt className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
                        {label}
                    </dt>
                    <dd className="font-mono text-xs leading-6 break-all text-foreground">
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

function Block({ block, entryId, blockIndex }) {
    if (block.t === "p") {
        return (
            <p className="mt-5 max-w-3xl leading-7 wrap-break-word text-muted">
                {block.lead && (
                    <span className="font-semibold text-foreground">{block.lead} </span>
                )}
                {block.v}
            </p>
        );
    }

    if (block.t === "h") {
        return (
            <h4 className="mt-8 max-w-3xl font-mono text-xs tracking-wider text-accent uppercase">
                {block.v}
            </h4>
        );
    }

    if (block.t === "facts") return <Facts rows={block.rows} />;

    if (block.t === "table") return <DataTable head={block.head} rows={block.rows} />;

    if (block.t === "figs") {
        return block.items.map(([key, caption]) => (
            <ActivityFigure
                key={key}
                src={evidenceSrc(key)}
                alt={caption}
                number={figureNumbers[entryId + ":" + blockIndex + ":" + key]}
                caption={caption}
                className="max-w-3xl"
            />
        ));
    }

    return null;
}

function Entry({ entry }) {
    return (
        <li
            id={entry.id}
            className={
                "grid grid-cols-1 gap-3 py-10 first:pt-0" +
                (entry.number ? " sm:grid-cols-[3rem_1fr]" : "")
            }
        >
            {entry.number && (
                <span className="font-mono text-xs text-accent">{entry.number}</span>
            )}

            <div className="min-w-0">
                <h3 className="max-w-3xl text-lg leading-7 font-semibold wrap-break-word">
                    {entry.title}
                </h3>

                {entry.blocks.map((block, blockIndex) => (
                    <Block
                        key={blockIndex}
                        block={block}
                        entryId={entry.id}
                        blockIndex={blockIndex}
                    />
                ))}
            </div>
        </li>
    );
}

function Project03() {
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
                                Parcial III / Proyecto 03
                            </p>

                            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                                Operación Narcos:{" "}
                                <span className="font-serif font-normal italic text-accent">
                                    expediente Kowhai
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                                Análisis forense con Autopsy de la imagen Narcos-1, del
                                escenario 2019 Narcos de Digital Corpora: artefactos del
                                sistema, metadatos, programas instalados y una hipótesis
                                sobre la relación del equipo con los hechos investigados.
                            </p>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                                <dd className="mt-1 text-accent">Completo</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Parcial</dt>
                                <dd className="mt-1">Tercer parcial</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">
                                    Herramienta
                                </dt>
                                <dd className="mt-1">Autopsy</dd>
                            </div>
                            <div>
                                <dt className="tracking-wider text-muted uppercase">Muestra</dt>
                                <dd className="mt-1">Narcos-1</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a
                            href={resourceBase + "/184346_pr03.pdf"}
                            download="184346_pr03.pdf"
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
                            En este proyecto
                        </p>

                        <nav aria-label="Contenido del Proyecto 03" className="mt-4">
                            <ol className="space-y-1">
                                {pageSections.map((section, index) => (
                                    <li key={section.id}>
                                        <Link
                                            to={"/activities/project-03#" + section.id}
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
                                Autopsy · Windows PowerShell
                            </p>
                        </div>
                    </div>
                </aside>

                <div className="min-w-0 space-y-24 lg:col-span-9">
                    <ActivitySection id="introduccion" number="01" title="Introducción">
                        <div className="max-w-3xl space-y-5 leading-7 text-muted">
                            {introduccion.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <h3 className="mt-10 text-lg font-semibold">Actividad</h3>
                        <div className="mt-4 max-w-3xl space-y-5 leading-7 text-muted">
                            {actividad.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </ActivitySection>

                    {parts.map((part, partIndex) => (
                        <ActivitySection
                            key={part.id}
                            id={part.id}
                            number={String(partIndex + 2).padStart(2, "0")}
                            title={part.title}
                        >
                            {part.intro && (
                                <p className="mb-10 max-w-3xl leading-7 text-muted">
                                    {part.intro}
                                </p>
                            )}

                            <ol className="divide-y divide-border">
                                {part.entries.map((entry) => (
                                    <Entry key={entry.id} entry={entry} />
                                ))}
                            </ol>
                        </ActivitySection>
                    ))}

                    <ActivitySection id="referencias" number="07" title="Referencias">
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

                    <ActivitySection id="recursos" number="08" title="Recursos">
                        <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
                            <ResourceLink
                                href={resourceBase + "/184346_pr03.pdf"}
                                type="PDF"
                                title="Informe forense"
                                description="Informe completo del análisis de Narcos-1 con capturas, interpretación y limitaciones de cada hallazgo."
                                download="184346_pr03.pdf"
                            />
                        </div>
                    </ActivitySection>
                </div>
            </div>
        </article>
    );
}

export default Project03;
