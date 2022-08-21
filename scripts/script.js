import { WORDLE_DICTIONARY } from '../scripts/wordle-dictionary.js';

const GUESSES = 6;
let remainingGuesses = GUESSES;
let currentGuess = [];
let lettersEntered = 0;
let RIGHT_GUESS =
  WORDLE_DICTIONARY[Math.floor(Math.random() * WORDLE_DICTIONARY.length)]; // Chose a word randomly from the array of words.

console.log(RIGHT_GUESS);

const initializeGameBoard = () => {
  let board = document.getElementById('game-board');

  for (let i = 0; i < GUESSES; i++) {
    let row = document.createElement('div');
    row.className = 'letter-row';

    for (let j = 0; j < 5; j++) {
      let box = document.createElement('div');
      box.className = 'letter-box';
      row.appendChild(box);
    }
    board.appendChild(row);
  }
};

initializeGameBoard();

document.addEventListener('keyup', (e) => {
  if (remainingGuesses === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === 'Backspace' && lettersEntered !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === 'Enter') {
    checkGuess();
    return;
  }

  let foundKey = pressedKey.match(/[a-z]/gi); // Regular Expression (Regex) to check if the pressedKey matches any letter from a to z.
  if (!foundKey || foundKey.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

// ANIMATION USING ANIMATE.CSS LIBRARY
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty('--animate-duration', '0.3s');

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

const insertLetter = (pressedKey) => {
  if (lettersEntered === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName('letter-row')[6 - remainingGuesses];
  let box = row.children[lettersEntered];
  animateCSS(box, 'pulse');
  box.textContent = pressedKey;
  box.classList.add('filled-box');
  currentGuess.push(pressedKey);
  lettersEntered++;
};

const deleteLetter = () => {
  let row = document.getElementsByClassName('letter-row')[6 - remainingGuesses];
  let box = row.children[lettersEntered - 1];
  box.textContent = '';
  box.classList.remove('filled-box');
  currentGuess.pop();
  lettersEntered--;
};

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-left',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const checkGuess = () => {
  let row = document.getElementsByClassName('letter-row')[6 - remainingGuesses];
  let guess = '';
  let rightGuess = Array.from(RIGHT_GUESS);

  for (const value of currentGuess) {
    guess += value;
  }

  if (guess.length != 5) {
    toastr.error('Not enough letters!');
    return;
  }

  if (!WORDLE_DICTIONARY.includes(guess)) {
    toastr.error('Word Not in List!');
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = '';
    let box = row.children[i];
    let letter = currentGuess[i];

    let letterPosition = rightGuess.indexOf(currentGuess[i]);

    // Here we check if the letter is in the rightGuess word/variable
    if (letterPosition === -1) {
      letterColor = '#3a3a3c'; // Color Grey
    } else {
      // Now we know the letter is in the word. If the letter index and the right guess index are the same, then the letter is in the right position
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = '#538d4e'; // Color Green
      } else {
        letterColor = '#b49f3a'; // Color Yellow
      }
    }

    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, 'flipInX');
      //shade box
      box.style.backgroundColor = letterColor;
      shadeKeyboard(letter, letterColor);
    }, delay);
  }

  if (guess === RIGHT_GUESS) {
    toastr.success('Splendid, You won!');
    remainingGuesses = 0;
    return;
  } else {
    remainingGuesses--;
    currentGuess = [];
    lettersEntered = 0;

    if (remainingGuesses === 0) {
      toastr.error("You've run out of guesses, Game Over!");
      toastr.info(`The right guess was, ${RIGHT_GUESS}`);
    }
  }
};

const shadeKeyboard = (letter, letterColor) => {
  for (const elem of document.getElementsByClassName('btn')) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === '#538d4e') {
        // Green
        return;
      }

      if (oldColor === '#b49f3a' && letterColor !== '#538d4e') {
        // Yellow and Green
        return;
      }

      elem.style.backgroundColor = letterColor;
      break;
    }
  }
};

document.getElementById('game-keyboard').addEventListener('click', (e) => {
  const target = e.target;

  if (!target.classList.contains('btn')) {
    return;
  }

  let key = target.textContent;

  if (key === 'Del') {
    key = 'Backspace';
  }

  document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
});

// Refresh button implementation/functionality
document.getElementById('refresh-btn').addEventListener('click', () => {
  location.reload();
});
