/**
 * Returns object for chart rendering.
 *
 * @param {stockData} fetched stock data
 * @param {liveMarketData} current market data
 */
const updateStockMarketData = (stockData, liveMarketData) => {
  // check if data is null or blank
  if (!stockData || !Object.keys(stockData).length) {
    return liveMarketData;
  }
  /* 
   * check stock data already in liveMarket data
   * if stock data does not exists in live Market data initialize it
  */
  if(liveMarketData[stockData.name]) {
    liveMarketData[stockData.name].push(stockData);
  } else {
    liveMarketData[stockData.name] = [stockData];
  }

  // check the stock name length
  const { name: stockName } = stockData;
  if(liveMarketData[stockName].length > 30) {
    liveMarketData[stockName] = liveMarketData[stockName].slice(
      liveMarketData[stockName].length - 30, liveMarketData[stockName].length
    );
  }
  
  return liveMarketData;
};

/**
 * Append a new row in table
 *
 * @param {row} existing row details
 * @param {value} text value of col
 */
function createCol(row, value) {
  const txtValue = document.createTextNode(value);
  const td = document.createElement("td");
  td.appendChild(txtValue);
  row.appendChild(td);
}

/**
 * create market data table
 *
 * @param {stockDetails} fetched stock data from the server
 * @param {liveMarketData} current live market data
 * 
 */
function updateStockMarketTable(stockDetails, liveMarketData) {
  const dataTable = document.getElementById("dataTable");
  const row = document.getElementById(stockDetails.name);
  const sparklineArr = [];
  liveMarketData[stockDetails.name].forEach((data) => {
    sparklineArr.push(data.bestBid+ data.bestAsk/2);
  });
  const sparks = document.createElement("span");
  Sparkline.draw(sparks, sparklineArr);
  if(row) {
    row.cells[1].innerHTML= stockDetails.bestBid;
    row.cells[2].innerHTML= stockDetails.bestAsk;
    row.cells[5].innerHTML= stockDetails.lastChangeAsk;
    row.cells[6].innerHTML= stockDetails.lastChangeBid;
    row.cells[7].innerHTML = "";
    row.cells[7].appendChild(sparks);
  } else {
    const row = dataTable.insertRow();
    row.id = stockDetails.name;
    createCol(row, stockDetails.name);
    createCol(row, stockDetails.bestBid);
    createCol(row, stockDetails.bestAsk);
    createCol(row, stockDetails.openBid);
    createCol(row, stockDetails.openAsk);
    createCol(row, stockDetails.lastChangeAsk);
    createCol(row, stockDetails.lastChangeBid);
    const sparklineTd = document.createElement("td");
    sparklineTd.appendChild(sparks);
    row.appendChild(sparklineTd);
  }
}

module.exports = {
  updateStockMarketData,
  updateStockMarketTable
};