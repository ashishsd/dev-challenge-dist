const {updateStockMarketData} = require("..");

describe("helper methods of App", () => {
  it("should return current live market data if current stock is null", () => {
    const liveMarketData = {};
    const currentStock = null;
    const updatedLiveMarketData = updateStockMarketData(currentStock, liveMarketData);
    expect(updatedLiveMarketData).toEqual(liveMarketData);
  });

  it("should return current live market data if current stock is empty", () => {
    const liveMarketData = {};
    const currentStock = {};
    const updatedLiveMarketData = updateStockMarketData(currentStock, liveMarketData);
    expect(updatedLiveMarketData).toEqual(liveMarketData);
  });

  it("should return current live market data if current stock is valid", () => {
    const liveMarketData = {};
    const currentStock = {
      name: "test",
      bestBid: 10,
      bestAsk: 20,
      openBid: 15,
      openAsk: 3,
      lastChangeAsk: 12,
      lastChangeBid: 18
    };
    const updatedLiveMarketData = updateStockMarketData(currentStock, liveMarketData);
    expect(Object.keys(updatedLiveMarketData)).toEqual(["test"]);
  });

  it("should update existing live market", () => {
    const liveMarketData = {
      test: [
        {
          name: "test",
          bestBid: 10,
          bestAsk: 20,
          openBid: 30,
          openAsk: 23,
          lastChangeAsk: 24,
          lastChangeBid: 11
        }
      ]
    };
    const currentStock = {
      name: "test",
      bestBid: 10,
      bestAsk: 20,
      openBid: 30,
      openAsk: 23,
      lastChangeAsk: 24,
      lastChangeBid: 11
    };
    const updatedLiveMarketData = updateStockMarketData(currentStock, liveMarketData);
    expect(updatedLiveMarketData["test"].length).toEqual(2);
  });
});