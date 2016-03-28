/*
 * @param {number} total
 * @param {number} value
 * @return The value as a percentage of the total to 2 decimal places.
 */
 export default (total, value) => +(value / total * 100).toFixed(2);
