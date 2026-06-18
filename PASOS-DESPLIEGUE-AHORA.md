# 🚀 Desplegar AHORA en 3 Pasos (Gratis)

## Opción 1: Despliegue desde GitHub (MÁS FÁCIL)

### Paso 1: Subir a GitHub

Abre una terminal nueva y ejecuta:

```bash
# Inicializar git (si no lo hiciste)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "App lista para iPhone 13+"

# Crear repositorio en GitHub
# Ve a https://github.com/new y crea un repo llamado "mayorista-virtual"

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/mayorista-virtual.git

# Subir código
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a https://vercel.com
2. Haz clic en "Sign Up" (o "Log In" si ya tienes cuenta)
3. Elige "Continue with GitHub"
4. Autoriza Vercel
5. Haz clic en "Add New..." → "Project"
6. Selecciona tu repositorio "mayorista-virtual"
7. Haz clic en "Deploy"

### Paso 3: ¡Listo!

Vercel te dará una URL como:
```
https://mayorista-virtual.vercel.app
```

**Copia esa URL y ábrela en Safari en tu iPhone 13**

---

## Opción 2: Despliegue desde Terminal

Si prefieres usar la terminal:

### Paso 1: Instalar Node.js (si no lo tienes)

Ve a https://nodejs.org y descarga la versión LTS

### Paso 2: Instalar Vercel CLI

Abre una terminal nueva y ejecuta:

```bash
npm install -g vercel
```

### Paso 3: Login en Vercel

```bash
vercel login
```

Sigue las instrucciones en el navegador.

### Paso 4: Desplegar

```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
vercel --prod
```

Vercel te preguntará:
- Set up and deploy? → **Y** (Yes)
- Which scope? → Elige tu cuenta
- Link to existing project? → **N** (No)
- What's your project's name? → **mayorista-virtual**
- In which directory is your code located? → **./** (presiona Enter)
- Want to override the settings? → **N** (No)

Espera 1-2 minutos y tendrás tu URL.

---

## 📱 Instalar en iPhone 13

Una vez que tengas la URL de Vercel:

1. **Abre Safari** en tu iPhone 13
2. **Ingresa la URL** (ej: https://mayorista-virtual.vercel.app)
3. **Toca el botón Compartir** (cuadrado con flecha)
4. **Desplázate y toca "Agregar a pantalla de inicio"**
5. **Toca "Agregar"**
6. **¡Listo!** Abre la app desde tu pantalla de inicio

---

## 🔧 Configurar Variables de Entorno

Si usas Supabase, después de desplegar:

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a "Settings" → "Environment Variables"
4. Agrega:

```
NEXT_PUBLIC_SUPABASE_URL = tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = tu-key-de-supabase
```

5. Haz clic en "Save"
6. Ve a "Deployments" → Haz clic en los 3 puntos del último deployment → "Redeploy"

---

## ✅ Verificar que funciona

Abre la URL en Safari y verifica:

- [ ] La página carga correctamente
- [ ] Se ve el catálogo de productos
- [ ] Puedes agregar productos al carrito
- [ ] La navegación mobile funciona
- [ ] El diseño se ve bien en móvil

---

## 🎯 Resumen

**Tiempo total**: 5-10 minutos
**Costo**: $0 USD
**Resultado**: App funcionando en iPhone 13+

### URLs importantes:
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub: https://github.com
- Node.js: https://nodejs.org

---

## 🆘 ¿Problemas?

### "npm: command not found"
Instala Node.js desde https://nodejs.org

### "git: command not found"
Instala Git desde https://git-scm.com

### "No puedo subir a GitHub"
Usa la opción de Vercel CLI directamente

### "La app no carga en iPhone"
- Verifica que uses Safari (no Chrome)
- Asegúrate que la URL sea HTTPS
- Recarga la página

---

## 📞 Siguiente Paso

Una vez desplegado, comparte la URL con tus clientes:

```
🎉 ¡Nueva App de Rocha Berazategui!

Instalá la app en tu iPhone:

1. Abrí este link en Safari: [TU-URL-AQUI]
2. Tocá Compartir → Agregar a pantalla de inicio
3. ¡Listo!

Compatible con iPhone 13 y superiores 📱
```

---

## 💡 Tip

Guarda tu URL de Vercel en un lugar seguro. La necesitarás para compartir con clientes.

Ejemplo: `https://mayorista-virtual.vercel.app`