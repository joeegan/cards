/* globals jest, beforeEach, describe, it, expect */

jest.autoMockOff();

const Deck = require('../src/deck').Deck;
// import { Deck } from '../src/deck';
const randomness = require('../src/randomness');
const nonSequential = randomness.nonSequential;
const sequentialSequence = randomness.sequentialSequence;
// import { nonSequential, sequentialSequence } from '../src/randomness';

describe('provides a score based on nonSequential cards', () => {
  let cards;

  beforeEach(() => {
    cards = new Deck().cards;
  });

  it('determines sequential ranks', () => {
    expect(sequentialSequence('2', 'A')).toBe(true);
    expect(sequentialSequence('3', '2')).toBe(true);
    expect(sequentialSequence('4', '3')).toBe(true);
    expect(sequentialSequence('5', '4')).toBe(true);
    expect(sequentialSequence('6', '5')).toBe(true);
    expect(sequentialSequence('7', '6')).toBe(true);
    expect(sequentialSequence('8', '7')).toBe(true);
    expect(sequentialSequence('9', '8')).toBe(true);
    expect(sequentialSequence('T', '9')).toBe(true);
    expect(sequentialSequence('J', 'T')).toBe(true);
    expect(sequentialSequence('Q', 'J')).toBe(true);
    expect(sequentialSequence('K', 'Q')).toBe(true);
    expect(sequentialSequence('A', 'K')).toBe(true);
  });

  it('has a score of zero for an original pack', () => {
    expect(nonSequential(cards)).toBe(0);
  });

  it('has a score of 100 for a reveresed pack', () => {
    expect(nonSequential(cards.reverse())).toBe(100);
  });
});
