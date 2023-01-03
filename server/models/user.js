const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_prise_service: { type: Date, required: true },
  num_bureau: { type: String, required: true },
  pays_de_rattachement: { type: String },
  role: { type: String, enum: ["admin", "maire", "officier", "consulaire"] },
});

// Create the model for the User collection
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    matricule: string().min(5).max(255).required(),
    email: string().min(5).max(255).required().email().trim(),
    password: string().min(5).max(255).required(),
    nom: string().min(3).max(255).required(),
    prenom: string().min(3).max(255).required(),
    date_prise_service: date().required(),
    num_bureau: string().min(5).max(255),
    pays_de_rattachement: string().min(5).max(255),
    role: string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
