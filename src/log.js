import chalk from 'chalk';
import random from './random';

class Log {

  constructor(repl) {
    this.repl = repl;
    this.queue = [];
    this.inProgress = false;
  }

  async run() {
    for (let p of this.queue) {
      this.inProgress = true;
      await p();
    }
    this.queue = [];
  }

  write(msg) {
    console.log(msg);
    // if (!this.inProgress) {
    //   this.queue.push(this.writeLine.bind(this, msg));
    //   this.run();
    // } else {
    //   this.queue.push(this.writeLine.bind(this, msg));
    // }
  }

  writeLine(msg) {
    let repl = this.repl;
    return new Promise(function(resolve, reject) {
      var arr = msg.split('');
      (function loop() {
        setTimeout(() => {
          var next = arr.shift();
          if (next) {
            next = color(next);
          }
          repl.write(next);
          if (next) {
            loop();
          } else {
            console.log(); // line break
            resolve();
          }
        }, random.int(1, 5) * 1);
      })();
    });
  }

}

function color(str) {
  return str.replace('♡', chalk.red('♡'))
            .replace('♢', chalk.red('♢'))
            .replace('♧', chalk.gray('♧'))
            .replace('♤', chalk.gray('♤'));
}

module.exports = {Log, color}
