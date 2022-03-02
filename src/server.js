const path = require("path");
const express = require("express");
const manifest = require("../dist/ssr-manifest.json");
const router = require("./routes/server.routes.js");

const app = express();

const server = app.listen(3000, async () => {
  console.log(`
  You can navigate to http://localhost:3000
`);

  app.use("/img", express.static(path.join(__dirname, "../dist", "img")));
  app.use("/js", express.static(path.join(__dirname, "../dist", "js")));
  app.use("/css", express.static(path.join(__dirname, "../dist", "css")));
  app.use(
    "/favicon.ico",
    express.static(path.join(__dirname, "../dist", "favicon.ico"))
  );
  app.use(router);
});
