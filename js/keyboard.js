document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('word-input');
    input.focus();
    window.addEventListener(
        "keydown",
        (event) => {
            event.preventDefault();
            if (event.keyCode >= 65 && event.keyCode <= 90 && input.textContent.length < 5){
                event.preventDefault();
                input.textContent += event.key;
            } else if (event.keyCode == 8){
                event.preventDefault();
                input.textContent = input.textContent.length == 0 ? '' : input.textContent.slice(0, -1);
            }
        },
        true,
    );
    const keyboard = document.getElementById('keyboard');
    let keyRows = keyboard.childNodes;
    for(const row of keyRows){
        let keys = row.childNodes;
        for(const key of keys){
            if(key.classList == 'key'){
                key.addEventListener('click', (event) => {
                    if(input.textContent.length < 5){
                        input.textContent += key.textContent;
                    }            
                }, true,)
            }
        }
    }
    const back = document.getElementById('BACK');
    back.addEventListener('click', (event) => {
        input.textContent = input.textContent.length == 0 ? '' : input.textContent.slice(0, -1);
    }, true,);

    window.addEventListener(
        "keydown",
        (event) => {
            if (event.keyCode == 13){
                event.preventDefault();
                word = input.textContent;
                input.textContent = '';
                useWord(word)
            }
        },
        true,
    );
    const enter = document.getElementById('ENTER');
    enter.addEventListener('click', (event) => {
        word = input.textContent;
        input.textContent = '';
        useWord(word)
    }, true,);
});
