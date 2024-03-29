let cardsArray = [
            'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
            'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle',
            'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb',
            'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'
];

let cardsElements = document.getElementsByClassName('card');
let openedCards = [];
let counter = 0;
let successfulMoves = 0;
let unsuccessfulMoves = 0;
let numbOfStars = 3;
let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;

//Provided shuffle function
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    let valString = val + '';
    if (valString.length < 2) {
        return '0' + valString;
    } else {
        return valString;
    }
}

function buildCards () {
    for (let i = 0; i < cardsElements.length; i++) {
        let faTag = document.createElement('i');
        let faIconName = cardsArray[i];
        faTag.classList.add('fa');
        faTag.classList.add(faIconName);
        cardsElements[i].appendChild(faTag);
        cardsElements[i].tabIndex = 0;
    }
}

function flipCard (evt) {
    evt.target.classList.add('open');
    evt.target.classList.add('show');
}

//Function for detailing matched cards
function matchingCards (arr) {
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
}

//Function for detailing unmatched cards
function unmatchingCards (arr) {
    unsuccessfulMoves = unsuccessfulMoves + 1;

    arr[0].classList.add('animated');
    arr[0].classList.add('shake');

    arr[1].classList.add('animated');
    arr[1].classList.add('shake');

    //Remove animations
    setTimeout(function() {
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
}

function movesCounter(num) {
    num = num + 1;
    document.getElementById('move').textContent = num;
    return num;
}

function gameOver () {
    let scorePanel = document.getElementById('score');
    scorePanel.style.visibility = 'hidden';
    document.getElementById('secondStar').style.visibility = 'hidden';
    document.getElementById('thirdStar').style.visibility = 'hidden';

    let deck = document.getElementById('cardsDeck');
    deck.style.visibility = 'hidden';

    document.getElementById('statistics').textContent = 'Your Time (mm:ss) is: ' + minutesLabel.textContent +
        ':' + secondsLabel.textContent + ' With ' + counter + ' moves and ' + numbOfStars + ' star(s)!';
    let winModal = document.getElementById('modal');
    winModal.style.display='block';
    document.getElementById('motivation-message').textContent ='Excellent Work!';
    clearInterval(timer);
}

function resetGame() {
    closeModal();

    // reset timer
    clearInterval(timer);
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    totalSeconds = 0;
    timer = setInterval(setTime, 1000);

    // show stars
    document.getElementById('secondStar').style.visibility = 'visible';
    document.getElementById('thirdStar').style.visibility = 'visible';



    counter = 0;

    // resets game board
    for (let i = 0; i < cardsElements.length; i++) {
        cardsElements[i].classList.remove('open', 'show', 'match', 'animated', 'swing');
        cardsElements[i].removeChild(cardsElements[i].childNodes[0]);
    }


    shuffle(cardsArray);


    buildCards();


    successfulMoves = 0;


    document.getElementById('move').textContent = '';

    let scorePanel = document.getElementById('score');
    scorePanel.style.visibility = 'visible';

    let gameBoard = document.getElementById('cardsDeck');
    gameBoard.style.visibility = 'visible';

}

function closeModal() {
    let congratModal = document.getElementById('modal');
    congratModal.style.display = 'none';
 }


// start timer
let timer = setInterval(setTime, 1000);

shuffle(cardsArray);

buildCards ();

document.getElementById('cardsDeck').addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'LI') {

    if(Array.prototype.indexOf.call(evt.target.classList,"show")>-1) {
	  return;
    }


        flipCard(evt);
        let card = evt.target;
        openedCards.push(card);

        //if the list already has another card, check to see if the two cards match
        if (openedCards.length === 2) {
            counter = movesCounter(counter);
            if (openedCards[0].firstChild.className === openedCards[1].firstChild.className) {
                successfulMoves = matchingCards(openedCards);
                //Player wins with 8 successful moves
                if (successfulMoves === 8) {
                    setTimeout(gameOver, 500);
                }
            }
            //if cards do not match, close each
            else {
                unsuccessfulMoves = unmatchingCards(openedCards);
                openedCards=[];

                //Remove stars as players make more unsuccessful moves
                if (unsuccessfulMoves === 10) {
                    numbOfStars = numbOfStars - 1;
                    document.getElementById('thirdStar').style.visibility = 'hidden';
                }
                else if (unsuccessfulMoves === 20) {
                    numbOfStars = numbOfStars -1;
                    document.getElementById('secondStar').style.visibility = 'hidden';
                }
            }
        }
    }
});

let allCards = document.getElementsByClassName('card');


//restart game
document.getElementById('restart').addEventListener('click', function() {
    resetGame();
})

//run reset game function when play again button is clicked
document.getElementById('playAgain').addEventListener('click', function() {
    resetGame();
})


document.getElementById('closeBut').addEventListener('click', function() {
    closeModal();
    document.getElementById('title').style.visibility = 'hidden';
    document.getElementById('body').style.backgroundImage = "url('img/gameOverBackground.png')";

})





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)


 *  -

 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
