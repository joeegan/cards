'use strict';

var percentage = require('./percentage');
var rank = require('./representation').rank;
var suits = require('./representation').suits;

/**
 * Determines whether 'T' is after '9' or 'K' is after 'Q'
 */
function sequentialSequence(current, prev) {
  const currentIdx = rank.indexOf(current);
  if (currentIdx == 0) {
    return rank.indexOf(prev) == rank.length-1;
  } else {
    return (currentIdx - rank.indexOf(prev)) == 1;
  }
}

/**
 * Returns the percentage of the cards in the pack that
 * are in their original order
 */
function nonSequential(deck) {
  let count = deck.reduce((count, card, i, deck) =>
    +(sequentialSequence(deck[i+1], deck[i][0]) && deck[i+1][1] == deck[i][1])
  , 0);
  const totalPossible = deck.length - suits.length;
  return percentage(totalPossible, totalPossible - count);
}

module.exports = { nonSequential };
