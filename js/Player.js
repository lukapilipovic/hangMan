class Player {

    constructor(playerName = "", isAdmin = false, score = 0){
        this.playerName = playerName;
        this.isAdmin = isAdmin;
        this.score = score;
    }


    playerIsAdmin(){
        if (this.isAdmin === true) {
            return true;
        }
    }

    loadPlayerData(){

        //if exists



        //if new player




    }

    setAdmin(){

      this.isAdmin = true;
      let jOutput = "{ \"playerList\" :  [ " ;
      jOutput += JSON.stringify(this);
      jOutput += " ] }";

        console.log(jOutput);

        window.localStorage.setItem("playerList",jOutput);

        //console.log(this);
    }


    addScore(){
        this.score +=10;

    }














}