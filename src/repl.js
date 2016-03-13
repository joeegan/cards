'use strict';

var repl = require('repl');

module.exports = function(name) {
  return repl.start({
    prompt: name + '> ',
    input: process.stdin,
    output: process.stdout,
  });
};
