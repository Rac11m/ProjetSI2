const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .set("strictQuery", true)
    .connect(db)
    .then(() => console.log(`Connection established with ${db}`));
};
