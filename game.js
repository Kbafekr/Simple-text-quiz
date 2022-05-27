const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// questions
 
let questions = [
    {
        "question": "What did the Avengers eat after the invasion of New York?",
        "choice1": "Schawarma",
        "choice2": "Pizza",
        "choice3": "Samosas",
        "choice4": "Falafel",
        "answer": 1
    },
    
    {
        "question": "How many in-person cameos has Stan Lee done for the MCU?",
        "choice1": "20",
        "choice2": "21",
        "choice3": "22",
        "choice4": "24",
        "answer": 3
    },

    {
        "question": "Who takes over the Black Widow mantle after Natasha Romanoff?",
        "choice1": "Alexei Shostakov",
        "choice2": "Melina Vostokoff",
        "choice3": "Yelena Belova",
        "choice4": "Kate Bishop",
        "answer": 3
    },
    
    {
        "question": "Who founded the Time Variance Authority?",
        "choice1": "The Collector",
        "choice2": "Emil Blonsky",
        "choice3": "Aldrich Killian",
        "choice4": "Nathaniel Richards",
        "answer": 4
    },
    
    {
        "question": "What year does Avengers: Endgame take place in?",
        "choice1": "2022",
        "choice2": "2023",
        "choice3": "2024",
        "choice4": "2025",
        "answer": 2
    },
    
    {
        "question": "What universe does the MCU take place in?",
        "choice1": "813",
        "choice2": "98",
        "choice3": "Earth-2",
        "choice4": "616",
        "answer": 4
    },
    
    {
        "question": "Who caused Nick Fury to loose his eye?",
        "choice1": "Hank Pym",
        "choice2": "Ronan the Accuser",
        "choice3": "Alexander Pierce",
        "choice4": "Goose",
        "answer": 4
    },
    
    {
        "question": "Who is Thor's mother?",
        "choice1": "Sylvie",
        "choice2": "Hela",
        "choice3": "Frigga",
        "choice4": "Sersi",
        "answer": 3
    },
    
    {
        "question": "Star-Lord is half-human and half what?",
        "choice1": "Kree",
        "choice2": "Elfian",
        "choice3": "Celestial",
        "choice4": "Inhuman",
        "answer": 3
    },

    {
        "question": "Who introduced Wanda Maximoff to dark magic",
        "choice1": "Evanora",
        "choice2": "Agatha",
        "choice3": "Clea",
        "choice4": "Dr. Strange",
        "answer": 2
    }
]

//constants
game.classList.remove('hidden');
loader.classList.add('hidden');


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
    
};

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html")};

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach((choice) => {

        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

    choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct")
        { incrementScore(CORRECT_BONUS); 
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score;
}

startGame()