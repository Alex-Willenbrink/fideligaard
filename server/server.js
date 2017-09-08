const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
require("isomorphic-fetch");
const baseUrl = "https://www.quandl.com/api/v3/datasets/EOD";

//api endpoints
server.set("port", 3001);

function addUrlQueryParams(url, queryObj) {
  Object.keys(queryObj).forEach(key => (url += `&${key}=${queryObj[key]}`));
  return url;
}

server.get("/api/stocks", async (req, res) => {
  const tickerArray = ["AAPL"];
  const urlArray = tickerArray.map(ticker =>
    addUrlQueryParams(`${baseUrl}/${ticker}.json?api_key=${API_KEY}`, req.query)
  );
  let data;
  try {
    console.log("running here");
    data = urlArray.map(url => {
      console.log("url: ", url);
      return fetch(url);
    });
    await Promise.all(data);
    console.log("data: ", data);
    data = urlArray.map(buffer => {
      return buffer.json();
    });
    console.log(data);
    await Promise.all(data);
  } catch (err) {
    return res.json({
      error: err,
      message: "Something went wrong with the fetching"
    });
  }
});

server.get("/api/stocks/:ticker", (req, res) => {
  let url = `${baseUrl}/${req.params.ticker}.json?api_key=${API_KEY}`;
  url = addUrlQueryParams(url, req.query);
  console.log(url);

  return res.send("doing something");
});

const port = server.listen(server.get("port"), () => {
  console.log(`listening on ${server.get("port")}`);
});
