const questions = [
    {
        question: "What does JavaScript primarily allow you to do?",
        answers: ["Style web pages", "Add interactivity to web pages", "Send emails", "Create 3D graphics"],
        correct: 1,
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: ["var", "int", "string", "variable"],
        correct: 0,
    },

    {
        question: "What is the correct way to comment in JavaScript?",
        answers: ["//This is a comment", "/This is a comment/", "<!--This is a comment-->", "'This is a comment'"],
        correct: 0,
    },

    {
        question: "Which operator is used for equality comparison in JavaScript?",
        answers: ["==", "===", "=", "!=="],
        correct: 1,
    },

    {
        question: "Which of the following is not a JavaScript data type?",
        answers: ["String", "Boolean", "Float", "Number"],
        correct: 3,
    },

    {
        question: "How do you declare a function in JavaScript?",
        answers: ["function myFunction()", "def myFunction()", "void myFunction()", "subroutine myFunction()"],
        correct: 0,
    },

    {
        question: "Which method is used to display a message in a popup dialog box in JavaScript?",
        answers: ["alert()", "message()", "popup()", "display()"],
        correct: 0,
    },

    {
        question: "Which symbol is used to access the properties and methods of an object in JavaScript?",
        answers: [".", "::", "->", ":::"],
        correct: 0,
    },

    {
        question: "What is the purpose of the parseInt() function in JavaScript?",
        answers: ["To parse JSON data", "To convert a string to an integer", "To round a number", "To format text"],
        correct: 1,
    },

    {
        question: "Which loop is used for iterating over the properties of an object?",
        answers: ["for loop", "while loop", "do-while loop", "for...in loop"],
        correct: 0,
    },

    {
        question: "Which statement is used to exit a loop in JavaScript?",
        answers: ["stop", "exit", "break", "return"],
        correct: 2,
    },

    {
        question: "What does the 'typeof' operator return for an array?",
        answers: ["array", "object", "list", "collection"],
        correct: 1,
    },

    {
        question: "How do you write a single-line comment in JavaScript?",
        answers: ["//This is a comment", "/* This is a comment */", "#This is a comment", "'This is a comment'"],
        correct: 0,
    },

    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        answers: ["push()", "append()", "add()", "insert()"],
        correct: 0,
    },

    {
        question: "What does the NaN value represent in JavaScript?",
        answers: ["Not a Number", "No Answer", "Null", "Negative Number"],
        correct: 0,
    },

    {
        question: "Which operator is used to combine two or more strings in JavaScript?",
        answers: ["+", "&", "*", "/"],
        correct: 0,
    },

    {
        question: "What is the purpose of the console.log() function in JavaScript?",
        answers: ["To log errors", "To display messages in the console", "To create a new console", "To clear the console"],
        correct: 1,
    },

    {
        question: "Which keyword is used to declare a constant variable in JavaScript?",
        answers: ["let", "var", "const", "constant"],
        correct: 2,
    },

    {
        question: "Which of the following is used to store multiple values in a single variable in JavaScript?",
        answers: ["Array", "Object", "String", "Function"],
        correct: 0,
    },

    {
        question: "What does the 'else' statement do in JavaScript?",
        answers: ["It specifies the condition of a loop", "It defines a new variable", "It executes a block of code if the condition is false", "It exits the program"],
        correct: 2,
    }
]

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

const startButton = document.getElementById("start");
const highscoreWelcomeButton = document.getElementById("highscoreWelcome");
const highscoreQuestionButton = document.getElementById("highscoreQuestion");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-button");
const timerElement = document.getElementById("timer");
const highscoreList = document.getElementById("hsList");
const backButton = document.getElementById("back");
const quizDone = document.getElementById("quizDone");
const backHS = document.getElementById("backHS");
let intervalId;

function showWelcome() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const questionSection = document.getElementById("questionSection");
    welcomeScreen.style.display = "block";
    questionSection.style.display = "none";
    highscoreScreen.style.display = "none";
    quizDone.style.display = "none";
}

function startQuiz() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const questionSection = document.getElementById("questionSection");
    welcomeScreen.style.display = "none";
    questionSection.style.display = "block";
    highscoreScreen.style.display = "none";
    quizDone.style.display = "none";
    timeLeft = 60;
    updateTimerDisplay();
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;

    // Update answer buttons
    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index];
    });
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        if (timeLeft <= 0) {
            endQuiz();
        } else {
            currentQuestionIndex = 0;
            displayQuestion();
        }
    }
}

function endQuiz() {
    clearInterval(intervalId);
    questionElement.textContent = "Quiz Finished!";
    welcomeScreen.style.display = "none";
    questionSection.style.display = "none";
    highscoreScreen.style.display = "none";
    quizDone.style.display = "block";
    timeLeft = 60; 
    updateTimerDisplay();
}

function startTimer() {
    intervalId = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            endQuiz();
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerElement.textContent = formattedTime;
}

function showHighscores() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const questionSection = document.getElementById("questionSection");
    const highscoreScreen = document.getElementById("highscoreScreen");
    welcomeScreen.style.display = "none";
    questionSection.style.display = "none";
    highscoreScreen.style.display = "block";
}

startButton.addEventListener("click", startQuiz);
highscoreWelcomeButton.addEventListener("click", showHighscores);
highscoreQuestionButton.addEventListener("click", showHighscores);
backHS.addEventListener("click", showWelcome);
backButton.addEventListener("click", showWelcome);

answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectAnswer(index));
});