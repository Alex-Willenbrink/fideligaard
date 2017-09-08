const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
require("isomorphic-fetch");
const baseUrl = "https://www.quandl.com/api/v3/datasets/EOD";

//api endpoints
server.set("port", 3001);

//helper function
function addUrlQueryParams(url, queryObj) {
  Object.keys(queryObj).forEach(key => (url += `&${key}=${queryObj[key]}`));
  return url;
}

//server endpoint for getting all stock data
server.get("/api/stocks", async (req, res) => {
  const tickerArray = ["AAPL"]; //TODO: add all the tickers
  const urlArray = tickerArray.map(ticker =>
    addUrlQueryParams(`${baseUrl}/${ticker}.json?api_key=${API_KEY}`, req.query)
  );
  let data;
  let result;
  try {
    data = urlArray.map(url => {
      return fetch(url);
    });
    let promises = await Promise.all(data);
    promises = promises.map(buffer => {
      return buffer.json();
    });
    result = await Promise.all(promises);
  } catch (err) {
    return res.json({
      error: err,
      message: "Something went wrong with the fetching"
    });
  }
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
