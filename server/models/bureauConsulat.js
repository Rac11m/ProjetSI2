const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Bureau collection
const bureauConsulatSchema = new mongoose.Schema({
  // num_bureau: { type: String, required: true },   => _id
  num_bureau: { type: String, required: true },
  pays: { type: String, required: true },
  matricule_consul: { type: String, required: true },
});

// Create the model for the Bureau collection
const BureauConsulat = mongoose.model("BureauConsulat", bureauConsulatSchema);

function validateBureauConsulat(bureauConsulat) {
  const schema = Joi.object({
    num_bureau: Joi.string().min(5).max(255).required(),
    pays: Joi.string().min(5).max(255).required(),
    matricule_consul: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(bureauConsulat);
}

exports.BureauConsulat = BureauConsulat;
exports.validateBureauConsulat = validateBureauConsulat;
