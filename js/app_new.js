/**
 * APLICACIÓN QYVARA - ORIENTACIÓN VOCACIONAL
 * Sistema completo con registro, login, tests, administración
 */

// ==================== VARIABLES GLOBALES ====================
let tipoTestActual = "";
let preguntasActuales = [];
let testActualSeleccionado = null;
let ultimoMetodoPago = null;
let ultimoPagoDetalles = null;

// ==================== TRADUCCIONES ====================
const textos = {
  es: {
    sloganIndex: "Tu futuro profesional, con dirección exacta.",
    btnLoginIndex: "Iniciar sesión",
    btnRegisterIndex: "Crear cuenta",
    sloganLogin: "Orientación vocacional bilingüe con dirección exacta.",
    tituloLogin: "Iniciar sesión",
    inputUser: "DNI o usuario admin",
    inputPass: "Contraseña",
    btnLogin: "Ingresar",
    linkRegistro: "Crear cuenta nueva",
    registroTitulo: "Crear cuenta",
    dni: "DNI",
    nombre: "Nombre completo",
    telefono: "Teléfono",
    correo: "Correo personal",
    optDepartamento: "Departamento",
    optIdioma: "Idioma preferido",
    password: "Contraseña",
    confirmPassword: "Repetir contraseña",
    btnRegistrarse: "Registrarse",
    linkLogin: "Ya tengo cuenta",
    cerrarSesion: "Cerrar sesión",
    descPanel: "Elige el tipo de orientación vocacional que deseas realizar.",
    tituloGratis: "Test Gratuito",
    descGratis: "Orientación inicial para descubrir tus intereses.",
    btnGratis: "Realizar test gratuito",
    tituloPremium: "Test Premium S/ 35.00",
    descPremium: "Evaluación avanzada con informe personalizado.",
    btnPremium: "Realizar test premium",
    tituloPago: "Métodos de pago disponibles",
    descPago: "Elige tu método de pago preferido:",
    metoPlin: "Plin",
    metoYape: "Yape",
    metoTransferencia: "Transferencia",
    metoTarjeta: "Tarjeta",
    btnConfirmarPago: "Confirmar y continuar con test",
    btnResultado: "Ver resultado",
    tituloHistorial: "Historial de tests realizados",
    tituloAdmin: "Panel Administrador",
    usuariosTitulo: "Usuarios registrados",
    tituloPagos: "Historial de Pagos",
    tituloAdmins: "Gestión de Administradores",
    crearAdminTitulo: "Crear nuevo Administrador",
    passAutoTitulo: "Contraseña por defecto: DNI del administrador",
    btnCrearAdmin: "Crear Administrador",
    listaAdminsTitulo: "Lista de Administradores",
    miPerfilTitulo: "Mi Perfil",
    labelDatos: "Datos del Administrador",
    btnSubirFoto: "Cambiar foto",
    gestionarTestsTitulo: "Gestión de Tests Personalizados",
    crearTestTitulo: "Crear nuevo Test",
    preguntasTitulo: "Preguntas del test",
    btnAgregarPregunta: "+ Agregar pregunta",
    btnGuardarTest: "Guardar Test",
    testsCreadosTitulo: "Tests Disponibles",
    testsAdminTitulo: "Tests creados por el administrador",
    labelUsers: "Usuarios",
    labelPremium: "Premium",
    labelGratis: "Gratis",
    btnVerHistorial: "Ver historial"
  },
  qu: {
    sloganIndex: "Hamutasqa ñanniyki, allin ñanta rikuchispa.",
    btnLoginIndex: "Yaykuy",
    btnRegisterIndex: "Musuq cuenta ruway",
    sloganLogin: "Iskay simipi yachay maskay, allin ñanta rikuchispa.",
    tituloLogin: "Yaykuy",
    inputUser: "DNI utaq admin usuario",
    inputPass: "Yaykuna simi",
    btnLogin: "Yaykuy",
    linkRegistro: "Musuq cuenta ruway",
    registroTitulo: "Cuenta ruway",
    dni: "DNI",
    nombre: "Hunt'asqa suti",
    telefono: "Telefono",
    correo: "Correo personal",
    optDepartamento: "Departamento",
    optIdioma: "Munakusqa simi",
    password: "Yaykuna simi",
    confirmPassword: "Yaykuna simita yapamanta qillqay",
    btnRegistrarse: "Qillqakuy",
    linkLogin: "Cuenta kapuwanña",
    cerrarSesion: "Lluqsiy",
    descPanel: "Akllay ima orientación vocacional ruwayta munanki.",
    tituloGratis: "Mana qullqiyuq Test - Yachay maskay",
    descGratis: "20 tapukuykunawan munayniykikunata, yachayniykikunata taripay.",
    btnGratis: "Mana qullqiyuq test ruway",
    tituloPremium: "Premium Test S/ 35.00",
    descPremium: "30 tapukuykunawan hatun yachay, hamuq llamkaykimanta willakuy.",
    btnPremium: "Premium test ruway",
    tituloPago: "Qullqi pagakuy kamayuq",
    descPago: "Akllay pagakuy kamayki:",
    metoPlin: "Plin",
    metoYape: "Yape",
    metoTransferencia: "Apachiy",
    metoTarjeta: "Tarjeta",
    btnConfirmarPago: "Takyachiy hinaspa llamkayta qallariy",
    btnResultado: "Taripay rikuchiy",
    tituloHistorial: "Ruwasqa testkuna",
    tituloAdmin: "Kamachiq panel",
    usuariosTitulo: "Qillqasqa runakuna",
    tituloPagos: "Qullqi pagakuykuna",
    tituloAdmins: "Kamachiqkuna allichay",
    crearAdminTitulo: "Musuq kamachiq ruway",
    passAutoTitulo: "Kikin DNI kamachiqpa yaykuna simin",
    btnCrearAdmin: "Kamachiq ruway",
    listaAdminsTitulo: "Kamachiqkuna lista",
    miPerfilTitulo: "Ñuqapaq perfil",
    labelDatos: "Kamachiqpa willakuykuna",
    btnSubirFoto: "Rikch'ayniy taqi",
    gestionarTestsTitulo: "Sapanchasqa testkuna allichay",
    crearTestTitulo: "Musuq test ruway",
    preguntasTitulo: "Testpa tapukuykuna",
    btnAgregarPregunta: "+ Tapukuy yapay",
    btnGuardarTest: "Test waqaychay",
    testsCreadosTitulo: "Kamarisqa testkuna",
    testsAdminTitulo: "Administradorkuna ruwasqa testkuna",
    labelUsers: "Runakuna",
    labelPremium: "Premium",
    labelGratis: "Mana qullqi",
    btnVerHistorial: "Taripay rikuchiy"
  }
};

// ==================== PREGUNTAS DE TESTS ====================
const preguntasGratisES = [
  {
    texto: "¿Qué actividad te interesa más?",
    opciones: [
      { texto: "Resolver problemas con computadoras", area: "Tecnología" },
      { texto: "Ayudar a personas con su salud", area: "Salud" },
      { texto: "Crear negocios o vender productos", area: "Negocios" },
      { texto: "Diseñar piezas visuales o comunicar ideas", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿En qué curso te sientes mejor?",
    opciones: [
      { texto: "Matemática o computación", area: "Tecnología" },
      { texto: "Biología o anatomía", area: "Salud" },
      { texto: "Economía o emprendimiento", area: "Negocios" },
      { texto: "Arte, comunicación o diseño", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de trabajo prefieres?",
    opciones: [
      { texto: "Crear soluciones digitales", area: "Tecnología" },
      { texto: "Atender y orientar personas", area: "Salud" },
      { texto: "Organizar equipos y proyectos", area: "Negocios" },
      { texto: "Crear contenido visual o audiovisual", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué herramienta te llama más la atención?",
    opciones: [
      { texto: "Computadoras, software y redes", area: "Tecnología" },
      { texto: "Equipos médicos o laboratorio", area: "Salud" },
      { texto: "Hojas de cálculo, ventas y gestión", area: "Negocios" },
      { texto: "Cámaras, diseño o edición", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué problema te gustaría resolver?",
    opciones: [
      { texto: "Automatizar procesos", area: "Tecnología" },
      { texto: "Mejorar la salud de las personas", area: "Salud" },
      { texto: "Mejorar ventas y administración", area: "Negocios" },
      { texto: "Comunicar mensajes de forma creativa", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué título te gustaría ver en tu tarjeta profesional?",
    opciones: [
      { texto: "Ingeniero o Desarrollador", area: "Tecnología" },
      { texto: "Profesional de la salud", area: "Salud" },
      { texto: "Gestor de negocios", area: "Negocios" },
      { texto: "Creador visual", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Te imaginas trabajando en un laboratorio, clínica, oficina o estudio creativo?",
    opciones: [
      { texto: "Laboratorio u oficina moderna", area: "Tecnología" },
      { texto: "Clínica u hospital", area: "Salud" },
      { texto: "Oficina de gestión", area: "Negocios" },
      { texto: "Estudio de diseño o grabación", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué actividad disfrutas más en tu tiempo libre?",
    opciones: [
      { texto: "Programar o crear apps", area: "Tecnología" },
      { texto: "Cuidar a personas o aprender medicina", area: "Salud" },
      { texto: "Emprender o analizar cifras", area: "Negocios" },
      { texto: "Dibujar, crear videos o música", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "Cuando trabajas en equipo, prefieres liderar, apoyar, analizar datos o proponer ideas creativas.",
    opciones: [
      { texto: "Resolver detalles técnicos", area: "Tecnología" },
      { texto: "Cuidar del equipo" , area: "Salud" },
      { texto: "Organizar y negociar", area: "Negocios" },
      { texto: "Proponer conceptos visuales", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué te motiva más: innovar, cuidar personas, vender o crear arte?",
    opciones: [
      { texto: "Crear nuevas soluciones", area: "Tecnología" },
      { texto: "Apoyar el bienestar", area: "Salud" },
      { texto: "Impulsar negocios", area: "Negocios" },
      { texto: "Expresar creatividad", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Cómo te gustaría que fuera tu ambiente laboral?",
    opciones: [
      { texto: "Moderno y tecnológico", area: "Tecnología" },
      { texto: "Tranquilo y sensible", area: "Salud" },
      { texto: "Dinámico y estratégico", area: "Negocios" },
      { texto: "Colorido y artístico", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "En una presentación, prefieres mostrar datos, explicar salud, hablar de negocios o compartir arte.",
    opciones: [
      { texto: "Presentar resultados técnicos", area: "Tecnología" },
      { texto: "Hablar sobre salud humana", area: "Salud" },
      { texto: "Explicar estrategias comerciales", area: "Negocios" },
      { texto: "Mostrar proyectos visuales", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de palabras reconoces mejor?",
    opciones: [
      { texto: "Código, algoritmos y datos", area: "Tecnología" },
      { texto: "Células, cuerpo y salud", area: "Salud" },
      { texto: "Dinero, clientes y ventas", area: "Negocios" },
      { texto: "Color, forma y mensaje", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de metas te parecen más claras?",
    opciones: [
      { texto: "Inventar algo nuevo", area: "Tecnología" },
      { texto: "Saludar y recuperar a alguien", area: "Salud" },
      { texto: "Lograr objetivos comerciales", area: "Negocios" },
      { texto: "Crear experiencias visuales", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de noticias te atraen más?",
    opciones: [
      { texto: "Lanzamientos tecnológicos", area: "Tecnología" },
      { texto: "Avances médicos", area: "Salud" },
      { texto: "Historias de emprendimiento", area: "Negocios" },
      { texto: "Tendencias creativas", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué problema profesional te gustaría solucionar?",
    opciones: [
      { texto: "Optimizar software o sistemas", area: "Tecnología" },
      { texto: "Mejorar el bienestar de pacientes", area: "Salud" },
      { texto: "Aumentar el éxito de negocios", area: "Negocios" },
      { texto: "Comunicar mensajes impactantes", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "Qué herramienta te suena mejor: código, estetoscopio, Excel o cámara.",
    opciones: [
      { texto: "Código y desarrollo", area: "Tecnología" },
      { texto: "Estetoscopio y cuidado", area: "Salud" },
      { texto: "Excel y gestión", area: "Negocios" },
      { texto: "Cámara y diseño", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué forma de aprendizaje te parece más natural?",
    opciones: [
      { texto: "Ejecutar prácticas técnicas", area: "Tecnología" },
      { texto: "Practicar con casos reales de salud", area: "Salud" },
      { texto: "Estudiar estrategias y finanzas", area: "Negocios" },
      { texto: "Explorar ejercicios creativos", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué prefieres hacer para sentirte realizado?",
    opciones: [
      { texto: "Mejorar procesos digitales", area: "Tecnología" },
      { texto: "Cuidar y apoyar a otros", area: "Salud" },
      { texto: "Crear ideas de negocio", area: "Negocios" },
      { texto: "Diseñar piezas con impacto", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Con qué tipo de proyectos te imaginas en los próximos 3 años?",
    opciones: [
      { texto: "Apps, sistemas y software", area: "Tecnología" },
      { texto: "Servicios de salud y bienestar", area: "Salud" },
      { texto: "Proyectos comerciales y de gestión", area: "Negocios" },
      { texto: "Proyectos visuales, creativos o mediáticos", area: "Arte y Comunicación" }
    ]
  }
];

const preguntasPremiumExtraES = [
  {
    texto: "¿Cuál es tu mayor interés en tecnología, salud, negocios o diseño?",
    opciones: [
      { texto: "Descubrir nuevas plataformas digitales", area: "Tecnología" },
      { texto: "Brindar apoyo a pacientes y su recuperación", area: "Salud" },
      { texto: "Crear estrategias para empresas", area: "Negocios" },
      { texto: "Producir proyectos visuales e innovadores", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué valoras más: precisión técnica, empatía, estrategia o creatividad?",
    opciones: [
      { texto: "Exactitud y lógica", area: "Tecnología" },
      { texto: "Cercanía con las personas", area: "Salud" },
      { texto: "Planificar resultados", area: "Negocios" },
      { texto: "Crear ideas únicas", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de producto te gustaría desarrollar?",
    opciones: [
      { texto: "Aplicaciones o plataformas", area: "Tecnología" },
      { texto: "Servicios médicos o terapias", area: "Salud" },
      { texto: "Planes de marketing o servicios", area: "Negocios" },
      { texto: "Campañas visuales o contenidos artísticos", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿En qué tipo de información te gustaría especializarte?",
    opciones: [
      { texto: "Datos y sistemas", area: "Tecnología" },
      { texto: "Análisis clínicos y salud", area: "Salud" },
      { texto: "Estadísticas y finanzas", area: "Negocios" },
      { texto: "Historias y lenguaje creativo", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué rol te motiva dentro de un equipo?",
    opciones: [
      { texto: "Solucionar problemas técnicos", area: "Tecnología" },
      { texto: "Cuidar a los demás", area: "Salud" },
      { texto: "Guiar decisiones comerciales", area: "Negocios" },
      { texto: "Inspirar con ideas creativas", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué horario de trabajo prefieres?",
    opciones: [
      { texto: "Flexible con proyectos digitales", area: "Tecnología" },
      { texto: "Con turnos planificados", area: "Salud" },
      { texto: "Horarios de oficina o reuniones", area: "Negocios" },
      { texto: "Tardes creativas en estudio", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué espacio te inspira mejor?",
    opciones: [
      { texto: "Oficina moderna con pantallas", area: "Tecnología" },
      { texto: "Sala de atención o laboratorio", area: "Salud" },
      { texto: "Oficina o sala de juntas", area: "Negocios" },
      { texto: "Estudio con colores y materiales", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué forma de comunicación disfrutas más?",
    opciones: [
      { texto: "Explicar soluciones técnicas", area: "Tecnología" },
      { texto: "Escuchar y aconsejar", area: "Salud" },
      { texto: "Presentar ideas de negocios", area: "Negocios" },
      { texto: "Compartir historias visuales", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué desafío te resultó más satisfactorio?",
    opciones: [
      { texto: "Resolver una falla de software", area: "Tecnología" },
      { texto: "Ayudar a alguien a mejorar su salud", area: "Salud" },
      { texto: "Cerrar una venta importante", area: "Negocios" },
      { texto: "Terminar una pieza creativa", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué perfil profesional te llama más la atención?",
    opciones: [
      { texto: "Desarrollador o ingeniero de sistemas", area: "Tecnología" },
      { texto: "Técnico en enfermería o nutrición", area: "Salud" },
      { texto: "Administrador o gerente de ventas", area: "Negocios" },
      { texto: "Diseñador gráfico o comunicador audiovisual", area: "Arte y Comunicación" }
    ]
  }
];

const preguntasGratisQU = preguntasGratisES;
const preguntasPremiumExtraQU = preguntasPremiumExtraES;

const carreras = {
  "Tecnología": ["Ingeniería de Sistemas", "Ingeniería de Software", "Computación", "Soporte Técnico"],
  "Salud": ["Enfermería", "Psicología", "Técnica en Farmacia", "Laboratorio Clínico"],
  "Negocios": ["Administración", "Contabilidad", "Marketing", "Administración Bancaria"],
  "Arte y Comunicación": ["Diseño Gráfico", "Comunicación Audiovisual", "Publicidad", "Diseño Digital"]
};

// ==================== UTILIDADES ====================
function getIdioma() {
  return localStorage.getItem("idioma") || "es";
}

function cambiarIdiomaManual() {
  const selector = document.getElementById("idiomaSelector");
  if (!selector) return;
  localStorage.setItem("idioma", selector.value);
  aplicarIdioma();
}

function setText(id, texto) {
  const el = document.getElementById(id);
  if (el) el.innerText = texto;
}

function setPlaceholder(id, texto) {
  const el = document.getElementById(id);
  if (el) el.placeholder = texto;
}

function aplicarIdioma() {
  const idioma = getIdioma();
  const t = textos[idioma];

  const selector = document.getElementById("idiomaSelector");
  if (selector) selector.value = idioma;

  setText("sloganIndex", t.sloganIndex);
  setText("btnLoginIndex", t.btnLoginIndex);
  setText("btnRegisterIndex", t.btnRegisterIndex);
  setText("tituloLogin", t.tituloLogin);
  setText("btnLogin", t.btnLogin);
  setText("linkRegistro", t.linkRegistro);
  setText("registroTitulo", t.registroTitulo);
  setText("btnRegistrarse", t.btnRegistrarse);
  setText("linkLogin", t.linkLogin);
  setText("btnLogout", t.cerrarSesion);
  setText("btnLogoutAdmin", t.cerrarSesion);
  setText("descPanel", t.descPanel);
  setText("tituloGratis", t.tituloGratis);
  setText("descGratis", t.descGratis);
  setText("btnGratis", t.btnGratis);
  setText("tituloPremium", t.tituloPremium);
  setText("descPremium", t.descPremium);
  setText("btnPremium", t.btnPremium);
  setText("tituloPago", t.tituloPago);
  setText("descPago", t.descPago);
  setText("btnConfirmarPago", t.btnConfirmarPago);
  setText("btnResultado", t.btnResultado);
  setText("tituloHistorial", t.tituloHistorial);
  setText("tituloAdmin", t.tituloAdmin);
  setText("usuariosTitulo", t.usuariosTitulo);
  setText("tituloPagos", t.tituloPagos);
  setText("tituloAdmins", t.tituloAdmins);
  setText("crearAdminTitulo", t.crearAdminTitulo);
  setText("passAutoTitulo", t.passAutoTitulo);
  setText("btnCrearAdmin", t.btnCrearAdmin);
  setText("listaAdminsTitulo", t.listaAdminsTitulo);
  setText("miPerfilTitulo", t.miPerfilTitulo);
  setText("labelDatos", t.labelDatos);
  setText("btnSubirFoto", t.btnSubirFoto);
  setText("gestionarTestsTitulo", t.gestionarTestsTitulo);
  setText("crearTestTitulo", t.crearTestTitulo);
  setText("preguntasTitulo", t.preguntasTitulo);
  setText("btnAgregarPregunta", t.btnAgregarPregunta);
  setText("btnGuardarTest", t.btnGuardarTest);
  setText("testsCreadosTitulo", t.testsCreadosTitulo);
  setText("adminTestsTitle", t.testsAdminTitulo);
  setText("labelUsers", t.labelUsers);
  setText("labelPremium", t.labelPremium);
  setText("labelGratis", t.labelGratis);
  setText("btnVerHistorial", t.btnVerHistorial);

  setPlaceholder("inputUser", t.inputUser);
  setPlaceholder("inputPass", t.inputPass);
  setPlaceholder("loginUser", t.inputUser);
  setPlaceholder("loginPass", t.inputPass);
  setPlaceholder("dni", t.dni);
  setPlaceholder("nombre", t.nombre);
  setPlaceholder("telefono", t.telefono);
  setPlaceholder("correo", t.correo);
  setPlaceholder("password", t.password);
  setPlaceholder("confirmPassword", t.confirmPassword);
}

function obtenerPreguntas(tipo) {
  const idioma = getIdioma();
  if (idioma === "qu") {
    return tipo === "premium"
      ? [...preguntasGratisQU, ...preguntasPremiumExtraQU]
      : preguntasGratisQU;
  }
  return tipo === "premium"
    ? [...preguntasGratisES, ...preguntasPremiumExtraES]
    : preguntasGratisES;
}

// ==================== NAVEGACIÓN ====================
function goLogin() {
  window.location.href = "login.html";
}

function goRegister() {
  window.location.href = "registro.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ==================== REGISTRO ====================
function register() {
  const dniInput = document.getElementById("dni");
  const nombreInput = document.getElementById("nombre");
  const telefonoInput = document.getElementById("telefono");
  const correoInput = document.getElementById("correo");
  const ciudadInput = document.getElementById("ciudad");
  const idiomaInput = document.getElementById("idioma");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const dni = dniInput.value.trim();
  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();
  const correo = correoInput.value.trim();
  const ciudad = ciudadInput.value.trim();
  const idioma = idiomaInput.value;
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!dni || !nombre || !telefono || !correo || !ciudad || !idioma || !password || !confirmPassword) {
    alert("Completa todos los campos.");
    return;
  }

  if (!/^\d{8}$/.test(dni)) {
    alert("El DNI debe tener exactamente 8 números.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert("Ingresa un correo válido.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  if (db.getUserByDNI(dni)) {
    alert("⚠️ Este DNI ya está registrado. Intenta iniciar sesión.");
    return;
  }

  db.createUser({
    dni, nombre, telefono, correo, ciudad, idioma, password
  });

  alert("Cuenta creada correctamente.");
  window.location.href = "login.html";
}

// ==================== LOGIN ====================
function login() {
  const userEl = document.getElementById("loginUser") || document.getElementById("inputUser");
  const passEl = document.getElementById("loginPass") || document.getElementById("inputPass");

  const userInput = userEl.value.trim();
  const pass = passEl.value.trim();

  if (!userInput || !pass) {
    alert("Ingresa tu usuario y contraseña.");
    return;
  }

  // Verificar admin
  const admin = db.getAdminByDNI(userInput);
  if (admin && admin.password === pass) {
    localStorage.setItem("currentUser", JSON.stringify(admin));
    if (admin.rol === "admin") {
      window.location.href = "gerente.html"; // Admin va a gerente.html
    } else if (admin.rol === "gerente") {
      window.location.href = "gerente.html";
    }
    return;
  }

  // Verificar usuario
  const user = db.getUserByDNI(userInput);
  if (user && user.password === pass) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "panel.html";
    return;
  }

  alert("Usuario o contraseña incorrectos.");
}

// ==================== TESTS ====================
function obtenerTestsDisponibles() {
  return db.getAllCustomTests().filter(t => t.activo);
}

function startTest(tipo) {
  tipoTestActual = tipo;
  testActualSeleccionado = tipo === "premium" ? "premium_default" : "free_default";
  preguntasActuales = obtenerPreguntas(tipo === "premium" ? "premium" : "gratis");

  document.querySelector(".plans")?.classList.add("hidden");
  document.getElementById("adminTestsSection")?.classList.add("hidden");
  document.getElementById("pagoBox")?.classList.add("hidden");
  document.getElementById("resultado")?.classList.add("hidden");
  document.getElementById("testBox")?.classList.remove("hidden");
  document.getElementById("testTitle").innerText = tipo === "premium" ? "Test Premium S/ 35.00" : "Test Gratuito";

  renderPreguntas();
  window.scrollTo({ top: document.getElementById("testBox").offsetTop - 20, behavior: "smooth" });
}

function mostrarTestsDisponibles() {
  const tests = obtenerTestsDisponibles();
  const testsContainer = document.getElementById("testsDisponibles");
  const adminSection = document.getElementById("adminTestsSection");
  if (!testsContainer || !adminSection) return;

  if (tests.length === 0) {
    adminSection.classList.add("hidden");
    testsContainer.innerHTML = "";
    return;
  }

  adminSection.classList.remove("hidden");
  testsContainer.innerHTML = tests.map(test => `
    <article class="plan-card floating">
      <div class="card-content">
        <h3>${test.nombre}</h3>
        <p>${test.descripcion}</p>
        <p class="highlight">✓ ${test.preguntas.length} preguntas</p>
        <p class="highlight">✓ ${test.tipo === "free" ? "Gratuito" : `S/ ${test.precio}`}</p>
        <button onclick="iniciarTest('${test.id}', '${test.tipo}')">
          Realizar test
        </button>
      </div>
    </article>
  `).join("");
}

function iniciarTest(testID, tipo, pagoConfirmado = false) {
  const test = db.getTestByID(testID);

  if (tipo === "paid" && !pagoConfirmado) {
    mostrarPago(testID);
    return;
  }

  if (test) {
    preguntasActuales = test.preguntas;
    document.getElementById("testTitle").innerText = test.nombre;
  } else {
    preguntasActuales = obtenerPreguntas(tipo === "premium" ? "premium" : "gratis");
    document.getElementById("testTitle").innerText = tipo === "premium" ? "Test Premium S/ 35.00" : "Test Gratuito";
  }

  testActualSeleccionado = testID;
  tipoTestActual = tipo;

  document.querySelector(".plans")?.classList.add("hidden");
  document.getElementById("adminTestsSection")?.classList.add("hidden");
  document.getElementById("pagoBox")?.classList.add("hidden");
  document.getElementById("resultado")?.classList.add("hidden");
  document.getElementById("testBox")?.classList.remove("hidden");

  renderPreguntas();
  window.scrollTo({ top: document.getElementById("testBox").offsetTop - 20, behavior: "smooth" });
}

function renderPreguntas() {
  if (!preguntasActuales || preguntasActuales.length === 0) {
    document.getElementById("questions").innerHTML = "<p>No hay preguntas disponibles.</p>";
    return;
  }

  let html = "";
  preguntasActuales.forEach((pregunta, index) => {
    html += `
      <div class="question">
        <p>${index + 1}. ${pregunta.texto || pregunta}</p>
        ${Array.isArray(pregunta.opciones) ? pregunta.opciones.map(opcion => `
          <label class="option-row">
            <input type="radio" name="pregunta${index}" value="${opcion.area || opcion.categoria || opcion}">
            <span>${opcion.texto || opcion}</span>
          </label>
        `).join("") : ""}
      </div>
    `;
  });

  document.getElementById("questions").innerHTML = html;
}

function mostrarPago(testID = "premium_default") {
  document.getElementById("pagoBox").classList.remove("hidden");
  document.querySelector(".plans")?.classList.add("hidden");
  document.getElementById("adminTestsSection")?.classList.add("hidden");

  const metodosContainer = document.getElementById("metodosContainer");
  metodosContainer.innerHTML = `
    <div class="metodo-pago" onclick="seleccionarMetodo(this, 'plin', '${testID}')" style="cursor: pointer; padding: 20px; border: 2px solid #00d4ff; border-radius: 10px; text-align: center; background: rgba(0, 212, 255, 0.05); transition: all 0.3s;">
      <div style="font-size: 48px; margin-bottom: 10px;">📱</div>
      <h4 style="color: #000; margin: 10px 0;">Plin</h4>
      <p style="color: #666;">Billetera digital</p>
    </div>
    <div class="metodo-pago" onclick="seleccionarMetodo(this, 'yape', '${testID}')" style="cursor: pointer; padding: 20px; border: 2px solid #00d4ff; border-radius: 10px; text-align: center; background: rgba(0, 212, 255, 0.05); transition: all 0.3s;">
      <div style="font-size: 48px; margin-bottom: 10px;">📱</div>
      <h4 style="color: #000; margin: 10px 0;">Yape</h4>
      <p style="color: #666;">Billetera digital</p>
    </div>
    <div class="metodo-pago" onclick="seleccionarMetodo(this, 'transferencia', '${testID}')" style="cursor: pointer; padding: 20px; border: 2px solid #00d4ff; border-radius: 10px; text-align: center; background: rgba(0, 212, 255, 0.05); transition: all 0.3s;">
      <div style="font-size: 48px; margin-bottom: 10px;">🏦</div>
      <h4 style="color: #000; margin: 10px 0;">Transferencia</h4>
      <p style="color: #666;">BN / BCP</p>
    </div>
    <div class="metodo-pago" onclick="seleccionarMetodo(this, 'tarjeta', '${testID}')" style="cursor: pointer; padding: 20px; border: 2px solid #00d4ff; border-radius: 10px; text-align: center; background: rgba(0, 212, 255, 0.05); transition: all 0.3s;">
      <div style="font-size: 48px; margin-bottom: 10px;">💳</div>
      <h4 style="color: #000; margin: 10px 0;">Tarjeta</h4>
      <p style="color: #666;">Visa / Mastercard</p>
    </div>
  `;
}

function seleccionarMetodo(element, metodo, testID) {
  document.querySelectorAll(".metodo-pago").forEach(el => {
    el.classList.remove("selected");
    el.style.borderColor = "#00d4ff";
    el.style.background = "rgba(0, 212, 255, 0.05)";
  });
  element.classList.add("selected");
  element.style.borderColor = "#00ff00";
  element.style.background = "rgba(0, 255, 0, 0.1)";

  const formaPago = document.getElementById("formaPago");
  const btnConfirmar = document.getElementById("btnConfirmarPago");

  formaPago.classList.remove("hidden");
  btnConfirmar.classList.remove("hidden");
  btnConfirmar.setAttribute("data-testid", testID);
  btnConfirmar.setAttribute("data-method", metodo);

  let html = "";
  if (metodo === "plin" || metodo === "yape") {
    html = `
      <h4 style="color: #000;">Código ${metodo.toUpperCase()}</h4>
      <p style="color: #666;">Escanea el código QR o ingresa el número de operación:</p>
      <div class="qr-container" style="text-align: center; margin: 20px 0;">
        <img src="assets/pago.jpeg" alt="QR ${metodo}" class="qr-image" style="max-width: 200px; border-radius: 8px;">
      </div>
      <input type="text" placeholder="Número de operación" id="numOperacion" style="width: 100%; padding: 10px; border: 1px solid #00d4ff; border-radius: 5px; color: #000; background: #fff;">
    `;
  } else if (metodo === "transferencia") {
    html = `
      <h4 style="color: #000;">Transferencia Bancaria</h4>
      <div style="margin: 15px 0;">
        <label style="display: block; margin: 10px 0; color: #000 !important;">
          <input type="radio" name="banco" value="bn" onchange="mostrarCuentaBanco(this.value)"> 
          <span style="color: #000 !important; font-weight: normal;">Banco de la Nación</span>
        </label>
        <label style="display: block; margin: 10px 0; color: #000 !important;">
          <input type="radio" name="banco" value="bcp" onchange="mostrarCuentaBanco(this.value)"> 
          <span style="color: #000 !important; font-weight: normal;">BCP</span>
        </label>
      </div>
      <div id="cuentaBanco" style="margin-top: 15px;"></div>
    `;
  } else if (metodo === "tarjeta") {
    html = `
      <h4 style="color: #000;">Datos de la Tarjeta</h4>
      <input type="text" placeholder="Número de tarjeta (16 dígitos)" id="numTarjeta" maxlength="16" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #00d4ff; border-radius: 5px; color: #000; background: #fff;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
        <input type="text" placeholder="MM/YY" id="vencimiento" maxlength="5" style="padding: 10px; border: 1px solid #00d4ff; border-radius: 5px; color: #000; background: #fff;">
        <input type="text" placeholder="CVV" id="cvv" maxlength="3" style="padding: 10px; border: 1px solid #00d4ff; border-radius: 5px; color: #000; background: #fff;">
      </div>
      <input type="text" placeholder="Nombre en la tarjeta" id="nombreTarjeta" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #00d4ff; border-radius: 5px; color: #000; background: #fff;">
    `;
  }

  formaPago.innerHTML = html;
}

function mostrarCuentaBanco(banco) {
  const html = banco === "bn"
    ? `<div class="cuenta-info" style="background: rgba(0, 212, 255, 0.1); padding: 15px; border: 2px solid #00d4ff; border-radius: 8px; color: #000;">
         <p><strong>Banco de la Nación</strong></p>
         <p>Número de Cuenta: 00-0000-000000-0</p>
         <p>Titular: QYVARA SAC</p>
       </div>`
    : `<div class="cuenta-info" style="background: rgba(0, 212, 255, 0.1); padding: 15px; border: 2px solid #00d4ff; border-radius: 8px; color: #000;">
         <p><strong>BCP</strong></p>
         <p>Número de Cuenta: 00-000-000000-0-00</p>
         <p>Titular: QYVARA SAC</p>
       </div>`;
  document.getElementById("cuentaBanco").innerHTML = html;
}

function confirmarPago() {
  const testID = document.getElementById("btnConfirmarPago").getAttribute("data-testid");
  const method = document.getElementById("btnConfirmarPago").getAttribute("data-method");
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  if (!method) {
    alert("Selecciona un método de pago antes de continuar.");
    return;
  }

  const detallesPago = {
    operacion: document.getElementById("numOperacion")?.value || null,
    banco: document.querySelector('input[name="banco"]:checked')?.value || null,
    tarjeta: document.getElementById("numTarjeta")?.value ? "**** **** **** " + document.getElementById("numTarjeta").value.slice(-4) : null
  };

  ultimoMetodoPago = method;
  ultimoPagoDetalles = detallesPago;

  const precioTest = db.getTestByID(testID)?.precio || 35;

  db.recordPayment({
    userDNI: currentUser.dni || "invitado",
    userName: currentUser.nombre || "Invitado",
    testNombre: testID === "premium_default" ? "Test Premium" : (db.getTestByID(testID)?.nombre || "Test Premium"),
    monto: precioTest,
    metodoPago: method,
    estado: "completado",
    detalles: detallesPago
  });

  alert("Pago confirmado. Iniciando test...");
  document.getElementById("pagoBox").classList.add("hidden");
  iniciarTest(testID, "paid", true);
}

function calcularResultado() {
  if (!preguntasActuales || preguntasActuales.length === 0) {
    alert("Error: No hay preguntas cargadas");
    return;
  }

  let puntajes = {};
  let maxScore = 0;

  preguntasActuales.forEach((pregunta, index) => {
    const seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
    if (!seleccionada) {
      alert("Responde todas las preguntas.");
      throw new Error("Incomplete answers");
    }

    const area = seleccionada.value;
    puntajes[area] = (puntajes[area] || 0) + 1;
    maxScore++;
  });

  const ordenado = Object.entries(puntajes).sort((a, b) => b[1] - a[1]);
  const areaGanadora = ordenado[0][0];
  const porcentaje = Math.round((ordenado[0][1] / maxScore) * 100);
  const recomendaciones = carreras[areaGanadora] || [];

  // Guardar en historial
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    db.addTestToHistory(currentUser.dni, {
      testID: testActualSeleccionado,
      testNombre: document.getElementById("testTitle").innerText,
      testTipo: tipoTestActual,
      resultado: areaGanadora,
      area: areaGanadora,
      carrera: recomendaciones[0],
      porcentaje: porcentaje,
      metodoPago: ultimoMetodoPago,
      metodoPagoDetalles: ultimoPagoDetalles
    });
  }

  let barras = "";
  ordenado.forEach(([area, puntaje]) => {
    const porcentajeArea = Math.round((puntaje / maxScore) * 100);
    barras += `
      <div class="score-bar" style="margin: 15px 0;">
        <strong style="color: #000; display: block; margin-bottom: 5px;">${area}: ${porcentajeArea}%</strong>
        <div class="bar-bg" style="background: #ddd; height: 30px; border-radius: 5px; overflow: hidden;">
          <div class="bar-fill" style="background: linear-gradient(90deg, #00d4ff, #00ff00); width:${porcentajeArea}%; height: 100%;"></div>
        </div>
      </div>
    `;
  });

  const resultDetailsHTML = `
    <div style="background: #fff; padding: 20px; border-radius: 10px; color: #000;">
      <p style="font-size: 18px;"><strong>Área dominante:</strong> <span style="color: #00d4ff; font-weight: bold;">${areaGanadora}</span></p>
      <p style="font-size: 18px;"><strong>Compatibilidad:</strong> <span style="color: #00ff00; font-weight: bold;">${porcentaje}%</span></p>
      <hr style="border: none; border-top: 2px solid #00d4ff; margin: 20px 0;">
      <h4 style="color: #000; margin-top: 20px;">Puntajes por área</h4>
      ${barras}
      <hr style="border: none; border-top: 2px solid #00d4ff; margin: 20px 0;">
      <h4 style="color: #000; margin-top: 20px;">Carreras recomendadas</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
        ${recomendaciones.map(c => `<div class="career" style="background: rgba(0, 212, 255, 0.1); padding: 15px; border-left: 4px solid #00d4ff; color: #000;"><strong>${c}</strong></div>`).join("")}
      </div>
    </div>
  `;

  const areaEmojis = {
    "Tecnología": "💻",
    "Salud": "🏥",
    "Negocios": "📊",
    "Arte y Comunicación": "🎨"
  };

  const areaColors = {
    "Tecnología": "linear-gradient(135deg, #1a5f4a, #0d3326)",
    "Salud": "linear-gradient(135deg, #742484, #9b4db5)",
    "Negocios": "linear-gradient(135deg, #2a5a8a, #1a3a5a)",
    "Arte y Comunicación": "linear-gradient(135deg, #8a4a2a, #5a2a1a)"
  };

  document.getElementById("resultTitle").innerText = "Resultado Vocacional";
  document.getElementById("resultDetails").innerHTML = resultDetailsHTML;

  // Replace image with emoji div
  const resultImgEl = document.getElementById("resultImg");
  const emojiDiv = document.createElement('div');
  emojiDiv.className = 'result-img floating-img';
  emojiDiv.style.cssText = `display:flex;align-items:center;justify-content:center;font-size:100px;background:${areaColors[areaGanadora] || 'linear-gradient(135deg, #4a2a8a, #2a1a5a)'};min-height:200px;border-radius:16px;`;
  emojiDiv.textContent = areaEmojis[areaGanadora] || '🎯';
  resultImgEl.parentNode.replaceChild(emojiDiv, resultImgEl);

  document.getElementById("testBox").classList.add("hidden");
  document.getElementById("resultado").classList.remove("hidden");

  window.scrollTo({
    top: document.getElementById("resultado").offsetTop - 20,
    behavior: "smooth"
  });
}

function volverPanelTest() {
  document.querySelector(".plans")?.classList.remove("hidden");
  document.getElementById("adminTestsSection")?.classList.remove("hidden");
  document.getElementById("pagoBox")?.classList.add("hidden");
  document.getElementById("resultado")?.classList.add("hidden");
  document.getElementById("testBox")?.classList.add("hidden");
}

// ==================== ADMINISTRADOR ====================
function mostrarTab(tabName) {
  console.log("Mostrando tab:", tabName);

  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));

  const tabElement = document.getElementById(`tab-${tabName}`);
  if (!tabElement) {
    console.error("No se encontró el elemento tab-" + tabName);
    return;
  }
  tabElement.classList.remove("hidden");
  
  // Marcar botón como activo
  if (event && event.target) {
    event.target.classList.add("active");
  }

  // Cargar datos específicos de cada tab cuando se selecciona
  console.log("Cargando datos para tab:", tabName);
  
  // Esperar un momento para asegurar que extensions.js haya cargado
  setTimeout(() => {
    switch(tabName) {
      case 'usuarios':
        if (typeof cargarListaUsuarios === 'function') {
          console.log("Llamando cargarListaUsuarios...");
          cargarListaUsuarios();
        } else {
          console.error("cargarListaUsuarios no está disponible");
        }
        if (typeof cargarEstadisticasAdmin === 'function') cargarEstadisticasAdmin();
        break;
      case 'pagos':
        if (typeof cargarHistorialPagos === 'function') {
          console.log("Llamando cargarHistorialPagos...");
          cargarHistorialPagos();
        } else {
          console.error("cargarHistorialPagos no está disponible");
        }
        break;
      case 'admins':
        if (typeof cargarListaAdmins === 'function') {
          console.log("Llamando cargarListaAdmins...");
          cargarListaAdmins();
        } else {
          console.error("cargarListaAdmins no está disponible");
        }
        break;
      case 'perfil':
        if (typeof cargarPerfilAdmin === 'function') {
          console.log("Llamando cargarPerfilAdmin...");
          cargarPerfilAdmin();
        } else {
          console.error("cargarPerfilAdmin no está disponible");
        }
        break;
      case 'tests':
        if (typeof cargarTestsCreados === 'function') {
          console.log("Llamando cargarTestsCreados...");
          cargarTestsCreados();
        } else {
          console.error("cargarTestsCreados no está disponible");
        }
        break;
    }
  }, 100);
}

function crearNuevoAdmin(event) {
  event.preventDefault();

  const nombres = document.getElementById("adminNombres").value.trim();
  const apellidos = document.getElementById("adminApellidos").value.trim();
  const dni = document.getElementById("adminDNI").value.trim();
  const correo = document.getElementById("adminCorreo").value.trim();
  const rol = document.getElementById("adminRole").value;

  if (!nombres || !apellidos || !dni || !correo) {
    alert("Completa todos los campos.");
    return;
  }

  if (db.getAdminByDNI(dni)) {
    alert("Este DNI ya está registrado.");
    return;
  }

  const nuevoAdmin = db.createAdmin({
    dni, nombre: nombres, apellidos, correo, rol
  });

  alert(`✓ Administrador creado. Contraseña: ${dni}`);
  
  event.target.reset();
  cargarListaAdmins();
}

function cargarListaAdmins() {
  const adminsList = document.getElementById("adminsList");
  const admins = db.getAllAdmins().filter(a => a.rol === "gerente" || a.rol === "admin");

  const html = admins.map(admin => `
    <div style="background: rgba(255,255,255,0.05); border: 1px solid #00d4ff; border-radius: 8px; padding: 15px; margin: 10px 0;">
      <p><strong>${admin.nombre} ${admin.apellidos}</strong></p>
      <p>DNI: ${admin.dni}</p>
      <p>Rol: ${admin.rol}</p>
      <p>Correo: ${admin.correo}</p>
    </div>
  `).join("");

  adminsList.innerHTML = html || "<p>Sin administradores registrados.</p>";
}

function crearNuevoTest(event) {
  event.preventDefault();

  const nombre = document.getElementById("testNombre").value.trim();
  const descripcion = document.getElementById("testDescripcion").value.trim();
  const tipo = document.getElementById("testTipo").value;
  const precio = parseFloat(document.getElementById("testPrecio").value) || 0;

  if (!nombre || !descripcion) {
    alert("Completa el nombre y descripción.");
    return;
  }

  const preguntas = [];
  document.querySelectorAll(".question-item").forEach(item => {
    const pregunta = item.querySelector(".test-question").value.trim();
    const opciones = Array.from(item.querySelectorAll(".test-option")).map(opt => opt.value.trim());

    if (pregunta && opciones.every(o => o)) {
      preguntas.push({ texto: pregunta, opciones: opciones });
    }
  });

  if (preguntas.length === 0) {
    alert("Agrega al menos una pregunta completa.");
    return;
  }

  const currentAdmin = JSON.parse(localStorage.getItem("currentUser"));
  const nuevoTest = db.createCustomTest({
    nombre, descripcion, tipo, precio, preguntas
  }, currentAdmin.id);

  alert("✓ Test creado exitosamente.");
  event.target.reset();
  cargarTestsCreados();
  mostrarTestsDisponibles();
}

function agregarPreguntaTest() {
  const container = document.getElementById("questionsContainer");
  const index = container.children.length + 1;

  const html = `
    <div class="question-item">
      <input type="text" placeholder="Pregunta ${index}" class="test-question" required>
      <input type="text" placeholder="Opción 1" class="test-option" required>
      <input type="text" placeholder="Opción 2" class="test-option" required>
      <input type="text" placeholder="Opción 3" class="test-option" required>
      <input type="text" placeholder="Opción 4" class="test-option" required>
      <button type="button" onclick="this.parentElement.remove()">Eliminar</button>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", html);
}

function cargarTestsCreados() {
  const testsList = document.getElementById("testsList");
  const tests = db.getAllCustomTests();

  const html = tests.map(test => `
    <div style="background: rgba(255,255,255,0.05); border: 1px solid #00bde3; border-radius: 8px; padding: 15px; margin: 10px 0;">
      <h4>${test.nombre}</h4>
      <p>${test.descripcion}</p>
      <p>Tipo: ${test.tipo === "free" ? "Gratuito" : `Pago - S/ ${test.precio}`}</p>
      <p>Preguntas: ${test.preguntas.length}</p>
    </div>
  `).join("");

  testsList.innerHTML = html || "<p>Sin tests creados.</p>";
}

function cargarUsuarios() {
  const usuariosDiv = document.getElementById("usuarios");
  const users = db.getAllUsers();

  const html = users.map(user => `
    <div style="background: rgba(255,255,255,0.05); border: 1px solid #00d4ff; border-radius: 8px; padding: 15px; margin: 10px 0;">
      <p><strong>${user.nombre}</strong></p>
      <p>DNI: ${user.dni}</p>
      <p>Correo: ${user.correo}</p>
      <p>Plan: ${user.plan}</p>
    </div>
  `).join("");

  usuariosDiv.innerHTML = html || "<p>Sin usuarios registrados.</p>";

  const stats = db.getUserStats();
  document.getElementById("totalUsers").innerText = stats.total;
  document.getElementById("totalPremium").innerText = stats.premium;
  document.getElementById("totalGratis").innerText = stats.gratis;
}

function cargarHistorialPagos() {
  const pagosDiv = document.getElementById("pagosContainer");
  const pagos = db.getAllPaymentHistory();

  const html = pagos.map(pago => {
    const fecha = new Date(pago.timestamp);
    const fechaFormato = fecha.toLocaleDateString();
    const horaFormato = fecha.toLocaleTimeString();
    return `
    <div style="background: linear-gradient(135deg, rgba(245, 185, 66, 0.1), rgba(0, 212, 255, 0.1)); border: 2px solid #f5b942; border-radius: 12px; padding: 20px; margin: 15px 0; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); color: #000; animation: floatPago 3s ease-in-out infinite;">
      <p style="margin: 8px 0;"><strong>👤 Usuario:</strong> ${pago.userName}</p>
      <p style="margin: 8px 0;"><strong>📝 Test:</strong> ${pago.testNombre}</p>
      <p style="margin: 8px 0;"><strong>💰 Monto:</strong> <span style="color: #f5b942; font-weight: bold;">S/ ${pago.monto.toFixed(2)}</span></p>
      <p style="margin: 8px 0;"><strong>💳 Método:</strong> ${pago.metodoPago}</p>
      <p style="margin: 8px 0;"><strong>📅 Fecha:</strong> ${fechaFormato}</p>
      <p style="margin: 8px 0;"><strong>⏰ Hora:</strong> ${horaFormato}</p>
      <p style="margin: 8px 0; color: #00ff00;"><strong>✓ Estado:</strong> ${pago.estado}</p>
    </div>
  `;
  }).join("");

  pagosDiv.innerHTML = html || "<p style='color: #999;'>Sin pagos registrados.</p>";
}

// Añadir animación CSS para pagos flotantes
const style = document.createElement('style');
style.textContent = `
  @keyframes floatPago {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;
if (document.head) {
  document.head.appendChild(style);
}

function cargarPerfilAdmin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  document.getElementById("perfilNombreInput").value = currentUser.nombre || "";
  document.getElementById("perfilCorreoInput").value = currentUser.correo || "";
  document.getElementById("perfilTelefonoInput").value = currentUser.telefono || "";
  document.getElementById("perfilRolInput").value = currentUser.rol || "";
}

function guardarPerfilAdmin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  const updatedData = {
    nombre: document.getElementById("perfilNombreInput").value,
    correo: document.getElementById("perfilCorreoInput").value,
    telefono: document.getElementById("perfilTelefonoInput").value
  };

  db.updateAdmin(currentUser.id, updatedData);
  localStorage.setItem("currentUser", JSON.stringify({...currentUser, ...updatedData}));

  alert("✓ Perfil actualizado.");
}

// ==================== HISTORIAL FLOTANTE ====================
function mostrarHistorialFlotante() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.rol) return; // Solo para usuarios normales

  const historial = db.getUserTestHistory(currentUser.dni);

  let modalHTML = `
    <div class="historial-modal">
      <button class="btn-cerrar-historial" onclick="cerrarHistorialFlotante()">✕</button>
      <h3>Historial de Tests</h3>
  `;

  if (historial.length === 0) {
    modalHTML += `<p style="color: #00d4ff;">Aún no has realizado tests.</p>`;
  } else {
    historial.forEach(item => {
      const iconTipo = item.testTipo === "free" ? "✓" : "💳";
      modalHTML += `
        <div class="historial-item test-${item.testTipo}">
          <strong>${iconTipo} ${item.testNombre}</strong>
          <p>Área: ${item.area}</p>
          <p>Carrera: ${item.carrera}</p>
          <p>Compatibilidad: ${item.porcentaje}%</p>
          <p style="font-size: 11px; color: #999;">
            ${new Date(item.completedAt).toLocaleDateString()}
          </p>
        </div>
      `;
    });
  }

  modalHTML += `</div>`;

  // Eliminar modal anterior si existe
  const existingModal = document.querySelector(".historial-modal");
  if (existingModal) existingModal.remove();

  // Agregar nuevo modal
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function cerrarHistorialFlotante() {
  const modal = document.querySelector(".historial-modal");
  if (modal) {
    modal.style.animation = "slideOutHistorial 0.3s ease-in-out forwards";
    setTimeout(() => modal.remove(), 300);
  }
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener("DOMContentLoaded", function() {
  aplicarIdioma();

  // Panel de usuario
  const panelBtn = document.getElementById("btnGratis");
  if (panelBtn) {
    mostrarTestsDisponibles();
    
    // Agregar botón para historial si no existe
    const header = document.querySelector(".topbar");
    if (header && !header.querySelector("#btnHistorial") && !header.querySelector("#btnVerHistorial")) {
      const btnHistorial = document.createElement("button");
      btnHistorial.id = "btnVerHistorial";
      btnHistorial.className = "btn-small";
      btnHistorial.textContent = "Ver historial";
      btnHistorial.onclick = mostrarHistorialFlotante;
      header.querySelector(".header-right").appendChild(btnHistorial);
    }
  }

  // Panel de admin
  if (document.getElementById("tab-usuarios")) {
    cargarUsuarios();
    cargarHistorialPagos();
    cargarListaAdmins();
    cargarTestsCreados();
    cargarPerfilAdmin();
  }
});
