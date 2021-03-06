/* globals jest, beforeEach, describe, it, expect */

jest.autoMockOff();
const Deck = require('../src/deck').default;
const randomness = require('../src/randomness');
const nonSequential = randomness.nonSequential;
let deck;

beforeEach(() => {
  deck = new Deck();
});

describe('creating a new deck', () => {
  it('has 52 cards', () => {
    expect(deck.cards.length).toBe(52);
  });

  it('has nonSequential cards', () => {
    expect(deck.cards[0]).toBe('A♤');
    expect(deck.cards[1]).toBe('2♤');
    expect(nonSequential(deck.cards)).toBe(0);
  });
});

describe('requesting a card from the deck', () => {
  it('removes a card from the top of the deck', () => {
    const originalLength = deck.cards.length;
    /* eslint no-unused-vars: "off" */
    const card = deck.topCard;
    expect(deck.cards.length).toBe(originalLength - 1);
  });
});

describe('the overhand shuffle', () => {
  it('leaves the deck in a different state', () => {
    const snapshot = deck.cards.slice();
    deck.overhandShuffle();
    expect(deck.cards).not.toBe(snapshot);
    expect(deck.cards.length).toBe(52);
    expect(nonSequential(deck.cards)).toBeGreaterThan(0);
  });
});

describe('the riffle shuffle', () => {
  it('leaves the deck in a different state', () => {
    const snapshot = deck.cards.slice();
    deck.riffleShuffle();
    expect(deck.cards).not.toBe(snapshot);
    expect(deck.cards.length).toBe(52);
    expect(nonSequential(deck.cards)).toBeGreaterThan(0);
  });
});
