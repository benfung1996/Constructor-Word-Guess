var Word = require("./word");
var inquirer = require("inquirer");

var wordArray = ["siberian husky", "labrador retriever", "pomeranian", "golden retriever", "shiba inu", "samoyed", "welsh corgi"];
var currentWord = "";

var alphabet = /[a-zA-Z]/;
var remainingGuess = 10;
var guessedLetter = [];
var usedWords = [];
var firstGame = true;

function randomWord() {
    var randomPick = wordArray[Math.floor(Math.random()*wordArray.length)];
    if (usedWords.indexOf(randomPick) === -1) {
        currentWord = new Word();
        currentWord.pushToArray(randomPick);
        usedWords.push(randomPick);
    }
    else if (usedWords.length !== wordArray.length) {
        randomWord();
    }
   
};

function wordGuessed() {
    var word = currentWord.letterArray;
    for (var i = 0; i < word.length; i++) {
        if (!word[i].guessed && word[i] !== " ") {
            return false;
        }
    }
    return true;
};

function guessPrompt() {
    if (remainingGuess <= 0) {
        console.log("GAME OVER!");
        playAgain();
    }
    else if (!wordGuessed()) {
        if (firstGame) {
            console.log("Guess a dog breed!");
            currentWord.displayWord();
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
                        console.log("\nPlease enter a single letter.");
                        return false;
                    }
                }
            }
        ]). then(function(userInput) { 
            currentWord.checkGuess(userInput.guess);
            currentWord.displayWord();
            if (currentWord.checkGuess(userInput.guess)) {
                console.log("Correct!");
            }
            else {
                remainingGuess--;
                console.log("Incorrect! Remaining Guess: " + remainingGuess + "!");
            }
            guessedLetter.push(userInput.guess.trim().toLowerCase());
            guessPrompt();
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
        console.log("No more word to guess!")
        playAgain();
    }
    else {
        guessedLetter = [];
        remainingGuess = 10;
        randomWord();
        currentWord.displayWord();
        guessPrompt();
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
            randomWord();
            guessPrompt();
        }
        else {
            console.log("Good Game!");
        }
    })
};

randomWord();
guessPrompt();