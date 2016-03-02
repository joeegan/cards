/*
* @param {Number} total
 * @param {Number} value
 * @return The value as a percentage of the total to 2 decimal places.
 */
module.exports = (total, value) => +(value / total * 100).toFixed(2);
