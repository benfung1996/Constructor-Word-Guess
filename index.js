var Word = require("./word");
var inquirer = require("inquirer");

var wordArray = ["siberian husky", "labrador retriever", "pomeranian", "golden retriever", "shiba inu", "samoyed", "welsh corgi"];
var currentWord = "";

var alphabet = /a-zA-Z/;
var remainingGuess = 10;
var guessedLetter = [];
var usedWords = [];
var firstGame = true;

function randomWord() {
    var randomPick = wordArray[Math.floor(Math.random()*wordArray.length)];
    if (usedWords.indexOf(randomPick) === -1 ) {
        currentWord = new Word();
        currentWord.pushToArray(randomPick);
        usedWords.push(randomPick);
    }
    else if (usedWords.length !== wordArray.length) {
        randomWord();
    }
    else {
        console.log("No more word to guess!")
        playAgain();
    }
};

function wordGuessed() {
    var word = currentWord.letterArray;
    for (var i = 0; i < word.length; i++) {
        if (!word[i].guesssed && word[i] !== " ") {
            return false;
        }
    }
    return true;
};

function prompt() {
    if (remainingGuess <= 0) {
        console.log("GAME OVER!");
        playAgain();
    }
    else if (!wordGuessed()) {
        if (firstGame) {
            console.log("Guess a dog breed!");
            currentWord.dispalyWord();
            firstGame = false;
        }

        inquirer.prompt([
            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",

                validate: function(input) {
                    if (guessedLetter.indexOf(input.trim().toLowerCase()) >= 0) {
                        console.log("\n You already guessed this letter! Let's try again!");
                        return false;
                    }
                    else if (alphabet.test(input) && input.trim().length === 1) {
                        return true;
                    }
                    else {
                        console.log("Please enter a single letter.");
                        return false;
                    }
                }
            }
        ]). then(function(userInput) { 
            currentWord.checkGuess(userInput.guess);
            currentWord.dispalyWord();
            if (currentWord.checkGuess(userInput.guess)) {
                console.log("Correct!");
            }
            else {
                remainingGuess--;
                console.log("Incorrect! Remaining Guess: " + remainingGuess + "!");
            }
            guessedLetter.push(userInput.guess.trim().toLowerCase());
            prompt();
        })
    }
    else {
        console.log("Nice! You got it! Next One!");
        nextWord();
    }
};

function nextWord() {
    if (usedWords.length === wordArray.length) {
        usedWords = [];
        playAgain();
    }
    else {
        randomPick();
        prompt();
    }
};

function playAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Would you like to play again?",
            default: true
        }
    ]).then(function(userInput) {
        if (userInput.confirm) {
            firstGame = true;
            guessedLetter = [];
            usedWords = [];
            remainingGuess = 10;
            randomPick();
            prompt();
        }
        else {
            console.log("Good Game!");
        }
    })
};

randomPick();
prompt();