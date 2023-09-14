
let maxKeyRange = 25;
let game = new DecodeMeGame(maxKeyRange);

function newLevel(){
    // let encWord = document.getElementById('enc-word');
    let key = document.getElementById('key');
    let playerInput = document.getElementById('player-input')
    typeWriter(game.getCurrEncWord(),0,'enc-word',1)
    // encWord.innerHTML = game.getCurrEncWord()
    key.innerHTML = game.getCurrKey();
    playerInput.value = '';
    console.log(game.dictionary.decDict[game.getCurrEncWord()]);

}

function typeWriter(text,i,id,carat){

    if(carat === 1){
        if (i < (text.length)) {
            document.querySelector(`#${id}`).innerHTML = text.substring(0, i+1) +'<span aria-hidden="true" class="caret"></span>';
            setTimeout(function() {
                typeWriter(text, i + 1, id, carat)
            }, 100);
        }
    }else{
        if (i < (text.length)) {
            document.querySelector(`#${id}`).innerHTML = text.substring(0, i+1);
            setTimeout(function() {
                typeWriter(text, i + 1, id)
            }, 100);
        }
    }
}

window.onload = () => {

    typeWriter('DecodeMe',0,'title')
    // setTimeout(() => {
    //     document.getElementById('start-button').classList.toggle('hidden');
    //     typeWriter('Start',0,'start-button',1)

    //     setTimeout(() => {
    //         document.getElementById('how-to-play-button').classList.toggle('hidden');
    //         typeWriter('How to play?',0,'how-to-play-button',1)
    //     },700)
    // },1000)

    let startButton = document.getElementById('start-button');
    startButton.addEventListener('click', ()=>{
        console.log("Starting Game");
        game.gameStart();
        console.log(game.dictionary.encDict);
        
        
        // let html = `
        //         <div class="content">
        //             <p id="enc-word-prompt">Encrypted Word: <span id="enc-word">${game.getCurrEncWord()}</span></p>
        //             <p id="key-word-prompt">Key: <span id="key">${game.getCurrKey()}</span></p>
        //         </div>
        //         <div class="button"><label for="player-input">></label>
        //             <input type="text" id="player-input"></input>
        //             <button id="submit-button">Submit</button>
        //         </div>
        //     `

        let html = `
                <div class="content">
                    <p id="enc-word-prompt"><span id="enc-word-prompt-title">Encrypted Word: </span> <span id="enc-word"></span></p>
                    <p id="key-word-prompt"><span id="key-word-prompt-title">Key: </span><span id="key">${game.getCurrKey()}</span></p>
                </div>
                <div class="button"><label for="player-input">></label>
                    <input type="text" id="player-input"></input>
                    <button id="submit-button">Submit</button>
                </div>
            `
                    
                    


            let newElem = document.createElement('div');
            newElem.setAttribute('id','game-level')
            newElem.innerHTML = html;
            console.log(newElem);
            let slider = document.getElementById('cipher-slider')
            let parent = document.getElementById('game-content')
            console.log(parent);
            parent.insertBefore(newElem, slider)

            document.getElementById('enc-word-prompt-title').innerHTML = ''
            document.getElementById('key-word-prompt-title').innerHTML = ''
            typeWriter('Encrypted Word: ',0,'enc-word-prompt-title')
            typeWriter('Key: ',0,'key-word-prompt-title')
            setTimeout(() =>typeWriter(game.getCurrEncWord(),0,'enc-word'),600)
            

            // let endGameButton = document.createElement('button')
            //     endGameButton.setAttribute('id','end-game');
            //     endGameButton.setAttribute('class', 'button')
            //     endGameButton.innerHTML = "End Game";
            //     document.getElementById('game-content').appendChild(endGameButton);    

            let input = document.getElementById('player-input')
            console.log(game.dictionary.decDict[game.getCurrEncWord()]); //cheat
            let submitButton = document.getElementById('submit-button');
            submitButton.addEventListener('click',  () => {
                if(game.scoring(input.value)){
                    newLevel();
                }
                input.onchange = (e) =>{
                    console.log(e.target.value);
                            
                }
            })

            input.addEventListener("keyup", (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    submitButton.click();
                }

                
            });

            
            
        

    })

    let howtoPlayButton = document.getElementById('how-to-play-button');
    howtoPlayButton.addEventListener('click',() => {
        document.querySelector('#intro-screen').classList.toggle('hidden');
        let html = '';
        html += `
        <div id="how-to-play">
            <div id="instructions">
                <h1 id="how-to-play-title">How to play?</h1>
                <p>
                    <h2 id="about-the-game">About the game: </h2>

                    <p id="about-the-game-descrip">DecodeMe is a game that implements the Caesar Cipher encryption method.</p>

                    
                    <h2 id="what-caesar"> What is Caesar Cipher? </h2>

                    <p id="what-caesar-descrip"> Caesar cipher is a simple method of encoding messages. Caesar ciphers 
                    use a substitution method where letters in the alphabet are shifted by 
                    a fixed number of spaces to yield an encoding alphabet. This fixed number
                    is known as the key. In other words, all the letters of the word are 
                    shifted in the alphabet by the key.</p>

                    <h3 id="example">For Example: </h2>                                            
                    <ul>
                        <li id="example-a"> Assume we have an alphabet which their positions is from 0 to 25.</li>
                        <li id="example-b"> If the Key is 1 and the word is HELLO.</li>
                        <li id="example-c"> H's position in thE alphabet is 7 and 7 + 1 = 8 so now H will be the letter in position 8, I.</li>
                        <li id="example-d"> E's position is 4, 4 + 1 = 5 so now E changes to F.</li> 
                        <li id="example-e"> L's position is 11, 11 + 1 = 12 so now L is M.</li>
                        <li id="example-f"> And finally O's position is 14, 14 + 1 = 15 so now O is P.</li>
                        <li id="example-g"> The final ecryption result would be IFMMP.</li>
                        <li id="example-h"> To decrypt, you do the same process in reverse.</li>
                    </ul>


                    <h2 id="goal">Goal: </h2>

                    <p id="goal-descrip">When the game starts it will prompt the player a random encrypted word 
                    encrypted with a random key. The key will also by given to the player. 
                    You have 3 lives and a timer, if either of them hits 0 the game ends.
                    The goal of the player is to decipher/decrypt the prompts with given 
                    key using the decoder ring in the level to help with the decryption.
                    If the player gets 5 right answers the player wins but the game keeps 
                    going until either lives or timer hits 0 so the player can keep scoring 
                    until the game ends.</p>

                </p>
                
            </div>
            <div class="button">
                <button id="back-to-start-button">Back To Start</button>
            </div>
        </div>
        `;
        document.querySelector('#how-to-play-screen').innerHTML = html;
        
        typeWriter('How to play?',0,'how-to-play-title');

        let backToStartButton = document.getElementById('back-to-start-button');
            backToStartButton.addEventListener('click', () => {
                document.querySelector('#intro-screen').classList.toggle('hidden');
                document.getElementById('how-to-play').remove()
            })
    })

}

   

    // console.log('THIS IS THE END', ' ', game.isGameOver());
    // if(game.isGameOver()){
    //     showGameEndScreen()
    // }
                

