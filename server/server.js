require("dotenv").config();
const express = require("express");
const server = express();
const fs = require("fs");

if (!fs.existsSync("data.json")) {
  require("./database")(process.env.QUANDL_API_KEY);
}

server.set("port", 3001);

server.get("/api/stocks", (req, res) => {
  console.log("got request");
  return res.json(require("./data.json"));
});

const port = server.listen(server.get("port"), () => {
  console.log(`listening on ${server.get("port")}`);
});

//server endpoint for getting all stock data
// server.get("/api/stocks", async (req, res) => {
//   const tickerArray = ["AAPL", "MMM", "BA"]; //TODO: add all the tickers
//   //set defaults
//   req.query.start_date = req.query.start_date || "2016-01-01";
//   req.query.end_date = req.query.end_date || "2017-01-01";
//   const urlArray = tickerArray.map(ticker =>
//     addUrlQueryParams(`${baseUrl}/${ticker}.json?api_key=${API_KEY}`, req.query)
//   );
//   let data;
//   let result;
//   let scrubbedData;
//   try {
//     data = urlArray.map(url => {
//       return fetch(url);
//     });
//     let promises = await Promise.all(data);
//     promises = promises.map(buffer => {
//       return buffer.json();
//     });
//     result = await Promise.all(promises);
//     scrubbedData = result.map(jsonCompany =>
//       parseJSON(jsonCompany, "2016-01-01", "2017-01-01")
//     );
//   } catch (err) {
//     return res.json({
//       error: err,
//       message: "Something went wrong with the fetching"
//     });
//   }
//
//   await fs.writeFile("data.json", JSON.stringify(scrubbedData, null, 2));
//   return res.json(scrubbedData);
// });
//
// //individual stock endpoint :: not supported
// server.get("/api/stocks/:ticker", (req, res) => {
//   let url = `${baseUrl}/${req.params.ticker}.json?api_key=${API_KEY}`;
//   url = addUrlQueryParams(url, req.query);
//
//   return res.send("COME BACK AGAIN LATER");
// });
