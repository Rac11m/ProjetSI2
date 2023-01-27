const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Registre collection
const registreSchema = new mongoose.Schema({
  num_registre: { type: String, required: true, enum: [0, 1, 2] },
  annee_registre: { type: Date, required: true },
  num_bureau: { type: String, required: true },
});

// Create the model for the Registre collection
const Registre = mongoose.model("Registre", registreSchema);

function validateRegiste(registre) {
  const schema = Joi.object({
    annee_registre: Joi.date().required(),
    num_bureau: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(registre);
}

exports.Registre = Registre;
exports.validateRegiste = validateRegiste;
