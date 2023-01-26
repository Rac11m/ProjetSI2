const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Bureau collection
const bureauNationalSchema = new mongoose.Schema({
  // num_bureau: { type: String, required: true },   => _id
  num_bureau: { type: String, required: true },
  nom_commune: { type: String, required: true },
  daira: { type: String, required: true },
  wilaya: { type: String, required: true },
  matricule_maire: { type: String, required: true },
});
// Create the model for the Bureau collection
const BureauNational = mongoose.model("BureauNational", bureauNationalSchema);

function validateBureauNational(bureauNational) {
  const schema = Joi.object({
    num_bureau: Joi.string().min(5).max(255).required(),
    nom_commune: Joi.string().min(5).max(255).required(),
    daira: Joi.string().min(5).max(255).required(),
    wilaya: Joi.string().min(5).max(255).required(),
    matricule_maire: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(bureauNational);
}

exports.BureauNational = BureauNational;
exports.validateBureauNational = validateBureauNational;
