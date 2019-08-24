const server = require("./app");
const config = require("./config");
const utilities = require("./utilities");

utilities.connectToDatabase(config.DB_URL).then(() => {
  server.listen(config.PORT, () => {
    console.log("Application server running on port => " + config.PORT);
  });
});
