const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  ActeNaissance,
  validateActeNaissance,
} = require("../models/acteNaissance");

// Get ActesNaissances COUNT
router.get("/", async (req, res) => {
  let count = await ActeNaissance.count();
  res.send({ count });
});

// GET 1 Acte naissance
router.get("/:id", auth, async (req, res) => {
  const { id: num_personne } = req.params;
  const acte = await ActeNaissance.findOne({ num_personne });
  if (!acte) return res.status(404).send("Acte n'existe pas.");

  res.send(acte);
});

// POST Acte naissance
router.post("/", auth, async (req, res) => {
  const result = validateActeNaissance(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let acte = await ActeNaissance.findOne({
    num_personne: req.body.num_personne,
  });
  if (acte) return res.status(400).send("Ce acte deja existe");

  acte = new ActeNaissance({ ...req.body });
  acte.save();

  res.send(acte);
});

// PUT Acte naissance

router.put("/:id", auth, async (req, res) => {
  // modify acte by num_personne.
  const { id: num_personne } = req.params;
  // we send all the fields of Act and validate them.
  const result = validateActeNaissance(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const acte = await ActeNaissance.findOneAndUpdate(
    { num_personne },
    {
      date_declaration: req.body.date_declaration,
      num_personne: num_personne,
      num_declarant: req.body.num_declarant,
      num_acte_mariage: req.body.num_acte_mariage,
      num_acte_deces: req.body.num_acte_deces,
      num_registre: req.body.num_registre,
      matricule: req.body.matricule,
    },
    { new: true }
  );
  if (!acte) return res.status(404).send("Ce acte n'existe pas");

  res.send(acte);
});

module.exports = router;
