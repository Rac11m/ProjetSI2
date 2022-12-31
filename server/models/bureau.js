const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Bureau collection
const bureauNationalSchema = new mongoose.Schema({
  num_bureau: { type: String, required: true },
  nom_bureau: { type: String, required: true },
  nom_commune: { type: String, required: true },
  daïra: { type: String, required: true },
  wilaya: { type: String, required: true },
  matricule_maire: { type: String, required: true },
});
// Create the model for the Bureau collection
const BureauNational = mongoose.model("BureauNational", bureauNationalSchema);

function validateBureauNational(bureauNational) {
  const schema = Joi.object({});

  return schema.validate(bureauNational);
}

exports.bureauNational = bureauNational;
exports.validateBureauNational = validateBureauNational;
