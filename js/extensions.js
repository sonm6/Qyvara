/**
 * EXTENSIONES QYVARA
 * Funcionalidades adicionales: gerentes, historial flotante, pagos mejorados
 * Se carga después de app_new.js
 */

// ==================== INICIALIZACIÓN ====================

// ==================== PANEL GERENTE ====================

function cargarPanelGerente() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || (currentUser.rol !== "gerente" && currentUser.rol !== "admin")) {
    window.location.href = "login.html";
    return;
  }

  cargarPerfilGerente();
  cargarTestsGerentePanel();
}

function cargarPerfilGerente() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  // Try both element naming conventions
  const perfilNombreEl = document.getElementById("perfilNombreInput") || document.getElementById("gerenteNombre");
  const perfilCorreoEl = document.getElementById("perfilCorreoInput") || document.getElementById("gerenteCorreo");
  const perfilTelefonoEl = document.getElementById("perfilTelefonoInput") || document.getElementById("gerenteTelefono");
  const perfilFotoEl = document.getElementById("perfilFoto") || document.getElementById("perfilFotoGerente");

  if (perfilNombreEl) {
    perfilNombreEl.value = currentUser.nombre || "";
  }
  if (perfilCorreoEl) {
    perfilCorreoEl.value = currentUser.correo || "";
  }
  if (perfilTelefonoEl) {
    perfilTelefonoEl.value = currentUser.telefono || "";
  }

  // Cargar foto guardada
  const foto = db.getGerenteFoto(currentUser.id);
  if (foto && perfilFotoEl) {
    perfilFotoEl.style.backgroundImage = `url(${foto})`;
    perfilFotoEl.style.backgroundSize = 'cover';
    perfilFotoEl.innerHTML = '';
  }
}

function cargarFotoPerfil() {
  const fileInput = document.getElementById("fotoPerfil");
  const file = fileInput.files[0];
  
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("La imagen debe ser menor a 5MB");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    // Guardar foto
    db.saveGerenteFoto(currentUser.id, base64);
    currentUser.foto = base64;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Mostrar preview
    const fotoEl = document.getElementById("perfilFoto");
    if (fotoEl) {
      fotoEl.style.backgroundImage = `url(${base64})`;
      fotoEl.style.backgroundSize = 'cover';
      fotoEl.innerHTML = '';
    }
    alert("✓ Foto guardada correctamente");
  };
  reader.readAsDataURL(file);
}

function cargarFotoGerentePerfil() {
  const fileInput = document.getElementById("fotoPerfilGerente");
  const file = fileInput.files[0];
  
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("La imagen debe ser menor a 5MB");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    // Guardar foto
    db.saveGerenteFoto(currentUser.id, base64);
    currentUser.foto = base64;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Mostrar preview
    const fotoEl = document.getElementById("perfilFotoGerente");
    if (fotoEl) {
      fotoEl.style.backgroundImage = `url(${base64})`;
      fotoEl.style.backgroundSize = 'cover';
      fotoEl.innerHTML = '';
    }
    alert("✓ Foto guardada correctamente");
  };
  reader.readAsDataURL(file);
}

function guardarPerfilGerente() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const nombre = document.getElementById("perfilNombreInput").value.trim();
  const correo = document.getElementById("perfilCorreoInput").value.trim();
  const telefono = document.getElementById("perfilTelefonoInput").value.trim();

  if (!nombre || !correo) {
    alert("Completa nombre y correo");
    return;
  }

  const updatedUser = {
    ...currentUser,
    nombre,
    correo,
    telefono,
    updatedAt: new Date().toISOString()
  };

  // Actualizar en base de datos
  db.updateAdmin(currentUser.id, updatedUser);
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  alert("✓ Perfil actualizado correctamente");
  cargarPerfilGerente();
}

function cargarTestsGerentePanel() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const testsDiv = document.getElementById("testsList");
  
  if (!testsDiv) return;

  const tests = db.getAllCustomTests().filter(t => t.createdByAdminID === currentUser.id);

  const html = tests.map(test => `
    <div class="floating-card">
      <h4 style="color: var(--accent-cyan); margin-top: 0;">${test.nombre}</h4>
      <p>${test.descripcion}</p>
      <p>Tipo: <span class="historial-badge ${test.tipo}">${test.tipo === "free" ? "Gratuito" : `Pago - S/ ${test.precio}`}</span></p>
      <p>Preguntas: <strong>${test.preguntas.length}</strong></p>
      <p>Creado: ${new Date(test.createdAt).toLocaleDateString()}</p>
      <div style="display: flex; gap: 8px;">
        <button class="btn-accessible" onclick="editarTest('${test.id}')">Editar</button>
        <button class="btn-accessible" style="background: linear-gradient(135deg, #ef4444, #dc2626);" onclick="eliminarTest('${test.id}')">Eliminar</button>
      </div>
    </div>
  `).join("");

  testsDiv.innerHTML = html || "<p>No has creado ningún test aún.</p>";
}

function editarTest(testId) {
  const test = db.getTestByID(testId);
  if (!test) return;

  // Set test ID for update mode
  document.getElementById('testId').value = test.id;
  document.getElementById('testNombre').value = test.nombre;
  document.getElementById('testDescripcion').value = test.descripcion;
  document.getElementById('testTipo').value = test.tipo;
  document.getElementById('testPrecio').value = test.precio || 0;

  // Populate questions
  const questionsContainer = document.getElementById('questionsContainer');
  questionsContainer.innerHTML = '';

  if (test.preguntas && test.preguntas.length > 0) {
    test.preguntas.forEach((pregunta, index) => {
      const opciones = pregunta.opciones || [];
      const questionHTML = `
        <div class="question-item">
          <input type="text" placeholder="Pregunta ${index + 1}" class="test-question" value="${pregunta.pregunta}" required>
          <input type="text" placeholder="Opción 1" class="test-option" value="${opciones[0] || ''}" required>
          <input type="text" placeholder="Opción 2" class="test-option" value="${opciones[1] || ''}" required>
          <input type="text" placeholder="Opción 3" class="test-option" value="${opciones[2] || ''}">
          <input type="text" placeholder="Opción 4" class="test-option" value="${opciones[3] || ''}">
          <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
        </div>
      `;
      questionsContainer.insertAdjacentHTML('beforeend', questionHTML);
    });
  } else {
    // Add empty question if none exist
    questionsContainer.innerHTML = `
      <div class="question-item">
        <input type="text" placeholder="Pregunta 1" class="test-question" required>
        <input type="text" placeholder="Opción 1" class="test-option" required>
        <input type="text" placeholder="Opción 2" class="test-option" required>
        <input type="text" placeholder="Opción 3" class="test-option" required>
        <input type="text" placeholder="Opción 4" class="test-option" required>
      </div>
    `;
  }

  // Update UI for edit mode
  document.getElementById('crearTestTitulo').textContent = 'Editar Test';
  document.getElementById('btnCancelarEdicion').style.display = 'inline-block';

  // Scroll al formulario
  document.getElementById('crearTestTitulo').scrollIntoView({ behavior: 'smooth' });
}

function eliminarTest(testId) {
  if (!confirm("¿Eliminar este test? Esta acción no se puede deshacer.")) {
    return;
  }

  db.deleteCustomTest(testId);
  alert("✓ Test eliminado");
  cargarTestsCreados();
}

// ==================== SISTEMA DE PAGO MEJORADO ====================

function mostrarPagoLegacy() {
  const pagoBox = document.getElementById('pagoBox');
  const metodosContainer = document.getElementById('metodosContainer');
  const formaPago = document.getElementById('formaPago');
  const btnConfirmar = document.getElementById('btnConfirmarPago');

  if (!pagoBox || !metodosContainer) return;

  // Mostrar métodos de pago
  metodosContainer.innerHTML = `
    <div class="metodo-pago-card" onclick="seleccionarMetodoPago('plin')">
      <div style="font-size:48px;margin-bottom:10px;">📱</div>
      <h4 style="color: #ffffff !important;">Plin</h4>
      <p style="color: #ffffff !important;">Paga con tu billetera digital</p>
    </div>
    <div class="metodo-pago-card" onclick="seleccionarMetodoPago('yape')">
      <div style="font-size:48px;margin-bottom:10px;">💜</div>
      <h4 style="color: #ffffff !important;">Yape</h4>
      <p style="color: #ffffff !important;">Paga desde tu app BCP</p>
    </div>
    <div class="metodo-pago-card" onclick="seleccionarMetodoPago('transferencia')">
      <div style="font-size:48px;margin-bottom:10px;">🏦</div>
      <h4 style="color: #ffffff !important;">Transferencia</h4>
      <p style="color: #ffffff !important;">BN o BCP</p>
    </div>
    <div class="metodo-pago-card" onclick="seleccionarMetodoPago('tarjeta')">
      <div style="font-size:48px;margin-bottom:10px;">💳</div>
      <h4 style="color: #ffffff !important;">Tarjeta</h4>
      <p style="color: #ffffff !important;">Crédito o débito</p>
    </div>
  `;

  pagoBox.classList.remove('hidden');
  formaPago.classList.add('hidden');
  btnConfirmar.classList.add('hidden');
}

function seleccionarMetodoPago(metodo) {
  const formaPago = document.getElementById('formaPago');
  const btnConfirmar = document.getElementById('btnConfirmarPago');

  let camposHTML = '';

  switch(metodo) {
    case 'plin':
      camposHTML = `
        <div class="pago-form-group">
          <label>Número de celular Plin:</label>
          <input type="tel" id="plinNumero" placeholder="9XXXXXXXX" maxlength="9" required>
        </div>
        <div class="pago-qr-container">
          <div style="width:150px;height:150px;background:linear-gradient(135deg, #00d4ff, #00ff88);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:80px;margin:0 auto;">📱</div>
          <p>Escanea el QR o ingresa tu número</p>
        </div>
      `;
      break;

    case 'yape':
      camposHTML = `
        <div class="pago-form-group">
          <label>Número de celular Yape:</label>
          <input type="tel" id="yapeNumero" placeholder="9XXXXXXXX" maxlength="9" required>
        </div>
        <div class="pago-qr-container">
          <div style="width:150px;height:150px;background:linear-gradient(135deg, #742484, #9b4db5);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:80px;margin:0 auto;">💜</div>
          <p>Escanea el QR desde tu app Yape</p>
        </div>
      `;
      break;

    case 'transferencia':
      camposHTML = `
        <div class="pago-form-group">
          <label>Banco:</label>
          <select id="bancoSeleccionado" required style="color: #000000 !important;">
            <option value="" style="color: #000000 !important;">Seleccionar banco</option>
            <option value="bcp" style="color: #000000 !important;">BCP</option>
            <option value="bn" style="color: #000000 !important;">Banco de la Nación</option>
          </select>
        </div>
        <div id="datosBanco" class="pago-banco-info">
          <!-- Se llenará dinámicamente -->
        </div>
      `;
      break;

    case 'tarjeta':
      camposHTML = `
        <div class="pago-form-group">
          <label>Número de tarjeta:</label>
          <input type="text" id="tarjetaNumero" placeholder="XXXX XXXX XXXX XXXX" maxlength="19" required>
        </div>
        <div class="pago-form-row">
          <div class="pago-form-group">
            <label>Fecha de vencimiento:</label>
            <input type="text" id="tarjetaFecha" placeholder="MM/YY" maxlength="5" required>
          </div>
          <div class="pago-form-group">
            <label>CVV:</label>
            <input type="text" id="tarjetaCVV" placeholder="XXX" maxlength="3" required>
          </div>
        </div>
        <div class="pago-form-group">
          <label>Nombre en tarjeta:</label>
          <input type="text" id="tarjetaNombre" placeholder="NOMBRE COMPLETO" required>
        </div>
        <div class="pago-form-group">
          <label>Banco emisor:</label>
          <select id="tarjetaBanco" required>
            <option value="">Seleccionar banco</option>
            <option value="bcp">BCP</option>
            <option value="bbva">BBVA</option>
            <option value="interbank">Interbank</option>
            <option value="scotiabank">Scotiabank</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      `;
      break;
  }

  formaPago.innerHTML = camposHTML;
  formaPago.classList.remove('hidden');
  btnConfirmar.classList.remove('hidden');

  // Agregar listener para banco si es transferencia
  if (metodo === 'transferencia') {
    document.getElementById('bancoSeleccionado').addEventListener('change', mostrarDatosBanco);
  }
}

function mostrarDatosBanco() {
  const banco = document.getElementById('bancoSeleccionado').value;
  const datosDiv = document.getElementById('datosBanco');

  const datosBancos = {
    bcp: {
      nombre: 'Banco de Crédito del Perú',
      cuenta: '191-987654321',
      cci: '00219100987654321',
      titular: 'QYVARA E.I.R.L.'
    },
    bn: {
      nombre: 'Banco de la Nación',
      cuenta: '00-123-456789',
      cci: '01860000123456789',
      titular: 'QYVARA E.I.R.L.'
    }
  };

  if (banco && datosBancos[banco]) {
    const data = datosBancos[banco];
    datosDiv.innerHTML = `
      <div class="banco-info-card" style="background: #f0f8ff; border: 2px solid #00d4ff; border-radius: 12px; padding: 20px; margin-top: 15px;">
        <h4 style="color: #003366 !important; text-shadow: none; margin-bottom: 15px;">${data.nombre}</h4>
        <p style="color: #003366 !important; text-shadow: none; margin: 8px 0;"><strong style="color: #003366 !important;">Número de cuenta:</strong> ${data.cuenta}</p>
        <p style="color: #003366 !important; text-shadow: none; margin: 8px 0;"><strong style="color: #003366 !important;">CCI:</strong> ${data.cci}</p>
        <p style="color: #003366 !important; text-shadow: none; margin: 8px 0;"><strong style="color: #003366 !important;">Titular:</strong> ${data.titular}</p>
        <p class="banco-nota" style="color: #000000 !important; text-shadow: none; margin-top: 15px; font-weight: bold;">Realiza la transferencia y confirma el pago</p>
      </div>
    `;
  } else {
    datosDiv.innerHTML = '';
  }
}

function confirmarPagoLegacy() {
  const formaPago = document.getElementById('formaPago');
  const inputs = formaPago.querySelectorAll('input, select');
  let valido = true;

  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.style.borderColor = '#ef4444';
      valido = false;
    } else {
      input.style.borderColor = '#06b6d4';
    }
  });

  if (!valido) {
    alert('Completa todos los campos requeridos');
    return;
  }

  // Simular procesamiento de pago
  const btnConfirmar = document.getElementById('btnConfirmarPago');
  btnConfirmar.textContent = 'Procesando...';
  btnConfirmar.disabled = true;

  setTimeout(() => {
    // Registrar pago
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const metodoSeleccionado = document.querySelector('.metodo-pago-card.selected') || 
                              document.querySelector('.metodo-pago-card');

    const pagoData = {
      userDNI: currentUser.dni,
      monto: 35.00,
      metodo: metodoSeleccionado ? metodoSeleccionado.querySelector('h4').textContent : 'Premium',
      fecha: new Date().toISOString(),
      estado: 'completado'
    };

    db.recordPayment(pagoData);

    // Ocultar pago y mostrar test
    document.getElementById('pagoBox').classList.add('hidden');
    startTest('premium');

    alert('✅ Pago confirmado. Iniciando test premium...');
  }, 2000);
}

function crearHistorialFlotante() {
  const container = document.createElement('div');
  container.id = 'historial-flotante';
  container.className = 'historial-floating-container';
  container.innerHTML = `
    <div class="historial-header">
      <h3>📋 Mi Historial</h3>
      <button class="historial-close-btn" onclick="cerrarHistorialFlotante()">×</button>
    </div>
    <div class="historial-content" id="historialContent">
      <!-- Se llenará dinámicamente -->
    </div>
  `;
  document.body.appendChild(container);
}

function mostrarHistorialFlotante() {
  let flotante = document.getElementById('historial-flotante');
  if (!flotante) {
    crearHistorialFlotante();
    flotante = document.getElementById('historial-flotante');
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const historial = db.getUserTestHistory(currentUser.dni);
  const contentDiv = document.getElementById('historialContent');

  if (historial.length === 0) {
    contentDiv.innerHTML = '<p style="color: var(--text-secondary); padding: 16px;">No hay tests completados aún.</p>';
  } else {
    contentDiv.innerHTML = historial.map(item => `
      <div class="historial-item">
        <div class="historial-item-title">${item.testNombre}</div>
        <div class="historial-item-meta">
          <span>${new Date(item.completedAt).toLocaleDateString()}</span>
          <span class="historial-badge ${item.testTipo}">${item.testTipo === "free" ? "Gratuito" : "Pago"}</span>
        </div>
        ${item.resultado ? `<div style="margin-top: 6px; color: var(--accent-cyan); font-size: 12px;">Resultado: ${item.resultado}</div>` : ''}
      </div>
    `).join('');
  }

  flotante.classList.add('active');
}

function cerrarHistorialFlotante() {
  const flotante = document.getElementById('historial-flotante');
  if (flotante) {
    flotante.classList.remove('active');
  }
}

// ==================== TESTS CON PREGUNTAS ESPECÍFICAS ====================

const preguntasTestGratuito = [
  {
    pregunta: "¿Qué actividades te hacen sentir más motivado?",
    opciones: ["Resolver problemas lógicos y matemáticos", "Ayudar y comunicarme con otros", "Crear cosas artísticas o diseños", "Trabajar con datos y números"],
    categorias: ["Tecnología", "Humanidades", "Arte", "Administración"]
  },
  {
    pregunta: "¿Prefieres trabajar solo o en equipo?",
    opciones: ["Prefiero trabajar solo, concentrado", "Me gusta trabajar en equipo pequeño", "Disfruto equipos grandes y dinámicos", "Depende de la tarea específica"],
    categorias: ["Independiente", "Colaborativo", "Social", "Flexible"]
  },
  {
    pregunta: "¿Qué tipo de problemas te gusta resolver?",
    opciones: ["Problemas técnicos o científicos", "Problemas sociales o humanos", "Problemas creativos o artísticos", "Problemas organizacionales o financieros"],
    categorias: ["Técnico", "Social", "Creativo", "Administrativo"]
  },
  {
    pregunta: "¿Qué materias escolares te interesaban más?",
    opciones: ["Matemáticas, física, química", "Literatura, historia, idiomas", "Arte, música, diseño", "Economía, contabilidad, administración"],
    categorias: ["Ciencias", "Humanidades", "Arte", "Negocios"]
  },
  {
    pregunta: "¿Cómo te imaginas tu lugar de trabajo ideal?",
    opciones: ["Oficina con computadoras y tecnología", "Ambiente educativo o social", "Estudio creativo o artístico", "Empresa corporativa organizada"],
    categorias: ["Tecnológico", "Educativo", "Creativo", "Corporativo"]
  },
  {
    pregunta: "¿Qué habilidades crees que tienes naturalmente?",
    opciones: ["Lógica y pensamiento analítico", "Empatía y comunicación", "Creatividad e imaginación", "Organización y planificación"],
    categorias: ["Analítico", "Comunicativo", "Creativo", "Organizativo"]
  },
  {
    pregunta: "¿Qué tipo de libros o temas te gusta leer?",
    opciones: ["Ciencia, tecnología, programación", "Psicología, sociología, literatura", "Arte, diseño, fotografía", "Negocios, economía, liderazgo"],
    categorias: ["Técnico", "Humanístico", "Artístico", "Empresarial"]
  },
  {
    pregunta: "¿Qué actividades realizas en tu tiempo libre?",
    opciones: ["Jugar videojuegos, programar, reparar cosas", "Leer, escribir, conversar con amigos", "Dibujar, tocar instrumentos, crear arte", "Planificar viajes, organizar eventos, estudiar mercados"],
    categorias: ["Técnico", "Social", "Artístico", "Organizativo"]
  },
  {
    pregunta: "¿Qué te preocupa más en el futuro?",
    opciones: ["La evolución tecnológica y científica", "Los problemas sociales y ambientales", "La expresión artística y cultural", "La estabilidad económica y profesional"],
    categorias: ["Tecnológico", "Social", "Cultural", "Económico"]
  },
  {
    pregunta: "¿Qué tipo de proyectos te gustaría desarrollar?",
    opciones: ["Aplicaciones, software, innovaciones", "Proyectos sociales o educativos", "Obras artísticas o culturales", "Empresas o iniciativas comerciales"],
    categorias: ["Tecnológico", "Social", "Artístico", "Empresarial"]
  },
  {
    pregunta: "¿Cómo tomas decisiones importantes?",
    opciones: ["Analizo datos y lógica", "Considero el impacto en las personas", "Sigo mi intuición creativa", "Evalúo costos y beneficios"],
    categorias: ["Analítico", "Empático", "Creativo", "Práctico"]
  },
  {
    pregunta: "¿Qué admiras en las personas exitosas?",
    opciones: ["Su inteligencia y conocimientos técnicos", "Su capacidad de liderazgo e influencia", "Su creatividad e innovación", "Su visión empresarial y éxito financiero"],
    categorias: ["Intelectual", "Líder", "Innovador", "Empresarial"]
  },
  {
    pregunta: "¿En qué área te gustaría especializarte?",
    opciones: ["Tecnología de la información", "Ciencias sociales o educación", "Artes o comunicación", "Administración o finanzas"],
    categorias: ["TI", "Sociales", "Artes", "Administración"]
  },
  {
    pregunta: "¿Qué te motiva más en un trabajo?",
    opciones: ["Resolver desafíos técnicos complejos", "Ayudar al desarrollo de otros", "Expresar mi creatividad", "Lograr objetivos y crecimiento profesional"],
    categorias: ["Técnico", "Altruista", "Creativo", "Ambicioso"]
  },
  {
    pregunta: "¿Cómo prefieres aprender cosas nuevas?",
    opciones: ["A través de tutoriales y práctica autodidacta", "En clases interactivas con profesores", "Experimentando y creando", "Estudiando casos reales y teoría"],
    categorias: ["Autodidacta", "Académico", "Experimental", "Práctico"]
  },
  {
    pregunta: "¿Qué tipo de impacto quieres tener en el mundo?",
    opciones: ["Innovar tecnológicamente la sociedad", "Mejorar la condición humana", "Enriquecer culturalmente la sociedad", "Contribuir al desarrollo económico"],
    categorias: ["Innovador", "Humanitario", "Cultural", "Económico"]
  },
  {
    pregunta: "¿Qué herramientas o tecnologías te interesan?",
    opciones: ["Computadoras, software, internet", "Redes sociales, medios de comunicación", "Herramientas artísticas digitales", "Software de gestión y análisis"],
    categorias: ["Tecnológico", "Comunicativo", "Digital Art", "Business Intelligence"]
  },
  {
    pregunta: "¿Cómo manejas situaciones de presión?",
    opciones: ["Me concentro en soluciones lógicas", "Busco apoyo de otros", "Encuentro inspiración en la creatividad", "Organizo y priorizo tareas"],
    categorias: ["Analítico", "Colaborativo", "Creativo", "Organizado"]
  },
  {
    pregunta: "¿Qué valores son más importantes para ti?",
    opciones: ["Verdad, conocimiento, progreso", "Empatía, justicia, solidaridad", "Belleza, expresión, libertad", "Eficiencia, éxito, responsabilidad"],
    categorias: ["Intelectual", "Humanista", "Artístico", "Profesional"]
  },
  {
    pregunta: "¿Dónde te ves trabajando en 10 años?",
    opciones: ["En una empresa tecnológica innovadora", "En una ONG o institución educativa", "En el mundo del arte o entretenimiento", "En una corporación o emprendimiento propio"],
    categorias: ["Tech", "Social", "Arte", "Business"]
  }
];

const preguntasTestPremium = [
  ...preguntasTestGratuito,
  {
    pregunta: "¿Qué aspectos técnicos te interesan más?",
    opciones: ["Desarrollo de software y aplicaciones", "Análisis de datos e inteligencia artificial", "Infraestructura y redes", "Ciberseguridad y protección"],
    categorias: ["Desarrollo", "Data Science", "Infraestructura", "Seguridad"]
  },
  {
    pregunta: "¿Qué tipo de liderazgo te gustaría ejercer?",
    opciones: ["Liderazgo técnico especializado", "Liderazgo en equipos humanos", "Liderazgo creativo e innovador", "Liderazgo ejecutivo y estratégico"],
    categorias: ["Técnico", "Humano", "Creativo", "Ejecutivo"]
  },
  {
    pregunta: "¿Cómo evalúas el éxito profesional?",
    opciones: ["Por logros técnicos y reconocimientos", "Por impacto positivo en la sociedad", "Por reconocimiento artístico", "Por crecimiento económico y estabilidad"],
    categorias: ["Técnico", "Social", "Artístico", "Financiero"]
  },
  {
    pregunta: "¿Qué tipo de empresa te gustaría trabajar?",
    opciones: ["Startup tecnológica innovadora", "Organización sin fines de lucro", "Agencia creativa o estudio artístico", "Corporación estable y reconocida"],
    categorias: ["Startup", "ONG", "Creativa", "Corporativa"]
  },
  {
    pregunta: "¿Qué habilidades blandas valoras más?",
    opciones: ["Pensamiento crítico y resolución de problemas", "Inteligencia emocional y empatía", "Pensamiento lateral e innovación", "Negociación y toma de decisiones"],
    categorias: ["Analítico", "Emocional", "Creativo", "Estratégico"]
  },
  {
    pregunta: "¿Cómo te preparas para tu futuro profesional?",
    opciones: ["Cursos online y certificaciones técnicas", "Estudios universitarios especializados", "Práctica autodidacta y portafolio", "Networking y desarrollo de contactos"],
    categorias: ["Online", "Académico", "Práctico", "Networking"]
  },
  {
    pregunta: "¿Qué te motiva más en una carrera?",
    opciones: ["La posibilidad de innovar constantemente", "Contribuir al bienestar social", "La libertad de expresión creativa", "La seguridad financiera y crecimiento"],
    categorias: ["Innovación", "Altruismo", "Creatividad", "Estabilidad"]
  },
  {
    pregunta: "¿Qué tipo de proyectos ambiciosos te gustaría liderar?",
    opciones: ["Proyectos tecnológicos disruptivos", "Iniciativas sociales a gran escala", "Movimientos culturales o artísticos", "Emprendimientos empresariales exitosos"],
    categorias: ["Disruptivo", "Social", "Cultural", "Empresarial"]
  },
  {
    pregunta: "¿Cómo manejas el cambio y la incertidumbre?",
    opciones: ["Busco patrones y soluciones estructuradas", "Me adapto trabajando con personas", "Veo oportunidades creativas", "Planifico escenarios y riesgos"],
    categorias: ["Estructurado", "Adaptable", "Creativo", "Planificador"]
  },
  {
    pregunta: "¿Qué legado quieres dejar en tu profesión?",
    opciones: ["Avances tecnológicos significativos", "Mejora en la calidad de vida de las personas", "Contribuciones artísticas duraderas", "Éxito empresarial sostenible"],
    categorias: ["Tecnológico", "Humanitario", "Artístico", "Empresarial"]
  }
];

// ==================== RESULTADOS CON IMÁGENES ====================

const resultadosVocacionales = {
  "Tecnología": {
    titulo: "Ingeniería de Sistemas / Desarrollo de Software",
    descripcion: "Tienes un perfil analítico y técnico. Te apasiona resolver problemas complejos mediante la lógica y la tecnología.",
    imagen: "",
    emoji: "💻",
    carreras: ["Ingeniero de Sistemas", "Desarrollador de Software", "Analista de Datos", "Científico de Datos"]
  },
  "Humanidades": {
    titulo: "Educación / Psicología / Comunicación",
    descripcion: "Tu vocación está en ayudar a otros, comunicarte efectivamente y contribuir al desarrollo humano.",
    imagen: "",
    emoji: "📚",
    carreras: ["Docente", "Psicólogo", "Comunicador", "Trabajador Social"]
  },
  "Arte": {
    titulo: "Artes Plásticas / Diseño / Comunicación Visual",
    descripcion: "Eres creativo e imaginativo. Tu talento está en expresar ideas a través del arte y el diseño.",
    imagen: "",
    emoji: "🎨",
    carreras: ["Diseñador Gráfico", "Artista Visual", "Fotógrafo", "Director de Arte"]
  },
  "Administración": {
    titulo: "Administración / Economía / Finanzas",
    descripcion: "Tienes habilidades organizativas y visión estratégica. Te motiva el mundo empresarial y financiero.",
    imagen: "",
    emoji: "📊",
    carreras: ["Administrador", "Contador", "Economista", "Gerente Empresarial"]
  },
  "Data Science": {
    titulo: "Ciencia de Datos / Inteligencia Artificial",
    descripcion: "Combina tu pasión por los datos con el análisis avanzado. El futuro de la toma de decisiones.",
    imagen: "",
    emoji: "📈",
    carreras: ["Científico de Datos", "Analista de BI", "Ingeniero de Machine Learning", "Especialista en IA"]
  },
  "Infraestructura": {
    titulo: "Ingeniería de Infraestructura Tecnológica",
    descripcion: "Te apasiona construir y mantener los cimientos tecnológicos que soportan nuestros sistemas digitales.",
    imagen: "",
    emoji: "🌐",
    carreras: ["Ingeniero de Redes", "Administrador de Sistemas", "DevOps Engineer", "Arquitecto de TI"]
  }
};

// Función para calcular resultado basado en respuestas
function calcularResultadoVocacional(respuestas) {
  const conteo = {};

  respuestas.forEach(respuesta => {
    const categoria = respuesta.categoria;
    conteo[categoria] = (conteo[categoria] || 0) + 1;
  });

  // Encontrar la categoría más frecuente
  let maxCategoria = null;
  let maxConteo = 0;

  for (const [categoria, count] of Object.entries(conteo)) {
    if (count > maxConteo) {
      maxConteo = count;
      maxCategoria = categoria;
    }
  }

  return resultadosVocacionales[maxCategoria] || resultadosVocacionales["Tecnología"];
}

// Función para mostrar resultado con emoji
function mostrarResultadoVocacional(resultado, tipoTest) {
  const resultadoDiv = document.createElement('div');
  resultadoDiv.className = 'resultado-vocacional-container';
  resultadoDiv.innerHTML = `
    <div class="resultado-header">
      <h2>🎯 Tu Resultado Vocacional</h2>
      <button class="resultado-close-btn" onclick="cerrarResultadoVocacional()">×</button>
    </div>
    <div class="resultado-content">
      <div class="resultado-imagen-container">
        <div style="width:150px;height:150px;background:linear-gradient(135deg, #00d4ff, #00ff88);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:80px;box-shadow:0 10px 30px rgba(0,212,255,0.3);" class="floating">
          ${resultado.emoji || '🎯'}
        </div>
      </div>
      <div class="resultado-info">
        <h3>${resultado.titulo}</h3>
        <p class="resultado-descripcion">${resultado.descripcion}</p>
        <div class="resultado-carreras">
          <h4>Carreras recomendadas:</h4>
          <ul>
            ${resultado.carreras.map(carrera => `<li>${carrera}</li>`).join('')}
          </ul>
        </div>
        ${tipoTest === 'premium' ? `
          <div class="resultado-premium">
            <h4>💼 Tu Futura Profesión</h4>
            <p>Basado en tu perfil, podrías desarrollarte profesionalmente como:</p>
            <div class="profesion-card">
              <strong>${resultado.carreras[0]}</strong>
              <p>Especialista en ${resultado.titulo.toLowerCase()}</p>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  document.body.appendChild(resultadoDiv);
  setTimeout(() => resultadoDiv.classList.add('active'), 100);
}

function cerrarResultadoVocacional() {
  const container = document.querySelector('.resultado-vocacional-container');
  if (container) {
    container.classList.remove('active');
    setTimeout(() => container.remove(), 300);
  }
}

// ==================== DATOS DE PRUEBA ====================

function crearDatosPrueba() {
  if (!confirm('⚠️ Esto creará datos de prueba: 3 usuarios, 2 pagos, y 1 test. ¿Continuar?')) {
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Crear usuarios de prueba
  const usuarios = db.getAllUsers();
  const nuevosUsuarios = [
    {
      dni: '12345678',
      nombre: 'Juan Pérez',
      correo: 'juan@test.com',
      telefono: '987654321',
      ciudad: 'Lima',
      plan: 'Premium',
      createdAt: new Date().toISOString()
    },
    {
      dni: '87654321',
      nombre: 'María García',
      correo: 'maria@test.com',
      telefono: '912345678',
      ciudad: 'Cusco',
      plan: 'Gratis',
      createdAt: new Date().toISOString()
    },
    {
      dni: '45678912',
      nombre: 'Carlos López',
      correo: 'carlos@test.com',
      telefono: '934567890',
      ciudad: 'Arequipa',
      plan: 'Premium',
      createdAt: new Date().toISOString()
    }
  ];

  nuevosUsuarios.forEach(u => {
    if (!usuarios.find(existing => existing.dni === u.dni)) {
      usuarios.push(u);
    }
  });
  localStorage.setItem('users', JSON.stringify(usuarios));

  // Crear pagos de prueba
  const pagos = db.getAllPaymentHistory();
  const nuevosPagos = [
    {
      id: 'payment_' + Date.now(),
      userDNI: '12345678',
      userName: 'Juan Pérez',
      testNombre: 'Test Premium',
      monto: 35.00,
      metodoPago: 'Yape',
      estado: 'completado',
      timestamp: new Date().toISOString()
    },
    {
      id: 'payment_' + (Date.now() + 1),
      userDNI: '45678912',
      userName: 'Carlos López',
      testNombre: 'Test Premium',
      monto: 35.00,
      metodoPago: 'Plin',
      estado: 'completado',
      timestamp: new Date().toISOString()
    }
  ];

  nuevosPagos.forEach(p => {
    pagos.push(p);
  });
  localStorage.setItem('paymentHistory', JSON.stringify(pagos));

  // Crear test de prueba
  const tests = db.getAllCustomTests();
  if (!tests.find(t => t.nombre === 'Test de Orientación Vocacional')) {
    const nuevoTest = {
      id: 'test_' + Date.now(),
      nombre: 'Test de Orientación Vocacional',
      descripcion: 'Test completo para descubrir tu vocación profesional',
      tipo: 'paid',
      precio: 35.00,
      preguntas: [
        { pregunta: '¿Qué actividad te interesa más?', opciones: ['Tecnología', 'Arte', 'Negocios', 'Ciencias'] },
        { pregunta: '¿Prefieres trabajar solo o en equipo?', opciones: ['Solo', 'Equipo pequeño', 'Gran equipo', 'Depende'] }
      ],
      activo: true,
      createdByAdminID: currentUser?.id || 'admin_default',
      createdAt: new Date().toISOString()
    };
    tests.push(nuevoTest);
    localStorage.setItem('customTests', JSON.stringify(tests));
  }

  alert('✅ Datos de prueba creados exitosamente. Ahora haz clic en las pestañas para ver los datos.');

  // Recargar todas las secciones visibles
  if (typeof cargarListaUsuarios === 'function') cargarListaUsuarios();
  if (typeof cargarListaAdmins === 'function') cargarListaAdmins();
  if (typeof cargarHistorialPagos === 'function') cargarHistorialPagos();
  if (typeof cargarTestsCreados === 'function') cargarTestsCreados();
}

// ==================== FUNCIONES ADMIN PANEL ====================

function cargarListaUsuarios() {
  console.log("Ejecutando cargarListaUsuarios...");
  try {
    const usuarios = db.getAllUsers();
    console.log("Usuarios encontrados:", usuarios.length);
    const container = document.getElementById('usuarios');
    console.log("Container usuarios:", container);

    if (!container) {
      console.error("No se encontró container usuarios");
      return;
    }

  const html = usuarios.map(user => `
    <div class="user-card floating">
      <div class="user-info">
        <h4>${user.nombre}</h4>
        <p>DNI: ${user.dni}</p>
        <p>Correo: ${user.correo}</p>
        <p>Teléfono: ${user.telefono || 'No registrado'}</p>
        <p>Registrado: ${new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <div class="user-actions">
        <button class="btn-accessible" onclick="verHistorialUsuario('${user.dni}')">Ver historial</button>
      </div>
    </div>
  `).join('');

    container.innerHTML = html || '<p>No hay usuarios registrados aún.</p>';
    container.style.display = 'block';
    console.log("Usuarios cargados en container");
  } catch (error) {
    console.error("Error en cargarListaUsuarios:", error);
  }
}

function cargarEstadisticasAdmin() {
  const usuarios = db.getAllUsers();
  const pagos = db.getAllPaymentHistory();
  const tests = db.getAllCustomTests();

  document.getElementById('totalUsers').textContent = usuarios.length;
  document.getElementById('totalPremium').textContent = pagos.length;
  document.getElementById('totalGratis').textContent = tests.filter(t => t.tipo === 'free').length;
}

function cargarListaAdmins() {
  console.log("Ejecutando cargarListaAdmins...");
  try {
    const admins = db.getAllAdmins();
    console.log("Admins encontrados:", admins);
    const container = document.getElementById('adminsList');
    console.log("Container adminsList:", container);

    if (!container) {
      console.error("No se encontró el container adminsList");
      return;
    }

    console.log("Generando HTML para", admins.length, "admins");
    const html = admins.map(admin => `
      <div class="admin-card floating">
        <div class="admin-info">
          <div class="admin-avatar" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg, #00d4ff, #00ff88);display:flex;align-items:center;justify-content:center;font-size:30px;">👤</div>
          <div>
            <h4>${admin.nombre} ${admin.apellidos}</h4>
            <p>DNI: ${admin.dni}</p>
            <p>Correo: ${admin.correo}</p>
            <p>Rol: ${admin.rol}</p>
          </div>
          <p>DNI: ${admin.dni}</p>
          <p>Correo: ${admin.correo}</p>
          <p>Rol: ${admin.rol}</p>
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn-accessible" onclick="editarAdmin('${admin.id}')">Editar</button>
        <button class="btn-accessible" style="background: linear-gradient(135deg, #ef4444, #dc2626);" onclick="eliminarAdmin('${admin.id}')">Eliminar</button>
      </div>
    </div>
  `).join('');

    console.log("Insertando HTML en container");
    container.innerHTML = html || '<p>No hay administradores registrados.</p>';
    container.style.display = 'block';
    console.log("HTML insertado, container ahora:", container.innerHTML.substring(0, 100));
  } catch (error) {
    console.error("Error en cargarListaAdmins:", error);
  }
}

function crearNuevoAdmin(event) {
  event.preventDefault();

  const nombres = document.getElementById('adminNombres').value.trim();
  const apellidos = document.getElementById('adminApellidos').value.trim();
  const dni = document.getElementById('adminDNI').value.trim();
  const correo = document.getElementById('adminCorreo').value.trim();
  const rol = document.getElementById('adminRole').value;

  if (!nombres || !apellidos || !dni || !correo) {
    alert('Completa todos los campos');
    return;
  }

  if (dni.length !== 8 || !/^\d+$/.test(dni)) {
    alert('DNI debe tener 8 dígitos');
    return;
  }

  // Verificar si ya existe
  const existingAdmin = db.getAdminByDNI(dni) || db.getAdminByDNI(correo);
  if (existingAdmin) {
    alert('Ya existe un administrador con ese DNI o correo');
    return;
  }

  const newAdmin = {
    id: 'admin_' + Date.now(),
    nombres,
    apellidos,
    nombre: `${nombres} ${apellidos}`,
    dni,
    correo,
    password: dni, // Contraseña por defecto = DNI
    rol,
    foto: null,
    createdAt: new Date().toISOString()
  };

  db.createAdmin(newAdmin);

  // Limpiar formulario
  document.getElementById('adminNombres').value = '';
  document.getElementById('adminApellidos').value = '';
  document.getElementById('adminDNI').value = '';
  document.getElementById('adminCorreo').value = '';

  alert(`✅ Administrador creado. Usuario: ${correo}, Contraseña: ${dni}`);
  cargarListaAdmins();
}

function editarAdmin(adminId) {
  const admin = db.getAdminByID(adminId);
  if (!admin) return;

  document.getElementById('adminNombres').value = admin.nombres || '';
  document.getElementById('adminApellidos').value = admin.apellidos || '';
  document.getElementById('adminDNI').value = admin.dni;
  document.getElementById('adminCorreo').value = admin.correo;
  document.getElementById('adminRole').value = admin.rol;

  // Cambiar botón
  const btn = document.getElementById('btnCrearAdmin');
  btn.textContent = 'Actualizar Administrador';
  btn.onclick = () => actualizarAdmin(adminId);
}

function actualizarAdmin(adminId) {
  const nombres = document.getElementById('adminNombres').value.trim();
  const apellidos = document.getElementById('adminApellidos').value.trim();
  const dni = document.getElementById('adminDNI').value.trim();
  const correo = document.getElementById('adminCorreo').value.trim();
  const rol = document.getElementById('adminRole').value;

  const updatedData = {
    nombres,
    apellidos,
    nombre: `${nombres} ${apellidos}`,
    dni,
    correo,
    rol,
    updatedAt: new Date().toISOString()
  };

  db.updateAdmin(adminId, updatedData);

  // Resetear formulario
  const btn = document.getElementById('btnCrearAdmin');
  btn.textContent = 'Crear Administrador';
  btn.onclick = null;

  alert('✅ Administrador actualizado');
  cargarListaAdmins();
}

function eliminarAdmin(adminId) {
  if (!confirm('¿Eliminar este administrador? Esta acción no se puede deshacer.')) {
    return;
  }

  // No permitir eliminar al último admin
  const admins = db.getAllAdmins();
  if (admins.length <= 1) {
    alert('No puedes eliminar al último administrador');
    return;
  }

  db.deleteAdmin(adminId);
  alert('✅ Administrador eliminado');
  cargarListaAdmins();
}

function cargarHistorialPagos() {
  console.log("Ejecutando cargarHistorialPagos...");
  try {
    const pagos = db.getAllPaymentHistory();
    console.log("Pagos encontrados:", pagos.length);
    const container = document.getElementById('pagosContainer');
    console.log("Container pagosContainer:", container);

    if (!container) {
      console.error("No se encontró container pagosContainer");
      return;
    }

  const html = pagos.map(pago => `
    <div class="pago-card floating">
      <div class="pago-info">
        <h4>Pago de S/ ${pago.monto.toFixed(2)}</h4>
        <p>Usuario DNI: ${pago.userDNI}</p>
        <p>Usuario: ${pago.userName || 'N/A'}</p>
        <p>Test: ${pago.testNombre || 'N/A'}</p>
        <p>Método: ${pago.metodoPago}</p>
        <p>Fecha: ${new Date(pago.timestamp).toLocaleString()}</p>
        <span class="pago-status ${pago.estado}">${pago.estado}</span>
      </div>
    </div>
  `).join('');

    container.innerHTML = html || '<p>No hay pagos registrados aún.</p>';
    container.style.display = 'block';
    console.log("Pagos cargados en container");
  } catch (error) {
    console.error("Error en cargarHistorialPagos:", error);
  }
}

function cargarPerfilAdmin() {
  console.log("Ejecutando cargarPerfilAdmin...");
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Current user:", currentUser);
    if (!currentUser || !currentUser.id) {
      console.error("No hay usuario logueado");
      return;
    }
    const admin = db.getAdminByID(currentUser.id);
    console.log("Admin encontrado:", admin);

    if (admin) {
      document.getElementById('perfilNombresInput').value = admin.nombres || admin.nombre || '';
      document.getElementById('perfilApellidosInput').value = admin.apellidos || '';
      document.getElementById('perfilCorreoInput').value = admin.correo || '';
      document.getElementById('perfilTelefonoInput').value = admin.telefono || '';
      document.getElementById('perfilRolInput').value = admin.rol || 'admin';

      const fotoEl = document.getElementById('perfilFoto');
      if (fotoEl && admin.foto) {
        fotoEl.style.backgroundImage = `url(${admin.foto})`;
        fotoEl.style.backgroundSize = 'cover';
        fotoEl.textContent = '';
      }
    }
  } catch (error) {
    console.error("Error en cargarPerfilAdmin:", error);
  }
}

function guardarPerfilAdmin() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const nombres = document.getElementById('perfilNombresInput').value.trim();
  const apellidos = document.getElementById('perfilApellidosInput').value.trim();
  const correo = document.getElementById('perfilCorreoInput').value.trim();
  const telefono = document.getElementById('perfilTelefonoInput').value.trim();

  if (!nombres || !apellidos || !correo) {
    alert('Nombres, apellidos y correo son obligatorios');
    return;
  }

  const updatedData = {
    nombres,
    apellidos,
    nombre: `${nombres} ${apellidos}`,
    correo,
    telefono,
    updatedAt: new Date().toISOString()
  };

  db.updateAdmin(currentUser.id, updatedData);
  localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...updatedData }));

  alert('✅ Perfil actualizado correctamente');
  cargarPerfilAdmin();
}

function cargarTestsCreados() {
  console.log("Ejecutando cargarTestsCreados...");
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Current user:", currentUser);
    if (!currentUser) {
      console.error("No hay usuario logueado");
      return;
    }
    const tests = db.getAllCustomTests().filter(t => t.createdByAdminID === currentUser.id);
    console.log("Tests encontrados:", tests.length);
    const container = document.getElementById('testsList');
    console.log("Container testsList:", container);

    if (!container) {
      console.error("No se encontró container testsList");
      return;
    }

  const html = tests.map(test => `
    <div class="test-card floating">
      <h4>${test.nombre}</h4>
      <p>${test.descripcion}</p>
      <p>Tipo: <span class="badge ${test.tipo}">${test.tipo === 'free' ? 'Gratuito' : `Pago S/ ${test.precio}`}</span></p>
      <p>Preguntas: ${test.preguntas.length}</p>
      <div class="test-actions">
        <button class="btn-accessible" onclick="editarTest('${test.id}')">Editar</button>
        <button class="btn-accessible" onclick="eliminarTest('${test.id}')">Eliminar</button>
      </div>
    </div>
  `).join('');

    container.innerHTML = html || '<p>No has creado tests aún.</p>';
    container.style.display = 'block';
    console.log("Tests cargados en container");
  } catch (error) {
    console.error("Error en cargarTestsCreados:", error);
  }
}

function guardarTest(event) {
  event.preventDefault();

  const testId = document.getElementById('testId').value;
  const nombre = document.getElementById('testNombre').value.trim();
  const descripcion = document.getElementById('testDescripcion').value.trim();
  const tipo = document.getElementById('testTipo').value;
  const precio = parseFloat(document.getElementById('testPrecio').value) || 0;

  if (!nombre || !descripcion) {
    alert('Completa nombre y descripción');
    return;
  }

  const questions = [];
  const questionItems = document.querySelectorAll('.question-item');

  questionItems.forEach(item => {
    const pregunta = item.querySelector('.test-question').value.trim();
    const opciones = Array.from(item.querySelectorAll('.test-option')).map(opt => opt.value.trim()).filter(opt => opt);

    if (pregunta && opciones.length >= 2) {
      questions.push({ pregunta, opciones, correcta: null });
    }
  });

  if (questions.length === 0) {
    alert('Agrega al menos una pregunta con opciones');
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (testId) {
    // Actualizar test existente
    const updatedTest = {
      nombre,
      descripcion,
      tipo,
      precio,
      preguntas: questions,
      updatedAt: new Date().toISOString()
    };
    db.updateCustomTest(testId, updatedTest);
    alert('✅ Test actualizado correctamente');
  } else {
    // Crear nuevo test
    const newTest = {
      id: 'test_' + Date.now(),
      nombre,
      descripcion,
      tipo,
      precio,
      preguntas: questions,
      activo: true,
      createdByAdminID: currentUser.id,
      createdAt: new Date().toISOString()
    };
    db.createCustomTest(newTest);
    alert('✅ Test creado correctamente');
  }

  limpiarFormularioTest();
  cargarTestsCreados();
}

function limpiarFormularioTest() {
  document.getElementById('testId').value = '';
  document.getElementById('testNombre').value = '';
  document.getElementById('testDescripcion').value = '';
  document.getElementById('testTipo').value = 'free';
  document.getElementById('testPrecio').value = '0';
  document.getElementById('questionsContainer').innerHTML = `
    <div class="question-item">
      <input type="text" placeholder="Pregunta 1" class="test-question" required>
      <input type="text" placeholder="Opción 1" class="test-option" required>
      <input type="text" placeholder="Opción 2" class="test-option" required>
      <input type="text" placeholder="Opción 3" class="test-option" required>
      <input type="text" placeholder="Opción 4" class="test-option" required>
    </div>
  `;
  document.getElementById('btnCancelarEdicion').style.display = 'none';
  document.getElementById('crearTestTitulo').textContent = 'Crear nuevo Test';
}

function agregarPreguntaTest() {
  const container = document.getElementById('questionsContainer');
  const questionCount = container.children.length + 1;

  const questionHTML = `
    <div class="question-item">
      <input type="text" placeholder="Pregunta ${questionCount}" class="test-question" required>
      <input type="text" placeholder="Opción 1" class="test-option" required>
      <input type="text" placeholder="Opción 2" class="test-option" required>
      <input type="text" placeholder="Opción 3" class="test-option" required>
      <input type="text" placeholder="Opción 4" class="test-option" required>
      <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', questionHTML);
}

function verHistorialUsuario(dni) {
  const historial = db.getUserTestHistory(dni);
  const pagos = db.getAllPaymentHistory().filter(p => p.userDNI === dni);

  let html = `<h3>Historial de ${dni}</h3>`;

  if (historial.length > 0) {
    html += '<h4>Tests Completados:</h4>' + historial.map(item => `
      <div class="historial-item">
        <strong>${item.testNombre}</strong> - ${new Date(item.completedAt).toLocaleDateString()}
        <br>Resultado: ${item.resultado || 'N/A'}
      </div>
    `).join('');
  }

  if (pagos.length > 0) {
    html += '<h4>Pagos Realizados:</h4>' + pagos.map(pago => `
      <div class="pago-item">
        S/ ${pago.monto} - ${pago.metodo} - ${new Date(pago.fecha).toLocaleDateString()}
      </div>
    `).join('');
  }

  if (historial.length === 0 && pagos.length === 0) {
    html += '<p>No hay actividad registrada.</p>';
  }

  // Mostrar en modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      ${html}
      <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// ==================== INICIALIZACIÓN ====================

// Hacer funciones disponibles globalmente
window.cargarListaAdmins = cargarListaAdmins;
window.cargarHistorialPagos = cargarHistorialPagos;
window.cargarTestsCreados = cargarTestsCreados;
window.cargarPerfilAdmin = cargarPerfilAdmin;
window.cargarListaUsuarios = cargarListaUsuarios;
window.cargarEstadisticasAdmin = cargarEstadisticasAdmin;
window.cargarDashboardAdmin = cargarDashboardAdmin;
window.crearDatosPrueba = crearDatosPrueba;
window.guardarPerfilAdmin = guardarPerfilAdmin;
window.crearNuevoAdmin = crearNuevoAdmin;
window.eliminarAdmin = eliminarAdmin;
window.editarAdmin = editarAdmin;
window.guardarTest = guardarTest;
window.editarTest = editarTest;
window.eliminarTest = eliminarTest;
window.agregarPreguntaTest = agregarPreguntaTest;
window.limpiarFormularioTest = limpiarFormularioTest;
window.verHistorialUsuario = verHistorialUsuario;
window.mostrarPagoLegacy = mostrarPagoLegacy;
window.seleccionarMetodoPago = seleccionarMetodoPago;
window.confirmarPago = confirmarPago;

document.addEventListener('DOMContentLoaded', function() {
  console.log("extensions.js - DOMContentLoaded");
  
  // Inicializar en panel.html
  if (window.location.pathname.includes('panel.html')) {
    crearHistorialFlotante();
    agregarBtnHistorialFlotante();
  }

  // Inicializar en gerente.html
  if (window.location.pathname.includes('gerente.html')) {
    cargarPanelGerente();
  }
  
  // Mejorar accesibilidad en todas las páginas
  mejorarAccesibilidad();
  
  // NOTA: admin.html se inicializa desde su propio script inline en admin.html
});

// Agregar botón para mostrar historial en panel
function agregarBtnHistorialFlotante() {
  const panelDiv = document.querySelector('.plans') || document.querySelector('.dashboard');
  if (!panelDiv || document.getElementById('btnHistorialFlotante')) return;

  const btn = document.createElement('button');
  btn.id = 'btnHistorialFlotante';
  btn.className = 'btn-accessible';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.left = '20px';
  btn.style.zIndex = '900';
  btn.textContent = '📋 Historial';
  btn.onclick = mostrarHistorialFlotante;
  document.body.appendChild(btn);
}

// ==================== OPCIONES DE PAGO MEJORADAS ====================

function mostrarOpcionesPagoModerno() {
  const testActual = localStorage.getItem("testActualSeleccionado");
  if (!testActual) return;

  const test = db.getTestByID(testActual);
  if (!test || test.tipo !== "paid") return;

  const container = document.getElementById("pagoBox");
  if (!container) return;

  container.innerHTML = `
    <div class="floating-modal">
      <h3 style="color: var(--accent-cyan); margin-top: 0;">Elige tu método de pago</h3>
      <p>Monto a pagar: <strong style="color: var(--warning-yellow); font-size: 18px;">S/ ${test.precio.toFixed(2)}</strong></p>
      
      <div id="metodosContainer" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 16px 0;">
        <!-- Se llenará dinámicamente -->
      </div>
      
      <button class="btn-accessible" style="width: 100%; margin-bottom: 8px;" onclick="cerrarPagoModerno()">Cancelar</button>
    </div>
  `;

  const metodosContainer = document.getElementById("metodosContainer");
  const metodos = [
    { id: 'plin', nombre: 'Plin', emoji: '📱' },
    { id: 'yape', nombre: 'Yape', emoji: '📱' },
    { id: 'transferencia', nombre: 'Transferencia', emoji: '🏦' },
    { id: 'tarjeta', nombre: 'Tarjeta', emoji: '💳' }
  ];

  metodosContainer.innerHTML = metodos.map(m => `
    <button style="
      background: rgba(20, 30, 50, 0.6);
      border: 2px solid rgba(6, 182, 212, 0.2);
      color: var(--text-primary);
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
    " onmouseover="this.style.borderColor='var(--accent-cyan)'" 
       onmouseout="this.style.borderColor='rgba(6, 182, 212, 0.2)'"
       onclick="confirmarMetodoPago('${m.id}')">
      <div style="font-size: 24px; margin-bottom: 4px;">${m.emoji}</div>
      <div style="font-size: 12px; font-weight: 600;">${m.nombre}</div>
    </button>
  `).join('');

  container.style.display = 'block';
}

function confirmarMetodoPago(metodo) {
  const testActual = localStorage.getItem("testActualSeleccionado");
  const test = db.getTestByID(testActual);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Registrar pago
  db.recordPayment({
    userDNI: currentUser.dni,
    userName: currentUser.nombre,
    testNombre: test.nombre,
    monto: test.precio,
    metodoPago: metodo,
    estado: "completado",
    detalles: { testId: testActual }
  });

  alert(`✓ Pago de S/ ${test.precio.toFixed(2)} confirmado por ${metodo}`);
  cerrarPagoModerno();
  
  // Continuar con el test
  iniciarTest(testActual, 'paid');
}

function cerrarPagoModerno() {
  const container = document.getElementById("pagoBox");
  if (container) {
    container.style.display = 'none';
  }
}

// ==================== DASHBOARD ADMIN MEJORADO ====================

function cargarDashboardAdmin() {
  try {
    const usuariosDiv = document.getElementById("usuarios");
    const users = db.getAllUsers();

    if (usuariosDiv) {
      const html = users.map(user => `
        <div class="floating-card">
          <h4 style="color: var(--accent-cyan); margin-top: 0;">${user.nombre}</h4>
          <p><small>DNI: ${user.dni}</small></p>
          <p><small>Correo: ${user.correo}</small></p>
          <p><small>Teléfono: ${user.telefono || 'N/A'}</small></p>
          <p><small>Plan: <span class="badge-${user.plan === 'Premium' ? 'warning' : 'success'}">${user.plan}</span></small></p>
        </div>
      `).join("");

      usuariosDiv.innerHTML = html || "<p>Sin usuarios registrados.</p>";

      const stats = db.getUserStats();
      const totalUsersEl = document.getElementById("totalUsers");
      const totalPremiumEl = document.getElementById("totalPremium");
      const totalGratisEl = document.getElementById("totalGratis");

      if (totalUsersEl) totalUsersEl.innerText = stats.total;
      if (totalPremiumEl) totalPremiumEl.innerText = stats.premium;
      if (totalGratisEl) totalGratisEl.innerText = stats.gratis;
    }
  } catch (error) {
    console.error("Error en cargarDashboardAdmin:", error);
  }
}

function cargarEstadisticasAdmin() {
  const stats = {
    totalUsers: db.getAllUsers().length,
    totalAdmins: db.getAllAdmins().filter(a => a.rol === 'admin').length,
    totalGerentes: db.getAllAdmins().filter(a => a.rol === 'gerente').length,
    totalTests: db.getAllCustomTests().length,
    testsCompletados: db.getAllTestHistory().length,
    ingresosTotales: db.getAllPaymentHistory().reduce((sum, p) => sum + p.monto, 0)
  };

  return stats;
}

// ==================== VALIDACIONES Y UTILIDADES ====================

function validarDNI(dni) {
  return /^[0-9]{8}$/.test(dni);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatearMonto(monto) {
  return `S/ ${parseFloat(monto).toFixed(2)}`;
}

// ==================== SINCRONIZACIÓN Y BACKUP ====================

function exportarDatos() {
  const datos = {
    users: db.getAllUsers(),
    admins: db.getAllAdmins(),
    tests: db.getAllCustomTests(),
    historial: db.getAllTestHistory(),
    pagos: db.getAllPaymentHistory(),
    timestamp: new Date().toISOString()
  };

  const json = JSON.stringify(datos, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `qyvara-backup-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importarDatos(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const datos = JSON.parse(e.target.result);
      localStorage.setItem('users', JSON.stringify(datos.users || []));
      localStorage.setItem('admins', JSON.stringify(datos.admins || []));
      localStorage.setItem('customTests', JSON.stringify(datos.tests || []));
      localStorage.setItem('testHistory', JSON.stringify(datos.historial || []));
      localStorage.setItem('paymentHistory', JSON.stringify(datos.pagos || []));
      alert("✓ Datos importados correctamente");
      location.reload();
    } catch (error) {
      alert("❌ Error al importar: " + error.message);
    }
  };
  reader.readAsText(file);
}

// ==================== INICIALIZACIÓN AUTOMÁTICA ====================

function mejorarAccesibilidad() {
  // Hacer que el texto sea visible cuando hay fondo blanco
  const elementos = document.querySelectorAll('*');
  elementos.forEach(el => {
    const bg = window.getComputedStyle(el).backgroundColor;
    if (bg.includes('255, 255, 255') || bg.includes('rgb(255') || bg === 'white') {
      el.classList.add('bg-light-for-text');
    }
  });
}
