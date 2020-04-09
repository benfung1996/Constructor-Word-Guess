var Letter = require("./letter");

function Word() {
    this.letterArray = [];
    this.pushToArray = function(currentWord) {
        for (var i = 0; i<currentWord.length; i++) {
            if (currentWord[i] !== " ") {
                var letterObject = new Letter(currentWord[i]);
                this.letterArray.push(letterObject);
            }
            else {
                this.letterArray.push(" ");
            };
        };
    };

    this.displayWord = function() {
        var word = [];
        for (var i = 0; i < this.letterArray.length; i++) {
            if (this.letterArray[i] !== " ") {
                var string = this.letterArray[i].display();
                word.push(string);
            }
            else {
                word.push(" ");
            };
        };
        console.log(word.join(" "));
    };

    this.checkGuess = function(input) {
        var correctGuess = false;
        for (var i = 0; i < this.letterArray.length; i++) {
            if (this.letterArray[i] !== " ") {
                if (this.letterArray[i].check(input)) {
                    correctGuess = true;
                } 
            }
        }

        if (correctGuess) {
            return true;
        }
        else {
            return false;
        }
    };


};

module.exports = Word;