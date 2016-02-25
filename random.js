module.exports = {

  int: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),

  item: (arr) => arr[randomInt(0, arr.length - 1)],

}
