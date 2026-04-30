/**
 * SISTEMA DE BASE DE DATOS QYVARA
 * Maneja almacenamiento persistente con localStorage
 * Estructura de datos documentada
 */

class QyvDatabase {
  constructor() {
    this.initializeDatabase();
  }

  /**
   * Inicializa la base de datos con datos por defecto y asegura el admin principal
   */
  initializeDatabase() {
    // Usuarios
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    // Administradores (incluyendo gerentes)
    let admins = [];
    if (!localStorage.getItem("admins")) {
      admins = [];
    } else {
      admins = JSON.parse(localStorage.getItem("admins"));
    }
    // Buscar admin principal
    let adminIndex = admins.findIndex(a => a.dni === "admin" || a.correo === "admin@qyvara.com");
    const adminDefault = {
      id: "admin_default",
      dni: "admin",
      nombre: "Administrador",
      apellidos: "Sistema",
      correo: "admin@qyvara.com",
      password: "admin123",
      rol: "admin",
      foto: null,
      telefono: null,
      departamento: null,
      createdAt: new Date().toISOString()
    };
    if (adminIndex === -1) {
      admins.unshift(adminDefault);
    } else {
      // Actualizar datos críticos del admin principal
      admins[adminIndex] = {
        ...admins[adminIndex],
        ...adminDefault,
        id: admins[adminIndex].id || "admin_default",
        createdAt: admins[adminIndex].createdAt || new Date().toISOString()
      };
    }
    localStorage.setItem("admins", JSON.stringify(admins));

    // Tests personalizados
    if (!localStorage.getItem("customTests")) {
      localStorage.setItem("customTests", JSON.stringify([]));
    }

    // Historial de tests
    if (!localStorage.getItem("testHistory")) {
      localStorage.setItem("testHistory", JSON.stringify([]));
    }

    // Historial de pagos
    if (!localStorage.getItem("paymentHistory")) {
      localStorage.setItem("paymentHistory", JSON.stringify([]));
    }

    // Perfiles de gerentes
    if (!localStorage.getItem("gerentesProfiles")) {
      localStorage.setItem("gerentesProfiles", JSON.stringify({}));
    }
  }

  // ==================== USUARIOS ====================

  /**
   * Obtiene todos los usuarios
   */
  getAllUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  /**
   * Obtiene un usuario por DNI
   */
  getUserByDNI(dni) {
    const users = this.getAllUsers();
    return users.find(u => u.dni === dni);
  }

  /**
   * Crea un nuevo usuario
   */
  createUser(userData) {
    const users = this.getAllUsers();
    const newUser = {
      dni: userData.dni,
      nombre: userData.nombre,
      telefono: userData.telefono,
      correo: userData.correo,
      ciudad: userData.ciudad,
      idioma: userData.idioma,
      password: userData.password,
      plan: "Sin test",
      area: "Sin resultado",
      carrera: "Sin resultado",
      porcentaje: 0,
      historial: [],
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return newUser;
  }

  /**
   * Actualiza datos de usuario
   */
  updateUser(dni, updatedData) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.dni === dni);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      localStorage.setItem("users", JSON.stringify(users));
      return users[index];
    }
    return null;
  }

  // ==================== ADMINISTRADORES ====================

  /**
   * Obtiene todos los administradores (incluyendo gerentes)
   */
  getAllAdmins() {
    return JSON.parse(localStorage.getItem("admins")) || [];
  }

  /**
   * Crea un nuevo administrador o gerente
   */
  createAdmin(adminData) {
    const admins = this.getAllAdmins();
    const newAdmin = {
      id: `admin_${Date.now()}`,
      dni: adminData.dni,
      nombre: adminData.nombre,
      apellidos: adminData.apellidos,
      correo: adminData.correo,
      password: adminData.dni, // Contraseña por defecto es el DNI
      rol: adminData.rol || "gerente", // admin o gerente
      foto: null,
      telefono: adminData.telefono || null,
      departamento: adminData.departamento || null,
      perfilActualizado: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    admins.push(newAdmin);
    localStorage.setItem("admins", JSON.stringify(admins));
    return newAdmin;
  }

  /**
   * Obtiene un administrador por DNI o correo
   * Permite login con DNI o correo
   */
  getAdminByDNI(dniOrCorreo) {
    const admins = this.getAllAdmins();
    return admins.find(a => a.dni === dniOrCorreo || a.correo === dniOrCorreo);
  }

  /**
   * Obtiene un administrador por ID
   */
  getAdminByID(id) {
    const admins = this.getAllAdmins();
    return admins.find(a => a.id === id);
  }

  /**
   * Actualiza datos de administrador
   */
  updateAdmin(adminID, updatedData) {
    const admins = this.getAllAdmins();
    const index = admins.findIndex(a => a.id === adminID);
    if (index !== -1) {
      admins[index] = {
        ...admins[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem("admins", JSON.stringify(admins));
      return admins[index];
    }
    return null;
  }

  /**
   * Elimina un administrador
   */
  deleteAdmin(adminID) {
    let admins = this.getAllAdmins();
    admins = admins.filter(a => a.id !== adminID);
    localStorage.setItem("admins", JSON.stringify(admins));
  }

  /**
   * Guarda foto de perfil de gerente (base64)
   */
  saveGerenteFoto(adminID, fotoBase64) {
    const gerentesProfiles = JSON.parse(localStorage.getItem("gerentesProfiles")) || {};
    if (!gerentesProfiles[adminID]) {
      gerentesProfiles[adminID] = {};
    }
    gerentesProfiles[adminID].foto = fotoBase64;
    gerentesProfiles[adminID].updatedAt = new Date().toISOString();
    localStorage.setItem("gerentesProfiles", JSON.stringify(gerentesProfiles));
  }

  /**
   * Obtiene foto de gerente
   */
  getGerenteFoto(adminID) {
    const gerentesProfiles = JSON.parse(localStorage.getItem("gerentesProfiles")) || {};
    return gerentesProfiles[adminID]?.foto || null;
  }

  // ==================== TESTS PERSONALIZADOS ====================

  /**
   * Obtiene todos los tests personalizados
   */
  getAllCustomTests() {
    return JSON.parse(localStorage.getItem("customTests")) || [];
  }

  /**
   * Obtiene tests por estado (all, free, paid)
   */
  getTestsByType(type = "all") {
    const tests = this.getAllCustomTests();
    if (type === "free") return tests.filter(t => t.tipo === "free");
    if (type === "paid") return tests.filter(t => t.tipo === "paid");
    return tests;
  }

  /**
   * Crea un nuevo test personalizado
   */
  createCustomTest(testData, createdByAdminID) {
    const tests = this.getAllCustomTests();
    const newTest = {
      id: `test_${Date.now()}`,
      nombre: testData.nombre,
      descripcion: testData.descripcion,
      tipo: testData.tipo, // "free" o "paid"
      precio: testData.tipo === "paid" ? testData.precio : 0,
      preguntas: testData.preguntas || [],
      createdByAdminID: createdByAdminID,
      activo: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tests.push(newTest);
    localStorage.setItem("customTests", JSON.stringify(tests));
    return newTest;
  }

  /**
   * Obtiene un test por ID
   */
  getTestByID(testID) {
    const tests = this.getAllCustomTests();
    return tests.find(t => t.id === testID);
  }

  /**
   * Actualiza un test
   */
  updateCustomTest(testID, updatedData) {
    const tests = this.getAllCustomTests();
    const index = tests.findIndex(t => t.id === testID);
    if (index !== -1) {
      tests[index] = {
        ...tests[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem("customTests", JSON.stringify(tests));
      return tests[index];
    }
    return null;
  }

  /**
   * Elimina un test
   */
  deleteCustomTest(testID) {
    let tests = this.getAllCustomTests();
    tests = tests.filter(t => t.id !== testID);
    localStorage.setItem("customTests", JSON.stringify(tests));
  }

  // ==================== HISTORIAL DE TESTS ====================

  /**
   * Obtiene el historial de tests de un usuario
   */
  getUserTestHistory(userDNI) {
    const history = JSON.parse(localStorage.getItem("testHistory")) || [];
    return history.filter(h => h.userDNI === userDNI);
  }

  /**
   * Agrega un registro al historial de tests
   */
  addTestToHistory(userDNI, testData) {
    const history = JSON.parse(localStorage.getItem("testHistory")) || [];
    const record = {
      id: `history_${Date.now()}`,
      userDNI: userDNI,
      testID: testData.testID,
      testNombre: testData.testNombre,
      testTipo: testData.testTipo, // "free" o "paid"
      resultado: testData.resultado || null,
      area: testData.area || null,
      carrera: testData.carrera || null,
      porcentaje: testData.porcentaje || 0,
      metodoPago: testData.metodoPago || null, // Para tests pagos
      metodoPagoDetalles: testData.metodoPagoDetalles || null,
      completedAt: new Date().toISOString()
    };
    history.push(record);
    localStorage.setItem("testHistory", JSON.stringify(history));
    return record;
  }

  /**
   * Obtiene el historial de todos los tests
   */
  getAllTestHistory() {
    return JSON.parse(localStorage.getItem("testHistory")) || [];
  }

  // ==================== HISTORIAL DE PAGOS ====================

  /**
   * Registra un pago
   */
  recordPayment(paymentData) {
    const payments = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    const record = {
      id: `payment_${Date.now()}`,
      userDNI: paymentData.userDNI,
      userName: paymentData.userName,
      testNombre: paymentData.testNombre,
      monto: paymentData.monto,
      metodoPago: paymentData.metodoPago,
      estado: paymentData.estado || "completado", // completado, pendiente
      detalles: paymentData.detalles || {},
      timestamp: new Date().toISOString()
    };
    payments.push(record);
    localStorage.setItem("paymentHistory", JSON.stringify(payments));
    return record;
  }

  /**
   * Obtiene historial de pagos de un usuario
   */
  getUserPaymentHistory(userDNI) {
    const payments = JSON.parse(localStorage.getItem("paymentHistory")) || [];
    return payments.filter(p => p.userDNI === userDNI);
  }

  /**
   * Obtiene todo el historial de pagos (para admin)
   */
  getAllPaymentHistory() {
    return JSON.parse(localStorage.getItem("paymentHistory")) || [];
  }

  // ==================== ESTADÍSTICAS ====================

  /**
   * Obtiene estadísticas de usuarios
   */
  getUserStats() {
    const users = this.getAllUsers();
    return {
      total: users.length,
      premium: users.filter(u => u.plan === "Premium").length,
      gratis: users.filter(u => u.plan === "Gratis" || u.plan === "Sin test").length
    };
  }

  /**
   * Obtiene estadísticas de pagos
   */
  getPaymentStats() {
    const payments = this.getAllPaymentHistory();
    const total = payments.reduce((sum, p) => sum + p.monto, 0);
    return {
      totalTransacciones: payments.length,
      montoTotal: total,
      montoPromedio: payments.length > 0 ? total / payments.length : 0
    };
  }

  /**
   * Limpia toda la base de datos (SOLO PARA DESARROLLO)
   */
  clearDatabase() {
    localStorage.clear();
    this.initializeDatabase();
  }
}

// Instancia global
const db = new QyvDatabase();
