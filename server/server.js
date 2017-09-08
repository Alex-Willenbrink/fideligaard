const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
require("isomorphic-fetch");
const fs = require("fs");
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

function parseJSON(jsonCompany, startDate, endDate) {
  endDate = new Date(endDate);
  startDate = new Date(startDate);
  let stockData = jsonCompany["dataset"]["data"].reverse();
  let currDate = startDate;
  let columnNameCloseIndex = jsonCompany["dataset"]["column_names"].indexOf(
    "Close"
  );
  let stockDataParsed = [];
  let count = 0;
  while (endDate > currDate) {
    if (currDate < new Date(stockData[count][0])) {
      if (count < 1) {
        stockDataParsed.push({
          date: new Date(currDate),
          close: stockData[0][columnNameCloseIndex]
        });
      } else {
        stockDataParsed.push({
          date: new Date(currDate),
          close: stockData[count - 1][columnNameCloseIndex]
        });
      }

      currDate.setDate(currDate.getDate() + 1);
      continue;
    }
    stockDataParsed.push({
      date: new Date(currDate),
      close: stockData[count][columnNameCloseIndex]
    });
    count = stockData.length - 1 > count ? ++count : count;
    //count++
    currDate.setDate(currDate.getDate() + 1);
  }
  return stockDataParsed;
}

//server endpoint for getting all stock data
server.get("/api/stocks", async (req, res) => {
  const tickerArray = ["AAPL", "MMM", "BA"]; //TODO: add all the tickers
  //set defaults
  req.query.start_date = req.query.start_date || "2016-01-01";
  req.query.end_date = req.query.end_date || "2017-01-01";
  const urlArray = tickerArray.map(ticker =>
    addUrlQueryParams(`${baseUrl}/${ticker}.json?api_key=${API_KEY}`, req.query)
  );
  let data;
  let result;
  let scrubbedData;
  try {
    data = urlArray.map(url => {
      return fetch(url);
    });
    let promises = await Promise.all(data);
    promises = promises.map(buffer => {
      return buffer.json();
    });
    result = await Promise.all(promises);
    scrubbedData = result.map(jsonCompany =>
      parseJSON(jsonCompany, "2016-01-01", "2017-01-01")
    );
  } catch (err) {
    return res.json({
      error: err,
      message: "Something went wrong with the fetching"
    });
  }

  await fs.writeFile("data.json", JSON.stringify(scrubbedData, null, 2));
  return res.json(scrubbedData);
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
