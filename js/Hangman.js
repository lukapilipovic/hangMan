class Hangman {

   //define rules 
   static get MAX_GUESS_NUM() {
        return 7;
    }


   static get POINTSFORGUESS() {
        return 10;
    }

    static get POINTSFORMISS() {
        return 3;
    }

    constructor(numGuessed = 0, usedLetters = [], playerScore = 0,activePlayer) {

        this.dictionary = new Dictionary();
        this.guess = this.dictionary.wordsArray[Math.floor(Math.random()*this.dictionary.wordsArray.length)];

        this.numGuessed = numGuessed;
        this.usedLetters = usedLetters;
        this.guessesLeft = Hangman.MAX_GUESS_NUM;
        this.activePlayer = activePlayer;




    }


    //first screen for player name
    enterName() {
        let fragment = document.createDocumentFragment();
        let startWindow = document.createElement("div");
        startWindow.id = "startWindow";
        let title = document.createTextNode("Enter player name");

        startWindow.appendChild(title);

        let inputPlayerName = document.createElement("input");
        inputPlayerName.id = "playerName";

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
                if (curPlayer.playerName === inputPlayer.playerName) {
                    console.log("Player name exists: " + curPlayer.playerName);

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
        console.log("Score: " + this.activePlayer.score);

        //show words for admin
        if (this.activePlayer.isAdmin){
            this.openAdminPanel();
        }
        else{
            this.loadGame();
        }
    }


    openAdminPanel() {



       document.getElementById("container").removeChild(document.getElementById("startWindow"));
       let fragment = document.createDocumentFragment();

        //create input field
        let nDiv = document.createElement("div");
        nDiv.id = "adminPanel";

        let nDiv2 = document.createElement("div");
        nDiv2.id = "words";
        nDiv2.innerHTML = this.dictionary.displayDictionary();

        let nInput = document.createElement("input");
        nInput.id = "keywordInput";




        nInput.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {


                hangman.dictionary.insertWord(nInput.value);
                document.getElementById("words").innerHTML = hangman.dictionary.displayDictionary();
            }
        });

        fragment.appendChild(nDiv);
        fragment.appendChild(nDiv2);
        fragment.appendChild(nInput);

        document.getElementById("container").appendChild(fragment);

    }



    //initialize game, create all elements
    loadGame() { 
    
     document.getElementById('container').removeChild(document.getElementById('startWindow'));


     let fragment = document.createDocumentFragment();

     //create input field
     let inputField = document.createElement("input");
     inputField.id = "inputField";
     inputField.maxLength ="1";
     inputField.size="1";
     fragment.appendChild(inputField);

     //create button
     let button = document.createElement("button");
     button.id = "button";
     button.innerHTML = "Try letter";
     fragment.appendChild(button);


    

    //create result div
    let result = document.createElement("div");
    result.className = "result";
    
    //create boxes for letters
    let counter  = 1;
     for (let char of this.guess)  {
              
              let letterBox = document.createElement("div");
              letterBox.id = "letter" + counter;
              
              letterBox.className = "letters";
              result.appendChild(letterBox);
              counter++;  
     }

    fragment.appendChild(result);

    let messageBox = document.createElement("div");
    messageBox.id = "messageBox";
    fragment.appendChild(messageBox);

    


    inputField.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        hangman.checkEntry();
    }});

     
    button.onclick = function(){    
         hangman.checkEntry();
      };


    //display game window
    document.getElementById('container').appendChild(fragment);

    }	
	


    //onEvent 
    checkEntry() {
        let input = document.getElementById('inputField');
        let button = document.getElementById('button');
        let char = input.value;
        let messageBox = document.getElementById('messageBox');
        
        //check if letter is used
        let counter = 1;
        if (!this.usedLetters.includes(char)){
            
            //check if letter is in the word
            if (this.guess.indexOf(char) > -1) {
                
                //iterate theough the word 
                for (let letter of this.guess)  {

                    //if the player guessed display message and update score
                    if (char === letter){
                        this.activePlayer.score += Hangman.POINTSFORGUESS;
                        document.getElementById('letter' + counter).innerHTML = letter;
                        this.numGuessed++;
                        messageBox.innerHTML = "Great! There is " + char + " in out word!";
                        
                        //check if is eng of game
                        if (this.numGuessed === this.guess.length)
                        {   
                            messageBox.innerHTML = "You won";
                            input.disabled = true;
                            button.disabled = true;
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
                this.activePlayer.score -= Hangman.POINTSFORMISS;
                
                if (this.guessesLeft>0){
                          messageBox.innerHTML = "You missed! Only " + this.guessesLeft + " tries left!";
                }
                else{
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
            console.log(hangman);

    }


    saveResult() {


        //let inputPlayer = new Player(document.getElementById('playerName').value);


        console.log(this.activePlayer);

            let playersJSON = JSON.parse(localStorage.playerList);



            for (let p in Object.keys(playersJSON["playerList"])) {



                //check if player exists
                if (playersJSON["playerList"][p].playerName === this.activePlayer.playerName) {
                    playersJSON["playerList"][p].score = this.activePlayer.score;

                    break;
                }
            }


                localStorage.playerList = JSON.stringify(playersJSON);







    }



}

