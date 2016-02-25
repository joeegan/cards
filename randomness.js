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
    // 'A' following 'K' returns true - TODO consider whether this is valuable
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
  let previousSequence = deck[0][0];
  let previousSuit = deck[0][1];
  for (let i = 1; i < deck.length; i++) {
    const sequence = deck[i][0];
    const suit = deck[i][1];
    if (sequentialSequence(sequence, previousSequence)
      && suit == previousSuit) {
      count++;
    }
    // TODO avoid state?
    previousSuit = suit;
    previousSequence = sequence;
  }
  const totalPossible = deck.length - suits.length;
  return percentage(totalPossible, totalPossible - count);
}

module.exports = {nonSequential};
