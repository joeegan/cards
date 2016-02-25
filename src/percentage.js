/*
 * @return The value as a percentage of the total
 */
module.exports = (total, value) => +(value / total * 100).toFixed(2);
