class StandardGame{



       //define rules
    static get MAX_GUESS_NUM() {
        return 7;
    }


    static get POINTSFORVOWEL() {
        return 1;
    }

    static get POINTSFORCONSONANT() {
        return 2;
    }

    static get POINTSFORMISS() {
        return -0.5;
    }


    constructor(curPlayer){

        this.dictionary = new Dictionary();
        this.numGuessed = 0;
        this.usedLetters = [];
        this.guessesLeft = StandardGame.MAX_GUESS_NUM;
        this.wordsGuessed = new Map();
        this.startTime = new Date();
        this.firstGame = true;


        this.activePlayer = curPlayer;



    };



    loadGame() {

        if (this.firstGame === true){
            document.getElementById('container').removeChild(document.getElementById('startWindow'));
        }
        else {
            document.getElementById('container').removeChild(document.getElementById('gamePanel'));
        }


        this.availableWords = this.dictionary.wordsArray.filter(word => {
             if (this.wordsGuessed.has(word) !== true) {
                 return word;
             }
        });

        this.guess = this.availableWords[Math.floor(Math.random() * this.availableWords.length)];

        console.log("Available words:" + this.availableWords);
        console.log("All words:" + this.dictionary.wordsArray);


        let el = document.createElement("div");
        el.id = "gamePanel";
        el.class = "gameWindow";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = "Player:" + this.activePlayer.playerName + " is guessing";
        el.appendChild(title);

        let el2 = document.createElement("div");
        el2.id = "inputPane";
        el2.class = "inputPane";


        //create input field
        let inputField = document.createElement("input");
        inputField.id = "inputField";
        inputField.class = "inputText";
        inputField.maxLength = "1";
        inputField.size = "1";
        el2.appendChild(inputField);

        //create button
        let button = document.createElement("button");
        button.id = "button";
        button.innerHTML = "Try letter";
        el2.appendChild(button);

        el.appendChild(el2);


        //create result div
        let result = document.createElement("div");
        result.className = "result";

        //create boxes for letters
        let counter = 1;
        for (let char of this.guess) {

            let letterBox = document.createElement("div");
            letterBox.id = "letter" + counter;

            letterBox.className = "letters";
            result.appendChild(letterBox);
            counter++;
        }

        el.appendChild(result);

        let messageBox = document.createElement("div");
        messageBox.id = "messageBox";
        el.appendChild(messageBox);


        //this.elm.addEventListener('click', this.sayHello.bind(this));


         inputField.addEventListener("keydown", (event) => {
             if (event.keyCode === 13) {
                this.checkEntry();
            }

        }, false);


        button.onclick = function () {
            this.checkEntry();
        }.bind(this);


        //display game window
        document.getElementById('container').appendChild(el);
        this.usedLetters = [];


    }


    //onEvent
    checkEntry() {

       let input = document.getElementById('inputField');
        let button = document.getElementById('button');
        let char = input.value.toLowerCase();
        let messageBox = document.getElementById('messageBox');

        //check if letter is used
        let counter = 1;
        if (!this.usedLetters.includes(char)) {

            //check if letter is in the word
            if (this.guess.indexOf(char) > -1) {

                //iterate theough the word
                for (let letter of this.guess) {



                    //if the player guessed display message and update score
                    if (char === letter.toLowerCase()) {


                        let vowels = ["a", "e", "i", "o", "u"];

                        if (vowels.includes(char)) {
                            this.activePlayer.score += StandardGame.POINTSFORVOWEL;
                        }
                        else {
                            this.activePlayer.score += StandardGame.POINTSFORCONSONANT;
                        }


                        document.getElementById('letter' + counter).innerHTML = letter;
                        this.numGuessed++;
                        messageBox.innerHTML = "Great! There is " + char + " in out word!";

                        //check if is eng of game
                        if (this.numGuessed === this.guess.length) {
                            messageBox.innerHTML = "You won";
                            input.disabled = true;
                            button.disabled = true;
                            this.duration = new Date() - this.startTime;
                            this.wordsGuessed.set(this.guess, this.duration);

                            let index = this.availableWords.indexOf(this.guess);
                            this.availableWords.splice(index, 1);
                            console.log("guess");
                            this.usedLetters = [];
                                 console.log(this);
                             this.saveResult();
                        }
                    }

                    //update iteration counter used for element lookup
                    counter++;
                }
            }
            else {
                //player missed
                this.guessesLeft--;
                console.log(this);
                this.activePlayer.score += StandardGame.POINTSFORMISS;

                //if there are more guesses left go guess, else LOST
                if (this.guessesLeft > 0) {
                    messageBox.innerHTML = "You missed! Only " + this.guessesLeft + " tries left!";
                }
                else {
                    messageBox.innerHTML = "You lost";
                    input.disabled = true;
                    button.disabled = true;
                    this.usedLetters = [];
                    this.saveResult();
                }
            }
        }

        else {
            //if already used letter
            messageBox.innerHTML = "Letter aready used!";
        }


        input.value = "";
        input.focus();
        this.usedLetters.push(char);
        //console.log(hangman);

    }


    saveResult() {
        localStorage.players = JSON.stringify(hangman.players);

        if(this.availableWords.length > 0){
            this.firstGame = false;
            this.numGuessed = 0;
            this.guessesLeft = StandardGame.MAX_GUESS_NUM;
            this.loadGame();
        }
        else{
            hangman.displayScores();
        }



    }





}