class Hangman {

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

    constructor(numGuessed = 0, usedLetters = [], playerScore = 0, activePlayer, firstGame) {

        this.dictionary = new Dictionary();

        //if (this.dictionary.wordsArray.indexOf(this.guess)>0)


        this.numGuessed = numGuessed;
        this.usedLetters = usedLetters;
        this.guessesLeft = Hangman.MAX_GUESS_NUM;
        this.activePlayer = activePlayer;
        this.startTime = new Date();
        this.firstGame = true;





        //filter used words in game





    }


    //first screen for player name
    enterName() {
        let fragment = document.createDocumentFragment();
        let startWindow = document.createElement("div");
        startWindow.id = "startWindow";
        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = "Enter your name";


        startWindow.appendChild(title);

        let inputPlayerName = document.createElement("input");
        inputPlayerName.id = "playerName";
        inputPlayerName.className = "inputName";

        inputPlayerName.addEventListener("keyup", function (event) {
            //event.preventDefault();
            if (event.keyCode === 13) {
                //console.log(this.playerName);
                //this.playerName = inputPlayerName.value;
                //console.log(inputPlayerName.value);
                hangman.checkUserName();
            }
        });


        startWindow.appendChild(inputPlayerName);

        fragment.appendChild(startWindow);

        //display login window
        document.getElementById('container').appendChild(fragment);
    }


    checkUserName() {


        let inputPlayer = new Player(document.getElementById('playerName').value);

        //if game is initialized and admin set

        let curPlayer;
        if (localStorage.playerList) {
            let playersJSON = JSON.parse(localStorage.playerList);


            //for all players
            let isRegistered = false;

            for (let p in Object.keys(playersJSON["playerList"])) {
                curPlayer = playersJSON["playerList"][p];

                //check if player exists
                if (curPlayer.playerName.toLowerCase() === inputPlayer.playerName.toLowerCase()) {
                    console.log("Player name exists: " + curPlayer.playerName);
                    if (curPlayer.pWords.length > 2){
                        this.wordsGuessed = new Map(JSON.parse(curPlayer.pWords));
                    }
                    else{

                        this.wordsGuessed =  new Map();
                    }

                    console.log(curPlayer.pWords);
                    isRegistered = true;
                    break;
                }
            }

            if (isRegistered !== true) {
                playersJSON["playerList"].push(inputPlayer);
                localStorage.playerList = JSON.stringify(playersJSON);
                curPlayer = inputPlayer;
            }
        }

        //if game not initialized first player is admin
        else {
            inputPlayer.setAdmin();
        }
        this.activePlayer = curPlayer;

   /*     let m = this.activePlayer.pWords;
        let [a,b] = JSON.parse(m);
        let nmap = new Map();
        nmap.set(a,b);
        this.activePlayer.pWords = nmap;

        this.activePlayer.pWords.set("test",211);
        // let [arr] = m.split(",");
        //
        //
         console.log(nmap);
*/


        //show words for admin
        if (this.activePlayer.isAdmin) {
            this.openAdminPanel();
        }
        else {
            this.loadGame();
        }
    }


    openAdminPanel() {


        document.getElementById("container").removeChild(document.getElementById("startWindow"));
        let fragment = document.createDocumentFragment();

        //create input field
        let nDiv = document.createElement("div");
        nDiv.id = "adminPanel";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = "Hello admin,  " + this.activePlayer.playerName;


        let nDiv2 = document.createElement("div");
        nDiv2.id = "words";
        nDiv2.innerHTML = "Existing words are: <br><b> " + this.dictionary.displayDictionary() + "<br></b> feel free to add some new words";

        let nInput = document.createElement("input");
        nInput.id = "keywordInput";
        nInput.className = "inputName";


        nInput.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {

                if (!hangman.dictionary.wordsArray.includes(nInput.value.toLowerCase())) {
                    hangman.dictionary.insertWord(nInput.value);
                    document.getElementById("words").innerHTML = "Existing words are:<br><b>  " + hangman.dictionary.displayDictionary() + "<br></b> feel free to add some new words";
                }
                else {
                    alert("Word already exists!");
                }
            }
        });

        fragment.appendChild(nDiv);
        fragment.appendChild(title);
        fragment.appendChild(nDiv2);
        fragment.appendChild(nInput);

        document.getElementById("container").appendChild(fragment);

    }


    //initialize game, create all elements
    loadGame() {

         this.dictionary = new Dictionary();

        console.log("load game");
        console.log(this);

        if (this.firstGame == true){
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


        inputField.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                hangman.checkEntry();
            }
        });


        button.onclick = function () {
            hangman.checkEntry();
        };


        //display game window
        document.getElementById('container').appendChild(el);

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
                            this.activePlayer.score += Hangman.POINTSFORVOWEL;
                        }
                        else {
                            this.activePlayer.score += Hangman.POINTSFORCONSONANT;
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
                            this.activePlayer.wordsGuessed.set(this.guess, this.duration);

                            let index = this.availableWords.indexOf(this.guess);
                            this.availableWords.splice(index, 1);


                             this.saveResult();
                        }
                    }

                    //update iteration counter used for element lookup
                    counter++;

                }
            }
            else {
                //check if player used all guesses
                this.guessesLeft--;
                this.activePlayer.score += Hangman.POINTSFORMISS;

                if (this.guessesLeft > 0) {
                    messageBox.innerHTML = "You missed! Only " + this.guessesLeft + " tries left!";
                }
                else {
                    messageBox.innerHTML = "You lost";
                    input.disabled = true;
                    button.disabled = true;
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


        //let inputPlayer = new Player(document.getElementById('playerName').value);



        let playersJSON = JSON.parse(localStorage.playerList);


        for (let p in Object.keys(playersJSON["playerList"])) {



            //check if player exists
            if (playersJSON["playerList"][p].playerName === this.activePlayer.playerName) {
                playersJSON["playerList"][p].score = this.activePlayer.score;
                console.log("pogodjene reci za igraca:");

                let m;

                if (playersJSON["playerList"][p].pWords.length > 2) {

                    m = new Map(JSON.parse(playersJSON["playerList"][p].pWords));

                }
                else {
                    m = new Map();
                }

                //let [test] = JSON.parse(playersJSON["playerList"][p].pWords);




                //test.set(this.guess, this.duration);



                m.set(this.guess,this.duration);



                playersJSON["playerList"][p].pWords = JSON.stringify([...m]);
                console.log(playersJSON["playerList"][p].pWords);

//
                console.log(JSON.stringify(playersJSON));

                localStorage.playerList = JSON.stringify(playersJSON);


                break;
            }
        }



        if(this.availableWords.length > 0){
            this.firstGame = false;
            this.usedLetters = [];
            this.numGuessed = 0;
            this.guessesLeft = Hangman.MAX_GUESS_NUM;
            this.loadGame();
        }
        else{
            this.displayScores();
        }


    }


    displayScores() {

        document.getElementById('container').removeChild(document.getElementById('gamePanel'));


        let el = document.createElement("div");
        el.id = "scoresPanel";
        el.class = "scoresWindow";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = "Scores";
        el.appendChild(title);

        let el2 = document.createElement("div");
        el2.id = "players";



        let playersJSON = JSON.parse(localStorage.playerList);

        //console.log(playersJSON);

        let html = "";
        for (let p in Object.keys(playersJSON["playerList"])) {
            html += playersJSON["playerList"][p].playerName + " " + playersJSON["playerList"][p].score + " " + playersJSON["playerList"][p].pWords + "<br>";
        }

        html += "<br><br>";

        let words = new Map(JSON.parse(localStorage.guessedWords));
        for (let[key, value] of words) {
                html += key + " : " + value + "<br>";
        }



        el2.innerHTML = html;


        el.appendChild(el2);

        document.getElementById('container').appendChild(el);


    }


}

