let lastWord = "";
let currentScore = 0;
let isFirstTurn = true;
let countdown = 60;
let intervalId = null;
let multi = 2;
let minTime = 8;

const previousWords = new Set();

const VALID = "";
const NOT_A_WORD = "This is not a recognised word.";
const ALREADY_CHOSEN = "You have already used this word.";
const INCORRECT_LENGTH = "Words must be 5 letters long.";
const TOO_MANY_MODIFICATIONS = "You can only change one letter per turn.";

document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');

    window.addEventListener(
        "keydown",
        (event) => {
            if (event.keyCode == 13){
                event.preventDefault();
                word = wordInput.textContent;
                wordInput.textContent = '';
                useWord(word)
            }
        },
        true,
    );

    const enter = document.getElementById('ENTER');
    enter.addEventListener('click', (event) => {
        word = wordInput.textContent;
        wordInput.textContent = '';
        useWord(word)
    }, true,);

    const btnEasy = document.getElementById('btn-easy')
    const btnMedium = document.getElementById('btn-medium')
    const btnHard = document.getElementById('btn-hard')
    btnEasy.addEventListener('click', (event) => {
        setDiff(1);
        btnEasy.className = "button-small-light"
        btnMedium.className = "button-small-dark"
        btnHard.className = "button-small-dark"
    });
    btnMedium.addEventListener('click', (event) => {
        setDiff(2);
        btnEasy.className = "button-small-dark"
        btnMedium.className = "button-small-light"
        btnHard.className = "button-small-dark"
    });
    btnHard.addEventListener('click', (event) => {
        setDiff(3);
        btnEasy.className = "button-small-dark"
        btnMedium.className = "button-small-dark"
        btnHard.className = "button-small-light"
    });
});


function useWord(userWord){
    word = userWord.toUpperCase();
    if(isFirstTurn){
        setInitialWord(word);
    } else {
        addWord(word);
    }
}

function setInitialWord(word) {
    const gameState = validateWord(word, previousWords);
    if (gameState === VALID) {
        previousWords.add(word);
        lastWord = word;
        isFirstTurn = false;
        startCountdown();
        addWordDiv(word);
        const introText = document.getElementById('heading');
        introText.remove();
        const inputElement = document.getElementById('word-input');
        inputElement.className = 'monster-input'
        addResult(gameState)
    } else {
        addError(gameState)
    }
}

function addWord(word) {
    let gameState = validateWord(word, previousWords);
    if (gameState !== VALID) {
        addError(gameState);
        return;
    }
    gameState = validatePreviousWord(word, lastWord);
    if (gameState !== VALID) {
        addError(gameState);
        return;
    }
    previousWords.add(word);
    currentScore = currentScore + 1;
    lastWord = word;
    addWordDiv(lastWord);
    addResult(gameState);
    resetCountdown();
    return;
}

function validatePreviousWord(word, lastWord) {
    const lastWordCharacters = Array.from(lastWord);
    const nextWordCharacters = Array.from(word);
    let foundChanged = false;
    for (const char of nextWordCharacters) {
        const index = lastWordCharacters.indexOf(char);
        if (index === -1) {
            if (foundChanged) {
                return TOO_MANY_MODIFICATIONS;
            }
            foundChanged = true;
        } else {
            lastWordCharacters.splice(index, 1);
        }
    }
    return VALID;
}

function calculateNextPossibilities(word){
    finalOptions = new Set();
    words.forEach(w => {
        if(w != word && !previousWords.has(w) && validatePreviousWord(w, word) == VALID){
            finalOptions.add(w);
        }
    });
    return finalOptions;
}

function validateWord(word, usedWords) {
    if (word.length !== 5) {
        return INCORRECT_LENGTH;
    }
    if (!words.includes(word.toUpperCase())) {
        return NOT_A_WORD;
    }
    if (usedWords.has(word)) {
        return ALREADY_CHOSEN;
    }
    return VALID;
}

function addResult(content) {
    const element = document.getElementById('last-message');
    element.textContent = content;
}

function addWordDiv(word){
    const lastWordDiv = document.getElementById('last-word');
    lastWordDiv.textContent = 'Last word: ' + word;
    const scoreCount = document.getElementById('score');
    scoreCount.textContent = 'Score: ' + (currentScore <= 0 ? '' : currentScore);
}

function addError(error){
    const attacher = document.getElementById('attacher');
    const errorMessage = document.createElement('div');
    errorMessage.className += 'error-message'
    errorMessage.textContent = error;
    attacher.replaceChildren(errorMessage);
}

function startCountdown(){
    addCurrentTime();
    intervalId = setInterval(countdownTime, 1000);
}

function countdownTime(){
    countdown = countdown - 1;
    if(countdown <= 0){
        clearInterval(intervalId);   
        document.getElementById('keyboard').remove();
        const element = document.getElementById('interaction-space');
        element.className = 'text-large bold landing-text'
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        const br3 = document.createElement('br');
        const gameOver = document.createElement('div');
        const finalScore = document.createElement('div');
        const refreshButton = document.createElement('button');
        refreshButton.className = 'button';
        refreshButton.textContent = "Try Again"
        refreshButton.addEventListener("click", (event) => { window.location.reload() });
        const listHolder = document.createElement('div');
        listHolder.className = 'end-container text-large'
        const options = document.createElement('div');
        options.className = 'end-stack right-pushed'
        const wordList = document.createElement('div');
        wordList.className = 'end-stack'
        listHolder.replaceChildren(wordList, options);
        gameOver.textContent = 'GAME OVER';
        finalScore.textContent = 'Final Score: ' + currentScore;
        wordList.textContent = 'Choices:';
        options.textContent = 'For ' + lastWord + ':';
        element.replaceChildren(gameOver, br1, finalScore, br2, refreshButton, br3);
        element.parentNode.insertAdjacentElement("afterend", listHolder)

        previousWords.forEach(value => {
            const preWordDiv = document.createElement('div');
            preWordDiv.textContent = value;
            preWordDiv.className = 'text-large';
            wordList.appendChild(preWordDiv);
        });
        calculateNextPossibilities(lastWord).forEach(value => {
            const possWordDiv = document.createElement('div');
            possWordDiv.textContent = value;
            possWordDiv.className = 'text-large';
            options.appendChild(possWordDiv);
        })

    } else {
        addCurrentTime();
    }
}

function addCurrentTime(){
    const cd = document.getElementById('countdown')
    cd.textContent = countdown + 's'
}

function resetCountdown(){
    countdown = Math.max(60 - (currentScore * multi), countdown, minTime);
    addCurrentTime()
}

function setDiff(number){
    if(number == 1){
        multi = 0;
        minTime = 60;
    }
    if(number == 2){
        multi = 2;
        minTime = 8;
    }
    if (number == 3){
        multi = 5;
        minTime = 5;
    }
}
