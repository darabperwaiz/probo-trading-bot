// tradeBot.js
require('dotenv').config();
const axios = require('axios');
const { calculateMovingAverage } = require('./utils');

class TradeBot {
  constructor(initialBalance) {
    this.balance = initialBalance;
    this.stocks = 0;
    this.trades = [];
    this.lastBuyPrice = null;
  }

  async fetchStockPrice() {
    try {
      const response = await axios.get('http://localhost:3001/stock-price');
      return parseFloat(response.data.price);
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  }

  async trade() {
    const price = await this.fetchStockPrice();
    if (!price) return;

    const PRICE_DROP_THRESHOLD = parseFloat(process.env.PRICE_DROP_THRESHOLD);
    const PRICE_RISE_THRESHOLD = parseFloat(process.env.PRICE_RISE_THRESHOLD);

    // Buy condition: Price drops by 2%
    if (!this.stocks && (!this.lastBuyPrice || price <= this.lastBuyPrice * (1 - PRICE_DROP_THRESHOLD))) {
      this.buy(price);
    }
    // Sell condition: Price rises by 3%
    else if (this.stocks && price >= this.lastBuyPrice * (1 + PRICE_RISE_THRESHOLD)) {
      this.sell(price);
    }
  }

  buy(price) {
    const TRADING_FEE = parseFloat(process.env.TRADING_FEE);
    this.stocks = (this.balance - TRADING_FEE) / price;
    this.balance -= (this.stocks * price + TRADING_FEE);
    this.lastBuyPrice = price;
    this.trades.push({ action: 'BUY', price, stocks: this.stocks });
    console.log(`Bought stocks at $${price.toFixed(2)}, stocks: ${this.stocks.toFixed(4)}, balance: $${this.balance.toFixed(2)}`);
  }

  sell(price) {
    const TRADING_FEE = parseFloat(process.env.TRADING_FEE);
    const revenue = this.stocks * price - TRADING_FEE;
    this.balance += revenue;
    this.trades.push({ action: 'SELL', price, stocks: this.stocks, revenue });
    console.log(`Sold stocks at $${price.toFixed(2)}, revenue: $${revenue.toFixed(2)}, balance: $${this.balance.toFixed(2)}`);
    this.stocks = 0;
    this.lastBuyPrice = null;
  }

  report() {
    return {
      finalBalance: this.balance,
      trades: this.trades,
    };
  }
}

module.exports = TradeBot;
