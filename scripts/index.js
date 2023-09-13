
let maxKeyRange = 25;
let game = new DecodeMeGame(maxKeyRange);

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
    let howtoPlayButton = document.getElementById('how-to-play-button');
    howtoPlayButton.addEventListener('click',() => {
        document.querySelector('#intro-screen').classList.toggle('hidden');
        let html = '';
        html += `
        <div id="how-to-play">
            <div id="instructions">
                <h1>How to play?</h1>
                <p>
                    <h2>About the game: </h2>

                    <p>DecodeMe is a game that implements the Caesar Cipher encryption method.</p>

                    
                    <h2> What is Caesar Cipher? </h2>

                    <p> Caesar cipher is a simple method of encoding messages. Caesar ciphers 
                    use a substitution method where letters in the alphabet are shifted by 
                    a fixed number of spaces to yield an encoding alphabet. This fixed number
                    is known as the key. In other words, all the letters of the word are 
                    shifted in the alphabet by the key.</p>

                    <h2>For Example: </h2>                                            
                    <ul>
                        <li> Assume we have an alphabet which their positions is from 0 to 25.</li>
                        <li> If the Key is 1 and the word is HELLO.</li>
                        <li> H's position in thE alphabet is 7 and 7 + 1 = 8 so now H will be the letter in position 8, I.</li>
                        <li> E's position is 4, 4 + 1 = 5 so now E changes to F.</li> 
                        <li> L's position is 11, 11 + 1 = 12 so now L is M.</li>
                        <li> And finally O's position is 14, 14 + 1 = 15 so now O is P.</li>
                        <li> The final ecryption result would be IFMMP.</li>
                    </ul>


                    <h2>Goal: </h2>

                    <p>When the game starts it will prompt the player a random encrypted word 
                    encrypted with a random key. The key will also by given to the player. 
                    You have 3 lives and a timer, if either of them hits 0 the game ends.
                    The goal of the player is to decipher/decrypt the prompts with given 
                    key using the decoder ring in the level to help with the decryption.
                    If the player gets 5 right answers the player wins but the game keeps 
                    going until either lives or timer hits 0 so the player can keep scoring 
                    until the game ends.</p>

                </p>
                
            </div>
        </div>
        `;
        document.querySelector('#how-to-play-screen').innerHTML = html;
    })
    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', ()=>{
        console.log("Starting Game");
        game.gameStart();
        console.log(game.dictionary.encDict);
        
        
        let html = '';
            html += `
            <div id="game-level">
                <div class="content">
                    <p id="enc-word-prompt">Encrypted Word: <span id="enc-word">${game.getCurrEncWord()}</span></p>
                    <p id="key-word-prompt">Key: <span id="key">${game.getCurrKey()}</span></p>
                </div>
                <div class="button"><label for="player-input">></label>
                    <input type="text" id="player-input"></input>
                    <button id="submit-button">Submit</button>
                </div>
                <div class="cipher-slider"></div>
            </div>
            `
                    
                    
            document.querySelector("#game-content").innerHTML = html;
            let input = document.getElementById('player-input')
            console.log(game.dictionary.decDict[game.getCurrEncWord()]); //cheat
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