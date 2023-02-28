'use strict';

// Selecting Elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
// getElementById is supposed to be faster than querySelector
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);


// Starting Conditions
const scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;
const init = function () {
    scores[0] = scores[1] = 0;
    currScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add(`hidden`);
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
};

init();

const playWinAudio = function () {
    const audio = document.getElementById(`win-audio`);
    audio.play();
};


const switchPlayer = function () {
    currScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currScore;
    activePlayer = activePlayer == 1 ? 0 : 1;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);

}

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
    if (!playing) return;
    // 1. Generating a random dice roll
    const dice = Math.ceil(Math.random() * 6);

    // 2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `../Pig-Game/images/dicee-${dice}.png`;

    // 3. Check for rolled 1
    if (dice != 1) {
        // Add dice to current score
        currScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currScore;

    } else {
        // switch to next player
        switchPlayer();
    }
});

// hold the current score functionality
btnHold.addEventListener(`click`, function () {
    if (!playing) return;
    // 1. Add current score to active player's score 
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
        // finish the game
        playWinAudio();
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        diceEl.classList.add(`hidden`);
    } else {
        // switch the player
        switchPlayer();
    }
});

// reset the functionality
btnNew.addEventListener(`click`, init);


