import percentage from './percentage';
import { suits, rank } from './representation';

/**
 * Determines whether 'T' is after '9' or 'K' is after 'Q'
 * @return {Boolean}
 */
function sequentialSequence(current, prev) {
  const currentIdx = rank.indexOf(current);
  if (currentIdx === 0) {
    return rank.indexOf(prev) === rank.length - 1;
  }
  return (currentIdx - rank.indexOf(prev)) === 1;
}

/**
 * Returns the percentage of the cards in the pack that
 * are in same suit sequential order
 */
function nonSequential(deck) {
  const count = deck.reduce((kount, card, i, d) => {
    const nextCard = d[i + 1];
    if (!nextCard) {
      return kount;
    }
    const isSequential = sequentialSequence(d[i + 1][0], card[0]);
    const isSameSuit = card[1] === d[i + 1][1];
    return kount + +(isSequential && isSameSuit);
  }, 0);
  const totalPossible = deck.length - suits.length;
  return percentage(totalPossible, totalPossible - count);
}

module.exports = { nonSequential, sequentialSequence };
