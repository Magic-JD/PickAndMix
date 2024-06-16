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
        if("ontouchstart" in document.documentElement){
            const keyboard = document.getElementById('keyboard');
            keyboard.style.display = 'flex';
        }
        if(!Cookies.get("startTime")){
            const midnight = new Date();
            midnight.setDate(midnight.getDate() + 1);
            midnight.setHours(0,0,0,0);
            Cookies.set("startTime", new Date().getTime(), {expires: midnight});
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
    const buttons = document.createElement('div');
    const stacks = document.createElement('div');
    const finalScore = document.createElement('div');
    const timeToFinish = document.createElement('div');
    timeToFinish.className = 'text-small'
    const refreshButton = document.createElement('button');
    const classicButton = document.createElement('button');
    const shareButton = document.createElement('button');
    refreshButton.className = 'button-small-dark button-end';
    refreshButton.textContent = "Try Again"
    refreshButton.addEventListener("click", (event) => { 
        Cookies.remove('chosen-words')
        Cookies.remove('endTime')
        window.location.reload();
    });
    classicButton.className = 'button-small-dark button-end';
    classicButton.textContent = "Free Play"
    classicButton.addEventListener("click", (event) => { 
        window.location.href = '../classic'; 
    });
    shareButton.className = 'button-small-dark button-end';
    shareButton.textContent = 'Copy Share Link';
    const wordList = document.createElement('div');
    wordList.className = 'end-stack'
    buttons.className = 'end-stack'
    stacks.className = 'end-container'
    buttons.replaceChildren(finalScore, br2, timeToFinish, br3, refreshButton, classicButton, shareButton);
    stacks.replaceChildren(wordList, buttons);
    gameOver.textContent = '🎉 Congratulations! 🎉';
    finalScore.textContent = 'Score: ' + currentScore;
    if(!Cookies.get('endTime')){
        Cookies.set('endTime', new Date().getTime(), {expires: midnight});
    }
    let time = Cookies.get('endTime') - Cookies.get('startTime')
    let seconds = Math.trunc(time/1000);
    let minutes = Math.trunc(seconds/60);
    let remainingSeconds = seconds % 60;
    timeToFinish.textContent = 'Time: ' + minutes + 'm ' + remainingSeconds + 's';
    wordList.textContent = 'Choices:';

    shareButton.addEventListener('click', (event) => {
        addError('Link Copied');
        let domain = 'https://pick-and-mix.vercel.app/results?' 
        let wordsChosen = [...previousWords];
        let wordsChosenId = wordsChosen.map(w => {return words.indexOf(w);});
        let wordsChosenString = wordsChosenId.join(':');
        let emojiText = convertToEmoji(wordsChosen);
        let params = 'score=' + currentScore + '&time=' + time + '&words=' + wordsChosenString;
        let encode = 'code=' + stringToHex(params);
        let url = domain + encode;   
        let stringText = url + '\n\n' + emojiText;
        navigator.clipboard.writeText(stringText);
        addError('Link Copied');
    });
    element.replaceChildren(gameOver, br1, stacks);

    previousWords.forEach(value => {
        const preWordDiv = document.createElement('div');
        preWordDiv.textContent = value;
        preWordDiv.className = 'text-large';
        wordList.appendChild(preWordDiv);
    });
}

function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i).toString(16);
        hex += ('0' + code).slice(-2);
    }
    return hex;
}

function convertToEmoji(wc){
    let fw = wc[0];
    let ew = wc[wc.length -1];
    return wc.map(w => {
        let usedChar = [];
        return w.split('').map(c => {
            if(usedChar.includes(c)){
                return '❓';
            }
            usedChar.push(c);
            if(fw.includes(c)){
                return '🟥';
            }
            if(ew.includes(c)){
                return '🟢';
            }
            return '❓';
        }).join('')}
    ).join('\n');
}
