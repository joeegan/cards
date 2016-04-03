import repl from 'repl';
import { Log } from './log';
import Deck from './deck';
import chalk from 'chalk';
import Hand from './hand';
import Queue from './queue';

/**
 * Common functionality for text based card game
 */
export default class Game {

  /**
   * Sets up the tools required for the text based game
   * @param {string} name Identifier for the game, e.g. 'Whist'
   * @param {string[]} Names of the players e.g. 'You', 'Computer'
   */
  constructor(name, playerNames) {
    this.name = name;
    this.playerNames = playerNames;
    this.repl = repl.start({
      prompt: `${this.name}> `,
      input: process.stdin,
      output: process.stdout,
    });
    this.log = new Log(this.repl);
    this.queue = new Queue(this);
    this.begin();
  }

  /**
   * Begins the game with fresh deck and empty hands
   */
  begin() {
    this.hands = this.playerNames.map((name) => new Hand(name));
    this.hands.forEach((hand) => {
      hand.name = chalk.blue(hand.name);
      hand.on('log', this.write.bind(this));
      hand.on('recievedCard',
        this.handleCardRecieved.bind(this, hand, this.otherHands(hand)));
    });

    this.deck = new Deck();
    this.deck.riffleShuffle(1000);

    this.write(chalk.green(`Welcome to ${this.name}.`));
  }

  /**
  * @param {Hand} hand
  * @param {Hand[]} otherHands
  */
  handleCardRecieved() {
    throw Error('handleCardRecieved must be overidden');
  }

  /**
   * Writes a message to the repl
   * @param {string} msg
   */
  write(msg) {
    this.queue.push(this.log.writeLine.bind(this.log, msg));
  }

  /**
   * Poses the question of whether the player would like to play another game
   */
  playAgain() {
    this.write(`Play again? (${chalk.green('yes')} or ${chalk.red('no')})`);
    this.repl.question('', (answer) => {
      if (answer.match(/^$|^[yY]/)) {
        Game.clear();
        this.begin();
      } else {
        this.repl.close();
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

  /**
   * Clears out the repl so the player feels like they are starting a new game
   */
  static clear() {
    process.stdout.write('\u001B[2J\u001B[0;0f');
  }

}
