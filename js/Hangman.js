class Hangman {


    constructor(admin = "luka", currentGame) {
        this.admin = admin;
        this.highScores = localStorage.highScores ? new JSON.parse(localStorage.highScores) : [];
        this.players =  localStorage.players ? JSON.parse(localStorage.players) : [];
        this.currentGame = new StandardGame("luka");
    }


    //first screen for player name
    loadLogin() {
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

                hangman.checkLogin();
            }
        });

        startWindow.appendChild(inputPlayerName);
        fragment.appendChild(startWindow);

        //display login window
        document.getElementById('container').appendChild(fragment);
    }


    checkLogin() {
        //get input value
        let inputName = document.getElementById('playerName').value.toLowerCase();

        let curPlayer;
        let isRegistered = false;

        //fist check if admin
        if (inputName === this.admin) {
            this.openAdminPanel();
        }
        else {
            if (this.players.length > 0) {
                //if not admin check if user exists
                for (let p in Object.keys(this.players)) {
                    curPlayer = this.players[p];
                    //check if player exists
                    if (curPlayer.playerName.toLowerCase() === inputName) {
                        console.log("Player name exists: " + curPlayer.playerName);
                        isRegistered = true;
                        break;
                    }
                }
                if (isRegistered !== true) {
                     curPlayer = new Player(inputName);
                    this.players.push(curPlayer);
                    localStorage.players = JSON.stringify(this.players);
                    console.log("New player added:" + curPlayer.playerName);
                }
                //start game for current user

            }
            else{
                curPlayer = new Player(inputName);
                this.players.push(curPlayer);
                localStorage.players = JSON.stringify(this.players);
                console.log("First player added:" + curPlayer.playerName);

            }
            //console.log(curPlayer);
            this.currentGame = new StandardGame(curPlayer);
            this.currentGame.loadGame(curPlayer);


        }
    }


    openAdminPanel() {
        console.log("hello admin");


        document.getElementById("container").removeChild(document.getElementById("startWindow"));
        let fragment = document.createDocumentFragment();

        //create input field
        let nDiv = document.createElement("div");
        nDiv.id = "adminPanel";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = "Hello admin,  " + this.admin;


        let nDiv2 = document.createElement("div");
        nDiv2.id = "words";
        console.log(this);
        nDiv2.innerHTML = "Existing words are: <br><b> " + this.currentGame.dictionary.wordsArray + "<br></b> feel free to add some new words";


        let nInput = document.createElement("input");
        nInput.id = "keywordInput";
        nInput.className = "inputName";


        nInput.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {


                if (!this.currentGame.dictionary.wordsArray.includes(nInput.value.toLowerCase())) {
                    this.currentGame.dictionary.insertWord(nInput.value);
                    document.getElementById("words").innerHTML = "Existing words are:<br><b>  " + this.currentGame.dictionary.wordsArray + "<br></b> feel free to add some new words";
                }
                else {
                    alert("Word already exists!");
                }


            }

        }, false);



        /* nInput.addEventListener("keyup", function (event) {
             if (event.keyCode === 13) {

                 if (!this.currentGame.dictionary.wordsArray.includes(nInput.value.toLowerCase())) {
                     this.currentGame.dictionary.wordsArray.insertWord(nInput.value);
                     document.getElementById("words").innerHTML = "Existing words are:<br><b>  " + this.currentGame.dictionary.wordsArray + "<br></b> feel free to add some new words";
                 }
                 else {
                     alert("Word already exists!");
                 }
             }
         }).bind(this);*/

        fragment.appendChild(nDiv);
        fragment.appendChild(title);
        fragment.appendChild(nDiv2);
        fragment.appendChild(nInput);

        document.getElementById("container").appendChild(fragment);


    }


    displayScores() {

        document.getElementById('container').removeChild(document.getElementById('gamePanel'));

        let el = document.createElement("div");
        el.id = "scoresPanel";
        el.class = "scoresWindow";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = "HIGH SCORES";
        el.appendChild(title);

        let el2 = document.createElement("div");
        el2.id = "highScores";


        let html = "";

         for (let p in Object.keys(this.players)) {
            html += this.players[p].playerName + " : " + this.players[p].score + "<br>";

         }
        html += "<br><br>WORDS<br><br>";
        this.currentGame.wordsGuessed.forEach((time, word) => {
            html += word + " : " + (time/1000).toFixed(0) + "s<br>";
        });

        el2.innerHTML = html;
        el.appendChild(el2);
        document.getElementById('container').appendChild(el);
    }
}

