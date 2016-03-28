import EventEmitter from 'events';

/*
 * Array wrapper with log events emitted
 */
module.exports = class hand extends EventEmitter {

  /*
   * @param {String} e.g. 'Giles'
   */
  constructor(name) {
    super();
    this.name = name;
    if (name === 'You') {
      this.haveHas = 'have';
      this.revealHand = true;
    } else {
      this.haveHas = 'has';
    }
    this.cards = [];
  }

  /*
   * @param {String} e.g. '5♡'
   */
  push(card) {
    const a = this.cards.length ? 'another' : 'a';
    this.cards.push(card);
    this.emit('log', `${this.name} ${this.haveHas} been `
                      + `dealt ${a} card ${this.revealHand ? card : ''}`);
  }

};
