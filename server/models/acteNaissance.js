const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeNaissance collection
const acteNaissanceSchema = new mongoose.Schema({
  // num_acte_naissance: { type: String, required: true },   => _id
  date_declaration: { type: Date, required: true },
  num_personne: { type: String, required: true },
  num_pere: { type: String, required: true },
  num_mere: { type: String, required: true },
  num_declarant: { type: String, required: true },
  num_acte_mariage: { type: String },
  num_acte_deces: { type: String },
  num_registre: { type: String, default: 0 },
  num_bureau: { type: String, required: true },
  matricule: { type: String, required: true },
});

// Create the model for the ActeNaissance collection
const ActeNaissance = mongoose.model("ActeNaissance", acteNaissanceSchema);

function validateActeNaissance(acteNaissance) {
  const schema = Joi.object({
    date_declaration: Joi.date().required(),
    num_personne: Joi.string().min(5).max(255).required(),
    num_pere: Joi.string().min(5).max(255).required(),
    num_mere: Joi.string().min(5).max(255).required(),
    num_declarant: Joi.string().min(5).max(255).required(),
    num_acte_mariage: Joi.string().min(5).max(255),
    num_acte_deces: Joi.string().min(5).max(255),
    num_bureau: Joi.string().min(5).max(255).required(),
    matricule: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(acteNaissance);
}

exports.ActeNaissance = ActeNaissance;
exports.validateActeNaissance = validateActeNaissance;
