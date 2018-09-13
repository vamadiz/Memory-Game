let cardsArray = [
            'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
            'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle',
            'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb',
            'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'
];


//define an HTML collection that contains all elements with class name: card.
let cardsElements = document.getElementsByClassName('card');
let openedCards = [];
let counter = 0;
let successfulMoves = 0;
let unsuccessfulMoves = 0;
let numbOfStars = 3;
let minutesLabel = document.getElementById('minutes');
let secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;


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
        // TODO: add a new <i> inside every <li> element in the HTML collection 'cardsElements'.
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

function matchingCards (arr) {
    successfulMoves = successfulMoves + 1;

    // TODO: add match, animated and swing animation classes when both cards match.
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

function unmatchingCards (arr) {
    unsuccessfulMoves = unsuccessfulMoves + 1;

    // add classes animated and shake on both cards.
    arr[0].classList.add('animated');
    arr[0].classList.add('shake');

    arr[1].classList.add('animated');
    arr[1].classList.add('shake');

    // remove all classes after 1 second. i.e: CSS animation ends
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
    document.getElementById('motivation-message').textContent ='woohooo!';
    clearInterval(timer);
}

function resetGame() {
    closeModal();

    // reset the count up timer
    clearInterval(timer);
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    totalSeconds = 0;
    timer = setInterval(setTime, 1000);

    // show the hidden stars if any
    document.getElementById('secondStar').style.visibility = 'visible';
    document.getElementById('thirdStar').style.visibility = 'visible';


    // Reset the successful moves counter.
    counter = 0;

    // reset the game board. Remove the classes including animation classes for matching cards.
    for (let i = 0; i < cardsElements.length; i++) {
        cardsElements[i].classList.remove('open', 'show', 'match', 'animated', 'swing');
        //remove all <i> tags inside the <li> tags
        cardsElements[i].removeChild(cardsElements[i].childNodes[0]);
    }

    // shuffle the array to change the order of strings randomly inside the cardsArray.
    shuffle(cardsArray);

    // add the <i> tags after we have shuffled the cardsArray.
    buildCards();

    // reset the number of successful moves
    successfulMoves = 0;

    // reset the number of moves.
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


// start the count up timer
let timer = setInterval(setTime, 1000);

shuffle(cardsArray);


//Loop through the HTML collection to add a font awesome tag to each card element.
buildCards ();

document.getElementById('cardsDeck').addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'LI') {

////////////////////////////////////////////////////////////////////////////////////////////
//I added this code to prevent the function form running when the same element is clicked //
////////////////////////////////////////////////////////////////////////////////////////////
/**/  	if(Array.prototype.indexOf.call(evt.target.classList,"show")>-1) {                //
/**/	  return;                                                                         //
/**/    }                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////

        flipCard(evt);
        let card = evt.target;

        // listen to specific keydown on the keyboard such as left, right, up and down keys.
        document.addEventListener('keydown', function(e) {
            let keycode = e.keyCode;
            let adjacentCard = '';
            if (keycode === 39) { // right arrow shortcut
                if (card.nextElementSibling != null) {
                    adjacentCard = card.nextElementSibling;
                    adjacentCard.focus();
                    // set the card now to be equal to the card with focus on it.
                    card = adjacentCard;
                }
            }

            else if (keycode === 37) { // left arrow shortcut
                if (card.previousElementSibling != null) {
                    adjacentCard = card.previousElementSibling;
                    adjacentCard.focus();
                    card = adjacentCard;
                }
            }

            else if (keycode === 38) { //up arrow shortcut
                let previousCard = card;
                let previousCardsFound = 0;
                // use the for loop to reach to the 4th previous sibling of the current card.
                for (i = 0; i < 4; i++) {
                    if (previousCard.previousElementSibling != null) {
                        previousCard = previousCard.previousElementSibling;
                        previousCardsFound = previousCardsFound + 1;
                    }
                }

                // check if the 4th previous sibling exists. And make sure to set focus on the 4th previous element. Not the ones before it.
                if (previousCard != null && previousCardsFound === 4) {
                    adjacentCard = previousCard;
                    adjacentCard.focus();
                    card = adjacentCard;
                }
            }

            else if (keycode === 40) { //down arrow shortcut
                let nextCard = card;

                let nextCardsFound = 0;
                // use the for loop to reach to the 4th next sibling of the current card.
                for (i = 0; i < 4; i++) {
                    if (nextCard.nextElementSibling != null) {
                        nextCard = nextCard.nextElementSibling;
                        nextCardsFound = nextCardsFound + 1;
                    }
                }

                // check if the 4th next sibling exists. And make sure to set focus on the 4th next element. Not the ones before it.
                if (nextCard != null && nextCardsFound === 4) {
                    adjacentCard = nextCard;
                    adjacentCard.focus();
                    card = adjacentCard;
                }
            }

        });

        openedCards.push(card);

        if (openedCards.length === 2) {
            counter = movesCounter(counter);
            if (openedCards[0].firstChild.className === openedCards[1].firstChild.className) {
                successfulMoves = matchingCards(openedCards);
                // if successfulMoves is equal to 8, the player wins the game.
                if (successfulMoves === 8) {
                    setTimeout(gameOver, 500);
                }
            }
            else {
                unsuccessfulMoves = unmatchingCards(openedCards);
                openedCards=[];

                if (unsuccessfulMoves === 9) {
                    numbOfStars = numbOfStars - 1;
                    document.getElementById('thirdStar').style.visibility = 'hidden';
                }
                else if (unsuccessfulMoves === 18) {
                    numbOfStars = numbOfStars -1;
                    document.getElementById('secondStar').style.visibility = 'hidden';
                }
            }
        }
    }
});

let allCards = document.getElementsByClassName('card');

for(let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('keydown', function(ev) {
        let card = ev.target;
        let keycode = ev.keyCode;
        if (keycode === 13) { // enter key
            card.click();
        }
    });
}

document.getElementById('playAgain').addEventListener('click', function() {
    resetGame();
})

document.getElementById('closeBut').addEventListener('click', function() {
    // close the congratulations modal, hide the game's title and change its background image.
    closeModal();
    document.getElementById('title').style.visibility = 'hidden';
    document.getElementById('body').style.backgroundImage = "url('img/gameOverBackground.png')";

})

document.getElementById('refresh').addEventListener('click', function() {
    resetGame();
})



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
