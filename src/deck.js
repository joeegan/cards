import { suits, rank } from './representation';
import { randomInt } from './random';
const EventEmitter = require('events');

/**
 * For shuffling and dealing
 */
export default class Deck extends EventEmitter {

  constructor() {
    super();
    this.cards = Deck.buildDeck();
  }

  /**
   * @return {string} A card from the top of the deck
   */
  get topCard() {
    if (!this.cards.length) {
      throw new Error('Sorry, no cards left');
    }
    return this.cards.pop();
  }

  /**
   * Splits the deck in two, then interleaves the cards to form a new deck
   * @param {number} [times=1] Quantity of times shuffle executed
   * @return {string[]} cards A shuffled deck of cards
   */
  riffleShuffle(times = 1) {
    let newDeck;
    for (let i = 0; i < times; i++) {
      const deckLength = this.cards.length;
      const firstHalf = this.cards.slice(0, deckLength / 2);
      const secondHalf = this.cards.slice(deckLength / 2);
      this.emit('deckHalved', firstHalf, secondHalf);
      newDeck = [];
      while (newDeck.length < deckLength) {
        let rand = randomInt(1, 2);
        newDeck = Deck.shiftHalf(secondHalf, rand, newDeck);
        this.emit('secondHalfPush');
        rand = randomInt(1, 2);
        newDeck = Deck.shiftHalf(firstHalf, rand, newDeck);
        this.emit('firstHalfPush');
      }
      this.cards = newDeck;
    }
    return this.cards;
  }

  /**
   * Mimics the stand shuffling technique of humans
   * @return {string[]} cards A shuffled deck of cards
   */
  overhandShuffle() {
    this.cards = Deck.overhandShuffle(this.cards);
    return this.cards;
  }

  /**
   * @return {string[]} deck
   */
  static buildDeck() {
    return suits.replace(/./g, (suit) =>
      rank.replace(/(\w)/g, `$1${suit}`)
    ).match(/.{1,2}/g);
  }

  /**
   * Pushes a quantity of cards into another
   * @param {string[]} cards The source of the cards to push
   * @param {number} quantity How many cards to take from each half
   * @param {string[]]} deck Deck to push the cards into
   * @return {string[]]} deck
   */
  static shiftHalf(cards, quantity, deck) {
    for (let j = 0; j < quantity; j++) {
      if (cards.length) {
        deck.push(cards.shift());
      }
    }
    return deck;
  }

  /**
   * Mimics the standard shuffling technique
   * @param {string[]]} deck Deck to push the cards into
   * @return {string[]]} deck
   */
  static overhandShuffle(deck) {
    /* eslint no-param-reassign: "off" */
    for (let i = 0; i < 1000; i++) {
      // Take a hand of a random amount of cards from the bottom of the deck
      const hand = deck.splice(randomInt(1, 10));
      // Take a random amount of cards from the bottom the hand
      const remainderHand = hand.splice(randomInt(1, 10));
      // Put what remains of the hand at the top of the deck
      deck = hand.concat(deck);
      // Put the other hand on top
      deck = remainderHand.concat(deck);
    }
    return deck;
  }

  /**
   * Returns the sum of the value of their cards according to pontoon rules
   * @param {string[]} cards e.g. ['A♤', '9♡'];
   * @param {boolean} aceLow Whether aces should be valued as one or eleven
   * @return {number}
   */
  static score(cards, aceLow) {
    const nums = cards.map((card) => {
      if (card[0].match(/[TJQK]/)) {
        return 10;
      } else if (card[0].match(/A/)) {
        return aceLow ? 1 : 11;
      }
      return +card[0];
    });
    return Deck.sum(nums);
  }

  /**
   * @param {number[]} arr
   * @return {number}
   */
  static sum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
  }

}
