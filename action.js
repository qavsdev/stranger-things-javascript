var correctGuesses = [];
var answers = []

var quotesNumber = quotes.length;
var authors = [];
var quoteElement = document.getElementById("quote");
var selectedIndex;
var selectedQuote;

var answerElemets = [];
answerElemets.push(document.getElementById("answer-1"));
answerElemets.push(document.getElementById("answer-2"));
answerElemets.push(document.getElementById("answer-3"));
answerElemets.push(document.getElementById("answer-4"));

document.querySelectorAll('.answers').forEach(element => {
  element.addEventListener('click', event => {
    checkGuess(event);
  })
});

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// get all authors from quotes array 
function getAllAuthors() {
  var authorsSet = new Set();
  quotes.forEach(element => {
    authorsSet.add(element.author);
  });
  authors = Array.from(authorsSet);
}

// get a new random quote that was not selected before
function getQuote() {
  resetBackgroundColors();
  while (true) {
    var quoteIndex = getRandomNumber(quotesNumber);
    if(!correctGuesses.includes(quoteIndex)) {
      selectedQuote = quotes[quoteIndex];
      console.log(selectedQuote.author);
      answers.push(selectedQuote.author);
      quoteElement.innerText = selectedQuote.quote;
      selectedIndex = quoteIndex;
      break;
    }
  }
  getWrongAuthors();
  setAnswers();
}

// function that gets 3 authors that will be used as wrong answers
function getWrongAuthors() {
  var count = 0;
  while (count < 3) {
    authorIndex = getRandomNumber(authors.length);
    if (!answers.includes(authors[authorIndex])) {
      answers.push(authors[authorIndex]);
      count++;
    }
  }
}

function setAnswers() {
  for(var i = 0; i < 3; i++) {
    var randomIndex = getRandomNumber(answers.length);
    answerElemets[i].innerText = answers[randomIndex];
    answers.splice(randomIndex, 1);
  }
  answerElemets[3].innerText = answers[0];
  answers = [];
}

function checkGuess(event) {
  console.log(event);
  if(event.target.innerText == selectedQuote.author) {
    event.target.style.setProperty('background-color', 'green');
    correctGuesses.push(selectedIndex);
  }
  else {
    event.target.style.setProperty('background-color', 'red');
    highlightCorrectAnswer();
    correctGuesses = [];
  }
  setTimeout(() => getQuote(), 2000);
}

function highlightCorrectAnswer(){
  answerElemets.forEach(element => {
    if (element.innerText == selectedQuote.author) {
      element.style.setProperty('background-color', 'green');
    }
  });
}

function resetBackgroundColors(){
  answerElemets.forEach(element => {
      element.style.setProperty('background-color', 'initial');
  });
}

function startGame(){
  getAllAuthors();
  getQuote();
}

startGame();
