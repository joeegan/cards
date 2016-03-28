import Hand from './hand';
import { color } from './log';
import { Deck } from './deck';
import chalk from 'chalk';
import Game from './game';

class Pontoon extends Game {

  constructor() {
    super('Pontoon');
    this.playerHand = new Hand('You');
    this.computerHand = new Hand('Computer');
    this.playerHand.name = chalk.blue(this.playerHand.name);
    this.computerHand.name = chalk.gray(this.computerHand.name);
    this.playerHand.on('log', (message) => this.write(message));
    this.computerHand.on('log', (message) => this.write(message));
    this.begin();
  }

  begin() {
    super.begin();
    this.playerHand.push(this.deck.topCard);
    this.computerHand.push(this.deck.topCard);
    this.playerHand.push(this.deck.topCard);
    this.computerHand.push(this.deck.topCard);
    if (this.stillInPlay(this.computerHand, this.playerHand)) {
      this.queue.push(this.stickOrTwist);
    } else {
      this.queue.push(this.playAgain);
    }
  }

  stillInPlay(hand, otherHand) {
    const total = Deck.score(hand.cards);
    if (total === 21) {
      this.write(`${hand.name} got 21! :triumph:`);
      this.write(`${hand.name} ${chalk.green('won the game')}
       with ${color(hand.cards.join())}`);
      return false;
    } else if (total > 21) {
      this.write(`${hand.name} ${chalk.red('busts')}`
       + ` with ${color(hand.cards.join())} (${total})`);
      this.write(`${otherHand.name} ${chalk.green('wins')}`
       + ` with ${color(otherHand.cards.join())} (${Deck.score(otherHand.cards)})`);
      return false;
    }
    // total < 21
    return true;
  }

  stickOrTwist() {
    this.repl.question(`Stick or twist with ${color(this.playerHand.cards.join())}
     (${Deck.score(this.playerHand.cards)})?\n>`, (answer) => {
      if (answer.match(/^$|^[tT]/)) {
        this.playerHand.push(this.deck.topCard);
        if (this.stillInPlay(this.playerHand, this.computerHand)) {
          this.computerHand.push(this.deck.topCard);
          this.queue.push(this.stickOrTwist);
        } else {
          this.playAgain();
        }
      } else { // stick
        this.playerHand.stuck = true;
        if (Deck.score(this.computerHand.cards) < 16) {
          this.write(`${this.computerHand.name} has decided to twist too`);
          this.computerHand.push(this.deck.topCard);
          if (this.stillInPlay(this.computerHand, this.playerHand)) {
            this.queue.push(this.stickOrTwist);
          } else {
            this.playAgain();
          }
        } else {
          this.playerHand.stuck = true;
          this.write(`${this.computerHand.name} has decided to stick`);
          if (this.stillInPlay(this.computerHand, this.playerHand)) {
            this.queue.push(this.stickOrTwist);
          } else {
            this.playAgain();
          }
        }
      }
    });
  }

}

module.exports = new Pontoon();
