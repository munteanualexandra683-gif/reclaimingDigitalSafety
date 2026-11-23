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

  rightsTitle: "¿Es esto abuso?",
  exposureTitle: "Comprobación segura",
  locationsTitle: "¿Dónde lo encontraste?",
  addLocation: "Añadir ubicación",
  reportNow: "Denunciar ahora", // TODO(review-es)
  documentOnly: "Solo documentar por ahora",
  talkFirst: "Hablar antes con alguien",
  notNow: "Ahora no (guardar y salir)",
  supportDirectory: "Directorio de apoyo (España)",
  evidenceTitle: "Pruebas: primero los enlaces",
  describeOnce: "Describe una sola vez",
  disclosureTitle: "Revisa qué se compartirá",
  sendSelected: "Enviar seleccionados",
  followupTitle: "Seguimiento y apoyo",
  appearedAgain: "El contenido apareció de nuevo",
  talkSomeone: "Hablar con alguien",

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
