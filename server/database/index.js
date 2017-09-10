// Get rid of this after it works
require("isomorphic-fetch");
const fs = require("fs");
const baseUrl = "https://www.quandl.com/api/v3/datasets/EOD";

//helper functions
function addUrlQueryParams(url, queryObj) {
  Object.keys(queryObj).forEach(key => (url += `&${key}=${queryObj[key]}`));
  return url;
}

function dateToISOString(date) {
  return date.toISOString().split("T")[0];
}

function makeDateArray(startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const dateArray = [];
  let currDate = new Date(startDate);

  while (endDate > currDate) {
    dateArray.push(dateToISOString(new Date(currDate)));
    currDate.setDate(currDate.getDate() + 1);
  }
  return dateArray;
}

function parseStockJSON(jsonStockData, startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  let stockData = jsonStockData["dataset"]["data"].reverse(); // get this to work and then do it without reverse
  let currDate = new Date(startDate);
  let columnNameCloseIndex = jsonStockData["dataset"]["column_names"].indexOf(
    "Close"
  );
  let stockDataParsed = [];
  let count = 0;
  let stockDataObject = {};

  while (endDate > currDate) {
    let stockDayData = {};
    let currDateKey = dateToISOString(new Date(currDate));
    // Case 1: count date is ahead of currDate
    if (currDate < new Date(stockData[count][0])) {
      // Case 1A: No stock data yet
      // Case 1B: Have previous stockData stored
      stockDayData[currDateKey] =
        count < 1
          ? stockData[0][columnNameCloseIndex]
          : stockData[count - 1][columnNameCloseIndex];
    } else {
      // Case 2: Everything is peachy, add data from actual date
      stockDayData[currDateKey] = stockData[count][columnNameCloseIndex];
      count = stockData.length - 1 > count ? ++count : count;
    }
    stockDataParsed.push(stockDayData);
    currDate.setDate(currDate.getDate() + 1);
  }
  stockDataObject[jsonStockData["dataset"]["dataset_code"]] = stockDataParsed;
  return stockDataObject;
}

module.exports = async (QUANDL_API_KEY, queryObj = {}) => {
  const tickerArray = ["AAPL", "MMM", "BA"];

  //set defaults for queryObj
  queryObj.start_date = queryObj.start_date || "2016-01-01";
  queryObj.end_date = queryObj.end_date || "2017-01-01";

  const dateArray = makeDateArray(queryObj.start_date, queryObj.end_date);

  const urlArray = tickerArray.map(ticker =>
    addUrlQueryParams(
      `${baseUrl}/${ticker}.json?api_key=${QUANDL_API_KEY}`,
      queryObj
    )
  );
  let rawPromises, rawData, rawJsonPromises, jsonData, scrubbedJsonData;
  try {
    // Run fetches in parallel
    rawPromises = urlArray.map(url => {
      return fetch(url);
    });
    rawData = await Promise.all(rawPromises);

    // Run json conversion in parallel
    rawJsonPromises = rawData.map(buffer => {
      return buffer.json();
    });
    jsonData = await Promise.all(rawJsonPromises);
    scrubbedJsonData = jsonData.map(jsonStockData =>
      parseStockJSON(jsonStockData, queryObj.start_date, queryObj.end_date)
    );

    // Write json to file
    await fs.writeFile(
      "data.json",
      JSON.stringify(
        { stocks: scrubbedJsonData, tickers: tickerArray, dates: dateArray },
        null,
        2
      )
    );
  } catch (error) {
    throw new Error(error);
  }

  return;
};
