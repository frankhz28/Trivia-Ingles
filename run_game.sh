#!/bin/bash

# Script para ejecutar el juego de trivia
# Asegúrate de tener permisos de ejecución: chmod +x run_game.sh

echo "🎯 Iniciando English Trivia Game..."
echo "📚 Present Simple vs Present Continuous"
echo ""

# Activar entorno virtual si existe
if [ -d ".venv" ]; then
    echo "Activando entorno virtual..."
    source .venv/bin/activate
fi

# Verificar si FastAPI está instalado
python -c "import fastapi" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "❌ FastAPI no encontrado. Instalando dependencias..."
    pip install -r requirements.txt
fi

echo "🚀 Iniciando servidor en http://localhost:8001"
echo "💡 Presiona Ctrl+C para detener el servidor"
echo ""

# Ejecutar la aplicación
python main.py
