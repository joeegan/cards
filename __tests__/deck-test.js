jest.autoMockOff();
var Deck = require('../deck').Deck;
var randomness = require('../randomness');

describe('creating a new deck', function() {

  it('has 52 cards', function() {
    const d = new Deck();
    expect(d.cards.length).toBe(52);
  });

  it('has sequential cards', function() {
    const d = new Deck();
    expect(d.cards[0]).toBe('A♤');
    expect(d.cards[1]).toBe('2♤');
    expect(randomness(d.cards)).toBe(0);
  });

});

describe('requesting a card from the deck', function() {

  it('removes a card from the top of the deck', function() {
    const d = new Deck();
    const originalLength = d.cards.length;
    const card = d.hitMe();
    expect(d.cards.length).toBe(originalLength - 1);
  });

});

describe('the overhand shuffle', function() {

  it('leaves the deck in a different state', function() {
    const d = new Deck();
    var snapshot = d.cards.slice();
    d.overhandShuffle();
    expect(d.cards).not.toBe(snapshot);
    expect(d.cards.length).toBe(52);
    expect(randomness(d.cards)).toBeGreaterThan(0);
  });

});

describe('the riffle shuffle', function() {

  it('leaves the deck in a different state', function() {
    const d = new Deck();
    var snapshot = d.cards.slice();
    d.riffleShuffle();
    expect(d.cards).not.toBe(snapshot);
    expect(d.cards.length).toBe(52);
    expect(randomness(d.cards)).toBeGreaterThan(0);
  });

});
