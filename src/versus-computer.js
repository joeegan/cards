import Hand from './hand';
import chalk from 'chalk';
import Game from './game';

export default class VersusComputer extends Game {

  constructor(name) {
    super(name);
    this.playerHand = new Hand('You');
    this.computerHand = new Hand('Computer');
    this.playerHand.name = chalk.blue(this.playerHand.name);
    this.computerHand.name = chalk.gray(this.computerHand.name);
    this.playerHand.on('log', this.write.bind(this));
    this.playerHand.on('recievedCard',
      this.handleCardRecieved.bind(this, this.playerHand, this.computerHand));
    this.computerHand.on('log', this.write.bind(this));
    this.computerHand.on('recievedCard',
      this.handleCardRecieved.bind(this, this.computerHand, this.playerHand));
    this.begin();
  }

  handleCardRecieved() {
    throw Error('handleCardRecieved must be overidden');
  }

  begin() {
    super.begin();
    this.computerHand.empty();
    this.playerHand.empty();
  }

}
