const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeDeces collection
const acteDecesSchema = new mongoose.Schema({
  // num_acte_deces: { type: String, required: true },   => _id
  num_declarant: { type: String, required: true },
  date_declaration: { type: Date, required: true },
  num_acte_naissance: { type: String, required: true },
  num_personne: { type: String, required: true },
  date_deces: { type: Date, required: true },
  heure_deces: { type: String, required: true },
  lieu_deces: { type: String, required: true },
  num_registre: { type: String, default: 2 },
  num_bureau: { type: String, required: true },
  matricule: { type: String, required: true },
});
// Create the model for the ActeDeces collection
const ActeDeces = mongoose.model("ActeDeces", acteDecesSchema);

function validateActeDeces(acteDeces) {
  const schema = Joi.object({
    num_declarant: Joi.string().min(5).max(255).required(),
    date_declaration: Joi.date().required(),
    num_acte_naissance: Joi.string().min(5).max(255).required(),
    num_personne: Joi.string().min(5).max(255).required(),
    date_deces: Joi.date().required(),
    heure_deces: Joi.string().max(255).required(),
    lieu_deces: Joi.string().min(5).max(255).required(),
    num_bureau: Joi.string().min(5).max(255).required(),
    matricule: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(acteDeces);
}

exports.ActeDeces = ActeDeces;
exports.validateActeDeces = validateActeDeces;
