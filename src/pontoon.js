import Hand from './hand'
import _repl from './repl'
import {log, color} from './log'
import { Deck } from './deck'
import chalk from 'chalk'

const repl = _repl('Pontoon');
const deck = new Deck();

let playerHand;
let computerHand;

begin();

function begin() {
  deck.riffleShuffle(999);
  playerHand = new Hand('You');
  computerHand = new Hand('Computer');
  playerHand.on('log', (message, cards) => log(message + ' ' + cards));
  computerHand.on('log', (message) => log(message));
  playerHand.name = chalk.blue(playerHand.name);
  computerHand.name = chalk.gray(computerHand.name);
  log(`${chalk.green('Welcome to Pontoon.')}`);
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  stickOrTwist();
}

function playAgain() {
  repl.question(`Play again? (${chalk.green('yes')} or ${chalk.red('no')})\n >`, (answer) => {
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
    log(`${hand.name} got 21! :triumph:`);
    log(`${hand.name} won the game with`, hand.cards);
    return false;
  } else if (total > 21) {
    log(`${hand.name} ${chalk.red('is busted')} with ${total}, ${hand.cards}`);
    log(`${otherHand.name} ${chalk.green('wins')} with: ${otherHand.cards} (${Deck.score(otherHand.cards)})`);
    return false;
  } else if (total < 21) {
    return true;
  }
}

function stickOrTwist() {
  repl.question(`Stick or twist with ${color(playerHand.cards.join())} (${Deck.score(playerHand.cards)}) ?\n >`, (answer) => {
    if (answer == 'twist') {
      playerHand.push(deck.pop());
      if (stillInPlay(playerHand, computerHand)) {
        computerHand.push(deck.pop());
        stickOrTwist();
      };
      playAgain();
    } else if (answer == 'stick') {
      if (Deck.score(computerHand.cards) < 16) {
        log(`${computerHand.name} has decided to twist too`);
        computerHand.push(deck.pop());
        if (stillInPlay(computerHand, playerHand)) {
          stickOrTwist();
        } else {
          playAgain();
        }
      }
    }
  });
}

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}
