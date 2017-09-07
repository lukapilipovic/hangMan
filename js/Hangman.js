class Hangman {

    
   

    constructor(playerName,playerScore){
      this.playerName = playerName;
      this.playerScore = playerScore; 
    }

  

    loadGame() { 
    // create a new div element 
    // and give it some content 




     let inputField = document.createElement("input");
     let button = document.createElement("button");
     button.id = "button";
     button.innerHTML = "Try letter";

     button.onclick = function(){
         
         this.checkEntry(inputField.value, "testrec");
      };


    document.body.appendChild(inputField);
    document.body.appendChild(button);

    }	
	

    checkEntry(letter,word){
     console.log(letter);




    } 


}

