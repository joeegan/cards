// Basic blueprint for a card game
import repl from 'repl';
import { Log } from './log';
import Deck from './deck';
import chalk from 'chalk';
import Queue from './queue';

/**
 * Clears out the repl so the player feels like they are starting a new game
 */
function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

/**
 * Common functionality for text based card game
 */
export default class Game {

  /**
   * Creates a new game and fires up a repl for writing to, via a Queue
   * @param {string} name Identifier for the game, e.g. 'Whist'
   */
  constructor(name) {
    this.deck = new Deck();
    this.deck.riffleShuffle(1000);
    this.name = name;
    this.repl = repl.start({
      prompt: `${this.name}> `,
      input: process.stdin,
      output: process.stdout,
    });
    this.log = new Log(this.repl);
    this.queue = new Queue(this);
  }

  /**
   * Welcomes the player to the game
   */
  begin() {
    this.write(chalk.green(`Welcome to ${this.name}.`));
  }

  /**
   * Writes a message to the repl
   * @param {string} msg
   */
  write(msg) {
    this.queue.push(this.log.writeLine.bind(this.log, msg));
  }

  /**
   * Asks the player if they would like to play another game
   */
  playAgain() {
    this.write(`Play again? (${chalk.green('yes')} or ${chalk.red('no')})`);
    this.repl.question('', (answer) => {
      if (answer.match(/^$|^[yY]/)) {
        clear();
        this.begin();
      } else {
        this.repl.close();
      }
    });
  }

}
