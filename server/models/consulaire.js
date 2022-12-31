const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Consulaire collection
const consulaireSchema = new mongoose.Schema({
  matricule: { type: Number, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_prise_service: { type: Date, required: true },
  pays_de_rattachement: { type: String, required: true },
});

// Create the model for the Consulaire collection
const Consulaire = mongoose.model("Consulaire", consulaireSchema);

function validateConsulaire(consulaire) {
  const schema = Joi.object({});

  return schema.validate(consulaire);
}

exports.Consulaire = Consulaire;
exports.validateConsulaire = validateConsulaire;
