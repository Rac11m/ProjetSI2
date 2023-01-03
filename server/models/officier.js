const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Officier collection
const officierSchema = new mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_prise_service: { type: Date, required: true },
  num_bureau: { type: String, required: true },
  role: { type: String, default: "officier" },
});

// Create the model for the Officier collection
const Officier = mongoose.model("Officier", officierSchema);

function validateOfficier(officier) {
  const schema = Joi.object({
    matricule: string().min(5).max(255).required(),
    email: string().min(5).max(255).required().email().trim(),
    password: string().min(5).max(255).required(),
    nom: string().min(3).max(255).required(),
    prenom: string().min(3).max(255).required(),
    date_prise_service: date().required(),
    num_bureau: string().min(5).max(255).required(),
    role: string().min(5).max(255).required(),
  });

  return schema.validate(officier);
}

exports.Officier = Officier;
exports.validateOfficier = validateOfficier;
