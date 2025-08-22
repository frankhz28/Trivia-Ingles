class TriviaGame {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.gameStarted = false;
        this.mistakes = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadQuestions();
    }

    initializeElements() {
        // Screens
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.finalScreen = document.getElementById('final-screen');
        this.loadingElement = document.getElementById('loading');

        // Game elements
        this.scoreElement = document.getElementById('score');
        this.currentQuestionElement = document.getElementById('current-question');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.questionTextElement = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.grammarPointElement = document.getElementById('grammar-point');

        // Buttons
        this.startGameBtn = document.getElementById('start-game');
        this.submitAnswerBtn = document.getElementById('submit-answer');
        this.nextQuestionBtn = document.getElementById('next-question');
        this.finishGameBtn = document.getElementById('finish-game');
        this.playAgainBtn = document.getElementById('play-again');
        this.reviewMistakesBtn = document.getElementById('review-mistakes');

        // Result elements
        this.resultTitle = document.getElementById('result-title');
        this.finalScoreElement = document.getElementById('final-score');
        this.resultExplanation = document.getElementById('result-explanation');
        this.correctAnswerElement = document.getElementById('correct-answer');
        this.gameFinalScore = document.getElementById('game-final-score');
        this.performanceMessage = document.getElementById('performance-message');
    }

    bindEvents() {
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.submitAnswerBtn.addEventListener('click', () => this.submitAnswer());
        this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        this.finishGameBtn.addEventListener('click', () => this.showFinalScreen());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.reviewMistakesBtn.addEventListener('click', () => this.reviewMistakes());
    }

    async loadQuestions() {
        try {
            this.showLoading(true);
            const response = await fetch('/api/random-questions/5');
            if (!response.ok) {
                throw new Error('Failed to load questions');
            }
            this.questions = await response.json();
            this.totalQuestionsElement.textContent = this.questions.length;
            this.showLoading(false);
        } catch (error) {
            console.error('Error loading questions:', error);
            alert('Error al cargar las preguntas. Por favor, intenta de nuevo.');
            this.showLoading(false);
        }
    }

    showLoading(show) {
        if (show) {
            this.loadingElement.classList.remove('hidden');
        } else {
            this.loadingElement.classList.add('hidden');
        }
    }

    startGame() {
        this.gameStarted = true;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.mistakes = [];
        this.updateScore();
        this.showScreen('game');
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showFinalScreen();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // Update question counter
        this.currentQuestionElement.textContent = this.currentQuestionIndex + 1;
        
        // Display grammar point (remove from question since we don't have it in the API response)
        this.grammarPointElement.textContent = `Pregunta ${this.currentQuestionIndex + 1}`;
        
        // Display question text
        this.questionTextElement.textContent = question.question;
        
        // Clear and populate options
        this.optionsContainer.innerHTML = '';
        this.selectedAnswer = null;
        this.submitAnswerBtn.disabled = true;
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectOption(option, optionElement));
            this.optionsContainer.appendChild(optionElement);
        });
    }

    selectOption(answer, element) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select current option
        element.classList.add('selected');
        this.selectedAnswer = answer;
        this.submitAnswerBtn.disabled = false;
    }

    async submitAnswer() {
        if (!this.selectedAnswer) return;

        try {
            this.showLoading(true);
            const question = this.questions[this.currentQuestionIndex];
            
            const response = await fetch('/api/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question_id: question.id,
                    selected_answer: this.selectedAnswer
                })
            });

            if (!response.ok) {
                throw new Error('Failed to check answer');
            }

            const result = await response.json();
            this.showLoading(false);
            this.showResult(result);
            
        } catch (error) {
            console.error('Error checking answer:', error);
            alert('Error al verificar la respuesta. Por favor, intenta de nuevo.');
            this.showLoading(false);
        }
    }

    showResult(result) {
        const question = this.questions[this.currentQuestionIndex];
        
        // Update option colors
        document.querySelectorAll('.option').forEach(opt => {
            const optionText = opt.textContent;
            if (optionText === result.correct_answer) {
                opt.classList.add('correct');
            } else if (optionText === this.selectedAnswer && !result.correct) {
                opt.classList.add('incorrect');
            }
        });

        // Update score if correct
        if (result.correct) {
            this.score++;
            this.updateScore();
            this.resultTitle.textContent = '¡Correcto! 🎉';
            this.resultTitle.style.color = '#4CAF50';
        } else {
            this.resultTitle.textContent = '¡Incorrecto! 😔';
            this.resultTitle.style.color = '#f44336';
            
            // Store mistake for review
            this.mistakes.push({
                question: question.question,
                yourAnswer: this.selectedAnswer,
                correctAnswer: result.correct_answer,
                explanation: result.explanation
            });
        }

        // Show explanation
        this.resultExplanation.textContent = result.explanation;
        this.correctAnswerElement.textContent = `Respuesta correcta: "${result.correct_answer}"`;
        
        // Update final score display
        this.finalScoreElement.textContent = `${this.score}/${this.currentQuestionIndex + 1}`;
        
        // Show appropriate button
        if (this.currentQuestionIndex === this.questions.length - 1) {
            this.nextQuestionBtn.classList.add('hidden');
            this.finishGameBtn.classList.remove('hidden');
        } else {
            this.nextQuestionBtn.classList.remove('hidden');
            this.finishGameBtn.classList.add('hidden');
        }

        this.showScreen('result');
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showScreen('game');
        this.displayQuestion();
    }

    showFinalScreen() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.gameFinalScore.textContent = `${this.score}/${this.questions.length} (${percentage}%)`;
        
        // Performance message
        let performanceClass = '';
        let performanceText = '';
        
        if (percentage >= 80) {
            performanceClass = 'excellent';
            performanceText = '¡Excelente trabajo! 🌟 Dominas muy bien la diferencia entre Present Simple y Present Continuous.';
        } else if (percentage >= 60) {
            performanceClass = 'good';
            performanceText = '¡Buen trabajo! 👏 Tienes una buena comprensión, pero puedes seguir mejorando.';
        } else {
            performanceClass = 'needs-improvement';
            performanceText = '¡Sigue practicando! 💪 Revisar las reglas te ayudará a mejorar.';
        }
        
        this.performanceMessage.textContent = performanceText;
        this.performanceMessage.className = `performance ${performanceClass}`;
        
        // Show/hide review button based on mistakes
        if (this.mistakes.length > 0) {
            this.reviewMistakesBtn.classList.remove('hidden');
        } else {
            this.reviewMistakesBtn.classList.add('hidden');
        }
        
        this.showScreen('final');
    }

    reviewMistakes() {
        if (this.mistakes.length === 0) {
            alert('¡No tienes errores que revisar! ¡Perfecto!');
            return;
        }
        
        let reviewText = '📝 REVISIÓN DE ERRORES:\n\n';
        this.mistakes.forEach((mistake, index) => {
            reviewText += `${index + 1}. ${mistake.question}\n`;
            reviewText += `   Tu respuesta: "${mistake.yourAnswer}"\n`;
            reviewText += `   Respuesta correcta: "${mistake.correctAnswer}"\n`;
            reviewText += `   Explicación: ${mistake.explanation}\n\n`;
        });
        
        alert(reviewText);
    }

    resetGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.gameStarted = false;
        this.mistakes = [];
        this.updateScore();
        this.loadQuestions().then(() => {
            this.showScreen('start');
        });
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    showScreen(screenName) {
        // Hide all screens
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.add('hidden');
        this.finalScreen.classList.add('hidden');
        
        // Show selected screen
        switch (screenName) {
            case 'start':
                this.startScreen.classList.remove('hidden');
                break;
            case 'game':
                this.gameScreen.classList.remove('hidden');
                break;
            case 'result':
                this.resultScreen.classList.remove('hidden');
                break;
            case 'final':
                this.finalScreen.classList.remove('hidden');
                break;
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TriviaGame();
});
