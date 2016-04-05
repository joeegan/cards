import EventEmitter from 'events';
import Deck from './deck';
import chalk from 'chalk';
import Hand from './hand';

/**
 * Common functionality for text based card game
 */
export default class Game extends EventEmitter {

  /**
   * Sets up the tools required for the text based game
   * @param {string} name Identifier for the game, e.g. 'Whist'
   * @param {string[]} Names of the players e.g. 'You', 'Computer'
   */
  constructor(name, playerNames) {
    super();
    this.name = name;
    this.playerNames = playerNames;
  }

  /**
   * Begins the game with fresh deck and empty hands
   */
  begin() {
    this.hands = this.playerNames.map((name) => new Hand(name));
    this.hands.forEach((hand) => {
      hand.name = chalk.blue(hand.name);
      hand.on('log', (msg) => {
        this.emit('msg', msg);
      });
      hand.on('recievedCard',
        this.handleCardRecieved.bind(this, hand, this.otherHands(hand)));
    });

    this.deck = new Deck();
    this.deck.riffleShuffle(1000);

    this.emit('msg', chalk.green(`Welcome to ${this.name}.`));
  }

  /**
  * @param {Hand} hand
  * @param {Hand[]} otherHands
  */
  handleCardRecieved() {
    throw Error('handleCardRecieved must be overidden');
  }

  /**
   * Poses the question of whether the player would like to play another game
   */
  playAgain() {
    const msg = `Play again? (${chalk.green('yes')} or ${chalk.red('no')})`;
    this.emit('question', msg, (answer) => {
      if (answer.match(/^$|^[yY]/)) {
        this.emit('reset');
        this.begin();
      } else {
        this.emit('finish');
      }
    });
  }

  /**
   * Returns an array of the other hands involved in the game
   * @param {Hand} hand
   * @return {Hand[]}
   */
  otherHands(hand) {
    return this.hands.filter((h) => h.name !== hand.name);
  }

}
