// Route to establish the login.

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  //validate the fields
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  //search for the user in the database
  const user = await User.findOne({ matricule: req.body.matricule });
  if (!user) return res.status(400).send("matricule ou mot de passe invalide");

  //Encode the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(404).send("matricule ou mot de passe invalide.");

  //Generate the JsonWebToken
  const jwtPrivateKey = config.get("jwtPrivateKey");
  const token = jwt.sign(
    {
      matricule: req.body.matricule,
      role: req.body.role,
    },
    jwtPrivateKey
  );
  res.header("x-auth-token", token).send(token);
});

function validate(req) {
  const Schema = Joi.object({
    matricule: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().min(5).max(255).required(),
  });
  return Schema.validate(req);
}

module.exports = router;
