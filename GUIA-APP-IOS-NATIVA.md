# Guía para Crear App Nativa de iOS (.ipa)

Esta guía te ayudará a convertir tu aplicación Next.js en una app nativa de iOS para iPhone usando Capacitor.

## ⚠️ Requisitos Importantes

### Hardware y Software Necesarios:
1. **Mac con macOS** (obligatorio para compilar apps iOS)
2. **Xcode** (descarga gratis desde App Store)
3. **Cuenta de Apple Developer** ($99 USD/año para publicar en App Store)
4. **Node.js** instalado

### Sin Mac, opciones alternativas:
- **Expo Application Services (EAS)** - Compilación en la nube
- **Ionic Appflow** - Compilación en la nube (de pago)
- **PWA** - Instalar como web app (ya configurado en INSTRUCCIONES-IPHONE.md)

## Opción 1: Usando Capacitor (Recomendado)

### Paso 1: Instalar Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios
```

### Paso 2: Inicializar Capacitor

```bash
npx cap init
```

Responde las preguntas:
- **App name**: Mayorista Virtual
- **App ID**: com.mayorista.virtual (formato: com.tuempresa.tuapp)
- **Web asset directory**: out

### Paso 3: Configurar Next.js para Export Estático

Modifica `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Importante para iOS
  assetPrefix: '',
};

export default nextConfig;
```

### Paso 4: Construir la Aplicación

```bash
npm run build
```

### Paso 5: Agregar la Plataforma iOS

```bash
npx cap add ios
```

Esto creará la carpeta `ios/` con el proyecto de Xcode.

### Paso 6: Copiar los Archivos Web

```bash
npx cap copy ios
```

### Paso 7: Abrir en Xcode

```bash
npx cap open ios
```

Esto abrirá Xcode con tu proyecto.

### Paso 8: Configurar en Xcode

1. **Selecciona tu equipo de desarrollo**:
   - En Xcode, selecciona el proyecto en el navegador
   - Ve a "Signing & Capabilities"
   - Selecciona tu equipo de Apple Developer

2. **Configura el Bundle Identifier**:
   - Debe coincidir con el App ID: `com.mayorista.virtual`

3. **Configura la versión**:
   - Version: 1.0.0
   - Build: 1

### Paso 9: Probar en Simulador

1. En Xcode, selecciona un simulador (ej: iPhone 15 Pro)
2. Presiona el botón ▶️ (Play) o Cmd+R
3. La app se abrirá en el simulador

### Paso 10: Probar en iPhone Real

1. Conecta tu iPhone al Mac con cable
2. Desbloquea el iPhone
3. En Xcode, selecciona tu iPhone en lugar del simulador
4. Presiona ▶️ para instalar y ejecutar
5. En el iPhone: Configuración → General → VPN y administración de dispositivos
6. Confía en tu certificado de desarrollador

### Paso 11: Generar Archivo .ipa para Distribución

#### Para TestFlight (Beta Testing):

1. En Xcode: **Product** → **Archive**
2. Espera a que termine el proceso
3. Se abrirá el Organizer
4. Selecciona el archivo y haz clic en **Distribute App**
5. Selecciona **App Store Connect**
6. Sigue el asistente
7. La app se subirá a App Store Connect

#### Para Distribución Ad Hoc (sin App Store):

1. En Xcode: **Product** → **Archive**
2. En el Organizer, selecciona **Distribute App**
3. Selecciona **Ad Hoc**
4. Selecciona los dispositivos registrados
5. Exporta el .ipa

## Opción 2: Usando Expo (Alternativa Moderna)

Si prefieres usar Expo (más simple pero requiere adaptaciones):

### Instalación

```bash
npx create-expo-app mayorista-ios
cd mayorista-ios
```

### Migrar tu código Next.js a React Native

Esto requiere reescribir componentes para React Native, ya que Next.js y React Native son diferentes.

### Compilar con EAS (sin Mac)

```bash
npm install -g eas-cli
eas login
eas build --platform ios
```

**Nota**: EAS Build es de pago después del plan gratuito.

## Configuración de Capacitor

Crea `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mayorista.virtual',
  appName: 'Mayorista Virtual',
  webDir: 'out',
  server: {
    iosScheme: 'https',
    hostname: 'app.mayorista.virtual'
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true
  }
};

export default config;
```

## Permisos de iOS

Edita `ios/App/App/Info.plist` para agregar permisos:

```xml
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para escanear códigos</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Necesitamos acceso a tus fotos</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Necesitamos tu ubicación para mostrarte productos cercanos</string>
```

## Iconos y Splash Screen

### Generar iconos automáticamente:

```bash
npm install -g @capacitor/assets
npx capacitor-assets generate --ios
```

O coloca manualmente:
- Icono de app: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- Splash screen: `ios/App/App/Assets.xcassets/Splash.imageset/`

### Requisitos de iconos:
- **App Icon**: 1024x1024 px (PNG sin transparencia)
- **Splash Screen**: 2732x2732 px (PNG)

## Actualizar la App

Cuando hagas cambios en tu código:

```bash
npm run build
npx cap copy ios
npx cap sync ios
```

Luego abre Xcode y vuelve a compilar.

## Publicar en App Store

### Paso 1: Preparar en App Store Connect

1. Ve a https://appstoreconnect.apple.com
2. Crea una nueva app
3. Completa la información:
   - Nombre: Mayorista Virtual
   - Idioma principal: Español
   - Bundle ID: com.mayorista.virtual
   - SKU: mayorista-virtual-001

### Paso 2: Preparar Metadata

Necesitarás:
- **Descripción** (4000 caracteres máx)
- **Palabras clave** (100 caracteres máx)
- **URL de soporte**
- **URL de marketing**
- **Capturas de pantalla**:
  - iPhone 6.7": 1290x2796 px (3-10 imágenes)
  - iPhone 6.5": 1242x2688 px (3-10 imágenes)
  - iPad Pro 12.9": 2048x2732 px (3-10 imágenes)
- **Icono de App Store**: 1024x1024 px

### Paso 3: Subir el Build

1. En Xcode: **Product** → **Archive**
2. **Distribute App** → **App Store Connect**
3. Sigue el asistente
4. Espera a que se procese (puede tardar horas)

### Paso 4: Enviar para Revisión

1. En App Store Connect, selecciona el build
2. Completa toda la información requerida
3. Responde las preguntas de exportación
4. Envía para revisión
5. Espera aprobación (1-3 días típicamente)

## TestFlight (Beta Testing)

Antes de publicar, prueba con TestFlight:

1. Sube un build a App Store Connect
2. Ve a la sección TestFlight
3. Agrega testers internos (hasta 100)
4. O crea un link público para testers externos (hasta 10,000)
5. Los testers descargan TestFlight y tu app

## Solución de Problemas Comunes

### Error: "No signing certificate found"
- Ve a Xcode → Preferences → Accounts
- Agrega tu cuenta de Apple Developer
- Descarga los certificados

### Error: "Failed to register bundle identifier"
- El Bundle ID ya está en uso
- Cámbialo en `capacitor.config.ts` y en Xcode

### Error: "App no carga contenido"
- Verifica que `webDir` apunte a `out`
- Ejecuta `npm run build` antes de `npx cap copy`
- Revisa la consola en Xcode para errores

### Error: "Images not loading"
- Usa rutas relativas, no absolutas
- Configura `images.unoptimized: true` en Next.js
- Verifica que las imágenes estén en la carpeta `out`

### Error: "API calls failing"
- Configura CORS en tu backend
- Verifica que las URLs sean HTTPS
- Revisa los permisos en Info.plist

## Costos

- **Apple Developer Program**: $99 USD/año (obligatorio para publicar)
- **Mac**: Si no tienes, desde $999 USD (Mac Mini)
- **Alternativa sin Mac**: EAS Build (Expo) - desde $29 USD/mes

## Alternativa: PWA (Ya Configurada)

Si no quieres pagar o no tienes Mac, tu app ya está configurada como PWA:
- Los usuarios pueden instalarla desde Safari
- Ver instrucciones en: `INSTRUCCIONES-IPHONE.md`
- Funciona bien para la mayoría de casos de uso
- Sin costo adicional

## Comparación: App Nativa vs PWA

### App Nativa (iOS):
✅ Mejor rendimiento
✅ Acceso completo a APIs nativas
✅ Presencia en App Store
✅ Notificaciones push más confiables
❌ Requiere Mac y cuenta de desarrollador
❌ Proceso de revisión de Apple
❌ Costo anual de $99 USD

### PWA:
✅ Sin costo adicional
✅ No requiere Mac
✅ Actualizaciones instantáneas
✅ Un solo código para todas las plataformas
❌ Limitaciones en APIs nativas
❌ No está en App Store
❌ Menos descubrible

## Recomendación

1. **Si tienes Mac y presupuesto**: Usa Capacitor para app nativa
2. **Si no tienes Mac**: Usa la PWA (ya configurada) o EAS Build
3. **Para empezar rápido**: Usa la PWA y migra a nativa después

## Recursos Adicionales

- Documentación Capacitor iOS: https://capacitorjs.com/docs/ios
- Apple Developer: https://developer.apple.com
- App Store Connect: https://appstoreconnect.apple.com
- Guías de diseño iOS: https://developer.apple.com/design/human-interface-guidelines/ios

## Próximos Pasos

1. Decide si quieres app nativa o PWA
2. Si eliges nativa, consigue Mac y cuenta de desarrollador
3. Sigue esta guía paso a paso
4. Prueba en TestFlight antes de publicar
5. Publica en App Store

¿Necesitas ayuda con algún paso específico?