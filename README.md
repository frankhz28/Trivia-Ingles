# English Trivia Game - Present Simple vs Present Continuous

Un juego interactivo de trivia para aprender la diferencia entre Present Simple y Present Continuous en inglés.

## 🎯 Características

- **Backend**: FastAPI con Python
- **Frontend**: JavaScript vanilla con CSS moderno
- **Preguntas**: 10 preguntas cuidadosamente diseñadas sobre Present Simple vs Present Continuous
- **Interfaz moderna**: Diseño responsive y atractivo
- **Explicaciones**: Cada respuesta incluye una explicación detallada
- **Sistema de puntuación**: Seguimiento del progreso y revisión de errores

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Python 3.7 o superior
- pip (incluido con Python)

### Pasos de instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd TriviaJs
   ```

2. **Crear entorno virtual (opcional pero recomendado)**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # En Linux/macOS
   # .venv\Scripts\activate   # En Windows
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**
   ```bash
   python main.py
   ```
   
   O usando uvicorn directamente:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8001
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:8001
   ```

## 🎮 Cómo Jugar

1. **Inicio**: Haz clic en "Comenzar Juego" en la pantalla de bienvenida
2. **Responder**: Lee cada pregunta y selecciona la opción correcta
3. **Explicación**: Después de cada respuesta, verás una explicación detallada
4. **Progreso**: Sigue tu puntuación y progreso a través del juego
5. **Revisión**: Al final, puedes revisar tus errores para aprender más

## 📚 Reglas Gramáticales

### Present Simple
- **Uso**: Rutinas, hábitos, hechos generales, verdades universales
- **Ejemplos**: 
  - "I work every day" (rutina)
  - "The sun rises in the east" (verdad universal)
  - "She speaks English" (habilidad/hecho general)

### Present Continuous
- **Uso**: Acciones que suceden ahora, acciones temporales en progreso
- **Ejemplos**:
  - "I am working now" (acción presente)
  - "She is speaking on the phone" (acción en progreso)
  - "We are studying this week" (acción temporal)

## 🛠️ Estructura del Proyecto

```
TriviaJs/
├── main.py                 # Aplicación FastAPI principal
├── requirements.txt        # Dependencias de Python
├── README.md              # Este archivo
└── static/                # Archivos estáticos del frontend
    ├── index.html         # Página principal
    ├── styles.css         # Estilos CSS
    └── script.js          # Lógica JavaScript
```

## 🔧 API Endpoints

- `GET /` - Página principal del juego
- `GET /api/questions` - Obtener todas las preguntas
- `GET /api/random-questions/{count}` - Obtener preguntas aleatorias
- `POST /api/check-answer` - Verificar una respuesta

## 🎨 Características Técnicas

- **Responsive Design**: Funciona en móviles, tablets y escritorio
- **Interfaz moderna**: Gradientes, animaciones y efectos visuales
- **Feedback inmediato**: Colores y animaciones para indicar respuestas correctas/incorrectas
- **Sistema de carga**: Indicadores de progreso durante las peticiones API
- **Gestión de estado**: JavaScript organizado en clases para mejor mantenimiento

## 🔄 Personalización

### Agregar más preguntas
Edita el array `questions_db` en `main.py` para agregar nuevas preguntas:

```python
{
    "id": 11,
    "question": "Tu nueva pregunta aquí _______ ?",
    "options": ["opción1", "opción2", "opción3", "opción4"],
    "correct": "opción_correcta",
    "explanation": "Explicación de por qué esta es la respuesta correcta.",
    "grammar_point": "Present Simple/Continuous - Concepto"
}
```

### Modificar estilos
Edita `static/styles.css` para cambiar colores, fuentes o el diseño general.

### Cambiar configuraciones del juego
En `static/script.js`, puedes modificar:
- Número de preguntas por juego (línea de `/api/random-questions/5`)
- Mensajes de rendimiento
- Lógica de puntuación

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes:
- Agregar más preguntas
- Mejorar el diseño
- Agregar nuevas características
- Corregir errores

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🎓 Objetivo Educativo

Este juego está diseñado para ayudar a estudiantes de inglés a:
- Entender la diferencia entre Present Simple y Present Continuous
- Practicar con ejercicios interactivos
- Aprender de sus errores con explicaciones detalladas
- Mejorar su comprensión a través de la repetición

¡Diviértete aprendiendo inglés! 🎉

## 🌐 Deployment a Servidores Gratuitos

### Opción 1: Render (Recomendado)

1. **Preparar el proyecto**:
   - Sube tu código a GitHub
   - Asegúrate de tener `requirements.txt` y `main.py`

2. **Crear cuenta en Render**:
   - Ve a [render.com](https://render.com)
   - Crea una cuenta gratuita

3. **Deploy**:
   - Conecta tu repositorio de GitHub
   - Configura el servicio:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `python main.py`
     - **Environment**: Python 3

4. **Variables de entorno** (si necesitas):
   ```
   PORT=8001
   ```

### Opción 2: Railway

1. **Crear cuenta en Railway**:
   - Ve a [railway.app](https://railway.app)
   - Conecta con GitHub

2. **Deploy desde GitHub**:
   - Selecciona tu repositorio
   - Railway detectará automáticamente que es Python
   - El deploy será automático

### Opción 3: PythonAnywhere

1. **Crear cuenta gratuita**:
   - Ve a [pythonanywhere.com](https://pythonanywhere.com)
   - Registra una cuenta gratuita

2. **Subir archivos**:
   - Usa el file manager o Git para subir tu código
   - Instala dependencias: `pip3.10 install --user -r requirements.txt`

3. **Configurar Web App**:
   - Crea una nueva Web App
   - Configura para usar FastAPI/ASGI

### 📋 Archivos Adicionales para Deploy

Para facilitar el deployment, puedes crear estos archivos:

#### `Procfile` (para Heroku/Railway):
```
web: python main.py
```

#### `runtime.txt` (especificar versión de Python):
```
python-3.11
```

#### `app.yaml` (para Google App Engine):
```yaml
runtime: python311
service: default

env_variables:
  PORT: 8080

automatic_scaling:
  min_instances: 0
  max_instances: 1
```

### 🔧 Ajustes para Producción

Modifica `main.py` para producción:

```python
import os

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
```

### 💡 Tips para Deployment

1. **Variables de entorno**: Usa variables de entorno para configuraciones
2. **Logs**: Añade logging para debugging en producción
3. **CORS**: Si planeas usar el frontend desde otro dominio
4. **HTTPS**: Los servicios gratuitos suelen incluir SSL automático
5. **Dominio personalizado**: Algunos servicios permiten dominios custom

### 🚀 Pasos Rápidos para Render

1. Fork/sube tu código a GitHub
2. Ve a Render → New → Web Service
3. Conecta tu repo de GitHub
4. Configura:
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `python main.py`
5. ¡Deploy automático!

Tu juego estará disponible en una URL como: `https://tu-proyecto.onrender.com`
