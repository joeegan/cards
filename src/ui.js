import unicode from './unicode';
import $ from 'jquery';
import { Deck } from './deck';

const suits = {
  '♤': 'spade',
  '♡': 'heart',
  '♢': 'diamond',
  '♧': 'club',
};

function template(card, suit, id) {
  return `<span class='${suit}' id=${id}>${card}</span>`;
}

function renderCards(cards) {
  document.body.innerHTML = cards.reduce((html, card) =>
    html + template(unicode[card], suits[card[1]], card)
  , '');
}

// function moveCards(cards) {
//   (function loop(card = cards[0], idx = 0) {
//     $(`span:eq(${idx})`).before($(`#${card}`)).hide().show('slow');
//     setTimeout(() => {
//       loop(cards[idx++], idx)
//     }, 100);
//   }());
// }

const D = new Deck();
const cards = D.cards;

window.onload = () => {
  renderCards(cards);
  document.body.addEventListener('click', () => {
    D.riffleShuffle(cards);
  });
  D.on('deckHalved', (firstHalf, secondHalf) => {
    secondHalf.forEach((card) => {
      $(`#${card}`).addClass('split');
    });
  });
};
