const questions = [
    {
        question : "What is the name of the alternate dimension in the show?",
        options : ["The Upside Down", "The Dark Realm", "The Void", "The Hollow"],
        answer : "The Upside Down"
    },
    {
        question : "What is Eleven's real name?",
        options : ["Jane Hopper", "Jane Ives", "Jane Byers", "Jane Wheeler"],
        answer : "Jane Ives"
    },
    {
        question : "What is the name of the lab experimenting on Eleven?",
        options : ["Area 51", "Site 9", "Hawkins Lab", "Brenner Institute"],
        answer : "Hawkins Lab"
    },
    {
        question : "What is the name of the main villain in Season 4?",
        option : ["The Mind Flayer", "Vecna", "Billy", "Henry Creel"],
        answer : "Vecna"
    },
    {
        question : "Which song helps save Max in Season 4?",
        option : ["Every Breath You Take - The Police", "Master Of Puppets - Metallica", "Running Up That Hill - Kate Bush", "Should I Stay Or Should I Go - The Clash"],
        answer : "Running Up That Hill - Kate Bush"
    }
];

let currentQuestion = 0;
let score = 0;
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const scoreText = document.getElementById("score-text");

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);

function startQuiz(){
    currentQuestion = 0;
    score = 0;
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    showQuestion();
}

function showQuestion(){
    const current = questions[currentQuestion];
    questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionText.textContent = current.question;
    optionsBox.innerHTML = "";
    current.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => selectAnswer(button, option));
        optionsBox.appendChild(button);
    });
}

function selectAnswer(button, selectedOption){
    const current = questions[currentQuestion];
    const allButtons = document.querySelectorAll(".option-button");
    allButtons.forEach((b) => (b.disabled = true));
    if(selectedOption === current.answer){
        button.classList.add("correct");
        score++;
    }
    else{
        button.classList.add("wrong");
        allButtons.forEach((b) => {
            if(b.textContent === current.answer){
                b.classList.add("correct");
            }
        });
    }

    setTimeout(() => {
        currentQuestion ++;
        if(currentQuestion < questions.length){
            showQuestion();
        }
        else{
            showResults();
        }
    }, 1000);
}

function showResults(){
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

document.getElementById("home-logo").addEventListener("click", () => {
    startScreen.classList.remove("hidden");
    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    currentQuestion = 0;
    score = 0;
});