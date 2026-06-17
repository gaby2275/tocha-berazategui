# 🚀 Inicio Rápido - Mayorista Virtual

Esta guía te ayudará a tener el proyecto funcionando en **menos de 10 minutos**.

## ⚡ Pasos Rápidos

### 1️⃣ Verificar Node.js

```bash
node --version
```

**⚠️ IMPORTANTE:** Necesitas Node.js v20 o superior. Si tienes v16, actualiza primero:

**En macOS:**
```bash
# Opción 1: Con Homebrew
brew install node@20

# Opción 2: Descargar desde https://nodejs.org
```

### 2️⃣ Instalar Dependencias

```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
npm install
```

### 3️⃣ Configurar Supabase (Base de Datos GRATIS)

1. **Crear cuenta en Supabase:**
   - Ve a https://supabase.com
   - Crea una cuenta gratuita
   - Crea un nuevo proyecto

2. **Ejecutar el script SQL:**
   - En tu proyecto de Supabase, ve a **SQL Editor**
   - Abre el archivo `supabase-setup.sql` de este proyecto
   - Copia todo el contenido
   - Pégalo en el SQL Editor de Supabase
   - Haz clic en **Run**
   - ✅ Esto creará todas las tablas y datos de prueba

3. **Obtener las credenciales:**
   - En Supabase, ve a **Settings** → **API**
   - Copia:
     - `Project URL` (ejemplo: https://xxxxx.supabase.co)
     - `anon public` key
     - `service_role` key (en la sección "Project API keys")

### 4️⃣ Configurar Variables de Entorno

```bash
# Crear archivo de configuración
cp .env.local.example .env.local
```

Edita `.env.local` y agrega tus credenciales de Supabase:

```env
# MÍNIMO REQUERIDO PARA EMPEZAR:
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role_aqui

# Opcional (puedes configurar después):
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Mayorista Virtual
```

### 5️⃣ Ejecutar el Proyecto

```bash
npm run dev
```

🎉 **¡Listo!** Abre tu navegador en: http://localhost:3000

## 🎯 ¿Qué verás?

- **Página principal:** Catálogo con 5 productos de ejemplo
- **Carrito:** Funcional con persistencia
- **Checkout:** Formulario de pedido (los pagos se configuran después)

## 📦 Productos de Prueba

El script SQL ya creó 5 productos de ejemplo:
- Producto Ejemplo 1 - $100 (50 en stock)
- Producto Ejemplo 2 - $150 (30 en stock)
- Producto Ejemplo 3 - $200 (20 en stock)
- Producto Ejemplo 4 - $75 (100 en stock)
- Producto Ejemplo 5 - $250 (15 en stock)

## 🔐 Usuario Administrador

Se creó un usuario admin de prueba:
- **Email:** admin@mayorista.com
- **Rol:** admin

Para acceder al panel de admin (próximamente), necesitarás configurar autenticación.

## ⚙️ Configuración Opcional (Después)

### MercadoPago (Para Argentina)

1. Ve a https://www.mercadopago.com.ar/developers
2. Crea una aplicación
3. Obtén tus credenciales
4. Agrégalas a `.env.local`:

```env
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_public_key
```

### PayPal (Para Internacional)

1. Ve a https://developer.paypal.com
2. Crea una aplicación
3. Obtén tus credenciales
4. Agrégalas a `.env.local`:

```env
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret
PAYPAL_MODE=sandbox
```

## 🐛 Problemas Comunes

### "Unsupported engine" al instalar

**Solución:** Actualiza Node.js a v20+

### "Cannot connect to Supabase"

**Solución:** 
1. Verifica que las URLs en `.env.local` sean correctas
2. Verifica que el proyecto de Supabase esté activo
3. Verifica que ejecutaste el script SQL

### "Products not loading"

**Solución:**
1. Abre la consola del navegador (F12)
2. Verifica si hay errores
3. Verifica que las tablas existan en Supabase
4. Verifica que los productos estén marcados como `active = true`

### Página en blanco

**Solución:**
1. Verifica que `npm run dev` esté ejecutándose sin errores
2. Abre http://localhost:3000 (no https)
3. Revisa la consola del navegador

## 📱 Probar el Flujo Completo

1. **Ver productos:** Abre http://localhost:3000
2. **Buscar:** Usa la barra de búsqueda
3. **Agregar al carrito:** Haz clic en "Agregar al Carrito"
4. **Ver carrito:** Haz clic en el ícono del carrito (arriba derecha)
5. **Modificar cantidad:** Usa los botones + y -
6. **Checkout:** Haz clic en "Proceder al Pago"
7. **Completar formulario:** Llena los datos de entrega
8. **Crear pedido:** Haz clic en "Confirmar Pedido"

## 🚀 Próximos Pasos

1. ✅ Proyecto funcionando localmente
2. 📝 Personalizar productos en Supabase
3. 💳 Configurar pasarelas de pago
4. 🎨 Personalizar diseño y colores
5. 🌐 Desplegar en Vercel (gratis)

## 📚 Documentación Completa

Para más detalles, consulta:
- `README.md` - Documentación completa
- `GUIA-INSTALACION.md` - Guía detallada de instalación
- `supabase-setup.sql` - Script de base de datos

## 💡 Consejos

- **Desarrollo:** Usa `npm run dev` para desarrollo con hot-reload
- **Producción:** Usa `npm run build && npm start` para probar en modo producción
- **Logs:** Revisa la consola del navegador (F12) para ver errores
- **Base de datos:** Usa el panel de Supabase para ver/editar datos

## 🎉 ¡Éxito!

Si llegaste hasta aquí y el proyecto está funcionando, ¡felicitaciones! 🎊

Ahora puedes:
- Agregar tus propios productos
- Personalizar el diseño
- Configurar los pagos
- Desplegar en producción

---

**¿Necesitas ayuda?** Revisa el README.md o la documentación de Supabase.