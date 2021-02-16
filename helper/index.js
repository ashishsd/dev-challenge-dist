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
  const existingStockRow = document.getElementById(stockDetails.name);
  const stockGraphSpraks = [];
  liveMarketData[stockDetails.name].forEach((data) => {
    stockGraphSpraks.push(data.bestBid+ data.bestAsk/2);
  });
  const sparks = document.createElement("span");
  Sparkline.draw(sparks, stockGraphSpraks);
  if(existingStockRow) {
    existingStockRow.cells[1].innerHTML= stockDetails.bestBid;
    existingStockRow.cells[2].innerHTML= stockDetails.bestAsk;
    existingStockRow.cells[5].innerHTML= stockDetails.lastChangeAsk;
    existingStockRow.cells[6].innerHTML= stockDetails.lastChangeBid;
    existingStockRow.cells[7].innerHTML = "";
    existingStockRow.cells[7].appendChild(sparks);
    return;
  }
  const newStockRow = dataTable.insertRow();
  newStockRow.id = stockDetails.name;
  createCol(newStockRow, stockDetails.name);
  createCol(newStockRow, stockDetails.bestBid);
  createCol(newStockRow, stockDetails.bestAsk);
  createCol(newStockRow, stockDetails.openBid);
  createCol(newStockRow, stockDetails.openAsk);
  createCol(newStockRow, stockDetails.lastChangeAsk);
  createCol(newStockRow, stockDetails.lastChangeBid);
  const stockGraph = document.createElement("td");
  stockGraph.appendChild(sparks);
  newStockRow.appendChild(stockGraph);
}

module.exports = {
  updateStockMarketData,
  updateStockMarketTable
};