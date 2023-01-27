const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the ActeMariage collection
const acteMariageSchema = new mongoose.Schema({
  // num_acte_mariage: { type: String, required: true },   => _id
  date_mariage: { type: Date, required: true },
  lieu_mariage: { type: String, required: true },
  num_homme: { type: String, required: true },
  num_femme: { type: String, required: true },
  num_temoin1: { type: String, required: true },
  num_temoin2: { type: String, required: true },
  num_registre: { type: String, default: 1 },
  num_bureau: { type: String, required: true },
  matricule: { type: String, required: true },
});
// Create the model for the ActeMariage collection
const ActeMariage = mongoose.model("ActeMariage", acteMariageSchema);

function validateActeMariage(acteMariage) {
  const schema = Joi.object({
    date_mariage: Joi.date().required(),
    lieu_mariage: Joi.string().min(5).max(255).required(),
    num_homme: Joi.string().min(5).max(255).required(),
    num_femme: Joi.string().min(5).max(255).required(),
    num_temoin1: Joi.string().min(1).max(255).required(),
    num_temoin2: Joi.string().min(1).max(255).required(),
    num_bureau: Joi.string().min(5).max(255).required(),
    matricule: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(acteMariage);
}

exports.ActeMariage = ActeMariage;
exports.validateActeMariage = validateActeMariage;
