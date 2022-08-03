const WORDS = [
  'which',
  'there',
  'their',
  'about',
  'would',
  'these',
  'other',
  'words',
  'could',
  'write',
  'first',
  'water',
  'after',
  'where',
  'right',
  'think',
  'three',
  'years',
  'place',
  'sound',
];

const GUESSES = 6;
let remainingGuesses = GUESSES;
let currentGuess = [];
let lettersEntered = 0;
let RIGHT_GUESS = WORDS[Math.floor(Math.random() * WORDS.length)]; // Chose a random word from the array of words.

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

const insertLetter = (pressedKey) => {
  if (lettersEntered === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName('letter-row')[6 - remainingGuesses];
  let box = row.children[lettersEntered];
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

const checkGuess = () => {
  let row = document.getElementsByClassName('letter-row')[6 - remainingGuesses];
  let guess = '';
  let rightGuess = Array.from(RIGHT_GUESS);

  for (const value of currentGuess) {
    guess += value;
  }

  if (guess.length != 5) {
    alert('Not enough letters!');
    return;
  }

  if (!WORDS.includes(guess)) {
    alert('Word not in list!');
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = '';
    let box = row.children[i];
    let letter = currentGuess[i];

    let letterPosition = rightGuess.indexOf(currentGuess[i]);

    // Here we check if the letter is in the correct guess word
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
      box.style.backgroundColor = letterColor;
      shadeKeyboard(letter, letterColor);
    }, delay);
  }

  if (guess === RIGHT_GUESS) {
    alert('You guessed right! Game over!');
    remainingGuesses = 0;
    return;
  } else {
    remainingGuesses -= 1;
    currentGuess = [];
    lettersEntered = 0;

    if (remainingGuesses === 0) {
      alert("You've run out of guesses! Game over!");
      alert(`The right word was: "${RIGHT_GUESS}"`);
    }
  }
};

const shadeKeyboard = (letter, letterColor) => {
  for (const elem of document.getElementsByClassName('btn')) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === 'green') {
        return;
      }

      if (oldColor === 'yellow' && letterColor !== 'green') {
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
