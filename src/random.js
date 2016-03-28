/*
 * @return A random integer from the provided range
 */
const int = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/*
 * @return A random item from an array
 */
const item = (arr) => arr[int(0, arr.length - 1)];

module.exports = { int, item };
