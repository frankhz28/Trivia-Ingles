from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import random
import os
from typing import List

app = FastAPI(title="English Trivia Game - Present Simple vs Present Continuous")

# Modelo para las respuestas del usuario
class Answer(BaseModel):
    question_id: int
    selected_answer: str

# Base de datos de preguntas sobre Present Simple vs Present Continuous
questions_db = [
    {
        "id": 1,
        "question": "I _______ to work every day.",
        "options": ["go", "am going", "goes", "going"],
        "correct": "go",
        "explanation": "Present Simple se usa para rutinas y hábitos. 'Every day' indica rutina.",
        "grammar_point": "Present Simple - Routine/Habit"
    },
    {
        "id": 2,
        "question": "She _______ TV right now.",
        "options": ["watches", "is watching", "watch", "watching"],
        "correct": "is watching",
        "explanation": "Present Continuous se usa para acciones que están sucediendo ahora. 'Right now' es la clave.",
        "grammar_point": "Present Continuous - Action happening now"
    },
    {
        "id": 3,
        "question": "They usually _______ coffee in the morning.",
        "options": ["are drinking", "drink", "drinks", "drinking"],
        "correct": "drink",
        "explanation": "Present Simple para hábitos. 'Usually' indica frecuencia habitual.",
        "grammar_point": "Present Simple - Habit"
    },
    {
        "id": 4,
        "question": "Look! The cat _______ on the sofa.",
        "options": ["sleeps", "is sleeping", "sleep", "sleeping"],
        "correct": "is sleeping",
        "explanation": "Present Continuous para acciones en progreso. 'Look!' indica que sucede ahora.",
        "grammar_point": "Present Continuous - Action in progress"
    },
    {
        "id": 5,
        "question": "He _______ English and Spanish.",
        "options": ["is speaking", "speaks", "speak", "speaking"],
        "correct": "speaks",
        "explanation": "Present Simple para habilidades permanentes o hechos generales.",
        "grammar_point": "Present Simple - General fact"
    },
    {
        "id": 6,
        "question": "We _______ our homework at the moment.",
        "options": ["do", "are doing", "does", "doing"],
        "correct": "are doing",
        "explanation": "Present Continuous para acciones temporales. 'At the moment' indica tiempo presente.",
        "grammar_point": "Present Continuous - Temporary action"
    },
    {
        "id": 7,
        "question": "The sun _______ in the east.",
        "options": ["is rising", "rises", "rise", "rising"],
        "correct": "rises",
        "explanation": "Present Simple para hechos universales o verdades generales.",
        "grammar_point": "Present Simple - Universal truth"
    },
    {
        "id": 8,
        "question": "Listen! Someone _______ the piano.",
        "options": ["plays", "is playing", "play", "playing"],
        "correct": "is playing",
        "explanation": "Present Continuous para acciones que suceden en el momento. 'Listen!' es la clave.",
        "grammar_point": "Present Continuous - Action happening now"
    },
    {
        "id": 9,
        "question": "My brother _______ in London.",
        "options": ["is living", "lives", "live", "living"],
        "correct": "lives",
        "explanation": "Present Simple para situaciones permanentes o de largo plazo.",
        "grammar_point": "Present Simple - Permanent situation"
    },
    {
        "id": 10,
        "question": "I can't come to the phone. I _______ a shower.",
        "options": ["take", "am taking", "takes", "taking"],
        "correct": "am taking",
        "explanation": "Present Continuous para acciones temporales que están sucediendo ahora.",
        "grammar_point": "Present Continuous - Action in progress"
    }
]

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_root():
    """Servir la página principal del juego"""
    with open("static/index.html", "r", encoding="utf-8") as file:
        return HTMLResponse(content=file.read())

@app.get("/api/questions")
async def get_questions():
    """Obtener todas las preguntas sin las respuestas correctas"""
    questions_for_frontend = []
    for q in questions_db:
        question_copy = q.copy()
        # No enviar la respuesta correcta al frontend
        del question_copy["correct"]
        del question_copy["explanation"]
        questions_for_frontend.append(question_copy)
    
    # Mezclar las preguntas para mayor variedad
    random.shuffle(questions_for_frontend)
    return questions_for_frontend

@app.get("/api/question/{question_id}")
async def get_question(question_id: int):
    """Obtener una pregunta específica sin la respuesta correcta"""
    question = next((q for q in questions_db if q["id"] == question_id), None)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    question_copy = question.copy()
    del question_copy["correct"]
    del question_copy["explanation"]
    return question_copy

@app.post("/api/check-answer")
async def check_answer(answer: Answer):
    """Verificar si la respuesta es correcta"""
    question = next((q for q in questions_db if q["id"] == answer.question_id), None)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    is_correct = answer.selected_answer == question["correct"]
    
    return {
        "correct": is_correct,
        "correct_answer": question["correct"],
        "explanation": question["explanation"],
        "grammar_point": question["grammar_point"]
    }

@app.get("/api/random-questions/{count}")
async def get_random_questions(count: int = 5):
    """Obtener un número específico de preguntas aleatorias"""
    if count > len(questions_db):
        count = len(questions_db)
    
    selected_questions = random.sample(questions_db, count)
    questions_for_frontend = []
    
    for q in selected_questions:
        question_copy = q.copy()
        del question_copy["correct"]
        del question_copy["explanation"]
        questions_for_frontend.append(question_copy)
    
    return questions_for_frontend

if __name__ == "__main__":
    import uvicorn
    # Usar la variable de entorno PORT si está disponible (para deployment)
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
