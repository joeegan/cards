import EventEmitter from 'events';

export default class Hand extends EventEmitter {

  /**
   * @param {string} name e.g. 'Player1'
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

  /**
   * @param {string} card e.g. '5♡'
   */
  push(card) {
    const a = this.cards.length ? 'another' : 'a';
    this.cards.push(card);
    this.emit('log', `${this.name} ${this.haveHas} been `
                      + `dealt ${a} card ${this.revealHand ? card : ''}`);
    this.emit('recievedCard', this);
  }

}
