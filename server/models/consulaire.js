const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Consulaire collection
const consulaireSchema = new mongoose.Schema({
  matricule: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_prise_service: { type: Date, required: true },
  pays_de_rattachement: { type: String, required: true },
  role: { type: String, default: "consulaire" },
});

// Create the model for the Consulaire collection
const Consulaire = mongoose.model("Consulaire", consulaireSchema);

function validateConsulaire(consulaire) {
  const schema = Joi.object({
    matricule: string().min(5).max(255).required(),
    email: string().min(5).max(255).required().email().trim(),
    password: string().min(5).max(255).required(),
    nom: string().min(3).max(255).required(),
    prenom: string().min(3).max(255).required(),
    date_prise_service: date().required(),
    pays_de_rattachement: string().min(5).max(255).required(),
    role: string().min(5).max(255).required(),
  });

  return schema.validate(consulaire);
}

exports.Consulaire = Consulaire;
exports.validateConsulaire = validateConsulaire;
