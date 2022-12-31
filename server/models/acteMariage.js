const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeMariage collection
const acteMariageSchema = new mongoose.Schema({
  num_acte_mariage: { type: String, required: true },
  date_mariage: { type: Date, required: true },
  lieu_mariage: { type: String, required: true },
  num_homme: { type: String, required: true },
  num_femme: { type: String, required: true },
  num_temoin1: { type: String, required: true },
  num_temoin2: { type: String, required: true },
  num_registre: { type: String, required: true },
  matricule: { type: String, required: true },
});
// Create the model for the ActeMariage collection
const ActeMariage = mongoose.model("ActeMariage", acteMariageSchema);

function validateActeMariage(acteMariage) {
  const schema = Joi.object({});

  return schema.validate(acteMariage);
}

exports.ActeMariage = ActeMariage;
exports.validateActeMariage = validateActeMariage;
