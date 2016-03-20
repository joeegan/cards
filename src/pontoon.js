import Hand from './hand'
import _repl from './repl'
import {Log, color} from './log'
import { Deck } from './deck'
import chalk from 'chalk'
import Queue from './queue'

const repl = _repl('Pontoon');
const deck = new Deck();
const log = new Log(repl);
const queue = new Queue();
let playerHand;
let computerHand;

begin();

function begin() {
  deck.riffleShuffle(999);
  playerHand = new Hand('You');
  computerHand = new Hand('Computer');
  playerHand.on('log', (message) => write(message));
  computerHand.on('log', (message) => write(message));
  playerHand.name = chalk.blue(playerHand.name);
  computerHand.name = chalk.gray(computerHand.name);
  write(`${chalk.green('Welcome to Pontoon.')}`);
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  if (stillInPlay(computerHand, playerHand)) {
    queue.push(stickOrTwist);
  } else {
    queue.push(playAgain);
  }
}

function playAgain() {
  write(`Play again? (${chalk.green('yes')} or ${chalk.red('no')})`);
  repl.question('', (answer) => {
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
    write(`${hand.name} got 21! :triumph:`);
    write(`${hand.name} ${chalk.green('won the game')} with ${color(hand.cards.join())}`);
    return false;
  } else if (total > 21) {
    write(`${hand.name} ${chalk.red('busts')} with ${color(hand.cards.join())} (${total})`);
    write(`${otherHand.name} ${chalk.green('wins')} with ${color(otherHand.cards.join())} (${Deck.score(otherHand.cards)})`);
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
        queue.push(stickOrTwist);
      } else {
        playAgain();
      }
    } else { // stick
      playerHand.stuck = true;
      if (Deck.score(computerHand.cards) < 16) {
        write(`${computerHand.name} has decided to twist too`);
        computerHand.push(deck.pop());
        if (stillInPlay(computerHand, playerHand)) {
          queue.push(stickOrTwist);
        } else {
          playAgain();
        }
      } else {
        playerHand.stuck = true;
        write(`${computerHand.name} has decided to stick`);
        if (stillInPlay(computerHand, playerHand)) {
          queue.push(stickOrTwist);
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

function write(msg) {
  queue.push(log.writeLine.bind(log, msg));
}
