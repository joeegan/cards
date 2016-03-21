import percentage from './percentage';
import { suits, rank } from './representation';

/**
 * Determines whether 'T' is after '9' or 'K' is after 'Q'
 * @return {Boolean}
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
 * are in same suit sequential order
 */
function nonSequential(deck) {
  let count = deck.reduce((count, card, i, deck) => {
    let nextCard = deck[i+1];
    if (!nextCard) {
      return count;
    }
    let isSequential = sequentialSequence(deck[i+1][0], card[0]);
    let isSameSuit = card[1] === deck[i+1][1];
    return count + +(isSequential && isSameSuit);
  }, 0);
  const totalPossible = deck.length - suits.length;
  return percentage(totalPossible, totalPossible - count);
}

module.exports = { nonSequential, sequentialSequence };
