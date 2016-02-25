module.exports = {

  /*
   * @return A random integer from the provided range
   */
  int: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),

  /*
   * @return A random item from an array
   */
  item: (arr) => arr[randomInt(0, arr.length - 1)],

}
