const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Officier collection
const officierSchema = new mongoose.Schema({
  matricule: { type: Number, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_prise_service: { type: Date, required: true },
  num_bureau: { type: String, required: true },
});

// Create the model for the Officier collection
const Officier = mongoose.model("Officier", officierSchema);

function validateOfficier(officier) {
  const schema = Joi.object({});

  return schema.validate(officier);
}

exports.Officier = Officier;
exports.validateOfficier = validateOfficier;
