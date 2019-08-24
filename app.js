const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const utilities = require("./utilities");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("ok");
});

require("./routes/customer")(app);

app.use(utilities.errorHandler());

module.exports = app;
