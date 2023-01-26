const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { ActeDeces, validateActeDeces } = require("../models/acteDeces");

// GET 1 Acte deces
router.get("/:id", auth, async (req, res) => {
  const { id: num_personne } = req.params;
  const acte = await ActeDeces.findOne({ num_personne: num_personne });
  if (!acte) return res.status(404).send("Acte n'existe pas.");

  res.send(acte);
});

// POST Acte deces
router.post("/", auth, async (req, res) => {
  const result = validateActeDeces(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let acte = await ActeDeces.findOne({ num_personne: req.body.num_personne });
  if (acte) return res.status(400).send("Ce acte deja existe");

  acte = new ActeDeces({ ...req.body });
  acte.save();

  res.send(acte);
});

// PUT Acte deces
router.put("/:id", auth, async (req, res) => {
  // modify acte by num_personne.
  const { id: num_personne } = req.params;
  // we send all the fields of Act and validate them.
  const result = validateActeDeces(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const acte = await ActeDeces.findOneAndUpdate(
    { num_personne: num_personne },
    { ...req.body },
    { new: true }
  );
  if (!acte) return res.status(404).send("Ce acte n'existe pas");

  res.send(acte);
});

module.exports = router;
