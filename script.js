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

const GUESES = 6;
let remainingGuesses = GUESES;
let currentGuess = [];
let nextLetter = 0;
let rightGuess = WORDS[Math.floor(Math.random() * WORDS.length)];

console.log(rightGuess);

const initializeBoard = () => {
  let board = document.getElementById('game-board');

  for (let i = 0; i < GUESES; i++) {
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

initializeBoard();
