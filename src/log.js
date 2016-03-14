// module.exports = function log(msg) {
//   var arr = msg.split('');
//   (function loop() {
//     setTimeout(() => {
//       var next = arr.shift();
//       repl.write(next);
//       if (next) {
//         loop();
//       } else {
//         repl.prompt();
//       }
//     }, 50);
//   })();
// }
import chalk from 'chalk'

function log(msg) {
  console.log(color(msg));
}

function color(str) {
  return str.replace('♡', chalk.red('♡'))
            .replace('♢', chalk.red('♢'))
            .replace('♧', chalk.gray('♧'))
            .replace('♤', chalk.gray('♤'));
}

module.exports = {log, color}
