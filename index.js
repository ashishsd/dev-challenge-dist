// This is not really required, but means that changes to index.html will cause a reload.
require("./site/index.html");
// Apply the styles in style.css to the page.
require("./site/style.css");

// import the urls from the config file
const URL_CONFIG = require("./config");
// import helper files
const {
  updateStockMarketData,
  updateStockMarketTable
} = require("./helper");

global.DEBUG = false;
const url = URL_CONFIG.MARKET_DATA_URL;
const client = Stomp.client(url);
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg);
  }
};

// deefine live market data
const liveMarketData = {};

function connectCallback() {
  // subscribe to the topic prices
  client.subscribe("/fx/prices",(resp) => {
    // retrieve the stock details from the server
    const stockDetails = JSON.parse(resp.body);
    // update live stock market data
    updateStockMarketData(stockDetails, liveMarketData);
    // update stock market table
    updateStockMarketTable(stockDetails, liveMarketData);
  });
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message);
});