# 🌐 Guía Detallada de Deployment

## 🏆 RECOMENDACIÓN: Render.com (Más fácil y confiable)

### Pasos para Render.com:

1. **Preparar código**:
   ```bash
   ./deploy_prep.sh  # Ejecutar script de preparación
   git commit -m "Initial commit - English Trivia Game"
   ```

2. **Subir a GitHub**:
   - Crear repositorio en GitHub
   - `git remote add origin https://github.com/tu-usuario/tu-repo.git`
   - `git push -u origin main`

3. **Deploy en Render**:
   - Ir a [render.com](https://render.com) y crear cuenta
   - Nuevo → Web Service
   - Conectar repositorio de GitHub
   - Configuración:
     ```
     Name: english-trivia-game
     Build Command: pip install -r requirements.txt
     Start Command: python main.py
     ```

4. **¡Listo!** Tu URL será: `https://english-trivia-game.onrender.com`

---

## 🚂 Alternativa: Railway.app

1. **Preparar código** (igual que arriba)
2. **Deploy en Railway**:
   - Ir a [railway.app](https://railway.app)
   - Deploy from GitHub
   - Seleccionar tu repositorio
   - ¡Deploy automático!

---

## 🐍 Alternativa: PythonAnywhere

1. **Crear cuenta gratuita** en [pythonanywhere.com](https://pythonanywhere.com)
2. **Subir archivos**:
   ```bash
   # En la consola de PythonAnywhere
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   pip3.10 install --user -r requirements.txt
   ```
3. **Crear Web App**:
   - Web → Add a new web app
   - Manual configuration → Python 3.10
   - Configurar WSGI file para FastAPI

---

## ⚙️ Variables de Entorno Comunes

Para todos los servicios, puedes configurar:
```
PORT=8000  # Si es requerido
PYTHON_VERSION=3.11
```

---

## 🔧 Troubleshooting

### Error: "Port already in use"
- Render/Railway manejan esto automáticamente
- Si usas Heroku: asegúrate de usar `os.environ.get("PORT")`

### Error: "Module not found"
- Verificar que `requirements.txt` esté completo
- Verificar que la versión de Python sea compatible

### Aplicación se "duerme"
- Normal en planes gratuitos (Render, Railway)
- Primera carga después de inactividad puede tardar 30-60 segundos
- Para mantenerla activa: usar servicios como UptimeRobot (gratuito)

---

## 🎯 Recomendaciones por Uso

**Para aprendizaje/demo**: Render.com (gratuito, fácil)
**Para proyecto serio**: Railway ($5/mes, mejor performance)
**Para experimentar**: PythonAnywhere (limitado pero educativo)

---

## 📱 Bonus: Hacer PWA (Progressive Web App)

Agrega a `static/index.html` en el `<head>`:
```html
<link rel="manifest" href="/static/manifest.json">
<meta name="theme-color" content="#667eea">
```

Y crea `static/manifest.json`:
```json
{
  "name": "English Trivia Game",
  "short_name": "English Trivia",
  "description": "Learn Present Simple vs Present Continuous",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

¡Esto permitirá instalar tu juego como app en móviles!
