class Hangman {

    
   static get BAR() {
        return 7;
    }

    constructor(playerName,negativeScore,guess){

      this.MAX_GUESS_NUM = Hangman.BAR;
      this.playerName = playerName;
      this.negativeScore = negativeScore; 
      this.guess = guess;
      this.numGuessed = 0;

    }

    


    
    loadGame() { 
    
    
     var fragment = document.createDocumentFragment();


     let inputField = document.createElement("input");
     inputField.id = "inputField";

     let button = document.createElement("button");
     button.id = "button";

     

    
     button.innerHTML = "Try letter";

     /* ne radi iznutra...ZASTO??
     button.onclick = function(){
         
         checkEntry(inputField.value);
      };
    */
      


    document.body.appendChild(inputField);
    document.body.appendChild(button);
    

    let result = document.createElement("div");
    result.className = "result";
    

    let counter  = 1;
     for (let letter of this.guess)  {
              
              let letterBox = document.createElement("div");
              letterBox.id = "letter"+counter;
              
              letterBox.className = "letters";
              result.appendChild(letterBox);
              counter++;  
     }

    document.body.appendChild(result);

    }	
	

    checkEntry(char) {
        let counter = 1;
        if (this.guess.indexOf(char) > -1){
            for (let letter of this.guess)  {

                if (char == letter){
               
                document.getElementById('letter' + counter).innerHTML = letter;
                this.numGuessed++
                if (this.numGuessed == this.guess.length)
                    {   
                        console.log("You won");
                    }

                }


                counter++;
            }
        }
        else {
                this.negativeScore++;
                console.log("You missed! Only " + (this.MAX_GUESS_NUM-this.negativeScore) + " tries left!");

            }

            console.log(hangman);

    }

    

    


}

