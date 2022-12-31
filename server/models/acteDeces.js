const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeDeces collection
const acteDecesSchema = new mongoose.Schema({
  num_acte_deces: { type: String, required: true },
  num_declarant: { type: String, required: true },
  date_declaration: { type: Date, required: true },
  num_acte_naissance: { type: String, required: true },
  num_personne: { type: String, required: true },
  date_deces: { type: Date, required: true },
  heure_deces: { type: String, required: true },
  lieu_deces: { type: String, required: true },
  num_registre: { type: String, required: true },
  matricule: { type: Number, required: true },
});
// Create the model for the ActeDeces collection
const ActeDeces = mongoose.model("ActeDeces", acteDecesSchema);

function validateActeDeces(acteDeces) {
  const schema = Joi.object({});

  return schema.validate(acteDeces);
}

exports.ActeDeces = ActeDeces;
exports.validateActeDeces = validateActeDeces;
