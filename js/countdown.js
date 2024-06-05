let countdown = 60;
let intervalId = null;
let multi = 2;
let minTime = 8;

function startCountdown(){
    addCurrentTime();
    intervalId = setInterval(countdownTime, 1000);
}

function countdownTime(){
    countdown = countdown - 1;
    if(countdown <= 0){
        clearInterval(intervalId);   
        endGame();
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
