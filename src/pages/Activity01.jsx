import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import timelineImage from "../assets/activity-01/timeline.png";
import ActivityFigure from "../components/activities/ActivityFigure";
import ActivitySection from "../components/activities/ActivitySection";
import ResourceLink from "../components/activities/ResourceLink";

const pageSections = [
  { id: "introduccion", label: "Introducción" },
  { id: "linea-tiempo", label: "Línea del tiempo" },
  { id: "contexto", label: "Contexto general" },
  { id: "tabla-tecnica", label: "Tabla técnica" },
  { id: "modelo-cia", label: "Impacto: modelo CIA" },
  { id: "costo", label: "Costo del ataque" },
  { id: "conclusiones", label: "Conclusiones" },
  { id: "referencias", label: "Referencias" },
  { id: "recursos", label: "Recursos" },
];

const resourceBase = import.meta.env.BASE_URL + "resources/activity-01";

const introduction = [
  "La creciente dependencia de los sistemas digitales ha convertido la ciberseguridad en un elemento fundamental para la continuidad operativa de las organizaciones. Un ejemplo de ello fue NotPetya, un malware destructivo que el 27 de junio de 2017 se propagó mediante una actualización comprometida del software ucraniano M.E.Doc y afectó a empresas de distintos países. Entre las organizaciones más perjudicadas se encontró Maersk, una de las compañías de transporte marítimo y logística más grandes del mundo, cuya infraestructura tecnológica global quedó prácticamente paralizada.",
  "El presente informe analiza el contexto, desarrollo y consecuencias del ataque, así como las vulnerabilidades y técnicas que facilitaron su propagación. También evalúa su impacto sobre los principios de confidencialidad, integridad y disponibilidad, cuantifica las pérdidas económicas y propone medidas de seguridad, continuidad y recuperación que podrían haber reducido sus efectos.",
];

const timelineAlt =
  "Línea del tiempo del ataque NotPetya a Maersk: en 2016 una evaluación interna advierte deficiencias de seguridad; en marzo de 2017 Microsoft publica el parche MS17-010; en abril Sandworm vulnera las actualizaciones de M.E.Doc; el 27 de junio de 2017 a las 10:30 a. m. se ejecuta el malware y minutos y horas después se propaga por la red de Maersk; el 28 de junio Maersk apaga sus redes y comienza la reconstrucción; en julio se recupera el controlador de dominio de Ghana y se reconstruyen servidores y equipos; entre julio y agosto continúa la recuperación; en el tercer trimestre Maersk estima pérdidas de USD 250–300 millones.";

const contextParagraphs = [
  "El ataque NotPetya ocurrió el 27 de junio de 2017 y tuvo como principal objetivo a organizaciones en Ucrania, aunque posteriormente se propagó a empresas de distintos países. La propagación inicial se produjo mediante una actualización comprometida del software de contabilidad y declaración fiscal M.E.Doc, ampliamente utilizado por compañías ucranianas. Investigaciones concluyeron que los servidores de actualización del proveedor fueron comprometidos y utilizados para distribuir el malware como si se tratara de una actualización legítima, constituyendo un caso representativo de ataque a la cadena de suministro de software. Entre las organizaciones afectadas se encontraron ministerios, bancos, compañías eléctricas, medios de comunicación, medios de transporte y empresas estatales de infraestructura crítica, así como compañías internacionales como Maersk, Merck y TNT Express de FedEx (WIRED, 2018; SOS Intelligence, 2024).",
  "Antes del incidente existían condiciones de seguridad que favorecieron la propagación del malware. Un elemento central fue la vulnerabilidad del protocolo SMBv1 de Microsoft. El 14 de marzo de 2017, Microsoft publicó el boletín de seguridad MS17-010, que corregía varias vulnerabilidades críticas de SMB utilizadas posteriormente por herramientas de explotación conocidas como EternalBlue y EternalRomance (CISA, 2018). La propia documentación de Microsoft indica que los sistemas que no habían instalado la actualización MS17-010 permanecían en un estado de alto riesgo frente a distintas familias de malware que explotaban dichas vulnerabilidades (CISA, 2018; Microsoft, 2018). Aunque el parche estuvo disponible más de tres meses antes de NotPetya, muchas organizaciones aún no lo habían aplicado en todos sus equipos.",
  "Además de las vulnerabilidades técnicas, existían debilidades importantes en la arquitectura de seguridad. Las redes corporativas presentaban segmentación insuficiente, lo que permitió que el malware se propagara rápidamente entre equipos del mismo dominio. NotPetya no dependía únicamente de EternalBlue, también utilizó herramientas administrativas como PsExec y WMIC, junto con técnicas de robo de credenciales similares a Mimikatz, para desplazarse lateralmente una vez obtenía acceso inicial (CISA, 2018). Esto significa que incluso equipos correctamente parchados podían verse comprometidos si el atacante obtenía credenciales con privilegios elevados.",
  "La propagación global destruyó prácticamente todos los controladores de dominio de Maersk. Sin embargo, un controlador ubicado en Ghana permaneció intacto porque un apagón había desconectado la oficina de la red durante el ataque. Este servidor conservaba una copia de la información esencial del dominio, incluidos usuarios, permisos y configuraciones. Su recuperación permitió reconstruir la infraestructura central a partir de un estado confiable y evitó que Maersk tuviera que crear desde cero su estructura de identidades y accesos. Debido a las limitaciones de conectividad, el disco que contenía la copia fue transportado físicamente desde Ghana hasta el Reino Unido para iniciar la restauración de los servicios globales (WIRED, 2018).",
  "En cuanto a los factores humanos y organizacionales, la confianza depositada en las actualizaciones automáticas de un proveedor ampliamente utilizado resultó determinante. Las empresas asumían que las actualizaciones de M.E.Doc eran seguras, por lo que el malware ingresó a numerosas redes sin generar sospechas iniciales. También se evidenciaron deficiencias en la gestión de parches, en el control de privilegios administrativos y en el monitoreo de actividades anómalas dentro de la red corporativa. Diversos análisis posteriores señalaron que la combinación de un proveedor comprometido, sistemas sin actualizar, credenciales excesivamente privilegiadas y redes poco segmentadas creó un escenario idóneo para la propagación masiva del ataque (Microsoft, 2018).",
  "Finalmente, aunque NotPetya se presentaba como un ransomware, múltiples investigaciones concluyeron que su diseño hacía imposible la recuperación de la información mediante el pago del rescate, debido a que la llave de desencriptación era un string de caracteres generado aleatoriamente y no tenía la capacidad de recuperar nada al realizar el pago. Por ello, es considerado principalmente un wiper disfrazado de ransomware, cuyo objetivo principal era causar interrupción operativa y daño económico a gran escala, especialmente en organizaciones vinculadas a Ucrania (Microsoft, 2018; CSO, 2022).",
];

const technicalTable = [
  {
    element: "Tipo de ataque",
    description: [
      "Malware destructivo o wiper disfrazado de ransomware. Aunque solicitaba USD 300 en bitcoin, su diseño no permitía recuperar la información mediante el pago.",
    ],
  },
  {
    element: "Actor o grupo atacante",
    description: [
      "Sandworm (unidad de inteligencia militar rusa perteneciente a la Agencia Militar de Inteligencia Rusa) también conocido como Unit 74455.",
    ],
  },
  {
    element: "Vector de entrada",
    description: [
      "Ataque a la cadena de suministro de M.E.Doc, software contable y fiscal desarrollado por Linkos Group y utilizado ampliamente en Ucrania. Los atacantes comprometieron su sistema de actualizaciones para distribuir NotPetya como una actualización legítima. En Maersk, el malware ingresó mediante un equipo de la oficina de Odesa que tenía instalado M.E.Doc.",
    ],
  },
  {
    element: "Vulnerabilidad explotada",
    description: [
      "Vulnerabilidades de ejecución remota en SMBv1, principalmente CVE-2017-0144, asociada con EternalBlue, y CVE-2017-0145, relacionada con EternalRomance. También aprovechó credenciales administrativas obtenidas de la memoria de equipos infectados, por lo que podía comprometer sistemas actualizados accesibles mediante cuentas privilegiadas.",
    ],
  },
  {
    element: "Etapas del ataque (MITRE ATT&CK)",
    description: [
      "Infiltración: El grupo ruso Sandworm comprometió los servidores de actualización de M.E.Doc, un software de contabilidad usado por empresas que operan en Ucrania; insertaron una puerta trasera en una actualización legítima al vulnerar los servidores de M.E.Doc. En Maersk, el punto de entrada fue una computadora en una oficina de Odesa, donde un empleado había instalado dicho software por requerimiento fiscal local.",
      "Ejecución: al ser activado el malware se disfrazó de ransomware pero en realidad era un wiper, con el objetivo de destruir, explotó vulnerabilidades SMBv1 EternalBlue y EternalRomance para ejecutarse remotamente en máquinas Windows sin parchar. Usó Mimikatz, una herramienta de código abierto, para robar credenciales directamente de la memoria de equipos infectados.",
      "Propagación: Una vez las credenciales fueron robadas, el malware se replicó autónomamente por toda la red interna de Maersk, sobrescribiendo el MBR de cada máquina y eliminando la tabla maestra de archivos. Eliminó los respaldos en línea del Active Directory y comprometió alrededor de 150 controladores de dominio, eliminando posibilidades de restauración rápida por medios convencionales.",
      "Exfiltración: No hubo exfiltración real de datos. Tampoco intenciones de cobrar el rescate. NotPetya fue usado y diseñado como arma de destrucción, no como herramienta de robo de información.",
    ],
  },
  {
    element: "Sistemas o servicios comprometidos",
    description: [
      "Aproximadamente 45,000 equipos y 4,000 servidores, cerca de 150 controladores de dominio, la red corporativa global, los sistemas de reservaciones y rastreo de contenedores y las operaciones de terminales portuarias.",
    ],
  },
  {
    element: "Duración del incidente",
    description: [
      "El ataque comenzó el 27 de junio de 2017 y se propagó globalmente en cuestión de minutos. La red fue aislada durante las horas siguientes. La infraestructura central se reconstruyó en aproximadamente diez días, mientras que la recuperación de aplicaciones y configuraciones continuó durante cerca de dos meses.",
    ],
  },
  {
    element: "Mecanismos de detección y respuesta",
    description: [
      "La detección inicial fue principalmente humana, al observarse reinicios y fallas simultáneas. Maersk ordenó apagar equipos y aislar su red global para frenar la propagación. Posteriormente reconstruyó servidores y estaciones de trabajo con apoyo de especialistas externos. La recuperación del Active Directory fue posible gracias a un controlador de dominio ubicado en Ghana que permaneció desconectado durante el ataque debido a un apagón. Después del incidente, Maersk reforzó la segmentación, el monitoreo, la continuidad operativa y la capacidad de respuesta ante incidentes.",
    ],
  },
];

const ciaImpact = [
  {
    principle: "Confidencialidad",
    impact:
      "NotPetya obtenía credenciales almacenadas en la memoria de equipos infectados para suplantar usuarios y desplazarse lateralmente por la red. Se comprometió la confidencialidad de las cuentas utilizadas durante la propagación. Sin embargo, no existe evidencia pública de que el malware exfiltrara bases de datos, archivos corporativos o información de clientes de Maersk.",
    evidence:
      "Microsoft documentó que NotPetya utilizaba una herramienta similar a Mimikatz para extraer credenciales de sesiones activas y reutilizarlas mediante PsExec y WMIC (Microsoft Defender Security Research Team, 2017). Maersk declaró que no ocurrió una filtración de datos ni pérdida de información hacia terceros (A.P. Moller–Maersk, 2017).",
  },
  {
    principle: "Integridad",
    impact:
      "El impacto fue crítico porque NotPetya alteró estructuras esenciales de almacenamiento. Con privilegios elevados podía sobrescribir el Registro de Arranque Maestro (MBR), cifrar la Tabla Maestra de Archivos (MFT) y cifrar archivos del sistema. Debido a que el identificador mostrado en la nota de rescate no permitía generar una clave válida, la información no podía recuperarse mediante el pago solicitado.",
    evidence:
      "Microsoft confirmó que NotPetya podía sobrescribir el MBR y cifrar archivos de distintas extensiones (Microsoft Defender Security Research Team, 2017). Kaspersky concluyó que el identificador de instalación era generado aleatoriamente y no contenía la información necesaria para descifrar los discos, lo cual respaldaba su clasificación como wiper (Ivanov & Mamedov, 2017). Maersk tuvo que reconstruir aproximadamente 4,000 servidores y reinstalar 45,000 computadoras (Greenberg, 2018).",
  },
  {
    principle: "Disponibilidad",
    impact:
      "La infraestructura informática quedó inoperante, afectando reservas, seguimiento de carga y contenedores, comunicaciones internas y operaciones de terminales portuarias. Maersk Line, APM Terminals y Damco tuvieron que apagar sistemas y trabajar temporalmente mediante procedimientos manuales. En este caso la disponibilidad es el punto de más impacto ya que el objetivo del malware era únicamente destructivo.",
    evidence:
      "Maersk reportó una interrupción significativa en sus negocios de transporte y logística. Las reservas se reanudaron parcialmente el 29 de junio y las operaciones de Maersk Line, Damco y APM Terminals se normalizaron gradualmente entre el 3 y el 9 de julio (A.P. Moller–Maersk, 2017). La reconstrucción principal tomó aproximadamente diez días y ciertas labores de reconstrucción de los sistemas continuaron cerca de dos meses (Greenberg, 2018).",
  },
];

const costBreakdown = [
  {
    type: "Pérdidas operativas",
    description:
      "Interrupción de reservaciones, seguimiento de cargamentos y operaciones en terminales; reducción temporal de volúmenes; menor utilización de la capacidad y aumento de costos operativos durante la contingencia.",
    estimate: "$4,822.05 millones",
  },
  {
    type: "Daños reputacionales",
    description:
      "Afectación temporal a la confianza de clientes y socios comerciales por la imposibilidad de reservar o rastrear cargamentos. No existe una cuantificación pública independiente de pérdida de clientes, valor de marca o caída bursátil atribuible exclusivamente al ataque.",
    estimate: "$0 MXN cuantificables",
  },
  {
    type: "Costos técnicos",
    description:
      "Recuperación de sistemas, reconstrucción y reinstalación de servidores y computadoras, consultorías externas, horas extraordinarias, logística de emergencia y restauración de servicios tecnológicos.",
    estimate: "$850.95 millones",
  },
  {
    type: "Costos legales o regulatorios",
    description:
      "No se identificaron públicamente multas, sanciones regulatorias o indemnizaciones legales impuestas a Maersk como consecuencia directa del incidente.",
    estimate: "$0 MXN documentados",
  },
  {
    type: "Pago de rescate o extorsión",
    description:
      "NotPetya mostraba una solicitud de USD 300 en bitcoin por instalación afectada, equivalente aproximadamente a $5,673 MXN. No existe evidencia pública de que Maersk efectuara dicho pago.",
    estimate: "Solicitado: $5,673 por instalación. Pagado: $0 MXN",
  },
  {
    type: "Total estimado",
    description:
      "Suma de las pérdidas operativas y los costos técnicos calculados para el escenario de mayor impacto reconocido por Maersk.",
    estimate: "$5,673 millones MXN",
    isTotal: true,
  },
];

const costSteps = [
  {
    id: "conversion",
    title: "Conversión a moneda nacional",
    paragraphs: [
      "Para estimar el impacto económico de NotPetya en Maersk se utilizó como referencia la clasificación de costos directos e indirectos del marco económico de Adrian Mizzi. También se consideró la metodología de retorno de la inversión en seguridad, la cual permite comparar el costo de una medida de seguridad con las pérdidas que podría evitar (ENISA, 2012).",
      "Maersk estimó que el incidente tuvo un impacto negativo de entre USD 250 y 300 millones. El reporte financiero del tercer trimestre de 2017 señala que la mayor parte de esta pérdida estuvo relacionada con la interrupción temporal del negocio durante julio y agosto, principalmente en Maersk Line. La cifra también comprendió costos para recuperar la operación y restablecer la confiabilidad de los servicios (A.P. Moller–Maersk, 2017, pp. 4–7).",
      "Para expresar las cantidades en pesos mexicanos se utilizó el tipo de cambio promedio de 2017, estimado en $18.91 MXN por dólar, calculado a partir de la serie histórica publicada por Banco de México (Banco de México, s. f.). La conversión del impacto reconocido por Maersk es la siguiente:",
    ],
    formulas: [
      "(250 a 300 millones) USD × 18.91 MXN/USD = $4.73 a $5.67 mil millones MXN",
    ],
  },
];

const costCalculations = [
  {
    id: "perdidas-operativas",
    title: "Cálculo de las pérdidas operativas",
    paragraphs: [
      "El reporte Q3 2017 indica que la mayor parte del impacto de USD 250–300 millones se debió a la interrupción del negocio. Por ello, se asigna el 85 % a pérdidas operativas (A.P. Moller–Maersk, 2017, pp. 6–7).",
    ],
    formulas: [
      "Monto en USD: $300,000,000 USD × 85 % = $255,000,000 USD",
      "Conversión a MXN: $255,000,000 USD × $18.91 MXN = $4,822,050,000 MXN",
    ],
    after: [
      "Las pérdidas operativas se estiman en $4.82 mil millones MXN, incluyendo interrupción de reservaciones, seguimiento de carga y reducción de volúmenes. La empresa reportó una caída de 2.5 % en volúmenes y afectaciones en el desempeño operativo (A.P. Moller–Maersk, 2017, pp. 4 y 10).",
    ],
  },
  {
    id: "costos-tecnicos",
    title: "Cálculo de los costos técnicos",
    paragraphs: [
      "El 15 % restante corresponde a costos técnicos de recuperación, incluyendo restauración de sistemas y operación de emergencia.",
    ],
    formulas: [
      "Monto en USD: $300,000,000 USD × 15 % = $45,000,000 USD",
      "Conversión a MXN: $45,000,000 USD × $18.91 MXN = $850,950,000 MXN",
    ],
    after: [
      "Los costos técnicos se estiman en $850.95 millones MXN, derivados de la reconstrucción de aproximadamente 4,000 servidores y 45,000 equipos, reinstalación de sistemas y contratación de personal especializado (Greenberg, 2018).",
    ],
  },
  {
    id: "danos-reputacionales",
    title: "Daños reputacionales",
    paragraphs: [
      "No existe una cifra pública verificable sobre pérdida de clientes o valor de marca, por lo que se registran como $0 MXN cuantificables. Esto no implica que no hubiera un impacto en la reputación de la empresa, solamente que los datos financieros atribuibles al ciberataque no son públicos para hacer una estimación sin duplicar costos.",
    ],
  },
  {
    id: "costos-legales",
    title: "Costos legales y regulatorios",
    paragraphs: [
      "No se identificaron multas, sanciones o indemnizaciones públicas derivadas del ataque, por lo que se registran como $0 MXN documentados.",
    ],
  },
  {
    id: "rescate",
    title: "Pago de rescate o extorsión",
    paragraphs: [
      "NotPetya solicitaba $300 USD en bitcoin, equivalente a:",
    ],
    formulas: ["$300 USD × $18.91 MXN = $5,673 MXN"],
    after: [
      "Este monto solicitado como rescate no se suma al costo total porque no hay evidencia de que Maersk lo haya pagado. Además, NotPetya funcionaba como malware destructivo, por lo que el pago no habría permitido recuperar la información (Greenberg, 2018).",
    ],
  },
  {
    id: "roisi",
    title: "Aplicación del modelo ROISI de Adrian Mizzi",
    paragraphs: [
      "La regla central de este marco dicta que el presupuesto preventivo en seguridad (E) siempre debe ser menor al costo total de la ruptura (L). Para este caso, la pérdida total tras el ataque fue de $5,673,000,000 MXN y el costo estimado de la inversión preventiva fue de $1,045,571,720 MXN, basado en el estándar sectorial del 0.2 % de los ingresos anuales. Entonces, sustituyendo en la fórmula E < L:",
    ],
    formulas: [
      "$1,045,571,720 MXN < $5,673,000,000 MXN",
      "Porcentaje de la inversión respecto al daño: ($1,045,571,720 ÷ $5,673,000,000) × 100 = 18.43",
    ],
    after: [
      "Esto demuestra que matemáticamente Maersk debió haber aprobado y ejecutado el presupuesto preventivo en ciberseguridad, ya que el gasto representaba apenas una fracción aproximada del 18.43 % del daño financiero real que sufrió.",
    ],
  },
  {
    id: "formula-roisi",
    title: "Fórmula del retorno de inversión en seguridad (ROISI)",
    paragraphs: [
      "Esta ecuación calcula el impacto real neto y determina cuánto capital se habría salvado o, para este caso en específico, cuánto capital se perdió por la decisión respecto a la inversión. La fórmula base es ROISI = (ALE₀ − ALE₁) − C, donde ALE₀ es la pérdida total tras el ataque, C es el costo estimado de la inversión preventiva y ALE₁ es la pérdida residual esperada con seguridad. Entonces:",
    ],
    formulas: [
      "ROISI = ($5,673,000,000 − $0) − $1,045,571,720",
      "ROISI = $5,673,000,000 − $1,045,571,720",
      "ROISI = $4,627,428,280 MXN",
    ],
  },
  {
    id: "roisi-porcentual",
    title: "Cálculo del ROISI porcentual",
    paragraphs: [
      "Para obtener el porcentaje exacto de rentabilidad que habría tenido la inversión preventiva:",
    ],
    formulas: [
      "ROISI % = (ROISI / C) × 100",
      "ROISI % = ($4,627,428,280 / $1,045,571,720) × 100",
      "ROISI % = 4.4259 × 100 = 442.59 %",
    ],
  },
  {
    id: "comparacion-sectorial",
    title: "Comparación sectorial",
    paragraphs: [
      "De acuerdo con el reporte financiero, los ingresos totales de A.P. Moller–Maersk en 2016 fueron de USD 27,646 millones. En el sector logístico y marítimo, durante 2016 y 2017, el gasto corporativo estimado en ciberseguridad rondaba aproximadamente el 0.2 % de los ingresos totales. Entonces:",
    ],
    formulas: [
      "Presupuesto en USD: $27,646,000,000 USD × 0.002 = $55,292,000 USD",
      "Conversión a MXN: $55,292,000 USD × $18.91 MXN/USD = $1,045,571,720 MXN",
    ],
    after: [
      "Comparativa del costo frente al presupuesto: el costo de recuperación del ataque NotPetya fue de $5,673,000,000 MXN, mientras que el presupuesto anual de ciberseguridad estimado era de $1,045,571,720 MXN, una proporción de 5.43 veces. El análisis comparativo demuestra que el costo de recuperación del ciberataque le costó a Maersk 5.43 veces más que el presupuesto que toda la corporación habría destinado a ciberseguridad durante un año entero. Este dato ratifica la viabilidad de la inversión preventiva.",
      "Para las conversiones se utilizó el tipo de cambio FIX promedio de 2017, estimado en $18.91 MXN por dólar, con base en la serie histórica publicada por Banco de México (Banco de México, s. f.). El impacto máximo de USD 300 millones fue reportado por Maersk en su informe financiero del tercer trimestre de 2017 (A.P. Moller–Maersk, 2017).",
    ],
  },
];

const conclusions = [
  {
    title: "Fallas críticas detectadas (técnicas y humanas)",
    paragraphs: [
      "La falla técnica más importante fue mantener una arquitectura de red completamente plana ya que la ausencia de segmentación permitió que el malware NotPetya utilizando el exploit EternalBlue se propagara lateralmente a través del protocolo SMBv1 en cuestión de minutos, infectando nodos globales de forma simultánea.",
      "A nivel humano y de políticas, la falla más grave fue la dependencia absoluta de un único dominio de Active Directory sincronizado en tiempo real, sin contar con copias de seguridad fuera de línea. La empresa solo pudo recuperar su estructura de Active Directory gracias a un corte de energía no planeado en un servidor aislado en Ghana.",
    ],
  },
  {
    title: "Buenas prácticas y políticas de mitigación",
    paragraphs: [
      "El daño se habría mitigado mediante la implementación de microsegmentación de red como VLANs restrictivas y listas de control de acceso para aislar los sistemas críticos, evitando que una infección en la red de contabilidad por donde ingresó el ataque en Ucrania alcanzara las terminales logísticas. Asimismo, el establecimiento de una política rigurosa de gestión de parches, auditorías de vulnerabilidades y la creación de respaldos inmutables para la infraestructura de identidad habrían garantizado una recuperación técnica en horas, y no en semanas.",
    ],
  },
  {
    title: "Reflexión y recomendaciones para el entorno latinoamericano",
    paragraphs: [
      "El contexto de ciberseguridad en América Latina presenta retos presupuestales y operativos únicos ya que es sumamente común encontrar arquitecturas donde las redes corporativas y los sistemas de control industrial carecen de barreras físicas o lógicas. Recomendaciones aplicables al contexto mexicano o latinoamericano:",
    ],
    bullets: [
      "Segmentación estricta y control de tráfico: configurar correctamente los conmutadores (switches) y firewalls existentes para aislar los departamentos, bloqueando protocolos de comunicación innecesarios entre ellos como el uso indiscriminado de SMB o RDP.",
      "Arquitectura de resiliencia: establecer políticas de copias de seguridad de la regla “3-2-1”: 3 copias, 2 medios distintos, 1 fuera de línea, garantizando que al menos un respaldo sea físicamente inaccesible desde la red principal.",
      "Planes de respuesta a incidentes (IRP): desarrollar manuales de contingencia que asuman que la red caerá por completo, capacitando al personal para operar de forma manual, es decir, hacer los procesos en papel mientras los equipos de soporte técnico ejecutan la reconstrucción, minimizando el lucro cesante.",
    ],
  },
];

const references = [
  {
    text: "A.P. Møller–Mærsk A/S. (2017a). Annual report 2016.",
    url: "https://investor.maersk.com/static-files/a31c7bbc-577a-49df-9214-aef2d649a9f5",
  },
  {
    text: "A.P. Møller–Mærsk A/S. (2017b). Annual report 2017.",
    url: "https://investor.maersk.com/static-files/5d68faa5-f869-4c08-8a1d-9660fe889360",
  },
  {
    text: "A.P. Møller–Mærsk A/S. (2017c, 16 de agosto). Maersk Q2 2017 report [Presentación].",
    url: "https://investor.maersk.com/static-files/0ed2b2c8-518c-48ce-b009-c7b06308ad71",
  },
  {
    text: "A.P. Møller–Mærsk A/S. (2017d). Interim report Q3 2017.",
    url: "https://investor.maersk.com/static-files/1226cd7b-d1b4-4281-b42c-5f032b0e1595",
  },
  {
    text: "A.P. Møller–Mærsk A/S. (2017e, 7 de noviembre). Maersk Q3 2017 report [Presentación].",
    url: "https://investor.maersk.com/static-files/8806e0a2-454e-4585-b156-aa01c90c9601",
  },
  {
    text: "A.P. Møller–Mærsk A/S. (2017f). Risk management.",
    url: "https://investor.maersk.com/static-files/d533735a-5df7-423c-8611-d4a2c3bf31b0",
  },
  {
    text: "Avigdor, E. (2025, 20 de marzo). Cybersecurity in shipping and logistics: Small budgets, big risk. SC Media.",
    url: "https://www.scworld.com/perspective/cybersecurity-in-shipping-and-logistics-small-budgets-big-risk",
  },
  {
    text: "Banco de México. (s. f.). Tipos de cambio históricos.",
    url: "https://www.banxico.org.mx/tipcamb/tipCamIHAction.do",
  },
  {
    text: "Brumfield, C. (2022, 27 de junio). 5 years after NotPetya: Lessons learned. CSO Online.",
    url: "https://www.csoonline.com/article/573049/5-years-after-notpetya-lessons-learned.html",
  },
  {
    text: "Collyer, D. (2024, 18 de octubre). Case study: Maersk’s response to NotPetya—How cybersecurity best practices mitigated a major cyberattack. SOS Intelligence.",
    url: "https://sosintel.co.uk/case-study-maersks-response-to-notpetya-how-cybersecurity-best-practices-mitigated-a-major-cyberattack/",
  },
  {
    text: "Control Engineering. (s. f.). Throwback attack: How NotPetya accidentally took down global shipping giant Maersk.",
    url: "https://www.controleng.com/throwback-attack-how-notpetya-accidentally-took-down-global-shipping-giant-maersk/",
  },
  {
    text: "CyberOwl. (2022, 29 de septiembre). CyberOwl raises US$5.1M in funding to expand cyber-security support in shipping industry.",
    url: "https://cyberowl.io/cyberowl-raises-us5-1m-in-funding-to-expand-cyber-security-support-in-shipping-industry/",
  },
  {
    text: "Cybersecurity and Infrastructure Security Agency. (s. f.). Data backup options [PDF].",
    url: "https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf",
  },
  {
    text: "Cybersecurity and Infrastructure Security Agency. (2017, 1 de julio). Petya ransomware (Alert TA17-181A).",
    url: "https://www.cisa.gov/news-events/alerts/2017/07/01/petya-ransomware",
  },
  {
    text: "Elgan, M. (s. f.). ¿Cómo afectará el acuerdo de Merck al sector de los seguros? IBM.",
    url: "https://www.ibm.com/es-es/think/insights/merck-settlement-affect-insurance-industry",
  },
  {
    text: "European Network and Information Security Agency. (2012). Introduction to return on security investment: Helping CERTs assessing the cost of (lack of) security.",
    url: "https://www.enisa.europa.eu/sites/default/files/publications/Return%20On%20Security%20Investment.pdf",
  },
  {
    text: "Gartner. (2021). IT key metrics data 2021: Industry measures—Transportation. Gartner Research.",
  },
  {
    text: "Greenberg, A. (2018, 22 de agosto). The untold story of NotPetya, the most devastating cyberattack in history. WIRED.",
    url: "https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/",
  },
  {
    text: "IANS Research, & Artico Search. (2023, 26 de septiembre). New research from IANS and Artico Search reveals cybersecurity budgets increased just 6% for 2022–2023 cycle.",
    url: "https://www.iansresearch.com/resources/press-releases/detail/new-research-from-ians-and-artico-search-reveals-cybersecurity-budgets-increased-just-6-for-2022-2023-cycle",
  },
  {
    text: "Ivanov, A., & Mamedov, O. (2017, 28 de junio). ExPetr/Petya/NotPetya is a wiper, not ransomware. Securelist.",
    url: "https://securelist.com/expetrpetyanotpetya-is-a-wiper-not-ransomware/78902/",
  },
  {
    text: "Leovy, J. (2017, 17 de agosto). Cyberattack cost Maersk as much as $300 million and disrupted operations for 2 weeks. Los Angeles Times.",
    url: "https://www.latimes.com/business/la-fi-maersk-cyberattack-20170817-story.html",
  },
  {
    text: "Mathews, L. (2017, 16 de agosto). NotPetya ransomware attack cost shipping giant Maersk over $200 million. Forbes.",
    url: "https://www.forbes.com/sites/leemathews/2017/08/16/notpetya-ransomware-attack-cost-shipping-giant-maersk-over-200-million/",
  },
  {
    text: "Mizzi, A. (2010). Return on information security investment: The viability of an anti-spam solution in a wireless environment. International Journal of Network Security, 10(1), 18–24.",
    url: "https://doi.org/10.6633/IJNS.201001.10(1).03",
  },
  {
    text: "Parizo, E. (2019, 9 de diciembre). Maersk CISO says NotPetya devastated several unnamed US firms. Dark Reading.",
    url: "https://www.darkreading.com/cyber-risk/maersk-ciso-says-notpeyta-devastated-several-unnamed-us-firms",
  },
  {
    text: "PSA BDP. (2017, 27 de junio). Maersk says global IT breakdown caused by cyber-attack.",
    url: "https://psabdp.com/news/maersk-says-global-it-breakdown-caused-by-cyber-attack",
  },
  {
    text: "Simos, M. (2018, 5 de febrero). Overview of Petya, a rapid cyberattack. Microsoft Security Blog.",
    url: "https://www.microsoft.com/en-us/security/blog/2018/02/05/overview-of-petya-a-rapid-cyberattack/",
  },
  {
    text: "Swinhoe, D. (2019, 9 de octubre). Rebuilding after NotPetya: How Maersk moved forward. CSO Online.",
    url: "https://www.csoonline.com/article/567845/rebuilding-after-notpetya-how-maersk-moved-forward.html",
  },
  {
    text: "The MITRE Corporation. (2025, 16 de abril). NotPetya (S0368). MITRE ATT&CK.",
    url: "https://attack.mitre.org/software/S0368/",
  },
];

function Formulas({ lines }) {
  return (
    <pre className="my-4 overflow-x-auto border border-border bg-foreground p-4 font-mono text-xs leading-6 text-background">
      <code>{lines.join("\n")}</code>
    </pre>
  );
}

function Activity01() {
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
                Parcial I / Actividad 01
              </p>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.055em]">
                NotPetya –{" "}
                <span className="font-serif font-normal italic text-accent">
                  Maersk, 2017
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,1.35rem)] leading-8 text-muted">
                Análisis de un ciberataque real y su impacto empresarial:
                contexto, evaluación bajo el modelo CIA y cálculo del costo con
                el marco económico de Adrian Mizzi.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 font-mono text-xs lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div>
                <dt className="tracking-wider text-muted uppercase">Estado</dt>
                <dd className="mt-1 text-accent">Completada</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">
                  Modalidad
                </dt>
                <dd className="mt-1">Equipo 3</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Caso</dt>
                <dd className="mt-1">NotPetya · Maersk</dd>
              </div>
              <div>
                <dt className="tracking-wider text-muted uppercase">Marco</dt>
                <dd className="mt-1">CIA · Mizzi</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={resourceBase + "/OrtizLopezFriedaMaría-Act01.pdf"}
              download="OrtizLopezFriedaMaría-Act01.pdf"
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

            <nav aria-label="Contenido de la Actividad 01" className="mt-4">
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      to={"/activities/activity-01#" + section.id}
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
                Marcos de análisis
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                MITRE ATT&amp;CK · Modelo CIA · ROISI
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-24 lg:col-span-9">
          <ActivitySection id="introduccion" number="01" title="Introducción">
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              {introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </ActivitySection>

          <ActivitySection
            id="linea-tiempo"
            number="02"
            title="Línea del tiempo"
          >
            <ActivityFigure
              src={timelineImage}
              alt={timelineAlt}
              number="01"
              caption="Línea del tiempo del ataque NotPetya a Maersk, de 2016 al tercer trimestre de 2017"
              className="max-w-4xl"
            />
          </ActivitySection>

          <ActivitySection
            id="contexto"
            number="03"
            title="Contexto general del ataque"
          >
            <div className="max-w-3xl space-y-5 leading-7 wrap-break-word text-muted">
              {contextParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </ActivitySection>

          <ActivitySection
            id="tabla-tecnica"
            number="04"
            title="Tabla técnica del ataque"
          >
            <dl className="divide-y divide-border border-y border-border">
              {technicalTable.map((row) => (
                <div
                  key={row.element}
                  className="grid gap-3 py-6 md:grid-cols-[13rem_1fr] md:gap-8"
                >
                  <dt className="font-mono text-xs tracking-wider text-accent uppercase">
                    {row.element}
                  </dt>
                  <dd className="min-w-0 space-y-3 leading-7 wrap-break-word text-muted">
                    {row.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </ActivitySection>

          <ActivitySection
            id="modelo-cia"
            number="05"
            title="Evaluación del impacto: modelo CIA"
          >
            <ol className="divide-y divide-border border-y border-border">
              {ciaImpact.map((item) => (
                <li key={item.principle} className="py-8">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                    {item.principle}
                  </h3>

                  <div className="mt-5 grid gap-6 md:grid-cols-2 md:gap-10">
                    <div>
                      <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                        Descripción del impacto
                      </p>
                      <p className="mt-3 leading-7 wrap-break-word text-muted">
                        {item.impact}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                        Evidencia del caso
                      </p>
                      <p className="mt-3 leading-7 wrap-break-word text-muted">
                        {item.evidence}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </ActivitySection>

          <ActivitySection
            id="costo"
            number="06"
            title="Cálculo del costo total del ciberataque"
          >
            <p className="mb-10 max-w-3xl font-mono text-xs tracking-wider text-muted uppercase">
              Marco económico de Adrian Mizzi
            </p>

            {costSteps.map((step) => (
              <div key={step.id} className="max-w-3xl">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <div className="mt-4 space-y-4 leading-7 text-muted">
                  {step.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Formulas lines={step.formulas} />
              </div>
            ))}

            <div className="mt-12">
              <h3 className="text-xl font-semibold">
                Desglose estimado de los costos
              </h3>

              <div className="mt-5 overflow-x-auto border-y border-border">
                <table className="w-full min-w-[40rem] text-left">
                  <thead className="font-mono text-xs tracking-wider text-muted uppercase">
                    <tr>
                      <th className="px-4 py-4 font-normal">Tipo de costo</th>
                      <th className="px-4 py-4 font-normal">Descripción</th>
                      <th className="px-4 py-4 font-normal">Estimación (MXN)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {costBreakdown.map((row) => (
                      <tr
                        key={row.type}
                        className={row.isTotal ? "bg-surface font-semibold" : ""}
                      >
                        <td className="px-4 py-4 align-top">{row.type}</td>
                        <td className="px-4 py-4 align-top text-sm leading-6 font-normal text-muted">
                          {row.description}
                        </td>
                        <td className="px-4 py-4 align-top">{row.estimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <ol className="mt-14 divide-y divide-border">
              {costCalculations.map((item) => (
                <li key={item.id} className="max-w-3xl py-8 first:pt-0">
                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <div className="mt-4 space-y-4 leading-7 wrap-break-word text-muted">
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {item.formulas && <Formulas lines={item.formulas} />}

                  {item.after && (
                    <div className="mt-4 space-y-4 leading-7 wrap-break-word text-muted">
                      {item.after.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </ActivitySection>

          <ActivitySection id="conclusiones" number="07" title="Conclusiones">
            <div className="max-w-3xl space-y-10">
              {conclusions.map((block) => (
                <div key={block.title}>
                  <h3 className="text-xl font-semibold">{block.title}</h3>

                  <div className="mt-4 space-y-4 leading-7 text-muted">
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {block.bullets && (
                      <ol className="list-decimal space-y-3 pl-6">
                        {block.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ActivitySection>

          <ActivitySection id="referencias" number="08" title="Referencias">
            <ul className="max-w-3xl space-y-4 text-sm leading-6 text-muted">
              {references.map((reference) => (
                <li key={reference.text} className="border-t border-border pt-4">
                  <p>{reference.text}</p>
                  {reference.url && (
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-accent transition-colors hover:text-accent-hover"
                    >
                      {reference.url}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </ActivitySection>

          <ActivitySection id="recursos" number="09" title="Recursos">
            <div className="grid gap-5 sm:max-w-sm sm:grid-cols-1">
              <ResourceLink
                href={resourceBase + "/OrtizLopezFriedaMaría-Act01.pdf"}
                type="PDF"
                title="Informe final"
                description="Introducción, línea del tiempo, análisis técnico, impacto bajo el modelo CIA, costo del ataque, conclusiones y referencias."
                download="OrtizLopezFriedaMaría-Act01.pdf"
              />
            </div>
          </ActivitySection>
        </div>
      </div>
    </article>
  );
}

export default Activity01;
