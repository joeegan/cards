import unicode from './unicode';
import { Deck } from './deck';

const suits = {
  '♤': "spade",
  '♡': "heart",
  '♢': "diamond",
  '♧': "club"
}

function template(card, suit) {
  return `<span class='${suit}'>${card}</span>`;
}

function renderCards(cards) {
  document.body.innerHTML = cards.reduce((html, card) =>
    html + template(unicode[card], suits[card[1]])
  , '');
}

let D = new Deck();
let cards = D.cards;

window.onload = () => {
  renderCards(cards);
  document.body.addEventListener('click', () => {
    renderCards(D.riffleShuffle(cards));
  });
};
