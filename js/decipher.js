const urlParams = new URLSearchParams(window.location.search);
const score = urlParams.get('score');
const time = urlParams.get('time');
let theirWords = urlParams.get('words');
theirWords = theirWords.split(':').map(w => {return words[w]})
let choWords = Cookies.get('chosen-words');
let previousWords = new Set();
if(choWords){
    previousWords = new Set(choWords.split(','))
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreDiv = document.getElementById('score');
    const timeDiv = document.getElementById('time');
    scoreDiv.textContent += score;
    let seconds = Math.trunc(time/1000);
    let minutes = Math.trunc(seconds/60);
    let remainingSeconds = seconds % 60;
    timeDiv.textContent = 'Time: ' + minutes + 'm ' + remainingSeconds + 's';

    const theirWordsDiv = document.getElementById('their-words');

    theirWords.forEach(value => {
        const preWordDiv = document.createElement('div');
        preWordDiv.textContent = value;
        preWordDiv.className = 'text-medium';
        if(!choWords){
            preWordDiv.className += ' blurred'
        }
        theirWordsDiv.appendChild(preWordDiv);
    });

    const yourWords = document.getElementById('your-words');
    previousWords.forEach(value => {
        const preWordDiv = document.createElement('div');
        preWordDiv.textContent = value;
        preWordDiv.className = 'text-medium';
        yourWords.appendChild(preWordDiv);
    });
});
