const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Bureau collection
const bureauConsulatSchema = new mongoose.Schema({
  num_bureau: { type: String, required: true },
  nom_bureau: { type: String, required: true },
  pays: { type: String, required: true },
  matricule_consul: { type: Number, required: true },
});

// Create the model for the Bureau collection
const BureauConsulat = mongoose.model("BureauConsulat", bureauConsulatSchema);

function validateBureauConsulat(bureauConsulat) {
  const schema = Joi.object({});

  return schema.validate(bureauConsulat);
}

exports.BureauConsulat = BureauConsulat;
exports.validateBureauConsulat = validateBureauConsulat;
