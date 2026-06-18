# Configuración para iPhone 13 o Superior

Esta guía te ayudará a configurar tu app específicamente para iPhone 13, 14, 15 y modelos superiores.

## 📱 Requisitos del Sistema

- **iOS mínimo**: 15.0 (iPhone 13 viene con iOS 15)
- **Dispositivos soportados**: iPhone 13, 13 Pro, 13 Pro Max, 13 mini y superiores
- **Resoluciones optimizadas**:
  - iPhone 13/14/15: 1170x2532 px (6.1")
  - iPhone 13/14/15 Pro Max: 1284x2778 px (6.7")
  - iPhone 13 mini: 1080x2340 px (5.4")

## 🚀 Opción 1: PWA (Más Rápido - Ya Configurado)

Tu app ya funciona como PWA en iPhone 13+. Para instalarla:

### Pasos para el usuario:

1. **Despliega tu app en Vercel** (ver `DESPLIEGUE-VERCEL.md`)
2. **Abre la URL en Safari** en el iPhone 13
3. **Toca el botón Compartir** (cuadrado con flecha hacia arriba)
4. **Selecciona "Agregar a pantalla de inicio"**
5. **Confirma el nombre** y toca "Agregar"

### Ventajas:
✅ Funciona inmediatamente sin compilar
✅ Sin costo adicional
✅ Actualizaciones automáticas
✅ Compatible con iPhone 13 y todos los modelos superiores

### Ya está configurado:
- ✅ Manifest con iconos optimizados
- ✅ Metadata para iOS
- ✅ Diseño responsive para pantallas de iPhone 13
- ✅ Navegación mobile optimizada

## 🔧 Opción 2: App Nativa (Requiere Mac)

Si quieres crear una app nativa para publicar en App Store:

### Paso 1: Instalar Dependencias

```bash
# Instalar Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios

# Instalar plugins útiles
npm install @capacitor/splash-screen
npm install @capacitor/keyboard
npm install @capacitor/status-bar
```

### Paso 2: Inicializar Capacitor

```bash
npx cap init "Mayorista Virtual" "com.mayorista.virtual"
```

### Paso 3: Configurar Next.js

El archivo `next.config.ts` debe tener:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Optimizado para iOS
  assetPrefix: '',
};

export default nextConfig;
```

### Paso 4: Construir y Agregar iOS

```bash
# Construir la app
npm run build

# Agregar plataforma iOS
npx cap add ios

# Copiar archivos
npx cap copy ios

# Sincronizar
npx cap sync ios
```

### Paso 5: Configurar en Xcode

```bash
# Abrir en Xcode
npx cap open ios
```

En Xcode, configura:

#### 1. Deployment Target (iOS mínimo)
- Selecciona el proyecto "App" en el navegador
- En "General" → "Deployment Info"
- **Minimum Deployments**: iOS 15.0
- **Supported Destinations**: iPhone

#### 2. Dispositivos Soportados
- En "General" → "Deployment Info"
- **Supported Destinations**: Marca solo "iPhone"
- Desmarca "iPad" si no lo necesitas

#### 3. Orientación de Pantalla
- En "General" → "Deployment Info"
- **Device Orientation**: 
  - ✅ Portrait
  - ✅ Upside Down (opcional)
  - ❌ Landscape Left (desmarcar si solo quieres vertical)
  - ❌ Landscape Right (desmarcar si solo quieres vertical)

#### 4. Configurar Signing
- En "Signing & Capabilities"
- Selecciona tu equipo de Apple Developer
- Bundle Identifier: `com.mayorista.virtual`

### Paso 6: Configurar Info.plist para iPhone 13+

Edita `ios/App/App/Info.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Nombre de la app -->
    <key>CFBundleDisplayName</key>
    <string>Mayorista Virtual</string>
    
    <!-- Versión mínima de iOS -->
    <key>MinimumOSVersion</key>
    <string>15.0</string>
    
    <!-- Soporte para pantallas modernas -->
    <key>UIRequiresFullScreen</key>
    <false/>
    
    <!-- Orientación soportada -->
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
    
    <!-- Soporte para notch y Dynamic Island -->
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <true/>
    
    <!-- Permisos (agrega los que necesites) -->
    <key>NSCameraUsageDescription</key>
    <string>Necesitamos acceso a la cámara para escanear productos</string>
    
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Necesitamos acceso a tus fotos</string>
</dict>
</plist>
```

### Paso 7: Optimizar para Pantallas de iPhone 13

Crea `ios/App/App/Assets.xcassets/AppIcon.appiconset/Contents.json`:

```json
{
  "images" : [
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "icon-20@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "icon-20@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "icon-29@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "icon-29@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "icon-40@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "icon-40@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "icon-60@2x.png",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "icon-60@3x.png",
      "scale" : "3x"
    },
    {
      "size" : "1024x1024",
      "idiom" : "ios-marketing",
      "filename" : "icon-1024.png",
      "scale" : "1x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}
```

### Paso 8: Probar en iPhone 13

#### En Simulador:
1. En Xcode, selecciona "iPhone 13" en el selector de dispositivos
2. Presiona Cmd+R o el botón ▶️
3. La app se abrirá en el simulador

#### En iPhone 13 Real:
1. Conecta tu iPhone 13 al Mac con cable
2. Desbloquea el iPhone
3. En Xcode, selecciona tu iPhone 13 en lugar del simulador
4. Presiona Cmd+R
5. En el iPhone: Configuración → General → VPN y administración de dispositivos
6. Confía en tu certificado de desarrollador
7. Abre la app desde la pantalla de inicio

### Paso 9: Optimizar CSS para iPhone 13

Agrega en `app/globals.css`:

```css
/* Soporte para notch y Dynamic Island en iPhone 13+ */
@supports (padding: max(0px)) {
  body {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
  }
}

/* Optimización para pantallas de iPhone 13 */
@media only screen 
  and (device-width: 390px) 
  and (device-height: 844px) 
  and (-webkit-device-pixel-ratio: 3) {
  /* iPhone 13, 13 Pro, 14, 14 Pro */
  :root {
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
  }
}

@media only screen 
  and (device-width: 428px) 
  and (device-height: 926px) 
  and (-webkit-device-pixel-ratio: 3) {
  /* iPhone 13 Pro Max, 14 Plus */
  :root {
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
  }
}

@media only screen 
  and (device-width: 375px) 
  and (device-height: 812px) 
  and (-webkit-device-pixel-ratio: 3) {
  /* iPhone 13 mini */
  :root {
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
  }
}
```

## 📊 Capturas de Pantalla para App Store

Si vas a publicar en App Store, necesitas capturas específicas:

### iPhone 13 Pro Max (6.7"):
- Resolución: 1284x2778 px
- Formato: PNG
- Cantidad: 3-10 imágenes

### iPhone 13/14 (6.1"):
- Resolución: 1170x2532 px
- Formato: PNG
- Cantidad: 3-10 imágenes

### Herramientas para generar capturas:
- Simulador de Xcode (Cmd+S para captura)
- Figma con plantillas de iPhone
- Sketch con plantillas de iPhone

## ✅ Checklist de Compatibilidad iPhone 13+

- [ ] iOS mínimo configurado en 15.0
- [ ] Soporte solo para iPhone (no iPad)
- [ ] Safe area insets configurados en CSS
- [ ] Iconos en todas las resoluciones requeridas
- [ ] Splash screen optimizado
- [ ] Orientación de pantalla configurada
- [ ] Probado en simulador iPhone 13
- [ ] Probado en iPhone 13 real
- [ ] Permisos configurados en Info.plist
- [ ] Bundle identifier único configurado

## 🎯 Recomendación Final

**Para empezar rápido**: Usa la PWA (Opción 1)
- Despliega en Vercel
- Los usuarios instalan desde Safari
- Funciona perfectamente en iPhone 13+
- Sin necesidad de Mac ni cuenta de desarrollador

**Para App Store**: Usa Capacitor (Opción 2)
- Requiere Mac y cuenta de Apple Developer
- Proceso más complejo pero resultado profesional
- Presencia en App Store

## 🆘 Soporte

Si tienes problemas:
1. Verifica que tu iPhone 13 tenga iOS 15.0 o superior
2. Asegúrate de usar Safari (no Chrome) para PWA
3. Para app nativa, revisa los logs en Xcode
4. Consulta `GUIA-APP-IOS-NATIVA.md` para más detalles

## 📱 Próximos Pasos

1. **Decide qué opción usar** (PWA o App Nativa)
2. **Si eliges PWA**: Despliega en Vercel y comparte la URL
3. **Si eliges App Nativa**: Sigue los pasos de esta guía
4. **Prueba en iPhone 13** antes de publicar
5. **Recopila feedback** de usuarios con iPhone 13+