# 📱 Cómo Ejecutar la App en tu iPhone

## Requisitos Previos

- ✅ Mac con Xcode instalado
- ✅ iPhone con cable USB
- ✅ Mismo Apple ID en Mac e iPhone
- ✅ iPhone desbloqueado

---

## 🚀 Pasos para Ejecutar en tu iPhone

### Paso 1: Conectar el iPhone

1. **Conecta tu iPhone al Mac** usando el cable USB
2. **Desbloquea tu iPhone** (ingresa tu código/Face ID)
3. Si aparece un mensaje "¿Confiar en este ordenador?", toca **Confiar**
4. Ingresa el código de tu iPhone si te lo pide

### Paso 2: Configurar en Xcode

Xcode ya debería estar abierto. Si no:

```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
npx cap open ios
```

Una vez en Xcode:

#### A. Seleccionar tu iPhone

1. En la barra superior de Xcode, verás un selector de dispositivos
2. Haz clic en él (probablemente dice "iPhone 15 Pro" o similar)
3. En el menú desplegable, busca tu iPhone (aparecerá con su nombre)
4. Selecciona tu iPhone

#### B. Configurar Signing (Primera vez)

1. En el navegador izquierdo, selecciona el proyecto **App** (el ícono azul)
2. Ve a la pestaña **Signing & Capabilities**
3. En **Team**, selecciona tu Apple ID:
   - Si no aparece, haz clic en "Add Account..."
   - Ingresa tu Apple ID y contraseña
   - Selecciona tu cuenta

4. Verifica que:
   - ✅ **Automatically manage signing** esté marcado
   - ✅ **Team** tenga tu Apple ID seleccionado
   - ✅ **Bundle Identifier** sea `com.mayorista.virtual`

### Paso 3: Ejecutar en el iPhone

1. Con tu iPhone seleccionado en la barra superior
2. Presiona el botón **▶️ (Play)** o presiona **Cmd + R**
3. Xcode comenzará a:
   - Compilar la app
   - Instalarla en tu iPhone
   - Ejecutarla

**Esto puede tomar 1-2 minutos la primera vez.**

### Paso 4: Confiar en el Desarrollador (Primera vez)

La primera vez que ejecutes la app, verás un error en el iPhone:

1. En tu iPhone, ve a:
   ```
   Configuración → General → VPN y administración de dispositivos
   ```

2. Verás tu Apple ID bajo "APP DE DESARROLLADOR"

3. Toca tu Apple ID

4. Toca **Confiar en "[tu Apple ID]"**

5. Confirma tocando **Confiar**

### Paso 5: Abrir la App

1. Vuelve a la pantalla de inicio de tu iPhone
2. Busca el ícono de **Mayorista Virtual** (Rocha Berazategui)
3. Toca el ícono para abrir la app

**¡Listo! La app debería ejecutarse en tu iPhone.**

---

## 🔄 Ejecutar Nuevamente (Después de la Primera Vez)

Una vez configurado, es más simple:

1. Conecta el iPhone al Mac
2. En Xcode, selecciona tu iPhone
3. Presiona **Cmd + R**
4. La app se actualizará y ejecutará automáticamente

---

## 🐛 Solución de Problemas

### ❌ "No se puede verificar la app"

**Solución:**
- Ve a Configuración → General → VPN y administración de dispositivos
- Confía en tu Apple ID como desarrollador

### ❌ "iPhone no aparece en Xcode"

**Solución:**
1. Desconecta y vuelve a conectar el cable
2. Desbloquea el iPhone
3. Confía en el ordenador si te lo pide
4. Reinicia Xcode si es necesario

### ❌ "Signing for 'App' requires a development team"

**Solución:**
1. En Xcode → Preferences → Accounts
2. Agrega tu Apple ID
3. En el proyecto, selecciona tu Apple ID como Team

### ❌ "Build Failed"

**Solución:**
1. En Xcode: Product → Clean Build Folder (Cmd + Shift + K)
2. Vuelve a ejecutar (Cmd + R)

### ❌ "La app se cierra inmediatamente"

**Solución:**
1. Verifica los logs en Xcode (View → Debug Area → Show Debug Area)
2. Busca errores en rojo
3. Asegúrate de haber ejecutado `npm run build` antes

---

## 📝 Notas Importantes

### Limitaciones con Apple ID Personal (Gratis)

Si usas tu Apple ID personal (no Apple Developer Program):

- ✅ Puedes instalar en tu iPhone
- ✅ Puedes probar todas las funcionalidades
- ⚠️ La app expira después de 7 días
- ⚠️ Solo puedes instalar en 3 dispositivos
- ❌ No puedes publicar en App Store

**Para renovar después de 7 días:**
- Vuelve a ejecutar desde Xcode (Cmd + R)

### Con Apple Developer Program ($99/año)

- ✅ Sin límite de tiempo
- ✅ Hasta 100 dispositivos
- ✅ Puedes publicar en App Store
- ✅ Certificados de distribución

---

## 🎯 Alternativa: PWA (Sin Cable)

Si no quieres usar cable cada vez, puedes desplegar como PWA:

### Opción PWA:

1. **Despliega en Vercel** (gratis):
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Obtendrás una URL** como: `https://mayorista-virtual.vercel.app`

3. **En tu iPhone**:
   - Abre la URL en **Safari**
   - Toca el botón **Compartir** (cuadrado con flecha)
   - Toca **"Agregar a pantalla de inicio"**
   - Toca **"Agregar"**

**Ventajas PWA:**
- ✅ Sin cable necesario
- ✅ Sin expiración de 7 días
- ✅ Actualizaciones automáticas
- ✅ Funciona en cualquier iPhone
- ✅ Gratis completamente

**Desventajas PWA:**
- ❌ No está en App Store
- ❌ Menos funcionalidades nativas
- ❌ Requiere Safari (no funciona desde Instagram/Chrome)

---

## 📊 Comparación de Opciones

| Característica | Xcode (Gratis) | Xcode (Developer) | PWA |
|----------------|----------------|-------------------|-----|
| Costo | Gratis | $99/año | Gratis |
| Duración | 7 días | Ilimitado | Ilimitado |
| Cable necesario | Sí | Sí | No |
| App Store | No | Sí | No |
| Dispositivos | 3 | 100 | Ilimitados |
| Actualizaciones | Manual | Manual | Automáticas |

---

## ✅ Checklist de Ejecución

Antes de ejecutar, verifica:

- [ ] iPhone conectado al Mac con cable
- [ ] iPhone desbloqueado
- [ ] Confiaste en el ordenador
- [ ] Xcode abierto
- [ ] Tu iPhone seleccionado en Xcode
- [ ] Team configurado en Signing & Capabilities
- [ ] Build exitoso (sin errores)

---

## 🎉 ¡Listo!

Una vez que sigas estos pasos, tu app estará ejecutándose en tu iPhone.

**Para actualizaciones futuras:**
```bash
cd /Users/gabrieladam/client-env/mayorista-virtual
./deploy-ios.sh
```

Luego en Xcode: Cmd + R

---

## 📞 Próximos Pasos

1. **Prueba todas las funcionalidades** en tu iPhone
2. **Verifica el diseño** en diferentes pantallas
3. **Decide**: ¿App nativa o PWA?
4. **Si eliges PWA**: Despliega en Vercel
5. **Si eliges App Store**: Inscríbete en Apple Developer Program

---

**¿Preguntas?** Consulta `DESPLIEGUE-IOS-COMPLETADO.md` para más detalles.