# QYVARA - Sistema de Orientación Vocacional Bilingüe

## 📋 Descripción General

QYVARA es una plataforma web de orientación vocacional que proporciona tests para guiar a estudiantes en la elección de sus carreras profesionales. La plataforma está diseñada para ser bilingüe (Español/Quechua) y cuenta con un sistema de administración completo.

---

## 🏗️ Arquitectura del Sistema

### **Niveles de Usuario**

1. **Usuarios Normales**: Pueden realizar tests gratuitos y pagos
2. **Gerentes**: Pueden crear tests personalizados y gestionar su perfil
3. **Administradores**: Pueden gestionar la plataforma completa

---

## 📁 Estructura de Carpetas

```
QYVARA/
├── index.html                  # Página de inicio
├── login.html                  # Página de login
├── registro.html               # Página de registro
├── panel.html                  # Panel de usuario
├── admin.html                  # Panel de administrador
├── gerente.html                # Panel de gerente
│
├── css/
│   ├── style.css               # Estilos principales
│   └── improvements.css        # Estilos mejorados y responsive
│
├── js/
│   ├── database.js             # Sistema de base de datos (localStorage)
│   └── app_new.js              # Lógica principal de la aplicación
│
└── assets/
    ├── logo.png                # Logo de la aplicación
    └── pago.jpeg               # Código QR para pagos
```

---

## 💾 Sistema de Base de Datos (localStorage)

### **Estructura de Datos**

#### **1. Users** (`users`)
```javascript
{
  dni: string,                     // ID único (8 dígitos)
  nombre: string,
  telefono: string,
  correo: string,
  ciudad: string,
  idioma: string,                  // "es" o "qu"
  password: string,
  plan: string,                    // "Sin test", "Premium", etc.
  area: string,                    // Área vocacional determinada
  carrera: string,                 // Carrera recomendada
  porcentaje: number,              // % de compatibilidad
  historial: array,                // Historial de tests
  createdAt: ISO8601 timestamp
}
```

#### **2. Admins** (`admins`)
```javascript
{
  id: string,                      // ID único generado
  dni: string,
  nombre: string,
  apellidos: string,
  correo: string,
  password: string,                // Por defecto = DNI
  rol: string,                     // "admin" o "gerente"
  foto: base64 string,             // Foto de perfil (nullable)
  telefono: string,
  departamento: string,
  perfilActualizado: boolean,
  createdAt: ISO8601 timestamp,
  updatedAt: ISO8601 timestamp
}
```

#### **3. Custom Tests** (`customTests`)
```javascript
{
  id: string,                      // Ej: "test_1234567890"
  nombre: string,
  descripcion: string,
  tipo: string,                    // "free" o "paid"
  precio: number,                  // 0 si es gratuito
  preguntas: array,                // Array de objetos pregunta
  createdByAdminID: string,        // ID del gerente creador
  activo: boolean,
  createdAt: ISO8601 timestamp,
  updatedAt: ISO8601 timestamp
}
```

**Estructura de Pregunta:**
```javascript
{
  texto: string,
  opciones: array  // ["Opción A", "Opción B", "Opción C", "Opción D"]
}
```

#### **4. Test History** (`testHistory`)
```javascript
{
  id: string,
  userDNI: string,
  testID: string,
  testNombre: string,
  testTipo: string,                // "free" o "paid"
  resultado: string,               // Área ganadora
  area: string,
  carrera: string,                 // Carrera principal recomendada
  porcentaje: number,              // % de compatibilidad
  metodoPago: string,              // Ej: "plin", "yape", "tarjeta"
  metodoPagoDetalles: object,      // Detalles del pago
  completedAt: ISO8601 timestamp
}
```

#### **5. Payment History** (`paymentHistory`)
```javascript
{
  id: string,
  userDNI: string,
  userName: string,
  testNombre: string,
  monto: number,
  metodoPago: string,              // "plin", "yape", "transferencia", "tarjeta"
  estado: string,                  // "completado", "pendiente"
  detalles: object,                // Detalles del pago
  timestamp: ISO8601 timestamp
}
```

#### **6. Gerentes Profiles** (`gerentesProfiles`)
```javascript
{
  [adminID]: {
    foto: base64 string,           // Foto guardada
    updatedAt: ISO8601 timestamp
  }
}
```

---

## 🔐 Sistema de Autenticación

### **Login**

**Usuarios Normales:**
- DNI (8 dígitos) + Contraseña
- Redirige a `panel.html`

**Administradores/Gerentes:**
- DNI + Contraseña (por defecto = DNI)
- Admin → `admin.html`
- Gerente → `gerente.html`

**Admin por Defecto:**
- DNI: `admin`
- Contraseña: `admin123`

---

## 📊 Funcionalidades por Rol

### **1. Usuario Normal**

✅ Crear cuenta con validación  
✅ Realizar tests gratuitos  
✅ Realizar tests pagos (Plin, Yape, Transferencia, Tarjeta)  
✅ Ver resultados vocacionales  
✅ Ver historial de tests en modal flotante  
✅ Cambiar idioma (ES/QU)  

### **2. Gerente**

✅ Editar perfil (nombre, correo, teléfono, departamento)  
✅ Cambiar contraseña  
✅ Subir/cambiar foto de perfil  
✅ Crear tests personalizados (gratuitos/pagos)  
✅ Especificar precio para tests pagos  
✅ Ver estadísticas de tests creados  
✅ Ver historial de tests realizados por usuarios  
✅ Ver ingresos por pagos  
✅ Eliminar tests propios  

### **3. Administrador**

✅ Ver lista de usuarios registrados  
✅ Ver estadísticas (Total, Premium, Gratis)  
✅ Ver historial de pagos  
✅ Crear nuevos administradores/gerentes  
✅ Ver lista de administradores  
✅ Gestionar tests del sistema  
✅ Editar perfil  

---

## 🧪 Estructura de Tests

### **Tests Predeterminados**
- **Test Gratuito**: 5 preguntas
- **Test Premium**: 5 + 6 preguntas = 11 preguntas totales

### **Áreas Vocacionales**
1. Tecnología
2. Salud
3. Negocios
4. Arte y Comunicación

### **Carreras por Área**
```javascript
{
  "Tecnología": ["Ingeniería de Sistemas", "Ingeniería de Software", "Computación", "Soporte Técnico"],
  "Salud": ["Enfermería", "Psicología", "Técnica en Farmacia", "Laboratorio Clínico"],
  "Negocios": ["Administración", "Contabilidad", "Marketing", "Administración Bancaria"],
  "Arte y Comunicación": ["Diseño Gráfico", "Comunicación Audiovisual", "Publicidad", "Diseño Digital"]
}
```

---

## 💳 Métodos de Pago

1. **Plin** - Billetera digital
2. **Yape** - Billetera digital  
3. **Transferencia** - Banco de la Nación / BCP
4. **Tarjeta** - Visa / Mastercard

---

## 🎨 Diseño y Contraste

### **Colores Principales**
- **Fondo oscuro**: #041923
- **Azul cian**: #00d4ff
- **Naranja**: #f5b942
- **Texto claro**: #ffffff (en fondos oscuros)
- **Texto oscuro**: #1a1a1a (en fondos claros)

### **Regla de Contraste**
- ✅ Texto **NEGRO** en fondos **BLANCOS**
- ✅ Texto **BLANCO** en fondos **OSCUROS**
- Implementado en `css/improvements.css`

---

## 📱 Responsividad

- Diseño mobile-first
- Historial flotante adaptable
- Modales responsive
- Grillas CSS flexibles

---

## 🌍 Multiidioma

**Soportados:**
- Español (es)
- Quechua (qu)

Implementado mediante objeto `textos` en `app_new.js`

---

## 🚀 Guía de Uso

### **Para Desarrolladores**

1. **Inicializar BD:**
   ```javascript
   db.initializeDatabase();
   ```

2. **Crear usuario:**
   ```javascript
   db.createUser({
     dni: "12345678",
     nombre: "Juan Pérez",
     telefono: "987654321",
     correo: "juan@ejemplo.com",
     ciudad: "Lima",
     idioma: "es",
     password: "password123"
   });
   ```

3. **Crear test personalizado:**
   ```javascript
   db.createCustomTest({
     nombre: "Test de Programación",
     descripcion: "Determina tu nivel en programación",
     tipo: "free", // o "paid"
     precio: 50,   // si es paid
     preguntas: [
       {
         texto: "¿Qué lenguaje prefieres?",
         opciones: ["Python", "JavaScript", "Java", "C++"]
       }
     ]
   }, adminID);
   ```

4. **Guardar resultado:**
   ```javascript
   db.addTestToHistory(userDNI, {
     testID: testID,
     testNombre: "Test Demo",
     testTipo: "free",
     resultado: "Tecnología",
     area: "Tecnología",
     carrera: "Ingeniería de Software",
     porcentaje: 85
   });
   ```

---

## 🔄 Flujo de Datos

```
Usuario registra → Login → Panel
                  → Tests disponibles
                  → Selecciona test
                  → Si es pago → Selecciona método de pago
                  → Realiza test
                  → Resultado guardado en historial
                  → Puede ver historial flotante
```

---

## 📝 Notas Importantes

### **Persistencia de Datos**
- Todos los datos se guardan en `localStorage`
- No requiere servidor backend
- Los datos persisten en el navegador hasta limpiar el caché

### **Limitaciones Actuales**
- localStorage tiene límite de ~5-10MB
- No hay sincronización entre dispositivos
- Datos se pierden si el usuario limpia el caché

### **Para Producción (Recomendaciones)**

1. **Implementar Backend:**
   - Node.js + Express
   - Base de datos (PostgreSQL, MongoDB)
   - API REST

2. **Sistema de Seguridad:**
   - Hash de contraseñas (bcrypt)
   - JWT para autenticación
   - CORS configurado

3. **Métodos de Pago Real:**
   - Integrar con pasarelas (Stripe, PayPal, Mercado Pago)
   - Verificación de pagos

4. **Almacenamiento de Archivos:**
   - Cloud storage (AWS S3, Google Cloud Storage)
   - Para fotos de perfil

---

## 📚 Archivos Clave

### **database.js** - 450+ líneas
Gestiona toda la lógica de almacenamiento con métodos:
- `getAllUsers()` / `createUser()`
- `getAllAdmins()` / `createAdmin()`
- `getAllCustomTests()` / `createCustomTest()`
- `addTestToHistory()` / `getUserTestHistory()`
- `recordPayment()` / `getAllPaymentHistory()`

### **app_new.js** - 1400+ líneas
Contiene:
- Sistema de traducciones (bilingüe)
- Preguntas de tests
- Funciones de autenticación
- Lógica de tests
- Panel de administración
- Historial flotante
- Métodos de pago

### **improvements.css** - 400+ líneas
Estilos para:
- Contraste de texto
- Modal flotante de historial
- Perfil de gerente
- Respons responsividad
- Animaciones suaves

---

## 🐛 Troubleshooting

### Problema: Los datos no se guardan
**Solución:** Verificar que el navegador permita localStorage

### Problema: Historiales no aparecen
**Solución:** Ejecutar `mostrarHistorialFlotante()` después de iniciar sesión

### Problema: Contraseña de admin no funciona
**Solución:** La contraseña por defecto de admins es su DNI

---

## 📞 Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.

---

## 📄 Licencia

Desarrollado para QYVARA - Orientación Vocacional Bilingüe

Versión: 1.0  
Última actualización: 2026
