// load modules and set up constants
require("dotenv").config();
require("isomorphic-fetch");
const fs = require("fs");
const moment = require("moment");

const { QUANDL_API_KEY } = process.env;
const BASE_URL = "https://www.quandl.com/api/v3/datasets/WIKI";
const TICKER_ARRAY = [
  "AAPL",
  "AMZN",
  "ABT",
  "APA",
  "BA",
  "GOOGL",
  "INTC",
  "KO",
  "LUV",
  "MCD",
  "MU",
  "MMM",
  "MON",
  "MSFT",
  "NFLX",
  "NVDA",
  "PEP",
  "PG",
  "PFE",
  "TWTR",
  "TSLA",
  "TGT",
  "V",
  "VZ",
  "WMT",
  "XOM"
];

const generateDatesArray = (startDate, endDate) => {
  const dateArray = [];
  let currDate = startDate.clone();

  while (endDate >= currDate) {
    dateArray.push(currDate);
    currDate = currDate.clone().add(1, "days");
  }
  return dateArray;
};

const getStocksData = async (startDate, endDate, failureLimit = 3) => {
  // generate query string array
  const stocksQueryArray = TICKER_ARRAY.map(
    ticker =>
      `${BASE_URL}/${ticker}.json?api_key=${QUANDL_API_KEY}&start_date=${startDate.format(
        "YYYY-MM-DD"
      )}&end_date=${endDate.format("YYYY-MM-DD")}`
  );

  // fetch stock data
  const stocksData = new Array(TICKER_ARRAY.length).fill(null);
  for (let i = 0; i < TICKER_ARRAY.length; i++) {
    stocksData[i] = await fetch(stocksQueryArray[i]);
    stocksData[i] = await stocksData[i].json();
    for (let j = 0; j < failureLimit; j++) {
      if (!stocksData[i] || stocksData[i].quandl_error) {
        stocksData[i] = await fetch(stocksQueryArray[i]);
        stocksData[i] = await stocksData[i].json();
      } else {
        break;
      }
    }
  }

  // filter out bad stocks
  return stocksData.filter(
    stocksDataObj => stocksDataObj && !stocksDataObj.quandl_error
  );
};

const parseRawStocksData = (startDate, endDate, stocksData = []) => {
  const parsedStocksDataObject = {};

  stocksData.forEach(stocksDataObj => {
    const closeIndex = stocksDataObj["dataset"]["column_names"].indexOf(
      "Close"
    );
    const stocksDayData = {};
    const rawStocksDayData = stocksDataObj["dataset"]["data"].reverse();
    let currDate = startDate.clone();
    let count = 0;

    while (endDate >= currDate) {
      let dateString = currDate.format("YYYY-MM-DD");
      if (rawStocksDayData[count][0] === dateString) {
        stocksDayData[dateString] = rawStocksDayData[count][closeIndex];
        count += count + 1 < rawStocksDayData.length ? 1 : 0;
        currDate.add(1, "days");
      } else if (Object.keys(stocksDayData).length < 1) {
        stocksDayData[dateString] = rawStocksDayData[count][closeIndex];
        currDate.add(1, "days");
      } else {
        currDate.subtract(1, "days");
        stocksDayData[dateString] =
          stocksDayData[currDate.format("YYYY-MM-DD")];
        currDate.add(2, "days");
      }
    }

    parsedStocksDataObject[
      stocksDataObj["dataset"]["dataset_code"]
    ] = stocksDayData;
  });

  return parsedStocksDataObject;
};

const seedDatabase = async (
  startDate = moment("2016-01-01", "YYYY-MM-DD"),
  endDate = moment("2016-12-31", "YYYY-MM-DD")
) => {
  try {
    const datesArray = generateDatesArray(startDate, endDate);
    const rawStocksData = await getStocksData(startDate, endDate);
    const parsedStocksData = parseRawStocksData(
      startDate,
      endDate,
      rawStocksData
    );

    const databaseObject = {
      stocks: parsedStocksData,
      tickers: rawStocksData.map(
        rawStocksObject => rawStocksObject["dataset"]["dataset_code"]
      ),
      dates: datesArray.map(date => date.format("YYYY-MM-DD"))
    };

    fs.writeFileSync("data.json", JSON.stringify(databaseObject, null, 2));
  } catch (error) {
    console.log("seeding error: ", error);
  }
};

module.exports = {
  seedDatabase
};
