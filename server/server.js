const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;

//api endpoints
server.set("port", 3001);

const port = server.listen(server.get("port"), () => {
  console.log(`listening on ${server.get("port")}`);
});
