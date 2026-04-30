// Script de diagnóstico para QYVARA
// Ejecuta esto en la consola del navegador (F12)

console.log('=== DIAGNÓSTICO QYVARA ===');

// 1. Verificar localStorage
console.log('1. Estado de localStorage:');
console.log('Keys disponibles:', Object.keys(localStorage));
console.log('Total items:', Object.keys(localStorage).length);

// 2. Verificar datos críticos
const checkData = (key, description) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      console.log(`${description}: ✅ ${Array.isArray(parsed) ? parsed.length : '1'} items`);
      return parsed;
    } catch (e) {
      console.log(`${description}: ❌ Error parseando JSON`);
      return null;
    }
  } else {
    console.log(`${description}: ❌ No existe`);
    return null;
  }
};

const users = checkData('users', 'Usuarios');
const admins = checkData('admins', 'Administradores');
const tests = checkData('customTests', 'Tests personalizados');
const history = checkData('testHistory', 'Historial de tests');
const payments = checkData('paymentHistory', 'Historial de pagos');

// 3. Verificar admin por defecto
if (admins) {
  const defaultAdmin = admins.find(a => a.dni === 'admin' || a.correo === 'admin');
  if (defaultAdmin) {
    console.log('3. Admin por defecto: ✅ Encontrado');
    console.log('   DNI/Correo:', defaultAdmin.dni || defaultAdmin.correo);
    console.log('   Contraseña:', defaultAdmin.password);
  } else {
    console.log('3. Admin por defecto: ❌ No encontrado');
  }
}

// 4. Verificar tests disponibles
if (tests) {
  const activeTests = tests.filter(t => t.activo !== false);
  console.log('4. Tests activos:', activeTests.length);
  activeTests.forEach((test, i) => {
    console.log(`   ${i+1}. ${test.nombre} (${test.tipo})`);
  });
}

// 5. Verificar sesión actual
const currentUser = localStorage.getItem('currentUser');
if (currentUser) {
  try {
    const user = JSON.parse(currentUser);
    console.log('5. Sesión actual: ✅', user.nombre || user.dni);
    console.log('   Tipo:', user.rol || 'usuario');
  } catch (e) {
    console.log('5. Sesión actual: ❌ Error parseando');
  }
} else {
  console.log('5. Sesión actual: ❌ No hay sesión');
}

// 6. Función de reset si es necesario
window.resetQYVARA = function() {
  console.log('🔄 Reseteando QYVARA...');

  // Crear admin por defecto
  const defaultAdmins = [{
    id: 'admin_default',
    dni: 'admin',
    nombre: 'Administrador',
    apellidos: 'Principal',
    correo: 'admin@qyvara.com',
    password: 'admin123',
    rol: 'admin',
    foto: null,
    createdAt: new Date().toISOString()
  }];

  // Preguntas para test gratuito (20 preguntas)
  const preguntasGratis = [
    { texto: '¿Qué actividad te interesa más?', opciones: ['Resolver problemas con computadoras', 'Ayudar a personas con su salud', 'Crear negocios o vender productos', 'Diseñar piezas visuales o comunicar ideas'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿En qué curso te sientes mejor?', opciones: ['Matemática o computación', 'Biología o anatomía', 'Economía o emprendimiento', 'Arte, comunicación o diseño'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué tipo de trabajo prefieres?', opciones: ['Crear soluciones digitales', 'Atender y orientar personas', 'Organizar equipos y proyectos', 'Crear contenido visual o audiovisual'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué herramienta te llama más la atención?', opciones: ['Computadoras, software y redes', 'Equipos médicos o laboratorio', 'Hojas de cálculo, ventas y gestión', 'Cámaras, diseño o edición'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué problema te gustaría resolver?', opciones: ['Automatizar procesos', 'Mejorar la salud de las personas', 'Mejorar ventas y administración', 'Comunicar mensajes de forma creativa'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué título te gustaría ver en tu tarjeta profesional?', opciones: ['Ingeniero o Desarrollador', 'Profesional de la salud', 'Gestor de negocios', 'Creador visual'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Te imaginas trabajando en un laboratorio, clínica, oficina o estudio creativo?', opciones: ['Laboratorio u oficina moderna', 'Clínica u hospital', 'Oficina de gestión', 'Estudio de diseño o grabación'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué actividad disfrutas más en tu tiempo libre?', opciones: ['Programar o crear apps', 'Cuidar a personas o aprender medicina', 'Emprender o analizar cifras', 'Dibujar, crear videos o música'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: 'Cuando trabajas en equipo, prefieres:', opciones: ['Resolver detalles técnicos', 'Cuidar del equipo', 'Organizar y negociar', 'Proponer conceptos visuales'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué te motiva más?', opciones: ['Crear nuevas soluciones', 'Apoyar el bienestar', 'Impulsar negocios', 'Expresar creatividad'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Cómo te gustaría que fuera tu ambiente laboral?', opciones: ['Moderno y tecnológico', 'Tranquilo y sensible', 'Dinámico y estratégico', 'Colorido y artístico'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: 'En una presentación, prefieres:', opciones: ['Presentar resultados técnicos', 'Hablar sobre salud humana', 'Explicar estrategias comerciales', 'Mostrar proyectos visuales'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué tipo de palabras reconoces mejor?', opciones: ['Código, algoritmos y datos', 'Células, cuerpo y salud', 'Dinero, clientes y ventas', 'Color, forma y mensaje'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué tipo de metas te parecen más claras?', opciones: ['Inventar algo nuevo', 'Saludar y recuperar a alguien', 'Lograr objetivos comerciales', 'Crear experiencias visuales'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué tipo de noticias te atraen más?', opciones: ['Lanzamientos tecnológicos', 'Avances médicos', 'Historias de emprendimiento', 'Tendencias creativas'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué problema profesional te gustaría solucionar?', opciones: ['Optimizar software o sistemas', 'Mejorar el bienestar de pacientes', 'Aumentar el éxito de negocios', 'Comunicar mensajes impactantes'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué herramienta te suena mejor?', opciones: ['Código y desarrollo', 'Estetoscopio y cuidado', 'Excel y gestión', 'Cámara y diseño'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué forma de aprendizaje te parece más natural?', opciones: ['Ejecutar prácticas técnicas', 'Practicar con casos reales de salud', 'Estudiar estrategias y finanzas', 'Explorar ejercicios creativos'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué prefieres hacer para sentirte realizado?', opciones: ['Mejorar procesos digitales', 'Cuidar y apoyar a otros', 'Crear ideas de negocio', 'Diseñar piezas con impacto'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Con qué tipo de proyectos te imaginas en los próximos 3 años?', opciones: ['Apps, sistemas y software', 'Servicios de salud y bienestar', 'Proyectos comerciales y de gestión', 'Proyectos visuales, creativos o mediáticos'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] }
  ];

  // Preguntas adicionales para test premium (10 preguntas extra)
  const preguntasPremiumExtra = [
    { texto: '¿Cuál es tu mayor interés?', opciones: ['Descubrir nuevas plataformas digitales', 'Brindar apoyo a pacientes y su recuperación', 'Crear estrategias para empresas', 'Producir proyectos visuales e innovadores'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué valoras más?', opciones: ['Exactitud y lógica', 'Cercanía con las personas', 'Planificar resultados', 'Crear ideas únicas'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué tipo de producto te gustaría desarrollar?', opciones: ['Aplicaciones o plataformas', 'Servicios médicos o terapias', 'Planes de marketing o servicios', 'Campañas visuales o contenidos artísticos'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿En qué tipo de información te gustaría especializarte?', opciones: ['Datos y sistemas', 'Análisis clínicos y salud', 'Estadísticas y finanzas', 'Historias y lenguaje creativo'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué rol te motiva dentro de un equipo?', opciones: ['Solucionar problemas técnicos', 'Cuidar a los demás', 'Guiar decisiones comerciales', 'Inspirar con ideas creativas'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué horario de trabajo prefieres?', opciones: ['Flexible con proyectos digitales', 'Con turnos planificados', 'Horarios de oficina o reuniones', 'Tardes creativas en estudio'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué espacio te inspira mejor?', opciones: ['Oficina moderna con pantallas', 'Sala de atención o laboratorio', 'Oficina o sala de juntas', 'Estudio con colores y materiales'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué forma de comunicación disfrutas más?', opciones: ['Explicar soluciones técnicas', 'Escuchar y aconsejar', 'Presentar ideas de negocios', 'Compartir historias visuales'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué desafío te resultó más satisfactorio?', opciones: ['Resolver una falla de software', 'Ayudar a alguien a mejorar su salud', 'Cerrar una venta importante', 'Terminar una pieza creativa'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] },
    { texto: '¿Qué perfil profesional te llama más la atención?', opciones: ['Desarrollador o ingeniero de sistemas', 'Técnico en enfermería o nutrición', 'Administrador o gerente de ventas', 'Diseñador gráfico o comunicador audiovisual'], areas: ['Tecnología', 'Salud', 'Negocios', 'Arte y Comunicación'] }
  ];

  // Crear tests por defecto
  const defaultTests = [
    {
      id: 'test_gratis',
      nombre: 'Orientación Vocacional Gratuita',
      descripcion: 'Test gratuito de 20 preguntas para orientación vocacional bilingüe con dirección exacta.',
      tipo: 'free',
      precio: 0,
      activo: true,
      createdByAdminID: 'admin_default',
      preguntas: preguntasGratis,
      createdAt: new Date().toISOString()
    },
    {
      id: 'test_premium',
      nombre: 'Evaluación Profesional Premium',
      descripcion: 'Test premium de 30 preguntas con análisis avanzado y recomendaciones profesionales detalladas.',
      tipo: 'paid',
      precio: 35,
      activo: true,
      createdByAdminID: 'admin_default',
      preguntas: [...preguntasGratis, ...preguntasPremiumExtra],
      createdAt: new Date().toISOString()
    }
  ];

  localStorage.setItem('admins', JSON.stringify(defaultAdmins));
  localStorage.setItem('customTests', JSON.stringify(defaultTests));
  localStorage.setItem('users', JSON.stringify([]));
  localStorage.setItem('testHistory', JSON.stringify([]));
  localStorage.setItem('paymentHistory', JSON.stringify([]));

  console.log('✅ Reset completado. Recarga la página.');
};

// 7. Instrucciones
console.log('\\n=== INSTRUCCIONES ===');
console.log('Si faltan datos, ejecuta: resetQYVARA()');
console.log('Luego recarga la página con Ctrl+F5');
console.log('\\nPara ver este diagnóstico: Copia y pega todo este código en la consola');