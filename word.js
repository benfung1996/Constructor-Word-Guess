var Letter = require("./letter");

function WordToGuess() {
    this.letterArray = [];
    
    this.pushToArray = function(currentWord) {
        for (var i = 0; i<currentWord.length; i++) {
            if (currentWord[i] !== " ") {
                var letterObject = new Letter(currentWord[i]);
                this.letterArray.psuh(letterObject);
            }
            else {
                this.letterArray.push(" ");
            };
        };
    };

    this.check


}