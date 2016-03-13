'use strict';

var repl = require('./repl')('Pontoon');
var Deck = require('./deck').Deck;
var Hand = require('./hand');
var log = console.log;
var deck = new Deck();
var playerHand;
var computerHand;

begin();

function begin() {
  deck.riffleShuffle(999);
  playerHand = new Hand('You');
  computerHand = new Hand('Computer');
  playerHand.on('log', (message, cards) => log(message, cards));
  computerHand.on('log', (message) => log(message));
  log('Welcome to Pontoon...');
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  stickOrTwist();
}

function playAgain() {
  repl.question('Play again? (yes or no)\n >', (answer) => {
    if (answer.match(/^[yY]/)) {
      clear();
      begin();
    } else {
      exit();
    }
  });
}

function stickOrTwist() {
  repl.question(`Stick or twist with ${playerHand.cards} (${Deck.score(playerHand.cards)}) ?\n >`, (answer) => {
    if (answer == 'twist') {
      playerHand.push(deck.pop());
      var total = Deck.score(playerHand.cards);
      if (total == 21) {
        log(`You've got 21!`);
        log(`You've won the game with`, playerHand.cards);
      } else if (total > 21) {
        log(`You are busted as you have ${total}, ${playerHand.cards}`);
        log(`The computer has won with: ${computerHand.cards} (${Deck.score(computerHand.cards)})`);
      } else if (total < 21) {
        computerHand.push(deck.pop());
        stickOrTwist();
      }
      playAgain();
    } else if (answer == 'stick') {
      // AI should decide whether to stick or twist
      if (Math.round(Math.random())) {
        computerHand.push(deck.pop());
        // TODO...
      }
    }
  });
}

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}
