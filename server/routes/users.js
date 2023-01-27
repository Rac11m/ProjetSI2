const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const { User, validateUser } = require("../models/user");

// Create a new user {Admin, Officier, Maire ou Consulaire}
router.post("/", async (req, res) => {
  // Validate the fields.
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // verify that this user doesn't exist in the database.
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Utilisateur deja existe");

  // create a record and hash the password to enforce security.
  user = new User({ ...req.body });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // create a JWT and send it in the 'x-auth-token' header.
  const jwtPrivateKey = config.get("jwtPrivateKey");
  const token = jwt.sign(
    {
      matricule: req.body.matricule,
      role: req.body.role,
      num_bureau: req.body.num_bureau,
      pays_de_rattachement: req.body.pays_de_rattachement,
    },
    jwtPrivateKey
  );
  res.header("x-auth-token", token).send({
    matricule: user.matricule,
    role: user.role,
    num_bureau: user.num_bureau,
    pays_de_rattachement: user.pays_de_rattachement,
  });
});

router.get("/:id", async (req, res) => {
  const { id: matricule } = req.params;
  const user = await User.findOne({
    matricule: matricule,
  });
  if (!user) return res.status(404).send("Fonctionnaire n'existe pas.");

  res.send(user);
});

module.exports = router;
