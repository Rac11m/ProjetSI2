const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  BureauNational,
  validateBureauNational,
} = require("../models/bureauNational");

// GET 1 bureau
router.get("/:id", auth, async (req, res) => {
  const { id: num_bureau } = req.params;
  const bureau = await BureauNational.findOne({
    num_bureau: num_bureau,
  });
  if (!bureau) return res.status(404).send("bureau n'existe pas.");

  res.send(bureau);
});

// POST Bureau
router.post("/", auth, async (req, res) => {
  const result = validatePersonne(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let bureau = await BureauNational.findOne({
    num_bureau: req.body.num_bureau,
  });
  if (bureau) return res.status(400).send("Ce bureau deja existe");

  bureau = new BureauNational({ ...req.body });
  bureau.save();

  res.send(bureau);
});

// PUT bureau
router.put("/:id", auth, async (req, res) => {
  // modify bureau by num_BureauNational.
  const { id: num_bureau } = req.params;
  // we send all the fields of bureau and validate them.
  const result = validateBureauNational(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const bureau = await BureauNational.findOneAndUpdate(
    { num_bureau: num_bureau },
    { ...req.body },
    { new: true }
  );
  if (!bureau) return res.status(404).send("Cette bureau n'existe pas");

  res.send(bureau);
});

module.exports = router;
