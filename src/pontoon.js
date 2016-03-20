import Hand from './hand'
import {Log, color} from './log'
import { Deck } from './deck'
import chalk from 'chalk'
import Game from './game'

let playerHand;
let computerHand;

class Pontoon extends Game {

  constructor() {
    super('Pontoon');
    playerHand = new Hand('You');
    computerHand = new Hand('Computer');
    playerHand.name = chalk.blue(playerHand.name);
    computerHand.name = chalk.gray(computerHand.name);
    playerHand.on('log', (message) => this.write(message));
    computerHand.on('log', (message) => this.write(message));
    this.begin();
  }

  begin() {
    super.begin();
    playerHand.push(this.deck.pop());
    computerHand.push(this.deck.pop());
    playerHand.push(this.deck.pop());
    computerHand.push(this.deck.pop());
    if (this.stillInPlay(computerHand, playerHand)) {
      this.queue.push(this.stickOrTwist);
    } else {
      this.queue.push(this.playAgain);
    }
  }

  stillInPlay(hand, otherHand) {
    var total = Deck.score(hand.cards);
    if (total == 21) {
      this.write(`${hand.name} got 21! :triumph:`);
      this.write(`${hand.name} ${chalk.green('won the game')} with ${color(hand.cards.join())}`);
      return false;
    } else if (total > 21) {
      this.write(`${hand.name} ${chalk.red('busts')} with ${color(hand.cards.join())} (${total})`);
      this.write(`${otherHand.name} ${chalk.green('wins')} with ${color(otherHand.cards.join())} (${Deck.score(otherHand.cards)})`);
      return false;
    } else if (total < 21) {
      return true;
    }
  }

  stickOrTwist() {
    this.repl.question(`Stick or twist with ${color(playerHand.cards.join())} (${Deck.score(playerHand.cards)})?\n>`, (answer) => {
      if (answer.match(/^$|^[tT]/)) {
        playerHand.push(this.deck.pop());
        if (this.stillInPlay(playerHand, computerHand)) {
          computerHand.push(this.deck.pop());
          this.queue.push(this.stickOrTwist);
        } else {
          this.playAgain();
        }
      } else { // stick
        playerHand.stuck = true;
        if (Deck.score(computerHand.cards) < 16) {
          this.write(`${computerHand.name} has decided to twist too`);
          computerHand.push(this.deck.pop());
          if (this.stillInPlay(computerHand, playerHand)) {
            this.queue.push(this.stickOrTwist);
          } else {
            this.playAgain();
          }
        } else {
          playerHand.stuck = true;
          this.write(`${computerHand.name} has decided to stick`);
          if (this.stillInPlay(computerHand, playerHand)) {
            this.queue.push(this.stickOrTwist);
          } else {
            this.playAgain();
          }
        }
      }
    });
  }

}

new Pontoon();
