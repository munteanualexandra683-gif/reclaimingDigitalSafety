import type { en } from "./dictionary.en";

/**
 * Spanish: backup translation. Any key missing here falls back to English.
 *
 * TODO(review-es): have all Spanish copy reviewed by a Spanish partner
 * organisation before the pilot. Lines marked TODO(review-es) individually
 * are ones where the wording, tone or an institutional term is uncertain.
 */
export const es: Partial<typeof en> = {
  /* Common */
  appName: "NEST",
  quickExit: "Salida rápida",
  quickExitAdvice: "Sal de esta web al instante. También puedes pulsar Esc dos veces.",
  discreetMode: "Modo discreto",
  on: "Activado",
  off: "Desactivado",
  language: "Idioma",
  english: "English",
  spanish: "Español",
  back: "Atrás",
  continue: "Continuar",
  saveLeave: "Guardar y salir",
  cancel: "Cancelar",
  copy: "Copiar",
  copied: "Copiado",
  loading: "Cargando…",
  learnMore: "Saber más",
  openOfficialSite: "Abrir la web oficial",
  verifiedPending: "Pendiente de verificación",
  toBeVerified: "Pendiente de verificar con una organización colaboradora antes del piloto.",

  stageDiscover: "Descubrir y evaluar",
  stageHelp: "Decidir si pedir ayuda",
  stagePathway: "Vías para denunciar", // TODO(review-es): "denunciar" vs "notificar" (not a police report)
  stagePrepare: "Preparar y enviar",
  stageFollowup: "Seguimiento y apoyo",
  stageOf: "Paso {current} de {total}",
  progressLabel: "Tu progreso",

  /* Home */
  homeHeroTitle: "Tú decides qué pasa ahora.",
  homeHeroText:
    "Si alguien creó o compartió una imagen íntima tuya sin tu consentimiento, aunque esté hecha con IA, NEST te ayuda a dar pasos claros y tranquilos, a tu ritmo.",
  homeStart: "Empezar o continuar",
  homeAlreadyReported: "Ya lo he denunciado", // TODO(review-es)
  homeTalkFirst: "Hablar antes con alguien",

  homeFaultTitle: "No es culpa tuya.",
  homeFaultText:
    "Aunque la imagen sea falsa, el daño es real. Crear o compartir una imagen íntima de alguien sin su consentimiento es abuso, y la responsabilidad es de quien lo hizo, no tuya.",
  homeFaultMoreTitle: "¿Qué tipo de imágenes incluye?",
  homeFaultMoreText:
    "Cualquier imagen, vídeo o audio sexual o íntimo tuyo creado, modificado o compartido sin tu consentimiento. Esto incluye los «deepfakes»: imágenes creadas o editadas con IA, por ejemplo poniendo tu cara en el cuerpo de otra persona o generando una imagen a partir de tus fotos públicas.",

  homeHowTitle: "Cinco pasos, a tu ritmo",
  homeHowText: "Puedes parar, volver atrás o guardar y salir en cualquier paso.",
  homeHowDiscover: "Anota dónde aparece la imagen. Solo necesitas los enlaces, no la imagen.",
  homeHowHelp: "Denunciar ahora, solo guardar un registro, hablar antes con alguien o parar por ahora. Cualquier opción está bien.",
  homeHowPathway: "Mira dónde puedes pedir que se retire y elige los sitios que quieras.",
  homeHowPrepare: "Describe lo ocurrido una sola vez. Revisa exactamente qué recibirá cada sitio antes de enviar nada.",
  homeHowFollowup: "Sigue las respuestas, vuelve a pedirlo si rechazan una denuncia y actúa si aparece de nuevo.",

  homePrivacyTitle: "Tu privacidad, en palabras sencillas",
  homePrivacyNoAccount: "Sin cuenta y sin registro.",
  homePrivacyLocal:
    "Lo que escribes se queda en este navegador, en este dispositivo. No nos llega nada y no tenemos servidor.",
  homePrivacyChoice:
    "Nada llega a una plataforma si tú no lo eliges. En este prototipo, el envío solo se simula.",
  homePrivacySharedDevice:
    "En un dispositivo compartido: tus notas se guardan sin cifrar en este navegador. Cuando termines, usa «Borrar todo» en tu registro o usa una ventana privada.",
  homePrivacyTechTitle: "Detalles técnicos",
  homePrivacyTechText:
    "NEST es una web estática: no hay servidor, ni analítica, ni seguimiento. Tu caso se guarda en el localStorage del navegador. Si quieres, NEST puede crear una huella SHA-256 de un archivo de tu dispositivo; el archivo nunca se sube. Para pasar tu caso a otro dispositivo se usa cifrado AES-GCM con una clave creada a partir de tu contraseña (PBKDF2).",

  homeSupportTitle: "No tienes que hacerlo sola", // TODO(review-es): gendered "sola"; confirm tone with partner
  homeSupportText:
    "Hablar con alguien puede ayudar, antes, durante o después de cualquier paso. Estos servicios son gratuitos o de bajo coste.",

  homeFaqTitle: "Preguntas",
  homeFaqUploadQ: "¿Tengo que subir la imagen?",
  homeFaqUploadA:
    "No. NEST funciona con enlaces y con tu propia descripción. Si quieres, puedes crear una huella de un archivo que ya tengas; el archivo se queda en tu dispositivo.",
  homeFaqRemovalQ: "¿Seguro que se retirará el contenido?",
  homeFaqRemovalA:
    "Nadie puede prometerlo: deciden las plataformas. En la UE, las plataformas tienen que revisar las denuncias de contenido ilegal y decirte qué han decidido.",
  homeFaqNameQ: "¿Tengo que dar mi nombre real?",
  homeFaqNameA:
    "Una denuncia a una plataforma normalmente pide un nombre y un correo electrónico. Tú eliges qué dar, y NEST te muestra exactamente qué recibirá cada sitio antes de enviar nada. Que se acepte una denuncia sin tu nombre real depende de la plataforma.",
  homeFaqPauseQ: "¿Puedo parar y volver más tarde?",
  homeFaqPauseA:
    "Sí. NEST guarda tu caso en este navegador. Vuelve a abrir NEST en el mismo dispositivo y elige «Empezar o continuar».",

  /* Guided case (/case) */
  caseNavLabel: "Pasos del caso",
  caseDeleted: "Tu caso se ha borrado de este navegador.",
  caseDelete: "Borrar este caso",
  caseDeleteConfirm:
    "Esto borra el caso y sus denuncias de este navegador. No se puede deshacer. ¿Quieres borrarlo?",
  caseDeleteYes: "Sí, borrarlo",

  caseResumeTitle: "Hola de nuevo",
  caseResumeText: "Tienes un caso guardado, modificado por última vez el {date}. Estabas en: {stage}.",
  caseResumeContinue: "Continuar mi caso",
  caseResumeNew: "Empezar un caso nuevo",
  caseResumeNewHint: "Si empiezas un caso nuevo, el anterior se queda en tu registro.",

  caseSavedTitle: "Tu caso está guardado",
  caseSavedText:
    "Está guardado en este navegador, en este dispositivo. Cuando quieras, vuelve a abrir NEST y elige «Empezar o continuar». No se ha enviado nada.",
  caseSavedShared:
    "En un dispositivo compartido, cualquiera que use este navegador podría abrirlo. Puedes borrarlo aquí abajo o usar la salida rápida en cualquier momento.",
  caseSavedHome: "Ir a la página de inicio",
  caseSavedBack: "Volver a mi caso",

  caseDiscoverIntro:
    "Tómate tu tiempo. Empieza anotando dónde lo viste. No hace falta que vuelvas a mirar la imagen.",
  caseWhereTitle: "¿Dónde lo viste?",
  caseWhereText: "Añade cada sitio por separado. Basta con los enlaces; nunca tienes que subir la imagen.",
  caseWhereLink: "Enlace (dirección web)",
  caseWhereNoLink: "No tengo un enlace",
  caseWherePlatform: "¿Qué plataforma o web?",
  caseWhereDescribe: "Describe dónde está",
  caseWhereDescribePlaceholder: "Por ejemplo: el nombre del grupo de Telegram",
  caseWhereMore: "Añadir más detalles (opcional)",
  caseWhereAccount: "Cuenta o usuario que lo publicó",
  caseWhereDate: "Fecha en que lo viste",
  caseWhereNote: "Nota breve",
  caseWhereAdd: "Añadir este sitio",
  caseWhereRemove: "Quitar",
  caseWhereRemoveLabel: "Quitar {place}",

  caseCheckTitle: "¿No sabes dónde aparece? Formas seguras de comprobarlo",
  caseCheckWarning:
    "Puede que veas la imagen al comprobarlo. Si prefieres no hacerlo, una persona de confianza puede hacerlo por ti.",
  caseCheckImage: "Buscar con una imagen",
  caseCheckImageText: "Busca copias de una foto con un buscador de imágenes.",
  caseCheckName: "Buscar tu nombre",
  caseCheckNameText: "Busca tu nombre, entre comillas, en Google y Bing.",
  caseCheckPlatforms: "Revisar las plataformas que usas",
  caseCheckPlatformsText: "Mira tus cuentas y los grupos donde gente que conoces podría compartir cosas.",
  caseCheckOpen: "Abrir {name}",

  caseRightsTitle: "¿Es esto abuso?",
  caseRightsText:
    "Sí. Crear o compartir una imagen íntima de alguien sin su consentimiento es abuso, aunque la imagen sea falsa o esté hecha con IA. No es culpa tuya y no tienes que decidir nada ahora.",
  caseRightsMore: "¿Qué se puede hacer?",
  caseRightsMoreText:
    "Puedes pedir a las plataformas y a los buscadores que lo retiren. En España también hay servicios nacionales que pueden actuar rápido y apoyarte. Verás estas opciones en el paso 3.",

  caseDecideIntro: "¿Qué te gustaría hacer ahora? Cualquier opción está bien y puedes cambiar de idea más adelante.",
  caseDecideReportNow: "Denunciar ahora", // TODO(review-es): "denunciar" vs "notificar"
  caseDecideReportNowText: "Mira dónde puedes pedir que se retire y prepara las denuncias.",
  caseDecideDocument: "Solo guardar un registro por ahora",
  caseDecideDocumentText: "Anota lo ocurrido y guárdalo, sin denunciar nada.",
  caseDecideTalk: "Hablar antes con alguien",
  caseDecideTalkText: "Mira los servicios de apoyo a los que puedes acudir antes de decidir.",
  caseDecideNotNow: "Ahora no",
  caseDecideNotNowText: "Guarda lo que tienes y sal. Puedes volver cuando quieras.",
  caseDecideHint: "Elige una opción para continuar.",
  caseDecideGoRoutes: "Ver opciones para denunciar",
  caseDecideGoDocument: "Continuar para anotarlo",
  caseDecideTalkRoutes: "Ver las opciones para denunciar de todos modos",
  caseSupportTitle: "Hablar con alguien",

  casePathwayIntro:
    "Estos son los sitios a los que puedes pedir ayuda para retirarlo. Hemos marcado los que encajan con lo que añadiste. Elige los que quieras.",
  casePathwayEmpty: "Primero añade al menos un sitio en el paso 1.",
  casePathwayEmptyLink: "Ir al paso 1",
  casePathwayNeeds: "Necesitarás: {items}",
  casePathwayAlreadySent: "Ya enviado",
  casePathwayAlreadyPrepared: "Ya preparado",
  casePathwayChooseHint: "Elige al menos una opción para continuar.",
  casePathwayContinue: "Continuar para preparar",
  casePathwayLawTitle: "Sobre la ley",
  casePathwayLawText: // TODO(review-es): legal wording
    "En la UE, la Ley de Servicios Digitales obliga a las plataformas a revisar las denuncias de contenido ilegal. Que una imagen íntima hecha con IA sea ilegal depende hoy de la ley de cada país. Una directiva europea (2024/1385) debe aplicarse en todos los Estados miembros antes de junio de 2027.",

  casePrepareIntro:
    "Describe lo ocurrido una sola vez; NEST lo usa en todas las denuncias. Después revisa qué recibirá cada sitio.",
  casePrepareIntroDocument: "Anota lo ocurrido. No se enviará nada.",
  casePrepareGoFollowup: "Continuar al seguimiento",
  casePrepareSwitchToReport: "Al final quiero denunciar",

  caseEvidenceTitle: "Guarda un registro antes de que cambie",
  caseEvidenceTip1: "Guarda los enlaces y los nombres de usuario antes de bloquear o denunciar una cuenta. Las publicaciones y los mensajes temporales pueden desaparecer.",
  caseEvidenceTip2: "No reenvíes la imagen ni la guardes en una carpeta compartida en la nube.",
  caseEvidenceTip3: "En un dispositivo compartido, usa una ventana privada.",
  caseEvidenceFingerprint: "Opcional: crear una huella de un archivo que ya tengas",

  caseDescribeTitle: "Descríbelo una vez",
  caseDescribeLabel: "¿Qué pasó y dónde aparece?",
  caseDescribeName: "Tu nombre o un seudónimo",
  caseDescribeEmail: "Correo para respuestas (opcional)",
  caseDescribeNotSaved:
    "Tu nombre y tu correo no se guardan en este dispositivo. Si sales, tendrás que escribirlos de nuevo.",

  caseDisclosureTitle: "Revisa qué se compartirá",
  caseDisclosureIntro:
    "Una denuncia a una plataforma normalmente incluye tu nombre y tu correo; sin ellos puede que no se tramite. Las plataformas pueden avisar a la cuenta denunciada de que se ha hecho una denuncia. Revisa qué recibirá cada sitio.",
  caseDisclosureNone: "No hay opciones seleccionadas.",
  caseDisclosureNoneLink: "Elegir opciones en el paso 3",
  caseDisclosureWillReceive: "{recipient} recibirá: {items}.",
  caseDisclosureEdit: "Ver o editar el texto",
  caseDisclosureEditLabel: "Texto para: {title}",
  caseDisclosureReset: "Volver al texto original",
  caseDisclosureReviewed: "He revisado qué se compartirá",
  caseShareName: "tu nombre o seudónimo",
  caseSharePlaceholder: "un texto de ejemplo en lugar de tu nombre",
  caseShareEmail: "tu correo",
  caseShareLinks: "los enlaces",
  caseShareDescription: "tu descripción",
  caseShareFingerprint: "la huella del archivo",
  caseShareHash: "nada desde NEST. Usas StopNCII tú misma, solo si quieres", // TODO(review-es): gendered "misma"
  caseSend: "Enviar seleccionados ({count})",
  caseSending: "Preparando…",
  caseSendSimulated: "Esto es un prototipo: no se envía nada de verdad. El envío es simulado.",

  caseSentTitle: "Guardado en tu registro",
  caseSentText: "Esto es lo que ha pasado con cada opción.",
  caseSentSimulated: "{recipient}: envío simulado. En este prototipo nada sale de tu dispositivo.",
  caseSentManual: "{recipient}: listo para que lo envíes tú. Copia el texto y pégalo en el formulario oficial.",
  caseSentMarked: "Marcado como enviado.",
  caseCopyOpen: "Copiar el texto y abrir el formulario oficial",
  caseMarkSent: "Ya lo he enviado",

  caseFollowNextTitle: "Qué pasa ahora",
  caseFollowNextText:
    "Las plataformas suelen responder en pocos días, pero puede tardar más. NEST pone una fecha de recordatorio 7 días después de enviar. En tu registro puedes anotar respuestas, obtener un mensaje de recordatorio o pedir una revisión si rechazan una denuncia.",
  caseFollowOpenLog: "Abrir mi registro",
  caseFollowSupportText: "Los servicios de apoyo pueden ayudarte con cómo te sientes y con dudas legales.",
  caseFollowShowSupport: "Ver servicios de apoyo",
  caseAgainTitle: "Ha vuelto a aparecer",
  caseAgainText: "Añade el nuevo enlace y NEST preparará una nueva denuncia. Las denuncias que ya hiciste no cambian.",
  caseAgainLink: "Nuevo enlace",
  caseAgainAdd: "Añadir y preparar una nueva denuncia",
  caseRepeatNote: "Ha vuelto a aparecer",
  reportMoved: "Esta página ha cambiado. Te llevamos a tu caso…",

  /* Reporting routes */
  routeOtherPlatform: "Otra plataforma",
  routeDsaTitle: "Denunciar a {platform}",
  routeDsaAbout:
    "En la UE, las plataformas tienen que revisar las denuncias de contenido ilegal. Hay que comprobar con cada plataforma si aceptan denuncias sobre imágenes hechas con IA cuando no sabes quién las hizo.",
  routeDeindexTitle: "Pedir a Google o Bing que oculten los resultados",
  routeDeindexRecipient: "Google o Bing",
  routeDeindexAbout:
    "Esto oculta el resultado en el buscador, pero no borra la imagen de la web donde está. Consulta la política actual del buscador sobre imágenes íntimas hechas con IA.",
  routeNationalTitle: "Canal prioritario de la AEPD (España)",
  routeNationalRecipient: "AEPD",
  routeNationalAbout: // TODO(review-es): institutional wording
    "La Agencia Española de Protección de Datos (AEPD) tiene un canal rápido para contenido sexual publicado sin consentimiento. Consulta en su web qué necesita y si acepta imágenes hechas con IA.",
  routeHashTitle: "StopNCII: ayuda a evitar que se vuelva a subir",
  routeHashRecipient: "StopNCII",
  routeHashAbout:
    "StopNCII crea una huella de una imagen en tu propio dispositivo y solo comparte la huella con las plataformas participantes. Lo haces tú en su web, y solo si tienes la imagen. Si la imagen se hizo cuando eras menor de 18 años, el servicio adecuado es Take It Down.",
  routeHostTitle: "Denunciar al alojamiento de la web",
  routeHostRecipient: "Alojamiento o registrador de la web",
  routeHostAbout:
    "Si la imagen está en una web independiente, la empresa que aloja esa web puede retirarla. Una herramienta pública de consulta puede mostrar quién aloja una web.",
  routeNeedLink: "el enlace",
  routeNeedLinks: "los enlaces",
  routeNeedAccount: "el nombre de la cuenta, si lo sabes",
  routeNeedDate: "la fecha en que lo viste",
  routeNeedDescription: "una breve descripción",
  routeNeedSearchLink: "el enlace al resultado de búsqueda",
  routeNeedSearchWords: "las palabras que buscaste",
  routeNeedName: "tu nombre o un seudónimo",
  routeNeedEmailOptional: "un correo (opcional)",
  routeNeedFileOptional: "el archivo de la imagen en tu dispositivo, solo si lo tienes y quieres usarlo",
  routeNeedWebsite: "el nombre de la web",

  /* Case log (/dashboard) */
  logTitle: "Mi registro",
  logIntro: "Guardado solo en este navegador, en este dispositivo. Nada de esto se envía a ningún sitio.",
  logEmptyTitle: "Todavía no hay nada",
  logEmptyText: "Cuando prepares denuncias en tu caso, aparecerán aquí para que hagas el seguimiento a tu ritmo.",
  logCaseTitle: "Caso iniciado el {date}",
  logCaseCounts: "{places} sitio(s) · {reports} denuncia(s)",
  logCaseNoReports: "Todavía no hay denuncias. Tus notas están guardadas y puedes continuar cuando quieras.",
  logCaseDeleted: "El caso se ha borrado de este navegador.",
  logOtherReports: "Otras denuncias",
  logAgainText: "¿Lo has encontrado en otro sitio? Añade el nuevo enlace y NEST preparará una nueva denuncia.",
  logAgainButton: "Añadir un nuevo enlace",

  logStatus: "Estado",
  logStatusDraft: "Listo para enviar",
  logStatusSubmitted: "Enviado",
  logStatusSubmittedSimulated: "Enviado (simulado)",
  logStatusAcknowledged: "Han respondido",
  logStatusFollowUp: "Esperando respuesta",
  logStatusRemoved: "Contenido retirado",
  logStatusDeclined: "Rechazado",
  logRoutePlatform: "Denuncia a una plataforma",
  logRouteSearch: "Resultados de búsqueda",
  logRouteNational: "Autoridad nacional",
  logRouteHash: "StopNCII",
  logRouteHost: "Alojamiento de la web",
  logNoLink: "No hay enlace guardado",
  logPrepared: "Preparado el {date}",
  logExpected: "respuesta prevista antes del {date}",

  logReadyText: "Todavía tienes que enviarlo tú. Copia el texto y pégalo en el formulario oficial.",
  logCopyText: "Copiar el texto",

  logNoAnswerTitle: "¿Todavía sin respuesta?",
  logNoAnswerText: "Ya ha pasado la fecha prevista. Puedes enviar un breve recordatorio:",
  logReminderTemplate:
    "Escribo para hacer seguimiento de mi denuncia del {date}. Mi referencia es {reference}. Les ruego que me confirmen el estado y los próximos pasos.",
  logReminderSent: "He enviado un recordatorio",
  logReminderDone: "Recordatorio enviado el {date}",

  logDeclinedTitle: "Te han dicho que no",
  logDeclinedText: "No es el final. Puedes pedirles que revisen su decisión:",
  logReviewTemplate:
    "Les pido que revisen su decisión de rechazar mi denuncia del {date} (referencia {reference}). Les ruego que vuelvan a examinar la denuncia y los motivos que expuse, y que me comuniquen el resultado.",
  logReviewSent: "He enviado esta petición",
  logReviewDone: "Revisión pedida el {date}",
  logDeclinedMore: // TODO(review-es): legal wording
    "Según la Ley de Servicios Digitales de la UE, las plataformas deben ofrecer un sistema interno de reclamaciones sobre sus decisiones (artículo 20). También puedes acudir a un órgano certificado de resolución extrajudicial de litigios (artículo 21) o reclamar ante el Coordinador de Servicios Digitales de tu país (artículo 53).",
  logReferencePlaceholder: "[referencia]",

  logDetails: "Detalles y notas",
  logReference: "Número de referencia",
  logExpectedLabel: "Respuesta prevista antes del",
  logNotes: "Notas privadas",
  logNotesPlaceholder: "Por ejemplo: la fecha en que respondieron, qué dijeron",
  logFingerprint: "Huella del archivo (SHA-256)",
  logShowText: "Ver el texto que se preparó",
  logDeleteReport: "Borrar esta denuncia",
  logDeleteReportConfirm: "¿Borrar esta denuncia de este navegador? No se puede deshacer.",

  logDeleteAllTitle: "Borrar todo",
  logDeleteAllText: "Elimina en cualquier momento todos los casos, denuncias y notas de este navegador.",
  logDeleteAll: "Borrar todo",
  logDeleteAllConfirm: "Esto borra todos los casos, denuncias y notas de este navegador. No se puede deshacer. ¿Seguro?",
  logDeleteAllYes: "Sí, borrar todo",
  logAllDeleted: "Se ha borrado todo de este navegador.",

  /* Support directory */
  supportSpainTitle: "En España",
  supportEuTitle: "En cualquier país de la UE",
  supportEu116006: "116 006: línea de ayuda a víctimas de delitos",
  supportEu116006Text: "Un mismo número en varios países de la UE. Comprueba si funciona en el tuyo.",
  supportEu116016: "116 016: línea de ayuda para mujeres que sufren violencia",
  supportEu116016Text: "Un mismo número en varios países de la UE. Comprueba si funciona en el tuyo.",
  supportCost: "Coste: {cost}",
  supportLanguages: "Idiomas: {languages}",
  supportContact: "Contacto: {contact}",
};
