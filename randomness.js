'use strict';

var percentage = require('./percentage');
var sequence = require('./representation').sequence;
var suits = require('./representation').suits;

/**
 * Determines whether 'T' is after '9' or 'K' is after 'Q'
 */
function sequentialSequence(current, prev) {
  const currentIdx = sequence.indexOf(current);
  if (currentIdx == 0) {
    return sequence.indexOf(prev) == sequence.length-1;
  } else {
    return (currentIdx - sequence.indexOf(prev)) == 1;
  }
}

/**
 * Returns the percentage of the cards in the pack that
 * are in their original order
 */
function nonSequential(deck) {
  let count = 0;
  for (let i = 1; i < deck.length; i++) {
    if (sequentialSequence(deck[i][0], deck[i-1][0])
        && deck[i][1] == deck[i-1][1]) {
        count++;
    }
  }
  const totalPossible = deck.length - suits.length;
  return percentage(totalPossible, totalPossible - count);
}

module.exports = { nonSequential };
