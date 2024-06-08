let lastWord = startWord;
let goalWord = endWord;
let currentScore = 0;
let isFirstTurn = true;
let language = Cookies.get('lang');

if(language == 'undefined'){
    language = 'en'
}


let previousWords = new Set();

const VALID = "";
const NOT_A_WORD = "This is not a recognised word.";
const ALREADY_CHOSEN = "You have already used this word.";
const INCORRECT_LENGTH = "Words must be 5 letters long.";
const TOO_MANY_MODIFICATIONS = "You can only change one letter per turn.";

document.addEventListener('DOMContentLoaded', () => {
    const btnLanguage = document.getElementById('language-button');
    setLanguage(language);
    let choWords = Cookies.get('chosen-words');
    if(choWords){
        lastWord = goalWord;
        previousWords = new Set(choWords.split(','))
        currentScore = previousWords.size - 1;
        initGameStage(lastWord);
        endGame();
        return;
    }
    const btnImage = document.getElementById('language-image');
    btnImage.src = language == 'en' ? 'style/gb.png' : 'style/id.png';
    btnLanguage.addEventListener('click', (event) => {
        if(language == 'en'){
            setLanguage('id');
        } else if(language == 'id'){
            setLanguage('en');
        }
        btnImage.src = language == 'en' ? 'style/gb.png' : 'style/id.png';
    });
    const btnStart = document.getElementById('start-button')
    btnStart.addEventListener('click', (event) => {
        setLanguage(language);
        if(window.innerWidth < 800){
            const keyboard = document.getElementById('keyboard');
            keyboard.style.display = 'flex';
        }
        useWord(lastWord);
    });
    const btnBack = document.getElementById('back-button')
    btnBack.addEventListener('click', (event) => {
        goBack();
    });
});

function setLanguage(lang){
    language = lang;
    Cookies.set('lang', lang)
    changeLanguage(language);
    lastWord = startWord;
    goalWord = endWord;
}


function useWord(userWord){
    word = userWord.toUpperCase();
    if(isFirstTurn){
        setInitialWord(word);
    } else {
        addWord(word);
    }
}

function initGameStage(word){
    const playing = document.getElementById('interaction-space');
    document.getElementById('language-button').remove();
    playing.style.display = 'block';
    previousWords.add(word);
    lastWord = word;
    isFirstTurn = false;
    addWordDiv(word);
    const introText = document.getElementById('heading');
    introText.remove();
    const inputElement = document.getElementById('word-input');
    inputElement.className = 'monster-input'
}

function goBack(){
    previousWords.delete(lastWord);
    currentScore = currentScore - 1;
    if(previousWords.size == 0){
        window.location.reload();
    } else {
        lastWord = [...previousWords].pop();
        addWordDiv(lastWord);
    }
}

function setInitialWord(word) {
    const gameState = validateWord(word, previousWords);
    if (gameState === VALID) {
        initGameStage(word)
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
    if(word == goalWord){
        endGame();
    }
    addWordDiv(lastWord);
    addResult(gameState);
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
    const goal = document.getElementById('goal-word');
    goal.textContent = goalWord;
}

function addWordDiv(word){
    const lastWordDiv = document.getElementById('last-word');
    lastWordDiv.textContent = word;
    const scoreCount = document.getElementById('score');
    scoreCount.textContent = 'Steps: ' + (currentScore <= 0 ? '' : currentScore);
}

function addError(error){
    const attacher = document.getElementById('attacher');
    const errorMessage = document.createElement('div');
    errorMessage.className += 'error-message'
    errorMessage.textContent = error;
    attacher.replaceChildren(errorMessage);
}

function endGame(){
    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0,0,0,0);
    Cookies.set('chosen-words', [...previousWords].join(','), { expires: midnight })
    const keyboard = document.getElementById('keyboard').remove();
    const element = document.getElementById('interaction-space');
    element.className = 'text-large bold landing-text'
    const br1 = document.createElement('br');
    const br2 = document.createElement('br');
    const br3 = document.createElement('br');
    const gameOver = document.createElement('div');
    const finalScore = document.createElement('div');
    const refreshButton = document.createElement('button');
    const classicButton = document.createElement('button');
    refreshButton.className = 'button';
    refreshButton.textContent = "Try Again"
    refreshButton.addEventListener("click", (event) => { 
        Cookies.remove('chosen-words')
        window.location.reload();
    });
    classicButton.className = 'button';
    classicButton.textContent = "Free Play"
    classicButton.addEventListener("click", (event) => { 
        window.location.href = '../classic'; 
    });
    const wordList = document.createElement('div');
    wordList.className = 'end-stack'
    gameOver.textContent = 'GAME OVER - YOU WIN';
    finalScore.textContent = 'Final Score: ' + currentScore;
    wordList.textContent = 'Choices:';
    element.replaceChildren(gameOver, br1, finalScore, br2, refreshButton, classicButton, br3, wordList);

    previousWords.forEach(value => {
        const preWordDiv = document.createElement('div');
        preWordDiv.textContent = value;
        preWordDiv.className = 'text-large';
        wordList.appendChild(preWordDiv);
    });
}

