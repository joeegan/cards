import chalk from 'chalk';
import random from './random';

function color(str) {
  return str.replace('♡', chalk.red('♡'))
            .replace('♢', chalk.red('♢'))
            .replace('♧', chalk.gray('♧'))
            .replace('♤', chalk.gray('♤'))
            .replace('T', '10');
}

class Log {

  constructor(repl) {
    this.repl = repl;
  }

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
        }, random.int(1, 5) * 10);
      }());
    });
  }

}

module.exports = { Log, color };
