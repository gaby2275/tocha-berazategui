# ✅ Despliegue iOS - Pasos Completados y Siguientes

## 🎉 ¡Configuración Completada!

Tu app **Mayorista Virtual** (Rocha Berazategui) está lista para iPhone. Se han completado los siguientes pasos:

### ✅ Pasos Completados

1. ✅ **Dependencias de Capacitor instaladas**
   - @capacitor/core
   - @capacitor/cli
   - @capacitor/ios
   - @capacitor/splash-screen
   - @capacitor/keyboard
   - @capacitor/status-bar

2. ✅ **Next.js configurado para exportación estática**
   - `output: 'export'` habilitado
   - Imágenes sin optimización (requerido para iOS)
   - Trailing slash habilitado

3. ✅ **Manifest configurado para exportación estática**
   - `export const dynamic = 'force-static'` agregado

4. ✅ **Plataforma iOS agregada**
   - Proyecto Xcode creado en `ios/App/`
   - Plugins de Capacitor sincronizados

5. ✅ **Xcode abierto**
   - El proyecto está listo para configuración final

---

## 📱 Pasos Siguientes en Xcode

### 1. Configurar el Proyecto en Xcode

Ahora que Xcode está abierto, sigue estos pasos:

#### A. Configurar Signing & Capabilities

1. En Xcode, selecciona el proyecto **App** en el navegador izquierdo
2. Ve a la pestaña **Signing & Capabilities**
3. Selecciona tu **Team** (necesitas una cuenta de Apple Developer)
   - Si no tienes cuenta, puedes usar tu Apple ID personal para pruebas
4. Verifica que el **Bundle Identifier** sea: `com.mayorista.virtual`

#### B. Configurar Deployment Target

1. En la pestaña **General**
2. En **Deployment Info**:
   - **Minimum Deployments**: iOS 15.0 (compatible con iPhone 13+)
   - **Supported Destinations**: Solo iPhone
   - **Device Orientation**: Portrait (vertical)

#### C. Configurar Info.plist (Opcional)

Si necesitas permisos especiales (cámara, ubicación, etc.):

1. Abre `ios/App/App/Info.plist`
2. Agrega las claves necesarias (ya están configuradas las básicas)

---

## 🚀 Opciones de Despliegue

### Opción 1: Probar en Simulador (MÁS RÁPIDO)

1. En Xcode, selecciona un simulador de iPhone en la barra superior
   - Recomendado: **iPhone 15 Pro** o **iPhone 14**
2. Presiona **Cmd + R** o el botón ▶️
3. La app se abrirá en el simulador

**Ventajas:**
- No necesitas iPhone físico
- Pruebas rápidas
- Gratis

### Opción 2: Probar en iPhone Real

1. Conecta tu iPhone al Mac con cable USB
2. Desbloquea el iPhone
3. En Xcode, selecciona tu iPhone en lugar del simulador
4. Presiona **Cmd + R**
5. En el iPhone:
   - Ve a **Configuración → General → VPN y administración de dispositivos**
   - Confía en tu certificado de desarrollador
6. Abre la app desde la pantalla de inicio

**Ventajas:**
- Pruebas en dispositivo real
- Mejor rendimiento
- Prueba de funcionalidades nativas

### Opción 3: Publicar en App Store

Para publicar en App Store necesitas:

1. **Cuenta de Apple Developer** ($99 USD/año)
2. **Configurar App Store Connect**
3. **Crear certificados de distribución**
4. **Subir la app para revisión**

**Pasos detallados:**
- Consulta: `GUIA-APP-IOS-NATIVA.md`
- O sigue: https://capacitorjs.com/docs/ios/deploying-to-app-store

---

## 🔄 Actualizar la App Después de Cambios

Cada vez que hagas cambios en tu código Next.js:

```bash
# 1. Construir la app Next.js
npm run build

# 2. Sincronizar con iOS
npx cap sync ios

# 3. Abrir en Xcode (si no está abierto)
npx cap open ios

# 4. En Xcode, presiona Cmd + R para ejecutar
```

---

## 📋 Checklist de Verificación

Antes de publicar, verifica:

- [ ] La app se ejecuta sin errores en simulador
- [ ] La app se ejecuta sin errores en iPhone real
- [ ] Todas las funcionalidades funcionan correctamente:
  - [ ] Catálogo de productos
  - [ ] Carrito de compras
  - [ ] Checkout
  - [ ] Panel de administración
  - [ ] Login/Registro
- [ ] El diseño se ve bien en diferentes tamaños de iPhone
- [ ] Los iconos y splash screen se ven correctamente
- [ ] La navegación funciona correctamente
- [ ] No hay errores en la consola de Xcode

---

## 🎨 Personalizar Iconos y Splash Screen

### Iconos de la App

Los iconos se encuentran en:
```
ios/App/App/Assets.xcassets/AppIcon.appiconset/
```

Necesitas crear iconos en estos tamaños:
- 20x20 @2x y @3x
- 29x29 @2x y @3x
- 40x40 @2x y @3x
- 60x60 @2x y @3x
- 1024x1024 (App Store)

**Herramientas recomendadas:**
- https://www.appicon.co (genera todos los tamaños)
- https://icon.kitchen (generador de iconos)

### Splash Screen

El splash screen se configura en `capacitor.config.ts` (ya configurado):
```typescript
SplashScreen: {
  launchShowDuration: 2000,
  backgroundColor: '#ffffff',
  // ...
}
```

Para personalizar:
1. Crea una imagen de splash screen
2. Agrégala en `ios/App/App/Assets.xcassets/Splash.imageset/`

---

## 🆘 Solución de Problemas

### Error: "No se puede ejecutar en el dispositivo"
- Verifica que el iPhone esté desbloqueado
- Confía en el certificado de desarrollador en el iPhone
- Verifica que el cable USB funcione correctamente

### Error: "Signing for 'App' requires a development team"
- Necesitas seleccionar un Team en Xcode
- Usa tu Apple ID personal para pruebas
- Para publicar, necesitas Apple Developer Program

### Error: "Build failed"
- Limpia el build: Product → Clean Build Folder (Cmd + Shift + K)
- Cierra y vuelve a abrir Xcode
- Ejecuta `npx cap sync ios` nuevamente

### La app no se actualiza con mis cambios
1. Ejecuta `npm run build`
2. Ejecuta `npx cap sync ios`
3. En Xcode: Product → Clean Build Folder
4. Vuelve a ejecutar (Cmd + R)

---

## 📱 Alternativa: PWA (Sin Xcode)

Si no quieres usar Xcode, puedes desplegar como PWA:

1. Despliega tu app en Vercel (gratis):
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. Los usuarios instalan desde Safari:
   - Abrir la URL en Safari
   - Tocar "Compartir"
   - "Agregar a pantalla de inicio"

**Ventajas:**
- Sin necesidad de Mac ni Xcode
- Sin costo de Apple Developer
- Actualizaciones automáticas
- Funciona en todos los iPhones

**Desventajas:**
- No está en App Store
- Menos funcionalidades nativas
- Depende de Safari

---

## 📚 Recursos Adicionales

- **Documentación de Capacitor**: https://capacitorjs.com/docs/ios
- **Guía de Apple**: https://developer.apple.com/ios/
- **Archivo de configuración**: `capacitor.config.ts`
- **Guías en este proyecto**:
  - `CONFIGURACION-IPHONE-13.md` - Configuración específica para iPhone 13+
  - `GUIA-APP-IOS-NATIVA.md` - Guía completa de app nativa
  - `INSTRUCCIONES-IPHONE.md` - Instrucciones para usuarios finales

---

## 🎯 Próximos Pasos Recomendados

1. **Ahora mismo**: Prueba la app en el simulador de Xcode
2. **Hoy**: Prueba en un iPhone real si tienes uno
3. **Esta semana**: Personaliza iconos y splash screen
4. **Cuando esté lista**: Decide entre App Store o PWA

---

## ✅ Resumen de Comandos Útiles

```bash
# Construir la app
npm run build

# Sincronizar con iOS
npx cap sync ios

# Abrir en Xcode
npx cap open ios

# Ver logs de la app
npx cap run ios --livereload

# Actualizar Capacitor
npm update @capacitor/core @capacitor/cli @capacitor/ios
```

---

## 🎉 ¡Felicitaciones!

Tu app está lista para iPhone. Solo falta:
1. Probarla en Xcode
2. Ajustar detalles visuales
3. Decidir método de distribución (App Store o PWA)

**¿Necesitas ayuda?** Consulta las guías en este proyecto o la documentación oficial de Capacitor.

---

**Última actualización**: Junio 18, 2026
**Versión de Capacitor**: 8.x
**iOS mínimo**: 15.0 (iPhone 13+)