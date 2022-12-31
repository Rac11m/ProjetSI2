const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Personne collection
const personneSchema = new mongoose.Schema({
  num_identifiant_national: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  sexe: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  heure_naissance: { type: String, required: true },
  vile_naissance: { type: String, required: true },
  pays_naissance: { type: String, required: true },
  etat_matrimonial: { type: String, required: true },
  conjoint: { type: String },
  commune_residence: { type: String, required: true },
  num_pere: { type: String },
  num_mere: { type: String },
  profession: { type: String, required: false },
});

// Create the model for the Personne collection
const Personne = mongoose.model("Personne", personneSchema);

function validatePersonne(personne) {
  const schema = Joi.object({});

  return schema.validate(personne);
}

exports.Personne = Personne;
exports.personneSchema = personneSchema;
exports.validatePersonne = validatePersonne;
