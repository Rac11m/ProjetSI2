const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const ActeNaissance = require("../routes/actesNaissances");
const ActeMariage = require("../routes/actesMariage");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/actesNaissance", ActeNaissance);
  app.use("/api/actesMariage", ActeMariage);
};
