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
