'use strict';

function buildDeck() {
  return 'HSDC'.replace(/./g, (house) =>
    'A123456789JQK'.replace(/(\w)/g, '$1' + house)
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

  /*
   * @return {String} 'QH'
   */
  hitMe() {
    if (!this.cards.length) {
      throw 'Sorry, no cards left';
    }
    return this.cards.splice(
      this.cards.indexOf(randomItem(this.cards)),
      1
    )[0];
  }

}
module.exports = Deck;
