const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeNaissance collection
const acteNaissanceSchema = new mongoose.Schema({
  num_acte_naissance: { type: String, required: true },
  date_declaration: { type: Date, required: true },
  num_personne: { type: String, required: true },
  num_declarant: { type: String, required: true },
  num_acte_mariage: { type: String },
  num_act_deces: { type: String },
  num_registre: { type: String, required: true },
  matricule: { type: String, required: true },
});

// Create the model for the ActeNaissance collection
const ActeNaissance = mongoose.model("ActeNaissance", acteNaissanceSchema);

function validateActeNaissance(acteNaissance) {
  const schema = Joi.object({});

  return schema.validate(acteNaissance);
}

exports.ActeNaissance = ActeNaissance;
exports.validateActeNaissance = validateActeNaissance;
