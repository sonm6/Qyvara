/**
 * API CLIENT para QYVARA
 * Maneja comunicación con el servidor y sincronización local
 * Usa localStorage como fallback
 */

class QyvaraAPI {
  constructor() {
    this.apiBase = 'http://localhost:3000/api'; // Cambiar según producción
    this.useLocal = true; // Usar localStorage mientras no hay servidor
    this.db = new QyvDatabase();
  }

  /**
   * LOGIN - Usuarios y Admins
   */
  async login(usuario, password) {
    try {
      if (this.useLocal) {
        // Verificar admin
        const admin = this.db.getAdminByDNI(usuario);
        if (admin && admin.password === password) {
          return { type: 'admin', rol: admin.rol, user: admin };
        }

        // Verificar usuario
        const user = this.db.getUserByDNI(usuario);
        if (user && user.password === password) {
          return { type: 'user', user: user };
        }

        throw new Error('Credenciales inválidas');
      }

      // Con servidor
      const response = await fetch(`${this.apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });

      if (!response.ok) throw new Error('Error en login');
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  /**
   * USUARIOS
   */
  async crearUsuario(userData) {
    if (this.useLocal) {
      return this.db.createUser(userData);
    }

    const response = await fetch(`${this.apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    return response.json();
  }

  async obtenerUsuarios() {
    if (this.useLocal) {
      return this.db.getAllUsers();
    }

    const response = await fetch(`${this.apiBase}/users`);
    return response.json();
  }

  async actualizarUsuario(dni, userData) {
    if (this.useLocal) {
      return this.db.updateUser(dni, userData);
    }

    const response = await fetch(`${this.apiBase}/users/${dni}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    return response.json();
  }

  /**
   * ADMINISTRADORES
   */
  async crearAdmin(adminData) {
    if (this.useLocal) {
      return this.db.createAdmin(adminData);
    }

    const response = await fetch(`${this.apiBase}/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    });

    return response.json();
  }

  async obtenerAdmins() {
    if (this.useLocal) {
      return this.db.getAllAdmins();
    }

    const response = await fetch(`${this.apiBase}/admins`);
    return response.json();
  }

  async actualizarAdmin(adminId, adminData) {
    if (this.useLocal) {
      return this.db.updateAdmin(adminId, adminData);
    }

    const response = await fetch(`${this.apiBase}/admins/${adminId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    });

    return response.json();
  }

  /**
   * TESTS
   */
  async crearTest(testData, adminId) {
    if (this.useLocal) {
      return this.db.createCustomTest(testData, adminId);
    }

    const response = await fetch(`${this.apiBase}/tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...testData, createdByAdminId: adminId })
    });

    return response.json();
  }

  async obtenerTests() {
    if (this.useLocal) {
      return this.db.getAllCustomTests();
    }

    const response = await fetch(`${this.apiBase}/tests`);
    return response.json();
  }

  async actualizarTest(testId, testData) {
    if (this.useLocal) {
      return this.db.updateCustomTest(testId, testData);
    }

    const response = await fetch(`${this.apiBase}/tests/${testId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    return response.json();
  }

  async eliminarTest(testId) {
    if (this.useLocal) {
      return this.db.deleteCustomTest(testId);
    }

    const response = await fetch(`${this.apiBase}/tests/${testId}`, {
      method: 'DELETE'
    });

    return response.json();
  }

  /**
   * ESTADÍSTICAS
   */
  async obtenerEstadisticas(adminId) {
    if (this.useLocal) {
      const usuarios = this.db.getAllUsers();
      const tests = this.db.getAllCustomTests();
      const historial = JSON.parse(localStorage.getItem('testHistory')) || [];

      return {
        totalUsers: usuarios.length,
        totalTests: tests.length,
        totalTestsCompleted: historial.length,
        timestamp: new Date().toISOString()
      };
    }

    const response = await fetch(`${this.apiBase}/stats/admin/${adminId}`);
    return response.json();
  }

  /**
   * HISTORIAL
   */
  async registrarTestCompletado(userDNI, testId, resultado, metodo_pago) {
    const record = {
      userDNI,
      testId,
      resultado,
      metodo_pago: metodo_pago || 'gratuito',
      completedAt: new Date().toISOString()
    };

    if (this.useLocal) {
      let historial = JSON.parse(localStorage.getItem('testHistory')) || [];
      historial.push(record);
      localStorage.setItem('testHistory', JSON.stringify(historial));
      return record;
    }

    const response = await fetch(`${this.apiBase}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });

    return response.json();
  }

  /**
   * FOTO DE GERENTE
   */
  async guardarFotoGerente(adminId, fotoBase64) {
    if (this.useLocal) {
      this.db.saveGerenteFoto(adminId, fotoBase64);
      return { success: true };
    }

    const response = await fetch(`${this.apiBase}/admins/${adminId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foto: fotoBase64 })
    });

    return response.json();
  }

  /**
   * SINCRONIZACIÓN (futuro)
   */
  async sincronizar() {
    console.log('🔄 Sincronizando datos...');
    // Aquí irán las funciones para sincronizar con el servidor
  }
}

// Instancia global
const api = new QyvaraAPI();
