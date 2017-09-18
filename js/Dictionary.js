class Dictionary{

    constructor (){
        this.wordsArray = localStorage.dictionary ? JSON.parse(localStorage.dictionary) : ["tegetlab","macbook"];
    }

    insertWord(newWord){
        this.wordsArray.push(newWord);
        localStorage.dictionary = JSON.stringify(this.wordsArray);
    }


    displayDictionary(){
        return this.wordsArray.join();
    }


}


