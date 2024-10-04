// app.js
require('dotenv').config();
const TradeBot = require('./tradeBot');

const initialBalance = parseFloat(process.env.INITIAL_BALANCE);
const bot = new TradeBot(initialBalance);

async function startBot() {
  setInterval(async () => {
    await bot.trade();
  }, 3000); // Runs every 3 seconds
}

// Endpoint to get the report
const express = require('express');
const app = express();
const port = 3000;

app.get('/report', (req, res) => {
  res.json(bot.report());
});

app.listen(port, () => {
  console.log(`Bot report available at http://localhost:${port}/report`);
  startBot(); // Start trading bot
});
