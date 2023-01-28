const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { ActeNaissance } = require("../models/acteNaissance");
const { ActeMariage } = require("../models/acteMariage");
const { ActeDeces } = require("../models/acteDeces");

router.post("/", auth, async (req, res) => {
  const { collection } = req.body;

  const startDate21 = new Date(2021, 0, 1);
  const endDate21 = new Date(2021, 11, 31);
  const startDate22 = new Date(2022, 0, 1);
  const endDate22 = new Date(2022, 11, 31);
  const startDate23 = new Date(2023, 0, 1);
  const endDate23 = new Date(2023, 11, 31);
  let nbr21, nbr22, nbr23;

  switch (collection) {
    case "naissance":
      nbr21 = await ActeNaissance.count({
        date_declaration: { $gte: startDate21, $lt: endDate21 + 1 },
      });
      nbr22 = await ActeNaissance.count({
        date_declaration: { $gte: startDate22, $lt: endDate22 + 1 },
      });
      nbr23 = await ActeNaissance.count({
        date_declaration: { $gte: startDate23, $lt: endDate23 + 1 },
      });

      res.send({
        id: `${collection}`,
        color: "hsl(189, 70%, 50%)",
        data: [
          {
            x: "2021",
            y: nbr21,
          },
          {
            x: "2022",
            y: nbr22,
          },
          {
            x: "2023",
            y: nbr23,
          },
        ],
      });
      break;
    case "mariage":
      nbr21 = await ActeMariage.count({
        date_mariage: { $gte: startDate21, $lt: endDate21 + 1 },
      });
      nbr22 = await ActeMariage.count({
        date_mariage: { $gte: startDate22, $lt: endDate22 + 1 },
      });
      nbr23 = await ActeMariage.count({
        date_mariage: { $gte: startDate23, $lt: endDate23 + 1 },
      });

      res.send({
        id: `${collection}`,
        color: "hsl(189, 70%, 50%)",
        data: [
          {
            x: "2021",
            y: nbr21,
          },
          {
            x: "2022",
            y: nbr22,
          },
          {
            x: "2023",
            y: nbr23,
          },
        ],
      });
      break;
    case "deces":
      nbr21 = await ActeDeces.count({
        date_declaration: { $gte: startDate21, $lt: endDate21 + 1 },
      });
      nbr22 = await ActeDeces.count({
        date_declaration: { $gte: startDate22, $lt: endDate22 + 1 },
      });
      nbr23 = await ActeDeces.count({
        date_declaration: { $gte: startDate23, $lt: endDate23 + 1 },
      });

      res.send({
        id: `${collection}`,
        color: "hsl(189, 70%, 50%)",
        data: [
          {
            x: "2021",
            y: nbr21,
          },
          {
            x: "2022",
            y: nbr22,
          },
          {
            x: "2023",
            y: nbr23,
          },
        ],
      });
      break;
  }
  res.status(404).send("Erreur");
});

module.exports = router;
