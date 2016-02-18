function buildDeck() {
  return 'HSDC'.replace(/./g, (house) =>
    'A123456789JQK'.replace(/(\w)/g, '$1' + house)
  ).match(/.{1,2}/g);
}
