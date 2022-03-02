const { Router } = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");

const router = Router();

const appPath = path.join(__dirname, "../../dist", manifest["app.js"]);
const App = require(appPath).default;

router.get("/", async (req, res) => {
    const app = createSSRApp(App);
    const appContent = await renderToString(app);

    const html = `
  <html>
    <head>
      <title>Hello</title>
      <link rel="stylesheet" href="${manifest["app.css"]}" />
    </head>
    <body>
      ${appContent}
    </body>
  </html>

  `;

    res.end(html);
});

module.exports = router;