# 🚀 Guía de Deployment a la Nube - QYVARA

## 📌 Descripción del Reto

Tu pregunta menciona: *"si quiero subir a la nube y esos cambios que se realicen debo agregar un BD o solo puede hacer así"*

**Respuesta:** Para subir a la nube con persistencia real, **NECESITAS una base de datos en el servidor**. Aquí te muestro cómo hacerlo.

---

## 🔄 Arquitectura Actual vs. Arquitectura en Nube

### **Arquitectura Actual (localStorage)**
```
Navegador
    ↓
localStorage (JSON)
    ↓
Limitado a 5-10 MB
No sincroniza entre dispositivos
Datos se pierden al limpiar caché
```

### **Arquitectura en Nube (Recomendada)**
```
Cliente (HTML/CSS/JS)
    ↓
API REST (Node.js/Express)
    ↓
Base de Datos (PostgreSQL/MongoDB)
    ↓
Servidor en Nube (Heroku/Render/AWS)
    ↓
Acceso desde cualquier dispositivo
Datos persistentes y seguros
```

---

## 🛠️ Pasos para Migrar a la Nube

### **Paso 1: Preparar el Backend (Node.js + Express)**

Crea carpeta `backend/`:

```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv body-parser mongoose
```

Crea `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/qyvara';
mongoose.connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log('✓ BD conectada'))
  .catch(err => console.log('✗ Error:', err));

// Modelos
const userSchema = new mongoose.Schema({
  dni: { type: String, unique: true, required: true },
  nombre: String,
  correo: String,
  password: String,
  telefono: String,
  ciudad: String,
  idioma: String,
  plan: String,
  area: String,
  carrera: String,
  createdAt: { type: Date, default: Date.now }
});

const testSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  tipo: { type: String, enum: ['free', 'paid'] },
  precio: Number,
  preguntas: Array,
  createdByAdminID: String,
  activo: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Test = mongoose.model('Test', testSchema);

// Rutas CRUD Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/users/:dni', async (req, res) => {
  try {
    const user = await User.findOne({ dni: req.params.dni });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.put('/api/users/:dni', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ dni: req.params.dni }, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rutas CRUD Tests
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.find({ activo: true });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tests', async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Servidor en puerto ${PORT}`);
});
```

---

### **Paso 2: Crear `.env`**

```
MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/qyvara?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

---

### **Paso 3: Actualizar Frontend para usar API**

Crea `js/api.js`:

```javascript
const API_URL = process.env.API_URL || 'http://localhost:5000/api';

class QYVARAAPI {
  // Users
  static async getUsers() {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  }

  static async getUser(dni) {
    const res = await fetch(`${API_URL}/users/${dni}`);
    return res.json();
  }

  static async createUser(userData) {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  }

  static async updateUser(dni, userData) {
    const res = await fetch(`${API_URL}/users/${dni}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  }

  // Tests
  static async getTests() {
    const res = await fetch(`${API_URL}/tests`);
    return res.json();
  }

  static async createTest(testData) {
    const res = await fetch(`${API_URL}/tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    return res.json();
  }

  // Health check
  static async checkHealth() {
    const res = await fetch(`${API_URL}/health`);
    return res.json();
  }
}
```

---

## 🚀 Opciones de Hosting

### **Opción 1: Render.com (RECOMENDADO - Fácil)**

1. **Crear cuenta:** https://render.com
2. **Conectar repositorio Git**
3. **Crear Web Service:**
   - Runtime: Node
   - Build: `npm install`
   - Start: `node backend/server.js`
4. **Variables de entorno:** Agregar `MONGO_URL`
5. **Deploy automático** al pushear a GitHub

**Ventajas:**
- Gratis con límites
- Fácil de configurar
- HTTPS automático

---

### **Opción 2: Heroku (Alternativa)**

```bash
npm install -g heroku
heroku login
heroku create tu-app-qyvara
git push heroku main
```

---

### **Opción 3: Vercel (Frontend) + API externa**

**Frontend en Vercel:**
```bash
npm install -g vercel
vercel
```

**Backend en Render/Heroku**

---

### **Opción 4: AWS (Completo pero complejo)**

- EC2 para servidor
- RDS para base de datos
- S3 para archivos (fotos)
- CloudFront para CDN

---

## 🗄️ Bases de Datos en la Nube

### **MongoDB Atlas (Recomendado para proyecto)**

1. **Crear cuenta:** https://www.mongodb.com/cloud/atlas
2. **Crear cluster** (Free tier disponible)
3. **Obtener connection string:**
   ```
   mongodb+srv://usuario:pass@cluster.mongodb.net/qyvara
   ```
4. **Agregar a `.env`**

### **PostgreSQL (Alternativa)**

**Usando ElephantSQL o Supabase:**

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 📋 Checklist de Deploying

- [ ] Backend creado con Express
- [ ] Modelos de base de datos definidos
- [ ] Rutas CRUD implementadas
- [ ] `.env` configurado
- [ ] Frontend actualizado para usar API
- [ ] Repositorio Git creado
- [ ] Base de datos en la nube configurada
- [ ] Hosting seleccionado y configurado
- [ ] Variables de entorno en el servidor
- [ ] Pruebas de endpoints
- [ ] HTTPS habilitado
- [ ] CORS configurado correctamente

---

## 🔐 Seguridad para Producción

### **1. Hash de Contraseñas**

```javascript
const bcrypt = require('bcrypt');

// Guardar
const hashedPass = await bcrypt.hash(password, 10);

// Verificar
const isValid = await bcrypt.compare(password, hashedPassword);
```

### **2. JWT para Autenticación**

```javascript
const jwt = require('jsonwebtoken');

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ dni: req.body.dni });
  
  if (!user || !await bcrypt.compare(req.body.password, user.password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Middleware para proteger rutas
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token requerido' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
}

app.get('/api/profile', verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});
```

### **3. Validación de Datos**

```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/users',
  body('dni').isLength({ min: 8, max: 8 }).isNumeric(),
  body('correo').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Continuar...
  }
);
```

---

## 📊 Estructura Final del Proyecto

```
qyvara/
├── frontend/                    # Los archivos HTML/CSS/JS actuales
│   ├── index.html
│   ├── login.html
│   ├── js/
│   │   ├── app_new.js
│   │   ├── database.js (MODIFICADO)
│   │   └── api.js              # NUEVO
│   └── css/
│
├── backend/                     # NUEVO
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   └── Test.js
│   ├── routes/
│   │   ├── users.js
│   │   └── tests.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

## 🎯 Conclusión

**Para producción con persistencia real:**

1. **Necesitas un servidor** (Node.js/Express recomendado)
2. **Necesitas una base de datos** (MongoDB o PostgreSQL)
3. **Necesitas hosting** (Render, Heroku, AWS, etc.)
4. **Necesitas un dominio** (opcional pero recomendado)
5. **Necesitas HTTPS** (todos los hosting lo incluyen)

**Inversión:** $0-20/mes en hosting + $0-20/mes en base de datos

---

## 📞 Referencias

- **Render:** https://render.com
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Node.js:** https://nodejs.org
- **Express:** https://expressjs.com
- **Bcrypt:** https://www.npmjs.com/package/bcrypt
- **JWT:** https://www.npmjs.com/package/jsonwebtoken

---

Versión: 1.0  
Última actualización: 2026
