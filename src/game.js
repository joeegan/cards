// Basic blueprint for a card game
import repl from 'repl';
import Hand from './hand'
import { Log, color } from './log'
import { Deck } from './deck'
import chalk from 'chalk'
import Queue from './queue'

module.exports = class Game {

  constructor(name) {
    this.deck = new Deck();
    this.deck.riffleShuffle(1000);
    this.name = name;
    this.repl = repl.start({
      prompt: this.name + '> ',
      input: process.stdin,
      output: process.stdout,
    });
    this.log = new Log(this.repl);
    this.queue = new Queue(this);
  }

  begin(){
    this.write(chalk.green(`Welcome to ${this.name}.`));
  }

  write(msg) {
    this.queue.push(this.log.writeLine.bind(this.log, msg));
  }

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

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}
