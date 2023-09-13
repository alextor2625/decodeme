class DecodeMeGame{
    constructor(maxKeyRange){
        this.timer = 330; // Every 1000 is a second.
        this.intervalID = null;
        this.dictionary = new Dictionary(maxKeyRange);
        this.wordList = this.dictionary.words;
        this.encWordList = this.dictionary.encWords;
        this.keyList = this.dictionary.keyArr;
        this.index = this.randomIndex(this.wordList.length);
        this.score = 0;
        this.lives = 3;
        this.startScreen = document.getElementById('intro-screen');
        this.gameScreen  = document.getElementById('game-screen');
        this.statsScore = document.getElementById('score');
        this.statsLives = document.getElementById('lives');
        this.statsTimer = document.getElementById('timer')
        this.gameContent = document.getElementById('game-content');
        this.height = 100;
        this.width = 100;
        this.endScreen = document.getElementById('end-screen');
    }
    incrementScore(){
        this.score++;
        this.statsScore.innerHTML = `Score: ${this.score}`;
    }
    decrementLife(){
        this.lives--;
        this.statsLives.innerHTML = `Lives: ${this.lives}`
    }
    decrementTimer(){
        this.timer--;
        this.statsTimer.innerHTML = `Timer: ${this.timer}`
    }
    setRandIndex(){
        this.index = this.randomIndex(this.wordList.length);
    }
    startTimerCountdown(){
        this.intervalID = setInterval(() =>{
            this.decrementTimer()
            if(this.isGameOver()){
                game.stopTimer();
            }
        },1000);
    }
    stopTimer(){
        clearInterval(this.intervalID)
        this.showGameEndScreen();
    }

    getCurrEncWord(){
        return this.encWordList[this.index]
    }
    
    
    getCurrWord(){
        return this.wordList[this.index];
    }
    
    gameStart(){
        this.startScreen.classList.toggle('hidden');
        // this.gameScreen.style.height = `${this.height}vh`; //Changed this last night
        // this.gameScreen.style.width = `${this.width}vw`;
        document.getElementById('stats').classList.toggle('hidden');
        this.statsScore.innerHTML += this.score;
        this.statsLives.innerHTML += this.lives;
        this.statsTimer.innerHTML += this.timer;
        
    }
    gameEnd(){
        this.timer = 0;
        this.lives = 0;
        this.statsLives.innerHTML = `Lives: ${this.lives}`;
        this.statsTimer.innerHTML = `Timer: ${this.timer}`;
        this.gameScreen.classList.add('hidden');
        this.endScreen.style.height = `${this.height}vh`;
        this.endScreen.style.width = `${this.width}vw`;
        
    }


    showGameEndScreen(){
        game.gameEnd();
        let endScreen = document.getElementById('end-screen');
        let htmlGameOver = '';
        let htmlYouWin = '';
        htmlGameOver += `
        <div id="end-message">
            <p><strong>GAME OVER</strong></p>
            <p><strong>FINAL SCORE: ${game.score}</strong><p>
        </div>
        `;
        htmlYouWin += `
        <div id="end-message">
            <p><strong>YOU WIN</strong></p>
            <p><strong>FINAL SCORE: ${game.score}</strong><p>
        </div>
        `;
        endScreen.innerHTML = game.score >= 5 ? htmlYouWin : htmlGameOver;
    }

    scoring(word){
        if(!this.isGameOver()){
            if(this.isDecrypt(word)){
                this.incrementScore();
                this.wordList.splice(this.index,1);
                this.encWordList.splice(this.index,1);
                this.keyList.splice(this.index,1);
                this.setRandIndex();
                console.log("Correct");
                return true;
            }else{
                
                this.decrementLife();
                console.log("Incorrect");
            }
        }else{
            this.showGameEndScreen();
            return false;
        }

    }
    randomIndex(arrSize){
        return Math.floor(Math.random()*arrSize);
    }


    getCurrKey(){
        return this.keyList[this.index];
    }

    isDecrypt(word){
        return word === this.getCurrWord();
    }
    didPlayerWin(){
        return this.score >= 5;
    }
    isGameOver(){
        return this.lives === 1 || this.timer === 0;
    }
}







/* Game Steps:
 * 1. Player receive a encrypted word (Maybe random);  DONE
 * 2. Player receive a random key; DONE
 * 3. Player is given a timer (The starting time will be decided later); DONE
 * 4. Player is given a starting score of 0; DONE
 * 5. Player is given 3 lives; DONE
 * 6. Player starts the game; LATER IN INDEX.JS
 * 7. Timer starts counting down; SEMI DONE- LATER TIMER CAN DECREMENT BUT ACTUAL COUNTDOWN IS IN INDEX.JS
 * 8. Player uses the cipher (Decoder) along with the key to decode the message; LATER, NEED TO FIND A PROPER WAY TO IMPLEMENT THIS
 * 9. Player inputs his answer; LATER IN INDEX.JS
 * 10. Player submits his answer; LATER IN INDEX.JS
 * 11. Answer is verified; DONE
 * Branch Step - IF CORRECT ANSWER:
 * 12. Player answer is correct; DONE
 * 13. Score increments by 1; DONE
 * 14. Player gets a new encrypted word; DONE
 * 15. Timer keeps decreasing. LATER TIMER CAN DECREMENT BUT ACTUAL COUNTDOWN IS IN INDEX.JS
 * 16. Player repeats steps 8 to 10 until either lives are 0 or if timer if 0; LATER
 * 17. If Player keeps giving correct answers the score keeps increasing; LATER
 * Branch Step - IF Incorrect answer:
 * 12. Player answer is incorrect; DONE
 * 13. Player looses a life; DONE
 * 14. Player has to submit another answer; LATER IN INDEX.JS
 * 15. Until Player submits correct answer, the level will remain the same; LATER IN INDEX.JS
 * 16. If Player keeps submitting wrong answers, the lives keep decreasing; LATER IN INDEX.JS
 * 17. Timer keeps decreasing while Player lives is not 0; LATER IN INDEX.JS
 * 18. Player repeats steps 8 to 10 until either lives are 0 or if timer if 0; LATER IN INDEX.JS
 * Out Of Branch Steps -  Winning and Loosing Conditions.
 * 19. Player looses when lives are 0 and/or timer is 0 when score is less than 5. DONE
 * 20. Player wins if score is 5 or more; DONE
 * 21. Game doesn't end unless Player lives are 0 or timer is 0; SEMI DONE
 * 22. Player tries to score as much as possible while they have lives and time.
 * 
 */ 
