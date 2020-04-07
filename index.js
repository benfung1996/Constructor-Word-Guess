var Word = require("./word");
var inquirer = require("inquirer");

var wordArray = ["siberian husky", "labrador retriever", "pomeranian", "golden retriever", "shiba inu", "samoyed", "welsh corgi"];
var currentWord = "";

var alphabet = /a-zA-Z/;
var remainingGuess = 10;
var guessedLetter = [];
var usedWords = [];
var firstGame = true;