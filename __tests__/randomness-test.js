'use strict';

jest.autoMockOff();
const Deck = require('../src/deck').Deck;
const randomness = require('../src/randomness');
const nonSequential = randomness.nonSequential;

describe('provides a score based on nonSequential cards', () => {

  let cards;

  beforeEach(() => {
    cards = new Deck().cards;
  })

  it('has a score of zero for an original pack', () => {
    expect(nonSequential(cards)).toBe(0);
  });

  it('has a score of 100 for a totally non nonSequential pack', () => {
    expect(nonSequential(cards.reverse())).toBe(100);
  });

});
