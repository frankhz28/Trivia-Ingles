#!/bin/bash

# Script para preparar el proyecto para deployment
echo "🚀 Preparando proyecto para deployment..."

# Verificar que estamos en el directorio correcto
if [ ! -f "main.py" ]; then
    echo "❌ Error: No se encontró main.py. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar que git esté inicializado
if [ ! -d ".git" ]; then
    echo "📦 Inicializando repositorio Git..."
    git init
    echo "✅ Repositorio Git inicializado"
fi

# Agregar archivos al staging
echo "📁 Agregando archivos al repositorio..."
git add .

# Verificar el estado
echo "📊 Estado del repositorio:"
git status

echo ""
echo "🎯 Tu proyecto está listo para deployment!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Hacer commit: git commit -m 'Initial commit - English Trivia Game'"
echo "2. Crear repositorio en GitHub"
echo "3. Conectar con tu repositorio: git remote add origin <URL_DE_TU_REPO>"
echo "4. Subir código: git push -u origin main"
echo "5. Ir a Render.com y conectar tu repositorio"
echo ""
echo "⚙️  Configuración para Render:"
echo "   Build Command: pip install -r requirements.txt"
echo "   Start Command: python main.py"
echo "   Environment: Python 3"
echo ""
echo "🌐 Una vez deployado, tu juego estará disponible en línea!"
