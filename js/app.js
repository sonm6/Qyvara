let tipoTestActual = "";
let preguntasActuales = [];

/* =========================
   TRADUCCIONES
========================= */
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
    descGratis: "Orientación inicial para descubrir tus intereses, habilidades y posibles áreas profesionales.",
    btnGratis: "Realizar test gratuito",
    tituloPremium: "Test Premium S/ 35.00",
    descPremium: "Evaluación avanzada con informe personalizado, acompañamiento profesional y recomendaciones más precisas.",
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
    labelUsers: "Usuarios",
    labelPremium: "Premium",
    labelGratis: "Gratis"
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
    tituloGratis: "Mana qullqiyuq Test",
    descGratis: "Qallariy yanapay, munayniykikunata, atipayniykikunata hinaspa llamkay ñanniykikunata riqsichinapaq.",
    btnGratis: "Mana qullqiyuq test ruway",
    tituloPremium: "Premium Test S/ 35.00",
    descPremium: "Aswan hunt'a evaluación, sapanchasqa willakuy, profesional yanapay hinaspa aswan allin yuyaychaykuna.",
    btnPremium: "Premium test ruway",

    tituloPago: "Qullqi churana ñankuna",
    descPago: "Akllay qullqi churana ñankita:",
    metoPlin: "Plin",
    metoYape: "Yape",
    metoTransferencia: "Transferencia",
    metoTarjeta: "Tarjeta",
    btnConfirmarPago: "Qullqi churayta takyachiy hinaspa qatipay",
    btnResultado: "Rikuy resultado",

    tituloHistorial: "Test ruwasqakuna historial",

    tituloAdmin: "Administrador Panel",
    usuariosTitulo: "Qillqasqa usuarios",
    tituloPagos: "Qullqi churakuna willakuy",
    tituloAdmins: "Administrador kachay",
    crearAdminTitulo: "Musuq Administrador ruway",
    passAutoTitulo: "Default yaykuna simi: Administrador DNI",
    btnCrearAdmin: "Administrador ruway",
    listaAdminsTitulo: "Administrador Liwi",
    miPerfilTitulo: "Naypa Perfil",
    labelDatos: "Administrador Rimaykunata",
    btnSubirFoto: "Foto ama kachay",
    gestionarTestsTitulo: "Test Personalizadu kachay",
    crearTestTitulo: "Musuq Test ruway",
    preguntasTitulo: "Test rimaykunata",
    btnAgregarPregunta: "+ Rimay ychayachiy",
    btnGuardarTest: "Test chaskiy",
    testsCreadosTitulo: "Tests Disponible",
    labelUsers: "Usuarios",
    labelPremium: "Premium",
    labelGratis: "Gratis"
  }
};

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

  setText("sloganLogin", t.sloganLogin);
  setText("tituloLogin", t.tituloLogin);
  setPlaceholder("inputUser", t.inputUser);
  setPlaceholder("inputPass", t.inputPass);
  setPlaceholder("loginUser", t.inputUser);
  setPlaceholder("loginPass", t.inputPass);
  setText("btnLogin", t.btnLogin);
  setText("linkRegistro", t.linkRegistro);

  setText("registroTitulo", t.registroTitulo);
  setPlaceholder("dni", t.dni);
  setPlaceholder("nombre", t.nombre);
  setPlaceholder("telefono", t.telefono);
  setPlaceholder("correo", t.correo);
  setText("optDepartamento", t.optDepartamento);
  setText("optIdioma", t.optIdioma);
  setPlaceholder("password", t.password);
  setPlaceholder("confirmPassword", t.confirmPassword);
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
  setText("pago1", t.pago1);
  setText("pago2", t.pago2);
  setText("descPago2", t.descPago2);
  setText("precio", t.precio);
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
  setText("labelUsers", t.labelUsers);
  setText("labelPremium", t.labelPremium);
  setText("labelGratis", t.labelGratis);
}

/* =========================
   PREGUNTAS
========================= */
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
    texto: "¿Qué frase te representa mejor?",
    opciones: [
      { texto: "Me gusta analizar y programar", area: "Tecnología" },
      { texto: "Me gusta cuidar y escuchar", area: "Salud" },
      { texto: "Me gusta liderar y planificar", area: "Negocios" },
      { texto: "Me gusta crear y expresar ideas", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Dónde te gustaría trabajar?",
    opciones: [
      { texto: "Empresa tecnológica", area: "Tecnología" },
      { texto: "Hospital o centro de salud", area: "Salud" },
      { texto: "Empresa, banco o emprendimiento", area: "Negocios" },
      { texto: "Agencia creativa o medio de comunicación", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué actividad disfrutas más?",
    opciones: [
      { texto: "Investigar cómo funciona una app", area: "Tecnología" },
      { texto: "Apoyar a alguien con un problema personal", area: "Salud" },
      { texto: "Organizar dinero, ventas o recursos", area: "Negocios" },
      { texto: "Hacer afiches, videos o publicaciones", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de reto prefieres?",
    opciones: [
      { texto: "Lógico y técnico", area: "Tecnología" },
      { texto: "Humano y social", area: "Salud" },
      { texto: "Comercial y administrativo", area: "Negocios" },
      { texto: "Visual y creativo", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué te gustaría aprender?",
    opciones: [
      { texto: "Programación o ciberseguridad", area: "Tecnología" },
      { texto: "Primeros auxilios o psicología", area: "Salud" },
      { texto: "Marketing, finanzas o ventas", area: "Negocios" },
      { texto: "Diseño, fotografía o producción audiovisual", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Cómo prefieres tomar decisiones?",
    opciones: [
      { texto: "Con datos y lógica", area: "Tecnología" },
      { texto: "Pensando en el bienestar de las personas", area: "Salud" },
      { texto: "Evaluando costos y beneficios", area: "Negocios" },
      { texto: "Usando creatividad e intuición", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué actividad escolar te motiva más?",
    opciones: [
      { texto: "Usar computadoras o resolver ejercicios", area: "Tecnología" },
      { texto: "Trabajos sobre cuerpo humano o salud", area: "Salud" },
      { texto: "Exposiciones sobre empresas o proyectos", area: "Negocios" },
      { texto: "Dibujar, editar o comunicar", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué tipo de proyecto harías?",
    opciones: [
      { texto: "Una aplicación web o móvil", area: "Tecnología" },
      { texto: "Una campaña de salud", area: "Salud" },
      { texto: "Un negocio propio", area: "Negocios" },
      { texto: "Una campaña publicitaria", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué habilidad quieres fortalecer?",
    opciones: [
      { texto: "Análisis y solución técnica", area: "Tecnología" },
      { texto: "Empatía y orientación", area: "Salud" },
      { texto: "Liderazgo y negociación", area: "Negocios" },
      { texto: "Creatividad y comunicación", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué resultado te gustaría lograr?",
    opciones: [
      { texto: "Crear sistemas útiles", area: "Tecnología" },
      { texto: "Ayudar a mejorar vidas", area: "Salud" },
      { texto: "Hacer crecer una organización", area: "Negocios" },
      { texto: "Impactar con mensajes visuales", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué idioma es importante para tu carrera?",
    opciones: [
      { texto: "Programación y lenguaje técnico", area: "Tecnología" },
      { texto: "Comunicación empática", area: "Salud" },
      { texto: "Lenguaje de negocios", area: "Negocios" },
      { texto: "Lenguaje visual y creativo", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué desafío te motiva más en tu formación?",
    opciones: [
      { texto: "Aprender nuevas tecnologías", area: "Tecnología" },
      { texto: "Mejorar habilidades de comunicación", area: "Salud" },
      { texto: "Desarrollar competencias empresariales", area: "Negocios" },
      { texto: "Expresar ideas con originalidad", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Cómo ves tu orientación vocacional?",
    opciones: [
      { texto: "Técnica y especializada", area: "Tecnología" },
      { texto: "Centrada en el servicio", area: "Salud" },
      { texto: "Orientada al crecimiento empresarial", area: "Negocios" },
      { texto: "Enfocada en la expresión artística", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Qué carrera te atrae como orientación vocacional?",
    opciones: [
      { texto: "Ingeniería o tecnología", area: "Tecnología" },
      { texto: "Salud o ciencias sociales", area: "Salud" },
      { texto: "Administración o contabilidad", area: "Negocios" },
      { texto: "Diseño o comunicación", area: "Arte y Comunicación" }
    ]
  },
  {
    texto: "¿Con qué frecuencia utilizas estas habilidades?",
    opciones: [
      { texto: "Diariamente en tareas técnicas", area: "Tecnología" },
      { texto: "En interacción con personas", area: "Salud" },
      { texto: "En gestión y administración", area: "Negocios" },
      { texto: "En proyectos creativos", area: "Arte y Comunicación" }
    ]
  }
];

const preguntasPremiumExtraES = [
  {
    texto: "¿Qué ambiente te resulta más cómodo?",
    opciones: [
      { texto: "Laboratorio tecnológico u oficina digital", area: "Tecnología" },
      { texto: "Clínica, hospital o consultorio", area: "Salud" },
      { texto: "Área comercial o administrativa", area: "Negocios" },
      { texto: "Estudio creativo o set audiovisual", area: "Arte y Comunicación" },
      { texto: "Campo, planta productiva o laboratorio agrícola", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué actividad harías por horas sin aburrirte?",
    opciones: [
      { texto: "Probar programas y sistemas", area: "Tecnología" },
      { texto: "Escuchar y acompañar personas", area: "Salud" },
      { texto: "Planificar estrategias de venta", area: "Negocios" },
      { texto: "Diseñar contenido digital", area: "Arte y Comunicación" },
      { texto: "Observar cultivos o procesos alimentarios", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué tema te parece más útil para la sociedad?",
    opciones: [
      { texto: "Transformación digital", area: "Tecnología" },
      { texto: "Salud mental y física", area: "Salud" },
      { texto: "Emprendimiento y empleo", area: "Negocios" },
      { texto: "Comunicación responsable", area: "Arte y Comunicación" },
      { texto: "Producción sostenible", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué rol asumirías en un equipo?",
    opciones: [
      { texto: "Resolver la parte técnica", area: "Tecnología" },
      { texto: "Cuidar el bienestar del grupo", area: "Salud" },
      { texto: "Organizar tareas y recursos", area: "Negocios" },
      { texto: "Crear la imagen y presentación", area: "Arte y Comunicación" },
      { texto: "Analizar recursos naturales o producción", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué noticia te interesaría leer?",
    opciones: [
      { texto: "Avances en inteligencia artificial", area: "Tecnología" },
      { texto: "Nuevos tratamientos o salud pública", area: "Salud" },
      { texto: "Tendencias de negocios", area: "Negocios" },
      { texto: "Publicidad, redes y medios", area: "Arte y Comunicación" },
      { texto: "Innovación agrícola y ambiental", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué producto te gustaría crear?",
    opciones: [
      { texto: "Una app o plataforma", area: "Tecnología" },
      { texto: "Un programa de bienestar", area: "Salud" },
      { texto: "Un servicio rentable", area: "Negocios" },
      { texto: "Una marca o campaña visual", area: "Arte y Comunicación" },
      { texto: "Un alimento procesado o producto natural", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué tarea se te haría más fácil?",
    opciones: [
      { texto: "Analizar datos", area: "Tecnología" },
      { texto: "Orientar a una persona", area: "Salud" },
      { texto: "Administrar dinero", area: "Negocios" },
      { texto: "Diseñar una presentación", area: "Arte y Comunicación" },
      { texto: "Clasificar productos agrícolas", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué valor consideras más importante?",
    opciones: [
      { texto: "Innovación", area: "Tecnología" },
      { texto: "Servicio", area: "Salud" },
      { texto: "Responsabilidad", area: "Negocios" },
      { texto: "Expresión", area: "Arte y Comunicación" },
      { texto: "Sostenibilidad", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué tipo de práctica te gustaría hacer?",
    opciones: [
      { texto: "Desarrollo de software", area: "Tecnología" },
      { texto: "Atención a pacientes", area: "Salud" },
      { texto: "Ventas o administración", area: "Negocios" },
      { texto: "Diseño o comunicación digital", area: "Arte y Comunicación" },
      { texto: "Producción agrícola o alimentaria", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué área te genera más curiosidad?",
    opciones: [
      { texto: "Ciberseguridad y redes", area: "Tecnología" },
      { texto: "Psicología y cuidado humano", area: "Salud" },
      { texto: "Marketing y empresas", area: "Negocios" },
      { texto: "Diseño y publicidad", area: "Arte y Comunicación" },
      { texto: "Agroindustria y ambiente", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué prefieres mejorar?",
    opciones: [
      { texto: "Procesos digitales", area: "Tecnología" },
      { texto: "Atención y salud", area: "Salud" },
      { texto: "Gestión y productividad", area: "Negocios" },
      { texto: "Imagen y comunicación", area: "Arte y Comunicación" },
      { texto: "Producción y calidad alimentaria", area: "Agroindustria" }
    ]
  },
  {
    texto: "¿Qué tipo de herramienta usarías más?",
    opciones: [
      { texto: "Editor de código o base de datos", area: "Tecnología" },
      { texto: "Instrumentos clínicos", area: "Salud" },
      { texto: "CRM o sistema administrativo", area: "Negocios" },
      { texto: "Software de diseño", area: "Arte y Comunicación" },
      { texto: "Equipos de control de calidad", area: "Agroindustria" }
    ]
  }
];

const preguntasGratisQU = preguntasGratisES;
const preguntasPremiumExtraQU = preguntasPremiumExtraES;

const carreras = {
  "Tecnología": ["Ingeniería de Sistemas", "Ingeniería de Software", "Computación e Informática", "Soporte Técnico y Redes"],
  "Salud": ["Enfermería", "Psicología", "Técnica en Farmacia", "Laboratorio Clínico"],
  "Negocios": ["Administración", "Contabilidad", "Marketing", "Administración Bancaria"],
  "Arte y Comunicación": ["Diseño Gráfico", "Comunicación Audiovisual", "Publicidad", "Diseño Digital"],
  "Agroindustria": ["Ingeniería Agroindustrial", "Producción Agropecuaria", "Industrias Alimentarias", "Gestión Ambiental"]
};

const carrerasImagenes = {
  "Ingeniería de Sistemas": "assets/carrera_tech.jpg",
  "Ingeniería de Software": "assets/carrera_tech.jpg",
  "Computación e Informática": "assets/carrera_tech.jpg",
  "Soporte Técnico y Redes": "assets/carrera_tech.jpg",
  "Enfermería": "assets/carrera_salud.jpg",
  "Psicología": "assets/carrera_salud.jpg",
  "Técnica en Farmacia": "assets/carrera_salud.jpg",
  "Laboratorio Clínico": "assets/carrera_salud.jpg",
  "Administración": "assets/carrera_negocios.jpg",
  "Contabilidad": "assets/carrera_negocios.jpg",
  "Marketing": "assets/carrera_negocios.jpg",
  "Administración Bancaria": "assets/carrera_negocios.jpg",
  "Diseño Gráfico": "assets/carrera_arte.jpg",
  "Comunicación Audiovisual": "assets/carrera_arte.jpg",
  "Publicidad": "assets/carrera_arte.jpg",
  "Diseño Digital": "assets/carrera_arte.jpg",
  "Ingeniería Agroindustrial": "assets/carrera_agro.jpg",
  "Producción Agropecuaria": "assets/carrera_agro.jpg",
  "Industrias Alimentarias": "assets/carrera_agro.jpg",
  "Gestión Ambiental": "assets/carrera_agro.jpg"
};

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

/* =========================
   NAVEGACIÓN
========================= */
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

/* =========================
   REGISTRO
========================= */
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

  dniInput.style.border = "1px solid #ccd6dd";
  correoInput.style.border = "1px solid #ccd6dd";
  passwordInput.style.border = "1px solid #ccd6dd";
  confirmPasswordInput.style.border = "1px solid #ccd6dd";

  if (!dni || !nombre || !telefono || !correo || !ciudad || !idioma || !password || !confirmPassword) {
    alert("Completa todos los campos.");
    return;
  }

  if (!/^\d{8}$/.test(dni)) {
    dniInput.style.border = "2px solid red";
    alert("El DNI debe tener exactamente 8 números.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    correoInput.style.border = "2px solid red";
    alert("Ingresa un correo válido.");
    return;
  }

  if (password !== confirmPassword) {
    passwordInput.style.border = "2px solid red";
    confirmPasswordInput.style.border = "2px solid red";
    alert("Las contraseñas no coinciden.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.dni === dni)) {
    dniInput.style.border = "2px solid red";
    alert("⚠️ Este DNI ya está registrado. Intenta iniciar sesión.");
    return;
  }

  const user = {
    dni,
    nombre,
    telefono,
    correo,
    ciudad,
    idioma,
    password,
    plan: "Sin test",
    area: "Sin resultado",
    carrera: "Sin resultado",
    porcentaje: 0,
    historial: []
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  if (idioma === "Quechua") localStorage.setItem("idioma", "qu");
  if (idioma === "Español") localStorage.setItem("idioma", "es");

  alert("Cuenta creada correctamente.");
  window.location.href = "login.html";
}

/* =========================
   LOGIN
========================= */
function login() {
  const userEl = document.getElementById("loginUser") || document.getElementById("inputUser");
  const passEl = document.getElementById("loginPass") || document.getElementById("inputPass");

  const userInput = userEl.value.trim();
  const pass = passEl.value.trim();

  if (!userInput || !pass) {
    alert("Ingresa tu usuario y contraseña.");
    return;
  }

  if (userInput === "admin@qyvara.com" && pass === "admin123") {
    localStorage.setItem("currentUser", JSON.stringify({
      nombre: "Administrador",
      rol: "admin"
    }));
    window.location.href = "admin.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const found = users.find(u => u.dni === userInput && u.password === pass);

  if (!found) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(found));

  if (found.idioma === "Quechua") localStorage.setItem("idioma", "qu");
  if (found.idioma === "Español") localStorage.setItem("idioma", "es");

  window.location.href = "panel.html";
}

/* =========================
   TEST
========================= */
function mostrarPago() {
  document.getElementById("pagoBox").classList.remove("hidden");
  document.querySelector(".plans")?.classList.add("hidden");
  document.getElementById("testBox").classList.add("hidden");
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("historialBox")?.classList.add("hidden");

  const metodosContainer = document.getElementById("metodosContainer");
  metodosContainer.innerHTML = `
    <div class="metodo-pago" onclick="seleccionarMetodo('plin')">
      <div style="font-size: 32px;">📱</div>
      <h4>Plin</h4>
      <p>Billetera digital</p>
    </div>
    <div class="metodo-pago" onclick="seleccionarMetodo('yape')">
      <div style="font-size: 32px;">📱</div>
      <h4>Yape</h4>
      <p>Billetera digital</p>
    </div>
    <div class="metodo-pago" onclick="seleccionarMetodo('transferencia')">
      <div style="font-size: 32px;">🏦</div>
      <h4>Transferencia</h4>
      <p>BN / BCP</p>
    </div>
    <div class="metodo-pago" onclick="seleccionarMetodo('tarjeta')">
      <div style="font-size: 32px;">💳</div>
      <h4>Tarjeta</h4>
      <p>Visa / Mastercard</p>
    </div>
  `;

  window.scrollTo({
    top: document.getElementById("pagoBox").offsetTop - 20,
    behavior: "smooth"
  });
}

function seleccionarMetodo(metodo) {
  // Actualizar estilos
  document.querySelectorAll(".metodo-pago").forEach(el => {
    el.classList.remove("selected");
  });
  event.currentTarget.classList.add("selected");

  // Mostrar formulario correspondiente
  const formaPago = document.getElementById("formaPago");
  const btnConfirmar = document.getElementById("btnConfirmarPago");
  
  formaPago.classList.remove("hidden");
  btnConfirmar.classList.remove("hidden");

  let html = "";

  if (metodo === "plin" || metodo === "yape") {
    html = `
      <h4>Código ${metodo.toUpperCase()}</h4>
      <p>Escanea el código QR o ingresa el número de operación:</p>
      <div class="qr-container">
        <img src="assets/pago.jpeg" alt="QR" class="qr-image">
      </div>
      <input type="text" placeholder="Número de operación (opcional)" id="numOperacion">
      <p class="muted-dark">Después de pagar, ingresa tu número de operación para confirmación.</p>
    `;
  } else if (metodo === "transferencia") {
    html = `
      <h4 style="color: #000;">Transferencia Bancaria</h4>
      <label style="display: block; margin: 10px 0; color: #000 !important;">
        <input type="radio" name="banco" value="bn" onchange="mostrarCuentaBanco(this.value)"> 
        <span style="color: #000 !important; font-weight: normal;">BN (Banco de la Nación)</span>
      </label>
      <label style="display: block; margin: 10px 0; color: #000 !important;">
        <input type="radio" name="banco" value="bcp" onchange="mostrarCuentaBanco(this.value)"> 
        <span style="color: #000 !important; font-weight: normal;">BCP (Banco de Crédito)</span>
      </label>
      <div id="cuentaBanco"></div>
      <input type="text" placeholder="Número de operación/comprobante" id="comprobante" style="width: 100%; padding: 10px; border: 1px solid #00d4ff; border-radius: 5px; color: #000; background: #fff;">
    `;
  } else if (metodo === "tarjeta") {
    html = `
      <h4>Datos de la Tarjeta</h4>
      <input type="text" placeholder="Número de tarjeta (16 dígitos)" id="numTarjeta" maxlength="16" inputmode="numeric">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <input type="text" placeholder="MM/YY" id="vencimiento" maxlength="5">
        <input type="text" placeholder="CVV" id="cvv" maxlength="3" inputmode="numeric">
      </div>
      <input type="text" placeholder="Nombre en la tarjeta" id="nombreTarjeta">
      <label>
        <input type="radio" name="tipoTarjeta" value="bcp"> BCP (Banco de Crédito)
      </label>
      <label>
        <input type="radio" name="tipoTarjeta" value="visa"> Visa
      </label>
      <label>
        <input type="radio" name="tipoTarjeta" value="mastercard"> Mastercard
      </label>
    `;
  }

  formaPago.innerHTML = html;
}

function mostrarCuentaBanco(banco) {
  const cuentaBanco = document.getElementById("cuentaBanco");
  
  if (banco === "bn") {
    cuentaBanco.innerHTML = `
      <div class="cuenta-info">
        <p>Banco de la Nación</p>
        <p>Número de cuenta: 0000-000000-000000</p>
        <p>Monto: S/ 35.00</p>
      </div>
    `;
  } else if (banco === "bcp") {
    cuentaBanco.innerHTML = `
      <div class="cuenta-info">
        <p>Banco de Crédito - BCP</p>
        <p>Número de cuenta: 0000-000000-000000</p>
        <p>Monto: S/ 35.00</p>
      </div>
    `;
  }
}

function confirmarPago() {
  // Simular confirmación de pago
  alert("Pago confirmado. Iniciando test premium...");
  startTest('premium');
}

function startTest(tipo) {
  tipoTestActual = tipo;
  preguntasActuales = obtenerPreguntas(tipo);

  document.querySelector(".plans")?.classList.add("hidden");
  document.getElementById("historialBox")?.classList.add("hidden");
  document.getElementById("pagoBox")?.classList.add("hidden");
  document.getElementById("resultado")?.classList.add("hidden");
  document.getElementById("testBox")?.classList.remove("hidden");

  document.getElementById("testTitle").innerText =
    tipo === "premium" ? "Test Vocacional Premium" : "Test Vocacional Gratuito";

  let html = "";

  preguntasActuales.forEach((pregunta, index) => {
    html += `
      <div class="question">
        <p>${index + 1}. ${pregunta.texto}</p>
    `;

    pregunta.opciones.forEach((opcion) => {
      html += `
        <label class="option-row">
          <input type="radio" name="pregunta${index}" value="${opcion.area}">
          <span>${opcion.texto}</span>
        </label>
      `;
    });

    html += `</div>`;
  });

  document.getElementById("questions").innerHTML = html;

  window.scrollTo({
    top: document.getElementById("testBox").offsetTop - 20,
    behavior: "smooth"
  });
}

function calcularResultado() {
  let puntajes = {
    "Tecnología": 0,
    "Salud": 0,
    "Negocios": 0,
    "Arte y Comunicación": 0,
    "Agroindustria": 0
  };

  for (let i = 0; i < preguntasActuales.length; i++) {
    const seleccionada = document.querySelector(`input[name="pregunta${i}"]:checked`);

    if (!seleccionada) {
      alert("Responde todas las preguntas.");
      return;
    }

    puntajes[seleccionada.value]++;
  }

  const ordenado = Object.entries(puntajes).sort((a, b) => b[1] - a[1]);
  const areaGanadora = ordenado[0][0];
  const maxPuntaje = preguntasActuales.length;
  const porcentaje = Math.round((ordenado[0][1] / maxPuntaje) * 100);
  const recomendaciones = carreras[areaGanadora];

  let barras = "";
  ordenado.forEach(([area, puntaje]) => {
    const porcentajeArea = Math.round((puntaje / maxPuntaje) * 100);
    barras += `
      <div class="score-bar">
        <strong>${area}: ${porcentajeArea}%</strong>
        <div class="bar-bg">
          <div class="bar-fill" style="width:${porcentajeArea}%"></div>
        </div>
      </div>
    `;
  });

  let carrerasHtml = recomendaciones.map((carrera, index) => {
    let compatibilidad = Math.max(55, porcentaje - index * 7);
    return `
      <div class="career">
        <strong>${carrera}</strong>
        <p>Compatibilidad aproximada: ${compatibilidad}%</p>
      </div>
    `;
  }).join("");

  // Obtener imagen según carrera principal
  const carreraPrincipal = recomendaciones[0];
  const imagenCarrera = carrerasImagenes[carreraPrincipal] || "assets/default.jpg";

  const resultHTML = `
    <div class="result-container">
      <div class="result-content">
        <h3>Resultado Vocacional</h3>
        <p><strong>Plan realizado:</strong> ${tipoTestActual === "premium" ? "Premium S/ 35.00" : "Gratuito"}</p>
        <p><strong>Área dominante:</strong> ${areaGanadora}</p>
        <p><strong>Compatibilidad principal:</strong> ${porcentaje}%</p>

        <h3>Puntajes por área</h3>
        ${barras}

        <h3>Mejores opciones recomendadas</h3>
        ${carrerasHtml}

        <button onclick="volverPanelTest()">Volver al panel</button>
      </div>
      <div class="result-image-container">
        <img src="${imagenCarrera}" alt="${carreraPrincipal}" class="result-img floating-img">
        <p class="result-carrera"><strong>${carreraPrincipal}</strong></p>
      </div>
    </div>
  `;

  document.getElementById("resultado").innerHTML = resultHTML;

  document.getElementById("testBox").classList.add("hidden");
  document.getElementById("resultado").classList.remove("hidden");

  guardarResultadoUsuario(areaGanadora, recomendaciones[0], porcentaje);

  window.scrollTo({
    top: document.getElementById("resultado").offsetTop - 20,
    behavior: "smooth"
  });
}

function volverPanelTest() {
  document.querySelector(".plans")?.classList.remove("hidden");
  document.getElementById("historialBox")?.classList.remove("hidden");
  document.getElementById("resultado")?.classList.add("hidden");
  document.getElementById("testBox")?.classList.add("hidden");

  cargarHistorialUsuario();

  window.scrollTo({
    top: document.querySelector(".dashboard").offsetTop,
    behavior: "smooth"
  });
}

/* =========================
   GUARDAR HISTORIAL
========================= */
function guardarResultadoUsuario(area, carrera, porcentaje) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.rol === "admin") return;

  const nuevoResultado = {
    fecha: new Date().toLocaleString(),
    plan: tipoTestActual === "premium" ? "Premium" : "Gratuito",
    preguntas: preguntasActuales.length,
    area,
    carrera,
    porcentaje
  };

  currentUser.plan = nuevoResultado.plan;
  currentUser.area = area;
  currentUser.carrera = carrera;
  currentUser.porcentaje = porcentaje;

  if (!currentUser.historial) currentUser.historial = [];
  currentUser.historial.push(nuevoResultado);

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(u => u.dni === currentUser.dni ? currentUser : u);
  localStorage.setItem("users", JSON.stringify(users));

  cargarHistorialUsuario();
}

function cargarHistorialUsuario() {
  if (!window.location.pathname.includes("panel.html")) return;

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const contenedor = document.getElementById("historialTests");

  if (!contenedor || !user) return;

  const historial = user.historial || [];

  if (historial.length === 0) {
    contenedor.innerHTML = `<p class="muted-dark">Aún no tienes tests realizados.</p>`;
    return;
  }

  let html = "";

  historial.slice().reverse().forEach((item, index) => {
    const porcentajeArea = Math.round((item.porcentaje));
    html += `
      <div class="history-card">
        <h4>Test ${historial.length - index}</h4>
        <div class="history-info">
          <p><strong>Fecha:</strong> ${item.fecha}</p>
          <p><strong>Plan:</strong> ${item.plan}</p>
        </div>
        <div class="history-score-bar">
          <div class="history-score-label"><span>Compatibilidad</span><span>${porcentajeArea}%</span></div>
          <div class="history-bar-bg"><div class="history-bar-fill" style="width:${porcentajeArea}%"></div></div>
        </div>
        <p><strong>Área dominante:</strong> ${item.area}</p>
        <p><strong>Carrera recomendada:</strong> ${item.carrera}</p>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}

function toggleHistorial() {
  const contenedor = document.getElementById("historialTests");
  if (!contenedor) return;

  contenedor.classList.toggle("hidden");
  const boton = document.getElementById("btnVerHistorial");
  if (boton) {
    boton.innerText = contenedor.classList.contains("hidden") ? "Ver Historial" : "Ocultar Historial";
  }
}

/* =========================
   PANEL Y ADMIN
========================= */
function cargarPanelUsuario() {
  if (!window.location.pathname.includes("panel.html")) return;

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || user.rol === "admin") {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcome").innerText =
    getIdioma() === "qu" ? `Allin hamusqa, ${user.nombre}` : `Bienvenido, ${user.nombre}`;
}

/* =========================
   ADMIN PANEL
========================= */
function mostrarTab(tabName) {
  // Ocultar todas las tabs
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  
  // Desactivar todos los botones
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  
  // Mostrar la tab seleccionada
  document.getElementById("tab-" + tabName).classList.add("active");
  event.target.classList.add("active");
  
  // Cargar datos específicos de la tab
  if (tabName === "pagos") cargarPagos();
  if (tabName === "admins") cargarListaAdmins();
  if (tabName === "perfil") cargarPerfilAdmin();
  if (tabName === "tests") cargarTestsPersonalizados();
}

function cargarAdmin() {
  if (!window.location.pathname.includes("admin.html")) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.rol !== "admin") {
    window.location.href = "login.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  document.getElementById("totalUsers").innerText = users.length;
  document.getElementById("totalPremium").innerText = users.filter(u => u.plan === "Premium").length;
  document.getElementById("totalGratis").innerText = users.filter(u => u.plan === "Gratuito").length;

  let html = "";

  if (users.length === 0) {
    html = `<p class="muted">No hay usuarios registrados.</p>`;
  }

  users.forEach((u, index) => {
    html += `
      <div class="admin-card">
        <h4>${u.nombre}</h4>
        <p><strong>DNI:</strong> ${u.dni}</p>
        <p><strong>Teléfono:</strong> ${u.telefono}</p>
        <p><strong>Correo personal:</strong> ${u.correo || "No registrado"}</p>
        <p><strong>Departamento:</strong> ${u.ciudad}</p>
        <p><strong>Idioma:</strong> ${u.idioma}</p>
        <p><strong>Plan:</strong> ${u.plan}</p>
        <p><strong>Área recomendada:</strong> ${u.area}</p>
        <p><strong>Carrera principal:</strong> ${u.carrera}</p>
        <p><strong>Compatibilidad:</strong> ${u.porcentaje}%</p>
        <p><strong>Tests realizados:</strong> ${u.historial ? u.historial.length : 0}</p>
        <button onclick="eliminarUsuario(${index})">Eliminar usuario</button>
      </div>
    `;
  });

  document.getElementById("usuarios").innerHTML = html;
}

function cargarPagos() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const pagosContainer = document.getElementById("pagosContainer");
  let html = "";

  users.forEach(u => {
    if (u.historial && u.historial.length > 0) {
      u.historial.forEach(test => {
        if (test.plan === "Premium") {
          html += `
            <div class="pago-card">
              <h4>${u.nombre}</h4>
              <p><strong>DNI:</strong> ${u.dni}</p>
              <p><strong>Correo:</strong> ${u.correo}</p>
              <p><strong>Tipo de Test:</strong> ${test.plan}</p>
              <p><strong>Monto:</strong> S/ 35.00</p>
              <p><strong>Fecha:</strong> ${test.fecha}</p>
              <p><strong>Resultado:</strong> ${test.area} - ${test.carrera}</p>
              <p style="color: #28a745;"><strong>✓ Pagado</strong></p>
            </div>
          `;
        }
      });
    }
  });

  if (html === "") {
    html = `<p class="muted">No hay pagos registrados.</p>`;
  }

  pagosContainer.innerHTML = html;
}

function crearNuevoAdmin(e) {
  e.preventDefault();

  const nombres = document.getElementById("adminNombres").value.trim();
  const apellidos = document.getElementById("adminApellidos").value.trim();
  const dni = document.getElementById("adminDNI").value.trim();
  const correo = document.getElementById("adminCorreo").value.trim();

  if (!nombres || !apellidos || !dni || !correo) {
    alert("Completa todos los campos.");
    return;
  }

  const adminData = {
    nombre: `${nombres} ${apellidos}`,
    dni: dni,
    correo: correo,
    password: dni, // Contraseña por defecto es el DNI
    rol: "admin",
    fechaCreacion: new Date().toLocaleString()
  };

  let admins = JSON.parse(localStorage.getItem("admins")) || [];
  
  if (admins.find(a => a.dni === dni)) {
    alert("Este DNI ya está registrado.");
    return;
  }

  admins.push(adminData);
  localStorage.setItem("admins", JSON.stringify(admins));

  alert(`Administrador creado exitosamente.\nDatos de acceso:\nDNI: ${dni}\nContraseña: ${dni}`);
  
  document.getElementById("adminNombres").value = "";
  document.getElementById("adminApellidos").value = "";
  document.getElementById("adminDNI").value = "";
  document.getElementById("adminCorreo").value = "";

  cargarListaAdmins();
}

function cargarListaAdmins() {
  const adminsList = document.getElementById("adminsList");
  const admins = JSON.parse(localStorage.getItem("admins")) || [];

  let html = "";

  if (admins.length === 0) {
    html = `<p class="muted">No hay administradores registrados.</p>`;
  }

  admins.forEach((admin, index) => {
    html += `
      <div class="admin-card">
        <h4>${admin.nombre}</h4>
        <p><strong>DNI:</strong> ${admin.dni}</p>
        <p><strong>Correo:</strong> ${admin.correo}</p>
        <p><strong>Fecha de creación:</strong> ${admin.fechaCreacion}</p>
        <button onclick="eliminarAdmin(${index})" style="background: #dc2626;">Eliminar Admin</button>
      </div>
    `;
  });

  adminsList.innerHTML = html;
}

function eliminarAdmin(index) {
  if (!confirm("¿Estás seguro de que deseas eliminar este administrador?")) return;

  let admins = JSON.parse(localStorage.getItem("admins")) || [];
  admins.splice(index, 1);
  localStorage.setItem("admins", JSON.stringify(admins));
  cargarListaAdmins();
}

function cargarPerfilAdmin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (currentUser.foto) {
    document.getElementById("perfilFoto").src = currentUser.foto;
  }

  document.getElementById("perfilNombre").innerHTML = `<strong>Nombre: </strong>${currentUser.nombre}`;
  document.getElementById("perfilDNI").innerHTML = `<strong>DNI: </strong>${currentUser.dni}`;
  document.getElementById("perfilCorreo").innerHTML = `<strong>Correo: </strong>${currentUser.correo}`;
  document.getElementById("perfilFechaCreacion").innerHTML = `<strong>Fecha de creación: </strong>${currentUser.fechaCreacion || "No especificada"}`;
}

function cargarFotoPerfil() {
  const fileInput = document.getElementById("fotoPerfil");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("perfilFoto").src = e.target.result;
      
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      currentUser.foto = e.target.result;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      alert("Foto actualizada correctamente.");
    };
    reader.readAsDataURL(file);
  }
}

function agregarPreguntaTest() {
  const container = document.getElementById("questionsContainer");
  const newQuestion = document.createElement("div");
  newQuestion.className = "question-item";
  newQuestion.innerHTML = `
    <input type="text" placeholder="Pregunta" class="test-question" required>
    <input type="text" placeholder="Opción 1" class="test-option" required>
    <input type="text" placeholder="Opción 2" class="test-option" required>
    <input type="text" placeholder="Opción 3" class="test-option" required>
    <input type="text" placeholder="Opción 4" class="test-option" required>
  `;
  container.appendChild(newQuestion);
}

function crearNuevoTest(e) {
  e.preventDefault();

  const nombre = document.getElementById("testNombre").value.trim();
  const descripcion = document.getElementById("testDescripcion").value.trim();

  if (!nombre || !descripcion) {
    alert("Completa todos los campos obligatorios.");
    return;
  }

  const preguntas = [];
  const questionItems = document.querySelectorAll(".question-item");

  questionItems.forEach(item => {
    const pregunta = item.querySelector(".test-question").value.trim();
    const opciones = Array.from(item.querySelectorAll(".test-option")).map(opt => opt.value.trim());

    if (pregunta && opciones.every(o => o !== "")) {
      preguntas.push({
        texto: pregunta,
        opciones: opciones.map(op => ({ texto: op, area: "Personalizado" }))
      });
    }
  });

  if (preguntas.length === 0) {
    alert("Agrega al menos una pregunta válida.");
    return;
  }

  const nuevoTest = {
    id: Date.now(),
    nombre: nombre,
    descripcion: descripcion,
    preguntas: preguntas,
    fechaCreacion: new Date().toLocaleString()
  };

  let testsPersonalizados = JSON.parse(localStorage.getItem("testsPersonalizados")) || [];
  testsPersonalizados.push(nuevoTest);
  localStorage.setItem("testsPersonalizados", JSON.stringify(testsPersonalizados));

  alert("Test creado correctamente.");
  document.getElementById("testNombre").value = "";
  document.getElementById("testDescripcion").value = "";
  document.getElementById("questionsContainer").innerHTML = `
    <div class="question-item">
      <input type="text" placeholder="Pregunta 1" class="test-question" required>
      <input type="text" placeholder="Opción 1" class="test-option" required>
      <input type="text" placeholder="Opción 2" class="test-option" required>
      <input type="text" placeholder="Opción 3" class="test-option" required>
      <input type="text" placeholder="Opción 4" class="test-option" required>
    </div>
  `;

  cargarTestsPersonalizados();
}

function cargarTestsPersonalizados() {
  const testsList = document.getElementById("testsList");
  const testsPersonalizados = JSON.parse(localStorage.getItem("testsPersonalizados")) || [];

  let html = "";

  if (testsPersonalizados.length === 0) {
    html = `<p class="muted">No hay tests personalizados creados.</p>`;
  }

  testsPersonalizados.forEach((test, index) => {
    html += `
      <div class="test-card">
        <h4>${test.nombre}</h4>
        <p>${test.descripcion}</p>
        <p><strong>Preguntas:</strong> ${test.preguntas.length}</p>
        <p><strong>Fecha:</strong> ${test.fechaCreacion}</p>
        <button onclick="eliminarTestPersonalizado(${index})" style="background: #dc2626;">Eliminar</button>
      </div>
    `;
  });

  testsList.innerHTML = html;
}

function eliminarTestPersonalizado(index) {
  if (!confirm("¿Estás seguro de que deseas eliminar este test?")) return;

  let testsPersonalizados = JSON.parse(localStorage.getItem("testsPersonalizados")) || [];
  testsPersonalizados.splice(index, 1);
  localStorage.setItem("testsPersonalizados", JSON.stringify(testsPersonalizados));
  cargarTestsPersonalizados();
}

function eliminarUsuario(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  cargarAdmin();
}

/* =========================
   INICIO
========================= */
aplicarIdioma();
cargarPanelUsuario();
cargarHistorialUsuario();
cargarAdmin();