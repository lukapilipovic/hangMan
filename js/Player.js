class Player {

    constructor(playerName = "", isAdmin = false,score,pWords){
        this.playerName = playerName;
        this.isAdmin = isAdmin;
        this.score = score ? score : 0;
        this.pWords = pWords ? pWords : [];

    }


    playerIsAdmin(){
        if (this.isAdmin === true) {
            return true;
        }
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