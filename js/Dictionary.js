class Dictionary{

    constructor (){
        this.wordsArray = localStorage.dictionary ? JSON.parse(localStorage.dictionary) : ["taqoo", "internet"];
    }

    insertWord(newWord){
        this.wordsArray.push(newWord);
        localStorage.dictionary = JSON.stringify(this.wordsArray);
    }






}


