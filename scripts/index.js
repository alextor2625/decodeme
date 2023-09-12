
let randomKey = Math.floor(Math.random()*6)+1;
let game = new DecodeMeGame(randomKey);

function newLevel(){
    let encWord = document.getElementById('enc-word');
    let key = document.getElementById('key');
    let playerInput = document.getElementById('player-input')
    encWord.innerHTML = game.getCurrEncWord()
    key.innerHTML = game.getCurrKey();
    playerInput.value = '';
    console.log(game.dictionary.decDict[game.getCurrEncWord()]);

}

window.onload = () => {
    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', ()=>{
        console.log("Starting Game");
        game.gameStart();
        console.log(game.dictionary.encDict);
        
        
        let html = '';
            html += `
            <div id="game-level"> 
                <p id="enc-word-prompt">Encrypted Word: <span id="enc-word">${game.getCurrEncWord()}</span></p>
                <p id="key-word-prompt">Key: <span id="key">${game.getCurrKey()}</span></p>
                <div class="button"><span>></span>
                    <input type="text" id="player-input"></input>
                    <button id="submit-button">Submit</button>
                </div>
                <div class="circle"></div>
            </div>
            `
                    
                    
            document.querySelector("#game-content").innerHTML = html;
            let input = document.getElementById('player-input')
            console.log(game.dictionary.decDict[game.getCurrEncWord()]);
            let button = document.getElementById('submit-button');
            button.addEventListener('click',  () => {
                if(game.scoring(input.value)){
                    newLevel();
                }
            })
            input.onchange = (e) =>{
                console.log(e.target.value);
                        
            }
        
        game.startTimerCountdown();

    })
    // console.log('THIS IS THE END', ' ', game.isGameOver());
    // if(game.isGameOver()){
    //     showGameEndScreen()
    // }
                

}


// console.log(new Dictionary(1).caesarDecrypt(1))