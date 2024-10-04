# Trading Bot

This is a simple trading bot that uses mock stock price data to execute trades based on predefined rules. It tracks profit/loss and generates a report of its trades.

## Installation

1. Install dependencies:
   ```bash
   npm install
2. Set environment variables in the .env file.
    INITIAL_BALANCE=10000
    TRADING_FEE=10
    PRICE_DROP_THRESHOLD=0.02 
    PRICE_RISE_THRESHOLD=0.03 

3. Run the mock API:
    node mockAPI.js
4. Run the trading bot:
    node app.js

Endpoints
[/report](http://localhost:3000/report): Get the bot's trade report.