'use strict';
var suits = require('./representation').suits;
var sequence = require('./representation').sequence;
var random = require('./random');
var percentage = require('./percentage');

module.exports.Deck = class {

  constructor() {
    this.cards = buildDeck();
  }

  hitMe() {
    if (!this.cards.length) {
      throw 'Sorry, no cards left';
    }
    return this.cards.pop();
  }

  riffleShuffle() {
    return this.cards = riffleShuffle(this.cards);
  }

  overhandShuffle() {
    return this.cards = overhandShuffle(this.cards);
  }

}

function buildDeck() {
  return suits.replace(/./g, (suit) =>
    sequence.replace(/(\w)/g, '$1' + suit)
  ).match(/.{1,2}/g);
}

/*
 * Mimics the standard shuffling technique
 * @param {[String]} deck Deck to push the cards into
 */
function overhandShuffle(deck) {
  for (var i = 0; i < 1000; i++) {
    // Take a hand of a random amount of cards from the bottom of the deck
    let hand = deck.splice(random.int(1, 10));
    // Take a random amount of cards from the bottom the hand
    let remainderHand = hand.splice(random.int(1, 10));
    // Put what remains of the hand at the top of the deck
    deck = hand.concat(deck);
    // Put the other hand on top
    deck = remainderHand.concat(deck);
  }
  return deck;
}

/*
 * Pushes a quantity of cards into another
 * @param {[String]} cards The source of the cards to push
 * @param {Number} quantity How many cards to take from each half
 * @param {[String]} deck Deck to push the cards into
 */
function shiftHalf(cards, quantity, newDeck) {
  for (let j = 0; j < quantity; j++) {
    cards.length && newDeck.push(cards.shift());
  }
}

/*
 * Splits the deck in two, then merges the two halfs
 * to form a new deck
 * @param {[String]} deck The cards to split
 */
function riffleShuffle(deck) {
  const deckLength = deck.length;
  const firstHalf = deck.slice(0, deckLength/2);
  const secondHalf = deck.slice(deckLength/2);
  const newDeck = [];
  while(newDeck.length < deckLength) {
    shiftHalf(secondHalf, random.int(1,2), newDeck);
    shiftHalf(firstHalf, random.int(1,2), newDeck);
  }
  return newDeck;
}
