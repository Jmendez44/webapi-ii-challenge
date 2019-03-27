const express = require("express");

const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
      <h2>Test</h>
    `);
});

server.use("/api/posts", postsRouter);

module.exports = server;
