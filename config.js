require("dotenv");
module.exports = {
  PORT: process.env.PORT || 2334,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/oxr34"
};
