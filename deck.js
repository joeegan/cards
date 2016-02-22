'use strict';

module.exports = class Deck {

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
  return '♣♦♥♠'.replace(/./g, (house) =>
    'A23456789TJQK'.replace(/(\w)/g, '$1' + house)
  ).match(/.{1,2}/g);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomItem(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function overhandShuffle(deck) {
  for (var i = 0; i < 1000; i++) {
    // Take a hand of a random amount of cards from the bottom of the deck
    let hand = deck.splice(randomInt(1, 10));
    // Take a random amount of cards from the bottom the hand
    let remainderHand = hand.splice(randomInt(1, 10));
    // Put what remains of the hand at the top of the deck
    deck = hand.concat(deck);
    // Put the other hand on top
    deck = remainderHand.concat(deck);
  }
  return deck;
}

function riffleShuffle(deck) {
  const deckLength = deck.length;
  const firstHalf = deck.slice(0, deckLength/2);
  const secondHalf = deck.slice(deckLength/2);
  const newDeck = [];
  while(newDeck.length < deckLength) {
    const amountOfCardsA = randomInt(1,2);
    const amountOfCardsB = randomInt(1,2);
    for (let j = 0; j < amountOfCardsB; j++) {
      secondHalf.length && newDeck.push(secondHalf.shift());
    }
    for (let j = 0; j < amountOfCardsA; j++) {
      firstHalf.length && newDeck.push(firstHalf.shift());
    }
  }
  return newDeck;
}
