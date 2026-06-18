#!/bin/bash

echo "🚀 Desplegando cambios de WhatsApp a GitHub..."
echo ""
echo "📝 Cambios a desplegar:"
echo "  ✅ Checkout con datos dummy prellenados"
echo "  ✅ Envío directo de pedidos por WhatsApp"
echo ""

cd /Users/gabrieladam/client-env/mayorista-virtual

# Verificar estado
echo "📊 Estado actual del repositorio:"
git status --short
echo ""

# Intentar push
echo "🔄 Intentando push a GitHub..."
echo ""

git push --set-upstream origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Push exitoso!"
    echo ""
    echo "🎉 Vercel desplegará automáticamente en 1-2 minutos"
    echo "📱 Verifica en: https://vercel.com/dashboard"
    echo "🌐 URL de la app: https://mayorista-virtual.vercel.app"
    echo ""
    echo "⏳ Espera 2 minutos y luego prueba en tu iPhone"
else
    echo ""
    echo "❌ Error en el push"
    echo ""
    echo "🔐 Necesitas autenticarte con GitHub"
    echo ""
    echo "📋 Opciones:"
    echo ""
    echo "1️⃣  OPCIÓN 1: Usar GitHub CLI (gh)"
    echo "   brew install gh"
    echo "   gh auth login"
    echo "   Luego ejecuta este script nuevamente"
    echo ""
    echo "2️⃣  OPCIÓN 2: Usar token personal"
    echo "   a) Ve a: https://github.com/settings/tokens"
    echo "   b) Genera un token con permisos 'repo'"
    echo "   c) Cuando te pida password, usa el token"
    echo ""
    echo "3️⃣  OPCIÓN 3: Desplegar desde Vercel Dashboard"
    echo "   a) Ve a: https://vercel.com/dashboard"
    echo "   b) Selecciona 'mayorista-virtual'"
    echo "   c) Ve a 'Deployments'"
    echo "   d) Haz clic en 'Redeploy' en el último deployment"
    echo ""
    echo "4️⃣  OPCIÓN 4: Conectar con SSH"
    echo "   git remote set-url origin git@github.com:gaby2275/tocha-berazategui.git"
    echo "   Luego ejecuta este script nuevamente"
    echo ""
fi

# Made with Bob
