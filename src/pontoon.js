import Hand from './hand'
import _repl from './repl'
import {Log, color} from './log'
import { Deck } from './deck'
import chalk from 'chalk'

const repl = _repl('Pontoon');
const deck = new Deck();
const log = new Log(repl);

let playerHand;
let computerHand;

begin();

function begin() {
  deck.riffleShuffle(999);
  playerHand = new Hand('You');
  computerHand = new Hand('Computer');
  playerHand.on('log', (message) => log.write(message));
  computerHand.on('log', (message) => log.write(message));
  playerHand.name = chalk.blue(playerHand.name);
  computerHand.name = chalk.gray(computerHand.name);
  log.write(`${chalk.green('Welcome to Pontoon.')}`);
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  // move all questions to promises?
  if (stillInPlay(computerHand, playerHand)) {
    stickOrTwist();
  } else {
    playAgain();
  }
  stickOrTwist();
}

function playAgain() {
  repl.question(`Play again? (${chalk.green('yes')} or ${chalk.red('no')})`, (answer) => {
    if (answer.match(/^$|^[yY]/)) {
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
    log.write(`${hand.name} got 21! :triumph:`);
    log.write(`${hand.name} ${chalk.green('won the game')} with ${color(hand.cards.join())}`);
    return false;
  } else if (total > 21) {
    log.write(`${hand.name} ${chalk.red('busts')} with ${color(hand.cards.join())} (${total})`);
    log.write(`${otherHand.name} ${chalk.green('wins')} with ${color(otherHand.cards.join())} (${Deck.score(otherHand.cards)})`);
    return false;
  } else if (total < 21) {
    return true;
  }
}

function stickOrTwist() {
  repl.question(`Stick or twist with ${color(playerHand.cards.join())} (${Deck.score(playerHand.cards)})?\n>`, (answer) => {
    if (answer.match(/^$|^[tT]/)) {
      playerHand.push(deck.pop());
      if (stillInPlay(playerHand, computerHand)) {
        computerHand.push(deck.pop());
        stickOrTwist();
      };
      playAgain();
    } else { // stick
      playerHand.stuck = true;
      if (Deck.score(computerHand.cards) < 16) {
        log.write(`${computerHand.name} has decided to twist too`);
        computerHand.push(deck.pop());
        if (stillInPlay(computerHand, playerHand)) {
          stickOrTwist();
        } else {
          playAgain();
        }
      } else {
        playerHand.stuck = true;
        log.write(`${computerHand.name} has decided to stick`);
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
