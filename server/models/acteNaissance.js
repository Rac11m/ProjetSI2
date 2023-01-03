const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeNaissance collection
const acteNaissanceSchema = new mongoose.Schema({
  // num_acte_naissance: { type: String, required: true },   => _id
  date_declaration: { type: Date, required: true },
  num_personne: { type: String, required: true },
  num_declarant: { type: String, required: true },
  num_acte_mariage: { type: String },
  num_act_deces: { type: String },
  num_registre: { type: String, required: true },
  matricule: { type: Number, required: true },
});

// Create the model for the ActeNaissance collection
const ActeNaissance = mongoose.model("ActeNaissance", acteNaissanceSchema);

function validateActeNaissance(acteNaissance) {
  const schema = Joi.object({
    date_declaration: date().required(),
    num_personne: string().min(5).max(255).required(),
    num_declarant: string().min(5).max(255).required(),
    num_acte_mariage: string().min(5).max(255),
    num_act_deces: string().min(5).max(255),
    num_registre: string().min(5).max(255).required(),
    matricule: string().min(5).max(255).required(),
  });

  return schema.validate(acteNaissance);
}

exports.ActeNaissance = ActeNaissance;
exports.validateActeNaissance = validateActeNaissance;
