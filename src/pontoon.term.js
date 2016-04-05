import Pontoon from './pontoon';
import { Log } from './log';
import _repl from 'repl';
import Queue from './queue';

const queue = new Queue();
const repl = _repl.start({
  prompt: 'Pontoon> ',
  input: process.stdin,
  output: process.stdout,
});
const log = new Log(repl);
const pontoon = new Pontoon();

pontoon.on('msg', (msg) => {
  queue.push(log.writeLine.bind(log, msg));
});

pontoon.on('question', (msg, handler) => {
  queue.push(() => {
    repl.question(msg, (answer) => {
      handler(answer);
    });
  });
});

pontoon.on('finish', () => {
  repl.close();
});

pontoon.on('reset', () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
});

pontoon.begin();
