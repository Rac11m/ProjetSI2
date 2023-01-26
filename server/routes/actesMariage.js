const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { ActeMariage, validateActeMariage } = require("../models/acteMariage");

// GET 1 Acte mariage
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const acte = await ActeMariage.findOne({
    $or: [{ num_homme: id }, { num_femme: id }],
  });
  if (!acte) return res.status(404).send("Acte n'existe pas.");

  res.send(acte);
});

// POST Acte mariage
router.post("/", auth, async (req, res) => {
  const result = validateActeMariage(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let acte = await ActeMariage.findOne({
    $or: [{ num_homme: req.body.num_homme }, { num_femme: req.body.num_femme }],
  });
  if (acte) return res.status(400).send("Ce acte deja existe");

  acte = new ActeMariage({ ...req.body });
  acte.save();

  res.send(acte);
});

// PUT Acte mariage
router.put("/:id", auth, async (req, res) => {
  // modify acte by num_personne.
  const { id } = req.params;
  // we send all the fields of Act and validate them.
  const result = validateActeMariage(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const acte = await ActeMariage.findOneAndUpdate(
    { $or: [{ num_homme: id }, { num_femme: id }] },
    { ...req.body },
    { new: true }
  );
  if (!acte) return res.status(404).send("Ce acte n'existe pas");

  res.send(acte);
});

module.exports = router;
