class Hangman {

   //define rules 
   static get MAX_GUESS_NUM() {
        return 7;
    }


   static get POINTSFORGUESS() {
        return 10;
    }

    constructor(playerName,guess="tegetlab",numGuessed = 0,usedLetters = [],playerScore = 0){

      
      this.playerName = playerName;
      
      this.guess = guess;
      this.numGuessed = numGuessed;
      this.usedLetters = usedLetters;
      this.playerScore = playerScore;
      this.guessesLeft = Hangman.MAX_GUESS_NUM;

    }


    //first screen for player name
    enterName(){
    let fragment = document.createDocumentFragment();
    let inputPlayerName = document.createElement("input");
    inputPlayerName.id = "playerName";

    inputPlayerName.addEventListener("keyup", function(event) {
    //event.preventDefault();
    if (event.keyCode == 13) {
        console.log( this.playerName);
        //this.playerName = inputPlayerName.value;
        //console.log(inputPlayerName.value);
        hangman.loadGame();
    }});

    fragment.appendChild(inputPlayerName);
    
    //display login window
    document.getElementById('container').appendChild(fragment);;


    }


    //initialize game, vreate all elements
    loadGame() { 
    
     document.getElementById('container').removeChild(document.getElementById('playerName'));
     
     console.log ("test");
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
     for (let letter of this.guess)  {
              
              let letterBox = document.createElement("div");
              letterBox.id = "letter"+counter;
              
              letterBox.className = "letters";
              result.appendChild(letterBox);
              counter++;  
     }

    fragment.appendChild(result);

    let messageBox = document.createElement("div");
    messageBox.id = "messageBox";
    fragment.appendChild(messageBox);

    


    inputField.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
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
                    if (char == letter){
                        this.playerScore += Hangman.POINTSFORGUESS;
                        document.getElementById('letter' + counter).innerHTML = letter;
                        this.numGuessed++
                        messageBox.innerHTML = "Great! There is " + char + " in out word!";
                        
                        //check if is eng of game
                        if (this.numGuessed == this.guess.length)
                        {   
                            messageBox.innerHTML = "You won";
                            input.disabled = true;
                            button.disabled = true;
                        }
                }
                
                //update iteration counter used for element lookup
                counter++;
                
                }
            }
            else {
                //check if player used all guesses
                this.guessesLeft--;
                
                if (this.guessesLeft>0){
                          messageBox.innerHTML = "You missed! Only " + this.guessesLeft + " tries left!";
                }
                else{
                    messageBox.innerHTML = "You lost";
                    input.disabled = true;
                    button.disabled = true;

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

    

    


}

