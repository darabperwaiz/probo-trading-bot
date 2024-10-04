// mockAPI.js
const express = require('express');
const app = express();
const port = 3001;

// Random stock prices simulation
let stockPrice = 100; // Starting price

app.get('/stock-price', (req, res) => {
  // Simulate price change (-5% to +5% fluctuations)
  const change = (Math.random() * 0.1 - 0.05) * stockPrice;
  stockPrice += change;
  res.json({ price: stockPrice.toFixed(2) });
});

app.listen(port, () => {
  console.log(`Mock API running on http://localhost:${port}`);
});
