// utils.js
function calculateMovingAverage(prices, windowSize) {
    if (prices.length < windowSize) return null;
    const sum = prices.slice(-windowSize).reduce((acc, price) => acc + price, 0);
    return sum / windowSize;
  }
  
  module.exports = { calculateMovingAverage };
  