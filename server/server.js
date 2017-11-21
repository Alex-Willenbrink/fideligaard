// Set up app
const express = require("express");
const server = express();

// Config environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Database
const fs = require("fs");
if (!fs.existsSync("data.json")) {
  const { seedDatabase } = require("./database");
  (async () => {
    await seedDatabase();
  })();
}

// Back-end Routes
server.get("/api/stocks", (req, res) => {
  return res.json(require("./data.json"));
});

// Front-end server
const path = require("path");
server.use(express.static(path.join(__dirname, "./build")));

// ???
server.all("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

// Start up the application
const port = process.env.PORT || process.argv[2] || 3001;
const host = "localhost";
const args = process.env.NODE_ENV === "production" ? [port] : [port, host];
args.push(() => {
  console.log(`Listening: http://${host}:${port}`);
});

server.listen(...args);
