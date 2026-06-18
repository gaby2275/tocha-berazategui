# 🚀 Desplegar en Vercel AHORA - Pasos Finales

Tu código ya está listo y commiteado. Solo faltan 2 pasos simples:

## ✅ Lo que ya está hecho:

- ✅ Código optimizado para iPhone 13+
- ✅ Manifest configurado
- ✅ Git commit realizado
- ✅ Repositorio GitHub: https://github.com/gaby2275/tocha-berazategui.git

## 📤 Paso 1: Subir a GitHub

Abre una terminal y ejecuta:

```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
git push origin main
```

Si te pide usuario y contraseña:
- **Usuario**: gaby2275
- **Contraseña**: Usa un Personal Access Token (no tu contraseña normal)

### ¿Cómo crear un Personal Access Token?

1. Ve a: https://github.com/settings/tokens
2. Haz clic en "Generate new token" → "Generate new token (classic)"
3. Dale un nombre: "Vercel Deploy"
4. Marca el checkbox: **repo** (acceso completo)
5. Haz clic en "Generate token"
6. **COPIA EL TOKEN** (solo se muestra una vez)
7. Usa ese token como contraseña cuando hagas `git push`

## 🌐 Paso 2: Desplegar en Vercel

### Opción A: Desde el navegador (MÁS FÁCIL)

1. Ve a: https://vercel.com
2. Haz clic en "Sign Up" o "Log In"
3. Elige "Continue with GitHub"
4. Autoriza Vercel
5. Haz clic en "Add New..." → "Project"
6. Busca "tocha-berazategui"
7. Haz clic en "Import"
8. **NO CAMBIES NADA** en la configuración
9. Haz clic en "Deploy"
10. ¡Espera 1-2 minutos!

### Opción B: Desde la terminal

Si prefieres usar comandos:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel --prod
```

## 📱 Paso 3: Obtener tu URL

Después del despliegue, Vercel te dará una URL como:

```
https://tocha-berazategui.vercel.app
```

O algo similar. **COPIA ESA URL**.

## 🎯 Paso 4: Instalar en iPhone 13

1. **Abre Safari** en tu iPhone 13
2. **Ingresa la URL** de Vercel
3. **Toca el botón Compartir** (cuadrado con flecha hacia arriba)
4. **Desplázate y toca "Agregar a pantalla de inicio"**
5. **Confirma el nombre** "Rocha Berazategui"
6. **Toca "Agregar"**
7. **¡Listo!** Abre la app desde tu pantalla de inicio

## 🔧 Configurar Variables de Entorno (Importante)

Si usas Supabase, después de desplegar:

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto "tocha-berazategui"
3. Ve a "Settings" → "Environment Variables"
4. Agrega estas variables (cópialas de tu archivo .env.local):

```
NEXT_PUBLIC_SUPABASE_URL = [tu-url-de-supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [tu-key-de-supabase]
```

5. Haz clic en "Save"
6. Ve a "Deployments"
7. Haz clic en los 3 puntos del último deployment
8. Selecciona "Redeploy"
9. Espera 1-2 minutos

## ✅ Verificar que funciona

Abre tu URL en Safari y verifica:

- [ ] La página carga
- [ ] Se ven los productos
- [ ] Puedes agregar al carrito
- [ ] La navegación mobile funciona
- [ ] El diseño se ve bien

## 📞 Compartir con Clientes

Una vez que todo funcione, comparte este mensaje:

```
🎉 ¡Nueva App de Rocha Berazategui!

Instalá la app en tu iPhone:

1. Abrí este link en Safari: https://tocha-berazategui.vercel.app
2. Tocá Compartir → Agregar a pantalla de inicio
3. ¡Listo!

📱 Compatible con iPhone 13 y superiores
🚚 Hacé tus pedidos más rápido
💳 Checkout simplificado

¿Dudas? Escribinos
```

## 🆘 Problemas Comunes

### "git push" pide contraseña
Usa un Personal Access Token (ver arriba)

### "No puedo hacer login en Vercel"
Usa "Continue with GitHub" en lugar de email

### "El deploy falla"
Verifica que todas las dependencias estén en package.json

### "La app no carga en iPhone"
- Usa Safari (no Chrome)
- Verifica que la URL sea HTTPS
- Recarga la página

## 🎊 ¡Eso es todo!

Tu app estará funcionando en iPhone 13+ en menos de 10 minutos.

**Tiempo total**: 5-10 minutos
**Costo**: $0 USD
**Resultado**: App profesional en iPhone 13+

---

## 📋 Resumen de URLs

- **Tu repositorio**: https://github.com/gaby2275/tocha-berazategui.git
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Tokens**: https://github.com/settings/tokens
- **Tu app desplegada**: https://tocha-berazategui.vercel.app (después del deploy)

---

¿Necesitas ayuda? Sigue los pasos uno por uno y verifica cada resultado.