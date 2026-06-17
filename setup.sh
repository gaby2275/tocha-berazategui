#!/bin/bash

# ============================================
# Script de Configuración Automatizada
# Mayorista Virtual
# ============================================

echo "🚀 Iniciando configuración del Mayorista Virtual..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Node.js
echo "📦 Verificando Node.js..."
NODE_VERSION=$(node --version)
echo "Versión actual: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v20" ]]; then
    echo -e "${RED}⚠️  ADVERTENCIA: Node.js v20+ es requerido${NC}"
    echo "Tu versión actual es: $NODE_VERSION"
    echo ""
    echo "Para actualizar Node.js en macOS:"
    echo "  1. Con Homebrew: brew install node@20"
    echo "  2. O descarga desde: https://nodejs.org"
    echo ""
    read -p "¿Deseas continuar de todos modos? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ Node.js versión correcta${NC}"
fi

echo ""

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install --legacy-peer-deps
    echo -e "${GREEN}✅ Dependencias instaladas${NC}"
else
    echo -e "${GREEN}✅ Dependencias ya instaladas${NC}"
fi

echo ""

# Verificar archivo .env.local
if [ ! -f ".env.local" ]; then
    echo "📝 Creando archivo .env.local..."
    cp .env.local.example .env.local
    echo -e "${YELLOW}⚠️  Debes configurar .env.local con tus credenciales de Supabase${NC}"
else
    echo -e "${GREEN}✅ Archivo .env.local existe${NC}"
fi

echo ""
echo "============================================"
echo "📋 PASOS SIGUIENTES (DEBES HACERLOS TÚ):"
echo "============================================"
echo ""
echo "1️⃣  Crear cuenta en Supabase (GRATIS):"
echo "   → Ve a: https://supabase.com"
echo "   → Crea una cuenta"
echo "   → Crea un nuevo proyecto"
echo ""
echo "2️⃣  Configurar Base de Datos:"
echo "   → En Supabase, ve a SQL Editor"
echo "   → Abre el archivo: supabase-setup.sql"
echo "   → Copia todo el contenido"
echo "   → Pégalo en el SQL Editor de Supabase"
echo "   → Haz clic en 'Run'"
echo ""
echo "3️⃣  Obtener Credenciales:"
echo "   → En Supabase, ve a Settings → API"
echo "   → Copia 'Project URL'"
echo "   → Copia 'anon public' key"
echo "   → Copia 'service_role' key"
echo ""
echo "4️⃣  Configurar .env.local:"
echo "   → Abre el archivo .env.local"
echo "   → Reemplaza los valores con tus credenciales"
echo ""
echo "5️⃣  Ejecutar el proyecto:"
echo "   → Ejecuta: npm run dev"
echo "   → Abre: http://localhost:3000"
echo ""
echo "============================================"
echo ""

# Preguntar si quiere abrir Supabase
read -p "¿Deseas abrir Supabase en el navegador ahora? (s/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    open "https://supabase.com"
    echo -e "${GREEN}✅ Abriendo Supabase...${NC}"
fi

echo ""
echo "============================================"
echo "📚 DOCUMENTACIÓN DISPONIBLE:"
echo "============================================"
echo "  • README.md - Documentación completa"
echo "  • INICIO-RAPIDO.md - Guía rápida (10 min)"
echo "  • GUIA-INSTALACION.md - Guía detallada"
echo "  • supabase-setup.sql - Script de base de datos"
echo ""
echo -e "${GREEN}✅ Configuración inicial completada${NC}"
echo ""
echo "Cuando hayas configurado Supabase, ejecuta:"
echo -e "${YELLOW}npm run dev${NC}"
echo ""

# Made with Bob
