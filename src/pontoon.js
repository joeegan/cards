import { color } from './log';
import Deck from './deck';
import chalk from 'chalk';
import VersusComputer from './versus-computer';

/**
 * First person text based game against the computer
 * Contains the game logic and questions
 */
class Pontoon extends VersusComputer {

  constructor() {
    super('Pontoon');
  }

  /**
  * @param {string[]} hand
  */
  handleCardRecieved(hand) {
    if (hand.cards.length < 2) {
      return;
    }
    if (this.stillInPlay(hand, this.playerHand)) {
      this.queue.push(this.stickOrTwist);
    } else {
      this.queue.push(this.playAgain);
    }
  }

  /**
   * Deals out initial cards to the players and asks the player to
   * stick or twist, or play again.
   */
  begin() {
    super.begin();
    this.playerHand.push(this.deck.topCard);
    this.computerHand.push(this.deck.topCard);
    this.playerHand.push(this.deck.topCard);
  }

  /**
   * Determines whether the player is able to continue playing
   * @param {string[]} hand The hand to analyse
   * @param {string[]} otherHand If 'hand' loses, used to congratulate the other player
   * @return {boolean}
   */
  stillInPlay(hand, otherHand) {
    const total = Deck.score(hand.cards);
    if (total === 21) {
      this.write(`${hand.name} got 21! :triumph:`);
      this.write(`${hand.name} ${chalk.green('won the game')}`
       + ` with ${color(hand.cards.join())}`);
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

  /**
   * Asks the player if they would like to stick with their current cards, or
   * be given another one from the deck
   */
  stickOrTwist() {
    this.repl.question(`Stick or twist with ${color(this.playerHand.cards.join())}`
     + ` (${Deck.score(this.playerHand.cards)})?\n>`, (answer) => {
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
          this.write(`${this.computerHand.name} has decided to twist`);
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
