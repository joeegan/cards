import { suits, rank } from './representation';
import random from './random';
import percentage from './percentage';
const EventEmitter = require('events');

module.exports.Deck = class Deck extends EventEmitter {

  constructor() {
    super();
    this.cards = Deck.buildDeck();
  }

  hitMe() {
    if (!this.cards.length) {
      throw 'Sorry, no cards left';
    }
    return this.cards.pop();
  }

  // alias hitMe
  pop() {
    return this.hitMe();
  }

  /*
   * Splits the deck in two, then merges the two halfs
   * to form a new deck
   */
  riffleShuffle(times) {
    var times = times || 1;
    var newDeck;
    for (var i = 0; i < times; i++) {
      const deckLength = this.cards.length;
      const firstHalf = this.cards.slice(0, deckLength/2);
      const secondHalf = this.cards.slice(deckLength/2);
      this.emit('deckHalved', firstHalf, secondHalf);
      newDeck = [];
      while(newDeck.length < deckLength) {
        let rand = random.int(1,2);
        newDeck = Deck.shiftHalf(secondHalf, rand, newDeck);
        this.emit('secondHalfPush');
        rand = random.int(1,2);
        newDeck = Deck.shiftHalf(firstHalf, rand, newDeck);
        this.emit('firstHalfPush');
      }
      this.cards = newDeck;
    }
    return this.cards
  }

  overhandShuffle() {
    return this.cards = overhandShuffle(this.cards);
  }

  /*
   * @return {[String]} deck
   */
  static buildDeck() {
    return suits.replace(/./g, (suit) =>
      rank.replace(/(\w)/g, '$1' + suit)
    ).match(/.{1,2}/g);
  }

  /*
   * Pushes a quantity of cards into another
   * @param {[String]} cards The source of the cards to push
   * @param {Number} quantity How many cards to take from each half
   * @param {[String]} deck Deck to push the cards into
   * @return {[String]} deck
   */
  static shiftHalf(cards, quantity, deck) {
    for (let j = 0; j < quantity; j++) {
      cards.length && deck.push(cards.shift());
    }
    return deck;
  }

  /*
   * Mimics the standard shuffling technique
   * @param {[String]} deck Deck to push the cards into
   * @return {[String]} deck
   */
  static overhandShuffle(deck) {
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
   * Returns the sum of the value of their cards according to pontpon rules
   * @param {[String]} cards e.g. ['A♤', '9♡'];
   * @param {Boolean} aceLow Whether aces should be valued as one or eleven
   * @return {Number}
   */
  static score(cards, aceLow) {
    let nums = cards.map((card) => {
      if (card[0].match(/[TJQK]/)) {
        return 10;
      } else if (card[0].match(/A/)) {
        return aceLow ? 1 : 11;
      } else {
        return +card[0];
      }
    });
    return Deck.sum(nums);
  }

  /*
   * @param {[Number]}
   * @returns {Number}
   */
  static sum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
  }

}
