const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// GET All Officiers
router.get("/", async (req, res) => {
  const user = await User.find({ role: "consulaire" });
  if (user.length === 0) return res.status(404).send("y a pas de consulaires.");

  res.send(user);
});

// GET 1 Officier
router.get("/:id", async (req, res) => {
  const { id: matricule } = req.params;
  const user = await User.findOne({
    $and: [{ role: "consulaire" }, { matricule: matricule }],
  });
  if (!user) return res.status(404).send("Ce consulaire n'existe pas.");

  res.send(user);
});

module.exports = router;
