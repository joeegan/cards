module.exports = {

  int: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  item: function(arr) {
    return arr[randomInt(0, arr.length - 1)];
  }
  
}
