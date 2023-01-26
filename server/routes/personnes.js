const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Personne, validatePersonne } = require("../models/personne");

// GET 1 Personne

router.get("/:id", auth, async (req, res) => {
  const { id: num_identifiant_national } = req.params;
  const personne = await Personne.findOne({
    num_identifiant_national: num_identifiant_national,
  });
  if (!personne) return res.status(404).send("Personne n'existe pas.");

  res.send(personne);
});

// POST Personne
router.post("/", auth, async (req, res) => {
  const result = validatePersonne(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let personne = await Personne.findOne({
    num_identifiant_national: req.body.num_identifiant_national,
  });
  if (personne) return res.status(400).send("Cette Personne deja existe");

  personne = new Personne({ ...req.body });
  personne.save();

  res.send(personne);
});

// PUT Personne
router.put("/:id", auth, async (req, res) => {
  // modify personne by num_personne.
  const { id: num_identifiant_national } = req.params;
  // we send all the fields of personne and validate them.
  const result = validatePersonne(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const personne = await Personne.findOneAndUpdate(
    { num_identifiant_national: num_identifiant_national },
    { ...req.body },
    { new: true }
  );
  if (!personne) return res.status(404).send("Cette Personne n'existe pas");

  res.send(personne);
});

module.exports = router;
