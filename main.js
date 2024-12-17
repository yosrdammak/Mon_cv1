var Question = function (questionObj) {
    this.value = {
        text: "Question",
        answers: []
    }
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionAnswers = null;
    this.questionFeedback = null;

    this.value = Object.assign(this.value, questionObj);

    this.create = function () {
        this.html = document.createElement('div');
        this.html.classList.add('question');

        this.questionText = document.createElement('h2');
        this.questionText.textContent = this.value.text;

        this.questionAnswers = document.createElement('div');
        this.questionAnswers.classList.add('answers');

        for (let i = 0; i < this.value.answers.length; i++) {
            const ansObj = this.value.answers[i];
            let answer = createAnswer(ansObj);
            answer.onclick = (ev) => {
                if (this.selectedAnswer !== null) {
                    this.selectedAnswer.classList.remove('selected');
                }
                answer.classList.add('selected');

                this.html.dispatchEvent(new CustomEvent("question-answered", {
                    detail: {
                        answer: this.value.answers[i],
                        answerHtml: answer
                    }
                }));
                this.selectedAnswer = answer;
            };
            this.questionAnswers.appendChild(answer);
        }

        this.questionFeedback = document.createElement('div');
        this.questionFeedback.classList.add('question-feedback');

        this.html.appendChild(this.questionText);
        this.html.appendChild(this.questionAnswers);
        this.html.appendChild(this.questionFeedback);
    }

    function createAnswer(obj) {
        let answerObj = {
            text: "Answer",
            isCorrect: false
        };
        answerObj = Object.assign(answerObj, obj);

        let answerHtml = document.createElement('button');
        answerHtml.classList.add('answer');
        answerHtml.textContent = answerObj.text;

        return answerHtml;
    }
}// Définir les bonnes réponses
const correctAnswers = {
    q1: "a",
    q2: "a",
    q3: "a",
    q4: "a",
    q5: "b",
    q6: "a",
    q7: "c",
    q8: "a",
    q9: "b",
    q10: "c",
    q11: "b",
    q12: "a",
    q13: "a",
    q14: "c",
    q15: "b",
};
function validerQuiz() {
    let score = 0;
    // Récupérer toutes les questions
    const questions = document.querySelectorAll('.question');
    // Parcourir chaque question pour vérifier les réponses
    questions.forEach(question => {
        // Récupérer la réponse sélectionnée par l'utilisateur
        const selectedButton = question.querySelector('button.selected');
        const questionName = question.querySelector('button').getAttribute('data-question');
        if (selectedButton) {
            const userAnswer = selectedButton.getAttribute('data-answer');
            // Vérifier la réponse et la colorier
            if (userAnswer === correctAnswers[questionName]) {
                selectedButton.classList.add('correct');
                score++;
            } else {
                selectedButton.classList.add('incorrect');
            }
        }
    });
    // Afficher le score
    document.getElementById("result").innerText = `Votre score est : ${score} / ${Object.keys(correctAnswers).length}`;
}

// Ajouter un gestionnaire d'événements pour les boutons
const answerButtons = document.querySelectorAll('.answer');
answerButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Enlever la sélection de tous les boutons de la même question
        const buttons = this.parentElement.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('selected'));

        // Ajouter la classe "selected" au bouton cliqué
        this.classList.add('selected');
    });
});
function restartQuiz() {
    // Par exemple, pour recharger la page :
    location.reload();
}
//page contact
document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche l'envoi réel du formulaire

    // Récupération des valeurs des champs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validation des champs (basique)
    if (name && email && message) {
        // Message de succès
        showResponseMessage('Merci, ' + name + '! Votre message a été reçu.', 'success');
    } else {
        // Message d'erreur
        showResponseMessage('Veuillez remplir tous les champs.', 'error');
    }
});

// Afficher un message de réponse
function showResponseMessage(message, type) {
    const responseMessage = document.getElementById('response-message');
    responseMessage.classList.remove('hidden');
    responseMessage.classList.add(type);
    responseMessage.textContent = message;

    // Cacher le message après 5 secondes
    setTimeout(() => {
        responseMessage.classList.add('hidden');
    }, 5000);
}
