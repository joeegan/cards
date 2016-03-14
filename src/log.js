import chalk from 'chalk';

var BlueBirdQueue = require('bluebird-queue'),
    Promise = require('bluebird');

class Log {

  constructor(repl) {
    this.repl = repl;
    this.queue = [];
    this.uninitiated = true;
    this.queue = new BlueBirdQueue({
      concurrency: 1
    })
    this.queue.start();
  }

  write(msg) {
    console.log(msg);
    // this.queue.add(this.delayed(msg, this.repl));
  }

  delayed(msg, repl) {
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
            resolve();
          }
        }, 50);
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
