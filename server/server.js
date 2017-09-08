const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
require("isomorphic-fetch");
const baseUrl = "https://www.quandl.com/api/v3/datasets/EOD";

//api endpoints
server.set("port", 3001);

//start_date=2016-01-01
//end_date=2017-01-01

//helper function
function addUrlQueryParams(url, queryObj) {
  Object.keys(queryObj).forEach(key => (url += `&${key}=${queryObj[key]}`));
  return url;
}

function parseJSON(json, startDate, endDate) {
  endDate = new Date(endDate);
  startDate = new Date(startDate);
  let stockData = json[0]["dataset"]["data"].reverse();
  let currDate = startDate;
  let columnNameCloseIndex = json[0]["dataset"]["column_names"].indexOf(
    "Close"
  );
  let stockDataParsed = [];
  let count = 0;

  while (endDate > currDate) {
    if (currDate < new Date(stockData[count][0])) {
      if (count < 1) {
        stockDataParsed.push({
          date: currDate,
          close: stockData[0][columnNameCloseIndex]
        });
      } else {
        stockDataParsed.push({
          date: currDate,
          close: stockData[count - 1][columnNameCloseIndex]
        });
      }

      currDate.setDate(currDate.getDate() + 1);
      continue;
    }
    stockDataParsed.push({
      date: currDate,
      close: stockData[count][columnNameCloseIndex]
    });
    count++;
    currDate.setDate(currDate.getDate() + 1);
    console.log("currDate: ", currDate);
  }
  console.log("stockData: ", stockDataParsed);
  return stockDataParsed;
}

//server endpoint for getting all stock data
server.get("/api/stocks", async (req, res) => {
  const tickerArray = ["AAPL"]; //TODO: add all the tickers
  const urlArray = tickerArray.map(ticker =>
    addUrlQueryParams(`${baseUrl}/${ticker}.json?api_key=${API_KEY}`, req.query)
  );
  let data;
  let result;
  let stuff;
  try {
    data = urlArray.map(url => {
      return fetch(url);
    });
    let promises = await Promise.all(data);
    promises = promises.map(buffer => {
      return buffer.json();
    });
    result = await Promise.all(promises);
    stuff = parseJSON(result, "2016-01-01", "2017-01-01");
  } catch (err) {
    return res.json({
      error: err,
      message: "Something went wrong with the fetching"
    });
  }

  // console.log(stuff);
  return res.json(result);
});

//individual stock endpoint :: not supported
server.get("/api/stocks/:ticker", (req, res) => {
  let url = `${baseUrl}/${req.params.ticker}.json?api_key=${API_KEY}`;
  url = addUrlQueryParams(url, req.query);

  return res.send("COME BACK AGAIN LATER");
});

const port = server.listen(server.get("port"), () => {
  console.log(`listening on ${server.get("port")}`);
});
