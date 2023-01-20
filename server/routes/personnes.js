const express = require("express");
const router = express.Router();
const { Personne, validatePersonne } = require("../models/personne");

// GET 1 Personne
router.get("/:id", async (req, res) => {
  const { id: num_identifiant_national } = req.params;
  const acte = await Personne.findOne({
    num_identifiant_national: num_identifiant_national,
  });
  if (!acte) return res.status(404).send("Personne n'existe pas.");

  res.send(acte);
});

// POST Personne
router.post("/", async (req, res) => {
  const result = validatePersonne(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let acte = await Personne.findOne({
    num_identifiant_national: req.body.num_identifiant_national,
  });
  if (acte) return res.status(400).send("Cette Personne deja existe");

  acte = new Personne({ ...req.body });
  acte.save();

  res.send(acte);
});

// PUT Personne
router.put("/:id", async (req, res) => {
  // modify acte by num_personne.
  const { id: num_identifiant_national } = req.params;
  // we send all the fields of Act and validate them.
  const result = validatePersonne(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const acte = await Personne.findOneAndUpdate(
    { num_identifiant_national: num_identifiant_national },
    { ...req.body },
    { new: true }
  );
  if (!acte) return res.status(404).send("Cette Personne n'existe pas");

  res.send(acte);
});

module.exports = router;
