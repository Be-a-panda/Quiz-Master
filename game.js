const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Scientific name of MANGO IS?',
        choice1: 'Magnifera indica',
        choice2: 'Citrus Aurantium',
        choice3: 'Tamarindus indica',
        choice4: 'Musa paradisicum',
        answer: 1,
    },
    {
        question:
            "The tallest building in the world is located in which city?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "In Cricket, two sets of wickets are:",
        choice1: "18 yards apart",
        choice2: "20 yards apart",
        choice3: "22 yards apart",
        choice4: "24 yards apart",
        answer: 3,
    },
    {
        question: "Which part of the Body is affected by the disease Goitre?",
        choice1: "Liver",
        choice2: "Tongue",
        choice3: "Thyroid Gland",
        choice4: "Eye",
        answer: 3,
    },
	{
        question: "The Cbaracter Alice in fiction story 'Alice in wonderland' was created by?",
        choice1: "George Bernard",
        choice2: "Lewis Caroll",
        choice3: "Lan Fleming",
        choice4: "William Shakespeare",
        answer: 2,
    },
	{
        question: "Who discovered sea route to India via Cape of Good Hope?",
        choice1: "Christoper Columbus",
        choice2: "Kepler",
        choice3: "Vasco-da-Gama",
        choice4: "Marco polo",
        answer: 3,
    },
	{
        question: "Select the word which cannot be formed using the letter of the word - INTERNATIONAL.",
        choice1: "LATTER",
        choice2: "RATIONALE",
        choice3: "ORIENTAL",
        choice4: "TERMINAL",
        answer: 4,
    },
	{
        question: "Find the Odd one Out-- 9, 14, 21, 27?",
        choice1: "9",
        choice2: "14",
        choice3: "21",
        choice4: "27",
        answer: 2,
    },
	{
        question: "Who was the Founder of Mughal dyansty in India?",
        choice1: "Humayun",
        choice2: "Babur",
        choice3: "Akbar",
        choice4: "Jehangir",
        answer: 2,
    },
	{
        question: "How many times India have won the Cricket World Cup?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 2,
    }
	
	
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()