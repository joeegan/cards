'use strict';

function buildDeck() {
  return 'HCDS'.replace(/./g, (house) =>
    'A23456789TJQK'.replace(/(\w)/g, '$1' + house)
  ).match(/.{1,2}/g);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomItem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

class Deck {

  constructor() {
    this.cards = buildDeck();
  }

  hitMe() {
    if (!this.cards.length) {
      throw 'Sorry, no cards left';
    }
    return this.cards.pop();
  }

  overhandShuffle() {
    for (var i = 0; i < randomInt(5,100); i++) {
      // Take a hand of a random amount of cards from the bottom of the deck
      let hand = this.cards.splice(randomInt(1, 10));
      // Take a random amount of cards from the bottom the hand
      let remainderHand = hand.splice(randomInt(1, 10));
      // Put what remains of the hand at the top of the deck
      this.cards = hand.concat(this.cards);
      // Put the other hand on top
      this.cards = remainderHand.concat(this.cards);
    }
    return this.cards;
  }

  riffleShuffle() {
    const deckLength = this.cards.length;
    const secondHalf = this.cards.splice(deckLength/2);
    const firstHalf = this.cards.slice();
    let newArray = [];
    for (let j = 0; j < deckLength; j++) {
      newArray.push((j % 2 == 0) ? firstHalf.shift() : secondHalf.shift());
    }
    this.cards = newArray;
    return this.cards;
  }

}
module.exports = Deck;
