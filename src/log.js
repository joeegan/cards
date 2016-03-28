import chalk from 'chalk';
import { randomInt } from './random';

/**
 * Wraps card representations in appropriate colors
 * @param {string} str
 */
export function color(str) {
  return str.replace('♡', chalk.red('♡'))
            .replace('♢', chalk.red('♢'))
            .replace('♧', chalk.gray('♧'))
            .replace('♤', chalk.gray('♤'))
            .replace('T', '10');
}

/**
 * Allows 'slow' writing of strings to the repl
 * to provide a slower pace to the game
 */
export class Log {

  constructor(repl) {
    this.repl = repl;
  }

  /**
   * {string} msg The message to display to the player in the repl
   */
  writeLine(msg) {
    const repl = this.repl;
    return new Promise((resolve) => {
      const arr = msg.split('');
      (function loop() {
        setTimeout(() => {
          let next = arr.shift();
          if (next) {
            next = color(next);
          }
          repl.write(next);
          if (next) {
            loop();
          } else {
            repl.clearLine();
            resolve();
          }
        }, randomInt(1, 5) * 10);
      }());
    });
  }

}
