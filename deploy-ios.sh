#!/bin/bash

# ============================================
# Script de Despliegue iOS - Mayorista Virtual
# ============================================

echo "🚀 Iniciando proceso de despliegue iOS..."
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar errores
error_exit() {
    echo -e "${RED}❌ Error: $1${NC}" >&2
    exit 1
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error_exit "No se encuentra package.json. Ejecuta este script desde la raíz del proyecto."
fi

echo -e "${BLUE}📦 Paso 1: Construyendo la aplicación Next.js...${NC}"
npm run build || error_exit "Falló la construcción de Next.js"
echo -e "${GREEN}✅ Build completado${NC}"
echo ""

echo -e "${BLUE}🔄 Paso 2: Sincronizando con iOS...${NC}"
npx cap sync ios || error_exit "Falló la sincronización con iOS"
echo -e "${GREEN}✅ Sincronización completada${NC}"
echo ""

echo -e "${BLUE}📱 Paso 3: Abriendo Xcode...${NC}"
npx cap open ios || error_exit "No se pudo abrir Xcode"
echo -e "${GREEN}✅ Xcode abierto${NC}"
echo ""

echo "============================================"
echo -e "${GREEN}✅ ¡Proceso completado!${NC}"
echo "============================================"
echo ""
echo "Próximos pasos en Xcode:"
echo "  1. Selecciona un simulador o dispositivo"
echo "  2. Presiona Cmd + R para ejecutar"
echo "  3. Prueba todas las funcionalidades"
echo ""
echo -e "${YELLOW}💡 Tip: Si haces cambios en el código, vuelve a ejecutar este script${NC}"
echo ""

# Made with Bob
