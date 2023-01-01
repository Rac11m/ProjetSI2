const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Temoin collection
const temoinSchema = new mongoose.Schema({
  num_temoin: { type: String, required: true },
  num_personne: { type: String, required: true },
});

// Create the model for the Temoin collection
const Temoin = mongoose.model("Temoin", temoinSchema);

function validateTemoin(temoin) {
  const schema = Joi.object({});

  return schema.validate(temoin);
}

exports.Temoin = Temoin;
exports.validateTemoin = validateTemoin;
