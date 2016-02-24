module.exports = function(total, value) {
  return +(value / total * 100).toFixed(2);
}
