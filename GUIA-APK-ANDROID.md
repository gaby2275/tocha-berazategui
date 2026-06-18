# Guía para Convertir la App en APK de Android

Esta guía te ayudará a convertir tu aplicación Next.js en una APK para dispositivos Android usando Capacitor.

## Opción 1: Usando Capacitor (Recomendado)

Capacitor es la solución oficial de Ionic para convertir aplicaciones web en apps nativas.

### Paso 1: Instalar Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Paso 2: Inicializar Capacitor

```bash
npx cap init
```

Te preguntará:
- **App name**: Mayorista Virtual
- **App ID**: com.mayorista.virtual (formato: com.tuempresa.tuapp)
- **Web asset directory**: out (para Next.js con export estático)

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
};

export default nextConfig;
```

### Paso 4: Construir la Aplicación

```bash
npm run build
```

Esto generará la carpeta `out` con tu aplicación estática.

### Paso 5: Agregar la Plataforma Android

```bash
npx cap add android
```

### Paso 6: Copiar los Archivos Web

```bash
npx cap copy android
```

### Paso 7: Abrir en Android Studio

```bash
npx cap open android
```

Esto abrirá Android Studio. Desde ahí podrás:
- Compilar la APK
- Probar en emulador
- Generar APK firmada para producción

### Paso 8: Generar APK desde Android Studio

1. En Android Studio: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. La APK se generará en: `android/app/build/outputs/apk/debug/app-debug.apk`

## Opción 2: Usando PWA Builder (Más Simple)

Si tu app ya es una PWA (Progressive Web App), puedes usar PWA Builder:

### Paso 1: Asegúrate de tener un manifest.json válido

Tu archivo `app/manifest.ts` debe exportar un manifest completo.

### Paso 2: Despliega tu app en Vercel

```bash
vercel --prod
```

### Paso 3: Usa PWA Builder

1. Ve a: https://www.pwabuilder.com/
2. Ingresa la URL de tu app desplegada
3. Haz clic en "Package For Stores"
4. Selecciona "Android"
5. Descarga el paquete generado

## Opción 3: Usando Cordova

### Instalación

```bash
npm install -g cordova
cordova create mayorista-app com.mayorista.virtual MayoristaVirtual
cd mayorista-app
cordova platform add android
```

### Copiar archivos

Copia el contenido de tu carpeta `out` a `mayorista-app/www/`

### Compilar

```bash
cordova build android
```

## Requisitos Previos

### Para Capacitor y Cordova:

1. **Java Development Kit (JDK)**
   - Descarga JDK 11 o superior
   - Configura JAVA_HOME

2. **Android Studio**
   - Descarga desde: https://developer.android.com/studio
   - Instala Android SDK
   - Configura ANDROID_HOME

3. **Gradle**
   - Se instala automáticamente con Android Studio

### Variables de Entorno (macOS/Linux)

Agrega a tu `~/.bash_profile` o `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
```

## Configuración de Capacitor

Crea o modifica `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mayorista.virtual',
  appName: 'Mayorista Virtual',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: 'path/to/keystore.jks',
      keystoreAlias: 'your-alias',
    }
  }
};

export default config;
```

## Permisos de Android

Crea o modifica `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
```

## Iconos y Splash Screen

### Generar iconos automáticamente:

```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
```

O coloca manualmente los iconos en:
- `android/app/src/main/res/mipmap-*/ic_launcher.png`

## Firmar la APK para Producción

### 1. Generar Keystore

```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 2. Configurar en Android Studio

1. **Build** → **Generate Signed Bundle / APK**
2. Selecciona **APK**
3. Proporciona la ruta del keystore y las contraseñas
4. Selecciona **release** como build variant
5. Haz clic en **Finish**

La APK firmada estará en: `android/app/release/app-release.apk`

## Actualizar la App

Cuando hagas cambios:

```bash
npm run build
npx cap copy android
npx cap sync android
```

## Probar en Dispositivo Real

### Habilitar Depuración USB en tu Android:
1. Configuración → Acerca del teléfono
2. Toca 7 veces en "Número de compilación"
3. Vuelve y entra en "Opciones de desarrollador"
4. Activa "Depuración USB"

### Ejecutar:

```bash
npx cap run android
```

## Solución de Problemas Comunes

### Error: ANDROID_HOME no configurado
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### Error: Gradle build failed
- Verifica que tengas JDK 11 o superior
- Limpia el proyecto: `cd android && ./gradlew clean`

### Error: App no carga contenido
- Verifica que `webDir` en `capacitor.config.ts` apunte a `out`
- Asegúrate de haber ejecutado `npm run build` antes de `npx cap copy`

### Error: Imágenes no cargan
- Usa rutas relativas en lugar de absolutas
- Configura `images.unoptimized: true` en `next.config.ts`

## Publicar en Google Play Store

1. Crea una cuenta de desarrollador en Google Play Console ($25 USD único pago)
2. Genera una APK firmada (release)
3. Sube la APK a Google Play Console
4. Completa la información de la app (descripción, capturas, etc.)
5. Envía para revisión

## Recursos Adicionales

- Documentación Capacitor: https://capacitorjs.com/docs
- Android Studio: https://developer.android.com/studio
- Google Play Console: https://play.google.com/console

## Recomendación Final

**Usa Capacitor** - Es la opción más moderna, mejor mantenida y con mejor integración con Next.js. PWA Builder es bueno para pruebas rápidas, pero Capacitor te da más control.