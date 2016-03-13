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
      repl.close();
    }
  });
}

function stillInPlay(hand, otherHand) {
  var total = Deck.score(hand.cards);
  if (total == 21) {
    log(`${hand.name} got 21!`);
    log(`${hand.name} won the game with`, hand.cards);
    return false;
  } else if (total > 21) {
    log(`${hand.name} is busted ${total}, ${hand.cards}`);
    log(`${otherHand.name} wins with: ${otherHand.cards} (${Deck.score(otherHand.cards)})`);
    return false;
  } else if (total < 21) {
    return true;
  }
}

function stickOrTwist() {
  repl.question(`Stick or twist with ${playerHand.cards} (${Deck.score(playerHand.cards)}) ?\n >`, (answer) => {
    if (answer == 'twist') {
      playerHand.push(deck.pop());
      if (stillInPlay(playerHand, computerHand)) {
        computerHand.push(deck.pop());
        stickOrTwist();
      };
      playAgain();
    } else if (answer == 'stick') {
      if (Deck.score(computerHand.cards) < 16) {
        log('The computer has decided to twist too');
        computerHand.push(deck.pop());
      }
      stillInPlay(computerHand, playerHand);
      playAgain();
    }
  });
}

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}
