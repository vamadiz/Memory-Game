/*
 * Create a list that holds all of your cards
 */
 let cardsArray = [
             'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
             'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle',
             'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb',
             'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'
 ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
  let cardsElements = document.getElementsByClassName('card');
  let openedCards = [];
  let counter = 0;
  let successfulMoves = 0;
  let unsuccessfulMoves = 0;
  let numbOfStars = 3;
  let minutesLabel = document.getElementById('minutes');
  let secondsLabel = document.getElementById('seconds');
  let totalSeconds = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

function setTime() {
   ++totalSeconds;
   secondsLabel.innerHTML = pad(totalSeconds % 60);
   minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
 };

function buildCards() {
  for (let i = 0; i < cardsElements.length; i++) {
      let faTag = document.createElement('i');
      let faIconName = cardsArray[i];
      faTag.classList.add('fa');
      faTag.classList.add(faIconName);
      cardsElements[i].appendChild(faTag);
      cardsElements[i].tabIndex = 0;
  };
};

function flipCard (evt) {
  evt.target.classList.add('open');
  evt.target.classList.add('show');
};

function matchedCards (arr) {
  successfulMoves = successfulMoves + 1;

  arr[0].classList.add('match');
  arr[0].classList.add('animated');
  arr[0].classList.add('swing');

  arr[1].classList.add('match');
  arr[1].classList.add('animated');
  arr[1].classList.add('swing');

  arr.pop();
  arr.pop();
  return successfulMoves;
};

function unmatchedCards (arr) {
  unsuccessfulMoves = unsuccessfulMoves + 1;

  arr[0].classList.add('animated');
  arr[0].classList.add('shake');

  arr[1].classList.add('animated');
  arr[1].classList.add('shake');

  setTimeout(funtion() {
    arr[0].classList.remove('open');
    arr[0].classList.remove('show');
    arr[0].classList.remove('animated');
    arr[0].classList.remove('shake');

    arr[1].classList.remove('open');
    arr[1].classList.remove('show');
    arr[1].classList.remove('animated');
    arr[1].classList.remove('shake');

    arr.pop();
    arr.pop();
  }, 1000);

  return unsuccessfulMoves;
};

funtion movesCounter(num) {
  num = num + 1;
  document.getElementById('move').textContent = num;
  return num;
}

funtion gameOver() {
  let scorePanel - document.getElementById('score');
  scorePanel.style.visibilty = 'hidden';
  document.getElementById('secondStar').style.visibilty = 'hidden';
  document.getElementById('thirdStar').style.visibilty = 'hidden';

  let deck = document.getElementById('cardsDeck');
  deck.style.visibilty = 'hidden';

  document.getElementById('statistics').textContent = 'Your Time (mm:ss) is: ' + minutesLabel.textContent + ':' + secondsLabel.textContent + ' With ' + counter + ' moves and ' + numbOfStars + ' star(s)!';

  
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)


 *  - if the list already has another card, check to see if the two cards match

 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
