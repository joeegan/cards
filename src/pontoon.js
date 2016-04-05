import { color } from './log';
import Deck from './deck';
import chalk from 'chalk';
import Game from './game';

/**
 * First person text based game against the computer
 * Contains the game logic and questions
 */
class Pontoon extends Game {

  constructor() {
    super('Pontoon', ['You', 'Computer']);
  }

  /**
   * When cards are recieved, check whether the hand is still inplay
   * @param {Hand} hand
   * @param {Hand[]} otherHands
   */
  handleCardRecieved(hand, otherHands) {
    if (hand.cards.length < 2) {
      return;
    }
    if (this.stillInPlay(hand, otherHands[0])) {
      this.stickOrTwist(hand);
    } else {
      this.playAgain();
    }
  }

  /**
   * Deals out initial cards to the players
   */
  begin() {
    super.begin();
    // Give everyone a card
    this.hands.forEach((hand) => {
      hand.push(this.deck.topCard);
    });
    // Give first player an additional card
    this.hands[0].push(this.deck.topCard);
  }

  /**
   * Determines whether the player is able to continue playing
   * @param {Hand} hand The hand to analyse
   * @param {Hand} otherHand If 'hand' loses, used to congratulate the other player
   * @return {boolean}
   */
  stillInPlay(hand, otherHand) {
    const total = Deck.score(hand.cards);
    if (total === 21) {
      this.emit('msg', `${hand.name} got 21! :triumph:`);
      this.emit('msg', `${hand.name} ${chalk.green('won the game')}`
       + ` with ${color(hand.cards.join())}`);
      return false;
    }
    if (total > 21) {
      this.emit('msg', `${hand.name} ${chalk.red('busts')}`
       + ` with ${color(hand.cards.join())} (${total})`);
      this.emit('msg', `${otherHand.name} ${chalk.green('wins')}`
       + ` with ${color(otherHand.cards.join())} (${Deck.score(otherHand.cards)})`);
      return false;
    }
    // total < 21
    return true;
  }

  /**
   * Provide the hand with a card from the deck
   * @param {Hand}
   */
  twist(hand) {
    hand.push(this.deck.topCard);
  }

  /**
   * Flags the hand as stuck
   */
  stick(hand) {
    hand.stuck = true;
    this.emit('msg', `${hand.name} has decided to stick`);
  }

  /**
   * Asks the player if they would like to stick with their current cards,
   * or be given another one from the deck
   */
  stickOrTwist(hand) {
    if (this.hands.every((h) => h.stuck)) {
      // TODO improve 'both stuck' log messages
      const otherHand = this.otherHands(hand)[0];
      this.emit('msg', `${hand.name} scored ${Deck.score(hand.cards)}`
      + ` ${otherHand.name} scored ${Deck.score(otherHand.cards)}`);
      this.playAgain();
    }
    if (hand.name.match(/Computer/g)) {
      if (Deck.score(hand.cards) < 16) {
        this.emit('msg', `${hand.name} decided to twist`);
        this.twist(hand);
      } else {
        this.stick(hand);
        this.stickOrTwist(this.otherHands(hand)[0]);
      }
      return;
    }
    const msg = `Stick or twist with ${color(hand.cards.join())}`
     + ` (${Deck.score(hand.cards)})?\n>`;
    this.emit('question', msg, (answer) => {
      if (answer.match(/^$|^[tT]/)) {
        this.twist(hand);
      } else {
        this.stick(hand);
        this.stickOrTwist(this.otherHands(hand)[0]);
      }
    });
  }

}

module.exports = Pontoon;
