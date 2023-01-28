const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { ActeDeces } = require("../models/acteDeces");
const { ActeMariage } = require("../models/acteMariage");
const { ActeNaissance } = require("../models/acteNaissance");

// GET 1 bureau
router.post("/", auth, async (req, res) => {
  const num_registre = req.body.num_registre;
  const year = req.body.date_declaration;
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  let registre;
  switch (num_registre) {
    case "0":
      registre = await ActeNaissance.find({
        $and: [
          { num_bureau: req.body.num_bureau },
          { num_registre: num_registre },
          { date_declaration: { $gte: startDate, $lt: endDate + 1 } },
        ],
      });
      if (registre.length === 0) return res.status(404).send("Registre vide.");
      res.send(registre);

      break;
    case "1":
      registre = await ActeMariage.find({
        $and: [
          { num_bureau: req.body.num_bureau },
          { num_registre: num_registre },
          { date_mariage: { $gte: startDate, $lt: endDate + 1 } },
        ],
      });
      if (registre.length === 0) return res.status(404).send("Registre vide.");
      res.send(registre);
      break;
    case "2":
      registre = await ActeDeces.find({
        $and: [
          { num_bureau: req.body.num_bureau },
          { num_registre: num_registre },
          { date_declaration: { $gte: startDate, $lt: endDate + 1 } },
        ],
      });
      if (registre.length === 0) return res.status(404).send("Registre vide.");
      res.send(registre);
      break;

    default:
      res.status(404).send("Registre Invalide");
      break;
  }
});

module.exports = router;
