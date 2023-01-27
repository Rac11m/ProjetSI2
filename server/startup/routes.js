const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const actesNaissances = require("../routes/actesNaissances");
const actesMariage = require("../routes/actesMariage");
const actesDeces = require("../routes/actesDeces");
const personnes = require("../routes/personnes");
const officiers = require("../routes/officiers");
const consulaires = require("../routes/Consulaires");
const bureauxNationaux = require("../routes/bureauxNational");
const bureauxConsulaires = require("../routes/bureauxConsulaire");
const registres = require("../routes/registres");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/actesNaissance", actesNaissances);
  app.use("/api/actesMariage", actesMariage);
  app.use("/api/actesDeces", actesDeces);
  app.use("/api/personnes", personnes);
  app.use("/api/officiers", officiers);
  app.use("/api/consulaires", consulaires);
  app.use("/api/bureauxNationaux", bureauxNationaux);
  app.use("/api/bureauxConsulaires", bureauxConsulaires);
  app.use("/api/registres", registres);
};
